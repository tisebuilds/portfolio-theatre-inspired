# Cursor Plan — Cornell AppDev Case Study Page
Route: `app/work/[workSlug]/case-study-coming-soon/page.tsx`
For workSlug: `appdev`

---

## Project context

**Repo:** `portfolio-theatre-inspired`  
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, ESLint (`eslint-config-next`), deploy target Vercel  
**Design language:** Black background, sharp rectangular UI (no rounded corners in the design system), theatre/cinema aesthetic, marquee-style copy, poster cards  
**Fonts:** Inter + Caveat (loaded in `app/layout.tsx`)  
**Data:** JSON files in `data/`, shared TypeScript types in `app/types.ts`  
**Component library:** `components/` (posters, marquee, lists, embeds, design-decisions drawer, etc.)

> ⚠️ Do not add `border-radius` to any page-level UI elements (cards, badges, tags, containers). The phone mockup is an exception — it depicts a real device.

---

## Prompt to paste into Cursor

> Build the page at `app/work/[workSlug]/case-study-coming-soon/page.tsx`.
>
> This is the Cornell AppDev case study page for `workSlug = "appdev"`. It lives under the existing `/work/[workSlug]/` route. Reuse the project's shared `NavBar` from `components/` if it exists; otherwise add no nav (the parent layout handles it).
>
> Mark the page `'use client'` — it needs a keyboard listener for the phone flip interaction.
>
> **Design rules (match the portfolio's theatre aesthetic):**
> - Black background: `bg-black`
> - Sharp corners on all page-level UI — no `rounded-*` classes on cards, tags, or metadata items (the phone mockup is the only exception since it depicts a real device)
> - Font: Inter for body, Caveat for any display/accent text if used
> - Text colors: `text-white`, `text-white/60`, `text-white/30` (no warm-grey palette)
>
> **Page layout (top to bottom):**
> 1. `<h1>` — "Cornell AppDev" in Inter, bold, large (`text-5xl` or `text-6xl`)
> 2. Metadata row — 3 items, no dividers between them, sharp labels:
>    - Role: "Designer"
>    - Platforms: "iOS · Android · Web"
>    - Tools: "Figma · Notion"
> 3. Showcase section — centered pink iPhone mockup (details below)
>
> **iPhone mockup — CSS only, pink, flips on Spacebar:**
>
> Structure: perspective wrapper → flipper div → front face + back face.
>
> ```tsx
> const [isFlipped, setIsFlipped] = useState(false);
> useEffect(() => {
>   const handler = (e: KeyboardEvent) => {
>     if (e.code === 'Space' && e.target === document.body) {
>       e.preventDefault();
>       setIsFlipped(p => !p);
>     }
>   };
>   window.addEventListener('keydown', handler);
>   return () => window.removeEventListener('keydown', handler);
> }, []);
> ```
>
> Flipper inline styles (Tailwind can't handle `preserve-3d` / `backface-visibility` natively):
> ```tsx
> style={{
>   transformStyle: 'preserve-3d',
>   transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
>   transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
> }}
> ```
>
> **Front face** (`backface-visibility: hidden`):
> - Size: `w-[260px] h-[530px]`
> - Body: `background: linear-gradient(158deg, #f5bfd8 0%, #eb9dc5 30%, #db7cb2 60%, #c960a0 100%)`
> - Border: `1.5px solid rgba(255,190,220,0.55)`
> - Shadow: `0 60px 120px rgba(200,80,140,0.35)`
> - Border-radius: `44px` (device shape — exception to no-rounded-corners rule)
> - Dynamic Island: absolute centered pill `w-[80px] h-[28px] bg-black rounded-[20px]` at `top-[14px]`, `z-index: 10`
> - Side button (right): `absolute right-[-3px] top-[120px] w-[3px] h-[60px]` pink-tinted
> - Volume buttons (left): two divs at `top-[100px]` and `top-[152px]`, same style
> - **Screen** — inset 6px so pink body shows as bezel:
>   `position: absolute; top: 6px; left: 6px; right: 6px; bottom: 6px; border-radius: 39px; overflow: hidden`
>   Background (pink wallpaper via layered radial gradients):
>   ```
>   radial-gradient(ellipse at 15% 20%, rgba(255,222,238,0.6) 0%, transparent 42%),
>   radial-gradient(ellipse at 85% 60%, rgba(205,138,188,0.45) 0%, transparent 42%),
>   radial-gradient(ellipse at 50% 100%, rgba(172,90,150,0.4) 0%, transparent 50%),
>   linear-gradient(158deg, #f5bfd8 0%, #eb9dc5 30%, #db7cb2 60%, #c960a0 100%)
>   ```
>   Contents (top to bottom):
>   - **Status bar** (`flex justify-between items-center px-[18px] pt-[14px]`): time "9:41" left (`text-[15px] font-semibold text-white`), WiFi + battery SVG icons right
>   - **App icon grid** (`grid grid-cols-2 gap-[18px] px-7 pt-3`): two icon links
>
> **Back face** (`transform: rotateY(180deg)`, `backface-visibility: hidden`):
> - Same pink gradient + border + border-radius as front
> - Camera bump island: `absolute top-[28px] left-[24px] w-[110px] h-[110px] rounded-[28px]` in darker pink gradient
>   - Inside: 2 circular lens divs (44px and 38px) with dark radial gradient + glare via `::after`
>   - Flash dot: `absolute bottom-[18px] right-[18px] w-[10px] h-[10px] rounded-full` gold gradient
> - Apple logo SVG centered, `opacity: 0.35`
> - Side button div same as front
>
> Below the phone: `<p className="text-[12px] text-white/30 tracking-widest mt-4 text-center">Press <kbd>Space</kbd> to flip</p>`
>
> **App icon links** (on the phone home screen only):
> 1. **Volume** icon → Google Play: `https://play.google.com/store/apps/details?id=com.cornellappdev.android.volume&pli=1`
> 2. **CourseGrab** icon → App Store: `https://apps.apple.com/us/app/coursegrab/id1510823691`
>
> Both open in a new tab (`target="_blank" rel="noopener noreferrer"`).  
> Layout: phone is centered on the page (`mx-auto`).

---

## Step-by-step implementation

### Step 1 — Read before writing

Before creating the file, read these to match existing patterns:
```
app/work/[workSlug]/page.tsx          ← sibling route — match its header/layout structure
app/types.ts                          ← check if WorkExperience or ShippedCaseStudy has appdev data
data/work.json                        ← confirm workSlug is "appdev"
components/NavBar.tsx (or similar)    ← reuse if it exists
app/layout.tsx                        ← confirm fonts + root bg
```

### Step 2 — Create the file

```
app/work/[workSlug]/case-study-coming-soon/page.tsx
```

`'use client'` at line 1 — required for the spacebar listener.

> **Metadata conflict:** `export const metadata` cannot be used in a `'use client'` file.  
> Option A: wrap this in a server component that renders a `<CornellAppDevClient />` client component.  
> Option B: add metadata to the parent `app/work/[workSlug]/layout.tsx` if one exists.  
> Option C: skip static metadata and use `<title>` in `<head>` via `next/head` (less preferred in App Router).

### Step 3 — App icon link data (used only in phone screen)

```ts
const apps = [
  {
    name: 'Volume',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.cornellappdev.android.volume&pli=1',
    iconFrom: '#ff4d3d',
    iconTo: '#c0180a',
  },
  {
    name: 'CourseGrab',
    storeUrl: 'https://apps.apple.com/us/app/coursegrab/id1510823691',
    iconFrom: '#6b7fff',
    iconTo: '#3a52e8',
  },
] as const;
```

### Step 4 — Component breakdown (all in one file unless extraction is cleaner)

| Component | Responsibility |
|-----------|---------------|
| `AppDevPage` | Root, holds `isFlipped` state + keyboard `useEffect` |
| `PhoneMockup` | Perspective wrapper + flipper, receives `isFlipped` prop |
| `PhoneFront` | Pink body, screen, status bar, app icon grid |
| `PhoneBack` | Pink body, camera bump, Apple logo |
| `MetaItem` | Label + value pair for the metadata row |

### Step 5 — Key inline styles (Tailwind gaps)

These must be inline `style={{}}` props — Tailwind cannot generate them at build time:
```ts
// Flipper
{ transformStyle: 'preserve-3d', transform: '...', transition: '...' }

// Each face
{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

// Back face (also needs)
{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }

// Perspective wrapper
{ perspective: '1400px' }

// Pink wallpaper (layered radial gradients — too complex for Tailwind arbitrary values)
{ background: 'radial-gradient(...), radial-gradient(...), linear-gradient(...)' }
```

### Step 6 — Responsive layout

```tsx
<section className="flex justify-center">
  <PhoneMockup isFlipped={isFlipped} />
</section>
```

---

## Files to create / touch

| File | Action |
|------|--------|
| `app/work/[workSlug]/case-study-coming-soon/page.tsx` | **Create** — main deliverable |
| `app/work/[workSlug]/case-study-coming-soon/layout.tsx` | Create if metadata is needed (server component wrapper) |

---

## Things to verify after building

- [ ] `'use client'` is at line 1
- [ ] Spacebar toggles flip; `e.preventDefault()` stops page scroll
- [ ] Both faces have `backfaceVisibility: 'hidden'` — no bleed-through on flip
- [ ] Pink body (the 6px inset) is visible as a bezel around the screen
- [ ] Both store links open in new tab
- [ ] No `rounded-*` on any page-level UI (cards, tags, meta items) — only on the phone + app icons
- [ ] `bg-black` matches root layout background (no seam)
- [ ] `npm run build` passes with no TypeScript or ESLint errors before committing
- [ ] Page works at `/work/appdev/case-study-coming-soon`
