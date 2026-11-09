# Stitch reference archive

Homepage override: the user later restored `/` from `Demo/stitch_petshop_design_system (2)/code-animated.html`. The homepage references below remain archived alternatives; other route mappings continue to apply.

Project: `17480892489591456143` — Petshop Design System. Imported on 2026-11-08 through Stitch MCP.

The manifest contains all 34 visible HTML screens and two Markdown documents, plus the hidden canonical homepage retrieved directly from the canvas. The remaining visible `image.png` entry is a reference image, not a page template. Raw exports are reference material and are never executed by the React application.

Use canonical Woof N’ Whiskers screens named “chuẩn mục 2.x” where available. PawHouse and earlier Woof N’ Whiskers pages remain archived as alternatives. The visible Woof N’ Whiskers homepage supplies the home shopping/booking composition. The hidden 2.1 homepage supplies an additional reference for service/trust/content patterns.

The actual exported pages use brown/cream/blue, even though the project's global design metadata describes coral. Implemented tokens follow the pages. Source controls that only switch mockup previews are replaced by working application state. Unsupported factual claims, sample testimonials, social sign-in, medical guarantees, fake addresses and placeholder hotlines are not transferred.

| Source page group | Current route / state |
| --- | --- |
| Homepage (Woof N’ Whiskers and PawHouse variants) | `/` |
| 2.2 About | `/gioi-thieu/` |
| 2.3 Service overview | `/dich-vu/` |
| 2.4 Daycare | `/dich-vu/cham-soc-ban-ngay/` |
| 2.5 Overnight boarding | `/dich-vu/luu-tru-ban-dem/` |
| 2.6 Grooming | `/dich-vu/cham-soc-long/` |
| 2.7 Booking overview and step 1 | `/dat-lich/` |
| 2.8 Pet information, saved/new pet | Booking step 2 |
| 2.9 Customer information and validation | Booking step 3 |
| 2.10 Review and booking success | Booking step 4 and saved result |
| 2.11 Sign-in / sign-up | `/tai-khoan/`, guest |
| 2.12 Profile, bookings, orders | `/tai-khoan/?tab=profile`, `bookings`, `orders` |
| 2.13 Pet list / empty | `/tai-khoan/thu-cung/` |
| 2.14 Pet detail tabs | Pet detail state |
| 2.15 Pet create/edit | Pet form state |
| 2.16 Catalog/search, empty, suggestions | `/cua-hang/`, query filters and shared search |
| 2.17 Product detail | `/cua-hang/san-pham/?id=royal-canin-mini` and other IDs |
| 2.18 Cart and mini cart | `/gio-hang/` and header cart drawer |
| 2.18 Checkout and confirmation | `/thanh-toan/` and saved order result |
| 2.19 FAQ | `/faq/` |
| 2.19 Cancellation / vaccination policies | `/chinh-sach/huy-lich/`, `/chinh-sach/tiem-phong/` |
| 2.19 Contact and map | `/lien-he/` |

Additional current blog, search, privacy, returns, terms and 404 routes inherit the shared design system.

66 source images are compressed and served locally as WebP under `public/assets/stitch/`; provenance and source URLs are in `assets.json`. Fonts are self-hosted under `public/assets/fonts/` and declared in `src/styles/fonts.css`. `scripts/import-stitch-assets.py` and `scripts/import-stitch-font.py` refresh these assets when explicitly run.

Live implementation: `src/styles/tokens.css`, `src/styles/stitch.css`, shared React components and route components. Responsive screenshots: `.impeccable/review/`. Tests: `tests/website.spec.js`, `tests/stitch.spec.js`.
