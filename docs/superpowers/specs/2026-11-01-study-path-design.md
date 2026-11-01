# Motion Study Path Design

## Intent

Make the manual baseline in the hero motion study feel less tangled at a glance, while keeping it visibly more irregular than the agent path.

## Goals and boundaries

- Replace the tight loops and abrupt turns with a few broad, smooth detours.
- Preserve the dotted baseline, draw-on reveal, morph into the agent path, responsive SVG, and accessible figure label.
- Do not redesign the study band or change the agent path.
- Avoid making the manual path nearly straight or introducing geometry that breaks the existing animation.

## Constraints

The SVG stores the manual geometry twice: once in the reveal mask and once as the dotted baseline. The hero animation also parses the baseline as an `M` followed by `L`-separated coordinate pairs to morph it into the agent path. Keep both path definitions synchronized and preserve that polyline format and point pairing.

## Approaches

- **A — Soft detours (selected):** use broad, smooth bends with fewer abrupt direction changes. This reduces the tangled appearance while retaining a clear manual-versus-agent contrast.
- **B — Gentle drift:** keep the manual trace nearly direct with only a mild wobble. This is calmer, but risks making the two paths look too similar.

Option A was selected because it removes the sharp loops without flattening the comparison.

## Implementation calls

Keep the existing SVG and animation; replace only the manual path geometry in both matching SVG path elements. Use evenly sampled polyline points so the current morph logic continues to work without new dependencies or animation changes.
