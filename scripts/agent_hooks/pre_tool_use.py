#!/usr/bin/env python3
"""Pre-tool-use safety hook for CV & Portfolio project.

Blocks dangerous commands before execution. Reads tool input from stdin (JSON).
Exit 0 = allow, exit 2 = deny (message on stdout).
"""

import json
import re
import sys


DANGEROUS_PATTERNS = [
    # Destructive file operations
    (r"rm\s+-rf\s+[./]", "Blocked: rm -rf on project paths. Specify exact files instead."),
    (r"rm\s+-rf\s+/", "Blocked: rm -rf on root paths."),
    (r"Remove-Item.*-Recurse.*-Force", "Blocked: recursive forced deletion. Specify exact files."),
    (r"del\s+/[sS]\s+/[qQ]", "Blocked: recursive silent deletion."),

    # Piped deletions
    (r"\|\s*xargs\s+rm", "Blocked: piping to rm. List files first, then delete explicitly."),
    (r"\|\s*Remove-Item", "Blocked: piping to Remove-Item. List files first, then delete explicitly."),
    (r"Get-ChildItem.*-Include", "Blocked: Get-ChildItem -Include has known filtering bugs. Use -Filter or Glob tool."),

    # Git destructive operations
    (r"git\s+push\s+--force", "Blocked: force-push. Use regular push. See docs/agentic/GIT_WORKFLOW.md."),
    (r"git\s+push\s+.*--force", "Blocked: force-push. Use regular push."),
    (r"git\s+rebase", "Blocked: rebase. Use 'git merge main' instead. See docs/agentic/GIT_WORKFLOW.md."),
    (r"git\s+reset\s+--hard", "Blocked: hard reset. Use 'git stash' to save work first."),
    (r"git\s+clean\s+-f", "Blocked: git clean -f. Specify files to remove manually."),
    (r"git\s+checkout\s+--\s+\.", "Blocked: checkout all. Specify files explicitly."),

    # Publishing
    (r"npm\s+publish", "Blocked: npm publish. This is a static site, not a package."),

    # Env/secret writes
    (r">\s*\.env", "Blocked: writing to .env file."),
    (r">>\s*\.env", "Blocked: appending to .env file."),

    # Credential patterns
    (r"(?:API_KEY|SECRET|PASSWORD|TOKEN|PRIVATE_KEY)\s*=\s*['\"]?\w{8,}",
     "Blocked: potential secret in command. Never write credentials to files."),

    # Remote code execution
    (r"curl.*\|\s*(?:sh|bash)", "Blocked: piping remote content to shell."),
    (r"wget.*\|\s*(?:sh|bash)", "Blocked: piping remote content to shell."),
]

PROTECTED_FILES = [
    (r"Portfolio/images/headshot\.jpg", "Protected: headshot.jpg. Confirm with user before modifying."),
]


def check_command(command: str) -> tuple[bool, str]:
    """Check a command against dangerous patterns. Returns (allowed, message)."""
    for pattern, message in DANGEROUS_PATTERNS:
        if re.search(pattern, command, re.IGNORECASE):
            return False, message

    for pattern, message in PROTECTED_FILES:
        if re.search(pattern, command) and any(
            op in command.lower() for op in ["rm ", "del ", "remove", "overwrite", "mv ", "move "]
        ):
            return False, message

    return True, ""


def main():
    try:
        input_data = json.loads(sys.stdin.read())
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})

    if tool_name != "Bash":
        sys.exit(0)

    command = tool_input.get("command", "")
    if not command:
        sys.exit(0)

    allowed, message = check_command(command)
    if not allowed:
        print(message)
        sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
