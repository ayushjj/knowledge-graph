# Session: 2026-03-06 - /learn Pipeline Optimization + Fidelity Spot-Check

## What Worked
- **Background verification agents**: 4 parallel agents verified 7 insights across 4 articles. The Excel AI agents agent found the "missing" article via web search (HN + X) when direct Substack fetch failed — caught 3 errors the main session missed.
- **Inline /connect in SKILL.md**: Replacing the standalone `/connect` skill invocation with inline back-linking eliminates redundant graph-index.yaml re-reads and leaf-node scans. Expected 3-5 min savings per `/learn` run.
- **Batch graph-index.yaml edits**: Single Edit call instruction prevents multiple sequential file re-reads.

## What Didn't Work
- **Jina Reader for Substack**: `nicbstme.substack.com` redirects to `substack.com/@nicbstme`, and the archive page at `www.nicolasbustamante.com` is the real domain. First 4 parallel WebFetch calls all returned landing page chrome. Had to discover the correct domain via redirect chain.
- **Background agent output retrieval**: TaskOutput returned "No task found" for agent task IDs. Had to read output files directly via Bash.
- **Direct article fetch for paywalled content**: The Excel AI agents article couldn't be fetched directly (Substack blocked Jina + direct fetch). Web search found indexed excerpts and quotes from HN/X instead.

## Key Insight
Background verification agents are most valuable when they use **web search as fallback** for content that can't be fetched directly. The Excel agent's strategy (search HN, X, secondary sources for article quotes) succeeded where direct fetching failed. This pattern — fetch first, search-verify second — should be the default for any source verification task.

## Files Changed
- `~/.claude/skills/learn/SKILL.md` — 3 edits: X Article detection (Step 0), batch edits (Step 6), inline back-links (Step 8)
- `insights/domain-skill-libraries-are-the-real-agent-moat.md` — Fixed 3 claims: Shortcut 11→1 tool, "structural"→"domain" expertise, removed partial-source flag
- `insights/safety-enforcement-belongs-in-tool-design-not-prompts.md` — Fixed Copilot safety claim (no protection, not "system prompt"), removed partial-source flag
- `insights/kv-cache-hit-rate-determines-agent-economics.md` — Fixed stat "4-10x"→"up to 10x"
- `insights/context-inefficiency-compounds-three-penalties.md` — Removed editorial sentence
- `graph-index.yaml` — Source fields + description updates for corrected insights

## Metrics
- Fidelity: 7/7 @nicbstme insights now verified (was 5 verified + 2 flagged)
- Claims corrected: 4 across 4 insight files
- Error types matched predictions: fabricated number (11 tools), wrong quote ("structural"), editorial synthesis (Copilot lumped with Shortcut)
- Commits pushed: 3 (294c6ab, 72ccc12, d15f9c5)
