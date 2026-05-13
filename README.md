# CURB

CURB — the marketplace for residential driveway parking. Landing page built with Next.js + Tailwind. Currently in pre-launch in San Luis Obispo, CA.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** primitives
- **Framer Motion** for scroll animations
- **Inter** via `next/font`

## Project structure

```
app/
  api/signup/route.ts   # captures driver + host signups → data/signups.json
  layout.tsx
  page.tsx
components/
  sections/             # Hero, Problem, HowItWorks, Hosts, FAQ, Signup, Footer, Nav
  ui/                   # Button, Card, Input, Accordion
lib/
  utils.ts              # cn() helper
```

## Signups

The dev signup endpoint persists submissions to `data/signups.json` (gitignored). This will be swapped for Formspree before launch.

## Status

Beta launching in San Luis Obispo, Summer 2026.

Built by [Jack Gross](mailto:jgross18@calpoly.edu).
