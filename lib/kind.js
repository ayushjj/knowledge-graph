// What KIND of insight a node is — extracted so it is unit-testable, same rationale as
// lib/schema-keys.js and lib/readme-counts.js.
//
// kind answers "how should a reader use this at decision time?" (owner, 2026-10-24; the
// /learn skill's Step 2 holds the definitions):
//   thinking-tool — a mental model
//   principle     — a why / design rule / trade-off
//   practice      — a way of working that carries its reason
//   bet           — a claim about where things are going. A bet MUST carry bet_date, so it
//                   reads as a dated bet and not as a fact; nothing else may carry one.
//
// These two keys are the only per-node keys whose VALUES are closed, not merely typed: kind
// is an enum and bet_date a calendar date. That is why adding them to the closed key set in
// lib/schema-keys.js does not grow graph-index.yaml's exec surface — neither can hold a
// command, a mapping, or free text.

export const KINDS = Object.freeze(['thinking-tool', 'principle', 'practice', 'bet']);

const KIND_SET = new Set(KINDS);
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** A real calendar date in YYYY-MM-DD form (rejects 2026-02-30 and 2026-13-01). */
export function isIsoDate(value) {
  if (typeof value !== 'string') return false;
  const m = DATE_RE.exec(value);
  if (!m) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/**
 * @param {string} slug
 * @param {unknown} node one node from graph-index.yaml (or one insight's frontmatter)
 * @param {{ requireKind?: boolean }} [opts]
 * @returns {string[]} one message per violation; empty means the node's kind is valid
 */
export function kindErrors(slug, node, { requireKind = false } = {}) {
  if (typeof node !== 'object' || node === null || Array.isArray(node)) return [];
  const { kind, bet_date: betDate } = node;
  const errors = [];

  if (kind === undefined) {
    if (requireKind) errors.push(`${slug}: missing "kind" (one of ${KINDS.join(' | ')})`);
  } else if (!KIND_SET.has(kind)) {
    errors.push(`${slug}: kind "${String(kind)}" is not one of ${KINDS.join(' | ')}`);
  }

  if (kind === 'bet' && betDate === undefined) {
    errors.push(`${slug}: kind is bet but bet_date is missing — a bet must be dated`);
  }
  if (betDate !== undefined && kind !== 'bet') {
    errors.push(`${slug}: bet_date is set but kind is "${String(kind)}" — only a bet carries bet_date`);
  }
  if (betDate !== undefined && !isIsoDate(betDate)) {
    errors.push(`${slug}: bet_date "${String(betDate)}" is not a quoted YYYY-MM-DD date`);
  }

  return errors;
}

/**
 * Frontmatter is what the site renders; graph-index.yaml is what agents read. The two must
 * agree, or a reader and an agent see different kinds for the same insight.
 * @param {string} slug
 * @param {Record<string, unknown>} yamlNode
 * @param {Record<string, unknown>} frontmatter parsed by js-yaml — an unquoted date is a Date
 * @returns {string[]}
 */
export function kindMirrorErrors(slug, yamlNode, frontmatter) {
  const norm = v => (v instanceof Date ? v.toISOString().slice(0, 10) : v);
  const errors = [];
  for (const key of ['kind', 'bet_date']) {
    const a = norm(yamlNode[key]);
    const b = norm(frontmatter[key]);
    if (a !== b) {
      errors.push(`${slug}: ${key} differs — graph-index.yaml has ${JSON.stringify(a)}, insights/${slug}.md has ${JSON.stringify(b)}`);
    }
  }
  return errors;
}
