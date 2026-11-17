# Task: layout

Read `.site/design.md`, `.site/meta.json`, `src/styles/tokens.css`, `src/app/layout.tsx`, `src/app/globals.css`.

Do:
- In `src/app/layout.tsx`, load the design's fonts through `next/font/google`: Playfair Display with `variable: "--font-playfair-display"` and Plus Jakarta Sans with `variable: "--font-plus-jakarta-sans"`; put both variable classNames on `<html>`.
- Import `src/styles/tokens.css` after `@import "tailwindcss"` in `src/app/globals.css` (or import it in layout.tsx if more fitting).
- Set `<html lang>` and the metadata title and description from `.site/meta.json`.
- No hard-coded colors.
