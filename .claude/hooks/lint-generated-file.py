#!/usr/bin/env python3
"""Format and lint files created or edited by the current tool call."""

import json
import os
import subprocess
import sys
from pathlib import Path

CODE_EXTENSIONS = {".cjs", ".js", ".jsx", ".mjs", ".ts", ".tsx"}


def get_file_paths(payload: dict) -> list[Path]:
    tool_input = payload.get("tool_input", {})
    candidates = tool_input.get("file_paths") or tool_input.get("files")
    if candidates is None:
        candidates = [tool_input.get("file_path") or tool_input.get("filePath")]

    return [
        Path(file_path)
        for file_path in candidates
        if file_path and Path(file_path).suffix.lower() in CODE_EXTENSIONS
    ]


def run_command(command: list[str], file_paths: list[Path]) -> int:
    result = subprocess.run(
        [*command, *(str(path) for path in file_paths)], check=False
    )
    return result.returncode


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0

    file_paths = [path for path in get_file_paths(payload) if path.is_file()]
    if not file_paths:
        return 0

    executable_suffix = ".cmd" if os.name == "nt" else ""
    npx = f"npx{executable_suffix}"
    format_result = run_command([npx, "prettier", "--write"], file_paths)
    lint_result = run_command([npx, "eslint", "--fix"], file_paths)
    return format_result or lint_result


if __name__ == "__main__":
    sys.exit(main())
