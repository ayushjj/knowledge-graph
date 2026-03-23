# Scout Auto-Review: Decisions Log

## Decision 1: Add dimensions to existing self-review vs. create separate review pass

**Chosen:** Add R5-R7 to existing Step 5.5

**Alternatives considered:**
- **A: Separate Step 5.6** — run R5-R7 as an independent step after Step 5.5. Cleaner separation but adds a new pipeline step, and the "After review" paragraph at line 232 would need to reference two review steps.
- **B: Invoke /review-plan on the report** — use the existing 7-dimension review skill. Overkill: /review-plan is designed for implementation plans, not classification reports. Its dimensions (root cause, blast radius, rollback) don't map to "is this tip correctly classified?"

**Why:** R5-R7 are the same TYPE of check as R1-R4 (review a classification before presenting it). They just check different things. Keeping them in the same step is simpler and the sequential R1-R4 → R5-R7 ordering naturally gives "internal consistency first, external validity second."

## Decision 2: R7 as subjective prompt vs. mechanical checklist

**Chosen:** Subjective prompt ("ask three questions")

**Alternatives considered:**
- **A: Checklist** — define specific rules like "if tip requires new subscription → Not Applicable unless user has that subscription." More mechanical, less judgment. But can't anticipate all the ways a tip might not "earn its place."
- **B: Scoring system** — rate each tip 1-5 on philosophy-fit, problem-existence, complexity-cost. Too heavy for a ~6-line addition.

**Why:** The manual review that caught the 4 misclassifications used exactly this approach — asking "does this serve your operating model?" and "is this solving a real problem?" Formalizing the exact questions that worked is the right level of structure. The user accepts that this is a judgment call and reviews reports anyway.

## Decision 3: GStack re-scout as inline analysis vs. /scout invocation

**Chosen:** Inline analysis with report file output

**Why:** /scout expects URLs/text as input. GStack is a GitHub repo requiring structured exploration (README, skill folders, architecture patterns). A /scout invocation would try to extract "tips" from a README, which is the wrong abstraction — we need to evaluate architectural patterns against our setup. The output uses the same report format for consistency.

## Decision 4: Correct the mvanhorn report vs. leave it and note errors

**Chosen:** Correct the report with reclassification notes

**Why:** Scout reports are an audit trail. A report with known-wrong classifications pollutes future R5 dedup checks — a future scout run might read the mvanhorn report and think "voice input was Novel" when it wasn't. Correcting with explicit Review Notes preserves the audit trail while fixing the data.

## Decision 5: GStack adoption items — verify all 6 vs. assume pending

**Chosen:** Verify each with specific greps

**Why:** Mistake pattern "Asserted config/settings state without reading the file first" (3x). The plan agent assumed "check if adopted" was sufficient — the review-plan correctly flagged this as a completeness gap and required specific grep targets.
