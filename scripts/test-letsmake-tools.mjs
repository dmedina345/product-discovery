#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packDir = path.resolve(scriptDir, "..");
const cli = path.join(scriptDir, "letsmake-tools.mjs");
const fixture = path.join(packDir, "examples", "saved-collections");
const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "letsmake-v22-"));
const workspace = path.join(sandbox, "consumer");
const feature = path.join(workspace, "docs", "epics", "library", "features", "saved-collections");

function run(args, expected = 0) {
  const result = spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });
  const output = `${result.stdout || ""}${result.stderr || ""}`;
  assert.equal(result.status, expected, `${args.join(" ")}\n${output}`);
  return output;
}

function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value, "utf8");
}

function mutate(file, from, to) {
  const before = fs.readFileSync(file, "utf8");
  assert(before.includes(from), `fixture text not found in ${file}: ${from}`);
  write(file, before.replace(from, to));
  return before;
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name === ".git" || entry.name === "docs" || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(full) : entry.name.endsWith(".md") ? [full] : [];
  });
}

function assertRepositoryLinks() {
  const broken = [];
  const canonicalRoot = path.join(packDir, "skills", "letsmake-product-workflow", "references");
  const featureArtifacts = new Set(["requirements.md", "discovery.md", "gap-analysis.md", "decisions.md", "scenario-matrix.md", "design.md", "dev-handoff.md", "spec.md"]);
  for (const file of markdownFiles(packDir)) {
    const body = fs.readFileSync(file, "utf8");
    for (const match of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const raw = match[1].trim().replace(/^<|>$/g, "");
      if (/^(?:https?:|mailto:|file:|#)/i.test(raw) || /[{}]/.test(raw)) continue;
      const target = decodeURIComponent(raw.split("#")[0].split("?")[0]);
      if (!target || /^[A-Za-z]:[\\/]/.test(target)) continue;
      if (file.startsWith(canonicalRoot) && raw.startsWith("./") && featureArtifacts.has(path.basename(target))) continue;
      if (file === path.join(packDir, "assets", "research", "canvas-index.stub.md") && raw === "../product/research-deliverables-playbook.md") continue;
      if (!fs.existsSync(path.resolve(path.dirname(file), target))) broken.push(`${path.relative(packDir, file)} -> ${raw}`);
    }
  }
  assert.deepEqual(broken, [], `broken repository links:\n${broken.join("\n")}`);
}

try {
  assertRepositoryLinks();
  run(["install", "--workspace", workspace, "--pack", packDir]);
  fs.mkdirSync(path.dirname(feature), { recursive: true });
  fs.cpSync(fixture, feature, { recursive: true });

  const positive = run(["validate", "--workspace", workspace, "--feature", feature, "--explain-state"]);
  assert.match(positive, /CHECKED 1 feature\(s\).*PASS/s);
  assert.match(positive, /Handoff prepared; next=Engineering acknowledgment; eligible=true/);

  const requirements = path.join(feature, "requirements.md");
  const originalRequirements = mutate(requirements, "- Smart/auto collections — `GP-DROP-002`", "- Smart/auto collections");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[DROP_TRACE\]/);
  write(requirements, originalRequirements);

  const gapAnalysis = path.join(feature, "gap-analysis.md");
  const originalGap = mutate(gapAnalysis, "| approve evaluation-only | Draft review |", "| | Draft review |");
  const incompleteGate = run(["validate", "--workspace", workspace, "--feature", feature], 1);
  assert.match(incompleteGate, /\[GP_INCOMPLETE\]/);
  assert.match(incompleteGate, /\[M10\]/);
  write(gapAnalysis, originalGap);

  const unlabeledApproval = mutate(gapAnalysis, "| approve evaluation-only | Draft review |", "| approve | Draft review |");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[SIM_APPROVAL\]/);
  write(gapAnalysis, unlabeledApproval);

  const duplicateResearch = fs.readFileSync(gapAnalysis, "utf8");
  const researchRow = duplicateResearch.split(/\r?\n/).find(line => line.startsWith("| GP-RESEARCH-001 |"));
  assert(researchRow, "research fixture row missing");
  write(gapAnalysis, duplicateResearch.replace(researchRow, `${researchRow}\n${researchRow}`));
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[GP_DUP\]/);
  write(gapAnalysis, duplicateResearch);

  const missingPdr = mutate(gapAnalysis, "PDR-LIB-002 |", "PDR-NOPE-999 |");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[PDR_MISSING\]/);
  write(gapAnalysis, missingPdr);

  const discovery = path.join(feature, "discovery.md");
  const inconsistentLifecycle = mutate(discovery, "**Status:** Superseded", "**Status:** Ready for gap pass");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[LIFECYCLE\]/);
  write(discovery, inconsistentLifecycle);

  const handoff = path.join(feature, "dev-handoff.md");
  const planningFail = mutate(handoff, "| Planning | pass |", "| Planning | fail |");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[PLANNING_READINESS\]/);
  write(handoff, planningFail);
  const originalHandoff = mutate(handoff, "**Status:** Prepared", "**Status:** Accepted");
  mutate(handoff, "**Accepted by Engineering:** pending", "**Accepted by Engineering:** Alex Engineer — 2026-07-13");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[SIM_ACCEPT\]/);
  write(handoff, originalHandoff);

  let noDateHandoff = mutate(handoff, "**Status:** Prepared", "**Status:** Accepted");
  mutate(handoff, "**Authority mode:** simulated-po", "**Authority mode:** real");
  mutate(handoff, "**Accepted by Engineering:** pending", "**Accepted by Engineering:** Alex Engineer");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[HANDOFF_ACK\]/);
  write(handoff, noDateHandoff);

  const spec = path.join(feature, "spec.md");
  const originalSpec = mutate(spec, "## Codebase map `[ENG]`", "## Codebase map `[ENG]`\n\nPremature product-authored content.");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[SPEC_OWNERSHIP\]/);
  write(spec, originalSpec);
  fs.unlinkSync(spec);
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[SPEC_MISSING\]/);
  write(spec, originalSpec);

  const reviewArtifact = path.join(feature, "reviews", "gap-draft-review-1.md");
  const originalReview = mutate(reviewArtifact, "NEXT GATE: eligible", "NEXT GATE: pending");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[REVIEW_CONTRACT\]/);
  write(reviewArtifact, originalReview);
  const tamperedReview = mutate(reviewArtifact, "retain revision history", "retain revision history carefully");
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[REVIEW_DIGEST\]/);
  write(reviewArtifact, tamperedReview);

  const eventLog = path.join(feature, "workflow-events.jsonl");
  const failedReviewLog = mutate(eventLog, '"event":"draft-review-completed","actor":"independent-evaluator","result":"pass"', '"event":"draft-review-completed","actor":"independent-evaluator","result":"fail"');
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature], 1), /\[REVIEW_GATE\]/);
  write(eventLog, failedReviewLog);

  const batch = path.join(sandbox, "decision-batch.json");
  write(batch, `${JSON.stringify({ date: "2026-07-13", items: [
    { id: "GP-GAP-010", type: "M7", question: "CSV export", options: "later / include", answer: "later", sourceRefs: "coverage export", carriedInto: "Won't Have", pdr: "—" },
    { id: "GP-GAP-011", type: "M7", question: "Public API", options: "later / include", answer: "later", sourceRefs: "coverage API", carriedInto: "Won't Have", pdr: "—" }
  ] }, null, 2)}\n`);
  const preview = run(["materialize-decisions", "--workspace", workspace, "--feature", feature, "--input", batch]);
  assert.match(preview, /GP-GAP-010/); assert.match(preview, /GP-GAP-011/);
  const beforeMaterialize = fs.readFileSync(gapAnalysis, "utf8");
  run(["materialize-decisions", "--workspace", workspace, "--feature", feature, "--input", batch, "--write"]);
  const materialized = fs.readFileSync(gapAnalysis, "utf8");
  assert.equal((materialized.match(/GP-GAP-010/g) || []).length, 1);
  assert.equal((materialized.match(/GP-GAP-011/g) || []).length, 1);
  assert.match(run(["materialize-decisions", "--workspace", workspace, "--feature", feature, "--input", batch], 1), /duplicate id/);
  write(gapAnalysis, beforeMaterialize);

  const eventCount = fs.readFileSync(eventLog, "utf8").trim().split(/\r?\n/).length;
  run(["record-event", "--workspace", workspace, "--feature", feature, "--event", "validation-completed", "--at", "2026-07-02T15:20:00Z", "--actor", "test"]);
  assert.equal(fs.readFileSync(eventLog, "utf8").trim().split(/\r?\n/).length, eventCount + 1);
  assert.match(run(["validate", "--workspace", workspace, "--feature", feature]), /PASS/);

  const nextPack = path.join(sandbox, "next-pack");
  const manifest = JSON.parse(fs.readFileSync(path.join(packDir, "letsmake-pack.json"), "utf8"));
  const canonical = path.join(nextPack, manifest.canonicalDocsRoot);
  fs.mkdirSync(path.dirname(canonical), { recursive: true });
  fs.cpSync(path.join(packDir, manifest.canonicalDocsRoot), canonical, { recursive: true });
  for (const item of manifest.managedFiles || []) {
    const target = path.join(nextPack, item.source);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(packDir, item.source), target);
  }
  manifest.packVersion = "2.2.1-test";
  const cheat = path.join(canonical, "cheat-sheet.md");
  const machine = path.join(canonical, "workflow-state-machine.md");
  const validatorWrapper = path.join(nextPack, "scripts", "validate-workflow.ps1");
  fs.appendFileSync(cheat, "\nIncoming test change.\n", "utf8");
  fs.appendFileSync(machine, "\nSafe test change.\n", "utf8");
  fs.appendFileSync(validatorWrapper, "\n# Safe managed-file test change.\n", "utf8");
  manifest.templateHashes = Object.fromEntries(manifest.templates.map(name => [name, sha256(path.join(canonical, name))]));
  manifest.managedFileHashes = Object.fromEntries((manifest.managedFiles || []).map(item => [item.source, sha256(path.join(nextPack, item.source))]));
  write(path.join(nextPack, "letsmake-pack.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  const consumerCheat = path.join(workspace, "docs", "product", "cheat-sheet.md");
  const consumerMachine = path.join(workspace, "docs", "product", "workflow-state-machine.md");
  const consumerValidator = path.join(workspace, "scripts", "validate-workflow.ps1");
  fs.appendFileSync(consumerCheat, "\nLocal customization.\n", "utf8");
  const customizedHash = sha256(consumerCheat);
  const beforeDryRun = sha256(consumerMachine);
  const check = run(["check-upgrade", "--workspace", workspace, "--pack", nextPack]);
  assert.match(check, /CONFLICT\s+docs\/product\/cheat-sheet\.md/);
  assert.match(check, /SAFE UPDATE\s+docs\/product\/workflow-state-machine\.md/);
  assert.match(check, /SAFE UPDATE\s+scripts\/validate-workflow\.ps1/);
  run(["upgrade", "--workspace", workspace, "--pack", nextPack, "--dry-run"]);
  assert.equal(sha256(consumerMachine), beforeDryRun, "dry run changed a consumer file");
  run(["upgrade", "--workspace", workspace, "--pack", nextPack]);
  assert.equal(sha256(consumerCheat), customizedHash, "upgrade overwrote a local customization");
  assert.equal(sha256(consumerMachine), sha256(machine), "safe update was not applied");
  assert.equal(sha256(consumerValidator), sha256(validatorWrapper), "managed helper update was not applied");
  const packet = path.join(workspace, ".cursor", "letsmake", "upgrades", manifest.packVersion, "docs", "product", "cheat-sheet.md");
  for (const suffix of [".base", ".current", ".incoming"]) assert(fs.existsSync(`${packet}${suffix}`), `missing conflict packet ${suffix}`);

  run(["upgrade", "--workspace", workspace, "--pack", nextPack, "--accept-current", "docs/product/cheat-sheet.md"]);
  assert.equal(sha256(consumerCheat), customizedHash, "accept-current changed local content");
  const acceptedState = JSON.parse(fs.readFileSync(path.join(workspace, ".cursor", "letsmake.install.json"), "utf8"));
  assert.equal(acceptedState.packVersion, manifest.packVersion);
  assert.equal(acceptedState.complete, true);
  assert.match(run(["check-upgrade", "--workspace", workspace, "--pack", nextPack]), /LOCAL ONLY\s+docs\/product\/cheat-sheet\.md/);

  console.log("PASS links, install, state explanation, fifteen negative validation gates, versioned/hashed review evidence, atomic decision materialization, dry-run, upgrades, conflict preservation, and resolved-local acceptance");
} finally {
  fs.rmSync(sandbox, { recursive: true, force: true });
}
