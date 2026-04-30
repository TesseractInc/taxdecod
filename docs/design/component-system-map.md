# TaxDecod Component System Map

## Purpose

This document defines the reusable component system for the TaxDecod redesign.

The goal is to avoid random page-by-page redesign and create a premium system where each component improves many pages at once.

---

## 1. Global foundation

Primary files:

- `app/globals.css`
- `app/layout.tsx`
- `components/ui/container.tsx`
- `components/ui/theme-provider.tsx`

Responsibilities:

- design tokens
- colours
- dark/light mode
- text hierarchy
- card surfaces
- buttons
- inputs
- focus states
- shadows
- motion variables
- base layout rules

---

## 2. Layout system

Primary files:

- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/page-links.ts`

Responsibilities:

- navigation hierarchy
- mobile menu
- tool access
- trust links
- footer structure
- legal links
- product positioning

Rules:

- header should feel premium and simple
- footer should feel trustworthy and structured
- navigation should not expose chaotic routes
- mobile nav must prioritise tools and trust pages

---

## 3. Page hero system

Primary files:

- `components/ui/page-hero.tsx`
- `components/seo/seo-page-hero.tsx`

Responsibilities:

- page positioning
- user promise
- key action
- trust context
- visual hierarchy

Rules:

- hero should never become vague marketing
- hero should quickly explain what the user can do
- tool pages should put the action close to the top

---

## 4. Calculator/tool system

Primary files:

- `components/calculator/calculator-card.tsx`
- `components/tools/*`
- `components/results/*`

Responsibilities:

- user inputs
- salary/tax settings
- calculation result
- breakdown cards
- result explanation
- next-step action

Rules:

- inputs must be clear and calm
- result must be visually dominant
- explanation must be beginner-friendly
- assumptions must be visible
- no unnecessary account/login pressure

---

## 5. Trust system

Primary files:

- `components/shared/tax-year-trust-bar.tsx`
- `components/shared/hmrc-reference-panel.tsx`
- `components/seo/seo-reality-card.tsx`
- `components/shared/email-capture-panel.tsx`

Responsibilities:

- tax-year context
- assumptions
- disclaimer
- HMRC/reference links
- methodology links
- credibility signals

Rules:

- no fake authority
- no fake guarantees
- no pretending to be HMRC
- use clarity as the trust mechanism

---

## 6. SEO/internal-linking system

Primary files:

- `components/seo/contextual-link-engine.ts`
- `components/seo/cross-link-rail.tsx`
- `components/seo/seo-cta-cluster.tsx`
- `components/seo/sitemap-helpers.ts`
- `components/seo/programmatic-expansion-config.ts`

Responsibilities:

- controlled internal links
- route quality
- sitemap quality
- programmatic expansion
- topical clusters

Rules:

- not every live page belongs in the sitemap
- weak pages can stay live but be noindexed
- programmatic routes must be approved
- internal links should guide user intent, not spam pages

---

## 7. Editorial system

Primary files:

- `app/guides/*`
- `app/guides/[slug]/page.tsx`
- guide data/config files

Responsibilities:

- expert explanations
- salary/tax guides
- FAQs
- assumptions
- related tools

Rules:

- expert editorial tone
- practical examples
- no thin AI filler
- connect guide pages to tools

---

## 8. Programmatic templates

Primary route templates:

- `app/[salary]/page.tsx`
- `app/compare/[comparison]/page.tsx`
- `app/monthly-take-home/[amount]/page.tsx`
- `app/good-salary/[salary]/[region]/page.tsx`
- `app/benchmarks/[role]/[region]/page.tsx`

Responsibilities:

- scalable SEO pages
- unique intent
- controlled routes
- strong internal links
- reusable design system

Rules:

- dynamic routes must stay locked
- no uncontrolled route generation
- templates must be strong before expansion
- sitemap expansion should happen slowly

---

## 9. Component upgrade order

Recommended order:

1. `app/globals.css`
2. `components/layout/site-header.tsx`
3. `components/layout/site-footer.tsx`
4. `components/ui/page-hero.tsx`
5. `components/shared/tax-year-trust-bar.tsx`
6. `components/calculator/calculator-card.tsx`
7. `components/results/*`
8. `components/seo/*`
9. homepage
10. core tool pages
11. programmatic templates

---

## 10. Component quality checklist

A redesigned component must be:

- reusable
- responsive
- accessible
- dark-mode compatible
- visually consistent
- not over-animated
- useful to the user
- not tied to only one page unless necessary