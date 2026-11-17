# HANDOFF — cubbyz-site (2026-11-17)

## What this is
The cubbyz.com landing page (marketing site for the Cubbyz trustless commerce /
escrow product). Single static page; the Telegram CTA is intentionally not wired yet.

## Stack
- Next.js 15.5.21, App Router (`app/layout.tsx`, `app/page.tsx`)
- React 19.1.0, TypeScript 5.9.2
- npm (`package-lock.json`, written by npm 11; use npm 11 to avoid `libc` field churn)
- Security headers in `vercel.json` (no CSP)

## Deploy target
Vercel project `cubbyz-site`, serving cubbyz.com. Deploys from `main`.

## This change (branch `add-vercel-analytics`)
- Added `@vercel/analytics` ^2.0.1 (package.json, package-lock.json)
- `app/layout.tsx`: `import { Analytics } from "@vercel/analytics/next"` and `<Analytics />` rendered just before `</body>`
- `npm run build` passes (Next 15.5.21, 4 static pages)
- PR: https://github.com/ill-ion/cubbyz-site/pull/1 (not merged)

## Next steps
1. Review and merge the PR to `main`; Vercel deploys automatically.
2. In the Vercel dashboard, project `cubbyz-site` -> Analytics -> enable Web Analytics if not already enabled.
3. Visit https://cubbyz.com to register the first page view, then confirm it appears in the Analytics tab.

## Notes
- `npm audit` reports 4 pre-existing vulnerabilities: `next` 15.5.21 (critical, range covers up to 16.3.0-preview), plus `postcss`, `sharp`, `source-map-js` (high). Not touched in this change; worth a separate look, starting with the Next.js advisory.
