// Display labels for an insight's `kind`. The allowed values are defined once in
// lib/kind.js; `satisfies Record<Kind, string>` makes a missing or extra label a type error.
import { KINDS } from '../../lib/kind.js';

export type Kind = (typeof KINDS)[number];

export const KIND_LABELS = {
  'thinking-tool': 'Thinking tool',
  principle: 'Principle',
  practice: 'Practice',
  bet: 'Bet',
} satisfies Record<Kind, string>;

// Object.hasOwn, not `in`: `in` also matches inherited names such as "constructor".
function isKind(kind: string): kind is Kind {
  return Object.hasOwn(KIND_LABELS, kind);
}

/** "Principle", or "Bet · 2026-08-22" for a dated bet; null when the insight has no kind. */
export function kindLabel(kind: string | undefined, betDate: string | undefined): string | null {
  if (kind === undefined) return null;
  const label = isKind(kind) ? KIND_LABELS[kind] : kind;
  return kind === 'bet' && betDate ? `${label} · ${betDate}` : label;
}

/** A frontmatter date (coerced to Date by the content schema) as YYYY-MM-DD. */
export function isoDay(date: Date | undefined): string | undefined {
  return date ? date.toISOString().slice(0, 10) : undefined;
}
