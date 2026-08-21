// Count-mention scanning for README.md, extracted from validate-graph.js so it can be
// unit-tested. It could not be before, and that is exactly how a check shipped that was
// structurally incapable of failing on the stale line it was written to catch: every
// "positive control" mutated a line the regex already matched, so each one only confirmed
// the regex's own assumptions. Table tests below are the falsifier that was missing.

// A count claim: 3+ digits (optionally comma-grouped, optionally "+"), then an optional
// adjective, then the noun. Each piece earns its place against real README text:
//   (?<![\d,#.\-])  left boundary. Without it the engine restarts mid-number:
//                   "1,000 insights" captured "000" and reported "says 0"; "#1234 nodes"
//                   captured an issue number; "2-5 atomic insights" captured the 5.
//   \d[\d,]{2,}     3+ digits with optional comma grouping, so "1,000" reads as 1000.
//                   The 3-digit floor keeps real prose out — README has
//                   "Major contributors (2+ insights)" and "2-5 atomic insights".
//   [a-z]+\s+       one optional adjective: "251 connected insights".
//   insights?|nodes both nouns are used for the same fact in this README.
export const COUNT_MENTION = /(?<![\d,#.\-])(\d[\d,]{2,})\+?\s+(?:[a-z]+\s+)?(?:insights?|nodes)\b/gi;

// A topics claim. `topics?` — singular matters: "14 topic MOCs" is how the stale count hid.
// The lookbehind excludes BOTH "(" and a digit: guarding only "(" let the engine restart at
// the second digit of "(14 topics" and report a phantom "4".
export const TOPICS_MENTION = /(?<![(\d])(\d+)\s+topics?\b(?!\))/gi;

/**
 * Scan README text for count mentions, keeping line numbers so a failure can name the
 * exact line to edit.
 * @param {string} readme raw README.md contents
 * @returns {{ mentionsOf: (regex: RegExp) => Array<{line: number, value: number}>,
 *             COUNT_MENTION: RegExp, TOPICS_MENTION: RegExp }}
 */
export function readmeScanner(readme) {
  const lines = readme.split('\n');
  return {
    COUNT_MENTION,
    TOPICS_MENTION,
    mentionsOf(regex) {
      const found = [];
      lines.forEach((line, i) => {
        // Fresh RegExp per line: these carry /g, and a shared /g regex keeps lastIndex
        // between calls, which would silently skip matches.
        for (const m of line.matchAll(new RegExp(regex.source, regex.flags))) {
          found.push({ line: i + 1, value: parseInt(m[1].replace(/,/g, ''), 10) });
        }
      });
      return found;
    },
  };
}
