---
name: Valentin Lutchanka Portfolio
description: Agentic QA leadership presented as a Gilbreth time-and-motion study.
colors:
  signal: "#c42b21"
  signal-hover: "#a11f17"
  on-signal: "#ffffff"
  ochre: "#855508"
  blue: "#285381"
  ground: "#e6ede3"
  sheet: "#eef3ec"
  plate: "#dae3d6"
  grid: "rgb(40 82 52 / 0.085)"
  ink: "#17201a"
  ink-2: "#435047"
  ink-3: "#56635a"
  rule: "#b5c4b5"
  rule-strong: "#17201a"
  trail: "#17201a"
  trail-ghost: "rgb(23 32 26 / 0.42)"
  signal-dark: "#ff5b4d"
  signal-hover-dark: "#ff8277"
  on-signal-dark: "#1e0402"
  ochre-dark: "#e3a646"
  blue-dark: "#8ab7e6"
  ground-dark: "#0c0f0d"
  sheet-dark: "#111612"
  plate-dark: "#070908"
  grid-dark: "rgb(220 240 225 / 0.045)"
  ink-dark: "#edf2ea"
  ink-2-dark: "#aab6ac"
  ink-3-dark: "#8f9c91"
  rule-dark: "#2a332c"
  rule-strong-dark: "#8f9c91"
  trail-dark: "#fffaf0"
  trail-ghost-dark: "rgb(255 250 240 / 0.34)"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 9.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 72"
  figure:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 66"
  headline:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 78"
  thesis:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 90"
  title:
    fontFamily: "Archivo, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 85"
  body:
    fontFamily: "Public Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  key: "3px"
  sm: "4px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "48px"
  section: "80px"
  section-wide: "120px"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-signal}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  button-signal-hover:
    backgroundColor: "{colors.signal-hover}"
  button-ghost:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  button-ghost-hover:
    textColor: "{colors.signal}"
  button-sm:
    padding: "0 16px"
    height: "40px"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  nav-link-active:
    textColor: "{colors.ink}"
  key-cap:
    textColor: "{colors.ink-3}"
    rounded: "{rounded.key}"
    padding: "0 4px"
    height: "1.25rem"
  therblig-physical:
    textColor: "{colors.ochre}"
    rounded: "{rounded.full}"
    size: "52px"
  therblig-mental:
    textColor: "{colors.blue}"
    rounded: "{rounded.full}"
    size: "52px"
  plate-number:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ochre}"
    padding: "2px 8px"
  study-plate-frame:
    backgroundColor: "{colors.sheet}"
    padding: "8px"
  cert-thumb:
    backgroundColor: "{colors.sheet}"
    padding: "4px"
    width: "88px"
    height: "66px"
---

# Design System: Valentin Lutchanka Portfolio

## Overview

**Creative North Star: "The Time & Motion Study"**

The site is the record of a Gilbreth-style time study: the manual motion observed, the agents introduced, the straightened path photographed. Two materials carry it. In light, an observation sheet: engineering-pad green paper printed with a 24px grid, graphite ink, ruled rows. In dark, a photographic plate: near-black, with the motion path burned in as a white-hot light trail. The contact section and footer are always the plate, in both themes; the study ends in the darkroom.

Every figure is measured and every measurement carries its provenance caption beside it. Numbers are set in condensed Archivo with tabular figures, the way they would be written on a stopwatch reading or a study sheet. Colour is functional, as on a real study: stopwatch red marks action and timing, ochre and blue code the therbligs. Ornament is limited to things the instruments themselves produce: dials, ticks, traces, split marks, plate numbers.

Density is moderate. Content sits in ruled rows on a 1200px sheet rather than in cards; structure comes from 1px rules and 2px strong rules, not from boxes and shadows.

**Key Characteristics:**
- Two materials: green grid observation sheet (light) and black photographic plate (dark), with contact and footer forced to the plate.
- Stopwatch red is the only action colour.
- Ochre and blue code therbligs; blue means a mental motion.
- Light trail plus dotted ghost trail as the recurring motion signature.
- Condensed Archivo figures (66 to 90% width) with tabular numerals; Public Sans for reading.
- Ruled rows, not cards; 4px corners.
- Motion tells the study (tangled path pulls taut) and always resolves to a static finished state.

## Colors

A muted green-graphite neutral field with one red instrument colour and two coding hues.

### Primary
- **Stopwatch Red** (`signal`; dark `signal-dark`): primary buttons, link underlines and link hover, focus rings, text selection, caret, the dial's sweep hand, the header watch hand and pin, the active nav key, the study-plate edge trace, the certificate disclosure chevron. Hover deepens in light (`signal-hover`) and brightens in dark (`signal-hover-dark`). Text on red uses `on-signal` / `on-signal-dark`.

### Secondary
- **Therblig Ochre** (`ochre`; dark `ochre-dark`): physical-motion therblig marks (Assemble, Select, Transport loaded), observation split marks, career lap dates, study-plate numbers, the "+" on the stopwatch reading.

### Tertiary
- **Therblig Blue** (`blue`; dark `blue-dark`): mental-motion therblig marks only (Plan, Inspect) and the DMAIC station dots.

### Neutral
- **Grid Ground** (`ground` / `ground-dark`): the page and the sheet sections; carries the grid in `grid` / `grid-dark`.
- **Sheet** (`sheet` / `sheet-dark`): the mat inside portraits, plate frames, certificate thumbnails and the dial case.
- **Plate** (`plate` / `plate-dark`): tonal band sections (method, contact, footer).
- **Graphite Ink** (`ink`, `ink-2`, `ink-3` and dark pairs): headings and strong text, body and secondary copy, captions and provenance.
- **Rule** (`rule` / `rule-dark`): 1px row dividers and borders. **Strong Rule** (`rule-strong`): 2px tops of ruled lists and frame borders.
- **Light Trail** (`trail`, `trail-ghost` and dark pairs): the drawn motion path and its dotted ghost. Graphite on the sheet, white-hot on the plate. In dark the trail also carries a glow (sidecar `trail-glow`); in light the glow is `none`.

### Named Rules
**The Stopwatch Rule.** Red belongs to actions and timing instruments only: buttons, links, focus, the hands, the active key, the plate trace. Never use it for decoration, headings or data coding.

**The Therblig Code Rule.** Ochre codes physical motion, blue codes mental motion (Plan, Inspect). Do not swap them or introduce a third coding hue.

**The Darkroom Rule.** Contact and footer are the plate in both themes, achieved by re-scoping the dark token set (force-dark), never by hard-coded colours.

## Typography

**Display Font:** Archivo variable (wdth 62 to 125, wght 100 to 900), with Arial Narrow, system-ui fallback
**Body Font:** Public Sans (400, 500, 600, 700), with system-ui fallback

**Character:** Archivo is used compressed, 66 to 90% width, like stencilled figures on a study sheet; Public Sans is plain and legible beneath it. Width tracks role: the narrower the face, the bigger the figure.

### Hierarchy
- **Display** (800, clamp 3.5 to 6rem, 0.9, 72% width): the name in the hero, masked line by line.
- **Figure** (800, clamp 3.25 to 5.5rem, 0.9, 66% width, tabular): observation figures; the stopwatch reading uses the same voice at 68% width; DMAIC letters at 70%.
- **Headline** (750, clamp 2.25 to 4rem, 0.98, 78% width): section h2.
- **Thesis** (600, clamp 1.375 to 1.875rem, 1.2, 90% width): the hero thesis line.
- **Title** (700, 1.375rem, 1.25, 82 to 85% width): station, principle, lap and plate h3.
- **Body** (400, 1.0625rem, 1.6): reading copy, capped at 60 to 68ch.
- **Label** (600, 0.875rem): units, plate locations, legends, provenance captions (provenance at 400 in `ink-3`).

### Named Rules
**The Tabular Figure Rule.** Every measured number (figures, dates, plate numbers, key caps, stack proofs) uses tabular numerals.

**The Heading Stands Alone Rule.** No eyebrow or kicker above any heading; the h2 is the first line of a section.

## Layout

A centred 1200px container with 16px gutters (32px from 768px). Sections are separated by a 1px rule and padded 80px (120px from 1024px). Section heads cap at 760px with a 48px gap to content. Lists of evidence (observations, stations, certs, contact details) open with a 2px strong rule and divide with 1px rules; rows pad 28px (16px for compact rows).

Rows are grids that gain columns with width: observations go figure / claim / provenance (15rem then 17rem / 1fr / 16rem at 1100px); stations go mark / title / copy / trace (72px / 19rem / 1fr / 220px at 1024px); laps go 220px meta / body at 768px. Plates and certs go 1, 2, 3 columns at 640px and 1024px. The hero is copy plus a 300 to 380px stopwatch at 1024px and reflows to a single ordered column below it, with the watch shrinking to a 128px dial beside its caption. The study band breaks out of the container to full bleed. The header is a 64px sticky bar; nav collapses below 1100px. A scroll-drawn page trail runs down the right margin from 1400px.

## Elevation & Depth

Flat. Depth comes from material, not lift: the grid sheet, tonal plate bands, 1px and 2px rules, and the sheet mat inside frames. The only shadow is one ambient drop used for things that genuinely float (the mobile nav panel and the certificate image in its dialog). The header uses a translucent ground with blur. In dark, the light trail carries a soft glow, which is the one luminous effect.

### Shadow Vocabulary
- **Float** (sidecar `shadow-float`, light and dark values): mobile nav panel and certificate dialog image only.
- **Trail Glow** (sidecar `trail-glow`): dark theme light trail only.

### Named Rules
**The No-Card Rule.** Content sits in ruled rows on the sheet. Do not wrap rows in shadowed or filled cards.

## Shapes

Corners are a near-square 4px on buttons, nav links and the skip link; 3px on key caps. Frames (portrait, study plates, cert thumbnails) are square with a 1px border and an inner sheet mat. Circles are reserved for instruments: the dial, therblig marks (52px, 1.5px ring), DMAIC and lap station dots (16px, 2px ring). Lines are round-capped. Key caps have a 2px bottom border, the physical keycap edge.

## Components

### Buttons
Instrument-plain and firm.
- **Shape:** 4px corners, 48px tall (40px small), 0 22px padding, Public Sans 600.
- **Primary (Signal):** stopwatch red fill with `on-signal` text. One per context: Email in the hero.
- **Ghost:** translucent ground fill, strong-rule border, ink text; LinkedIn, GitHub, Copy address.
- **Hover / Focus:** signal deepens; ghost border and text turn red. Press scales to 0.97. Focus is a 2px red outline offset 3px.

### Navigation
Sticky 64px bar with the brand stopwatch (26px; its red hand sweeps once over the full page scroll). Links are Public Sans 500 in `ink-2`, each followed by its number key cap (1 to 6). Hover and current go to `ink`; the current link's key cap turns red. Below 1100px the nav drops as a floating panel from a menu button. Key caps hide on touch devices.

### Stopwatch Dial (signature)
SVG dial: ink case on sheet, rule face, 60 ticks with major ticks every five, red hand and pin. The reading (3,500+ hours) is set in Figure type with an ochre "+", and a provenance caption sits under the dial.

### Study Band (signature)
Full-bleed motion study behind the hero: a dotted ghost of the tangled manual path and a solid taut trail ending in a dot, with a legend (Manual baseline / Schematic, not to scale / With agents).

### Observation Rows
Ruled rows with a huge figure, the claim, and a provenance caption in `ink-3` (right-aligned at wide widths). Each row starts with a 56px ochre split mark on the rule above.

### Stations
STLC rows: a therblig mark (circle with abbreviation plus name; ochre physical, blue mental), title, copy, and a small illustrative trace (ghost plus solid line plus end dot). Traces are illustrative, not data.

### DMAIC Stations
Five fixed stations on a horizontal trail line (vertical below 600px), each a blue-filled 16px dot over a condensed letter, its name and a one-line note on what that step means for an agent rollout.

### Career Laps
A vertical 2px rail with a trail-coloured fill; each lap is a 16px dot that fills with the trail colour when reached. Dates in ochre condensed tabular figures; bullets are 10px graphite dashes.

### Study Plates
Square-cornered 16:10 frames with an 8px sheet mat and strong-rule border. A plate number ("Pl. 01") is stamped across the bottom edge in ochre on ground. Hover or focus traces the frame's four edges in red and slowly scrolls the screenshot top to bottom; the location label turns red and its arrow nudges.

### Certification Rows
Ruled rows: an 88 by 66px framed thumbnail (border turns red on hover, opens a dialog) beside a Public Sans 600 title and `ink-3` issuer. The full list sits in a disclosure with a red chevron.

### Contact Plate
Always dark. Headline, a very large condensed email link with a thick red underline, a ghost Copy address button that swaps to a check and announces via a live region, and a ruled detail list.

### Motion Grammar

GSAP 3.13 with ScrollTrigger, from cdnjs, on native scroll. The markup already holds the finished state; motion only stages it.
- **Load:** name lines rise from masks, the stopwatch hand runs two turns while the tangled path draws, then the path morphs taut and the end dot pops.
- **Scroll:** header watch hand sweeps 0 to 360 degrees across the page; observation split marks run and figures rise from their lines; station traces draw; the DMAIC line fills; the lap rail fills and laps click as they are reached; the margin page trail draws with scroll and curls at each section.
- **Theme:** a shutter wipe, the new theme opening as a circle from the toggle (650ms, cubic-bezier(0.7, 0, 0.2, 1)) via view transitions.
- **Keys:** 1 to 6 jump between sections.
- **Safety:** if GSAP has not taken over within 2.5s the hero reveals anyway. Reduced motion or missing GSAP shows the static finished state: taut trail, full rails, no transitions.

## Do's and Don'ts

### Do:
- **Do** reserve `signal` for actions, links, focus and the timing instruments (hands, active key, plate edge trace).
- **Do** code physical therbligs in ochre and mental ones (Plan, Inspect) in blue.
- **Do** set every measured number in condensed Archivo with tabular numerals, and pair it with a provenance caption.
- **Do** build sections as ruled rows: 2px strong rule on top, 1px rules between.
- **Do** keep contact and footer on the dark plate via the force-dark token scope.
- **Do** make every animation resolve to a static, complete state under reduced motion or without GSAP.
- **Do** keep corners at 4px and circles for instruments only.

### Don't:
- **Don't** place eyebrows or kickers above headings.
- **Don't** use red for decoration, headings or data coding.
- **Don't** wrap content in shadowed cards; the float shadow is for floating panels only.
- **Don't** hard-code colours outside the token sets; the dark plate must come from the token scope.
- **Don't** use glyph or emoji icons; icons are inline stroked SVG (18px, 2px stroke, round caps).
- **Don't** present illustrative traces as measured data; label schematics as schematic.
