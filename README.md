# HawaiAdda

A cinematic travel experience built with React 18, strict TypeScript, Vite, Tailwind, shadcn-compatible primitives, Three.js, GSAP, React Hook Form and Zod.

## Local preview

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:5173. Validate with `npm run build` and `npm run lint`.

## Experience

- Coastal horizon hero with atmosphere, scroll parallax, pause control and reduced-motion support.
- Responsive booking console for flights, hotels, trains, buses, cabs and holidays. Flights support return, one-way and multiple legs; hotel searches support rooms and guests.
- Destination collection and detail URLs, interactive globe with keyboard-accessible destination alternatives, mood discovery, editorial stories, hotels and holiday inspiration.
- Service, company and support URLs render independently. Deployment must rewrite unknown application paths to `index.html` for client routing.
- Dark editorial design, accessible navigation and forms, optimized responsive images and separately bundled WebGL modules.

## Structure

- `src/components/ui`: shadcn-compatible components, images and horizon hero.
- `src/components/animations`: GSAP reveals and the Three.js horizon scene.
- `src/components/travel`: search, globe, progress and assistant.
- `src/components/sections`: reusable homepage experiences.
- `src/components/pages`: route-specific frontend views.
- `src/data`: typed destination, image and editorial inventories.
- `src/services/travel-api.ts`: provider integration boundary.

## Website enquiry setup

The enquiry form posts to `public/api/enquiry.php`, which verifies a Google Apps Script save before displaying success. Configure and deploy it using [the Google Sheets setup guide](integrations/google-sheets/SETUP.md). The target spreadsheet is preselected in `integrations/google-sheets/Code.gs`. PHP with cURL and a private server configuration are required. WhatsApp opens a prefilled message for the visitor to send. The connection requires deployment and has not been verified live.

## Integration status

This is a frontend experience, not a live booking system. All prices are indicative. Search validates input and returns a preview acknowledgement, never invented inventory. Authentication, payments, supplier inventory, support operations and newsletter subscriptions are not connected. The assistant explicitly indicates that no AI service is connected. Company/support/social pages communicate their availability without invented contacts or partner claims.

Replace the service boundary with authenticated server endpoints before enabling bookings. Secrets must remain on the server; Vite client environment variables are public. Unsplash photography and Google Fonts require network access.

## Verification

Production build and ESLint pass. Browser checks cover 320px and 390px mobile widths, desktop rendering, hotel/flight field switching, required field feedback, flight search acknowledgement, mobile navigation, globe destination selection and destination detail routing. WebGL resources and observers are disposed on unmount; continuous globe rendering pauses off-screen, on hidden tabs, on manual pause and under reduced motion.
