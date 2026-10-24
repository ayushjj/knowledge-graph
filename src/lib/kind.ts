// Display labels for an insight's `kind`. The allowed values are defined once in
// lib/kind.js (the validator); tests/kind.test.ts pins these labels to that list.
export const KIND_LABELS = {
  'thinking-tool': 'Thinking tool',
  principle: 'Principle',
  practice: 'Practice',
  bet: 'Bet',
} satisfies Record<string, string>;

function isKind(kind: string): kind is keyof typeof KIND_LABELS {
  return kind in KIND_LABELS;
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
