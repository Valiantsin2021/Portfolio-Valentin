# JiraClient Reference (`utils/jira-client.js`)

Axios-based Jira Cloud REST API v3 client. Import and instantiate before use:

```js
import JiraClient from '../../utils/jira-client.js'

const jira = new JiraClient({
  baseUrl: process.env.ATLASSIAN_URL,
  email: process.env.EMAIL,
  apiToken: process.env.JIRA_API_TOKEN
})
```

## Types

| Typedef            | Properties                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `JiraClientConfig` | `baseUrl: string`, `email: string`, `apiToken: string`                                         |
| `JiraAttachment`   | `id: string`, `filename: string`, `content: string` (download URL)                             |
| `WebhookEvent`     | `name: string`                                                                                 |
| `WebhookPayload`   | `name: string`, `url: string`, `events: string[]`, `filters?: Object`, `excludeBody?: boolean` |

## Error Handling

All methods throw `JiraClientError` (extends `Error`) with extra fields:

| Field    | Type                  | Description             |
| -------- | --------------------- | ----------------------- |
| `status` | `number \| undefined` | HTTP status code        |
| `body`   | `*`                   | Parsed response body    |
| `method` | `string`              | HTTP method (uppercase) |
| `url`    | `string`              | Request URL             |

## Methods

### Attachments

| Method                   | Signature                                          | Returns                             |
| ------------------------ | -------------------------------------------------- | ----------------------------------- |
| `getAttachments`         | `(issueKey: string)`                               | `Promise<JiraAttachment[]>`         |
| `downloadAttachment`     | `(attachment: JiraAttachment, targetDir?: string)` | `Promise<string>` — saved file path |
| `downloadAllAttachments` | `(issueKey: string, targetDir?: string)`           | `Promise<string[]>`                 |
| `uploadAttachment`       | `(issueKey: string, filePath: string)`             | `Promise<Object[]>`                 |

### Issues

| Method        | Signature                                                      | Returns                                 |
| ------------- | -------------------------------------------------------------- | --------------------------------------- |
| `createIssue` | `({ projectKey, summary, description?, issueType?, fields? })` | `Promise<Object>` — `{ key, id, self }` |
| `updateIssue` | `(issueKey: string, fields?: Object)`                          | `Promise<Object>`                       |

### Comments

| Method          | Signature                                          | Returns                                             |
| --------------- | -------------------------------------------------- | --------------------------------------------------- |
| `getComments`   | `(issueKey, { startAt?, maxResults?, orderBy? }?)` | `Promise<{ startAt, maxResults, total, comments }>` |
| `getComment`    | `(issueKey: string, commentId: string)`            | `Promise<Object>`                                   |
| `addComment`    | `(issueKey: string, comment: string \| Object)`    | `Promise<Object>`                                   |
| `updateComment` | `(issueKey: string, commentId: string, comment)`   | `Promise<Object>`                                   |
| `deleteComment` | `(issueKey: string, commentId: string)`            | `Promise<void>`                                     |

### Workflows

| Method            | Signature                                                   | Returns                                  |
| ----------------- | ----------------------------------------------------------- | ---------------------------------------- |
| `getTransitions`  | `(issueKey: string)`                                        | `Promise<Object[]>` — `{ id, name, to }` |
| `transitionIssue` | `(issueKey: string, transitionId: string, fields?: Object)` | `Promise<Object>`                        |

### Search (JQL)

| Method         | Signature                                         | Returns                                                  |
| -------------- | ------------------------------------------------- | -------------------------------------------------------- |
| `search`       | `({ jql, maxResults?, fields?, nextPageToken? })` | `Promise<{ maxResults, total, issues, nextPageToken? }>` |
| `searchIssues` | `({ jql, maxResults?, batchSize?, fields? })`     | `Promise<Object[]>` — auto-paginated                     |
| `searchAll`    | `({ jql, batchSize?, fields? })`                  | `AsyncGenerator<Object>` — yields individual issues      |

### Webhooks

| Method            | Signature                              | Returns             |
| ----------------- | -------------------------------------- | ------------------- |
| `registerWebhook` | `(webhook: WebhookPayload)`            | `Promise<Object>`   |
| `listWebhooks`    | `()`                                   | `Promise<Object[]>` |
| `getWebhook`      | `(webhookId: number \| string)`        | `Promise<Object>`   |
| `updateWebhook`   | `(webhookId, webhook: WebhookPayload)` | `Promise<Object>`   |
| `deleteWebhook`   | `(webhookId: number \| string)`        | `Promise<void>`     |

### Project

| Method       | Signature              | Returns                                               |
| ------------ | ---------------------- | ----------------------------------------------------- |
| `getProject` | `(projectKey: string)` | `Promise<Object>` — lead, description, projectTypeKey |

### Board Export

| Method              | Signature                                                          | Returns                                |
| ------------------- | ------------------------------------------------------------------ | -------------------------------------- |
| `exportBoard`       | `({ projectKey, jql?, maxResults?, maxComponents? })`              | `Promise<Object[]>` — flat row objects |
| `exportBoardToCsv`  | `({ projectKey, jql?, outputPath?, maxResults?, maxComponents? })` | `Promise<{ rows, file }>`              |
| `exportBoardToJson` | `({ projectKey, jql?, outputPath?, maxResults?, maxComponents? })` | `Promise<{ rows, file }>`              |

### eazyBI Report Export

| Method                    | Signature                                         | Returns                                   |
| ------------------------- | ------------------------------------------------- | ----------------------------------------- |
| `parseEazyBiUrl` (static) | `(url: string)`                                   | `{ accountId: string, reportId: string }` |
| `exportEazyBiReport`      | `({ accountId, reportId, format?, outputPath? })` | `Promise<{ file: string }>`               |

## Usage Examples

```js
// Search with auto-pagination
const bugs = await jira.searchIssues({
  jql: 'project = PROJ AND type = Bug AND status != Done',
  fields: ['summary', 'status', 'assignee']
})

// Async generator
for await (const issue of jira.searchAll({ jql: 'project = TEST' })) {
  console.log(issue.key, issue.fields.summary)
}

// Transition an issue
const transitions = await jira.getTransitions('PROJ-123')
await jira.transitionIssue('PROJ-123', transitions[0].id)

// Export board to CSV
const { rows, file } = await jira.exportBoardToCsv({ projectKey: 'PROJ' })
```
