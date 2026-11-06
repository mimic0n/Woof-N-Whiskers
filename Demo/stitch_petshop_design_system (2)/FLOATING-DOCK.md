# Floating Dock integration

The original page remains `code-animated.html`. Open it as before; React and the dock's Tailwind v4 stylesheet are compiled into local `assets/floating-dock.js` and `assets/floating-dock.css`. No runtime package CDN is required for the dock.

Development: `npm ci`, then `npm run build`. `npm run typecheck` checks TypeScript. `node scripts/check-dock.mjs` runs the browser checks using the installed Edge executable.

## Differences from the supplied source

- This repository was plain HTML with Tailwind CDN v3, without `components.json` or a package manager. Added an npm package/lockfile, React TypeScript island, esbuild, and Tailwind v4 compilation. Only dock styles are scoped under `#floating-dock-root`; Tailwind layers are flattened to coexist with the incumbent v3 utilities. The existing page is not migrated.
- Replaced the example's seven demo links with the exact five existing Vietnamese navigation labels and hrefs. Tabler icons now represent shopping, grooming, scheduling, discounts, and pet care. No Aceternity logo image is needed.
- Removed the demo's 35rem wrapper and mobile translate offset. Desktop is fixed at bottom center; mobile is fixed at bottom right. Added page bottom space, safe-area spacing, and moved the back-to-top button above the mobile dock.
- Retained the logo, search, favorites, notifications, shopping cart, sign-in and booking action in the top utility header. The old five-link navigation hides only after React mounts, providing a desktop fallback if the bundle cannot load. This preserves existing cart scripts and header controls.
- Kept all original component utility strings, magnification ranges (40–80 / 20–40), spring settings (mass .1, stiffness 150, damping 12), and normal-motion tooltip/mobile timing. A scoped reset supplies the small portion of preflight the component needs. The dock's outer transform is cleared to prevent the incumbent Tailwind v3 translate utility and v4 individual translate property from shifting it twice.
- The supplied source did not implement reduced-motion handling. Added a live OS-preference listener: magnification stays at 40px / 20px, mobile spatial movement and stagger disappear, and opacity feedback remains.
- Used `clientX` instead of `pageX` to match `getBoundingClientRect()` viewport coordinates.
- Added accessible link/button names, menu expanded state, button type, keyboard-focus tooltips, visible focus outlines, Escape dismissal, outside-pointer dismissal, and close-on-navigation on mobile. No navigation labels or targets changed.
- Used explicit `ReactNode` and `MotionValue<number>` types for strict TypeScript. Kept the required exported name `FloatingDock`, the requested file paths, and the `@/` alias.
- Dark mode follows an ancestor `.dark` class, matching the source. The dock supports dark mode; the rest of the existing page retains its current theme behavior.
