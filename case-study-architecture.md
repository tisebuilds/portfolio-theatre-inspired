# Case study architecture

There is one shared case-study template. The eight work episodes are data passed into it, so a type or color change in that template hits every page at once.

## Structure

The live pages are the TV shell at `/?ch=&view=episode&ep=`. `components/tv/MainViewport.tsx` picks the channel and renders `components/ramp/RampCinemaCaseStudy.tsx`. Ramp Spend and Ramp Treasury redirect from `/work/...` back to that shell. Figma, Meta, and Disney also have standalone copies at `/work/[slug]` (`FigmaCaseStudyClient`, `MetaCaseStudyClient`, `DisneyCaseStudyClient`) that render the same component.

The eight visible work episodes are:

| Episode | Data file |
| --- | --- |
| Employee onboarding, Wallet drawer, Quality of life updates for Akuma | `data/case-studies/ramp-spend.tsx` |
| Move money drawer, RBA cashback redemption | `data/case-studies/ramp-treasury.tsx` |
| Figma, Meta, Disney | `data/case-studies/figma.tsx`, `meta.tsx`, `disney.tsx`, mapped into the Ramp shape in `MainViewport.tsx` |

Treasury also has a third episode, “Quality of life updates,” with `hidden: true`, so it never renders. The same template is also used by Dinner Party (`components/tv/DinnerPartyGalleryCaseStudy.tsx`), ColorStack, and Cornell AppDev. `components/StandardWorkCaseStudy.tsx` is no longer mounted. It only supplies the TypeScript type and the old credits shape for the internship files.

Content is hardcoded TSX, not MDX, JSON, or a CMS. The schema is `RampEpisode` in `data/case-studies/ramp-types.ts`. Internships are authored as `StandardWorkCaseStudyProps`, then `episodeFromStandard()` in `MainViewport.tsx` copies title, year, meta, logline, hero, overview, learnings, and credits into a `RampEpisode`.

### Move money drawer

From `data/case-studies/ramp-treasury.tsx`:

```ts
{
  title: "Move money drawer",
  pillSub: "Enabling businesses to move money in and out of their bank accounts",
  status: "now",
  yearLabel: "2025-2026",
  employment: "Full-time",
  metaYear: "2025-2026",
  tools: <FigmaToolIcon /> <VercelToolIcon /> <MagicPatternsToolIcon /> <CursorToolIcon />,
  externalHref: "https://ramp.com/treasury",
  externalLabel: "ramp.com",
  logline: "A lesson in operating on intuition",
  hideLearnings: true,
  onePagerHref: "/media/ramp/treasury/move-money-one-pager.pdf",
  hero: {
    aspect: "web",
    src: "/media/ramp/treasury/move-money-drawer.mp4",
    alt: "Move money drawer hero",
    media: "video",
  },
  outcomeRich: (
    <>
      <p>Customers have a faster, more convenient way to add funds to their RBA
         without needing to visit physical banks, increasing deposit volume and
         account stickiness for Ramp's treasury product.</p>
      <p>Customers can also send money to any recipient with minimal friction.</p>
    </>
  ),
  metrics: [
    { value: "$959,927.75", label: "SUCCESSFUL CHECK DEPOSITS" },
    { value: "$63.9M", label: "COMPLETED PAYMENT VOLUME" },
    { value: "1,106", label: "COMPLETED PAYMENTS" },
    { value: "222", label: "BUSINESSES WITH PAYMENTS" },
  ],
  stuffBullets: [
    "Added arrival date input box to increase clarity on when transfers and deposits would settle in an RBA.",
    "Led design that enabled customers to deposit checks into Ramp Business Accounts (critical capability as ~26% of businesses still operate with check).",
    "Led design for invoice-free vendor payments enabling lightweight flows for one-off vendors.",
    'Updated CTAs and drawer name from "Transfer funds" to "Move money" based on expanded capabilities.',
  ],
  screenGrid: {
    layout: "mg4",
    cells: [
      { aspect: "r9-16", media: "video", src: "/media/ramp/treasury/move-money-arrival-date.mp4", alt: "Arrival date — primary web view", placeholderLabel: "Primary web view" },
      { aspect: "r9-16", media: "video", src: "/media/ramp/treasury/move-money-check-deposits.mp4", alt: "Check deposits", placeholderLabel: "Check deposits" },
      { aspect: "r9-16", media: "video", src: "/media/ramp/treasury/move-money-send-money-1.mp4", alt: "Send money — web", placeholderLabel: "Send money" },
      { aspect: "r9-16", media: "video", src: "/media/ramp/treasury/move-money-send-money-2-mobile.mp4", alt: "Send money — mobile", placeholderLabel: "Send money — mobile" },
    ],
  },
  learnings: [ /* three strings; not rendered because hideLearnings is true */ ],
  credits: treasuryCredits, // 11 people, same file, lines 24–80
}
```

`tools` and `outcomeRich` are JSX, so this cannot live in JSON without a rewrite. The one-pager link is in the data, but `SHOW_ONE_PAGER_DOWNLOAD` in `RampCinemaCaseStudy.tsx` is `false`, so the button does not render. Credits on this page are the shared `treasuryCredits` list: Jason Li, George Visan, then six engineers (Brian Schendt, Mark Skelton, Moritz Pail, Max Buchan, Eric Zhu, Arnab Dey), then Karl Yang, Christy Chung, James Coen.

### Components

These are not separate component files. The markup is duplicated inside `RampCinemaCaseStudySingle` and `RampCinemaCaseStudyMulti` in `components/ramp/RampCinemaCaseStudy.tsx`, and styled by `components/ramp/ramp-cinema.module.css`.

| Piece | Where |
| --- | --- |
| Header (`h1`) | `HeroTitleCluster`, class `.title` |
| Year badge | same function, class `.titleTimingBadge` (uses `titleTimingBadge`, otherwise `yearLabel`) |
| Metadata row | `.metaRow` / `.metaItem` / `.metaTools` / `.metaLink`. Internship pages replace that with `.metaRowRich` |
| Tagline | `.logline` |
| Hero media | `HeroImage` (plus `HeroPlaceholder` when `src` is missing) |
| Section heading with rule | `.chHeader` + `.chName` + `.chLine`. Lessons use `EpisodeLearningsSection` |
| Metrics grid | `.metrics` / `.metric` / `.metricVal` / `.metricValPill` / `.metricLbl` |
| Bullet list | `.chBullets.chBulletsStuff` |
| Media grid | `.mg` + `.mg2` / `.mg3` / `.mg4` / `.mgStack`, each cell is `ScreenCell` |
| Lessons list | `EpisodeLearningsSection` + `LearningTitleBody` (`.chBulletsLessons`). Figma, Meta, Disney, and Dinner Party instead inject `components/LearningsFromStandard.tsx` |
| Thank-you grid | `.credits` + `.creditsGrid` + `.creditLine` / `.creditRole` / `.creditVal` |
| External-link icon | `components/case-study-icons.tsx` (`ExternalLinkIcon`, and `MetaDot` for internship meta rows) |

## Styling

Case study pages use a CSS module, `components/ramp/ramp-cinema.module.css`. Tokens live on `.root` in that file (`--type-display-*`, `--type-body-*`, `--type-label-*`, `--type-caption-*`, `--text`, `--text-muted`, `--bg`, `--accent`). Tailwind is the rest of the site (`tailwind.config.ts`, `app/globals.css`). `components/case-study-typography.ts` is a second, Tailwind scale used only by the internship lessons list.

### The four type styles

All of these are set on `.root`:

| Style | Size | Weight | Line height | Tracking | Color | Classes |
| --- | --- | --- | --- | --- | --- | --- |
| Display | 36px (28px at ≤640px, title only) | 600 | 1.05 | −0.04em | `#ffffff` (`--text`) | `.title`. Metrics values use the same size, weight, and tracking, with `line-height: 1` (`.metricVal`) |
| Body | 15px | 400 | 1.7 | not set (normal) | `#a3a3aa` on the tagline and default body; `#ffffff` on bullets, outcome (`.chBodyPrimary`), names | `.logline`, `.chBody`, `.chBullets`, `.creditVal` (`letter-spacing: 0`) |
| Label | 11px | 600 | 1.35 | 0.08em | `#a3a3aa` for section labels, metric labels, credit roles; `#ffffff` for the year badge and metric pills | `.titleTimingBadge`, `.chName`, `.metricLbl`, `.metricValPill`, `.creditRole` |
| Caption | 12px | 400 | 1.5 | not set | `#a3a3aa` | `.metaItem`, `.metaLink`, `.metaRowRich`. The root element itself is also 12px |

Exceptions that sit outside those four:

- Lesson titles (`.chLessonTitle`) and `<strong>` in body copy are weight 500, body size, body leading, `#ffffff`.
- Internship lessons (`caseStudyType` in `components/case-study-typography.ts`): `text-sm` (14px), `leading-[1.85]`, weight 400 or 500, color `#ffffff` or Tailwind `text-neutral-400` (`#a3a3a3`, which is not `--text-muted`).
- Media-cell placeholders: 9px / 600 / 0.08em / `#a3a3aa` (`.mc`).
- Before/after toggle: 10px / 600 / 0.04em / `line-height: 1` (`.mcBaToggleBtn`).
- The bottom player (chapter names, episode numbers, keyboard chips) has more one-off sizes (9px, 10px, 11px, 12px, 13px). The TV shell passes `showPlayer={false}`, so that chrome is not on these pages.

### Fonts

No webfont is loaded. `app/globals.css` sets `--font-inter: ui-sans-serif` and `--font-jetbrains-mono: ui-monospace`. The case study uses the sans stack. A monospace stack is already available: sidebar “Side Projects” is `.nav-section-label`, and “CH 02” is `.nav-tab-ep`, both `var(--font-jetbrains-mono)` in `app/globals.css`. Tailwind `font-mono` points at the same variable. It is the operating system’s monospace face, not a file named JetBrains Mono.

### What is safe to change

Safe to change, because they are scoped to `.root` inside the case study:

- The four `--type-*` tokens, `--text`, `--text-muted`, and the cinema `--accent` (`#e7f256`). The site accent elsewhere is pink `#E299C0`.

Shared, so a change shows up outside these pages:

- `--font-inter` and `--font-jetbrains-mono` in `app/globals.css`. Sidebar, home, channel landings, resume, and side-project landings all use them through Tailwind `font-sans` / `font-mono`.
- `caseStudyType` and `caseStudySpacing`. Lessons on Figma, Meta, Disney, and Dinner Party use them. Spacing is also used by the old shipped page, `SkillsList`, and `DesignDecisionsDrawer`.
- `ExternalLinkIcon` is also used in `components/tv/AboutViewport.tsx`.
- Tool PNGs in `data/site-media.json` are shared with Disney, ColorStack, and AppDev.
- Editing `RampCinemaCaseStudy.tsx` or its CSS module also restyles Dinner Party, ColorStack, and AppDev.

## Layout

`.contentWrap` is `max-width: 860px`, centered, with `48px` horizontal padding (`24px` at `max-width: 640px`). That column sits inside the TV card, which is already inset from the 290px sidebar. The cinema CSS only breaks at 640px. Tailwind’s `sm` / `md` / `lg` breakpoints are not used by this template. At 640px the title becomes 28px, the credits grid becomes one column, and 3- and 4-up media grids become two columns. The metrics grid does not change.

Heroes are a raw `<video>` or `<img>` inside `HeroImage`, not `next/image`. A video hero drops the fixed ratio (`.heroMockVideoHug`): width is 100%, height follows the file, `object-fit: fill`. An image hero is locked to 16:9 when `hero.aspect` is `"web"`, or 21:9 when `"mobile"`, with `object-fit: cover`. Move money is a video, so its hero is intrinsic. Inline cells in `ScreenCell` use the `aspect` field: `r16-9`, `r1-1`, `r1024-817`, `r4-3`, `r9-16`, `wide` / `wide3` (21:9 and a column span). `"intrinsic"` (`.mcHug`) follows the file. Images in a fixed cell use `object-fit: cover`. Videos use `object-fit: contain` on a `#0a0a0a` background, so they letterbox inside the tile. Move money’s four cells are `r9-16` videos.

### Metrics grid

The metrics grid is one rule: 4 or more metrics get `.metrics2x2` (2 columns). Anything fewer stays `.metrics` (3 columns). Two metrics leave an empty third track. Three sit in one row. There is no 2-column treatment for exactly two, and no mobile override. The badge is `RampMetric.valuePill`, an optional string rendered beside the value. `"91% funded"` and `"↑60%"` are literal text. Nothing parses the arrow or the percent.

```ts
export type RampMetric = {
  value: string;
  /** Optional pill beside the value (e.g. change indicator). */
  valuePill?: string;
  label: string;
};
```

Move money has no pills. `"↑60%"` is on Employee onboarding; `"91% funded"` is on RBA cashback redemption.

### Tool icons

Ramp tool icons are small React components that render a 20×20 `next/image`: `components/ramp/FigmaToolIcon.tsx`, `VercelToolIcon.tsx`, `MagicPatternsToolIcon.tsx`, `CursorToolIcon.tsx`, `SlackToolIcon.tsx`. Paths come from `toolIcons` in `data/site-media.json`. The episode’s `tools` node is placed in `.metaTools` (flex, 5px gap). The `.toolIcon` rules in the CSS module are unused. Internship rows use strips in `components/case-study-tool-logos.tsx` (PNG icons plus inline SVGs for Workplace and Loom), or, for Disney, images inlined in `data/case-studies/disney.tsx`.

## Risk

There are no tests, snapshots, or visual-regression checks. `npm run dev` starts Next.js locally (`next dev`, port 3000). Other scripts are `build`, `start`, and `lint`.

## Recommendations

**Edit the one template, and use Move money drawer as the review page before you accept it.** A token or CSS change cannot be limited to one episode. Move money is the densest page (video hero, four metrics, bullets, four portrait videos, an 11-person credit grid, and no lessons), so it shows the type styles and the grids. After that, click the other seven. Figma, Meta, and Disney will not match it automatically: their meta row, lessons, and credits come through `metaRowRich` and `LearningsFromStandard`, which use the Tailwind scale instead of the cinema tokens.

**Keep the current credit order.** Move money is already grouped by role in one flat list, and the grid reads that list left to right, three per row, with no group headings. The schema has `role`, `name`, and `linkedInUrl` only. A prototype order that differs is a reorder of that array, not a new component. Do not add role-group headings unless you want a schema change.

**Letterbox the hero only where a fixed frame would cut the footage.** Video heroes already follow the file, so Move money has no bars and no crop. Image heroes are cropped to 16:9. Forcing a letterboxed 16:9 on every page would put bars around the Figma, Meta, and Disney illustrations, which were drawn to fill that frame, and would also bar the Move money video if its aspect is not 16:9. Inline tiles are a separate case: those videos already letterbox inside a fixed ratio.
