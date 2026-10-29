#!/usr/bin/env python3
"""PostToolUse hook that formats and lints only the file that was just written.

Replaces running `npm run format && npm run lint` (prettier/eslint over the
entire repository) on every single Edit/Write/MultiEdit call, which reformats
hundreds of unrelated files each time. Scoping to the touched file keeps
Claude Code's edits surgical; prettier and eslint still respect the project's
.prettierignore / eslint.config.js ignore rules for that single path.
"""

import json
import os
import subprocess
import sys

FORMATTABLE_EXTENSIONS = {
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
    ".json", ".md", ".yml", ".yaml", ".css", ".html",
}
LINTABLE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"}


def get_file_path(tool_input: dict) -> str:
    for key in ("file_path", "filePath", "path"):
        value = tool_input.get(key)
        if value:
            return value
    return ""


def main() -> int:
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0
    except Exception as exc:
        print(f"format-and-lint hook error reading input: {exc}", file=sys.stderr)
        return 0

    tool_input = input_data.get("tool_input", {})
    file_path = get_file_path(tool_input)

    if not file_path or not os.path.isfile(file_path):
        return 0

    _, ext = os.path.splitext(file_path)

    if ext in FORMATTABLE_EXTENSIONS:
        subprocess.run(["npx", "prettier", "--write", file_path], shell=True)

    if ext in LINTABLE_EXTENSIONS:
        subprocess.run(["npx", "eslint", "--fix", file_path], shell=True)

    return 0


if __name__ == "__main__":
    sys.exit(main())
