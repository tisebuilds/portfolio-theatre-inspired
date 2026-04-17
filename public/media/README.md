# Static media for this site

Everything here is served from the site root under `/media/...` (for example `public/media/posters/foo.png` → `https://yoursite.com/media/posters/foo.png`).

## Folders

| Folder | Purpose |
|--------|---------|
| `posters/` | Theatre-style work posters and film stills used on the home and About pages. |
| `stickers/` | Small sticker art (About page, pins strip). |
| `icons/` | Tool and app icons (Figma, Slack, case-study tool rows, etc.). |
| `heroes/` | Large case study hero images. |
| `device/` | Phone mockup assets (wallpaper, device back). |
| `people/` | Portrait photos used in case studies. |
| `colorstack-instagram/` | Instagram preview tiles for the ColorStack section. |
| `logos/black`, `logos/white`, `logos/grey` | Employer marks. Grey versions are also exposed at `/logo/grey/...` for the mobile résumé view (see `public/logo/grey` symlink). |
| `profile/` | Site profile photo. |
| `awards/` | Award certificate images (`data/about.json` references these paths). |
| `mentors/` | Mentor collage images (`data/about.json`; filenames match slugified names when using the default URL pattern). |
| `projects/` | Side-project videos and images (`data/projects.json`, case study pages). |
| `ramp/` | Ramp case study PDFs, videos, and screen captures (`data/case-studies/ramp-*.tsx`). |
| `shipped/` | Shipped-case-study prototype screenshots (`data/shipped-case-studies.json`). |

## Where to edit paths without opening React files

- **Shared icons, heroes, ColorStack Instagram grid (URLs + previews), App Dev mockups, profile photo:** `data/site-media.json`
- **About page — favorite films, award sticker strip, interest “pins” collage:** `data/about-page-assets.json`
- **Work grid posters and logos:** `data/work.json`
- **About awards and mentor list (names + images):** `data/about.json`
- **College / side projects list:** `data/projects.json`

After you add or rename a file under `public/media/`, update the matching path in the JSON above. Run `npm run build` locally to confirm nothing 404s.
