#!/usr/bin/env node
// validate-graph.js — Checks 6 graph invariants for the knowledge graph
// Replaces validate-graph.sh (bash version took 5+ min on Windows due to subprocess overhead)
// Run: node validate-graph.js
// Exits non-zero on any failure
// Note: reciprocal-link check removed 2026-04-15 — edges are now stored one-way (outgoing:) per Principle 30.

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

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

// --- Check 1: Node count match (files vs yaml vs README) ---
const insightFiles = fs.readdirSync(path.join(__dirname, 'insights'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))
  .sort();

const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
const readmeMatch = readme.match(/^(\d+)\+?\s*insights/m);
const readmeCount = readmeMatch ? parseInt(readmeMatch[1]) : -1;

if (insightFiles.length === nodeCount && nodeCount === readmeCount) {
  pass(`Node count: ${insightFiles.length} files, ${nodeCount} in yaml, ${readmeCount} in README`);
} else {
  fail(`Node count mismatch: ${insightFiles.length} files, ${nodeCount} in yaml, ${readmeCount} in README`);
}

// --- Check 2: Node IDs match filenames ---
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

// --- Check 3: All link targets exist ---
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

// --- Check 4: Topic files exist ---
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

// --- Check 5: Topic MOC coverage ---
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

// --- Check 6: No broken wikilinks in prose ---
const topicSlugs = fs.readdirSync(path.join(__dirname, 'topics'))
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''));

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
