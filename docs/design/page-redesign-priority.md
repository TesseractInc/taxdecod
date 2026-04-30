# TaxDecod Page Redesign Priority

## Purpose

This document defines the order of redesign so the project improves strategically instead of randomly.

---

## Phase 1 — Foundation

Priority:

1. `app/globals.css`
2. `components/layout/site-header.tsx`
3. `components/layout/site-footer.tsx`
4. `components/layout/page-links.ts`

Why:

- affects the entire site
- creates visual consistency
- improves trust immediately
- reduces generic/basic feel

---

## Phase 2 — Homepage

Primary file:

- `components/home/home-page-client.tsx`

Goal:

Turn the homepage into a premium salary intelligence product entry point.

Homepage should communicate:

- what TaxDecod does
- why it is different
- main calculator access
- core tools
- trust and methodology
- salary decision journey

Avoid:

- messy link hub
- too many equal CTAs
- generic SaaS hero
- exaggerated claims

---

## Phase 3 — Main calculator

Primary files:

- `app/calculator/page.tsx`
- `components/calculator/calculator-card.tsx`
- `components/results/*`

Goal:

Make the main calculator the strongest product experience on the site.

It should feel:

- guided
- responsive
- visually intelligent
- trustworthy
- easy for beginners
- strong enough to be the main business page

---

## Phase 4 — Core tools

Priority tool pages:

1. `/compare-salary`
2. `/reverse-tax`
3. `/payslip-checker`
4. `/student-loan-calculator`
5. `/tax-code-decoder`
6. `/tax-refund-calculator`
7. `/bonus-tax-calculator`
8. `/overtime-calculator`

Goal:

Each tool page should feel like part of one premium platform, not separate random tools.

---

## Phase 5 — Programmatic templates

Priority templates:

1. `app/[salary]/page.tsx`
2. `app/compare/[comparison]/page.tsx`
3. `app/monthly-take-home/[amount]/page.tsx`
4. `app/good-salary/[salary]/[region]/page.tsx`
5. `app/benchmarks/[role]/[region]/page.tsx`
6. `app/guides/[slug]/page.tsx`

Goal:

Make templates strong enough before expanding to hundreds of pages.

Rules:

- route must be controlled
- copy must be useful
- page must have clear intent
- internal links must make sense
- no duplicate thin paragraphs

---

## Phase 6 — Editorial quality

Priority guide upgrades:

1. How income tax works UK
2. Net vs gross salary explained
3. How to read a payslip UK
4. Student loan and take-home pay
5. Is 40k/50k/60k a good salary
6. Salary increase worth-it guide

Goal:

Make editorial pages expert-level and trustworthy.

---

## Phase 7 — Secondary tools

Pages currently kept live/noindexed until upgraded:

- holiday pay calculator
- maternity pay calculator
- paternity pay calculator
- salary sacrifice calculator
- leave pay pages
- payslip explained
- leaderboard
- reality check
- services

Goal:

Upgrade later only when each page has enough depth and trust.

---

## Final launch rule

Do not merge redesign to `main` until:

- build passes
- sitemap is controlled
- random routes 404 correctly
- mobile nav works
- dark/light mode works
- core tools work
- no secrets exposed
- no unfinished weak pages are indexable