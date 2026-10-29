# ConfluenceClient Reference (`utils/confluence-client.js`)

Axios-based Confluence REST API client (v1 + v2). Import and instantiate before use:

```js
import ConfluenceClient from '../../utils/confluence-client.js'

const confluence = new ConfluenceClient({
  baseUrl: process.env.ATLASSIAN_URL,
  email: process.env.EMAIL,
  apiToken: process.env.JIRA_API_TOKEN
})
```

## Constructor

| Parameter         | Type     | Description                                                |
| ----------------- | -------- | ---------------------------------------------------------- |
| `config.baseUrl`  | `string` | Confluence site URL (e.g. `https://my-site.atlassian.net`) |
| `config.email`    | `string` | Atlassian account email                                    |
| `config.apiToken` | `string` | Atlassian API token                                        |

Throws `Error` if any required property is missing.

## Methods

### Page CRUD

| Method       | Signature                                 | Returns                                     |
| ------------ | ----------------------------------------- | ------------------------------------------- |
| `createPage` | `({ spaceKey, title, body, ancestors? })` | `Promise<Object>` — created page            |
| `getPage`    | `(pageId, expand?)`                       | `Promise<Object>` — page with expansions    |
| `updatePage` | `(pageId, { title?, body? })`             | `Promise<Object>` — auto-increments version |

### Delete / Purge

| Method       | Signature               | Returns                            |
| ------------ | ----------------------- | ---------------------------------- |
| `deletePage` | `(pageId, { purge? }?)` | `Promise<{ ok, trashed, purged }>` |

### Move

| Method     | Signature                           | Returns                          |
| ---------- | ----------------------------------- | -------------------------------- |
| `movePage` | `(pageId, { targetId, position? })` | `Promise<{ ok, api, position }>` |

`position`: `'append'` (default), `'prepend'`, `'before'`, `'after'`. Falls back to v1 ancestors approach if v2 unavailable.

### Labels

| Method         | Signature                       | Returns                    |
| -------------- | ------------------------------- | -------------------------- |
| `listLabels`   | `(pageId, { start?, limit? }?)` | `Promise<Object[]>`        |
| `addLabels`    | `(pageId, labels: string[])`    | `Promise<Object>`          |
| `removeLabels` | `(pageId, labels: string[])`    | `Promise<{ ok: boolean }>` |

### Search (CQL)

| Method             | Signature                             | Returns                                   |
| ------------------ | ------------------------------------- | ----------------------------------------- |
| `search`           | `({ cql?, limit?, start?, url? }?)`   | `Promise<Object>` — results + `_links`    |
| `searchAll`        | `({ cql, batchSize? })`               | `AsyncGenerator<Object>` — auto-paginated |
| `searchByAncestor` | `(ancestorId, { cql?, batchSize? }?)` | `AsyncGenerator<Object>`                  |

### Page History

| Method              | Signature                         | Returns                                         |
| ------------------- | --------------------------------- | ----------------------------------------------- |
| `listVersions`      | `(pageId, { start?, limit? }?)`   | `Promise<Object>` — version list                |
| `getVersion`        | `(pageId, versionNumber: number)` | `Promise<Object>`                               |
| `getVersionContent` | `(pageId, versionNumber: number)` | `Promise<{ title, body }>`                      |
| `restoreToVersion`  | `(pageId, versionNumber: number)` | `Promise<Object>` — new version from historical |

### Attachments

| Method                    | Signature                             | Returns                                                   |
| ------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `listAttachments`         | `(pageId, { start?, limit? }?)`       | `Promise<Object[]>`                                       |
| `uploadAttachment`        | `(pageId, filePath: string)`          | `Promise<Object>` — auto-updates if duplicate name        |
| `updateAttachment`        | `(pageId, attachmentId, filePath)`    | `Promise<Object>`                                         |
| `uploadAttachmentChunked` | `(pageId, filePath, { chunkSize? }?)` | `Promise<Object>` — for large files (default 8 MB chunks) |

### Templates

| Method                   | Signature                                                 | Returns                   |
| ------------------------ | --------------------------------------------------------- | ------------------------- |
| `renderTemplate`         | `(templateString, variables?)`                            | `string` — rendered XHTML |
| `createPageFromTemplate` | `({ spaceKey, title, template, variables?, ancestors? })` | `Promise<Object>`         |
| `updatePageFromTemplate` | `(pageId, { title?, template, variables? })`              | `Promise<Object>`         |

Supports `{{variable}}` placeholders and `{{#each list}}...{{/each}}` loops.

### Markdown → Confluence

| Method                       | Signature                                      | Returns                                |
| ---------------------------- | ---------------------------------------------- | -------------------------------------- |
| `markdownToStorage`          | `(markdown: string)`                           | `string` — XHTML storage format        |
| `createPageFromMarkdown`     | `({ spaceKey, title, markdown, ancestors? })`  | `Promise<Object>`                      |
| `updatePageFromMarkdown`     | `(pageId, { title?, markdown })`               | `Promise<Object>`                      |
| `createPageFromMarkdownFile` | `({ spaceKey, title?, filePath, ancestors? })` | `Promise<Object>`                      |
| `updatePageFromMarkdownFile` | `(pageId, { title?, filePath })`               | `Promise<Object>`                      |
| `upsertPageFromMarkdownFile` | `({ spaceKey, title?, filePath, ancestors? })` | `Promise<Object>` — creates or updates |

## Usage Examples

```js
// Create a page
const page = await confluence.createPage({
  spaceKey: 'ENG',
  title: 'Sprint 42 Report',
  body: '<h1>Report</h1><p>Details...</p>',
  ancestors: ['12345']
})

// Search with auto-pagination
for await (const result of confluence.searchAll({ cql: 'space = ENG AND type = page' })) {
  console.log(result.title)
}

// Create page from Markdown file
await confluence.upsertPageFromMarkdownFile({
  spaceKey: 'ENG',
  filePath: './docs/report.md',
  ancestors: ['12345']
})

// Chunked upload for large files
await confluence.uploadAttachmentChunked('67890', './large-export.zip')
```
