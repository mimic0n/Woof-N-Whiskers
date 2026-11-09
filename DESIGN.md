---
name: Woof N’ Whiskers
description: The implemented Vietnamese/English pet shop and care design from Stitch project 17480892489591456143.
colors:
  brown: "#835D42"
  yellow: "#F8D38C"
  blue: "#326DCA"
  cream: "#F9EED9"
  mist: "#F8F9FB"
  ink: "#201A16"
  muted: "#6E6259"
  blue-dark: "#2757A8"
  line: "#EBE5DF"
  success: "#2E7D4F"
  warning: "#B26A00"
  danger: "#B3261E"
  footer: "#3F5F78"
  white: "#FFFFFF"
  warm: "#FAF5F0"
  blue-soft: "#E8F0FE"
  home-sale-orange: "#fa782e"
  home-sale-red: "#c82930"
  home-sale-green: "#11e95b"
  home-sale-ink: "#143620"
  home-dock: "#f5f5f5"
  home-dock-button: "#e5e5e5"
  home-dock-ink: "#646464"
  dock-gray-50: "oklch(98.5% 0.002 247.839)"
  dock-gray-100: "oklch(96.7% 0.003 264.542)"
  dock-gray-200: "oklch(92.8% 0.006 264.531)"
  dock-neutral-300: "oklch(87% 0 none)"
  dock-neutral-400: "oklch(70.8% 0 none)"
  dock-neutral-500: "oklch(55.6% 0 none)"
  dock-neutral-700: "oklch(37.1% 0 none)"
  dock-neutral-800: "oklch(26.9% 0 none)"
  dock-neutral-900: "oklch(20.5% 0 none)"
typography:
  home-display:
    fontFamily: "Nunito, Be Vietnam Pro, sans-serif"
    fontSize: "clamp(2.25rem,3.25vw,3.25rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-.025em"
  home-hero-body:
    fontFamily: "Nunito, Be Vietnam Pro, sans-serif"
    fontWeight: 500
    lineHeight: 1.65
  home-story-emphasis:
    fontFamily: "Georgia, Times New Roman, serif"
    fontWeight: 400
  display:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.1rem,3.65vw,3.25rem)"
    fontWeight: 800
    lineHeight: 1.17
  headline:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.45rem,2.2vw,2rem)"
    fontWeight: 700
    lineHeight: 1.35
  title:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: ".9rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  field: "8px"
  sm: "10px"
  card: "16px"
  pill: "999px"
spacing:
  sp-1: "4px"
  sp-2: "8px"
  sp-3: "12px"
  sp-4: "16px"
  sp-6: "24px"
  sp-8: "32px"
  sp-12: "48px"
  sp-16: "64px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.blue-dark}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 14px"
  panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "32px"
  category-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
---
# Design System: Woof N’ Whiskers

## Overview

**Creative North Star: "The selected Stitch pet shop templates"**

The selected Stitch page templates establish warm pet photography, brown identity details, blue actions and rounded white surfaces. The same language continues through service pages, booking, accounts, shopping and reading pages; operational screens use tighter spacing and visible borders.

The `/` homepage follows the user-selected local source `Demo/stitch_petshop_design_system (2)/code-animated.html`. Its route-specific variation is scoped by `.demo-home` and `.home-reference`; the shared tokens and Stitch guidance below remain authoritative for other routes.

**Key Characteristics:**
- Warm cream beside pale gray and white surfaces.
- Blue controls and prices; brown identity and care accents.
- Self-hosted Vietnamese typography and natural pet/shop imagery.

## Colors

### Primary
Brown supplies the identity, highlighted headline text and cream-backed care icons. Blue supplies actions, links, selected controls and product prices; blue-dark is the primary button hover.

### Secondary
Cream and yellow provide warm support panels, icon backgrounds, text selection and headline underline accents. Blue-soft supports secondary hover and selected navigation.

### Neutral
Mist is the page canvas; white is the principal card and field surface. Warm distinguishes editorial sections and hero backgrounds. Ink carries main text, muted carries secondary copy, and line carries borders. Footer is the slate blue closing surface. Success, warning and danger retain semantic status roles.

### Homepage variation
Flash Sale image headers use `linear-gradient(135deg, #fa782e 8%, #c82930 83%)`; badges and price ribbons use home-sale-green with home-sale-ink text. These promotional colors apply to homepage Flash Sale cards. The home-dock tokens record the earlier homepage source palette; the shared navigation now uses the Aceternity source neutrals below. The homepage footer uses warm with ink/muted text and brown headings instead of the shared slate-blue footer.

### Shared dock neutrals
The Tailwind v4 source palette stays independent of the warm page theme. Gray-50 supplies the desktop tray and mobile circles, gray-200 the desktop circles and tooltip border, gray-100 the tooltip surface, neutral-500 icons, and neutral-700 tooltip text. With a `.dark` ancestor, neutral-900 supplies the tray/mobile links and tooltip border, neutral-800 desktop circles/mobile toggle/tooltips, neutral-300 destination icons, neutral-400 toggle icon, and white tooltip text. The frontmatter records the actual source OKLCH values; preserve these utilities rather than substituting legacy home-dock colors.

## Typography

Be Vietnam Pro is self-hosted in normal weights 400, 500, 600, 700 and 800, with the system fallback stack recorded above. Body uses the shared body role. The shared display role remains available to other compositions; the restored homepage hero uses home-display and home-hero-body, with local Nunito Vietnamese/Latin files at weights 500 and 800. Product-story italic emphasis uses home-story-emphasis (Georgia), while the surrounding homepage body keeps Be Vietnam Pro. On phones below 640px the hero heading is 2rem, reducing to 1.8rem below 380px; ordinary page h1 uses a smaller responsive scale (`clamp(1.9rem,3.15vw,2.75rem)`, weight 700, line height 1.28). Headline maps to h2; individual card titles and labels use context-specific smaller sizes. Avoid forcing one hero scale onto every route. Long policy copy is constrained to about 75ch; hero copy to 52ch.

## Layout

Main content caps at 1200px with 32px desktop gutters and 16px mobile gutters. The header separately caps at 1320px. Sections use 56px vertical padding, reduced to 36px below 768px. Shared grids use 24px gaps; catalog cards use denser gaps. Desktop compositions pair content with a sidebar or image; mobile generally stacks these, while product grids retain two columns. The booking summary becomes static below 1024px. Primary navigation is the shared Floating Dock: desktop at 768px and above, mobile below 768px. The desktop tray is fixed bottom-center at 24px; mobile is fixed bottom-right at 20px; both use z-index 40. Footer and toast clearance accommodate the dock, with the homepage mobile back-to-top control at bottom-left. Additional small-screen adjustments occur below 480px and 380px. Treat component-specific responsive rules as authoritative.

### Homepage variation
Source utilities cap content at 1280px; product stories cap at 1240px. The hero is 90% wide with a 32px radius, a photograph behind a warm left wash, and a desktop inner minimum height of 600px. Below 640px its radius becomes 24px and a 260px photograph sits above full-width copy. The three story cards stack below 700px. Booking steps and quick-form choices stack below 768px. Preserve the source component breakpoints rather than applying the shared container to this route.

## Elevation & Depth

Borders and tonal surfaces define most separation. Shared small elevation is `0 1px 3px rgba(43,29,20,.08)`; modal/toast elevation is `0 10px 30px rgba(43,29,20,.10)`. Product cards are flat at rest and gain `0 4px 12px rgba(43,29,20,.06)` with a 2px upward shift on hover. The restored homepage uses the hero’s clipping and warm wash for framing, flat story and Flash Sale bodies, and a soft shadow under the quick-booking form. The shared source dock uses tonal separation without an added shadow.

## Shapes

Cards and panels use the card radius; fields use the field radius; ordinary buttons use sm. Hero and final-CTA actions use pills. Nested image frames commonly use sm; photography is clipped with object-fit cover. The footer has rounded upper corners (26px). Preserve these contextual shapes rather than normalizing every component to one radius.

## Components

### Buttons
Primary controls use blue with white semibold labels; hover darkens the fill and adds a subtle blue shadow. Secondary controls use white, ink and the line border; hover shifts to blue text/border on blue-soft. Default minimum height is 46px, with compact card controls at 40px. Disabled controls reduce opacity. Focus uses a 3px blue outline with 2px offset.

### Chips
Category filters use bordered white pills with blue selected fill and white text. Species toggles share the selected-blue convention. Informational cream price chips and semantic stock labels have separate roles.

### Cards / Containers
White cards use a thin line border and rounded corners. Product bodies use 16px padding (12px mobile), service bodies 22px (20px mobile), and general panels 32px (22px mobile). Product and service images sit inside inset rounded frames; illustration labels remain visible.

### Inputs / Fields
White fields have thin line borders, 48px minimum height and the field radius. Hover changes the border to a warmer gray; focus keeps the shared blue outline. Invalid fields use danger borders and associated error text. Search, compact filters and calendars have their own sizing.

### Navigation
The user-pinned Aceternity Floating Dock is the primary navigation on every route, mounted once by the shared layout. It replaces both the prior header menu/mobile navigation drawer and the homepage-only dock. Header brand, search, language, account and cart actions remain. Seven localized icon destinations cover Home, Shop, Services, About, Booking, Account and Contact; the paw icon links to About. Current destinations expose `aria-current="page"` without an added active-color treatment. Ordinary internal clicks use React Router; modified clicks retain native anchor behavior.

Preserve `src/components/ui/floating-dock.tsx` utility styling and Motion behavior through the shared adapter in `src/components/floating-dock-demo.tsx`. The desktop 64px-high, 16px-radius tray uses 16px gaps/horizontal padding and 12px bottom padding. Circular items magnify from 40px to 80px, with icons from 20px to 40px across the distance range [-150, 0, 150]; springs use mass 0.1, stiffness 150, damping 12. Hover and keyboard focus show source tooltips. Mobile uses 40px circles with 16px destination icons, a 20px toggle icon and an upward stack with 8px gaps; entry reverses item order with a 0.05s stagger, and entry/exit uses opacity plus 10px translation. Escape closes the stack and returns focus to the toggle; route changes reset open/hover state. These 40px source targets are an explicit user choice, not a design regression to normalize to the site's larger controls.

Reduced motion fixes desktop items/icons at 40/20px, removes tooltip/mobile displacement and mobile stagger, and makes those transitions immediate. Keep the supplied dark variants. `src/styles/floating-dock.css` supplies Tailwind utilities without global preflight; do not replace source shapes, colors or motion with custom CSS. Caller utilities handle fixed placement and the scoped anchor/button baseline only. Language controls and tabs retain their own selected states; tabs use blue text and a blue bottom border.

### Restored homepage
Keep the source sequence: background hero, three product stories with expandable narratives, trust statements, categories, Flash Sale, featured products, services, booking steps and quick form, reviews placeholder, closing banner and warm footer. The hero keeps stable copy, brown emphasis with a yellow curved underline, a blue shopping pill and a brown outlined booking pill. Its photographs slide horizontally every 4.5 seconds with hover/focus pause, manual arrows/dots, keyboard controls and reduced-motion support. Flash Sale cards retain 25px corners, orange/red image headers, rotated product frames and green badges/price ribbons without a black shadow. The closing banner is brown; the homepage footer is warm with square upper corners.

### Booking and Commerce Progress
Booking uses bordered step tiles, numbered circles and blue current-step accents. Desktop booking places the estimate alongside the form; mobile places it in normal flow. Cart and checkout use a simpler horizontal numbered progress row. Preserve the semantic current-step markers.

## Do's and Don'ts

### Do:
- **Do** follow the actual exported Stitch pages and the implemented tokens; for `/`, preserve the pinned local HTML variation and its scoped source styles.
- **Do** preserve visible focus, validation, empty states and bilingual text wrapping.
- **Do** retain illustration/demo labels where the application shows them.
- **Do** preserve one shared source Floating Dock on every route, including its user-selected 40px targets, neutral palette, dark variants and reduced-motion behavior.

### Don't:
- **Don’t** substitute the unrelated coral project metadata for the page palette.
- **Don’t** assume every button is a pill: form and card controls use smaller corners.
- **Don’t** introduce remote fonts or remove reduced-motion behavior.
