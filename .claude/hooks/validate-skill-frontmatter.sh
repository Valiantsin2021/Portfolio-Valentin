#!/bin/bash
# validate-skill-frontmatter.sh — PostToolUse (Write|Edit) hook for creating-skills skill
# Validates that SKILL.md files contain required YAML frontmatter fields:
# name, description, version, owner, roles

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check SKILL.md files
BASENAME=$(basename "$FILE_PATH")
if [ "$BASENAME" != "SKILL.md" ]; then
  exit 0
fi

if [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# Extract frontmatter (between --- delimiters)
FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$FILE_PATH" | sed '1d;$d')

if [ -z "$FRONTMATTER" ]; then
  echo "SKILL.md is missing YAML frontmatter (--- delimiters). Required fields: name, description, version, owner, roles." >&2
  exit 2
fi

MISSING=""
for FIELD in name description version owner roles; do
  if ! echo "$FRONTMATTER" | grep -q "^${FIELD}:"; then
    MISSING="$MISSING $FIELD"
  fi
done

if [ -n "$MISSING" ]; then
  echo "SKILL.md frontmatter is missing required fields:$MISSING. All skills must have: name, description, version, owner, roles." >&2
  exit 2
fi

exit 0
