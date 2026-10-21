# Ivory Smart Home — Concept 1: "The Villa Walkthrough"

A bilingual (English / Arabic) website for Ivory Smart Home, a smart home and building automation
integrator in Ras Al Khaimah. The homepage is one scroll journey through a smart villa from dawn to
night; the page's light changes as you walk room by room.

Built with Next.js 15 (App Router) and TypeScript, CSS Modules with CSS variables, GSAP + ScrollTrigger,
Lenis and Framer Motion. No UI kit, no Tailwind.

---

## Install and run

Requires Node.js 18.18 or newer (20 LTS recommended).

```bash
npm install        # install dependencies
npm run dev        # development server on http://localhost:3000
npm run build      # production build (type-checks and prerenders all 44 pages)
npm start          # serve the production build
npm run typecheck  # TypeScript only
```

Visiting `/` redirects to `/en`, or to `/ar` when the browser prefers Arabic.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project**, import the repository and click **Deploy**. No settings are needed;
   Vercel detects Next.js automatically.
3. Optional: under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the live domain
   (default `https://ivorysmarthome.com`). It is used for canonical URLs, hreflang, Open Graph and the sitemap.
4. Leads from the forms appear in **Vercel → Project → Logs** (search for `[lead]`) until email/CRM is connected.

Fonts are self-hosted from `app/fonts/` through `next/font`, so builds never depend on Google Fonts.

## Where to edit content

All copy, numbers, projects, testimonials, brands and contact details live in two files that share one
TypeScript interface:

| File | What it holds |
| --- | --- |
| `content/en.ts` | All English content |
| `content/ar.ts` | All Arabic content (reuses English long paragraphs with an "AR pending" marker) |
| `content/types.ts` | The shared shape; TypeScript tells you if Arabic is missing a field |
| `content/PLACEHOLDERS.md` | Every invented value that must be confirmed before launch |

Helpers used inside the content files (`content/helpers.ts`):

- `tbc("…")` — invented content. Renders with a dotted underline and a "To be confirmed" tooltip.
  When confirmed, replace `tbc("value")` with `"value"`.
- `arPending(…)` (aliased `P(…)` in `ar.ts`) — English text left on the Arabic site until translated.
  Replace with the Arabic string when ready.

### Common edits

- **Phone, email, address, WhatsApp number**: `contact` in both content files.
- **Rooms in the walkthrough** (name, time, light, moment, systems): `rooms`.
- **The eight systems** and their solution pages: `systems` (Curtains & Shades and Smart Lighting & Scenes are
  fully written; the others use shorter content).
- **Projects**: `projects`. Add or remove entries freely; pages and the sitemap are generated from the list.
- **Care plans, testimonials, brands, protocols**: `carePlans`, `testimonials`, `brands`, `protocols`.
- **Photos**: put files in `public/images/` and add `src: "/images/your-photo.jpg"` to the matching image
  (`cover`, `gallery`, `home.why.image`). Without `src` a tonal placeholder panel is shown.

## Connecting leads to email or a CRM

All forms (Planner, Contact, Care Plans health check, Professionals) post JSON to `app/api/lead/route.ts`.
It currently logs the payload. The `TODO` in that file marks where to send an email (e.g. Resend or Postmark)
or create a CRM record. Keep API keys in Vercel environment variables.

The Planner's **Send to Ivory on WhatsApp** button opens `wa.me/971566922452` with a neat summary of every answer.
The floating WhatsApp button pre-fills a message naming the current page, room or system.

## Project map

```
app/
  [locale]/               en and ar routes (layout sets lang and dir="rtl")
    page.tsx              Home: the walkthrough and sections c–k
    solutions/            Index and /solutions/[slug] system pages
    projects/             Filterable grid and /projects/[slug] case studies
    care-plans/ professionals/ planner/ contact/
    template.tsx          Page transition ("lights dimming")
    opengraph-image.tsx   Social card
  api/lead/route.ts       Lead endpoint
  sitemap.ts robots.ts    SEO (hreflang alternates in sitemap and metadata)
components/
  home/                   Hero, walkthrough, room indicator, homepage sections
  rooms/RoomArt.tsx       The six animated line-art interiors
  planner/                Planner context, steps and the house that lights up
  page/                   Inner-page building blocks (hero, CTA, FAQ, forms, diagram)
  FloorPlanMenu.tsx       Full-screen floor-plan navigation
content/                  All copy (see above)
lib/                      i18n, SEO, light tokens, WhatsApp and scroll helpers
middleware.ts             Redirects / to the visitor's language
```

## Motion and accessibility

- **Desktop (900px and wider)**: the hero pins while the villa doors open; the six rooms then scroll
  horizontally in one pinned stage, and the page light interpolates dawn → noon → golden → dusk → night.
  In Arabic the horizontal direction is reversed.
- **Phones**: rooms stack vertically, each in its own light, for performance.
- **`prefers-reduced-motion`**: no pinning, no scrubbing, no smooth scrolling; simple fades and normal vertical scroll.
- Content is never hidden without JavaScript. Menus, tabs-like filters, the FAQ and the Planner are keyboard-usable,
  with visible focus states. The floor-plan menu traps focus and closes with Escape.

## Notes for the team lead

- The rooms run Entrance (6:30 AM) → Kitchen (1:00 PM) → Living & Majlis (7:00 PM) → Bedroom (10:30 PM) →
  Outdoor & Security → Whole home at night, so the light really moves from dawn to night. The brief listed the
  living room before the kitchen; swap the two entries in `rooms` to restore that order (the light will then
  jump from evening back to noon).
