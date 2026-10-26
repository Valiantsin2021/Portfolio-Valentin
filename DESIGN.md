---
name: Valentin Lutchanka Portfolio
description: Agentic QA leadership, presented as a calm, audited quality report.
colors:
  pass-green: "#15803d"
  pass-green-deep: "#166534"
  pass-green-wash: "#dcfce7"
  on-pass-green: "#ffffff"
  report-paper: "#f8fafc"
  sheet-white: "#ffffff"
  ledger-tint: "#f1f5f9"
  hairline: "#e2e8f0"
  ink: "#0f172a"
  ink-muted: "#475569"
  terminal-night: "#0f172a"
  terminal-text: "#e2e8f0"
  terminal-muted: "#94a3b8"
  terminal-pass: "#4ade80"
  pass-green-dark: "#22c55e"
  pass-green-dark-hover: "#4ade80"
  on-pass-green-dark: "#052e16"
  report-paper-dark: "#0b1120"
  sheet-dark: "#111a2e"
  ledger-tint-dark: "#0f1729"
  hairline-dark: "#233049"
  ink-dark: "#f1f5f9"
  ink-muted-dark: "#a3b1c6"
  terminal-night-dark: "#070c18"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.125rem, 4.2vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  lead:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, Cascadia Code, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "8px"
  md: "12px"
  pill: "999px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  section: "72px"
  section-lg: "104px"
components:
  button-primary:
    backgroundColor: "{colors.pass-green}"
    textColor: "{colors.on-pass-green}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pass-green-deep}"
    textColor: "{colors.on-pass-green}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    size: "44px"
  nav-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.ledger-tint}"
    textColor: "{colors.ink}"
  project-card:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.md}"
    padding: "20px"
  pipeline-panel:
    backgroundColor: "{colors.terminal-night}"
    textColor: "{colors.terminal-text}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Valentin Lutchanka Portfolio

## Overview

**Creative North Star: "The Quality Report"**

The page behaves like a well-run quality report handed to a hiring manager: calm paper, hairline rules, figures that line up, and exactly one signal color that means "passed". Nothing on the page is decorative for its own sake. Hierarchy comes from type weight, measured whitespace and the green accent landing only on things that carry evidence: the headline figure, stage numbers, dates, the primary action.

Density is moderate and scan-friendly. Content sits in a single 1160px column; sections alternate between report paper and a faint ledger tint, separated by full-bleed hairlines rather than boxes. Lists are rows, not cards: metrics, STLC stages, career roles and contact lines are all divided by 1px rules so the eye reads them top to bottom like a table.

Components are engineered and confident: solid green primary buttons, crisp 8px corners, 44px+ targets, and motion that only confirms state (a 2px lift, a scale-down on press, a scroll-filled timeline rail). The one deliberate contrast is the dark pipeline panel in the hero, a terminal-style run log that shows the agentic STLC "passing" stage by stage.

**Key Characteristics:**
- Slate neutrals plus a single Pass Green accent, in both light and dark themes.
- IBM Plex Sans for everything read; IBM Plex Mono for labels, dates, stage numbers and the run log.
- Hairline-ruled rows over boxed cards; cards appear only for published tools. No pills.
- Tabular, heavy figures for every measured number.
- Flat at rest; depth is reserved for the pipeline panel and the mobile menu.

## Colors

Cool slate paper and ink with one green that reads as a passing test.

### Primary
- **Pass Green** (light `pass-green`, dark `pass-green-dark`): primary buttons, nav "Contact" CTA, eyebrow labels, stage numbers, role dates, timeline rail and dots, the headline 3,500+ figure, link text, focus outline. Hover deepens in light (`pass-green-deep`) and brightens in dark (`pass-green-dark-hover`).
- **Pass Green Wash** (`pass-green-wash`; dark uses Pass Green at 12% alpha): reserved token, currently unused.

### Neutral
- **Report Paper** (`report-paper` / `report-paper-dark`): page background.
- **Sheet White** (`sheet-white` / `sheet-dark`): project card surface.
- **Ledger Tint** (`ledger-tint` / `ledger-tint-dark`): alternate section bands, nav hover/active fill, cert thumbnail and image backgrounds.
- **Hairline** (`hairline` / `hairline-dark`): every divider, card border, ghost button border, inactive timeline rail, list markers.
- **Ink** (`ink` / `ink-dark`): headings, body emphasis, `<strong>`.
- **Ink Muted** (`ink-muted` / `ink-muted-dark`): body copy in leads, descriptions, labels, secondary metadata.

### Terminal (pipeline panel only)
- **Terminal Night** (`terminal-night` / `terminal-night-dark`), **Terminal Text**, **Terminal Muted**, **Terminal Pass** (`terminal-pass`): the run-log panel is dark in both themes and uses its own brighter green for "done" states and the Σ total.

### Named Rules
**The One Signal Rule.** Pass Green is the only hue on the page. It marks evidence, sequence and action; it never fills large surfaces. No secondary or tertiary accent exists.

**The Personal Site Rule.** No employer colors or logos. Verisk appears as text only.

## Typography

**Display Font:** IBM Plex Sans (with system-ui, -apple-system, Segoe UI, Roboto)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, Cascadia Code, Consolas)

**Character:** An engineering family used with editorial restraint. Plex Sans carries the argument in tight, heavy headlines; Plex Mono tags things the way a test report tags them: stage IDs, dates, statuses.

### Hierarchy
- **Display** (700, `clamp(2.125rem, 4.2vw, 3.25rem)`, 1.2, -0.03em): hero headline only.
- **Headline** (700, `clamp(1.75rem, 3vw, 2.5rem)`, 1.2): section `h2`.
- **Title** (600, 1.0625–1.25rem, 1.2): stage, principle, role, project and cert `h3`.
- **Figure** (700, 2.5rem, 1.1, tabular numerals): metric values; the lead figure rises to 3.25rem in Pass Green.
- **Lead** (400, 1.125rem, 1.6, max 60ch): hero intro; section intros at 1.0625rem. The personal-view statement scales `clamp(1.1875rem, 2vw, 1.4375rem)` at 1.55.
- **Body** (400, 1rem, 1.6): copy, capped 62–64ch; `text-wrap: pretty` on all paragraphs and list items.
- **Label** (Mono 500, 0.875rem): dates and stage numbers; 0.75rem uppercase 0.06em for pipeline statuses. No eyebrow labels above headings; headings stand alone.

### Named Rules
**The Numbers Line Up Rule.** Every measured figure uses `font-variant-numeric: tabular-nums` and heavy weight. Numbers are the hero, not the adjectives around them.

**The Mono Means Metadata Rule.** Mono never sets prose. It labels, dates, numbers and logs.

## Layout

Single centered column, max 1160px, gutters 16px on mobile and 32px from 768px. Sections pad 72px vertically, 104px from 1024px (`section-tight` holds 72px). Section heads cap at 680px with 40px below.

Grids are simple and content-driven: hero 1.35fr / 1fr at 1024px+ (copy left, pipeline right); metrics 1 → 2 → 4 columns (first column 1.4fr) split by vertical hairlines; stages as 56px number / title / description rows from 768px; career as 220px meta / body from 768px; toolkit and principles 2-up from 768px; projects and certs 1 → 2 → 3 columns (640 / 1024). Navigation collapses to a dropdown sheet below 1024px.

Spacing steps are 8 / 12 / 16 / 24 / 32 / 48 / 64. Sticky header is 64px; anchor scroll offsets by header + 16px.

## Elevation & Depth

Flat by default. Depth comes from tonal bands (paper vs ledger tint) and hairlines, not shadows.

### Shadow Vocabulary
- **Panel lift** (light `0 1px 2px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.06)`; dark `0 1px 2px rgb(0 0 0 / 0.4), 0 8px 24px rgb(0 0 0 / 0.25)`): the hero pipeline panel and the open mobile menu. Nothing else.
- **Frosted header** (85% page background + `saturate(160%) blur(10px)`): sticky header; its bottom hairline fades in over the first 80px of scroll.

### Named Rules
**The Flat Report Rule.** Surfaces are flat at rest. Cards show state by border color and a 2px lift, not by adding shadow.

## Shapes

Crisp, lightly rounded geometry. Controls, nav links, icon buttons and cert thumbnails use 8px (`rounded.sm`). Large containers (project cards, pipeline panel) use 12px (`rounded.md`). The avatar and timeline dots are circles. Borders are always 1px hairlines; the only 2px strokes are the principle left-rule and timeline rail, both in Pass Green.

## Components

### Buttons
Solid, confident, 48px tall.
- **Shape:** gently rounded (8px).
- **Primary:** Pass Green fill, white text (dark-on-green in dark theme), 600 weight, 0 22px padding.
- **Ghost:** transparent with hairline border and ink text; border darkens to Ink Muted on hover.
- **Hover / Focus / Active:** color shifts over 0.2s on `cubic-bezier(0.2, 0.8, 0.2, 1)`; press scales to 0.98; focus is a 2px Pass Green outline offset 3px.
- **Icon button:** 44px square, transparent, Ledger Tint fill on hover. Used for theme toggle, menu toggle and social links (social links add a hairline border that turns green on hover).

### Stack Rows
- **Style:** hairline-ruled rows, 3 columns from 768px (discipline 11rem / tools / proof 15rem), stacked on mobile.
- **Tools:** main tools in Ink 600 separated by " · "; secondary tools in a muted "Also …" line.
- **Proof:** one muted line reusing a fact already on the page, its figure in Pass Green bold tabular.
- No pills or tags anywhere on the page.

### Cards / Containers
- **Project card:** Sheet White, hairline border, 12px corners, 20px body padding, 16:10 screenshot on top. Hover turns the border Pass Green, lifts 2px, and slowly pans tall screenshots from top to bottom (3s).
- **Metric row:** not a card; figures sit between hairlines with vertical rules between columns.
- **Principle:** 2px Pass Green left-rule, 20px indent, no box.
- **Certification:** 112×84 thumbnail (hairline border, 8px corners, Ledger Tint fill, `object-fit: contain` so mixed-ratio certificates stay whole) beside title + issuer · year; 1 → 2 → 3 columns. Nine featured; the rest sit in a `<details>` list. Thumbnails are links that open the full certificate in a modal `<dialog>` (hugs the image, max 960px / 90vh, dark scrim, close button top-right, Esc and backdrop click close); without `<dialog>` support they open the image in a new tab. Hover/focus: Pass Green border + 2px lift, zoom-in cursor.

### Navigation
Sticky frosted header with name as wordmark (600, 1.0625rem). Links are muted 0.9375rem/500 with 8px 12px padding; hover and current section (`aria-current`) get Ledger Tint fill and ink text. Five links whose labels match their section headings (AI in QA · Career · Stack · Tools · Certifications; Impact is reached from the hero button), then the Pass Green "Contact" CTA. Sections without a link name their parent link via `data-nav` for the scroll-spy. Below 1024px the CTA moves out of the menu into the header bar (always visible), and a menu button opens a full-width sheet with stacked 12px-padded links.

### Pipeline Panel (signature)
A dark terminal card titled `agentic-stlc` listing five STLC stages as mono rows (stage / task / status), ending with `Σ labor hours saved 3,500+` in Terminal Pass. On load, JS runs the rows through queued → running → done (dot → check mark); a "re-run" button replays it. Without JS every row shows done.

### Career Timeline (signature)
Left 2px rail with ringed dots per role. Where scroll-driven animations exist, a Pass Green copy of the rail fills with scroll and each dot fills in as it passes center. Dates in Pass Green mono; bullets use hairline-colored markers.

## Do's and Don'ts

### Do:
- **Do** keep Pass Green as the only hue and use it for evidence, sequence and action.
- **Do** divide lists with 1px hairlines and alternate section bands with Ledger Tint.
- **Do** set every impact number in heavy tabular figures.
- **Do** use IBM Plex Mono for labels, dates, stage numbers and logs only.
- **Do** define every new color for both light and dark themes, including the `[data-theme]` overrides.
- **Do** keep interactive targets at 44px minimum and honor `prefers-reduced-motion`.
- **Do** keep Contact reachable in one tap at every width.

### Don't:
- **Don't** introduce a second accent color, gradients, or Verisk brand colors/logos.
- **Don't** box content that reads as a list; cards are for published tools only.
- **Don't** add shadows to resting surfaces beyond the pipeline panel and mobile menu.
- **Don't** set prose in mono or headlines in anything but Plex Sans.
- **Don't** add motion that doesn't confirm state or progress.
- **Don't** put eyebrow/kicker labels above headings.
