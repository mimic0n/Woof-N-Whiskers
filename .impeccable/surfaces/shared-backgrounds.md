# Shared page backgrounds

Mode: Operate for shopping, booking, account and checkout; Read for policy, FAQ and articles; Persuade for About and Services.

The user explicitly extended the approved homepage background effects to every route. This supersedes the earlier background-only restriction to the homepage, while preserving each route's layout, content and interactions.

`src/components/site/RouteBackground.jsx` maps routes to the shared BackgroundScene palette: ivory/cream for editorial and fallback pages, honey for shopping/search/cart, warm cream for services, and quiet blue for booking/account/contact/checkout. Every non-home route receives a clipped decorative layer, a secondary curved color band, a white-to-page entry seam, a curved footer seam and sparse paw/ball/collar motifs. Existing white task panels stay opaque; reading panels use warm white. Background elements are aria-hidden and pointer-events none. The homepage retains its section-specific scenes.

Shared styling is loaded globally from `src/main.jsx`, so direct deep links have the same backgrounds as internal navigation. `src/styles/home-backgrounds.css` supplies common scenery; `src/styles/route-backgrounds.css` owns route-only adaptations. `useBackgroundMotion` retains offscreen/hidden-tab pauses, scroll response, mobile limits and live reduced-motion handling. Do not animate foreground forms, reposition page controls or clip focus/hover effects as part of background work.

## Supplied logo palette

The user subsequently supplied `public/assets/Logo/Woof-N-Whiskey-Pet-Logo-1400x700.png` and requested its application and surrounding color alignment. `BrandLogo.jsx` displays this exact artwork in header/footer with a CSS viewport around its existing blank margins; the source PNG is unchanged. Preserve the supplied artwork wording. This request changes visual identity assets and colors, not the business data or page copy. Blue #3872C9, brown #8A5E37, honey #F9C36A and cream #FBF3E0 anchor the shared tokens. `src/styles/brand.css` aligns the header, footer, navigation accents, primary homepage actions and Flash Sale surfaces. The footer wave shares the cream footer token. Navigation tray remains white and success/error colors retain their meaning.

## Expanded walking paws

The user requested more animated footprints across webpages. `WalkingPaws.jsx` adds two six-print trails per decorated homepage scene and five trails distributed down each non-home route. Each trail observes its own visibility, pauses offscreen/in hidden tabs, and responds to scroll through the shared background hook. Prints appear in sequence and drift along a short path over eight seconds. Mobile shows only two four-print trails, with 3–4px movement over eleven seconds. Reduced motion keeps static footprints. All trails stay within the clipped aria-hidden background layer and cannot intercept interactions.
