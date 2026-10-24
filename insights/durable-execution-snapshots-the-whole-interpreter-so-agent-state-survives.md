---
title: "Durable execution snapshots the whole interpreter, so a code-mode session survives restarts and hours-long waits"
description: "dquickts, a QuickJS fork Tobi Lutke called an excellent code mode env, can pause a running program even mid-loop, write its entire heap to bytes and resume it in another process; a REPL built on it keeps functions, variables and closures across restarts"
topics: [ai-agents, ai-coding-tools]
source: "@tobi (tobi lutke) — Excellent code mode env (stencil-hq/dquickts README)"
source_file: "sources/tobi-mcp-vs-cli-wrong-layer-dquickts.md"
date: 2026-10-24
domain: "ai"
kind: "principle"
---

The dquickts README describes a fork of QuickJS that adds durable execution: "You can pause a running program, even in the middle of a `for` loop, serialize its whole heap to bytes, and resume it later in a different process." A snapshot holds every object, closure, compiled function, pending promise and, if the program was suspended, its call stack. Restored, "objects keep their identity" and "pending work is still pending." The durable REPL (`qjs --drepl FILE`) saves the whole session after every command, so functions and variables come back after a restart. The README's example session takes about 400 bytes. A full snapshot of even an empty runtime is about 13 KB, which is why it writes deltas.

The agent-relevant feature is durable host calls. A host function can park the script that called it until an answer arrives. The process can save the script and exit, and a later process loads it and finishes the call. The README's example use is a script whose answer "arrives hours later." This is the REPL-that-keeps-state from [[mcp-vs-cli-is-the-wrong-layer-agents-need-a-repl-that-keeps-state]], made literal. The state is the live program itself, not files left behind. It also gives [[treat-agent-as-operating-system-not-function]] an actual hibernate mechanism.

The limits matter. A snapshot only loads into the same engine build. Host state such as files and timers cannot be saved. Snapshots are "trusted input, like bytecode," and "malicious ones are not detected." This suggests it covers the durability half of [[agent-inputs-could-compile-to-one-checkable-execution-plan]] and not the security-check half. Compare [[virtual-filesystems-replace-sandboxes-for-agent-navigation]], which gets a cheap environment by faking the file system instead of saving a whole runtime.
