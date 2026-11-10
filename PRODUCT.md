# Woof N’ Whiskers

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

A Vietnamese/English pet shop and care website for Woof N’ Whiskers in Đà Nẵng. Visitors browse products and daycare, overnight boarding and grooming services, submit booking requests, manage pet profiles and walk through checkout.

## Capabilities and Constraints

The existing React 19, Vite and React Router implementation stores demo accounts, pets, bookings, carts and orders in localStorage. Email delivery, live payment processing and server persistence are not connected. Maintain these working interactions when applying the supplied designs.

Business information is owned by `src/data/data.js` and the project specification `Instruction/codex-woofnwhiskers.md`. Hours, inventory, policies, images and products marked as demo remain illustrative and require shop confirmation. Do not promote claims invented in reference mockups into factual business promises.

## Brand Commitments

The user explicitly selected every existing template, theme and page design in Stitch project `17480892489591456143` for application to this checkout. Use the actual page templates as the visual reference. Keep the Woof N’ Whiskers name and the existing bilingual content and interactions. Duplicate PawHouse and older Woof N’ Whiskers screens are alternative versions of the same pages, rather than additional public routes.

## Evidence on Hand

- User-selected Stitch templates: `design/stitch/manifest.json` and adjacent raw HTML/Markdown exports.
- Source image provenance: `design/stitch/assets.json`.
- Existing specification: `Instruction/codex-woofnwhiskers.md`.
- Current React routes and demo functionality: `src/App.jsx` and `src/context/AppContext.jsx`.

## Homepage reference override

The user subsequently selected `Demo/stitch_petshop_design_system (2)/code-animated.html` as the homepage design authority. This replaces the earlier Stitch homepage composition only; other routes continue to use their existing Stitch adaptations.

## Shared navigation reference

The user explicitly selected the supplied Aceternity Floating Dock source as the primary navigation for every route. Use the source component’s Tailwind v4 utilities and Motion defaults, with WnW routes and reduced-motion support. This supersedes the old primary header navigation and homepage-only dock, while retaining the current page visual systems and functional header utilities.
