---
name: accessing-atlassian
description: Access Atlassian Jira and Confluence via REST APIs. Covers authentication with API tokens, querying issues with JQL, managing sprints, and reading Confluence pages. Use when the user mentions Jira, Confluence, Atlassian, Jira issues, JQL query, Jira sprint, Confluence pages, Jira API, or needs to interact with any Atlassian resource.
---

# Accessing Atlassian (Jira & Confluence)

Interact with Jira and Confluence using their REST APIs. No MCP server required — use direct API calls with curl (bash/zsh) or `Invoke-RestMethod` (PowerShell).

**Platform note:** All examples include both bash and PowerShell variants. On Windows, prefer PowerShell (`Invoke-RestMethod`). On macOS/Linux, use curl.

## Authentication

### Jira Cloud / Confluence Cloud

Uses email + API token (Basic Auth).

1. Go to `https://id.atlassian.com/manage-profile/security/api-tokens`
2. Click **Create API token**
3. Give it a label and copy the token

### Store credentials securely

**macOS / Linux** — add to `~/.zshrc` or `~/.bashrc`:

```bash
export ATLASSIAN_URL="https://iso-us-verisk.atlassian.net"
export EMAIL="i39146@verisk.com"
export JIRA_API_TOKEN="JIRA_TOKEN_HERE"
```

**Windows (PowerShell)** — add to your `$PROFILE` or set as User environment variables:

```powershell
# Option 1: Add to $PROFILE (run: notepad $PROFILE)
$env:ATLASSIAN_URL = "https://iso-us-verisk.atlassian.net"
$env:EMAIL = "i39146@verisk.com"
$env:JIRA_API_TOKEN = "JIRA_TOKEN_HERE"

# Option 2: Persist via User environment variables (survives restarts)
[Environment]::SetEnvironmentVariable("ATLASSIAN_URL", "https://iso-us-verisk.atlassian.net", "User")
[Environment]::SetEnvironmentVariable("EMAIL", "i39146@verisk.com", "User")
[Environment]::SetEnvironmentVariable("JIRA_API_TOKEN", "JIRA_TOKEN_HERE", "User")
```

### Auth header (Cloud)

**bash / zsh:**

```bash
AUTH=$(echo -n "$EMAIL:$JIRA_API_TOKEN" | base64)
curl -s -H "Authorization: Basic $AUTH" -H "Accept: application/json" \
  "$ATLASSIAN_URL/rest/api/2/myself"
```

**PowerShell:**

```powershell
$pair = "$($env:EMAIL):$($env:JIRA_API_TOKEN)"
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
$headers = @{ Authorization = "Basic $auth"; Accept = "application/json" }
Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/rest/api/2/myself" -Headers $headers
```

### Jira Server / Data Center (on-premise)

Uses Bearer token (PAT) instead:

**bash / zsh:**

```bash
curl -s -H "Authorization: Bearer $JIRA_PAT" -H "Accept: application/json" \
  "https://jira.company.com/rest/api/2/myself"
```

**PowerShell:**

```powershell
$headers = @{ Authorization = "Bearer $($env:JIRA_PAT)"; Accept = "application/json" }
Invoke-RestMethod -Uri "https://jira.company.com/rest/api/2/myself" -Headers $headers
```

## Jira REST API

For endpoints, JQL query examples, and issue creation examples, read [atlassian-api-reference.md](references/atlassian-api-reference.md).

For the project's built-in Jira client class (`JiraClient`), read [jira-client-reference.md](references/jira-client-reference.md). Source: `utils/jira-client.js`.

**Base URL:** `{ATLASSIAN_URL}/rest/api/2` (v2) or `/rest/api/3` (v3, Cloud only)

Key operations: get issue, search with JQL, create/update issue, add comment, get/perform transitions, list sprints.

## Confluence REST API

For endpoints and search examples, read [atlassian-api-reference.md](references/atlassian-api-reference.md).

For the project's built-in Confluence client class (`ConfluenceClient`), read [confluence-client-reference.md](references/confluence-client-reference.md). Source: `utils/confluence-client.js`.

**Base URL:** `{ATLASSIAN_URL}/rest/api/v2` (Cloud) or `{URL}/rest/api/content` (Server)

Key operations: get page by ID, search pages, get page content, list spaces.

## Security

- API tokens are separate from passwords — create dedicated integration tokens
- Rotate tokens periodically
- Monitor usage in Atlassian admin: Security → API tokens
- Use read-only access when write is not needed
- Never commit tokens to source control — use environment variables
