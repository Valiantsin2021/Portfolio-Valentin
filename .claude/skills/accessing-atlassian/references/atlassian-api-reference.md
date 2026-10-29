# Atlassian API Reference

## Jira REST API

**Base URL:** `{ATLASSIAN_URL}/rest/api/2` (v2) or `/rest/api/3` (v3, Cloud only)

### Key Endpoints

| Operation        | Method | Endpoint                                 |
| ---------------- | ------ | ---------------------------------------- |
| Get issue        | GET    | `/rest/api/2/issue/{KEY}`                |
| Search with JQL  | GET    | `/rest/api/2/search?jql={query}`         |
| Create issue     | POST   | `/rest/api/2/issue`                      |
| Update issue     | PUT    | `/rest/api/2/issue/{KEY}`                |
| Add comment      | POST   | `/rest/api/2/issue/{KEY}/comment`        |
| Get transitions  | GET    | `/rest/api/2/issue/{KEY}/transitions`    |
| Transition issue | POST   | `/rest/api/2/issue/{KEY}/transitions`    |
| List sprints     | GET    | `/rest/agile/1.0/board/{boardId}/sprint` |

### JQL Query Examples

**bash / zsh:**

```bash
# My open issues
curl -s -H "Authorization: Basic $AUTH" \
  "$ATLASSIAN_URL/rest/api/2/search?jql=assignee%3DcurrentUser()%20AND%20status%21%3DDone&maxResults=20"

# Issues in current sprint
jql="project=PROJ AND sprint in openSprints() ORDER BY priority DESC"

# Recently updated bugs
jql="project=PROJ AND type=Bug AND updated >= -7d ORDER BY updated DESC"
```

**PowerShell:**

```powershell
# My open issues
$jql = [Uri]::EscapeDataString("assignee=currentUser() AND status!=Done")
Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/rest/api/2/search?jql=$jql&maxResults=20" -Headers $headers

# Issues in current sprint
$jql = [Uri]::EscapeDataString("project=PROJ AND sprint in openSprints() ORDER BY priority DESC")
Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/rest/api/2/search?jql=$jql" -Headers $headers

# Recently updated bugs
$jql = [Uri]::EscapeDataString("project=PROJ AND type=Bug AND updated >= -7d ORDER BY updated DESC")
Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/rest/api/2/search?jql=$jql" -Headers $headers
```

### Create an Issue

**bash / zsh:**

```bash
curl -s -X POST \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  "$ATLASSIAN_URL/rest/api/2/issue" \
  -d '{
    "fields": {
      "project": {"key": "PROJ"},
      "summary": "Issue title",
      "issuetype": {"name": "Bug"},
      "description": "Detailed description"
    }
  }'
```

**PowerShell:**

```powershell
$body = @{
    fields = @{
        project   = @{ key = "PROJ" }
        summary   = "Issue title"
        issuetype = @{ name = "Bug" }
        description = "Detailed description"
    }
} | ConvertTo-Json -Depth 5

$postHeaders = @{ Authorization = "Basic $auth"; Accept = "application/json"; "Content-Type" = "application/json" }
Invoke-RestMethod -Method Post -Uri "$($env:ATLASSIAN_URL)/rest/api/2/issue" -Headers $postHeaders -Body $body
```

## Confluence REST API

**Base URL:** `{ATLASSIAN_URL}/rest/api/v2` (Cloud) or `{URL}/rest/api/content` (Server)

### Key Endpoints (Cloud v2)

| Operation        | Method | Endpoint                                      |
| ---------------- | ------ | --------------------------------------------- |
| Get page by ID   | GET    | `/rest/api/v2/pages/{id}`                     |
| Search pages     | GET    | `/rest/api/v2/pages?title={title}`            |
| Get page content | GET    | `/rest/api/v2/pages/{id}?body-format=storage` |
| List spaces      | GET    | `/rest/api/v2/spaces`                         |

### Search Confluence Content

**bash / zsh:**

```bash
# Search by title
curl -s -H "Authorization: Basic $AUTH" \
  "$ATLASSIAN_URL/rest/api/v2/pages?title=Architecture%20Guide"

# CQL search (Confluence Query Language)
curl -s -H "Authorization: Basic $AUTH" \
  "$ATLASSIAN_URL/rest/api/content/search?cql=type=page%20AND%20space=DEV%20AND%20text~%22deployment%22"
```

**PowerShell:**

```powershell
# Search by title
$title = [Uri]::EscapeDataString("Architecture Guide")
Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/rest/api/v2/pages?title=$title" -Headers $headers

# CQL search (Confluence Query Language)
$cql = [Uri]::EscapeDataString('type=page AND space=DEV AND text~"deployment"')
Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/rest/api/content/search?cql=$cql" -Headers $headers
```

### Get Page by ID with Content

**bash / zsh:**

```bash
curl -s -H "Authorization: Basic $AUTH" \
  "$ATLASSIAN_URL/wiki/rest/api/content/{pageId}?expand=body.storage,version,space"
```

**PowerShell:**

```powershell
$pageId = 518651979
$response = Invoke-RestMethod -Uri "$($env:ATLASSIAN_URL)/wiki/rest/api/content/$pageId`?expand=body.storage,version,space" -Headers $headers
$response | ConvertTo-Json -Depth 5
```
