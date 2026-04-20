# Master Index: Claude Code Learning Journey

*Created: January 15, 2025*
*Last Updated: January 29, 2025*
*Exported from Claude conversation*

---

## Quick Navigation

- [Core Concepts](#core-concepts)
- [Tools & Resources](#tools--resources)
- [What I've Built](#what-ive-built)
- [Daily Workflows](#daily-workflows)
- [Advanced Topics](#advanced-topics)
- [Troubleshooting](#troubleshooting)
- [Quick Reference Cards](#quick-reference-cards)

---

## Core Concepts

### 1. Compound Engineering (Benjamin De Kraker)

**Source:** Twitter thread  
**Key Idea:** Each unit of work makes future work EASIER, not harder

**Four-Step Process:**

1. PLAN (40% of time) - Research, best practices, detailed plan
2. WORK (20%) - Execute systematically
3. ASSESS/REVIEW (40%) - 12-agent parallel review
4. COMPOUND - Document learnings, update patterns

**When to review:** After each major feature (not after MVP)

**Plugin:** https://github.com/EveryInc/compound-engineering-plugin

- 24 agents, 13 commands, 11 skills
- Commands: /plan, /work, /review, /compound

**Status:** Advanced - Month 2+ implementation

---

### 2. Agent-Native Architecture (Dan Shipper/Every)

**Source:** Every.to article  
**Key Idea:** Features are prompts, not code

**Three Characteristics:**

1. **Parity** - User and agent use same tools
2. **Granularity** - Tools more atomic than features
3. **Composability** - Agent combines tools in new ways

**Example for WhatsApp Bot:**
Instead of coding: 100 specific features
Build: Atomic tools (search, filter, sort, calculate_score)
Result: Infinite flexibility through composition

**Status:** Architectural principle - apply now

---

### 3. Ralph / Autonomous Coding Loop (Ryan Carson)

**Source:** Twitter threads (Jan 13 + Jan 29, 2025)
**Key Idea:** Bash loop that ships features while you sleep

**Basic Loop:**
```
1. Read prd.json (task list)
2. Read progress.txt (past learnings)
3. Pick next incomplete task
4. Implement it
5. Run tests
6. Commit if passing
7. Mark complete
8. Log learnings
9. Fresh context, repeat
```

**Advanced: Nightly Two-Part Loop:**
```
10:30 PM — Compound Review
  └─ Review day's threads
  └─ Extract missed learnings
  └─ Update CLAUDE.md
  └─ Push to main

11:00 PM — Auto-Compound
  └─ Pull main (with fresh learnings)
  └─ Pick #1 priority from reports
  └─ Create PRD → tasks → implement
  └─ Create draft PR
```

**Success Factors:**
- Small stories (fit in one context window)
- Fast feedback loops (tests required)
- Explicit acceptance criteria
- Learnings compound across iterations
- Agent reads updated CLAUDE.md before each run

**Results:** 13 features in 1 hour vs 26-52 hours manually

**Status:** Advanced - Month 3+ when workflow solid

---

### 4. Context Engineering (Jarrod Watts)

**Source:** Twitter thread  
**Key Idea:** Context is limited (200k → actually 120k usable)

**80/20 Rule:**

- /upgrade → Max plan
- /model → Opus 4.5
- /init → Project understanding
- Start in plan mode (Shift+Tab)

**One Objective Per Conversation:** Critical pattern

**When to Reset:**

- Continue: Things going well, context available
- Reset: Stuck in "terrible → slop" loop

**MCP Strategy:** Minimal - only what provides "just in time" context

**Subagents:** Use separate context for research

- Main agent: Implementation (clean context)
- Research subagent: Deep research (separate 120k)
- Only summary returns (500 tokens vs 50k)

**Status:** Core principle - using now

---

### 5. Vibe Coding (Elena's Guide)

**Source:** Twitter thread  
**Key Idea:** It's about learning to communicate, not code

**Bad vs Good Prompts:**
❌ "build me an email tool"
✅ "write a python script that takes CSV, checks email format with regex, removes duplicates, outputs new CSV with summary"

**Build Incrementally:** Smallest possible piece → works → save → next piece

**Why Claude:** Asks clarifying questions, explains without being asked

**Results:** 6 months, zero coding background → shipping production tools

**Status:** Core approach - apply immediately

---

### 6. Spec-First Development (Ashpreet Bedi)

**Source:** "How I Use Claude Code" article  
**Key Idea:** Symlinked specs/ folder with structured docs

**Structure:**

```
specs/feature-name/
├── CLAUDE.md           # Instructions for Claude
├── design.md           # Design spec (source of truth)
├── implementation.md   # Progress tracking
├── decisions.md        # Decision records (ADRs)
├── prompts.md          # Reusable prompts
└── future-work.md      # Deferred ideas
```

**Layered Instructions:**

- Root CLAUDE.md: How to navigate codebase (stable)
- Feature CLAUDE.md: How to work on this thing (evolves)

**10-Minute PR Rule:**

- Max 5-7 files changed
- Max 500 lines changed
- One focused change per PR

**Cookbooks:** Every feature needs runnable example

**Status:** ✅ IMPLEMENTED (Day 2)

---

### 7. Stop Slop (AI Writing Patterns to Avoid)

**Source:** stopslopskill.com  
**Key Idea:** AI has tells - avoid them for authentic writing

**Banned Phrases:**

- "Here's the thing"
- "Let that sink in"
- "The uncomfortable truth"
- "This matters because"
- "Full stop"

**Banned Structures:**

- "Not because X. Because Y."
- "[Noun]. That's it. That's the [thing]."
- Always using lists of 3

**Scoring:** Rate content 1-10 on:

1. Directness
2. Rhythm
3. Trust
4. Authenticity
5. Density

Below 35/50 = revise

**Status:** Tool for Week 2

---

### 8. Meta-Learning with AI (Andrey's Philosophy)

**Source:** Twitter thread  
**Key Idea:** Curiosity over intelligence/experience

**Core Insights:**

- Best people treat learning as non-negotiable work
- Why Claude became default: Reasoning vs regurgitation
- Specificity problem: Concrete targets vs vague requests
- Copy-paste reset method for context management
- Rate of learning compounds over time

**The Uncomfortable Truth:**
Most people read and don't change anything. Best people read and immediately try it.

**Status:** Meta-philosophy - guides everything

---

### 9. Agent Memory Architecture (Rohit/@rohit4verse)

**Source:** Twitter thread (Jan 18, 2025)
**Key Idea:** Memory is infrastructure, not a feature

**The Problem:**
- Chat history → fills context window → truncates → forgets
- Vector databases → contradictory fragments → hallucinated synthesis
- Embeddings measure similarity, not truth

**Two Production Architectures:**

| Architecture | Structure | Best For |
|---|---|---|
| **File-Based** | Resources → Items → Categories (evolving summaries) | Assistants, companions, narrative systems |
| **Graph-Based** | Entities → Relationships → Conflict resolution | CRM, research, complex entity relationships |

**File-Based (Three Layers):**
```
Layer 1: Resources    → Raw logs, transcripts (immutable)
Layer 2: Items        → Atomic facts extracted ("User prefers Python")
Layer 3: Categories   → Summaries that get REWRITTEN on new info
```

**Graph-Based (Hybrid Search):**
```
Vector search (discovery) + Graph traversal (precision)
Conflict resolution: Archive old fact, activate new
```

**Memory Decay (Critical):**
| Frequency | Action |
|---|---|
| Nightly | Merge duplicates, promote hot memories |
| Weekly | Summarize old items, prune 90-day stale |
| Monthly | Re-index embeddings, archive 180-day dead nodes |

**Five Fatal Mistakes:**
1. Storing raw conversations (extract facts instead)
2. Blind embedding usage (add conflict resolution)
3. No memory decay (system rots)
4. No write rules (agent writes junk)
5. Treating memory as chat history (they're different)

**Mental Model:** Agent = Operating System
- RAM = Current context (volatile, fast)
- Hard Drive = Persistent memory (structured, survives sessions)
- Garbage Collection = Maintenance cron jobs

**Your WhatsApp Bot Application:**
- Dell Bangalore problem = blind embedding mistake
- Fix: Graph structure → `[Provider] --category--> [Service] --area--> [Location]`
- No category match = no false positive

**Framework Implementation:** See also #13 Agents That Learn (Agno)

**Production Tool:** See #14 Supermemory Plugin

**Status:** Advanced - Month 3+ for bot enhancement

---

### 10. Boris Cherny's Workflow (Creator of Claude Code)

**Source:** Rohit/@rohit4verse thread (Jan 13, 2025)
**Key Idea:** Treat AI like a distributed team, not a single assistant

**The Setup:**
- 5 Claude instances in terminal (numbered tabs)
- 5-10 Claudes on claude.ai in browser
- 15 parallel streams simultaneously
- System notifications for when each instance needs input

**Model Choice:**
| What Most Do | What Boris Does |
|---|---|---|
| Optimize for model speed (Sonnet) | Optimize for task completion time (Opus 4.5) |
| Skip thinking mode | Always use thinking mode |
| More back-and-forth corrections | Fewer iterations, less steering |

> "Even though Opus is slower, you steer it less. It's better at tool use. Makes fewer mistakes."

**CLAUDE.md as Team Knowledge Base:**
- Checked into git
- Whole team contributes multiple times per week
- Contains every mistake Claude made + corrections
- During code review: tag `@.claude` on PRs to add items
- Different teams maintain their own CLAUDE.md files

> "Every mistake becomes institutional knowledge. The AI gets smarter with every sprint."

**Planning Mode Workflow:**
```
1. Shift+Tab twice (enter planning mode)
2. Go back and forth until you like the plan
3. Switch to auto-accept-edits mode
4. Claude one-shots the implementation
```

> "Measure twice, cut once — having a solid plan matters more than a perfect prompt."

**Slash Commands (Inner Loop):**
```
.claude/commands/commit-push-pr.md

git_status=$(git status --short)
branch=$(git branch --show-current)

Create a commit message for these changes:
$git_status

Then push to origin/$branch and open a PR.
```
- Checked into git
- Run dozens of times daily
- Inline bash pre-fetches info to minimize model lag

**Subagents for Automation:**
| Subagent | Purpose |
|---|---|
| Code simplifier | Simplifies code after Claude finishes |
| Verify app | Tests end-to-end with detailed instructions |
| System architect | Structural organization review |
| Senior engineer | Implementation patterns review |
| Integration specialist | Interface definitions review |

> "Like having a junior dev who handles all the repetitive PR stuff."

**PostToolUse Hooks:**
- Auto-format code after Claude writes it
- Handles last 10% formatting
- Avoids CI formatting errors

**Smart Permissions:**
- NOT `--dangerously-skip-permissions`
- Use `/permissions` to pre-allow known-safe commands
- Permissions checked into `.claude/settings.json`
- Shared with team

**MCP Integration (Tools Access):**
- Slack: Search and post via MCP server
- BigQuery: Run analytics queries via bq CLI
- Sentry: Grab error logs
- Config in `.mcp.json`, shared with team

**Verification Loop (Non-Negotiable):**
> "Give Claude a way to verify its work. It will 2x to 3x the quality."

Verification methods:
- Run bash command
- Execute test suite
- Test app in browser simulator
- Claude Chrome extension for UI testing

**Context Management:**
- Use `&` command to hand off local sessions to web
- Use `--teleport` to move context between instances
- Start sessions from phone, check in later
- `/clear` to reset context between unrelated tasks

**Status:** Core workflow - implement incrementally

---

### 11. Official Claude Code Best Practices (Anthropic Documentation)

**Source:** https://code.claude.com/docs/best-practices (Official)
**Key Idea:** Context window is the fundamental constraint — everything else follows from managing it well

**The Core Constraint:**
> "Claude's context window holds your entire conversation, including every message, every file Claude reads, and every command output. LLM performance degrades as context fills."

This is why every other best practice exists.

---

**The Single Highest-Leverage Thing:**

> "Give Claude a way to verify its work. This is the single highest-leverage thing you can do."

| Strategy | Before | After |
|---|---|---|
| Provide verification criteria | "implement email validation" | "write validateEmail function. test cases: user@example.com=true, invalid=false. run tests after implementing" |
| Verify UI changes visually | "make dashboard look better" | "[paste screenshot] implement this. take screenshot of result, compare, list differences, fix them" |
| Address root causes | "the build is failing" | "build fails with [error]. fix it, verify build succeeds. address root cause, don't suppress error" |

---

**Four-Phase Workflow (Official):**

```
1. EXPLORE (Plan Mode)
   "read /src/auth and understand how we handle sessions"

2. PLAN (Plan Mode)
   "I want to add Google OAuth. What files need to change? Create a plan."

3. IMPLEMENT (Normal Mode)
   "implement the OAuth flow from your plan. write tests, run them, fix failures"

4. COMMIT (Normal Mode)
   "commit with a descriptive message and open a PR"
```

**When to Skip Planning:**
> "For tasks where the scope is clear and the fix is small (fixing a typo, adding a log line, renaming a variable) ask Claude to do it directly. If you could describe the diff in one sentence, skip the plan."

---

**Prompting Patterns:**

| Strategy | Before | After |
|---|---|---|
| Scope the task | "add tests for foo.py" | "write test for foo.py covering edge case where user is logged out. avoid mocks" |
| Point to sources | "why does ExecutionFactory have weird api?" | "look through ExecutionFactory's git history and summarize how its api came to be" |
| Reference patterns | "add a calendar widget" | "look at how HotDogWidget.php is implemented. follow the pattern for a new calendar widget" |
| Describe symptoms | "fix the login bug" | "users report login fails after session timeout. check src/auth/, especially token refresh. write failing test, then fix" |

---

**CLAUDE.md Official Guidelines:**

| ✅ Include | ❌ Exclude |
|---|---|
| Bash commands Claude can't guess | Anything Claude can figure out from code |
| Code style rules that differ from defaults | Standard language conventions |
| Testing instructions, preferred runners | Detailed API docs (link instead) |
| Repo etiquette (branch naming, PR conventions) | Info that changes frequently |
| Architectural decisions specific to project | Long explanations or tutorials |
| Dev environment quirks (required env vars) | File-by-file codebase descriptions |
| Common gotchas, non-obvious behaviors | Self-evident practices like "write clean code" |

> "If Claude keeps doing something you don't want despite having a rule against it, the file is probably too long and the rule is getting lost."

**Emphasis Tip:** Add "IMPORTANT" or "YOU MUST" to improve adherence on critical rules.

**Import Syntax:**
```markdown
See @README.md for project overview and @package.json for npm commands.
```

---

**Subagents for Context Isolation:**

> "Since context is your fundamental constraint, subagents are one of the most powerful tools available."

```
Use subagents to investigate how our authentication system handles token
refresh, and whether we have any existing OAuth utilities I should reuse.
```

The subagent explores in separate context, reports back summary. Main conversation stays clean.

**Post-implementation verification:**
```
use a subagent to review this code for edge cases
```

---

**Context Management Commands:**

| Command | Purpose |
|---|---|
| `Esc` | Stop Claude mid-action, context preserved |
| `Esc + Esc` or `/rewind` | Open checkpoint menu, restore previous state |
| `"Undo that"` | Have Claude revert changes |
| `/clear` | Reset context between unrelated tasks |
| `/compact <instructions>` | Summarize context with focus |
| `claude --continue` | Resume most recent conversation |
| `claude --resume` | Select from recent sessions |

> "If you've corrected Claude more than twice on the same issue in one session, the context is cluttered with failed approaches. Run /clear and start fresh."

---

**Parallel Sessions Patterns:**

**Writer/Reviewer:**
| Session A (Writer) | Session B (Reviewer) |
|---|---|
| "Implement rate limiter for API endpoints" | |
| | "Review rate limiter in @src/middleware/rateLimiter.ts. Look for edge cases, race conditions" |
| "Here's review feedback: [Session B output]. Address these." | |

**Test-First:**
- Session A writes tests
- Session B writes code to pass them

---

**Fan-Out Pattern (Batch Operations):**

```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit:*)"
done
```

1. Generate task list
2. Test on 2-3 files, refine prompt
3. Run at scale

---

**Five Common Failure Patterns:**

| Pattern | Symptom | Fix |
|---|---|---|
| **Kitchen sink session** | One task, then unrelated task, then back. Context full of irrelevant info | `/clear` between unrelated tasks |
| **Correcting over and over** | Wrong → correct → still wrong → correct again. Failed approaches pollute context | After 2 failed corrections, `/clear` and write better initial prompt |
| **Over-specified CLAUDE.md** | Too long, Claude ignores important rules | Ruthlessly prune. If Claude does it correctly without the instruction, delete it |
| **Trust-then-verify gap** | Plausible implementation that doesn't handle edge cases | Always provide verification. If you can't verify it, don't ship it |
| **Infinite exploration** | "Investigate" without scope. Claude reads hundreds of files | Scope narrowly or use subagents |

---

**The Interview Pattern (for larger features):**

```
I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.

Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs.
Don't ask obvious questions, dig into the hard parts I might not have considered.

Keep interviewing until we've covered everything, then write a complete spec to SPEC.md.
```

Then start fresh session to execute the spec.

---

**Developing Intuition:**

> "Pay attention to what works. When Claude produces great output, notice what you did: the prompt structure, the context you provided, the mode you were in. When Claude struggles, ask why."

Over time you'll know:
- When to be specific vs open-ended
- When to plan vs explore
- When to clear context vs let it accumulate

**Status:** Core reference - official source of truth

---

### 12. Overnight Autonomous Loop (Ryan Carson)

**Source:** Twitter thread (Jan 29, 2025)
**Key Idea:** Agent reviews, learns, and ships while you sleep

**The Two-Part Nightly Loop:**

| Time | Job | What It Does |
|---|---|---|
| 10:30 PM | Compound Review | Reviews all threads from last 24 hours, extracts learnings, updates CLAUDE.md |
| 11:00 PM | Auto-Compound | Pulls latest (with fresh learnings), picks #1 priority, implements, creates PR |

> "The order matters. The review job updates your CLAUDE.md with patterns discovered during the day. The implementation job then benefits from those learnings."

---

**The Compound Review Script:**

```bash
#!/bin/bash
# scripts/daily-compound-review.sh
# Runs BEFORE auto-compound.sh to update CLAUDE.md with learnings

cd ~/projects/your-project

git checkout main
git pull origin main

claude -p "Look through each conversation from the last 24 hours. 
For any thread where we did NOT compound learnings at the end, 
do so now - extract key learnings and update CLAUDE.md. 
Commit and push to main." --dangerously-skip-permissions
```

**What This Does:**
1. Finds all threads from last 24 hours
2. Checks if each ended with learning extraction
3. For threads that didn't, retroactively extracts learnings
4. Updates CLAUDE.md with patterns, gotchas, context
5. Commits and pushes to main

> "Your CLAUDE.md becomes a living knowledge base that grows every night."

---

**The Auto-Compound Script:**

```bash
#!/bin/bash
# scripts/compound/auto-compound.sh
# Full pipeline: report → PRD → tasks → implementation → PR

set -e
cd ~/projects/your-project

source .env.local

# Fetch latest (including tonight's CLAUDE.md updates)
git fetch origin main
git reset --hard origin/main

# Find the latest prioritized report
LATEST_REPORT=$(ls -t reports/*.md | head -1)

# Analyze and pick #1 priority
ANALYSIS=$(./scripts/compound/analyze-report.sh "$LATEST_REPORT")
PRIORITY_ITEM=$(echo "$ANALYSIS" | jq -r '.priority_item')
BRANCH_NAME=$(echo "$ANALYSIS" | jq -r '.branch_name')

# Create feature branch
git checkout -b "$BRANCH_NAME"

# Create PRD
claude -p "Create a PRD for: $PRIORITY_ITEM. Save to tasks/prd-$(basename $BRANCH_NAME).md" --dangerously-skip-permissions

# Convert to tasks
claude -p "Convert the PRD to scripts/compound/prd.json" --dangerously-skip-permissions

# Run the execution loop
./scripts/compound/loop.sh 25

# Create PR
git push -u origin "$BRANCH_NAME"
gh pr create --draft --title "Compound: $PRIORITY_ITEM" --base main
```

---

**macOS launchd Setup:**

```xml
<!-- ~/Library/LaunchAgents/com.yourproject.daily-compound-review.plist -->
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.yourproject.daily-compound-review</string>
  <key>ProgramArguments</key>
  <array>
    <string>/path/to/scripts/daily-compound-review.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>22</integer>
    <key>Minute</key><integer>30</integer>
  </dict>
</dict>
</plist>
```

**Load jobs:**
```bash
launchctl load ~/Library/LaunchAgents/com.yourproject.daily-compound-review.plist
launchctl load ~/Library/LaunchAgents/com.yourproject.auto-compound.plist
```

**Keep Mac awake (caffeinate):**
```bash
# In a plist starting at 5 PM
/usr/bin/caffeinate -i -t 32400  # 9 hours
```

---

**When You Wake Up:**
- ✅ Updated CLAUDE.md with patterns agent learned
- ✅ Draft PR implementing next priority
- ✅ Logs showing exactly what happened

---

**The Compounding Effect:**

```
Monday: Agent discovers gotcha in auth flow → adds to CLAUDE.md
Tuesday: Agent reads updated CLAUDE.md → avoids same gotcha
Wednesday: Agent hits new edge case → adds to CLAUDE.md
Thursday: Agent now knows both patterns → cleaner implementation
```

> "The agent gets smarter every day because it's reading its own updated instructions before each implementation run."

---

**Extension Ideas:**
- Slack notifications when PRs created or jobs fail
- Multiple priority tracks (different reports on different nights)
- Auto-merge if CI passes and changes are small
- Weekly summary — agent writes changelog of everything it shipped

---

**Three Open-Source Projects Used:**

| Project | Purpose |
|---|---|
| **Compound Engineering Plugin** | Extract and persist learnings from each session |
| **Compound Product** | Automation layer: PRD → tasks → shipped PRs |
| **Ralph** | Autonomous loop that runs continuously until tasks complete |

**Status:** Advanced - Month 3+ when foundation solid

---

### 13. Agents That Learn (Ashpreet Bedi / Agno Framework)

**Source:** Twitter thread (Jan 28, 2025)
**Key Idea:** Memory is a noun, Learning is a verb — agents should get smarter over time

**What Learning ISN'T:**

| Approach | Why It's Not Learning |
|---|---|
| Session history | Thrown away when session ends |
| RAG | Retrieval of static docs — agent didn't discover anything |
| Fine-tuning | Happens offline, can't learn at runtime |

> "Memory stores what you said. Learning figures out what it means."

**What Learning IS:**
- Remembers users across sessions
- Captures insights from conversations
- Learns from its own decisions and feedback
- Knowledge from one user benefits another

---

**Three Levels of Learning:**

**Level 1: Agent Remembers You**
```python
# Session 1
agent.print_response(
    "I'm Alice, research scientist at Anthropic. I prefer concise responses.",
    user_id="alice@example.com",
    session_id="session_1",
)

# Session 2 (new conversation)
agent.print_response(
    "What do you know about me?",
    user_id="alice@example.com", 
    session_id="session_2",  # Different session
)
# Agent knows Alice's name, role, preferences
```

Two things happen automatically:
- **User Profile:** Structured facts (name, role, company) — updated in place
- **User Memory:** Unstructured observations — accumulates over time

---

**Level 2: Agent Captures Insights**

Agent decides what's worth saving (not everything is valuable):

```python
learning=LearningMachine(
    learned_knowledge=LearnedKnowledgeConfig(mode=LearningMode.AGENTIC),
    decision_log=DecisionLogConfig(mode=LearningMode.AGENTIC),
)
```

In Agentic mode, agent gets tools: `save_learning`, `search_learnings`
- Saves genuinely useful insights
- Searches prior learnings before answering
- Logs decisions with reasoning (for debugging)

---

**Level 3: Knowledge Compounds Across Users**

> "This is the breakthrough."

```
Session 1, Engineer 1:
"We're trying to reduce cloud egress costs. Remember this."
→ Agent saves the insight

Session 2, Engineer 2 (different user, week later):
"I'm picking a cloud provider. Key considerations?"
→ Agent surfaces egress cost insight. Unprompted.
```

One person taught the agent. Another person benefited.

> "No fine-tuning. No RLHF infrastructure. Just a database and some prompt engineering. GPU Poor Learning. It works."

---

**Six Learning Stores:**

| Store | What It Captures | Scope |
|---|---|---|
| **User Profile** | Name, role, preferences | Per user |
| **User Memory** | Observations from conversations | Per user |
| **Session Context** | Goals, plans, progress | Per session |
| **Entity Memory** | Facts about companies, projects, people | Configurable |
| **Learned Knowledge** | Insights that transfer across users | Configurable |
| **Decision Log** | Decisions with reasoning | Per agent |

---

**Three Learning Modes:**

| Mode | Behavior | Use Case |
|---|---|---|
| **Always** | Extraction runs after each response | User profiles, basic memory |
| **Agentic** | Agent decides what to save | Knowledge capture, decisions |
| **Propose** | Agent proposes, human confirms | High-stakes domains |

Mix and match per store:
```python
learning=LearningMachine(
    user_profile=UserProfileConfig(mode=LearningMode.ALWAYS),
    user_memory=UserMemoryConfig(mode=LearningMode.ALWAYS),
    learned_knowledge=LearnedKnowledgeConfig(mode=LearningMode.AGENTIC),
    decision_log=DecisionLogConfig(mode=LearningMode.AGENTIC),
)
```

---

**Custom Learning Stores (Learning Protocol):**

```python
class MyCustomStore(LearningStore):
    def recall(self, **context) -> Optional[Any]      # Get data
    def process(self, messages, **context) -> None    # Extract & save
    def build_context(self, data) -> str              # Format for prompt
    def get_tools(self, **context) -> List[Callable]  # Give agent tools
```

Four methods. ~50 lines. Your domain, your rules.

---

**Real-World Applications:**

| Use Case | How Learning Helps |
|---|---|
| Support agents | Ticket #1000 resolves faster from tickets #1-999 |
| Coding assistants | Learns your conventions, testing patterns, codebase quirks |
| Team knowledge | One analyst's discovery benefits whole team automatically |

> "The agent on day 1000 is fundamentally better than it was on day 1."

---

**Why This Matters for Claude:**

> "Claude's memory feels magical. But you can't build with it. Claude's memory is a consumer product feature. The API gives you nothing."

If you want learning for your agents, you build it yourself.

**Ready-to-Use Alternative:** See #14 Supermemory Plugin

**Status:** Framework reference - consider for WhatsApp bot evolution (Month 4+)

---

### 14. Supermemory Plugin for Claude Code (Dhravya Shah)

**Source:** Twitter thread (Jan 29, 2025)
**Key Idea:** Claude Code should know you — not just for this session, forever

**The Problem:**

> "Every day, I have to explain the same exact things to Claude Code. I keep repeating my coding style, preferences... Claude writes great code. Then I close the session, and it forgets everything. Next day? Groundhog Day."

**Current Workarounds (All Inadequate):**
- Massive CLAUDE.md files
- Copy-pasting context at start of every prompt
- Maintaining "memory" documents that agent never looks at

---

**What Supermemory Does:**

| Feature | How It Works |
|---|---|
| **Remembers where you left off** | User profile with episodic + static info. Claude knows "this week, your goal is to migrate to another postgres provider" |
| **Learns your style** | Captures patterns like "Use less useEffects!!!" and applies them |
| **Knows YOU** | Founder vs student vs system engineer — suggests tools accordingly |

**Example:**
```
Developer: "I need to add rate limiting to this endpoint"

Agent: "Based on the rate limiting you implemented in payments-api 
last month (using sliding window with Redis), and your preference 
for express-rate-limit middleware, here's an approach that matches 
your existing patterns..."
```

---

**Hybrid Memory (Technical Approach):**

> "Most 'memory' solutions are just RAG—retrieve similar documents and stuff them in context. That works for knowledge bases. It doesn't work for memory."

| RAG (What Most Do) | Hybrid Memory (What Supermemory Does) |
|---|---|
| Find similar stuff | Understand "the auth bug" = specific issue you've debugged for 3 days |
| Static retrieval | Track that preferences evolved (you used to like classes, now prefer functions) |
| Similar context | Relevant context at the right moment |

**How it works:**
1. Extracts facts
2. Tracks how they change over time
3. Builds a profile that's always current
4. Retrieves relevant (not just similar) context

**Benchmark:** 81.6% on LongMemEval (vs 40-60% for most RAG systems)

---

**Why Plugin vs MCP:**

| MCP Limitation | Plugin Solution |
|---|---|
| Can't control when Claude runs tools | Context injection on session start |
| No data point to learn from | Automatic capture of conversation turns |
| Memory only works if there's things to recall | Both injection and capture built-in |

---

**Installation:**
```bash
# GitHub: https://github.com/supermemoryai/claude-supermemory
```

**Status:** Tool for Week 2 - solves the "Groundhog Day" problem immediately

---

## Tools & Resources

### Installed & Working

- ✅ **Claude Code v2.4.7** - Main development environment
- ✅ **Optimized CLAUDE.md** - 150 instructions with WHY
- ✅ **specs/ folder structure** - External memory
- ⚠️ **Status Line** - Attempted, not working on Windows
  - Alternative: Use `/context` command

### For Week 2

- ⏸️ **Supermemory Plugin** - Persistent memory for Claude Code
  - GitHub: https://github.com/supermemoryai/claude-supermemory
  - Solves: "Groundhog Day" problem of repeating context every session
  - Features: User profile injection, automatic conversation capture, style learning
- ⏸️ **Custom Slash Commands** - Repetitive workflow automation
  - Location: `.claude/commands/[name].md`
  - Pattern: Inline bash to pre-fetch info + clear instructions
  - Example: `/commit-push-pr` for git workflow
- ⏸️ **Subagent Personas** - Review automation
  - Create text files defining reviewer perspectives
  - Run concurrently for 360-degree reviews
- ⏸️ **PostToolUse Hooks** - Auto-formatting
  - Runs after Claude writes code
  - Enforces team standards automatically
- ⏸️ **Claude-Mem** - Persistent memory across sessions
  - GitHub: https://github.com/continuedev/claude-mem
  - 3-layer workflow: search → timeline → get_observations
- ⏸️ **Stop Slop Skill** - Remove AI writing patterns

### For Later (Month 2+)

- ⏸️ **LangSmith** - Session monitoring and analytics
  - Install: `npx claude-code-templates@latest --setting "telemetry/langsmith-tracing"`
- ⏸️ **Compound Engineering Plugin** - 12-agent review
  - GitHub: https://github.com/EveryInc/compound-engineering-plugin
- ⏸️ **Ralph Scripts** - Autonomous overnight builds
- ⏸️ **MCP Servers** - Tool integration
  - Slack MCP: Search and post messages
  - BigQuery: Analytics queries
  - Sentry: Error log retrieval
  - Config: `.mcp.json` (check into git)
- ⏸️ **Open Code** - Free alternative to Claude Code
  - Good for learning patterns without API costs

### For Later (Month 3+)

- ⏸️ **Compound Engineering Plugin** - Learning extraction
  - GitHub: https://github.com/EveryInc/compound-engineering-plugin
  - Purpose: Extract and persist learnings from each session
- ⏸️ **Compound Product** - Automation layer
  - Pipeline: Report → PRD → Tasks → Implementation → PR
  - Includes: auto-compound.sh, loop.sh, analyze-report.sh
- ⏸️ **Ralph** - Autonomous execution loop
  - Runs continuously, picks tasks, executes until complete
- ⏸️ **launchd** - macOS native scheduler (better than cron)
  - Location: ~/Library/LaunchAgents/
  - Commands: launchctl load/start/list
- ⏸️ **caffeinate** - Keep Mac awake for automation
  - Usage: `caffeinate -i -t 32400` (9 hours)

### For Later (Month 4+)

- ⏸️ **Agno Framework** - Agents that learn
  - GitHub: https://github.com/agno-agi/agno
  - Features: Six learning stores, three modes, cross-user knowledge transfer
  - Use case: When you need agents that compound knowledge over time
- ⏸️ **Learning Protocol** - Custom learning stores
  - Four methods: recall, process, build_context, get_tools
  - ~50 lines for domain-specific learning
- ⏸️ **Mem0** - Open-source memory layer for agents
  - GitHub: https://github.com/mem0ai/mem0
  - Handles: Extraction, storage, retrieval, decay
- ⏸️ **Neo4j** - Graph database for entity relationships
  - Use case: Provider → Service → Location connections
- ⏸️ **Memory Maintenance Cron Jobs** - Decay systems
  - Pattern: Nightly consolidation, weekly summarization, monthly re-index

### Reference Sites

- **Official Best Practices:** https://code.claude.com/docs/best-practices
- **How Claude Code Works:** https://code.claude.com/docs/how-claude-code-works
- **Extend Claude Code:** https://code.claude.com/docs/features-overview
- **Common Workflows:** https://code.claude.com/docs/common-workflows
- **CLAUDE.md Reference:** https://code.claude.com/docs/memory
- **Full Documentation Index:** https://code.claude.com/docs/llms.txt
- **Skills Marketplace:** https://skillsmp.com (60k+ skills)
- **MCP Tools:** https://modelcontextprotocol.io
- **Prompt Library:** https://platform.claude.com/docs/en/resources/prompt-library
- **Awesome Claude Skills:** https://github.com/BehiSecc/awesome-claude-skills
- **Awesome Claude Code:** https://github.com/hesreallyhim/awesome-claude-code

---

## What I've Built

### Week 1 - Day 1 (Jan 15, 2025) - ✅ COMPLETE

**Time:** 30 minutes

**Completed:**

1. ✅ CLAUDE.md optimized
   - Location: `C:\Users\User\Desktop\whatsapp-ref-bot\CLAUDE.md`
   - Length: 150 instructions (was 500+)
   - Key change: Added WHY to every rule
   - Removed: Generic docs, focused on project-specific quirks

2. ✅ Plan Mode practiced
   - Shortcut: Shift+Tab twice
   - Use: Before every implementation

3. ⚠️ Status Line attempted
   - Issue: Doesn't work on Windows cmd
   - Alternative: Use `/context` command manually
   - Rule: Reset at 40% context usage (80k tokens)

**Key Learnings:**
- CLAUDE.md is the highest ROI tool (80% of value)
- Plan Mode takes 5 minutes but saves hours
- Context degrades at 40%, not 100%

---

### Week 1 - Day 2 (Jan 15, 2025) - ✅ COMPLETE

**Time:** 15 minutes

**Completed:**

1. ✅ specs/ folder structure created
   - Location: `C:\Users\User\Desktop\whatsapp-ref-bot\specs\`
   - Structure:
     ```
     specs/
     └── search-quality-fix/
         ├── design.md
         ├── implementation.md
         └── decisions.md
     ```

2. ✅ Templates added to all files
   - design.md: Problem → Goal → Approach → Status
   - implementation.md: Changes → Testing → Issues
   - decisions.md: ADRs (Architecture Decision Records)

3. ✅ Added to .gitignore
   - specs/ folder stays private

**Real Problem Documented:**
```markdown
# Search Quality - Dell Bangalore in Car Rental

Query: "car rental in Bengaluru"
Result #4: S Dilva Dell Bangalore (computer company)

Root cause: Generic location tags ("bangalore" = "bengaluru") 
cause false matches across unrelated services.
```

**Key Learnings:**
- specs/ is external memory that survives /clear
- design.md is living document (starts rough, gets detailed)
- Document BEFORE exploring (not after)

---

### Week 1 - Days 3-7 → Week 2 Additions

**Goal:** Just use what was built, build muscle memory

**Daily Pattern:**
1. Open Claude Code
2. Shift+Tab twice (Plan Mode)
3. Type `/context` every 10-15 min
4. When >40%: finish task → `/clear` → continue
5. Document learnings in specs/
6. Press `#` if Claude repeats mistake

**New for Week 2:**
- [ ] Install Supermemory Plugin (solves Groundhog Day)
- [ ] Custom slash commands for repeated workflows
- [ ] Stop Slop skill for writing quality

**Supermemory Install:**
```bash
# Follow instructions at:
# https://github.com/supermemoryai/claude-supermemory
```

**Expected Result:**
- No more re-explaining preferences each session
- Claude learns your coding style over time
- Context compounds across sessions

---

## Daily Workflows

### Daily Work Session Template

```
📋 START SESSION (5 min)
1. cd C:\Users\User\Desktop\whatsapp-ref-bot
2. claude
3. Shift+Tab twice (Plan Mode)
4. "Read specs/[feature]/design.md" (if continuing)

📝 DURING WORK (ongoing)
5. /context (check every 10-15 min)
6. When >40%: finish task → /clear → continue
7. Update specs/ as you make decisions

✅ END SESSION (5 min)
8. Update specs/ with learnings
9. Press # if Claude repeated mistake
10. Commit working code
```

---

### Investigation Pattern (Better Context Management)

```
📋 INVESTIGATION WORKFLOW

1. Write question in design.md
   "Why does X happen?"

2. Give Claude focused task (not free exploration)
   "Write SQL query to diagnose X"
   (10k tokens max, not 93k)

3. Run diagnostic yourself
   (Database query, log check)

4. Document findings in design.md
   "Found: X happens because Y"
   (Facts, not speculation)

5. Check context: /context

6. If >40% or investigation complete: /clear

7. Continue with solution (fresh context)
   "Read design.md, plan fix for Y"
```

**Example:** Dell Bangalore investigation
- ❌ Old way: Free exploration, 93k tokens used
- ✅ New way: Focused query, findings in design.md, 15k tokens

---

### Feature Development Pattern

```
📋 FEATURE WORKFLOW

BEFORE CODE (30 min planning saves 3 hours coding)
1. Create specs/[feature-name]/
2. Write design.md:
   - Problem (specific examples)
   - Goal (measurable success)
   - Approach (3 options with tradeoffs)
3. Open Claude Code in Plan Mode
4. "Read design.md, plan implementation"
5. Choose approach, update design.md

DURING CODE (iterative)
6. Implement small piece (one PR = 10 min review)
7. Test immediately
8. Document in implementation.md
9. Commit if tests pass
10. Repeat for next piece

AFTER CODE (verification)
11. Create cookbook example
12. Run cookbook (must pass)
13. Update decisions.md with key choices
14. Mark checkboxes in design.md

Pattern: design.md → implement → test → document → repeat
```

---

### Parallel Processing Pattern (Boris Cherny Style)

```
SETUP (if running multiple tasks)
1. Number terminal tabs 1-5
2. Enable system notifications per tab
3. Open claude.ai in browser for additional sessions

ORCHESTRATION
- When blocked on Task A (Claude thinking) → switch to Task B
- Use & command to hand off terminal session to web
- Use --teleport to move context between instances

CONTEXT HYGIENE
- /clear between unrelated tasks
- /context to monitor token usage
- Reset at 40% (80k tokens)

VERIFICATION (every task)
- Define how Claude verifies its work BEFORE starting
- Options: bash command, test suite, browser test
- No verification = shipping blind
```

---

### Nightly Autonomous Loop Setup (Month 3+)

```
PREREQUISITES
├─ Solid CLAUDE.md foundation
├─ Working test suite
├─ Prioritized backlog (reports/*.md)
└─ Comfort with --dangerously-skip-permissions

DIRECTORY STRUCTURE
your-project/
├─ CLAUDE.md                    # Living knowledge base
├─ reports/                     # Prioritized feature reports
├─ tasks/                       # Generated PRDs
├─ scripts/
│   ├─ daily-compound-review.sh # Learning extraction
│   └─ compound/
│       ├─ auto-compound.sh     # Implementation engine
│       ├─ analyze-report.sh    # Priority picker
│       └─ loop.sh              # Task execution loop
└─ logs/                        # Job output

SCHEDULE (macOS launchd)
├─ 10:30 PM: daily-compound-review.sh
├─ 11:00 PM: auto-compound.sh
└─ 5:00 PM: caffeinate (keep awake until 2 AM)

DEBUGGING
launchctl list | grep yourproject    # Check scheduled
tail -f logs/compound-review.log     # Watch logs
launchctl start com.yourproject...   # Test manually
```

---

## Advanced Topics

### BigC-Style Autonomous Agents (Month 4+)

**What:** Voice-commanded agent that fixes deployment while you walk dog

**Example:**
```
You: "Fix the deployment" (voice, while walking)
Agent: [Checks logs → Finds issue → Fixes configs → 
        Redeploys → Confirms → Notifies you]
You: "Cool" (still walking)
```

**Requirements:**
- Solid foundation (CLAUDE.md, specs/)
- Tool access (Railway API, git, etc.)
- Autonomous loops (like Ralph)
- Verification systems
- Audit trails (SpecStory)

**Status:** Possible now, but need foundation first

---

### Meta-Optimization (Month 2+)

**What:** Claude optimizes its own Claude Code setup

**Pattern:**
```
1. Explore best practices (GitHub, articles)
2. Propose improvements to your CLAUDE.md
3. Test empirically:
   - BEFORE: Run test prompt, measure tokens/time/quality
   - Add improvement
   - AFTER: Run same prompt, measure again
4. Only commit if >30% improvement
5. Evidence-based optimization
```

**Why later:** Need baseline behavior first (can't optimize what you haven't used)

---

### SpecStory CLI (Month 4+)

**What:** Standardized format for AI conversation persistence

**What it captures:**
- Session metadata (model, tokens, cost)
- Conversation history
- Tool calls
- Artifacts created
- Context loaded
- Outcomes

**Why it matters:**
- Standard format across all tools
- Enables analytics
- Audit trail for autonomous agents
- Queryable history

**Your current approach:** Manual specs/ folder (same concepts, manual format)

**When to adopt:** When manual gets painful (months from now)

---

### Production Memory Systems (Month 3+)

**What:** Persistent memory that survives across sessions and scales

**Two Paths:**

**Path A: File-Based (Simpler)**
- Good for: Your WhatsApp bot's service provider knowledge
- Implementation: Markdown files with structured summaries
- Maintenance: Weekly re-summarization of categories

**Path B: Graph-Based (More Powerful)**
- Good for: Complex relationships between providers, services, locations, ratings
- Implementation: Neo4j or similar + vector store hybrid
- Maintenance: Monthly re-indexing, conflict resolution logic

**Prerequisites Before Implementing:**
- Solid foundation (CLAUDE.md, specs/ workflow)
- Working MVP with basic retrieval
- Clear understanding of what "remembering" means for your use case

**Key Decision:** What deserves to be remembered?
- Not everything a user says
- Only structured facts that improve future responses
- Define explicit write rules

**Resources:**
- Rohit's thread: Full code examples for both architectures
- LangGraph: Built-in checkpointing for short-term memory
- Mem0: Open-source memory layer for agents

---

### Cross-User Knowledge Transfer (Month 4+)

**What:** Knowledge discovered by one user automatically benefits others

**The Pattern:**
```
User A discovers insight → Agent saves to shared knowledge store
User B asks related question → Agent retrieves insight from store
```

**Implementation Options:**

| Approach | Complexity | Framework |
|---|---|---|
| File-based shared summaries | Low | Manual (see #9) |
| Graph-based with shared nodes | Medium | Neo4j + custom |
| Agno learned_knowledge store | Low | Agno framework |

**Requirements:**
- Vector store for semantic search
- Clear scoping (what's shareable vs private)
- Mode selection (Always/Agentic/Propose)

**Your WhatsApp Bot Application:**
- User A reports "Sharma Plumber was late but did good work"
- User B asks "reliable plumber in Andheri?"
- Agent surfaces Sharma with context about reliability

**Why This Matters:**
> "When one person figures out how to test a tricky feature, everyone benefits automatically. When someone discovers a gotcha in the codebase, the whole team knows."

**Status:** Advanced - requires solid foundation first

---

### Startup Tech Stack Lessons (Kushal Byatnal / Extend)

**Source:** Twitter thread (Jan 29, 2025)
**Key Idea:** Boring tech wins — simpler stack = faster shipping = faster adaptation

**Context:** $1M+ ARR with 3-person engineering team, 1000x volume growth over 2.5 years

---

**The "Boring" Stack:**
```
Frontend: React + TypeScript
Backend: Node + TypeScript
Database: Postgres
Cache/Queue: Redis
```

> "We deliberately avoided specialized languages, complex microservices, and dependencies that can't be deployed on-prem."

---

**What Worked:**

| Decision | Why It Worked |
|---|---|
| **Core stack unchanged** | "Shipping velocity is truly unmatched. If it ain't broke, don't fix it." |
| **Monorepo** | Ship across entire codebase in one PR. All context in one place makes Cursor/Claude dramatically more useful. |
| **Self-hosting from day 1** | No hard dependencies on niche vendors. Unblocks enterprise deals. "If we had to retrofit today, it would be a 6-month nightmare." |

**Monorepo + AI insight:**
> "Having all the context in one place makes Cursor and Claude dramatically more useful."

**One regret:** Didn't put docs repo in the monorepo too.

---

**What Changed:**

| Change | Reason |
|---|---|
| **Migrated to AWS** | Better stability + faster sales cycles. F500s want standard AWS architecture. Makes SOC2, compliance, security reviews 10x easier. |
| **Added Go and Rust (selectively)** | TypeScript isn't for CPU-bound tasks. Specific services for compute-heavy work (file conversion, Excel parsing). |

---

**What Didn't Work:**

| Mistake | Lesson |
|---|---|
| **Postgres queues** | Fine at MVP stage, locked up at scale. Painful firefighting. Migrated to Redis. "I wish I'd just started on Redis from day 1." |
| **Open source auth** | Didn't support enterprise features (SAML SSO, SCIM). Migrated to WorkOS. |

---

**Key Takeaways:**

1. **Boring tech wins** — React, Node, TypeScript, Postgres, Redis still works at scale
2. **Monorepo is a superpower** — especially for AI coding assistants
3. **Design for self-hosting early** — retrofitting is a nightmare
4. **Use specialized languages selectively** — Go/Rust for CPU-bound, TypeScript for everything else
5. **Don't use Postgres for queues at scale** — start with Redis
6. **Auth is worth paying for** — enterprise features matter

> "I'd argue 99% of startups should adopt this same approach. We're all in extremely fast-moving spaces, and the simpler your stack, the faster you can keep up."

**Status:** Engineering principle - informs architecture decisions

---

## Troubleshooting

### Context Bloat (Most Common Issue)

**Symptom:** Claude responses get worse, slower, less focused

**Diagnosis:**
```bash
/context
# If >40% (80k tokens), you're in degraded zone
```

**Solutions:**
1. **Immediate:** Finish current task, then `/clear`
2. **Preventive:** Use focused tasks, not free exploration
3. **Structural:** Document in design.md, then /clear and read it back

**Example:**
```
❌ Let Claude explore freely → 93k tokens wasted
✅ "Write diagnostic query" → 10k tokens → document findings → /clear
```

---

### Claude Ignores CLAUDE.md Rules

**Symptom:** Claude repeats mistakes you documented

**Diagnosis:**
```bash
# Check CLAUDE.md length
wc -l CLAUDE.md
# If >200 lines of instructions, Claude ignores some randomly
```

**Solutions:**
1. Remove generic docs (Claude already knows PostgreSQL exists)
2. Keep only project-specific quirks
3. Add WHY to each rule (Claude follows better)
4. Press `#` to have Claude suggest additions

**Target:** 150-200 instructions max

---

### Claude Ignores CLAUDE.md Rules (Official Diagnosis)

**Symptom:** Claude does something you explicitly told it not to do

**Official Diagnosis:**
> "If Claude keeps doing something you don't want despite having a rule against it, the file is probably too long and the rule is getting lost."

**Solutions:**
1. **Prune:** Remove anything Claude already does correctly without being told
2. **Emphasize:** Add "IMPORTANT" or "YOU MUST" to critical rules
3. **Convert:** Turn advisory instructions into deterministic hooks
4. **Test:** Observe if behavior actually changes after edits

**The Test:**
> "For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it."

---

### Plan Mode Not Working

**Symptom:** Claude still jumps straight to code

**Diagnosis:** Not actually in Plan Mode

**Solution:**
```
Press Shift+Tab TWICE
Wait for indicator: "Plan Mode" or model switches to Opus
Then give prompt
```

**Verification:**
- Claude should ask clarifying questions
- Should propose approach BEFORE implementing
- If Claude starts coding immediately, you're not in Plan Mode

---

### Can't Find Old Content in Chat

**Symptom:** Chat is too long, searching is hard

**Solution:** This index file!
```
Save this as: .reference\MASTER-INDEX.md
Search in file instead of chat
Update as you learn more
```

---

### Context Window Fills Too Fast

**Symptom:** Claude's responses degrade, it forgets earlier instructions, makes more mistakes

**Root Cause:** Context window is the fundamental constraint. Everything Claude reads (files, commands, conversation) consumes it.

**Solutions:**
1. **Between tasks:** `/clear` to reset entirely
2. **During long sessions:** `/compact <focus>` to summarize with priority
3. **For research:** Use subagents (separate context, return summary only)
4. **For corrections:** After 2 failed attempts, `/clear` and write better initial prompt

**Prevention:**
- Scope investigations narrowly
- Don't let Claude "explore" without boundaries
- Use verification to reduce back-and-forth
- Treat context like RAM — it's precious

---

### Agent Hallucinates Contradictory Information

**Symptom:** Agent synthesizes wrong answer from conflicting memories ("You love your supportive manager but want to quit due to micromanagement")

**Root Cause:** Vector search returns similar-looking text without understanding:
- Time (Week 1 vs Week 2)
- Context (different jobs)
- Truth (which is current)

**Solutions:**
1. **Immediate:** Add timestamps to all stored memories
2. **Structural:** Implement conflict resolution logic
3. **Advanced:** Graph-based memory with "archive old, activate new" pattern

**Prevention:**
- Don't store raw conversations
- Extract atomic facts with timestamps
- Define write rules for what gets stored
- Run decay maintenance to prune stale data

---

### Claude Keeps Making Same Mistake

**Symptom:** Claude repeats an error you've corrected before

**Root Cause:** Correction not captured in CLAUDE.md

**Solution (Boris Pattern):**
1. Correct Claude
2. Immediately add to CLAUDE.md:
   ```
   WRONG: [what Claude did]
   RIGHT: [what it should do]
   WHY: [context for future]
   ```
3. Use `#` shortcut to have Claude suggest the addition

**Prevention:**
- Make CLAUDE.md updates part of your workflow
- During code review, tag `@.claude` to capture learnings
- Review CLAUDE.md weekly, prune stale entries

---

### Claude's Implementation Doesn't Match Plan

**Symptom:** You planned one thing, Claude built another

**Root Cause:** Skipped or rushed planning mode

**Solution:**
1. Always start in planning mode (Shift+Tab twice)
2. Iterate on plan until you explicitly approve
3. Only then switch to auto-accept-edits
4. Define verification method in the plan

**Key Insight:**
> "With a good plan, Claude can usually one-shot the implementation."

---

### Overnight Loop Not Running

**Symptom:** Wake up with no PR, no log updates

**Diagnosis:**
```bash
# Check if jobs are scheduled
launchctl list | grep yourproject

# Check logs for errors
tail -100 ~/projects/your-project/logs/compound-review.log
```

**Common Causes:**

| Cause | Fix |
|---|---|
| Mac went to sleep | Add caffeinate plist starting before job times |
| Script not executable | `chmod +x scripts/*.sh` |
| PATH not set in plist | Add EnvironmentVariables with full PATH |
| Git auth failed | Ensure SSH keys or credentials cached |
| API rate limit | Check Anthropic usage, add delays between calls |

**Test Manually:**
```bash
launchctl start com.yourproject.daily-compound-review
tail -f logs/compound-review.log
```

---

### Agent Ships Broken Code Overnight

**Symptom:** PR fails CI, introduces bugs

**Root Cause:** Insufficient verification in autonomous mode

**Solutions:**

1. **Require test pass before commit:**
   ```bash
   # In loop.sh
   npm test || exit 1
   git commit ...
   ```

2. **Add lint/typecheck gates:**
   ```bash
   npm run lint && npm run typecheck || exit 1
   ```

3. **Create draft PRs only:**
   ```bash
   gh pr create --draft ...  # Never auto-merge
   ```

4. **Add verification prompt:**
   ```bash
   claude -p "... verify the implementation works by running tests. 
   Only commit if ALL tests pass."
   ```

**Prevention:** Start conservative. Review all overnight PRs manually for first 2 weeks before trusting.

---

### Claude Forgets Context Between Sessions ("Groundhog Day")

**Symptom:** Every day you re-explain the same things — coding style, preferences, project context

**Root Cause:** LLMs are stateless. Session history is thrown away when session ends.

**Solutions (by effort):**

| Solution | Effort | Effectiveness |
|---|---|---|
| Better CLAUDE.md | Low | Medium (if kept short) |
| Supermemory Plugin | Low | High (automatic) |
| Overnight compound loop | Medium | High (nightly updates) |
| Custom learning infrastructure | High | Highest (full control) |

**Quick Fix (Week 2):**
```bash
# Install Supermemory plugin
# https://github.com/supermemoryai/claude-supermemory
```

**What it does:**
- Injects user profile on session start
- Automatically captures conversation turns
- Learns your style over time
- No manual context management

**Why Plugin > MCP for Memory:**
MCP can't control when Claude runs tools. Plugin adds:
- Context injection at session start (guaranteed)
- Automatic capture (no tool call needed)

---

### Choosing Tech Stack for New Project

**Question:** What stack should I use for a new project?

**Answer (from $1M+ ARR startup):**

**Default to boring:**
```
React + TypeScript (frontend)
Node + TypeScript (backend)  
Postgres (database)
Redis (cache + queues)
```

**Decision framework:**

| Question | If Yes |
|---|---|
| Need CPU-heavy processing? | Add Go or Rust for that specific service |
| Selling to enterprises? | Use standard AWS, not niche cloud providers |
| Need auth? | Pay for WorkOS or similar (not open source) |
| Using AI coding assistants? | Use monorepo (all context in one place) |

**Avoid:**
- Postgres for job queues (use Redis)
- Niche vendor dependencies (blocks self-hosting)
- Specialized languages without clear need
- Microservices at early stage

> "The simpler your stack, the faster you can keep up."

---

## Quick Reference Cards

### Context Management Cheat Sheet

```
CONTEXT RULES (Eyad's Tutorial)
├─ Degrades at 30-40%, not 100%
├─ Check with /context every 10-15 min
├─ Reset when >40% (80k tokens)
└─ Use design.md to preserve state

RESET PATTERN
1. Copy key findings
2. /clear
3. "Read design.md, continue from [last step]"
4. Fresh 95% context with all knowledge

FOCUSED WORK
❌ "Explore the codebase"
✅ "Write SQL query to find Dell provider"
```

---

### CLAUDE.md Best Practices (Updated from Boris Cherny)

```
TEAM WORKFLOW:
✅ Check into git (shared knowledge base)
✅ Whole team contributes
✅ Add every mistake + correction
✅ Tag @.claude on PR reviews to add items
✅ Different teams maintain their own files

CONTENT:
✅ Add WHY to every rule
✅ Keep under 200 instructions
✅ Focus on project-specific quirks
✅ Include concrete examples with file paths
✅ Document every mistake so it never repeats

DON'T:
❌ Explain generic concepts
❌ Write documentation
❌ Copy other CLAUDEs verbatim
❌ Let it grow unchecked
```

---

### Plan Mode Checklist

```
WHEN TO USE:
✅ Before implementing features
✅ Before debugging complex issues
✅ Before architecture decisions
✅ Before refactoring

HOW TO USE:
1. Shift+Tab twice
2. Verify "Plan Mode" indicator
3. Give detailed context
4. Let Claude ask questions
5. Review plan before executing

SIGNS IT'S WORKING:
✅ Claude asks clarifying questions
✅ Proposes approach before coding
✅ Considers tradeoffs
✅ Estimates effort/impact
```

---

### Weekly Maintenance

```
EVERY WEEK:
□ Review CLAUDE.md, remove stale instructions
□ Check specs/ folders, update status
□ Run pnpm check before all commits
□ Document any repeated corrections

EVERY MONTH:
□ Review CLAUDE.md length (<200 instructions)
□ Archive completed specs/ folders
□ Consider new tools (Week 2 additions)
□ Update this index with learnings
```

---

### Official Best Practices Cheat Sheet

```
THE FUNDAMENTAL CONSTRAINT
└─ Context window fills fast
└─ Performance degrades as it fills
└─ Everything else follows from managing this

HIGHEST LEVERAGE ACTION
└─ Give Claude verification (tests, screenshots, scripts)
└─ No verification = shipping blind

FOUR PHASES
1. Explore (Plan Mode) - understand codebase
2. Plan (Plan Mode) - create implementation plan
3. Implement (Normal Mode) - code with verification
4. Commit (Normal Mode) - descriptive message + PR

CONTEXT MANAGEMENT
├─ /clear between unrelated tasks
├─ /compact when context bloated
├─ Subagents for research (separate context)
├─ After 2 failed corrections → /clear + better prompt
└─ /rewind to restore checkpoints

CLAUDE.md RULES
├─ Only what Claude can't infer from code
├─ Keep short (long = ignored)
├─ Add emphasis for critical rules
├─ Use @imports for additional files
└─ Check into git, team contributes

FIVE FAILURE PATTERNS
1. Kitchen sink session → /clear between tasks
2. Repeated corrections → /clear + better prompt
3. Bloated CLAUDE.md → prune ruthlessly
4. No verification → always provide tests
5. Infinite exploration → use subagents
```

---

### Boris Cherny Workflow Cheat Sheet

```
MODEL CHOICE
└─ Opus 4.5 with thinking (always)
└─ Optimize for task completion, not speed

PARALLEL PROCESSING
├─ 5 terminal instances (numbered tabs)
├─ 5-10 browser instances
├─ System notifications per instance
└─ When blocked on A → work on B

PLANNING MODE
├─ Shift+Tab twice
├─ Iterate until plan is solid
├─ Then auto-accept-edits
└─ Claude one-shots implementation

VERIFICATION (non-negotiable)
├─ Define verification BEFORE starting
├─ Options: bash, tests, browser
└─ No verification = shipping blind

SLASH COMMANDS
├─ Location: .claude/commands/
├─ Inline bash for pre-fetching
└─ Check into git, share with team

CLAUDE.md AS TEAM KNOWLEDGE
├─ Every mistake → add to file
├─ Tag @.claude on PR reviews
└─ Compounding institutional knowledge
```

---

### Overnight Autonomous Loop Cheat Sheet

```
THE TWO-PART LOOP
10:30 PM — Compound Review
  └─ Extract learnings from day's threads
  └─ Update CLAUDE.md
  └─ Push to main

11:00 PM — Auto-Compound
  └─ Pull main (with fresh learnings)
  └─ Pick #1 priority
  └─ PRD → tasks → implement → PR

WHY ORDER MATTERS
Review runs FIRST → CLAUDE.md updated
Implementation runs SECOND → reads fresh learnings
Agent gets smarter each night

WHEN YOU WAKE UP
✅ Updated CLAUDE.md with new patterns
✅ Draft PR for next priority
✅ Logs showing what happened

PREREQUISITES
├─ Solid CLAUDE.md foundation
├─ Working test suite
├─ Prioritized backlog
└─ --dangerously-skip-permissions comfort

THE COMPOUND EFFECT
Day N: Agent discovers pattern → adds to CLAUDE.md
Day N+1: Agent reads pattern → avoids mistake
Day N+2: Agent ships faster → discovers new pattern
```

---

### Agent Learning Hierarchy

```
WHAT ISN'T LEARNING
├─ Session history (thrown away)
├─ RAG (static retrieval)
└─ Fine-tuning (offline, not runtime)

WHAT IS LEARNING
├─ Remembers users across sessions
├─ Captures insights from conversations
├─ Learns from decisions + feedback
└─ Knowledge transfers across users

THREE LEVELS
Level 1: Agent remembers YOU
  └─ User profile + user memory

Level 2: Agent captures INSIGHTS
  └─ Agentic mode with save/search tools

Level 3: Knowledge compounds ACROSS USERS
  └─ One person teaches, everyone benefits

SIX LEARNING STORES
├─ User Profile (per user, structured)
├─ User Memory (per user, observations)
├─ Session Context (per session)
├─ Entity Memory (configurable)
├─ Learned Knowledge (cross-user)
└─ Decision Log (per agent)

THREE MODES
├─ Always (automatic extraction)
├─ Agentic (agent decides)
└─ Propose (human confirms)
```

---

### Memory Solutions Comparison

```
PROBLEM: Claude forgets everything between sessions

WORKAROUNDS (INADEQUATE)
├─ Massive CLAUDE.md files (gets ignored if too long)
├─ Copy-paste context every prompt (tedious)
└─ Memory documents (agent rarely looks at them)

SOLUTIONS BY COMPLEXITY

Level 1: Supermemory Plugin (Week 2)
├─ Install and go
├─ Automatic profile + capture
├─ 81.6% on memory benchmarks
└─ GitHub: supermemoryai/claude-supermemory

Level 2: Overnight Compound Loop (Month 3)
├─ Nightly review extracts learnings
├─ Updates CLAUDE.md automatically
└─ Requires: scripts, launchd, setup

Level 3: Custom Learning Infrastructure (Month 4+)
├─ Agno framework or custom
├─ Six learning stores
├─ Cross-user knowledge transfer
└─ Requires: database, vector store, code

HYBRID MEMORY VS RAG
RAG: Find similar documents
Hybrid: Track facts over time, build evolving profile
```

---

### Boring Stack Cheat Sheet

```
THE STACK (proven at $1M+ ARR, 3 engineers)
├─ Frontend: React + TypeScript
├─ Backend: Node + TypeScript
├─ Database: Postgres
├─ Cache/Queue: Redis
└─ That's it.

WHAT WORKS
├─ Monorepo (one PR = entire codebase, better for AI)
├─ Self-hosting ready (no niche vendor dependencies)
├─ TypeScript everywhere (except CPU-bound)
└─ Standard AWS (speeds up enterprise sales)

WHAT DOESN'T WORK
├─ Postgres for job queues (locks up at scale → Redis)
├─ Open source auth (missing enterprise features)
└─ Complex microservices (slow shipping)

WHEN TO ADD COMPLEXITY
├─ Go/Rust: CPU-bound tasks only
├─ Specialized services: When TypeScript genuinely can't do it
└─ Never: Just because it's cool

MONOREPO + AI INSIGHT
"Having all context in one place makes Cursor 
and Claude dramatically more useful"
```

---

## Version History

**v1.0 - January 15, 2025**
- Initial index created
- Day 1-2 implementations documented
- Core concepts from 19+ sources compiled
- Daily workflows established
- Advanced topics bookmarked for later

**v1.1 - January 29, 2025**
- Added Core Concept #9: Agent Memory Architecture (Rohit)
- Added Core Concept #10: Boris Cherny's Workflow
- Added Core Concept #11: Official Claude Code Best Practices
- Added Core Concept #12: Overnight Autonomous Loop (Ryan Carson)
- Added Core Concept #13: Agents That Learn (Agno Framework)
- Added Core Concept #14: Supermemory Plugin
- Added Advanced Topic: Startup Tech Stack Lessons
- Updated Tools & Resources with new tools
- Added multiple Quick Reference Cards
- Expanded Troubleshooting section

---

## Next Updates

**Week 2 (Jan 22-28):**
- [ ] Install Supermemory Plugin
- [ ] Custom commands created
- [ ] Stop Slop skill installed
- [ ] Claude-Mem setup (if needed)

**Month 2 (Feb 15):**
- [ ] First meta-optimization run
- [ ] Ralph experimentation
- [ ] LangSmith analytics review

**Month 4 (Apr 15):**
- [ ] Autonomous agent exploration
- [ ] SpecStory CLI evaluation
- [ ] Full workflow optimization
- [ ] Cross-user knowledge transfer implementation

---

**END OF MASTER INDEX**

*Keep this file updated as you learn more*
*Exported from Claude conversation - January 29, 2025*
