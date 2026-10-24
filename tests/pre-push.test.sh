#!/bin/bash
# Canary for .githooks/pre-push, both directions, in a throwaway repo with a made-up terms list.
# Every bypass the 2026-10-24 reviews found must BLOCK; clean pushes must pass.
HOOK="$(cd "$(dirname "$0")/.." && pwd)/.githooks/pre-push"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
export HOME="$T/home"; mkdir -p "$HOME/.claude/level-up"
printf '# made-up terms\nAcmeco \nWidget Pricing\n' > "$HOME/.claude/level-up/kg-private-terms.txt"
git init -q --bare "$T/origin.git"; git init -q "$T/w"; cd "$T/w"
git config user.email t@example.com; git config user.name t; git config core.hooksPath /dev/null
git remote add origin "$T/origin.git"
echo hello > a.md; git add a.md; git commit -qm init; git push -q origin HEAD:master; git fetch -q origin
pass=0; fail=0
run() { # name want(0|1) ref... (lref lsha rref rsha lines on stdin)
  local name=$1 want=$2; shift 2
  bash "$HOOK" origin "$T/origin.git" >/dev/null 2>&1 < <(printf '%s\n' "$@"); local rc=$?
  [ $((rc>0)) = "$want" ] && pass=$((pass+1)) || { fail=$((fail+1)); echo "FAIL $name: want $want got rc=$rc"; }
}
Z=0000000000000000000000000000000000000000
base=$(git rev-parse origin/master)
push() { echo "refs/heads/x $(git rev-parse "$1") refs/heads/x $base"; }
fresh() { git checkout -q -B "$1" "$base"; }

fresh clean; echo fine >> a.md; git commit -qam ok;              run clean 0 "$(push HEAD)"
fresh plain; echo acmeco >> a.md; git commit -qam x;             run plain-term 1 "$(push HEAD)"
fresh trail; echo "x Acmeco" >> a.md; git commit -qam x;          run trailing-space-in-list 1 "$(push HEAD)"
fresh slug; echo x > widget-pricing.md; git add .; git commit -qm x; run slug-filename 1 "$(push HEAD)"
fresh wrap; printf 'the widget\npricing page\n' >> a.md; git commit -qam x; run wrapped-line 1 "$(push HEAD)"
fresh msg; git commit -q --allow-empty -m "for acmeco";          run commit-message 1 "$(push HEAD)"
fresh lock; mkdir -p public; echo acmeco > public/package-lock.json; git add .; git commit -qm x; run nested-lockfile 1 "$(push HEAD)"
fresh rootlock; echo acmeco > package-lock.json; git add .; git commit -qm x; run root-lockfile-skipped 0 "$(push HEAD)"
fresh m1; echo one > b.md; git add .; git commit -qm b
fresh m2; echo two > c.md; git add .; git commit -qm c
git merge -q --no-ff --no-commit m1 2>/dev/null; echo acmeco >> c.md; git add .; git commit -qm merge
run merge-added-term 1 "$(push HEAD)"
fresh tag; git tag -a v1 -m "release for acmeco" "$base"
run annotated-tag 1 "refs/tags/v1 $(git rev-parse v1) refs/tags/v1 $Z"
blob=$(echo acmeco | git hash-object -w --stdin)
run blob-ref 1 "refs/tags/b $blob refs/tags/b $Z"
run branch-delete 0 "(delete) $Z refs/heads/x $base"
printf 'bad(\n' > "$HOME/.claude/level-up/kg-private-terms.txt"; fresh inv; echo y >> a.md; git commit -qam y
run invalid-pattern 1 "$(push HEAD)"
rm "$HOME/.claude/level-up/kg-private-terms.txt";                 run missing-list 1 "$(push HEAD)"
echo "pre-push: passed $pass, failed $fail"; [ "$fail" = 0 ]
