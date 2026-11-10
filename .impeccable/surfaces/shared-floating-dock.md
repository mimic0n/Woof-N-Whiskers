# Shared Floating Dock navigation

Mode: Operate. The user provided Aceternity UI's two-file Floating Dock source and explicitly requested its exact Tailwind utility design and Motion interactions across every webpage.

Owning source: the source pasted in the user request. Keep 40→80px spring magnification, 20→40px icons, spring mass .1/stiffness150/damping12, desktop gray-50 64px tray with16px gaps and gray-200 circular items, mobile40px vertical gray-50 items with stagger .05s, all supplied dark variants and tooltips. Use TypeScript, Tailwind v4 utilities, Tabler, motion, clsx and tailwind-merge. No replacement CSS shapes or colors.

Adaptations: actual WnW route labels/icons/URLs, fixed desktop bottom-center and mobile bottom-right, no demo35rem stage/translate-y20; retain React Router navigation through anchor click interception in the site adapter. Add accessible icon names/currentpage/mobilebutton state/Escape/keyboard tooltip. Source has no reduced motion policy, despite check requesting one; use MotionConfig/user plus fixed40/20px/no stagger or displacement when reduction is requested. Class merging via cn. Shared layout owns exactly one instance, replacing homepage-only legacy dock and header desktop primary links. Header search/account/cart/language remain available; the old mobile navigation drawer is removed so there is only one primary navigation design.

The existing site uses JS and legacy precompiled Tailwind3 homepage styles; add TS for new files and isolate v4 utilities to dock sources with no global preflight. The v3 package alias remains only for the existing demo CSS generation script; page styling stays intact. Production has no Aceternity external logo: WnW paw icon links to About.

Test: desktop/mobile cross-route presence, no duplicate dock, internal navigation without document reload, hover dimensions and neighbor falloff, exact tray/item sizes and light/dark colors, tooltip/keyboard/Escape, reduced motion, modified-click preservation, cn override, no overflow/consoleerrors, existing website flows. Screenshots under .impeccable/review/shared-dock/.

Finish: reviewer disposition ship after nine settled light/dark/hover/reduced/mobile/tablet captures. Typecheck/lint/build pass;14 existing website groups and5 dedicated dock groups pass after favicon console fix. Dedicated detector returns no warnings or advisories. No per-rule suppression was added for the component.
