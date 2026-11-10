# Background effects for the current checkout

The user requested section color rhythm, organic peach/cream shapes, low curved section seams, animated paw trails, sparse toy-ball/collar motifs, slow visible-only drift and scroll response across the website.

Preserve the current `refix-home` composition and its real-image, product, booking, FAQ and contact content. It differs from the earlier demo homepage. `Home.jsx` assigns quiet blue to booking/contact, warm cream to About/care, honey to products/tips, and ivory/white to values/reviews/FAQ. `BackgroundScene` accepts an explicit preceding surface color for seamless transitions.

Non-home routes use `RouteBackground` through the shared Layout, with editorial, shopping, care and task-specific palettes. Shared scenery CSS loads globally for direct route entry. Only the decorative layer clips; foreground focus, card effects and sticky layouts remain available.

`WalkingPaws` adds two trails per decorated homepage scene and five distributed trails per non-home route. Every trail uses the existing visibility/scroll hook, pauses offscreen/in hidden tabs and becomes static with reduced motion. Mobile uses two four-print trails with short 3–4px travel and an eleven-second cycle. Larger curves drift over 24–36 seconds. All background artwork is aria-hidden and noninteractive.

Validation: lint/typecheck/build; 30 existing bilingual static route checks; 60 browser route/locale/viewport combinations plus visibility, pause, reduced-motion and mobile footprint checks in `tests/background-effects.spec.js`. Screenshots reviewed at 1440px and 320px.

## Supplied logo

The user supplied `public/assets/logo/Woof-N-Whiskey-Pet-Logo-1400x700.png`. Header and footer use this exact unchanged image through `BrandLogo.jsx`, with a responsive CSS viewport around the existing blank margin. Palette tokens now align to its blue #3872C9, brown #8A5E37, honey #F9C36A and cream #FBF3E0. `brand.css` aligns header/footer surrounds and primary controls; the curved footer seam follows the shared cream footer token. Existing photos, factual business copy and section motion remain intact. The navigation tray stays white.
