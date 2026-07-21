# CLAUDE.md

Guidance for working in this repository.

## What this is

Marketing website for **PraxisFlow** — an agency that builds secure legal automation and
private infrastructure for law firms. It's a Next.js App Router site with a Strapi 5–backed
blog, lead-capture forms wired to n8n + email, and marketing/analytics tracking. Production
domain: `https://www.praxisflow.com`.

Package name is `praxisflow-automations`.

## Stack

- **Next.js 16** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** with `@tailwindcss/typography` and `tailwindcss-animate`; HSL CSS
  variables for theming (`hsl(var(--foreground))`, `--accent`, `--card`, `--border`, etc.)
- **Strapi 5** headless CMS for the blog (posts, authors, SEO, comments)
- **@strapi/blocks-react-renderer** to render post body content
- **Resend** for transactional email; **n8n** webhooks as the primary lead pipeline
- UI built from Radix primitives + custom "magic UI"–style animated components
  (framer-motion / motion)
- Analytics: Vercel Analytics + Speed Insights, Google Analytics (`@next/third-parties`),
  Meta Pixel, and Chatwoot live chat. Deployed on Vercel.

## Commands

```bash
pnpm dev      # local dev server
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # next lint
```

Use **pnpm** (there is a `pnpm-lock.yaml`).

## Folder structure

- **`app/`** — routes (App Router)
  - Marketing pages: `about/`, `pricing/`, `integrations/`, `security/`, `contact/`,
    `case-studies/` (+ `[id]/`), `privacy-policy/`, `terms-of-use/`
  - `blog/` — `page.tsx` (list) and `[slug]/page.tsx` (single post)
  - `api/` — route handlers: `contact/`, `newsletter/`, `preview/` (Strapi draft mode)
  - SEO/infra: `layout.tsx` (root), `sitemap.ts`, `robots.ts`, `not-found.tsx`, `globals.css`
  - Some pages use a colocated `layout.tsx` purely to attach per-route metadata
- **`components/`**
  - `sections/` — page sections (`Hero`, `Services`, `Process`, `Pricing`, `Security`,
    `ContactForm`, `CommentsSection`, `Integrations`, FAQ sections, `CTA`, etc.)
  - `ui/` — reusable primitives + animated components (`Navbar`, `Footer`, `button`,
    `badge`, `fade-in`, `dot-pattern`, `magic-card`, `marquee`, `bento-grid`,
    `newsletter-form`, `animated-beam`, `shimmer-button`, `scroll-progress`, …)
  - `seo/` — `JsonLd.tsx`, `MetaPixel.tsx`
- **`lib/`** — `strapi.ts` (CMS client), `fpixel.ts` (Meta Pixel helpers),
  `integrations-data.ts`, `successCases.ts`, `utils.ts` (`cn` class-merge helper)
- **`types/`** — global + pixel type declarations
- **`public/`** — logos, favicons, OG images, and a large set of `*-integration.svg` icons

## Environment variables

Stored in `.env.local` (not committed). Known keys:

- `NEXT_PUBLIC_STRAPI_API_URL` — Strapi base URL (also used **client-side** by comments)
- `STRAPI_API_TOKEN` — Strapi bearer token (server-side reads)
- `PREVIEW_SECRET` — guards the `/api/preview` draft-mode entry point
- `RESEND_API_KEY` — transactional email
- `N8N_WEBHOOK_URL` — primary contact-form lead pipeline
- `N8N_NEWSLETTER_WEBHOOK` — newsletter signup pipeline
- `NEXT_PUBLIC_GA_ID` — Google Analytics

## Strapi integration

- **Client** (`lib/strapi.ts`): single `fetchAPI(path, urlParamsObject, options)` helper.
  Reads `NEXT_PUBLIC_STRAPI_API_URL` + `STRAPI_API_TOKEN` (bearer), serializes params with
  `qs`, calls `${STRAPI_URL}/api${path}`, throws on non-OK. Callers pass Next caching hints
  through `options` (`next.revalidate`, `cache`).
- **Strapi 5 conventions**: relations use `documentId` (alphanumeric), not numeric `id`.
  Content-type is `api::post.post`. Posts have `title`, `slug`, `content` (blocks),
  `coverImage`, `author`, `publishDate`, `description`, and an `seo` component
  (`metaTitle`, `metaDescription`, `canonicalURL`, `keywords`, `metaImage`).
- **Draft/preview**: `/api/preview?secret=…&url=…` validates `PREVIEW_SECRET`, enables
  Next `draftMode()`, and redirects. The single-post page reads `draftMode()` and, when on,
  fetches `status: "draft"` with `cache: "no-store"`.
- **Comments** use the Strapi Comments plugin, called **directly from the browser** at
  `${NEXT_PUBLIC_STRAPI_API_URL}/api/comments/api::post.post:${documentId}`. Supports nested
  replies via `threadOf` and moderation via `approvalStatus` (only `APPROVED`/null shown).
  The email field is for moderation only and is not published.

## Blog rendering

- **List** (`app/blog/page.tsx`): `force-dynamic`, fetches `/posts` populating
  `coverImage` + `author`, sorted `publishDate:desc`, 60s ISR revalidate. Card grid; on
  fetch failure it swallows the error and renders an empty state.
- **Single post** (`app/blog/[slug]/page.tsx`): `force-dynamic`. `params` is a `Promise`
  (Next 16) and must be awaited. `generateMetadata` builds title/description/canonical/OG/
  Twitter with tiered fallbacks (SEO component → post field → site default; metaImage →
  coverImage → `/og-image.webp`). Body rendered with `<BlocksRenderer content={post.content} />`
  inside a Tailwind `prose` wrapper. Missing post → `notFound()`. Comments rendered below.
- **Pagination / filtering / search** (list page): all driven by URL search params
  (`?page=`, `?category=`, `?q=`) read by the `app/blog/page.tsx` server component. State
  lives in the URL — shareable, SEO-friendly, no client data fetching.
  - **Pagination**: 6 per page (`PAGE_SIZE`), via Strapi `pagination[page]`/`pageSize`;
    trusts the returned `meta.pagination.page`/`pageCount` (Strapi clamps out-of-range).
    Controls in `components/ui/blog-pagination.tsx` — a pure server component of `<Link>`s
    (Prev/Next + numbered with `…` ellipsis; page 1 links to bare `/blog` for clean
    canonical; `aria-current` on active). It hides itself when `pageCount <= 1`, so with
    few posts locally you won't see it — lower `PAGE_SIZE` or add posts to test.
  - **Category**: the Strapi `category` field is a **multi-select enum** returned as a
    string array (e.g. `["Legal Automation"]`). Filter with **`$containsi`** (substring) —
    `$eq`/`$in` do NOT match the array. Categories are derived dynamically from published
    posts in `lib/blog-categories.ts` (`getBlogCategories`, self-maintains, no hardcoded
    enum); display names are slugified for the URL and resolved back to the exact name.
  - **Search**: `?q=` maps to `filters[title][$containsi]` — title only, since posts have
    no top-level `description` field. Category + search combine as an AND filter.
  - **UI**: `components/sections/BlogFilters.tsx` (client) renders the debounced search
    box + category chips, pushing param changes via `next/navigation` and resetting to
    page 1 on any change. Pagination links preserve the active `category`/`q`. A filtered
    empty result shows a distinct "No matching posts" state vs. the backend-error state.
    Entrance is animated with framer-motion matching `FadeIn` (fade up y:20, easeInOut
    0.5s) with staggered pills and `whileHover`/`whileTap` scale; it plays once on load
    (the component stays mounted across filter clicks).

## Forms & lead pipelines

- **Contact** (`app/api/contact/route.ts`): honeypot (`fax` field) → validate → POST to
  `N8N_WEBHOOK_URL` (primary), then always send a Resend notification email to
  `contact@praxisflow.com` (subject flags whether n8n succeeded, so no lead is lost).
- **Newsletter** (`app/api/newsletter/route.ts`): honeypot + email regex → forward to
  `N8N_NEWSLETTER_WEBHOOK`. Non-fatal if the webhook is unset/fails.

## SEO & analytics

- Rich metadata in `app/layout.tsx` (title template `%s | PraxisFlow`, OG/Twitter,
  icons, robots) and per-page `metadata` exports.
- `components/seo/JsonLd.tsx` injects structured data; `MetaPixel.tsx` (wrapped in
  `<Suspense>` in the layout to avoid CSR-bailout breaking the static 404) tracks pageviews
  across client navigations. Meta Pixel helpers live in `lib/fpixel.ts` (`pageview`,
  `event`, `customEvent`). GA and Chatwoot are loaded in the root layout.

## Conventions & gotchas

- **Tabs** for indentation (match existing files). Path alias `@/*` maps to the repo root.
- Blog/single-post pages are `force-dynamic`; be intentional about caching when editing.
- Images use plain `<img>` (not `next/image`) and `next.config.js` is currently empty (no
  `images.remotePatterns`), so Strapi image URLs are used raw. If you introduce `next/image`
  for remote images, add the Strapi host to `images.remotePatterns` first.
- Strapi fetches are wrapped in try/catch that degrade gracefully (empty list / `notFound`)
  rather than throwing to the user — preserve that resilience.
- Theme colors come from CSS variables; prefer `hsl(var(--token))` / Tailwind semantic
  classes (`text-foreground`, `bg-card`, `border-border`, `text-accent`) over hardcoded hex.
