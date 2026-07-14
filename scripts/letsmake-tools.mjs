#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";

const args = process.argv.slice(2);
const command = args.shift() || "help";

function option(name, fallback = "") {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
}
const flag = (name) => args.includes(`--${name}`);
const absolute = (p) => path.resolve(p || ".");
const workspace = absolute(option("workspace", process.cwd()));
const scriptDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?:([A-Za-z]):)/, "$1:"));
const packDir = absolute(option("pack", path.resolve(scriptDir, "..")));
const posix = (p) => p.split(path.sep).join("/");
const exists = (p) => fs.existsSync(p);
const mkdir = (p) => fs.mkdirSync(p, { recursive: true });
const read = (p) => fs.readFileSync(p, "utf8");
const readJson = (p) => JSON.parse(read(p).replace(/^\uFEFF/, ""));
const writeJson = (p, value) => { mkdir(path.dirname(p)); fs.writeFileSync(p, `${JSON.stringify(value, null, 2)}\n`, "utf8"); };
const hash = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const copy = (from, to) => { mkdir(path.dirname(to)); fs.copyFileSync(from, to); };
const rel = (p) => posix(path.relative(workspace, p));

function cursorSlug(p) {
  return path.resolve(p).replace(/:/g, "").replace(/[\\/]+/g, "-").replace(/-+$/, "");
}

function packManifest() {
  const p = path.join(packDir, "letsmake-pack.json");
  if (!exists(p)) throw new Error(`pack manifest missing: ${p}`);
  const m = readJson(p);
  if (!m.packVersion || !Array.isArray(m.templates)) throw new Error("invalid letsmake-pack.json");
  const root = path.join(packDir, m.canonicalDocsRoot);
  for (const name of m.templates) {
    const source = path.join(root, name);
    if (!exists(source)) throw new Error(`manifest template missing: ${source}`);
    const expected = m.templateHashes?.[name];
    if (expected && expected !== hash(source)) throw new Error(`manifest hash mismatch: ${name}`);
  }
  for (const item of m.managedFiles || []) {
    const source = path.join(packDir, item.source);
    if (!item.source || !item.destination || !exists(source)) throw new Error(`manifest managed file missing: ${item.source || "unnamed"}`);
    const expected = m.managedFileHashes?.[item.source];
    if (expected && expected !== hash(source)) throw new Error(`manifest hash mismatch: ${item.source}`);
  }
  return { ...m, root };
}

function configPath() { return path.join(workspace, ".cursor", "letsmake.config.json"); }
function statePath() { return path.join(workspace, ".cursor", "letsmake.install.json"); }
function baseRoot() { return path.join(workspace, ".cursor", "letsmake", "base"); }
function canvasDir() { return path.join(os.homedir(), ".cursor", "projects", cursorSlug(workspace), "canvases"); }

function defaultConfig(version) {
  return {
    version: 2,
    installedPackVersion: version,
    docsProductRoot: "docs/product",
    featureDocsRoot: "docs/epics",
    researchIndexPath: "docs/research/canvas-index.md",
    lessonsLearnedPath: "docs/lessons-learned.md",
    canvasDir: canvasDir()
  };
}

function updateConfigVersion(version, complete) {
  const p = configPath();
  if (!exists(p)) return;
  const cfg = readJson(p);
  cfg.version = Math.max(Number(cfg.version || 1), 2);
  cfg.availablePackVersion = version;
  if (complete) cfg.installedPackVersion = version;
  writeJson(p, cfg);
}

function sourceFiles(manifest) {
  const files = manifest.templates.map((name) => ({
    source: path.join(manifest.root, name),
    dest: path.join(workspace, "docs", "product", name),
    relative: `docs/product/${name}`
  }));
  for (const item of manifest.managedFiles || []) files.push({
    source: path.join(packDir, item.source),
    dest: path.join(workspace, item.destination),
    relative: posix(item.destination)
  });
  const extras = [
    ["assets/research/canvas-index.stub.md", "docs/research/canvas-index.md"],
    ["assets/lessons-learned.template.md", "docs/lessons-learned.md"]
  ];
  for (const [src, dst] of extras) {
    const source = path.join(packDir, src);
    if (exists(source)) files.push({ source, dest: path.join(workspace, dst), relative: dst });
  }
  return files;
}

function install() {
  const m = packManifest();
  mkdir(workspace);
  for (const dir of ["docs/product", "docs/research", "scripts", ".cursor", "docs/epics"]) mkdir(path.join(workspace, dir));
  mkdir(canvasDir());
  const oldState = exists(statePath()) ? readJson(statePath()) : null;
  const tracked = {};
  const legacyUntracked = [];
  for (const f of sourceFiles(m)) {
    if (!exists(f.dest)) {
      if (f.relative === "docs/research/canvas-index.md") {
        const value = read(f.source).replaceAll("{CANVAS_DIR}", posix(canvasDir()));
        fs.writeFileSync(f.dest, value, "utf8");
      } else copy(f.source, f.dest);
      console.log(`installed ${f.relative}`);
    } else console.log(`skip ${f.relative} (exists)`);

    if (f.relative === "docs/research/canvas-index.md") {
      tracked[f.relative] = hash(f.dest);
      copy(f.dest, path.join(baseRoot(), f.relative));
    } else if (hash(f.dest) === hash(f.source)) {
      tracked[f.relative] = hash(f.dest);
      const base = path.join(baseRoot(), f.relative);
      copy(f.source, base);
    } else if (oldState?.files?.[f.relative]) tracked[f.relative] = oldState.files[f.relative];
    else legacyUntracked.push(f.relative);
  }

  if (!exists(configPath())) {
    writeJson(configPath(), defaultConfig(m.packVersion));
    console.log("wrote .cursor/letsmake.config.json");
  } else console.log("skip .cursor/letsmake.config.json (exists)");

  const complete = legacyUntracked.length === 0;
  updateConfigVersion(m.packVersion, complete);
  writeJson(statePath(), {
    packVersion: complete ? m.packVersion : (oldState?.packVersion || "legacy"),
    availablePackVersion: m.packVersion,
    schemaVersion: m.schemaVersion,
    installedAt: new Date().toISOString(),
    complete,
    files: tracked,
    legacyUntracked
  });
  console.log(`\nCanvas directory: ${canvasDir()}`);
  if (!complete) console.log(`WARN legacy/custom files need upgrade review: ${legacyUntracked.length}`);
  console.log("Next: run scripts/validate-workflow.* and intake-synthesize.");
}

function doctor() {
  let fail = 0, warn = 0;
  console.log(`LetsMake doctor — workspace: ${workspace}\n`);
  const cfgPath = configPath();
  if (!exists(cfgPath)) { console.log("FAIL  config not found: .cursor/letsmake.config.json"); return 1; }
  let cfg;
  try { cfg = readJson(cfgPath); console.log("ok    config"); } catch { console.log("FAIL  config is invalid JSON"); return 1; }
  for (const [key, kind] of [["docsProductRoot", "dir"], ["researchIndexPath", "file"], ["lessonsLearnedPath", "file"]]) {
    if (!cfg[key]) { console.log(`WARN  ${key} unset`); warn++; continue; }
    const p = path.isAbsolute(cfg[key]) ? cfg[key] : path.join(workspace, cfg[key]);
    if (exists(p) && (kind === "dir" ? fs.statSync(p).isDirectory() : fs.statSync(p).isFile())) console.log(`ok    ${key}: ${p}`);
    else { console.log(`WARN  ${key} missing: ${p}`); warn++; }
  }
  const featureRoot = path.join(workspace, cfg.featureDocsRoot || "docs/epics");
  console.log(`${exists(featureRoot) ? "ok" : "info"}  featureDocsRoot: ${featureRoot}`);
  const canvas = cfg.canvasDir || canvasDir();
  try { mkdir(canvas); const probe = path.join(canvas, ".letsmake-write-test"); fs.writeFileSync(probe, ""); fs.unlinkSync(probe); console.log(`ok    canvasDir writable: ${canvas}`); }
  catch { console.log(`FAIL  canvasDir not writable: ${canvas}`); fail++; }
  if (exists(statePath())) {
    const state = readJson(statePath());
    console.log(`${state.complete ? "ok" : "WARN"}  installed pack: ${state.packVersion}; available: ${state.availablePackVersion || state.packVersion}`);
    if (!state.complete) warn++;
  } else { console.log("WARN  install manifest missing (legacy workspace)"); warn++; }
  for (const f of ["scripts/validate-workflow.ps1", "scripts/validate-workflow.sh", "scripts/letsmake-tools.mjs"]) {
    if (!exists(path.join(workspace, f))) { console.log(`WARN  ${f} missing`); warn++; }
  }
  console.log(`\nRESULT: ${fail ? `FAIL (${fail} error(s), ${warn} warning(s))` : warn ? `OK with ${warn} warning(s)` : "OK — config healthy"}`);
  return fail ? 1 : 0;
}

function upgradeAnalysis() {
  const m = packManifest();
  const state = exists(statePath()) ? readJson(statePath()) : { files: {} };
  const managed = [
    ...m.templates.map(name => ({ source: path.join(m.root, name), relative: `docs/product/${name}` })),
    ...(m.managedFiles || []).map(item => ({ source: path.join(packDir, item.source), relative: posix(item.destination) }))
  ];
  return { manifest: m, state, rows: managed.map((item) => {
    const source = item.source;
    const relative = item.relative;
    const dest = path.join(workspace, relative);
    const name = relative;
    const recorded = state.files?.[relative];
    if (!exists(dest)) return { name, source, dest, relative, status: "ADD" };
    const current = hash(dest), incoming = hash(source);
    if (current === incoming) return { name, source, dest, relative, current, incoming, recorded, status: "CURRENT" };
    if (!recorded) return { name, source, dest, relative, current, incoming, status: "LEGACY/UNTRACKED" };
    if (current === recorded) return { name, source, dest, relative, current, incoming, recorded, status: "SAFE UPDATE" };
    if (incoming === recorded) return { name, source, dest, relative, current, incoming, recorded, status: "LOCAL ONLY" };
    return { name, source, dest, relative, current, incoming, recorded, status: "CONFLICT" };
  }) };
}

function printUpgrade(rows, version) {
  console.log(`LetsMake upgrade check — target ${version}\n`);
  for (const r of rows) console.log(`${r.status.padEnd(16)} ${r.relative}`);
  const counts = Object.fromEntries([...new Set(rows.map(r => r.status))].map(s => [s, rows.filter(r => r.status === s).length]));
  console.log(`\nSUMMARY ${JSON.stringify(counts)}`);
}

function checkUpgrade() {
  const { manifest, rows } = upgradeAnalysis();
  printUpgrade(rows, manifest.packVersion);
}

function upgrade() {
  const dryRun = flag("dry-run");
  const acceptCurrent = new Set(option("accept-current").split(",").map(v => posix(v.trim())).filter(Boolean));
  const { manifest, state, rows } = upgradeAnalysis();
  printUpgrade(rows, manifest.packVersion);
  if (dryRun) { console.log("\nDRY RUN — no files written"); return; }
  const conflictRoot = path.join(workspace, ".cursor", "letsmake", "upgrades", manifest.packVersion);
  const nextFiles = { ...(state.files || {}) };
  const conflicts = [];
  for (const r of rows) {
    if (r.status === "ADD" || r.status === "SAFE UPDATE") {
      copy(r.source, r.dest); copy(r.source, path.join(baseRoot(), r.relative));
      nextFiles[r.relative] = hash(r.source);
      console.log(`applied ${r.relative}`);
    } else if (r.status === "CURRENT") {
      copy(r.source, path.join(baseRoot(), r.relative));
      nextFiles[r.relative] = hash(r.source);
    } else if ((r.status === "CONFLICT" || r.status === "LEGACY/UNTRACKED") && acceptCurrent.has(r.relative)) {
      copy(r.source, path.join(baseRoot(), r.relative));
      nextFiles[r.relative] = hash(r.source);
      console.log(`accepted current ${r.relative} (local content preserved)`);
    } else if (r.status === "CONFLICT" || r.status === "LEGACY/UNTRACKED") {
      const packet = path.join(conflictRoot, r.relative);
      if (exists(path.join(baseRoot(), r.relative))) copy(path.join(baseRoot(), r.relative), `${packet}.base`);
      copy(r.dest, `${packet}.current`); copy(r.source, `${packet}.incoming`);
      conflicts.push(r.relative);
      console.log(`conflict packet ${rel(packet)}.{base,current,incoming}`);
    }
  }
  const complete = conflicts.length === 0;
  writeJson(statePath(), {
    ...state,
    packVersion: complete ? manifest.packVersion : (state.packVersion || "mixed"),
    availablePackVersion: manifest.packVersion,
    schemaVersion: manifest.schemaVersion,
    upgradedAt: new Date().toISOString(),
    complete,
    conflicts,
    files: nextFiles
  });
  updateConfigVersion(manifest.packVersion, complete);
  console.log(`\nRESULT: ${complete ? "UPGRADED" : `PARTIAL — ${conflicts.length} conflict(s); current files preserved`}`);
}

function oneFeatureDir() {
  const dirs = resolveFeatureDirs(option("feature"));
  if (dirs.length !== 1) throw new Error(`exactly one --feature is required; found ${dirs.length}`);
  return dirs[0];
}

function recordEvent() {
  const dir = oneFeatureDir();
  const event = option("event");
  if (!/^[a-z][a-z0-9-]+$/.test(event)) throw new Error("--event must be lowercase kebab-case");
  const at = option("at", new Date().toISOString());
  if (Number.isNaN(Date.parse(at))) throw new Error("--at must be an ISO-8601 timestamp");
  const item = { at, event };
  for (const key of ["actor", "ref", "result", "artifact", "revision", "note", "contract", "subject"]) {
    const value = option(key); if (value) item[key] = value;
  }
  const suppliedArtifactHash = option("artifact-hash");
  if (suppliedArtifactHash) item.artifactHash = suppliedArtifactHash;
  else if (item.artifact && exists(path.resolve(dir, item.artifact))) item.artifactHash = hash(path.resolve(dir, item.artifact));
  const suppliedSubjectHash = option("subject-hash");
  if (suppliedSubjectHash) item.subjectHash = suppliedSubjectHash;
  else if (item.subject && exists(path.resolve(dir, item.subject))) item.subjectHash = hash(path.resolve(dir, item.subject));
  const suppliedScenarioHash = option("scenario-hash");
  if (suppliedScenarioHash) item.scenarioHash = suppliedScenarioHash;
  const target = path.join(dir, "workflow-events.jsonl");
  fs.appendFileSync(target, `${JSON.stringify(item)}\n`, "utf8");
  console.log(`recorded ${event} -> ${rel(target)}`);
}

function materializeDecisions() {
  const dir = oneFeatureDir();
  const input = absolute(option("input"));
  if (!exists(input)) throw new Error(`decision batch not found: ${input}`);
  const packet = readJson(input);
  if (!Array.isArray(packet.items) || !packet.items.length) throw new Error("decision batch requires a non-empty items array");
  const gapPath = path.join(dir, "gap-analysis.md");
  if (!exists(gapPath)) throw new Error(`gap analysis missing: ${gapPath}`);
  const gap = read(gapPath);
  const heading = gap.match(/^##[^\r\n]*Atomic PO decisions[^\r\n]*$/m);
  if (!heading) throw new Error("Atomic PO decisions section missing");
  const headingEnd = heading.index + heading[0].length;
  const following = gap.slice(headingEnd);
  const nextHeadingOffset = following.search(/^##\s/m);
  const sectionEnd = nextHeadingOffset < 0 ? gap.length : headingEnd + nextHeadingOffset;
  const body = gap.slice(headingEnd, sectionEnd);
  const existing = new Set([...body.matchAll(/^\|\s*(GP-(?:DROP|GAP|RESEARCH)-\d{3}|GP-APPROVAL-M(?:9|10))\s*\|/gm)].map(m => m[1]));
  const seen = new Set();
  const clean = value => String(value ?? "").replace(/[\r\n]+/g, " ").replace(/\|/g, "\\|").trim();
  const rows = packet.items.map((item, index) => {
    const id = clean(item.id), date = clean(item.date || packet.date), type = clean(item.type);
    const question = clean(item.question || item.capability), options = clean(item.options), answer = clean(item.answer);
    const sourceRefs = clean(item.sourceRefs), carriedInto = clean(item.carriedInto), pdr = clean(item.pdr || "—");
    if (!/^GP-(?:DROP|GAP|RESEARCH)-\d{3}$/.test(id)) throw new Error(`item ${index + 1}: invalid id ${id}`);
    if (existing.has(id) || seen.has(id)) throw new Error(`item ${index + 1}: duplicate id ${id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`item ${index + 1}: date must be YYYY-MM-DD`);
    if (![type, question, options, answer, sourceRefs, carriedInto].every(Boolean)) throw new Error(`item ${index + 1}: type, question, options, answer, sourceRefs, and carriedInto are required`);
    seen.add(id);
    return `| ${id} | ${date} | ${type} | ${question} | ${options} | ${answer} | ${sourceRefs} | ${carriedInto} | ${pdr} |`;
  });
  if (!flag("write")) { console.log(rows.join("\n")); return; }
  const approvalOffset = body.search(/^\|\s*GP-APPROVAL-M(?:9|10)\s*\|/m);
  const insertAt = approvalOffset < 0 ? sectionEnd : headingEnd + approvalOffset;
  const prefix = gap.slice(0, insertAt).replace(/[ \t]+$/, "");
  const suffix = gap.slice(insertAt).replace(/^\r?\n?/, "");
  fs.writeFileSync(gapPath, `${prefix}\n${rows.join("\n")}\n${suffix}`, "utf8");
  console.log(`materialized ${rows.length} atomic decision(s) -> ${rel(gapPath)}`);
}

function walk(dir) {
  if (!exists(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

function lineOf(text, needle) { const i = text.indexOf(needle); return i < 0 ? 1 : text.slice(0, i).split(/\r?\n/).length; }
function section(text, start, endPattern = /^## /m) {
  const i = text.indexOf(start); if (i < 0) return "";
  const rest = text.slice(i + start.length); const m = rest.match(endPattern);
  return m ? rest.slice(0, m.index) : rest;
}

function resolveFeatureDirs(feature) {
  const root = path.join(workspace, "docs", "epics");
  if (feature) {
    const direct = path.isAbsolute(feature) ? feature : path.join(workspace, feature);
    if (exists(direct)) return [direct];
    return walk(root).filter(p => path.basename(p) === "requirements.md" && path.basename(path.dirname(p)) === feature).map(path.dirname);
  }
  return walk(root).filter(p => path.basename(p) === "requirements.md").map(path.dirname);
}

const statusOf = text => text?.match(/^\*\*Status:\*\*\s*([^\r\n]+)/m)?.[1]?.trim() || "";
const authorityOf = text => text?.match(/^\*\*Authority mode:\*\*\s*([^\r\n]+)/m)?.[1]?.trim() || "";

function atomicDecisionRows(gap) {
  const body = gap.match(/^##[^\r\n]*Atomic PO decisions[^\r\n]*\r?\n([\s\S]*?)(?=^##\s|(?![\s\S]))/m)?.[1] || "";
  return [...body.matchAll(/^\|\s*(GP-(?:DROP|GAP|RESEARCH)-\d{3}|GP-APPROVAL-M(?:9|10))\s*\|([^\r\n]*)/gm)].map(match => ({
    id: match[1],
    cells: match[0].split("|").slice(1, -1).map(cell => cell.trim()),
    index: match.index,
    lineText: match[0]
  }));
}

function decisionRows(text) {
  return [...(text || "").matchAll(/^\|\s*(PDR-[A-Z0-9]+-\d{3})\s*\|([^\r\n]*)/gm)].map(match => ({
    id: match[1],
    cells: match[0].split("|").slice(1, -1).map(cell => cell.trim()),
    lineText: match[0]
  }));
}

function researchBacklogRows(text) {
  const body = section(text || "", "## Research backlog", /^## /m);
  return [...body.matchAll(/^\|\s*(R-[A-Z0-9-]+)\s*\|([^\r\n]*)/gm)].map(match => ({
    id: match[1],
    cells: match[0].split("|").slice(1, -1).map(cell => cell.trim()),
    lineText: match[0]
  }));
}

function deriveState(contents, gpRows) {
  const reqStatus = statusOf(contents["requirements.md"]);
  const discoveryStatus = statusOf(contents["discovery.md"]);
  const scenarioStatus = statusOf(contents["scenario-matrix.md"]);
  const handoffStatus = statusOf(contents["dev-handoff.md"]);
  const m9 = gpRows.some(row => row.id === "GP-APPROVAL-M9" && /\b(proceed|approve|approved|yes)\b/i.test(row.cells[5] || ""));
  const m10 = gpRows.some(row => row.id === "GP-APPROVAL-M10" && /\b(approve|approved|yes)\b/i.test(row.cells[5] || ""));
  if (handoffStatus.startsWith("Accepted")) return { state: "Handoff accepted", nextGate: "complete" };
  if (handoffStatus.startsWith("Prepared")) return { state: "Handoff prepared", nextGate: "Engineering acknowledgment" };
  if (scenarioStatus.startsWith("Complete")) return { state: "Scenario hardened", nextGate: "Handoff prepare" };
  if (reqStatus.startsWith("Consolidated")) return { state: "Requirements Consolidated", nextGate: "Scenario hardening" };
  if (m10) return { state: "M10 approved", nextGate: "Consolidate requirements" };
  if (reqStatus.startsWith("Draft")) return { state: "Requirements Draft", nextGate: "Draft review then M10" };
  if (m9) return { state: "M9 approved", nextGate: "Write requirements Draft" };
  if (contents["gap-analysis.md"]) return { state: "Gap analysis in progress", nextGate: "M9" };
  if (discoveryStatus.startsWith("Ready for gap pass")) return { state: "Ready for gap pass", nextGate: "Start gap analysis" };
  return { state: "Exploring", nextGate: "Ready for gap pass" };
}

function validateFeature(dir, out) {
  const errorStart = out.errors.length;
  const add = (severity, code, file, message, line = 1) => out[severity].push({ code, file: rel(file), line, message });
  const files = Object.fromEntries(["discovery.md", "gap-analysis.md", "requirements.md", "decisions.md", "scenario-matrix.md", "design.md", "dev-handoff.md", "spec.md"].map(n => [n, path.join(dir, n)]));
  files["workflow-events.jsonl"] = path.join(dir, "workflow-events.jsonl");
  const contents = Object.fromEntries(Object.entries(files).filter(([,p]) => exists(p)).map(([n,p]) => [n, read(p)]));
  const allowed = {
    "discovery.md": ["Exploring", "Ready for gap pass", "Superseded"],
    "gap-analysis.md": ["In progress", "Blocked — awaiting PO", "PO approved"],
    "requirements.md": ["Draft", "Consolidated"],
    "scenario-matrix.md": ["Draft", "PO review", "Complete"],
    "design.md": ["Not started", "Product aligned", "Design in progress", "Ready"],
    "dev-handoff.md": ["Prepared", "Accepted", "Blocked"],
    "spec.md": ["Stub — awaiting engineering", "In progress", "Approved for build"]
  };
  for (const [name, text] of Object.entries(contents)) {
    if (allowed[name]) {
      const status = statusOf(text);
      if (!allowed[name].some(v => status.startsWith(v))) add("errors", "STATUS", files[name], `invalid/missing status: ${status || "none"}`);
    }
    if (["discovery.md", "gap-analysis.md", "dev-handoff.md"].includes(name)) {
      const authority = authorityOf(text);
      if (!new Set(["real", "simulated-po"]).has(authority)) add("errors", "AUTHORITY", files[name], `invalid/missing authority mode: ${authority || "none"}`);
    }
    for (const match of text.matchAll(/\[[^\]]*\]\((?!https?:|mailto:|#)([^)#]+)(?:#[^)]+)?\)/g)) {
      const target = match[1]; if (/[{}<>]/.test(target)) continue;
      const resolved = path.resolve(path.dirname(files[name]), target);
      if (!exists(resolved)) add("errors", "BROKEN_LINK", files[name], `missing link target: ${target}`, lineOf(text, match[0]));
    }
  }

  const authorities = ["discovery.md", "gap-analysis.md", "dev-handoff.md"].filter(name => contents[name]).map(name => [name, authorityOf(contents[name])]);
  const authorityValues = new Set(authorities.map(([,value]) => value).filter(value => ["real", "simulated-po"].includes(value)));
  if (authorityValues.size > 1) add("errors", "AUTHORITY_DRIFT", files[authorities.at(-1)[0]], `authority modes disagree: ${authorities.map(([name,value]) => `${name}=${value}`).join(", ")}`);

  const req = contents["requirements.md"] || "";
  const gap = contents["gap-analysis.md"] || "";
  let gpRows = [];
  if (req) {
    const consolidated = /^\*\*Status:\*\*\s*Consolidated/m.test(req);
    gpRows = atomicDecisionRows(gap).map(row => ({ ...row, line: lineOf(gap, row.lineText) }));
    for (const id of new Set(gpRows.map(row => row.id))) {
      const rows = gpRows.filter(row => row.id === id);
      if (rows.length > 1) add("errors", "GP_DUP", files["gap-analysis.md"], `duplicate atomic decision ${id}`, rows[1].line);
    }
    for (const row of gpRows) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(row.cells[1] || "") || !row.cells[5] || row.cells[5] === "—") {
        add("errors", "GP_INCOMPLETE", files["gap-analysis.md"], `${row.id} requires a date and explicit answer`, row.line);
      }
    }
    const m9 = gpRows.find(row => row.id === "GP-APPROVAL-M9");
    const m10 = gpRows.find(row => row.id === "GP-APPROVAL-M10");
    const m9Accepted = m9 && /^\d{4}-\d{2}-\d{2}$/.test(m9.cells[1] || "") && /\b(proceed|approve|approved|yes)\b/i.test(m9.cells[5] || "");
    const m10Accepted = m10 && /^\d{4}-\d{2}-\d{2}$/.test(m10.cells[1] || "") && /\b(approve|approved|yes)\b/i.test(m10.cells[5] || "");
    if (!m9Accepted) add("errors", "M9", files["gap-analysis.md"], "accepted, dated GP-APPROVAL-M9 record missing");
    if (!gpRows.some(row => /^M2$/i.test(row.cells[2] || ""))) add("errors", "PRIOR_DOC_DECISION", files["gap-analysis.md"], "gap pass requires an explicit M2 prior-document compare/skip decision");
    if (consolidated && !m10Accepted) add("errors", "M10", files["gap-analysis.md"], "Consolidated requirements require an accepted, dated GP-APPROVAL-M10 record");
    if (m9 && m10 && m9.index > m10.index) add("errors", "GATE_ORDER", files["gap-analysis.md"], "M10 appears before M9");
    if (authorityOf(gap) === "simulated-po") {
      for (const row of [m9, m10].filter(Boolean)) {
        if (!/(?:evaluation-only|simulated)/i.test(row.cells[5] || "")) add("errors", "SIM_APPROVAL", files["gap-analysis.md"], `${row.id} must label its answer evaluation-only in simulated-po mode`, row.line);
      }
    }

    const discoveryStatus = statusOf(contents["discovery.md"]);
    const gapStatus = statusOf(gap);
    if (consolidated) {
      if (!discoveryStatus.startsWith("Superseded")) add("errors", "LIFECYCLE", files["discovery.md"], "Consolidated requirements require discovery Status Superseded");
      if (!gapStatus.startsWith("PO approved")) add("errors", "LIFECYCLE", files["gap-analysis.md"], "Consolidated requirements require gap-analysis Status PO approved");
    } else if (statusOf(req).startsWith("Draft") && gapStatus.startsWith("PO approved")) {
      add("errors", "LIFECYCLE", files["gap-analysis.md"], "Draft requirements cannot have gap-analysis Status PO approved");
    }
    if (m10Accepted && !consolidated) add("errors", "LIFECYCLE", files["requirements.md"], "accepted M10 requires requirements Status Consolidated");
    const must = section(req, "### Must Have", /^### /m);
    const requiredSections = [
      ["Overview", /^##\s+Overview/im], ["Problem Statement", /^##\s+Problem Statement/im],
      ["Information Architecture & interaction", /^##\s+Information Architecture/im], ["Non-functional requirements", /^##\s+Non-functional requirements/im],
      ["Analytics", /^##\s+Analytics/im], ["Resilience & accessibility", /^##\s+Resilience\s*&\s*accessibility/im],
      ["Dependencies & assumptions", /^##\s+Dependencies\s*&\s*assumptions/im], ["Missing info & clarifications", /^##\s+Missing info\s*&\s*clarifications/im],
      ["Out of scope", /^##\s+Out of scope/im]
    ];
    for (const [label, pattern] of requiredSections) if (!pattern.test(req)) add("errors", "REQ_SECTION", files["requirements.md"], `required planning section missing: ${label}`);
    const stories = must.split(/(?=\*\*Story —)/).filter(s => s.startsWith("**Story —"));
    if (!stories.length) add("errors", "MUST", files["requirements.md"], "no Must stories found");
    for (const story of stories) {
      for (const token of ["GIVEN", "WHEN", "THEN", "**Acceptance criteria (summary):**", "**Definition of Done:**"]) {
        if (!story.includes(token)) add("errors", "MUST_SHAPE", files["requirements.md"], `Must story missing ${token}`, lineOf(req, story.slice(0, 40)));
      }
    }
    for (const marker of ["[FIGMA Δ]", "[GAP PASS NOTE]"]) if (req.includes(marker)) add("errors", "SSOT_HYGIENE", files["requirements.md"], `forbidden marker ${marker}`, lineOf(req, marker));
    const auditPhrase = req.match(/GP-APPROVAL-M(?:9|10)|evaluator(?:-round|\s+review)|Draft authorized after/i);
    if (auditPhrase) add("errors", "SSOT_AUDIT", files["requirements.md"], `gap/review audit prose belongs outside requirements: ${auditPhrase[0]}`, lineOf(req, auditPhrase[0]));
    const wont = section(req, "### Won't Have", /^(?:### |## |---$)/m);
    const bullets = wont.split(/\r?\n/).filter(l => /^\s*-\s+/.test(l));
    for (const bullet of bullets) if (!/GP-DROP-\d{3}/.test(bullet)) add("errors", "DROP_TRACE", files["requirements.md"], `Won't-Have bullet lacks GP-DROP ID: ${bullet.trim()}`, lineOf(req, bullet));
    const citedDrops = new Set([...req.matchAll(/GP-DROP-\d{3}/g)].map(m => m[0]));
    const definedDrops = new Set(gpRows.filter(row => /^GP-DROP-/.test(row.id)).map(row => row.id));
    for (const id of citedDrops) if (!definedDrops.has(id)) add("errors", "DROP_MISSING", files["requirements.md"], `${id} not found in gap analysis`, lineOf(req, id));
    for (const id of citedDrops) {
      const row = gpRows.find(item => item.id === id); const answer = row?.cells[5] || "";
      if (row && /\bmust\b/i.test(answer) && !/(?:won't|later|drop|defer|n\/a)/i.test(answer)) add("errors", "DROP_DISPOSITION", files["gap-analysis.md"], `${id} is cited as Won't Have but its answer does not approve exclusion`, row.line);
    }
    for (const id of definedDrops) if (!citedDrops.has(id) && consolidated) add("warnings", "DROP_ORPHAN", files["gap-analysis.md"], `${id} not cited in current requirements`, lineOf(gap, id));
  }

  const discovery = contents["discovery.md"] || "";
  if (discovery) {
    const backlog = researchBacklogRows(discovery);
    for (const id of new Set(backlog.map(row => row.id))) {
      if (backlog.filter(row => row.id === id).length > 1) add("errors", "RESEARCH_DUP", files["discovery.md"], `duplicate research backlog row ${id}`, lineOf(discovery, id));
    }
    for (const row of backlog.filter(item => /^done$/i.test(item.cells[5] || ""))) {
      const heading = new RegExp(`^###\\s+${row.id}\\b`, "m").exec(discovery);
      if (!heading) { add("errors", "RESEARCH_FINDINGS", files["discovery.md"], `${row.id} is done but has no findings section`, lineOf(discovery, row.lineText)); continue; }
      const tail = discovery.slice(heading.index);
      const next = tail.slice(heading[0].length).search(/^###\s+R-|^##\s+(?!Proposed changes from research)/m);
      const finding = next < 0 ? tail : tail.slice(0, heading[0].length + next);
      for (const field of ["Outcome", "Recommendation", "Evidence", "Verification", "Confidence"]) {
        if (!new RegExp(`^\\*\\*${field}:\\*\\*`, "m").test(finding)) add("errors", "RESEARCH_FINDINGS", files["discovery.md"], `${row.id} done findings lack ${field}`, lineOf(discovery, heading[0]));
      }
      const deliverable = (row.cells[6] || "").toLowerCase();
      if (deliverable.includes("digest")) {
        const links = [...finding.matchAll(/\]\(([^)#]+\.md)(?:#[^)]*)?\)/ig)].map(match => match[1]);
        const digestLink = links.find(link => path.basename(link).toUpperCase().startsWith(`${row.id.toUpperCase()}-`));
        if (!digestLink) add("errors", "RESEARCH_ARTIFACT", files["discovery.md"], `${row.id} digest deliverable lacks a linked R-* .md artifact`, lineOf(discovery, heading[0]));
        else {
          const digestPath = path.resolve(dir, digestLink);
          if (exists(digestPath)) {
            const digest = read(digestPath);
            for (const field of ["Sources", "Verification", "Confidence"]) if (!new RegExp(`(?:^##\\s+${field}|^\\*\\*${field}:\\*\\*)`, "mi").test(digest)) add("errors", "RESEARCH_DIGEST", digestPath, `${row.id} digest lacks ${field}`);
          }
        }
      }
      if ((deliverable.includes("canvas") || deliverable === "both") && !/\.canvas\.tsx/i.test(finding)) add("errors", "RESEARCH_ARTIFACT", files["discovery.md"], `${row.id} canvas deliverable lacks a .canvas.tsx reference`, lineOf(discovery, heading[0]));
      try {
        const cfg = readJson(configPath());
        const indexPath = path.resolve(workspace, cfg.researchIndexPath || "docs/research/canvas-index.md");
        const indexed = exists(indexPath) && read(indexPath).split(/\r?\n/).some(line => line.includes(row.id) && line.toLowerCase().includes(path.basename(dir).toLowerCase()));
        if (!indexed) add("warnings", "RESEARCH_INDEX", indexPath, `${row.id} completed artifact is not indexed for ${path.basename(dir)}`);
      } catch { /* config validation reports the underlying issue */ }
    }
    const researchStart = discovery.indexOf("## Research findings");
    const grillStart = discovery.indexOf("## Grill capture", researchStart);
    const researchArea = researchStart < 0 ? "" : discovery.slice(researchStart, grillStart < 0 ? undefined : grillStart);
    const proposalRows = [...researchArea.matchAll(/^\|\s*\d+\s*\|([^\r\n]*)/gm)].map(match => match[0]);
    const m9Approved = gpRows.some(row => row.id === "GP-APPROVAL-M9" && /\b(proceed|approve|approved|yes)\b/i.test(row.cells[5] || ""));
    if (m9Approved) {
      for (const row of proposalRows) {
        if (/\|\s*\*\*?pending\*\*?\s*\|?\s*$/i.test(row) || /\|\s*pending\s*\|?\s*$/i.test(row)) add("errors", "RESEARCH_PENDING", files["discovery.md"], "research proposal remains pending after M9", lineOf(discovery, row));
        if (!/GP-RESEARCH-\d{3}/.test(row)) add("errors", "RESEARCH_TRACE", files["discovery.md"], "dispositioned research proposal lacks GP-RESEARCH ID", lineOf(discovery, row));
      }
    }
    const gapResearch = new Set(gpRows.filter(row => /^GP-RESEARCH-/.test(row.id)).map(row => row.id));
    const discoveryResearch = new Set([...discovery.matchAll(/GP-RESEARCH-\d{3}/g)].map(match => match[0]));
    for (const id of gapResearch) if (!discoveryResearch.has(id)) add("errors", "RESEARCH_TRACE", files["gap-analysis.md"], `${id} is not cited by a discovery proposal disposition`, lineOf(gap, id));
    for (const id of discoveryResearch) if (!gapResearch.has(id)) add("errors", "RESEARCH_TRACE", files["discovery.md"], `${id} has no atomic gap decision`, lineOf(discovery, id));
  }

  const pdrRows = decisionRows(contents["decisions.md"]);
  const pdrIds = new Set(pdrRows.map(row => row.id));
  for (const id of pdrIds) {
    const rows = pdrRows.filter(row => row.id === id);
    if (rows.length > 1) add("errors", "PDR_DUP", files["decisions.md"], `duplicate ${id}`, lineOf(contents["decisions.md"], rows[1].lineText));
    if (!req.includes(id)) add("warnings", "PDR_UNTRACED", files["decisions.md"], `${id} not cited by requirements`, lineOf(contents["decisions.md"], id));
  }
  for (const row of pdrRows) {
    const status = (row.cells[2] || "").toLowerCase();
    if (!["proposed", "accepted", "superseded", "rejected"].includes(status)) add("errors", "PDR_STATUS", files["decisions.md"], `${row.id} has invalid status: ${status || "none"}`, lineOf(contents["decisions.md"], row.lineText));
  }
  for (const [name, text] of [["gap-analysis.md", gap], ["requirements.md", req]]) {
    for (const match of text.matchAll(/PDR-[A-Z0-9]+-\d{3}/g)) {
      if (!pdrIds.has(match[0])) add("errors", "PDR_MISSING", files[name], `${match[0]} is referenced but not defined in decisions.md`, lineOf(text, match[0]));
    }
  }

  const scenario = contents["scenario-matrix.md"] || "";
  const scenarioComplete = statusOf(scenario).startsWith("Complete");
  const requirementsConsolidated = statusOf(req).startsWith("Consolidated");
  if (scenarioComplete && /\|\s*(Ask PO|Add AC)\s*\|/.test(scenario)) add("errors", "SCENARIO_BLOCKER", files["scenario-matrix.md"], "Complete matrix contains blocking rows");
  if (scenarioComplete && !requirementsConsolidated) add("errors", "LIFECYCLE", files["scenario-matrix.md"], "Complete scenario matrix requires Consolidated requirements");

  const handoff = contents["dev-handoff.md"] || "";
  if (handoff) {
    for (const dimension of ["Planning", "Implementation start", "Production"]) {
      if (!new RegExp(`^\\|\\s*${dimension}\\s*\\|\\s*(?:pass|fail)\\s*\\|`, "mi").test(handoff)) add("errors", "READINESS", files["dev-handoff.md"], `missing ${dimension} pass/fail row`);
    }
    if (/^\*\*Status:\*\*\s*(?:Prepared|Accepted)/m.test(handoff)) {
      if (!/^\|\s*Planning\s*\|\s*pass\s*\|/mi.test(handoff)) add("errors", "PLANNING_READINESS", files["dev-handoff.md"], "Prepared/Accepted handoff requires Planning pass");
      if (!requirementsConsolidated || !scenarioComplete) add("errors", "LIFECYCLE", files["dev-handoff.md"], "Prepared/Accepted handoff requires Consolidated requirements and Complete scenario matrix");
    }
  }
  if (/^\*\*Status:\*\*\s*Accepted/m.test(handoff)) {
    const ack = handoff.match(/^\*\*Accepted by Engineering:\*\*\s*([^\r\n]+)/m)?.[1]?.trim() || "";
    if (!ack || /pending/i.test(ack) || !/\b\d{4}-\d{2}-\d{2}\b/.test(ack)) add("errors", "HANDOFF_ACK", files["dev-handoff.md"], "Accepted handoff lacks named/datestamped Engineering acknowledgment");
    if (/^\*\*Authority mode:\*\*\s*simulated-po/m.test(handoff)) add("errors", "SIM_ACCEPT", files["dev-handoff.md"], "simulated-po handoff cannot be Accepted");
  }

  const spec = contents["spec.md"] || "";
  if (/^\*\*Status:\*\*\s*(?:Prepared|Accepted)/m.test(handoff) && !spec) add("errors", "SPEC_MISSING", files["spec.md"], "Prepared/Accepted handoff requires a spec stub");
  if (spec && !/^\*\*Status:\*\*\s*(?:Prepared|Accepted)/m.test(handoff)) add("errors", "LIFECYCLE", files["spec.md"], "engineering spec requires a Prepared/Accepted handoff");
  if (/^\*\*Status:\*\*\s*Stub — awaiting engineering/m.test(spec)) {
    const template = path.join(workspace, "docs", "product", "spec-template.md");
    if (exists(template)) {
      const marker = "## Codebase map `[ENG]`";
      const expectedRaw = read(template).replace(/\r\n/g, "\n"); const actualRaw = spec.replace(/\r\n/g, "\n");
      const a = expectedRaw.indexOf(marker); const end = expectedRaw.lastIndexOf("\n---\n\n## TEMPLATE END");
      const expected = expectedRaw.slice(a, end).trim();
      const actual = actualRaw.slice(actualRaw.indexOf(marker)).trim();
      if (a < 0 || !spec.includes(marker) || expected !== actual) add("errors", "SPEC_OWNERSHIP", files["spec.md"], "stub [ENG] sections differ from canonical template");
    }
  }
  const eventPath = files["workflow-events.jsonl"];
  const events = [];
  if (exists(eventPath)) {
    let prior = -Infinity;
    for (const [index, raw] of read(eventPath).split(/\r?\n/).entries()) {
      if (!raw.trim()) continue;
      let event;
      try { event = JSON.parse(raw); }
      catch { add("errors", "EVENT_JSON", eventPath, "invalid JSONL event", index + 1); continue; }
      const timestamp = Date.parse(event.at || "");
      if (!Number.isFinite(timestamp) || !/^[a-z][a-z0-9-]+$/.test(event.event || "")) add("errors", "EVENT_SHAPE", eventPath, "event requires ISO at and kebab-case event", index + 1);
      if (Number.isFinite(timestamp) && timestamp < prior) add("errors", "EVENT_ORDER", eventPath, "event timestamps must be nondecreasing", index + 1);
      if (Number.isFinite(timestamp)) prior = timestamp;
      events.push({ ...event, line: index + 1, timestamp });
    }
  }
  const m9Approved = gpRows.some(row => row.id === "GP-APPROVAL-M9" && /\b(proceed|approve|approved|yes)\b/i.test(row.cells[5] || ""));
  const m10Approved = gpRows.some(row => row.id === "GP-APPROVAL-M10" && /\b(approve|approved|yes)\b/i.test(row.cells[5] || ""));
  if ((req || m9Approved) && !exists(eventPath)) add("errors", "EVENT_LOG", eventPath, "workflow-events.jsonl is required once M9 is approved or requirements exist");
  const eventIndex = name => events.findIndex(item => item.event === name);
  const requireEvent = (condition, name, message) => {
    if (condition && eventIndex(name) < 0) add("errors", "EVENT_MISSING", eventPath, message);
  };
  requireEvent(m9Approved, "m9-approved", "M9 decision requires m9-approved event");
  requireEvent(Boolean(req), "requirements-draft-created", "requirements require requirements-draft-created event");
  requireEvent(m10Approved, "draft-review-completed", "M10 requires a persisted draft-review-completed event");
  requireEvent(m10Approved, "m10-approved", "M10 decision requires m10-approved event");
  requireEvent(requirementsConsolidated, "requirements-consolidated", "Consolidated requirements require requirements-consolidated event");
  requireEvent(scenarioComplete, "scenario-hardened", "Complete scenario matrix requires scenario-hardened event");
  requireEvent(/^\*\*Status:\*\*\s*(?:Prepared|Accepted)/m.test(handoff), "handoff-prepared", "Prepared/Accepted handoff requires handoff-prepared event");
  requireEvent(/^\*\*Status:\*\*\s*Accepted/m.test(handoff), "handoff-accepted", "Accepted handoff requires handoff-accepted event");
  for (const event of events) {
    const evidence = {
      "m9-approved": event.ref === "GP-APPROVAL-M9",
      "requirements-draft-created": Boolean(event.revision),
      "draft-review-completed": /^(?:pass|fail|not-independent)$/i.test(event.result || ""),
      "m10-approved": event.ref === "GP-APPROVAL-M10",
      "requirements-consolidated": Boolean(event.revision),
      "scenario-hardened": Boolean(event.revision),
      "handoff-prepared": Boolean(event.revision),
      "handoff-accepted": Boolean(event.actor && !/^(?:controller|simulated-po)$/i.test(event.actor)) && Boolean(event.ref || event.note),
      "workflow-reopened": Boolean(event.revision && event.artifact && event.note),
      "requirements-incremented": Boolean(event.revision && /^PDR-/.test(event.ref || "")),
      "increment-review-completed": /^(?:pass|fail|not-independent)$/i.test(event.result || "") && Boolean(event.revision && event.artifact)
    };
    if (event.event in evidence && !evidence[event.event]) add("errors", "EVENT_EVIDENCE", eventPath, `${event.event} lacks its required evidence fields`, event.line);
  }
  const ordered = ["m9-approved", "requirements-draft-created", "draft-review-completed", "m10-approved", "requirements-consolidated", "scenario-hardened", "handoff-prepared", "handoff-accepted"];
  const eventRanks = new Map(ordered.map((name, index) => [name, index]));
  let priorRank = -1;
  for (const event of events) {
    if (event.event === "workflow-reopened") { priorRank = -1; continue; }
    if (!eventRanks.has(event.event)) continue;
    const rank = eventRanks.get(event.event);
    if (rank < priorRank) add("errors", "EVENT_SEQUENCE", eventPath, `${event.event} appears out of workflow order without workflow-reopened`, event.line);
    priorRank = Math.max(priorRank, rank);
  }
  let cycleStart = 0;
  for (const [index, event] of events.entries()) {
    if (event.event === "workflow-reopened") cycleStart = index + 1;
    if (event.event !== "m10-approved") continue;
    const latestReview = events.slice(cycleStart, index).filter(item => item.event === "draft-review-completed").at(-1);
    if (!latestReview || !/^pass$/i.test(latestReview.result || "")) add("errors", "REVIEW_GATE", eventPath, "the latest draft review in this workflow cycle before M10 must pass", latestReview?.line || event.line);
    cycleStart = index + 1;
  }
  for (const event of events.filter(item => /(?:review|audit)-completed$/.test(item.event) && /^(?:pass|fail)$/i.test(item.result || ""))) {
    if (!event.artifact) { add("errors", "REVIEW_ARTIFACT", eventPath, `${event.event} requires an artifact path`, event.line); continue; }
    const artifactPath = path.resolve(dir, event.artifact);
    if (!exists(artifactPath)) { add("errors", "REVIEW_ARTIFACT", eventPath, `review artifact missing: ${event.artifact}`, event.line); continue; }
    const contract = read(artifactPath);
    const contractVersion = String(event.contract || "2.1");
    const verdict = `VERDICT: ${event.result.toUpperCase()}`;
    const requiredContractFields = [verdict, "BLOCKERS", "NON-BLOCKERS", "NEXT GATE"];
    if (Number.parseFloat(contractVersion) >= 2.2) requiredContractFields.push(`CONTRACT: ${contractVersion}`, "CRITERIA EVIDENCE");
    for (const field of requiredContractFields) {
      if (!contract.toUpperCase().includes(field)) add("errors", "REVIEW_CONTRACT", artifactPath, `persisted evaluator response missing ${field}`, lineOf(contract, field));
    }
    if (event.artifactHash) {
      if (!/^[a-f0-9]{64}$/i.test(event.artifactHash) || event.artifactHash.toLowerCase() !== hash(artifactPath)) add("errors", "REVIEW_DIGEST", eventPath, `${event.artifact} does not match recorded artifactHash`, event.line);
    } else if (Number.parseFloat(contractVersion) >= 2.2) add("errors", "REVIEW_DIGEST", eventPath, `contract ${contractVersion} review requires artifactHash`, event.line);
    if (Number.parseFloat(contractVersion) >= 2.2) {
      if (!/^[a-f0-9]{64}$/i.test(event.subjectHash || "") || !event.revision) add("errors", "REVIEW_SUBJECT", eventPath, `contract ${contractVersion} review requires revision and subjectHash`, event.line);
      if (event.event !== "draft-review-completed" && !/^[a-f0-9]{64}$/i.test(event.scenarioHash || "")) add("errors", "REVIEW_SUBJECT", eventPath, `${event.event} requires scenarioHash`, event.line);
      const currentRevision = req.match(/^\*\*Revision:\*\*\s*([^\r\n]+)/m)?.[1]?.trim();
      if (currentRevision === event.revision && event.subjectHash && event.subjectHash.toLowerCase() !== hash(files["requirements.md"])) add("errors", "REVIEW_SUBJECT", eventPath, `requirements changed after ${event.event} for ${event.revision}`, event.line);
      const scenarioRevision = scenario.match(/^\*\*Revision:\*\*\s*([^\r\n]+)/m)?.[1]?.trim();
      if (event.scenarioHash && scenarioRevision === event.revision && event.scenarioHash.toLowerCase() !== hash(files["scenario-matrix.md"])) add("errors", "REVIEW_SUBJECT", eventPath, `scenario matrix changed after ${event.event} for ${event.revision}`, event.line);
    }
    const nextGateLine = contract.match(/NEXT GATE[^\r\n]*/i)?.[0] || "";
    const eligibilityMatches = /^pass$/i.test(event.result) ? /\beligible\b/i.test(nextGateLine) && !/\bnot eligible\b/i.test(nextGateLine) : /\bnot eligible\b/i.test(nextGateLine);
    if (!eligibilityMatches) add("errors", "REVIEW_CONTRACT", artifactPath, `${event.result} evaluator has inconsistent NEXT GATE`, lineOf(contract, "NEXT GATE"));
  }
  const state = deriveState(contents, gpRows);
  out.states.push({ feature: rel(dir), ...state, eligible: out.errors.length === errorStart, blockers: [...new Set(out.errors.slice(errorStart).map(item => item.code))] });
  out.features.push(rel(dir));
}

function validate() {
  const out = { ok: true, workspace, features: [], states: [], errors: [], warnings: [] };
  if (!exists(configPath())) out.errors.push({ code: "CONFIG", file: rel(configPath()), line: 1, message: "config missing" });
  else {
    try { const cfg = readJson(configPath()); if (Number(cfg.version || 0) < 2) out.warnings.push({ code: "CONFIG_VERSION", file: rel(configPath()), line: 1, message: "config schema is legacy; run upgrade" }); }
    catch { out.errors.push({ code: "CONFIG_JSON", file: rel(configPath()), line: 1, message: "invalid JSON" }); }
  }
  const dirs = resolveFeatureDirs(option("feature"));
  if (option("feature") && !dirs.length) out.errors.push({ code: "FEATURE", file: option("feature"), line: 1, message: "feature not found" });
  for (const dir of [...new Set(dirs)]) validateFeature(dir, out);
  out.ok = out.errors.length === 0;
  if (flag("json")) console.log(JSON.stringify(out, null, 2));
  else {
    for (const severity of ["errors", "warnings"]) {
      console.log(`${severity.toUpperCase()} (${out[severity].length})`);
      for (const i of out[severity]) console.log(`- ${i.file}:${i.line} [${i.code}] ${i.message}`);
    }
    if (flag("explain-state")) {
      console.log("\nSTATE");
      for (const item of out.states) console.log(`- ${item.feature}: ${item.state}; next=${item.nextGate}; eligible=${item.eligible}${item.blockers.length ? `; blockers=${item.blockers.join(",")}` : ""}`);
    }
    console.log(`\nCHECKED ${out.features.length} feature(s) — ${out.ok ? "PASS" : "FAIL"}`);
  }
  return out.ok ? 0 : 1;
}

try {
  let code = 0;
  if (Number(process.versions.node.split(".")[0]) < 18) throw new Error("Node.js 18+ required");
  if (command === "install") install();
  else if (command === "check") code = doctor();
  else if (command === "check-upgrade") checkUpgrade();
  else if (command === "upgrade") upgrade();
  else if (command === "record-event") recordEvent();
  else if (command === "materialize-decisions") materializeDecisions();
  else if (command === "validate") code = validate();
  else {
    console.log("Usage: letsmake-tools.mjs install|check|check-upgrade|upgrade|validate|record-event|materialize-decisions --workspace DIR [--pack DIR] [--feature PATH|SLUG] [--dry-run] [--accept-current PATH[,PATH...]] [--json] [--explain-state]");
    code = command === "help" ? 0 : 2;
  }
  process.exitCode = code;
} catch (error) {
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
}
