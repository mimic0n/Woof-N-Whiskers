# Intro cutouts

Four original, transparent SVG illustrations created for the WnW intro, rather than photographs of the shop. Keep the “Ảnh minh họa / Illustrations” caption while these are in use.

To use shop-owned photography, export transparent WebP files named `dog.webp`, `cat.webp`, `grooming.webp` and `shop.webp` here. Aim for 700–900 px, centered subjects with about 10% breathing room, at most 80 KB per file and 500 KB combined. Change the image URL extension in `src/components/home/Intro.jsx` and its width/height attributes if needed. Verify the cutout proportions on mobile. Only remove the illustration caption after confirming the images are actual shop photographs with permission to use them.

The four SVG assets total about 5 KB. They are requested with low priority; the animation waits up to 1.5 seconds for the first two images to decode and skips on failure or timeout.

Timing lives in `src/components/home/intro-animation.js`: scenes last 1.9, 1.9, 1.9 and 1.7 seconds, with a 1-second sharp hold before each pull-back. The finale lasts 1.5 seconds and the curtain exit takes 0.8 seconds. Playback is 9.7 seconds, plus image preparation up to 1.5 seconds. This longer timing follows the user's request to leave more time to read each slide. Slow devices can miss frames; actual playback should be checked on target hardware.

Replay without DevTools by opening `/?intro=1` or clicking the floating “Xem lại intro / Replay intro” button on the homepage. This explicitly bypasses the session flag. Reduced motion, Save-Data and 2G still bypass animation, with a visible explanation on the replay URL. Blocked session storage skips normal automatic playback in production; explicit replay does not require reading the session flag. Normal hash deep links and direct visits to other routes also bypass the intro. An image failure or decode timeout before playback no longer marks the intro as watched, so a reload can retry it.

Eligibility is checked when React mounts the homepage, including navigation from another route. The pre-paint watchdog only releases the initial hidden page; it does not cancel intro eligibility on slow cold starts.

Automatic playback runs only once per session in both development and production. The floating replay button restarts the sequence in place, without a page reload or changing the URL. It remains above the mobile back-to-top control and away from the navigation dock. After manual replay, keyboard focus returns to this button. Motion and network preferences are respected; clicking replay explains any active restriction.

The intro uses the existing self-hosted Be Vietnam Pro fallback from the specification, with VI/EN strings in `src/i18n/vi.js` and `src/i18n/en.js`. Service names and prices come directly from the shared service data. No animation dependency or device-orientation permission is needed.
