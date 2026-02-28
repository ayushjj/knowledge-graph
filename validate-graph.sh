#!/bin/bash
# validate-graph.sh — Checks 7 graph invariants for the knowledge graph
# Run: bash validate-graph.sh
# Exits non-zero on any failure

PASS=0
FAIL=0

pass() { echo "[PASS] $1"; PASS=$((PASS + 1)); }
fail() { echo "[FAIL] $1"; FAIL=$((FAIL + 1)); }

YAML="graph-index.yaml"

# --- Pre-parse: extract all node data into temp files ---
TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

# Extract node keys
grep -E '^  [a-z][a-z0-9-]+:$' "$YAML" | sed 's/^  //;s/:$//' | sort > "$TMPDIR/yaml_nodes.txt"

# For each node, extract outgoing, incoming, and topics into separate files
current_node=""
while IFS= read -r line; do
  # Detect node header (2-space indent, lowercase slug, colon)
  if echo "$line" | grep -qE '^  [a-z][a-z0-9-]+:$'; then
    current_node=$(echo "$line" | sed 's/^  //;s/:$//')
  fi
  if [[ -n "$current_node" ]]; then
    if echo "$line" | grep -q '    outgoing:'; then
      echo "$line" | sed 's/.*\[//;s/\]//' | tr ',' '\n' | tr -d ' ' | grep -v '^$' > "$TMPDIR/${current_node}.outgoing" 2>/dev/null || true
    fi
    if echo "$line" | grep -q '    incoming:'; then
      echo "$line" | sed 's/.*\[//;s/\]//' | tr ',' '\n' | tr -d ' ' | grep -v '^$' > "$TMPDIR/${current_node}.incoming" 2>/dev/null || true
    fi
    if echo "$line" | grep -q '    topics:'; then
      echo "$line" | sed 's/.*\[//;s/\]//' | tr ',' '\n' | tr -d ' ' | grep -v '^$' > "$TMPDIR/${current_node}.topics" 2>/dev/null || true
    fi
  fi
done < "$YAML"

# --- Check 1: Node count match (files vs yaml vs README) ---
file_count=$(ls insights/*.md 2>/dev/null | wc -l | tr -d ' ')
yaml_count=$(grep '^node_count:' "$YAML" | awk '{print $2}')
readme_count=$(grep -o '^[0-9]* curated insights' README.md | awk '{print $1}')

if [[ "$file_count" == "$yaml_count" && "$yaml_count" == "$readme_count" ]]; then
  pass "Node count: $file_count files, $yaml_count in yaml, $readme_count in README"
else
  fail "Node count mismatch: $file_count files, $yaml_count in yaml, $readme_count in README"
fi

# --- Check 2: Node IDs match filenames ---
file_nodes=$(ls insights/*.md | sed 's|insights/||;s|\.md$||' | sort)

yaml_only=$(comm -23 "$TMPDIR/yaml_nodes.txt" <(echo "$file_nodes"))
file_only=$(comm -13 "$TMPDIR/yaml_nodes.txt" <(echo "$file_nodes"))

if [[ -z "$yaml_only" && -z "$file_only" ]]; then
  pass "All node IDs match filenames"
else
  msg="Node ID mismatch:"
  [[ -n "$yaml_only" ]] && msg="$msg in yaml but no file: $(echo $yaml_only)"
  [[ -n "$file_only" ]] && msg="$msg file exists but not in yaml: $(echo $file_only)"
  fail "$msg"
fi

# --- Check 3: Reciprocal links ---
reciprocal_errors=""

while IFS= read -r node; do
  # Check outgoing: if A->B in outgoing, B must have A in incoming
  if [[ -f "$TMPDIR/${node}.outgoing" ]]; then
    while IFS= read -r target; do
      [[ -z "$target" ]] && continue
      if [[ ! -f "$TMPDIR/${target}.incoming" ]] || ! grep -qx "$node" "$TMPDIR/${target}.incoming"; then
        reciprocal_errors="${reciprocal_errors}
  ${node} -> ${target} (outgoing) but ${target} missing ${node} in incoming"
      fi
    done < "$TMPDIR/${node}.outgoing"
  fi

  # Check incoming: if A lists B in incoming, B must have A in outgoing
  if [[ -f "$TMPDIR/${node}.incoming" ]]; then
    while IFS= read -r source; do
      [[ -z "$source" ]] && continue
      if [[ ! -f "$TMPDIR/${source}.outgoing" ]] || ! grep -qx "$node" "$TMPDIR/${source}.outgoing"; then
        reciprocal_errors="${reciprocal_errors}
  ${source} -> ${node} (${node} lists ${source} in incoming) but ${source} missing ${node} in outgoing"
      fi
    done < "$TMPDIR/${node}.incoming"
  fi
done < "$TMPDIR/yaml_nodes.txt"

if [[ -z "$reciprocal_errors" ]]; then
  pass "Reciprocal links: all outgoing/incoming pairs match"
else
  fail "Reciprocal links:${reciprocal_errors}"
fi

# --- Check 4: All link targets exist ---
missing_targets=""
for f in "$TMPDIR"/*.outgoing "$TMPDIR"/*.incoming; do
  [[ -f "$f" ]] || continue
  while IFS= read -r target; do
    [[ -z "$target" ]] && continue
    if ! grep -qx "$target" "$TMPDIR/yaml_nodes.txt"; then
      missing_targets="${missing_targets} ${target}"
    fi
  done < "$f"
done

if [[ -z "$missing_targets" ]]; then
  pass "All link targets exist as nodes"
else
  fail "Link targets reference non-existent nodes:$(echo "$missing_targets" | tr ' ' '\n' | sort -u | tr '\n' ' ')"
fi

# --- Check 5: Topic files exist ---
missing_topics=""
for f in "$TMPDIR"/*.topics; do
  [[ -f "$f" ]] || continue
  while IFS= read -r topic; do
    [[ -z "$topic" ]] && continue
    if [[ ! -f "topics/${topic}.md" ]]; then
      missing_topics="${missing_topics} ${topic}"
    fi
  done < "$f"
done

if [[ -z "$missing_topics" ]]; then
  pass "All topic files exist"
else
  fail "Missing topic files:$(echo "$missing_topics" | tr ' ' '\n' | sort -u | tr '\n' ' ')"
fi

# --- Check 6: Topic MOC coverage ---
moc_errors=""
while IFS= read -r node; do
  if [[ -f "$TMPDIR/${node}.topics" ]]; then
    while IFS= read -r topic; do
      [[ -z "$topic" ]] && continue
      if [[ -f "topics/${topic}.md" ]]; then
        if ! grep -q "\[\[${node}\]\]" "topics/${topic}.md"; then
          moc_errors="${moc_errors}
  [[${node}]] missing from topics/${topic}.md"
        fi
      fi
    done < "$TMPDIR/${node}.topics"
  fi
done < "$TMPDIR/yaml_nodes.txt"

if [[ -z "$moc_errors" ]]; then
  pass "Topic MOC coverage: all nodes appear in their topic files"
else
  fail "Topic MOC coverage:${moc_errors}"
fi

# --- Check 7: No broken wikilinks in prose ---
# Collect valid targets: insight nodes + topic slugs
ls topics/*.md 2>/dev/null | sed 's|topics/||;s|\.md$||' | sort > "$TMPDIR/topic_slugs.txt"
cat "$TMPDIR/yaml_nodes.txt" "$TMPDIR/topic_slugs.txt" | sort -u > "$TMPDIR/valid_targets.txt"

broken_links=""
for f in insights/*.md; do
  links=$(grep -oE '\[\[[a-z0-9-]+\]\]' "$f" 2>/dev/null | sed 's/\[\[//;s/\]\]//' | sort -u) || true
  for link in $links; do
    [[ -z "$link" ]] && continue
    if ! grep -qx "$link" "$TMPDIR/valid_targets.txt"; then
      broken_links="${broken_links}
  [[${link}]] in $(basename $f) -> no such node or topic"
    fi
  done
done

if [[ -z "$broken_links" ]]; then
  pass "No broken wikilinks in insight prose"
else
  fail "Broken wikilinks:${broken_links}"
fi

# --- Summary ---
TOTAL=$((PASS + FAIL))
echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "${PASS}/${TOTAL} checks passed ✓"
  exit 0
else
  echo "${PASS}/${TOTAL} checks passed, ${FAIL} failures"
  exit 1
fi
