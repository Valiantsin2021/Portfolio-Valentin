#!/usr/bin/env python3
"""PreToolUse hook that blocks mutating SQL operations.

Only SELECT, WITH, EXPLAIN, SHOW, DESCRIBE style queries are allowed.
"""

import json
import re
import sys

SQL_TOOL_PATTERN = re.compile(r"psql|pgcli|mysql|sqlite|sqlcmd|bcp|sql", re.IGNORECASE)
BLOCKED_PATTERN = re.compile(
    r"(^|[\s;(])(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|GRANT|REVOKE|MERGE|REPLACE|UPSERT|EXEC|EXECUTE|CALL|VACUUM|REINDEX|CLUSTER|COPY\s+.*\s+FROM|\\\\copy)([\s;(]|$)",
    re.IGNORECASE,
)


def main() -> int:
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0
    except Exception as exc:
        print(f"BLOCKED: Hook error — {exc}", file=sys.stderr)
        return 2

    tool_name = input_data.get("tool_name", "")
    if tool_name not in ("Bash", "run_in_terminal"):
        return 0

    tool_input = input_data.get("tool_input", {})
    command = tool_input.get("command", "") or tool_input.get("cmd", "")
    if not command:
        return 0

    if not SQL_TOOL_PATTERN.search(command):
        return 0

    if BLOCKED_PATTERN.search(command):
        print(
            "BLOCKED: Only read-only SQL queries are allowed (SELECT, WITH, EXPLAIN, SHOW, DESCRIBE). Detected a mutating statement.",
            file=sys.stderr,
        )
        return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
