#!/usr/bin/env python3

import json
import re
import sys


def is_dangerous_rm_command(command):
    """
    Comprehensive detection of dangerous rm commands.
    Matches various forms of rm -rf and similar destructive patterns.
    """
    # Normalize command by removing extra spaces and converting to lowercase
    normalized = " ".join(command.lower().split())

    patterns = [
        r"\brm\s+.*-[a-z]*r[a-z]*f",
        r"\brm\s+.*-[a-z]*f[a-z]*r",
        r"\brm\s+--recursive\s+--force",
        r"\brm\s+--force\s+--recursive",
        r"\brm\s+-r\s+.*-f",
        r"\brm\s+-f\s+.*-r",
        r"\bremove-item\s+.*-recurse",
        r"\brd\s+/s",
        r"\brmdir\s+/s",
        r"\bdel\s+/[a-z]*f[a-z]*\s+/[a-z]*s",
        r"\bfind\s+.*-delete",
        r"\bxargs\s+rm",
    ]

    # Check for dangerous patterns
    for pattern in patterns:
        if re.search(pattern, normalized):
            return True

    # Pattern 2: Check for rm with recursive flag targeting dangerous paths
    dangerous_paths = [
        r"/",  # Root directory
        r"/\*",  # Root with wildcard
        r"~",  # Home directory
        r"~/",  # Home directory path
        r"\$HOME",  # Home environment variable
        r"\.\.",  # Parent directory references
        r"\*",  # Wildcards in general rm -rf context
        r"\.",  # Current directory
        r"\.\s*$",  # Current directory at end of command
    ]

    if re.search(r"\brm\s+.*-[a-z]*r", normalized):  # If rm has recursive flag
        for path in dangerous_paths:
            if re.search(path, normalized):
                return True

    return False


def is_env_file_access(tool_name, tool_input):
    """
    Check if any tool is trying to access .env files containing sensitive data.
    """
    # Allow known safe variants
    safe_suffixes = (".env.sample", ".env.example", ".env.template")

    if tool_name in ("Read", "Edit", "MultiEdit", "Write"):
        file_path = tool_input.get("file_path", "") or tool_input.get("filePath", "")
        normalized_path = file_path.lower()
        if re.search(r"[\\/]\.env$", file_path) or re.search(
            r"[\\/]\.env\.[a-z]+$", file_path
        ):
            if not normalized_path.endswith(safe_suffixes):
                return True

    elif tool_name in ("Bash", "run_in_terminal"):
        command = tool_input.get("command", "")
        # Detect .env token references while allowing template variants.
        matches = re.findall(
            r"(?:(?<=^)|(?<=[\s'\"`/=]))(\.env(?:\.[A-Za-z0-9_-]+)?)",
            command,
        )
        for match in matches:
            if match.lower() not in safe_suffixes:
                return True

    return False


def main():
    try:
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)

        tool_name = input_data.get("tool_name", "")
        tool_input = input_data.get("tool_input", {})

        # Check for .env file access (blocks access to sensitive environment files)
        if is_env_file_access(tool_name, tool_input):
            print(
                "BLOCKED: Access to .env files containing sensitive data is prohibited",
                file=sys.stderr,
            )
            print("Use .env.sample for template files instead", file=sys.stderr)
            sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude

        # Check for dangerous rm -rf commands
        if tool_name in ("Bash", "run_in_terminal"):
            command = tool_input.get("command", "")

            # Block rm -rf commands with comprehensive pattern matching
            if is_dangerous_rm_command(command):
                print(
                    "BLOCKED: Dangerous rm command detected and prevented",
                    file=sys.stderr,
                )
                sys.exit(2)  # Exit code 2 blocks tool call and shows error to Claude

        sys.exit(0)

    except json.JSONDecodeError:
        sys.exit(0)
    except Exception as exc:
        # Fail closed — block on unexpected errors
        print(f"BLOCKED: Hook error — {exc}", file=sys.stderr)
        sys.exit(2)


if __name__ == "__main__":
    main()
