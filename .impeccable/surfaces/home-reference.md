# Homepage restoration

Mode: Persuade. User request: apply the homepage design from `Demo/stitch_petshop_design_system (2)/code-animated.html` again. This explicitly supersedes the earlier Stitch-visible homepage composition for `/` only.

## Direction contract

- Owning source: the local HTML and its hero-slider, product-stories, background, product-card and floating-dock assets.
- First viewport: 90% wide rounded photograph background hero, stable copy on a warm left wash, Nunito 800 title with brown emphasis and yellow curved underline, blue shopping action, brown outlined booking action, image controls and horizontal 4.5-second slideshow.
- Sequence: hero, three editorial product stories and expanded narratives, four trust statements, eight category tiles, orange/green Flash Sale cards, featured products, three services, booking process and quick form, reviews placeholder, warm closing banner and warm footer.
- Signature interaction: horizontal hero slides with pause/keyboard/reduced-motion support; story links open details; floating dock links to sections; cart and booking connect to current React state.
- Materials: existing local pet backgrounds and product photos; no new raster assets. Be Vietnam Pro body, source Nunito hero and Georgia editorial italics. Original source decorative counts, endorsements and unconfirmed medical claims remain excluded in favour of existing truthful demo copy.
- Layout: source max-width 1280px utilities, original source styles scoped inside `.demo-home`; header/footer variants inside `.home-reference`. Keep non-homepage routes and their Stitch design intact.

Code-led adaptation from an existing user-selected HTML source, no generated comp. Screenshots: `.impeccable/review/home-reference/desktop.png`, `mobile.png`, `full-1440.png`, `full-390.png`. Automated checks cover 320/390/768/1024/1440px, local image decode, source section presence, story expansion, slider controls, cart additions, quick booking handoff and route isolation.

Finish review: ship at 1440/390; bounded 1024–1199px price ribbon fix reviewed and shipped after recapture at 1024. Build/lint and focused homepage, route VI/EN, quick booking and existing responsive/image/label/200%-text checks pass.

## Background refinement — 2026-11-09

User approved a rhythm of section colors, large curved color fields and sparse pet motifs. Homepage backgrounds now alternate ivory/white, honey for Flash Sale, warm cream for care and pale blue for the booking process/form. `src/components/home/BackgroundScene.jsx` owns noninteractive, aria-hidden curves and paw/ball marks; `src/styles/home-backgrounds.css` scopes the composition and smaller mobile decorations. Primitive surface colors live in `src/styles/tokens.css`. Clip only the decorative layer, keeping cards, keyboard outlines and hover effects free. Keep the white navigation, content, existing motion and other route designs intact. The subsequent approved completion adds low curved section seams, a sparse collar-line motif in care, 24–29 second curve drift, and scroll-linked motifs. `src/hooks/useBackgroundMotion.js` pauses curves offscreen and in hidden tabs; desktop motif travel is bounded to 16px and mobile to 3px, with mobile curve drift of 3–4px over 36 seconds. Reduced motion disables both background drift and scroll offsets, including live preference changes.
