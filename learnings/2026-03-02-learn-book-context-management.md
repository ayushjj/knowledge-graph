# Session: 2026-03-02 - /learn-book Context Management

## What Worked
- `pdftotext` via Bash works reliably on Windows for PDF extraction (Read tool's PDF support doesn't work on Windows)
- Reading graph-index.yaml before extraction gives full picture of existing 58 nodes for cross-linking
- Short PDF filename (`poor-charlies-almanack.pdf`) works; long original filename with special characters causes I/O errors

## What Didn't Work
- **Reading entire 130-page chapter before extracting**: Talk 11 (pp. 480-612) required 7 chunks of ~20 pages each. Loading all text into context before starting extraction caused rapid context compaction, requiring session restart before any insights were created.

## Key Insight
For `/learn-book` with long chapters (40+ pages), extract insights incrementally per ~40-page sub-section rather than reading the entire chapter first. The current skill says "read in 20-page chunks, build comprehension notes across chunks, then extract" — but for 130-page sections, this fills context before extraction begins. Better approach: read 40 pages, extract 2-3 insights, read next 40, extract more. This keeps context fresh.

## Files Changed
- No files changed this session (all work was reading/exploring)

## Metrics
- Pages read: ~130 (Talk 11, pp. 480-612)
- Insights extracted: 0 (context exhausted before extraction step)
- Graph state: 62 insights, 14 topics, 2 domains (unchanged)
