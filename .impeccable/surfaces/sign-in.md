# Sign-in and registration

Mode: Operate. Route: `/tai-khoan/` while signed out.

The user's supplied sign-in reference supersedes the previous Stitch auth layout for this surface: a white vertical rail on the left, a floating white form spanning the rail and photograph, and brand copy on a darkened, blurred image on the right. Preserve the site's blue actions, brown brand identity and Be Vietnam Pro typography.

Implementation: `src/pages/Account/SignInTemplate.jsx` and `src/styles/sign-in.css`. The existing `Account.jsx` owns account validation, local demo persistence and authenticated account views. On phones, the brand story sits above the form, which overlaps the photograph's lower edge. Keep visible field labels and validation, password visibility controls, VI/EN, registration switching and the demo password notice.

Use the existing illustrative `hero-2.webp`, with an illustration caption. Sign-in help links to the contact page. Social authentication and password reset services are not connected; do not show controls that imply these services work.

Verified at 1440, 768 and 390 px, plus English registration on mobile. Functional checks cover validation, password visibility, registration, logout, failed and successful login, and persistence across reload.
