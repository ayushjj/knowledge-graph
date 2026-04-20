# Session: 2026-04-03 - Bash validator → Node.js rewrite

## What Worked
- Diagnosing by timing the atomic operation (`while read | grep` loop) confirmed Windows process spawn as root cause in 2 minutes
- Node.js rewrite is 1:1 behavioral match — same 7 checks, same output format, same exit codes

## What Didn't Work
- Running `npm run check` in background: the bash validator stage took 5+ min and timed out
- Retrying the same command in foreground: same timeout, wasted time on 3 attempts before diagnosing

## Key Insight
On Windows/Git Bash, any script that spawns one subprocess per input line (`while read | echo | grep/sed/awk`) hits ~95ms/spawn overhead vs ~1-5ms on Unix. For 1,179 lines × 3-4 greps = ~4,000 spawns = 5+ minutes. The fix is always: rewrite in the language the project already uses (Node.js here). This applies to ANY bash validation/processing script on Windows.

## Files Changed
- `validate-graph.js` (new) — Node.js replacement for validate-graph.sh
- `package.json:10` — Updated check script to use node validator
- `.github/workflows/deploy.yml:30` — Updated CI to use node validator

## Metrics
- Before: validate-graph.sh took 5+ min on Windows (often timed out)
- After: validate-graph.js runs in 0.3s
- Full `npm run check` pipeline: 24s total
