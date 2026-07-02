# Video research (YouTube / Loom)

Read when a spike's source is a **YouTube or Loom URL** (`type: video`, or `desk` with a video link).

**Prerequisite:** `yt-dlp` (`brew install yt-dlp`). Script: [`scripts/youtube-transcript.sh`](../../scripts/youtube-transcript.sh) — captions only, no video/audio download, temp files deleted on exit.

## URL detection (parent agent, before launch)

1. Auto-detect `youtube.com/watch`, `youtu.be/`, `youtube.com/shorts/`, `youtube.com/live/`, `loom.com/share/`, `loom.com/embed/`.
2. "this talk" / "Loom recording" **without URL** → one AskQuestion for the link.
3. Set backlog `type: video` (or keep `desk` if video is one of several sources).

## Transcript fetch (first step inside the parallel subagent)

```bash
scripts/youtube-transcript.sh --url "{video_url}" --out-dir "{feature_folder}/research/sources"
```

- Output: `{feature}/research/sources/{upload-date}-{title-slug}.md` (YAML frontmatter + transcript prose).
- YouTube prefers manual captions over auto; Loom uses native transcript on public share/embed URLs.
- Single video URLs only (playlist-only links fail clearly; `&list=` with a `v=` id fetches that one video). Warn if > 1h, still proceed.
- No captions → report in findings; suggest a paste or different source. (Whisper not in v1; captions-first is the policy for public English talks.)

## Analysis (treat the transcript like an article)

Analyze for **relevance to the active feature/epic**:

| Findings section        | Content                                    |
| ----------------------- | ------------------------------------------ |
| **Relevance**           | High / medium / low for this feature — why |
| **Key ideas**           | Bullets tied to discovery problem/solution |
| **Applicable patterns** | Adopt / adapt / reject                     |
| **EAR-\***              | Epic-adjacent ideas outside current scope  |
| **Source link**         | URL + saved transcript path                |

Link the transcript path in `discovery.md` findings (and the `R-{id}` digest if written).
