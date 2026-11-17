# Design: retrospective-pontecorvo

Source of appearance: `.site/da.json` (repo gallery-leadouze-events). Structure and wording: `index.html` (mode restyle), unchanged.
Mood (profile has none, inferred): a quiet Paris gallery, warm off-white walls, near-black ink, a thin gold thread used sparingly; serif titles with an editorial feel.
Profile warnings: none.

## Palette

All values live in `src/styles/tokens.css` only.

| Token | Value | Use |
|---|---|---|
| `--color-gallery-50` | #faf9f8 | profile color, base of `paper` |
| `--color-gallery-100` | #f5f4f0 | profile color, base of `paper-alt` |
| `--color-gallery-200` | #e6e4df | profile color, base of `line-strong` |
| `--color-gallery-800` | #1c1a17 | profile color, base of `ink-raised` |
| `--color-gallery-900` | #0f0e0d | profile color, base of `ink` |
| `--color-accent-gold` | #b8860b | profile color, base of `accent-deco` |
| `--color-accent-gold-light` | #d4af37 | profile color, base of `accent-on-dark` |
| `--color-white` | #ffffff | from profile components (`luxury-card` background, `btn-perrotin` text) |
| `--color-paper` | gallery-50 | page background |
| `--color-paper-alt` | gallery-100 | alternate section background |
| `--color-surface` | white | cards, form fields |
| `--color-ink` | gallery-900 | text on light, dark section background, primary button |
| `--color-ink-raised` | gallery-800 | primary button hover, raised areas on dark |
| `--color-ink-soft` | mix gallery-900 60% / gallery-50 | secondary text, captions, metadata (about 5.9:1 on paper, 4.9:1 on gallery-200) |
| `--color-line` | gallery-900 at 8% | thin borders, from `luxury-card` border |
| `--color-line-strong` | gallery-200 | dividers, field borders, underline rest state |
| `--color-accent` | mix accent-gold 70% / gallery-900 | links, eyebrows, step numbers, focus ring on light (about 5.6:1 on paper) |
| `--color-accent-deco` | accent-gold | non-text only: gold rules, hover borders, large display numbers (3.1:1, large text only) |
| `--color-accent-on-dark` | accent-gold-light | eyebrows, links, focus ring on ink (about 9:1) |
| `--color-paper-soft` | mix gallery-50 70% / gallery-900 | secondary text on ink (about 8:1) |
| `--color-line-on-dark` | gallery-50 at 14% | thin borders on ink |

Derived or added (no invented hue, all mixes of profile colors):
- `accent`: raw `accent-gold` on paper is 3.1:1, below AA for body text, so text uses a darker mix of it with gallery-900.
- `ink-soft`, `paper-soft`, `line-on-dark`: missing roles, derived with `color-mix(in oklab, ...)`.
- `white`: not in the profile's `colors`, taken from its `components`.
- The old template palette (#9e3b1f rust accent, beige #f5f2ec, #5e5a54 grey) is replaced by the profile.

## Typography

- Display: Playfair Display via `next/font/google`, `variable: "--font-playfair-display"`, weights 400, 500, italic 400. Exposed as `--font-display`.
- Body: Plus Jakarta Sans via `next/font/google`, `variable: "--font-plus-jakarta-sans"`, weights 400, 500, 600. Exposed as `--font-body`.
- Both variables go on `<html>` from `app/layout.tsx`. No stylesheet link. Old template fonts (Cormorant Garamond, Manrope) are dropped.
- Scale (base 16 px, ratio 1.25): 12 (eyebrow, uppercase, tracking 0.18em), 14 (captions, meta), 16 (body), 20 (lead), 25 (h3), 31 (h2 mobile), 39 (h2), 49 (h1 mobile), 61 to 76 (hero name, `clamp(3rem, 7vw, 4.75rem)`).
- Titles: `.font-serif-title`, weight 400, line-height 1.1, tracking -0.01em. Italic Playfair for the surname "Pontecorvo" and for quotes in `regards`.
- Body line-height 1.65; running text max width 65ch.

## Spacing and layout

- Spacing scale (rem): 0.5, 1, 1.5, 2, 3, 4, 6, 8. Section padding 6 mobile, 8 desktop (block). Nothing outside this scale.
- Container: max 80rem, side padding 1.5 mobile, 3 desktop. 12-column grid on desktop, asymmetric splits (5/7, 4/8), generous left margin for text.
- Radius: 0 everywhere (profile components have none). No shadows; depth comes from `--color-line` borders and section background changes.
- Separators: `.rule` (1px line) between blocks, `.rule-gold` (3rem gold hairline) under some eyebrows.

## Components (from profile `components`)

- `.font-serif-title`: display family title style.
- `.luxury-card`: surface background, 1px `line` border, transition all 0.4s with the profile ease; hover: border `accent-deco`, lift 2 px (CSS only).
- `.btn-perrotin`: ink background, white text, uppercase 13 px, tracking 0.12em, min height 48 px, transition 0.3s ease; hover `ink-raised` with gold border. On dark: inverted to paper.
- `.btn-perrotin-outline`: transparent, ink text and 1px ink border; hover fills with ink. On dark: paper text and border.
- `.link-accent`, `.eyebrow`, `.on-dark` (dark section wrapper), `.rule`, `.rule-gold`.
- Focus: 2px outline `accent` (on dark `accent-on-dark`), offset 3px.

## Sections

- header: sticky bar, `paper` with bottom `line`; "Galerie Leadouze × InRealArt" left in display family, nav right in body 14 px, "Préparer ma visite" as `btn-perrotin`. Background `paper`. Motion: none.
- hero: 7/5 split, eyebrow and title "Alain / Pontecorvo" (surname italic) at left, Burning Man image at right with caption in `ink-soft`; dates, lieu, horaires as a 3-column definition row with `line` rules; buttons `btn-perrotin` + `btn-perrotin-outline`. Background `paper`. Motion: none (no delay on largest paint).
- l-exposition: title left 5 columns, two paragraphs right 7 columns; three figures in display family large, numbers in `accent-deco` (large text), labels `ink-soft`, separated by vertical `line`. Background `paper-alt`. Motion: split (title), reveal (paragraphs, figures staggered).
- galerie-photos: uneven image mosaic (one tall, two stacked), then the featured work as image 7 columns + spec list 5 columns in a `luxury-card`; then "Œuvres présentées" grid of `luxury-card` items, 3 columns desktop with the first item spanning 2. Background `paper`. Motion: split (headings), reveal (images, cards staggered 0.08 s).
- l-artiste: bio 7 columns, timeline 5 columns as a vertical list with years in display family and `line` dividers. Background `paper`. Motion: split (title), reveal (bio, timeline items).
- regards: two large italic display quotes, offset (second indented 2 columns), attribution in body with role in `paper-soft`. Background `ink` (`.on-dark`). Motion: reveal.
- collectionner: intro 5 columns, three steps as a numbered list (01 to 03 in display family, color `accent`), not icon cards, each with a `line` top border, vertically offset. Background `paper-alt`. Motion: split (title), reveal (steps staggered).
- visite: info list (dl) 5 columns, map placeholder 7 columns with `line` border. Background `paper`. Motion: reveal.
- contact: intro left, form right on `surface` with `line` border; fields with `line-strong` border, focus `accent`; submit `btn-perrotin`. Background `paper-alt`. Motion: none.
- faq: native details/summary list, question in display family 20 px, `line` dividers, answer `ink-soft`. Background `paper`. Motion: none.
- footer: single row, copyright and legal link in `paper-soft`, link hover `accent-on-dark`. Background `ink` (`.on-dark`). Motion: none.

## Motion

- Level: subtle (from brief `da.motion.level`): 16 px lift, base duration 0.8 s, stagger 0.06 s.
- Ease: profile `cubic-bezier(0.16, 1, 0.3, 1)`, GSAP `expo.out`, one ease site-wide. CSS hover transitions use the same curve via `--ease-gallery` (cards) or `ease` for buttons as in the profile.
- Entrances play once, opacity and y only, inside `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.

## Brief versus profile

- Motion level `subtle` comes from the brief; the profile sets no level.
- No other conflicts: the brief sets no colors or fonts.
