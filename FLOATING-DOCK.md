# Shared Aceternity Floating Dock

The user-supplied source owns the component's appearance and default Motion settings. `src/components/ui/floating-dock.tsx` exports the named `FloatingDock`. `src/components/floating-dock-demo.tsx` is the production WnW adapter, mounted once in `src/components/site/Layout.jsx` on every route.

## Preserved from source

- Original utility classes for the 64px desktop tray, 40px circles, gray palette, radii, gaps, tooltip and mobile vertical stack.
- Desktop transform ranges: distance `[-150,0,150]`, item size `[40,80,40]`, icon size `[20,40,20]`.
- Springs: `mass:0.1`, `stiffness:150`, `damping:12`.
- Default mobile entry/exit opacity and 10px translation, stagger step `0.05` seconds and reverse entry order.
- All original light/dark utility variants. Add `.dark` to an ancestor, conventionally `<html>`, to render the dark variant. The site does not acquire a separate dark theme switch as part of this component integration.
- `cn` uses `clsx` and `tailwind-merge`, so caller classes replace conflicting defaults.

## Every integration difference and why

1. **Existing project tooling:** no root `components.json` was present, so the component was built manually. Added TypeScript for the new `.tsx`/`.ts` files, Vite/TypeScript `@/` alias, `npm run typecheck`, and TypeScript ESLint support. Existing JavaScript pages remain intact.
2. **Tailwind version:** upgraded the main compiler to Tailwind v4 and `@tailwindcss/postcss`. `src/styles/floating-dock.css` imports its theme/utilities and scans TypeScript sources. It deliberately omits global preflight so unrelated existing pages are not reset. A `tailwindcss-v3` alias remains only for `scripts/build-demo-home-css.cjs`, which must reproduce the existing homepage's legacy utilities.
3. **Demo adapter:** replaced example titles, placeholder `#` links, social destinations and external Aceternity logo with seven real WnW destinations and Tabler icons: Home, Shop, Services, About (paw), Booking, Account and Contact. Labels follow VI/EN. No external image host is needed.
4. **Production placement:** removed the demo's 35rem stage and `translate-y-20`. Caller utility classes fix the desktop dock bottom-center (`bottom-6`, `left-1/2`, `-translate-x-1/2`) and mobile bottom-right (`right-5`, `bottom-5`), both `z-40`. Default visual classes are unchanged.
5. **React Router:** the adapter intercepts ordinary same-origin anchor clicks and calls `navigate`; modified clicks, downloads and target links retain browser behavior. The reusable component still renders source-style anchors. A pathname key resets open/hover state after changing route.
6. **Accessibility:** optional `mobileLabel` and `current` metadata provide icon link names, `aria-current`, button expanded/control state, `type="button"`, and Escape returning focus to the toggle. Keyboard focus also shows the desktop tooltip. Mobile links have native title text. `data-*` attributes support tests without styling changes. `MotionValue`/`ReactNode` imports are type-only, and source `let` locals become `const` where appropriate.
7. **Reduced motion:** the supplied source contains no reduced-motion implementation, although the request explicitly requires a check. Added `MotionConfig reducedMotion="user"` plus `useReducedMotion`: requested reduction fixes item/icon sizes at 40/20px, removes mobile stagger/displacement and makes tooltip/mobile transitions immediate. Default preference preserves the original ranges, spring parameters and timings.
8. **Scoped browser reset:** adapter utilities `[&_a]:no-underline [&_button]:border-0 [&_button]:p-0` supply the source's expected anchor/button baseline without loading Tailwind preflight globally. These do not replace the component's shape, palette or Motion styling.
9. **Shared ownership:** removed duplicate homepage dock and old primary header navigation, including the old mobile navigation drawer. Header brand, search, language, account and cart actions remain. Existing `src/components/FloatingDock.jsx` is a compatibility export of the shared adapter. Footer bottom space and toast offset in `stitch.css` keep final content/feedback clear of the fixed dock. The homepage back-to-top control moves to bottom-left on mobile, and open-menu toast spacing reserves the right-hand icon column.
10. **JavaScript boundary typing:** the existing untyped i18n provider infers a null context to TypeScript. The adapter supplies its narrow `t/l` translation interface locally; the existing provider and other pages are unchanged.

`"use client"` is retained in the source component. This Vite client application does not need it; Vite/Rollup ignores the directive, as it also does for Motion's client modules.

## Verification

- `npm run typecheck`, `npm run build`, `npm run lint`.
- `tests/floating-dock.spec.js`: one dock per route, desktop/mobile breakpoints, light/dark styles, dimensions and spring magnification, class merging, keyboard/Escape, SPA navigation, active page metadata and reduced motion.
- Existing website tests validate the surrounding account, pet, booking and shopping flows. The prior mobile drawer focus test now uses the cart drawer; primary mobile navigation is tested on the new dock.
- Screenshots: `.impeccable/review/shared-dock/` (ignored in Git).

A missing site favicon was also supplied from the existing `/assets/paw-mark.svg` so clean-browser navigation does not log an unrelated favicon 404.
