# CURB

The marketplace for residential driveway parking. Homeowners near stadiums and venues rent out empty driveway space. Drivers get a guaranteed spot.

**[Live site →](https://curb-landing.vercel.app)**

## Why

Before writing any code I ran a 69-response customer survey in San Luis Obispo:

- **88%** already pay for parking
- **57%** have an empty driveway they could rent out
- **83%** would use curbside parking vs. **16%** in-garage, so I cut the in-garage option and focused the MVP on what cleared

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** primitives
- **Framer Motion** for scroll animations
- Deployed on **Vercel**

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  api/signup/route.ts   # captures driver + host signups
  layout.tsx
  page.tsx
components/
  sections/             # Hero, Problem, HowItWorks, Hosts, FAQ, Signup, Footer, Nav
  ui/                   # Button, Card, Input, Accordion
lib/
  utils.ts              # cn() helper
```

## Status

Pre-launch in San Luis Obispo, collecting driver and host signups on the waitlist.

Built by [Jack Gross](https://jackgross.vercel.app).
