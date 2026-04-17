# Theatre-inspired product design portfolio

## Goal

The **homepage is the Work experiences page**. There is a separate **Projects page** with 7 case study projects from your time at college, and an **About page** with 4 awards and a small credit section thanking mentors.

**Homepage (Work experiences)** – single-page experience with **two switchable views**: (1) **Theatre view** – marquee + grid of minimalist "posters" (work places/projects); (2) **Resume-style list view** – simple vertical list (title, year, optional short description on hover/expand). Users toggle between them; each work item links to a work-detail/case study page. **Projects page** (`/projects`) lists **7 case study projects** from college; each has its own case study at `/projects/[slug]`. **About page** (`/about`) includes **4 awards** and a **small credit section** to thank mentors. Built in this repo with Next.js and Tailwind, deployable on Vercel. Aesthetic: solid black, sharp and minimal, no rounded corners.

## Tech stack

- **Next.js 14+ (App Router)** – good fit for Vercel and future case study pages
- **React** + **Tailwind CSS** – matches v0 output and keeps styling flexible
- **TypeScript** – for props and content types
- Content: **JSON or a simple data file** for poster list (title, slug, optional image, company, year) so you can add 11+ items and edit without touching components

## Visual structure

- **Background**: Solid black – simple `bg-black` (or equivalent) on the root layout or main wrapper so the marquee and lit poster frames read clearly against it.
- **Marquee**: One strip above the posters with text like "NOW SHOWING" or "MY WORK" – bold sans-serif, optional soft glow/backlight (box-shadow or light border) to match the reference.
- **Poster frames**: Each "poster" is a **strict rectangle** with **no rounded corners** (`rounded-none`), thin luminous border, minimal inner content (company/project name, optional small graphic or icon).
- **Poster grid**: **Heavy grid** – strong, visible grid structure (clear gaps and/or dividers, 3–4 columns on desktop or horizontal scroll). Rectangular cells; no rounded corners. Semantic list + links to `/work/[slug]`.

**View toggle and list view**

- **Toggle**: At the top of the main content, a **rectangular toggle** with two sharp-edged options (e.g. "Theatre" / "List" or "Visual" / "Case"). Same data set; switching only changes the presentation. No rounded corners; selected state via border or background contrast.
- **Resume-style list**: When list view is selected, show a **vertical list** of experiences: one row per project with **title (left)** and **year (right)** in a clean sans-serif. Rows are rectangular; hover or expand reveals an optional **short description** (e.g. tagline or one-line summary). Each row links to `/work/[slug]`. Minimal styling: light grey text on black, subtle rectangular highlight on hover.

## Content: Work experiences (homepage)

The homepage displays these **11 work experiences** (each will have a minimalist movie poster in Theatre view and a row in List view). Use this list to populate `data/work.json`; slugs are suggested for routing. **Ramp appears as two posters**: Ramp Treasury and Ramp Spend Management.

| Slug            | Title                 | Date range     |
| --------------- | --------------------- | -------------- |
| `ramp-treasury` | Ramp Treasury         | 2025–Present |
| `ramp-spend`    | Ramp Spend Management | 2023–2025    |
| `kurtosis`      | Kurtosis              | Fall 2023      |
| `figma`         | Figma                 | Summer 2023    |
| `meta`          | Meta                  | Summer 2022    |
| `disney`        | Disney                | Summer 2021    |
| `colorstack`    | ColorStack            | 2020           |
| `wicc`          | WICC                  | 2020–2023      |
| `cuxd`          | CuXD                  | 2022–2023      |
| `appdev`        | AppDev                | 2020–2022      |
| `urmc`          | URMC                  | 2021–2023      |

- **List order**: Use the order above (most recent first) for both Theatre grid and List view unless you prefer a different sort.
- **Display text**: In list view, show title (e.g. "Ramp Treasury") and date range (e.g. "2025–Present"); case study pages can reuse the same fields and add `description` / `tagline` later.

## Content: Projects page (7 college case studies)

A dedicated **Projects** page lists **7 case study projects** from your time at college. Each project has its own case study (full story, images, links). Use this list to populate `data/projects.json`; add titles and slugs when ready.

- **Route**: `/projects` = list of 7 projects; `/projects/[slug]` = case study for that project.
- **Presentation**: Same sharp, minimal style (e.g. grid or list of rectangular cards); each card links to `/projects/[slug]`. You can reuse the theatre poster look here or a simpler grid.
- **Navigation**: Header (or footer) includes a link to **Projects** so users can go from Work experiences (homepage) to Projects.

## Content: About page (4 awards + credits)

The **About** page has two main sections:

1. **4 awards** – List or grid of 4 awards (name, issuer, year – add to table when ready). Same sharp, minimal style; rectangular blocks, no rounded corners.
2. **Credits** – A small section thanking mentors (names and/or short note). Keep it concise; can be a short paragraph or a simple list.

Use this to populate `data/about.json` or render static content in `app/about/page.tsx`; add award names and mentor credits when ready.

- **Route**: `/about`. **Navigation**: Add **About** to header or footer next to Work and Projects.

## Data model (for work experiences, projects, case studies, and about)

- **Work list** (`data/work.json`):
  - Fields: `slug`, `title`, `company` (optional), `year` or `dateRange`, optional `image`/`poster`, `tagline`, `description`, optional `whatShipped` (array of strings), optional `lessons` (array of strings), optional `cast` (array of `{ name, role? }`).
  - **Initial content**: The 11 work experiences in the Content table above (including two Ramp entries: Ramp Treasury, Ramp Spend Management).
- **Work case studies**: One page per work slug (`app/work/[slug]/page.tsx`) with **poster**, **what shipped**, **lessons**, **cast** (see Case study page structure below).
- **Projects list** (`data/projects.json`):
  - Fields: `slug`, `title`, optional `year` or `dateRange`, optional `tagline`, `description`, `image`/`poster`, optional `whatShipped`, optional `lessons`, optional `cast` (same shape as work).
  - **Initial content**: 7 college case study projects (titles/slugs to be added to the Projects Content table above).
- **Project case studies**: One page per project slug (`app/projects/[slug]/page.tsx`) with **poster**, **what shipped**, **lessons**, **cast** (same structure as work case studies).
- **About** (`data/about.json` or static): `awards` (array of 4: name, issuer, year), `credits` (mentor thank-you text or list). Optional; can be in-page content only.

## Case study page structure (work and project)

Each case study page (`/work/[slug]` and `/projects/[slug]`) uses the same layout pattern:

1. **Poster** – The minimalist "movie poster" for that work experience or project (same visual as the card on the homepage/projects list). Shown at the top of the case study so the piece has a clear hero.
2. **What shipped** – A list of outcomes/shipments (features, launches, deliverables). Simple list; sharp, minimal styling; rectangular blocks if needed.
3. **Lessons** – Key takeaways or learnings from the project/role (e.g. short bullet list). Placed **above** the cast section; same minimal style.
4. **Cast** (supporting cast) – A list of co-workers (name, optional role). Like a film cast list: who you worked with on this project or at this place. Small credit section; same minimal style.

- **Data**: Each work or project entry can include `poster` or `image`, `whatShipped` (array of strings), `lessons` (array of strings), and `cast` (array of `{ name, role? }`). All optional per entry.
- **Components**: Reuse poster at top; add `WhatShippedList`, `LessonsList` (or inline section), and `CastList` so work and project case studies share the same structure.

## Pages and routes

| Route              | Purpose                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | **Work experiences** (homepage): toggle (Theatre / List) + theatre view (marquee + 11 poster cards) or resume-style list (11 rows). Optional header/footer (name, "Product designer", contact). |
| `/work/[slug]`     | Work experience case study: **poster**, **what shipped**, **lessons**, **cast** (supporting cast / co-workers), plus title/description.                                                         |
| `/projects`        | **Projects** page: 7 case study projects from college; grid or list of cards linking to each project case study. Same sharp/minimal style.                                                      |
| `/projects/[slug]` | Project case study: **poster**, **what shipped**, **lessons**, **cast** (supporting cast / co-workers), plus narrative/media/icons/links.                                                            |
| `/about`           | **About** page: 4 awards (list or grid) and a small credit section thanking mentors. Same sharp/minimal style.                                                                                  |

## File structure (suggested)

- `app/layout.tsx` – root layout (font, meta, Tailwind; nav with links to Work, Projects, About)
- `app/page.tsx` – Work experiences: view toggle + theatre view or list view
- `app/work/[slug]/page.tsx` – work experience case study
- `app/projects/page.tsx` – Projects page: 7 college case studies (grid or list)
- `app/projects/[slug]/page.tsx` – project case study (one of 7)
- `app/about/page.tsx` – About page: 4 awards + credits (mentors)
- `components/` – `ViewToggle`, `Marquee`, `PosterCard`, `PosterGrid`, `ExperienceList`; optionally `ProjectCard`; for case studies: reuse poster at top, `WhatShippedList`, `LessonsList`, `CastList`
- `data/work.json` – 11 work experiences (two Ramp: Treasury, Spend Management)
- `data/projects.json` – 7 college case study projects
- `data/about.json` – optional: 4 awards + credits text (or static in About page)
- `public/` – favicon (no texture asset needed)
- Use your reference images in `assets/` only if you need them as assets; otherwise the UI is CSS + Tailwind.

## Implementation order

1. **Scaffold** – `npx create-next-app` with TypeScript, Tailwind, App Router (no src/ if you want to keep it simple).
2. **Data** – Add `data/work.json` with the **11 work experiences** from the Content table above (slug, title, dateRange/year), including **Ramp Treasury** and **Ramp Spend Management** as separate entries. Add optional `description` or `tagline` later for list view.
3. **View toggle** – Rectangular two-option toggle (e.g. "Theatre" / "List") at top of content; client state or URL query to persist choice. Sharp corners, no rounded buttons.
4. **Theatre shell** – Solid black background (layout or wrapper), marquee strip, and grid container. Shown when Theatre is selected.
5. **Poster component** – Rectangular card, no rounded corners (lit border, title, optional tagline) linking to `/work/[slug]`.
6. **Grid** – Heavy grid: map over data, render `PosterCard`s; responsive (3–4 columns or horizontal scroll for 11+). No rounded corners.
7. **List view** – `ExperienceList`: vertical list of rows (title left, year right); optional short description on hover or expand. Each row links to `/work/[slug]`. Rectangular rows, sharp highlights.
8. **Work detail page** – `app/work/[slug]/page.tsx`: poster at top, **what shipped**, **lessons** (above cast), **cast** (supporting cast / co-workers), title/description, back link. Load from work data (`poster`/image, `whatShipped`, `lessons`, `cast`).
9. **Projects page** – Add `data/projects.json` with 7 placeholder entries (slug, title). Build `app/projects/page.tsx`: grid or list of rectangular project cards linking to `/projects/[slug]`. Same sharp/minimal style; add nav link to Projects in layout.
10. **Project case study** – `app/projects/[slug]/page.tsx`: poster at top, **what shipped**, **lessons** (above cast), **cast** (supporting cast / co-workers), narrative/images, back link. Same structure as work case study; load from project data.
11. **About page** – Build `app/about/page.tsx`: 4 awards (list or grid, rectangular blocks) and a small credit section for mentors. Add `data/about.json` or static content; add nav link to About in layout.
12. **Polish** – Typography, spacing, "lit" effect for theatre. Enforce sharp/minimal: `rounded-none` for toggle, cards, list rows; confirm heavy grid and list are both clear.

## Visual style (sharp and minimalist)

- **No rounded corners** – All UI elements (poster cards, buttons, marquee, inputs) use sharp corners only (`rounded-none` in Tailwind). Rectangular only.
- **Rectangular buttons** – Any CTAs, nav links, and the **view toggle** (Theatre / List) are rectangular with sharp corners; no pills or rounded buttons.
- **Heavy grid** – The layout is dominated by a clear, prominent grid: visible gutters, strong alignment, and a clear sense of rows/columns. Grid lines or generous spacing make the structure obvious.
- **Minimalist** – Very sharp and minimal: no decorative curves, no soft edges, limited visual noise. Type and grid do the work.

## Design notes (minimalist + theatre)

- **Type**: One clear sans-serif (e.g. system font stack or a single Google font like DM Sans or similar) for both marquee and poster text.
- **Color**: Solid black background; dark frames, white/off-white for "lit" borders and text; one accent if you want (e.g. red for "NOW SHOWING" like AMC).
- **Posters**: No heavy imagery unless you add later; focus on type and one small icon or shape per card so it stays minimal like Todd's MARKETPLACE / AIPROXY style.
- **Assets**: Reuse the saved images in `assets/` for texture or inspiration; avoid loading them inline for every poster to keep the site light.

## Delivering for Vercel

- No special config needed beyond a standard Next.js app. Run `vercel` or connect the repo in Vercel dashboard; ensure `build` uses `next build`. Environment variables only if you add CMS or API later.

---

**Summary**: **Homepage** = Work experiences (11 entries: two Ramp posters—Ramp Treasury 2025–Present, Ramp Spend Management 2023–2025—plus Kurtosis, Figma, Meta, Disney, ColorStack, WICC, CuXD, AppDev, URMC) with Theatre/List toggle; links to `/work/[slug]`. **Projects** (`/projects`) = 7 college case studies; each at `/projects/[slug]`. **About** (`/about`) = 4 awards + small credit section thanking mentors. Data: `data/work.json`, `data/projects.json`, optional `data/about.json`. Nav: Work, Projects, About. Sharp, minimal style throughout – no rounded corners, rectangular toggle and buttons, heavy grid.
