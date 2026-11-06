# Flash Sale product cards

The four cards in `code-animated.html` (`#flash-products`) now adapt the local reference `components/ui/product-card-1663178758/index.html` and its `css/style.css`.

Design details retained: orange-to-red gradient header, 252px header height, 25px corners, oversized translucent background lettering, product image crossing into the white card body, compact product details, green discount badges and a green price tag extending slightly beyond the body.

Adaptations for this page:

- Scoped styles in `assets/product-card.css`; reference body, wildcard reset, fixed container width and 1000px left margin are not applied to the webpage.
- WnW paw/wordmark replaces the Nike logo; current pet-product photos and brand/category labels replace the shoe. The bed photo retains its scene treatment. Other product photos sit on small white rounded image surfaces to preserve their original colors; unlike the transparent shoe asset, these are existing product photos with backgrounds.
- Existing titles, brands, discounts, prices, ratings, review counts and working cart buttons remain. Unsupported shoe sizes and color options are omitted rather than introducing pet-product inventory variants.
- Maintained the user's request for no black shadow under the cards. A fine neutral outline defines the white card surface instead of the reference's hard black shadow.
- Price and discount text use dark green on the reference's bright green background for readability.
- Responsive cards replace the reference's fixed-position page layout. Card body height grows to fit Vietnamese text. Price tags stay within mobile viewport bounds.
- Small image hover movement respects reduced motion; keyboard focus stays visible. Existing Material Symbols supply icons without loading the reference's additional Font Awesome font.
- Bio-Groom retains its reference-image note; exact-variant limitations and image provenance are listed in `assets/products/SOURCES.md`.

No new runtime dependency is needed. The Floating Dock React island is unchanged. `node scripts/check-cards.mjs` checks design structure, images, cart behavior and desktop/mobile rendering.
