# Skill Telemetry

Session logs are written here by `/wrap` in JSONL format.

## Schema

Each line in `skill-log.jsonl` is a JSON object:

```json
{
  "date": "2026-03-16",
  "skills_used": ["/learn", "/connect"],
  "duration_min": 45,
  "files_changed": 8,
  "insights_added": 3,
  "outcome": "Extracted 3 insights from article on AI agents"
}
```

## Usage

Run `/telemetry` to see a summary of recent sessions.

The JSONL file is gitignored (personal session data).
