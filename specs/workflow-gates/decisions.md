# Workflow Gates — Decisions

## Decision 1: Flag File Location

**Question**: Where should the review gate flag file live?

| Option | Pros | Cons |
|--------|------|------|
| A: `$TMPDIR/.claude-review-done` | OS-managed, cleared on reboot, same pattern as /careful | Persists across sessions until reboot |
| B: Project-local `.claude-review-done` | Scoped to project | Clutters project dir, needs gitignore |
| C: In-memory (conversation-only) | Session-scoped automatically | Hooks can't read conversation state |

**Chosen**: A — $TMPDIR
**Rationale**: Same proven pattern as /careful and /freeze. Session persistence is acceptable — it means "you reviewed code this boot cycle" which is conservative but safe.

## Decision 2: Escape Hatch Mechanism

**Question**: How can users bypass the review gate for legitimate cases?

**Chosen**: Manual `touch "$TMPDIR/.claude-review-done"` or telling Claude to create the flag.
**Rationale**: The gate should have friction but not be a prison. Content-only changes auto-pass via /review's scope guard. For truly urgent bypasses, creating a temp file is 3 seconds.

## Decision 3: Tier 2 Enforcement Level

**Question**: Should /spec BLOCK without /premise-check, or just SUGGEST it?

**Chosen**: Suggest (offer), not block.
**Rationale**: /premise-check is for uncertain situations ("should we build this?"). Many /spec invocations have clear, well-understood problems. Blocking would add friction to the common case. The offer pattern catches the cases where it matters without slowing down clear-cut work.

## Decision 4: Scope of Workflow Gates Table

**Question**: How many skills should have workflow rules in CLAUDE.md?

**Chosen**: 6 gates (trigger→action pairs) + 4 proactive suggestions. Not every skill needs a gate.
**Rationale**: Only skills with detectable trigger conditions benefit from workflow rules. /scout, /learn, /telemetry have no natural trigger — they're user-initiated by design.
