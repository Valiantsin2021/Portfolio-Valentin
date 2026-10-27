---
name: Valentin Lutchanka, Portfolio
description: A QA leader's career drawn as one transit line; the visit rides it from 2018 to now.
colors:
  enamel-white: "#fbfaf7"
  platform-paper: "#f3f2ee"
  tile-grey: "#e6e4de"
  rule-grey: "#d2d0c8"
  signal-grey: "#8b8d91"
  muted-ink: "#5d6066"
  graphite: "#2a2c30"
  sign-ink: "#16181b"
  line-plum: "#6b2fa0"
  line-plum-ink: "#5a2589"
  on-line: "#ffffff"
  plum-wash: "#ece3f4"
  here-amber: "#f2a900"
  on-here: "#16181b"
  board-cell: "#2f3238"
  board-muted: "#b6b8bc"
  dark-ground: "#141518"
  dark-plate: "#1c1e22"
  dark-rule: "#34363c"
  dark-text: "#ecebe6"
  dark-text-muted: "#a8aaaf"
  dark-line-plum: "#a877d8"
  dark-line-plum-ink: "#c4a1e6"
  dark-plum-wash: "#2a2233"
  dark-board: "#0d0e10"
  dark-board-cell: "#2a2d32"
typography:
  display:
    fontFamily: "Overpass, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(3rem, 7.6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline-terminus:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline-plate:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.32
    letterSpacing: "-0.03em"
  claim:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 2.8vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  board-figure:
    fontFamily: "Overpass Mono, ui-monospace, Cascadia Code, Consolas, monospace"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  label-mono:
    fontFamily: "Overpass Mono, ui-monospace, Cascadia Code, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  plate: "0px"
  button: "2px"
  cell: "3px"
  roundel: "50%"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  band: "10px"
  rail-x: "28px"
  rail-md: "64px"
  rail-lg: "88px"
  header: "68px"
  max: "1240px"
  section: "80px"
  section-wide: "120px"
  section-tight: "64px"
  section-tight-wide: "96px"
components:
  button-primary:
    backgroundColor: "{colors.line-plum}"
    textColor: "{colors.on-line}"
    rounded: "{rounded.button}"
    padding: "0 24px"
    height: "52px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.platform-paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.button}"
    padding: "0 24px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.platform-paper}"
  nav-cta:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.platform-paper}"
    rounded: "{rounded.plate}"
    padding: "0 16px"
    height: "44px"
  nav-cta-hover:
    backgroundColor: "{colors.line-plum}"
  station-plate:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.platform-paper}"
    rounded: "{rounded.plate}"
    padding: "0.1em 0.32em 0.02em"
    typography: "{typography.headline-plate}"
  here-tag:
    backgroundColor: "{colors.here-amber}"
    textColor: "{colors.on-here}"
    rounded: "{rounded.plate}"
    padding: "2px 10px 0"
    typography: "{typography.label-mono}"
  board-cell:
    backgroundColor: "{colors.board-cell}"
    textColor: "{colors.platform-paper}"
    rounded: "{rounded.cell}"
    width: "0.78em"
    height: "1.18em"
    typography: "{typography.board-figure}"
  roundel:
    backgroundColor: "{colors.platform-paper}"
    rounded: "{rounded.roundel}"
    size: "48px"
  roundel-here:
    backgroundColor: "{colors.here-amber}"
    rounded: "{rounded.roundel}"
    size: "48px"
---

# Design System: Valentin Lutchanka, Portfolio

## Overview

**Creative North Star: "One Line, Ridden"**

The career is a single transit line and the page is a ride along it. The world is enamel signage: a warm off-white ground, near-black sign ink, and one plum line colour drawn as continuous bands. Amber appears only where the visitor is, or where the career is now. Type is Overpass, a Highway Gothic descendant, set heavy and tight like station signage; Overpass Mono speaks only for figures, dates and times, the way a timetable does.

Density alternates like a line does. Dense stations (the departure board of measured outcomes, the STLC stopping pattern, the career roles) are separated by quiet platforms on the enamel-white plate ground (leadership, stack, credentials). On wide screens a vertical route runs down a left rail through every section: dashed ahead, solid behind, with an amber rider at mid-viewport and a stop at each section head. On phones the rail is dropped and the hero strip map turns vertical, because the gutter would cost the reading measure.

The system is flat and drawn. Depth comes from ink rules, solid plates and colour fields, never from cards floating on shadows. The user ruled out flashy creative-agency effects and the dark neon "AI" look; the dark theme is the same signage at night, not a glow treatment.

**Key Characteristics:**
- One plum line colour, used as bands, rules and fills; amber reserved for "you are here".
- One numbered neutral ramp (n-0 to n-9) carries ground, plates, rules and text.
- Section titles are square ink station plates; positions on the line are round roundels.
- Overpass heavy for signage, Overpass Mono only for figures, dates and times.
- Flat surfaces, ink borders, colour-field sections (ink board, plum terminus).
- Motion is the line itself: drawn once, filled by scroll, digits rolled once.

## Colors

A warm enamel neutral ramp with one saturated plum line and a single amber signal.

### Primary
- **Line Plum** (line-plum): the line. Strip-map band, route band and fill, nav underline bar, principle top rules, STLC stopping-pattern track, passed stops, primary button fill, the contact terminus field. In dark theme it lifts to Dark Line Plum so the band holds on near-black.
- **Plum Ink** (line-plum-ink): plum as text. Links, STLC stage numbers, stack proof figures, icon hover. Darker than the band so it reads at body size.
- **Plum Wash** (plum-wash): the only plum tint; the roundel fill on hover in the strip map.

### Secondary
- **Here Amber** (here-amber): "you are here". The current strip-map roundel and its pulse ring, the current role's date tag and enlarged stop, the rider on the route, the contact terminus centre, and text selection. Always carries Sign Ink text (on-here), never white.

### Neutral
- **Enamel White** (enamel-white, n-0): plate ground for quiet platforms (leadership, stack, credentials), education panel, dialog.
- **Platform Paper** (platform-paper, n-1): page ground and the text colour on ink and board surfaces.
- **Tile Grey** (tile-grey, n-2): ramp step reserved; light surface separation.
- **Rule Grey** (rule-grey, n-3): hairline rules between rows, list items, cert thumbnails.
- **Signal Grey** (signal-grey, n-5) and **Graphite** (graphite, n-8): ramp steps held for intermediate ink; n-9 is the footer ground.
- **Muted Ink** (muted-ink, n-6): secondary text, leads, descriptions, timestamps.
- **Sign Ink** (sign-ink, n-9): primary text, header rule, station plates, ghost-button border, portrait frame, focus ring, roundel and stop borders.
- **Board** (sign-ink as board, board-cell, board-muted): the departure board section re-scopes ground to ink, cells to a lifted graphite, secondary text to a light grey.

Dark theme swaps ground, plate, rule, text, muted, line, line ink, wash, board and cell to the dark-* tokens; amber and the ramp's ink stay.

### Named Rules
**The One Line Rule.** Plum is the only hue that draws structure. No second accent, no gradient of plums beyond line, ink and wash.

**The You-Are-Here Rule.** Amber marks position only: the current station, the current role, the rider, the terminus. If an amber element does not answer "where am I on the line", it is not amber.

**The Numbered Ramp Rule.** Neutrals come from the n-ramp or a themed alias of it (bg, plate, rule, text, text-muted). New greys are added as ramp steps, not inline tints.

## Typography

**Display Font:** Overpass (with system-ui, -apple-system, Segoe UI, Roboto, sans-serif)
**Body Font:** Overpass
**Label/Mono Font:** Overpass Mono (with ui-monospace, Cascadia Code, Consolas, monospace)

**Character:** Road-sign geometry set heavy and tight for names and plates, relaxed at 1.6 for reading; the mono is a timetable voice that never carries prose.

### Hierarchy
- **Display** (900, clamp(3rem, 7.6vw, 6rem), 0.92, -0.04em): the name in the hero, signage scale, one per page.
- **Headline Terminus** (900, clamp(2.25rem, 4.6vw, 3.75rem), 1, -0.035em, max 14ch): the contact heading at the end of the line.
- **Headline Plate** (800, clamp(2rem, 3.6vw, 3rem), 1.32, -0.03em): section titles, always inside a station plate; the tall line-height gives wrapped plates breathing room.
- **Claim** (700, clamp(1.625rem, 2.8vw, 2.25rem), 1.15, max 26ch): the hero thesis line.
- **Title** (800, 1.125rem to 1.625rem, 1.1, -0.02em): h3 for roles (1.625rem), stages (1.375rem), principles, projects, education (1.25rem), stack rows and strip stations (1.125rem).
- **Lead** (400, 1.125rem, 1.6, 60 to 62ch): hero lead and section intros, in Muted Ink with Sign Ink strong.
- **Body** (400, 1.0625rem, 1.6, 64 to 70ch): role bullets, stage text, descriptions.
- **Board Figure** (Mono 600, clamp(2.25rem, 4vw, 3.25rem), 1, tabular figures): impact numbers on the departure board.
- **Label Mono** (Mono 500 to 600, 0.8125rem to 0.9375rem): station times, role dates, stage numbers, local time, stack proof figures.

### Named Rules
**The Timetable Rule.** Overpass Mono sets figures, dates and times only. Never a heading, never a sentence.

**The Heavy Sign Rule.** Headings run 800 to 900 with negative tracking; nothing between 400 body and 700 is used for headings.

## Layout

Single column of full-bleed sections inside a 1240px container with 20px gutters (32px from 768px). Sections pad 80px vertically (120px from 1024px); tight board-style sections pad 64px (96px). Section heads cap at 760px with 48px below.

The route rail: from 760px a left rail (64px, 88px from 1100px) is added to the container's left padding for every section inside the line and for contact. The route band (10px) sits 28px into the rail; stops, the rider and the terminus centre on that axis. Below 760px the rail is 0 and the route, stops and terminus are hidden; the hero strip map carries the line vertically instead.

Hero: name and role line full width, then copy plus portrait in two columns from 760px (portrait 200 to 260px, then 260 to 330px from 960px), then the strip map full width with five equal stations.

Inner patterns are ruled lists, not card grids: metrics (300px label column from 760px), stages (48px number, title, text from 900px), roles (240px meta column from 900px), stack rows (200px, 1.4fr, 1fr from 900px). Principles go 1, 2, 4 columns; projects 1, 2, 3; certs 1, 2, 3.

Header is sticky at 68px with a 3px ink rule; navigation collapses below 1024px into a full-width panel with stacked 52px rows and a header CTA.

## Elevation & Depth

Flat. Depth is conveyed by colour fields (ink departure board, plum contact terminus, enamel-white quiet platforms against platform paper), heavy ink rules (3px header and stack rules, 3px portrait and dialog frames, 2px project frames) and hairlines (1px rule grey). The only shadows are functional: a soft lift under the moving rider so it reads above the band, and a 1px highlight under each board cell's split line.

### Shadow Vocabulary
- **Rider lift** (`box-shadow: 0 2px 8px rgb(0 0 0 / 0.18)`): the amber rider only.
- **Flap split** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.06)`): under the 1px split line in each departure-board cell.

### Named Rules
**The Drawn Not Floated Rule.** Surfaces separate by rule, frame or colour field. Do not lift sections or rows on shadows.

## Shapes

Two shapes only: square and round. Square is information (station plates, nav CTA, here tags, portrait, project frames, edu panel, dialog: 0 radius; buttons soften to 2px; board cells to 3px for the flap). Round is position on the line (roundels, stops, rider, terminus, nav-active dot on mobile, bullet rings, drawn separator dots, brand mark). Roundels are thick ink rings on the ground colour; the ring weight scales with size (48px/9px, 40px/8px, 34px/7px, 22px/5px, 56px/11px for the terminus).

**The Square Information, Round Position Rule.** If it names something it is square; if it marks where something is on the line it is round.

## Components

### Buttons
Signage-solid and blunt.
- **Shape:** near-square (2px), 52px tall, 24px horizontal padding, 700 weight, 1rem.
- **Primary:** Line Plum fill with on-line text; hover inverts to Sign Ink fill with ground text.
- **Ghost:** 2px Sign Ink border, ink text; hover fills ink.
- **Active:** nudges down 1px.
- **On the terminus:** primary flips to on-line fill with plum text (hover to n-9 with white); ghost uses on-line border.

### Navigation
- **Desktop:** 600 weight 0.9375rem links, 44px targets. A 5px plum bar draws in from the left on hover and for the section in view, sitting on the header's ink rule. The final item is a square ink CTA that turns plum on hover.
- **Mobile (below 1024px):** panel below the header with its own 3px ink rule, 52px rows separated by hairlines, active state as a 12px plum dot at the right edge; the CTA moves into the header bar.
- **Brand:** name in 800 with a small plum-ringed roundel before it (hidden below 440px).

### Station Plate
Every section h2 is wrapped in an inline square ink plate (Sign Ink fill, ground text, padding 0.1em 0.32em 0.02em) with box-decoration-break clone so wrapped titles become stacked plates. The board and terminus sections re-scope ink so plates invert correctly.

### Hero Strip Map
A 10px plum band behind five roundels (48px, 9px ink ring on ground). Each station is a link: name (800, 1.125rem) and mono time. The current station's roundel fills amber with a 3px amber pulse ring, and its time becomes an amber here tag. Hover scales the roundel 1.12 and fills it plum wash. Below 760px the map turns vertical with 40px roundels.

### Route, Stops and Rider
A 10px band down the rail: dashed plum ahead (14px on, 12px off), solid plum fill behind, filled by scroll progress to mid-viewport. Each section head and role carries a 34px stop (7px ink ring); passed stops fill plum. The current role's stop is 46px and amber; minor roles get a 22px stop. The rider is a 26px amber disc with a 5px ink ring, sticky at 50vh.

### Departure Board
The impact section is an ink field. Rows are ruled with 1px lifted-graphite hairlines and carry a mono figure and a label. Each digit sits in its own flap cell (graphite fill, 3px radius, 0.78em by 1.18em, a 1px split line at mid-height); symbols sit uncelled.

### STLC Stopping Pattern
Ruled rows with a 4px plum track at the left and an 18px plum-ringed stop per stage; the track starts and ends at the first and last stops. Mono plum stage numbers.

### Here Tag
Amber block behind mono date text (Sign Ink, 600). Used on the current station time and the current role dates only.

### Separator Dot
Inline lists use a drawn 4px dot (radial gradient in currentColor at 70% opacity) instead of the font's middle dot, which sits off-centre in Overpass. It is non-atomic so it never begins a wrapped line.

### Contact Terminus
The line ends in a plum field: a 56px amber roundel with an 11px on-line ring, fed by a 10px on-line band from above, aligned to the route axis. Contact list rows are 52px with translucent hairlines; local time in mono.

### Focus
A 3px solid outline in the current text colour, offset 3px. It inherits ink, board text or on-line automatically per section.

## Do's and Don'ts

### Do:
- **Do** draw structure in Line Plum only, as bands of 10px (route, strip), 5px (nav bar, principle rules) or 4px (stopping-pattern track).
- **Do** wrap every section h2 in a square ink station plate.
- **Do** keep amber for position: the current station, current role, rider and terminus.
- **Do** set dates, times and figures in Overpass Mono with tabular figures on the board.
- **Do** separate content with ink rules, hairlines and colour fields; keep surfaces flat.
- **Do** alternate dense sections with quiet enamel-white platforms.
- **Do** keep the reduced-motion path: animations collapse to their end state, the reel and roundel transitions are removed, and the board renders its final figures from markup.
- **Do** run motion through the line: the hero band draws over 1.4s, stations light in order at 0.25s steps, the route fills with scroll, digits roll once when the board enters view, all on cubic-bezier(0.16, 1, 0.3, 1).

### Don't:
- **Don't** use amber for decoration, emphasis or status unrelated to "where am I".
- **Don't** add a second accent hue or plum tints beyond line, ink and wash.
- **Don't** set headings or prose in Overpass Mono.
- **Don't** lift sections or rows on drop shadows or build card grids with shadows.
- **Don't** use flashy creative-agency effects or a dark neon "AI" look; the dark theme is night signage, not glow.
- **Don't** introduce neutrals outside the numbered ramp and its themed aliases.
- **Don't** use the font's middle-dot glyph as a separator; use the drawn dot.
