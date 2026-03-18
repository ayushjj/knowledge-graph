# Skill Improvement — Decisions

## Decision 1: Which Skills to Improve First

**Question**: Do we improve all 20 skills or focus on a subset?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| All 20 at once | Complete coverage | High risk of regressions, long session |
| Top 5 by usage | Highest ROI, manageable scope | 15 skills untouched |
| Top 5 + descriptions for all 20 | ROI + low-risk broad improvement | Slightly more work |

**Chosen**: Top 5 + descriptions for all 20

**Rationale**: Deep changes (gotchas, progressive disclosure, de-railroading) carry regression risk and need verification. Doing these on the 5 most-used skills captures ~80% of the value. Description rewrites are low-risk (metadata only, no behavioral change) so we can safely do all 20.

**Trade-off accepted**: 15 skills keep their monolithic SKILL.md structure for now.

## Decision 2: Progressive Disclosure — Which Skill to Split First

**Question**: Should we split `/learn` or `/scout` first as the pattern?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| `/learn` first | Most-used, most inline content (230 lines), highest token savings | Most complex — if it breaks, highest impact |
| `/scout` first | Less critical if it breaks | Only 2nd most inline-heavy |

**Chosen**: `/learn` first

**Rationale**: `/learn` is invoked far more frequently and has the most reference content to extract (~75 lines). It's also well-tested — we can verify with a real URL immediately. If the pattern works for `/learn`, applying it to `/scout` becomes mechanical.

**Trade-off accepted**: If `/learn` split goes wrong, the most-used skill is temporarily broken. Mitigated by testing immediately.

## Decision 3: XML Scaffolding — Keep or Remove

**Question**: Should we remove `<critical_sequence>`, `<validation_gate>`, `<decision_gate>` XML from skills?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| Remove all XML | Lighter, more natural | Risk of Claude skipping safety steps |
| Keep all XML | Safety preserved | Token waste (~30% of some skills) |
| Keep for data-safety skills only | Best of both | Inconsistent structure |

**Chosen**: Keep all XML (no change)

**Rationale**: The XML gates in `/batch`, `/audit-data`, `/spec` prevent real data loss. The Thariq article says "avoid railroading" but also says verification skills should "enforce programmatic assertions on state at each step." Our XML gates ARE that enforcement. Removing them is high-risk for marginal token savings. If we revisit, start with `/data-analysis` (low-risk, 4 steps) as a test.

**Trade-off accepted**: ~30% token overhead in 6 skills. Acceptable given the safety benefit.

## Decision 4: Gotchas — Where to Source Seed Content

**Question**: Where do initial gotchas come from?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| MEMORY.md lessons only | Already documented, verified | Only 3 lessons |
| MEMORY.md + CLAUDE.md mistake patterns | More coverage | Some mistake patterns are too general |
| MEMORY.md + CLAUDE.md + session recall | Most complete | Risk of fabricating from memory |

**Chosen**: MEMORY.md + relevant CLAUDE.md mistake patterns

**Rationale**: Both are documented and verified. MEMORY.md has skill-specific lessons (slug mismatch, source fidelity, context exhaustion). CLAUDE.md mistake patterns that map to specific skills (e.g., "Skipped log check" → `/investigate`) are also fair game. We do NOT seed from recall — source fidelity lesson applies to our own gotchas too.

**Trade-off accepted**: Initial gotchas will be sparse (2-3 per skill). The accumulation model will fill them in over time.

## Decision 5: Description Format — Trigger Spec Structure

**Question**: What format should trigger-spec descriptions follow?

**Options**:
| Option | Pros | Cons |
|--------|------|------|
| Pure "when to use" | Clear trigger, Thariq-aligned | Loses "what it does" context |
| "When + what" hybrid | Both contexts present | Longer, dilutes trigger signal |
| "When" lead + trigger phrases | Clear trigger + keyword matching | Slightly more verbose |

**Chosen**: "When" lead + trigger phrases

**Rationale**: Thariq says "the description field is what Claude scans to decide 'is there a skill for this request?'" Leading with "Use when..." directly addresses that scan. Appending "Triggers on..." adds keyword anchors for fuzzy matching. The "what it does" is implicit from the skill name and the SKILL.md content.

**Trade-off accepted**: Descriptions become slightly longer but more functionally useful.
