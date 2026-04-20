# Session: 2026-03-30 - YouTube Ingestion Pipeline

## What Worked
- `yt-dlp --write-auto-sub --sub-lang en --sub-format srt` grabs auto-captions without downloading video
- SRT cleanup: `sed '/^[0-9]*$/d; /^$/d; /-->/d' | sed 's/<[^>]*>//g' | awk '!seen[$0]++'` produces clean text
- Auto-captions quality sufficient for insight extraction on well-produced English podcasts
- No Whisper API needed — saved cost and complexity

## What Didn't Work
- Running `bash validate-graph.sh` 10+ times in background created 22 zombie processes
- Bash background tasks on Windows Git Bash are unreliable for output capture — run once, wait for notification

## Key Insight
Auto-captions have transcription errors ("Quad Code" for "Claude Code") but /learn extracts ideas not quotes, so errors don't propagate into insights. Option A (free captions) beats Option B (Whisper API) for this use case.

## Files Changed
- 5 new insight files from Boris Cherny YC Light Cone podcast
- 5 existing insights updated with back-links
- All topic MOCs, graph-index.yaml, index.md, README.md updated

## Metrics
- Before: 128 insights, text-only ingestion
- After: 133 insights, YouTube ingestion pipeline proven
- Validation: 7/7 checks pass, 18/18 tests pass
