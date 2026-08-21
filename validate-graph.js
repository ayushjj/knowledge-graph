#!/usr/bin/env node
// validate-graph.js — Checks 7 graph invariants for the knowledge graph
// Replaces validate-graph.sh (bash version took 5+ min on Windows due to subprocess overhead)
// Run: node validate-graph.js
// Exits non-zero on any failure
// Note: reciprocal-link check removed 2026-04-15 — edges are now stored one-way (outgoing:) per Principle 30.

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { readmeScanner } from './lib/readme-counts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let PASS = 0;
let FAIL = 0;

function pass(msg) { console.log(`[PASS] ${msg}`); PASS++; }
function fail(msg) { console.log(`[FAIL] ${msg}`); FAIL++; }

// --- Load graph-index.yaml ---
const yamlPath = path.join(__dirname, 'graph-index.yaml');
const graphIndex = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
const nodes = graphIndex.nodes;
const nodeCount = graphIndex.node_count;
const slugs = Object.keys(nodes).sort();
// Enumerated once here; Checks 2 and 7 both use it, so the two cannot drift apart.
const topicSlugs = fs.readdirSync(path.join(__dirname, 'topics'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''));

// --- Check 1: Node count match (files vs yaml vs README) ---
const insightFiles = fs.readdirSync(path.join(__dirname, 'insights'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))
  .sort();

const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');

// EVERY count-bearing README mention is checked, not just the first — the old regex was
// line-anchored (/^(\d+)\+?\s*insights/m) so it matched one line while the rest drifted.
// The complement to that is keeping the README's count copies FEW: decorative counts were
// removed from the prose and the structure fence, leaving the header stat line and the
// intro line as the only places a number is claimed. Fewer copies beat a cleverer regex.
const { mentionsOf, COUNT_MENTION, TOPICS_MENTION } = readmeScanner(readme);

// The census is the point. Checking only the mentions the regex HAPPENS to see means a
// reformat that hides the stale copy — bolding its number, adding a second adjective,
// reflowing across a newline — leaves the other copy correct and the build green, which is
// the original bug wearing a new hat. Pinning the count makes any such edit fail closed:
// you are told a mention disappeared, instead of being told everything is fine.
const EXPECTED_COUNT_MENTIONS = 2;  // README.md:5 (header stat) and :21 (intro)
const EXPECTED_TOPIC_MENTIONS = 1;  // README.md:5 only
const nodeMentions = mentionsOf(COUNT_MENTION);
const nodeStale = nodeMentions.filter(m => m.value !== nodeCount);

if (nodeMentions.length !== EXPECTED_COUNT_MENTIONS) {
  fail(`Node count: expected ${EXPECTED_COUNT_MENTIONS} count-bearing README mentions, found ${nodeMentions.length}` +
       ` (at ${nodeMentions.map(m => `:${m.line}`).join(', ') || 'nowhere'}) — a reword may have hidden one,` +
       ` or a new one was added. Fix the README or update EXPECTED_COUNT_MENTIONS.`);
} else if (insightFiles.length === nodeCount && nodeStale.length === 0) {
  pass(`Node count: ${insightFiles.length} files, ${nodeCount} in yaml, ${nodeMentions.length} README mentions all ${nodeCount}`);
} else {
  const detail = nodeStale.map(m => `README.md:${m.line} says ${m.value}`).join('; ');
  fail(`Node count mismatch: ${insightFiles.length} files, ${nodeCount} in yaml${detail ? ' — ' + detail : ''}`);
}

// --- Check 2: README topics count matches topics/*.md ---
// Parenthesised per-domain breakdowns — "(6 topics): Agents, Architecture, …" — are NOT
// checked: they name their topics inline, so a wrong number there is visible to any reader.
// Validating them needed a second regex whose lookarounds had to stay in sync with this
// one, and that coupling was itself the bug (a "(14 topics, listed below)" would match at
// the second digit and report a phantom "4"). One regex, one rule.
const topicMentions = mentionsOf(TOPICS_MENTION);
const topicsStale = topicMentions.filter(m => m.value !== topicSlugs.length);

if (topicMentions.length !== EXPECTED_TOPIC_MENTIONS) {
  fail(`Topics count: expected ${EXPECTED_TOPIC_MENTIONS} "N topics" README mention, found ${topicMentions.length}` +
       ` (at ${topicMentions.map(m => `:${m.line}`).join(', ') || 'nowhere'}) — prose like "filed under 1 topic"` +
       ` counts as a mention. Reword it, or update EXPECTED_TOPIC_MENTIONS.`);
} else if (topicsStale.length === 0) {
  pass(`Topics count: ${topicSlugs.length} topic files, ${topicMentions.length} README mentions all ${topicSlugs.length}`);
} else {
  const detail = topicsStale.map(m => `README.md:${m.line} says ${m.value}`).join('; ');
  fail(`Topics count mismatch: ${topicSlugs.length} topic files — ${detail}`);
}

// --- Check 3: Node IDs match filenames ---
const yamlOnly = slugs.filter(s => !insightFiles.includes(s));
const fileOnly = insightFiles.filter(f => !slugs.includes(f));

if (yamlOnly.length === 0 && fileOnly.length === 0) {
  pass('All node IDs match filenames');
} else {
  let msg = 'Node ID mismatch:';
  if (yamlOnly.length) msg += ` in yaml but no file: ${yamlOnly.join(', ')}`;
  if (fileOnly.length) msg += ` file exists but not in yaml: ${fileOnly.join(', ')}`;
  fail(msg);
}

// --- Check 4: All link targets exist ---
const missingTargets = new Set();

for (const slug of slugs) {
  const node = nodes[slug];
  for (const target of (node.outgoing || [])) {
    if (!nodes[target]) missingTargets.add(target);
  }
}

if (missingTargets.size === 0) {
  pass('All link targets exist as nodes');
} else {
  fail(`Link targets reference non-existent nodes: ${[...missingTargets].join(' ')}`);
}

// --- Check 5: Topic files exist ---
const missingTopics = new Set();
for (const slug of slugs) {
  for (const topic of (nodes[slug].topics || [])) {
    const topicPath = path.join(__dirname, 'topics', `${topic}.md`);
    if (!fs.existsSync(topicPath)) missingTopics.add(topic);
  }
}

if (missingTopics.size === 0) {
  pass('All topic files exist');
} else {
  fail(`Missing topic files: ${[...missingTopics].join(' ')}`);
}

// --- Check 6: Topic MOC coverage ---
const mocErrors = [];
const topicCache = {};

for (const slug of slugs) {
  for (const topic of (nodes[slug].topics || [])) {
    const topicPath = path.join(__dirname, 'topics', `${topic}.md`);
    if (!fs.existsSync(topicPath)) continue;

    if (!topicCache[topic]) {
      topicCache[topic] = fs.readFileSync(topicPath, 'utf8');
    }

    if (!topicCache[topic].includes(`[[${slug}]]`)) {
      mocErrors.push(`  [[${slug}]] missing from topics/${topic}.md`);
    }
  }
}

if (mocErrors.length === 0) {
  pass('Topic MOC coverage: all nodes appear in their topic files');
} else {
  fail(`Topic MOC coverage:\n${mocErrors.join('\n')}`);
}

// --- Check 7: No broken wikilinks in prose ---
const validTargets = new Set([...slugs, ...topicSlugs]);
const brokenLinks = [];
const wikilinkRegex = /\[\[([a-z0-9-]+)\]\]/g;

for (const file of insightFiles) {
  const content = fs.readFileSync(path.join(__dirname, 'insights', `${file}.md`), 'utf8');
  let match;
  while ((match = wikilinkRegex.exec(content)) !== null) {
    if (!validTargets.has(match[1])) {
      brokenLinks.push(`  [[${match[1]}]] in ${file}.md -> no such node or topic`);
    }
  }
}

if (brokenLinks.length === 0) {
  pass('No broken wikilinks in insight prose');
} else {
  fail(`Broken wikilinks:\n${brokenLinks.join('\n')}`);
}

// --- Summary ---
const TOTAL = PASS + FAIL;
console.log('');
if (FAIL === 0) {
  console.log(`${PASS}/${TOTAL} checks passed ✓`);
  process.exit(0);
} else {
  console.log(`${PASS}/${TOTAL} checks passed, ${FAIL} failures`);
  process.exit(1);
}
