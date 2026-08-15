# Agents

Instructions for assisting developers on the Sephduema Store.

## Project

E-commerce platform (Next.js 16 App Router, React 19, TypeScript strict, Sass) with a public shop and an admin dashboard. Package manager is **pnpm**. `@/*` maps to `src/*`.

## Setup

1. Read `TODO.md` always
2. Check for SKILLS.md files in `.github/skills`
3. Be less chatty

## Skills

- `scss-conventions` — all SCSS/styling work (plain `.scss`, `styles/` folder, one file per component)
- `frontend-design` — visual direction for new or reshaped UI
- `web-design-guidelines` — UI/UX audits ("review my UI")
- `nextjs-app-router-patterns` — App Router patterns, SSR/SSG, streaming, parallel routes, data fetching
- `nextjs-developer` — route handlers, middleware, server actions, `generateMetadata`, loading/error boundaries, deployment
- `nextjs-turbopack` — Next.js 16+/Turbopack bundling, dev speed, Turbopack vs webpack
- `ui-ux-pro-max` — UI/UX design intelligence: styles, palettes, typography, motion, a11y

## Instructions

1. Don't install any packages without permission, state why you need it
2. Don't run git commands
3. Stick to my command don't do anything not asked of
4. Rate my initial implementation over a 5 first
5. Don't read any .env file
6. Drop suggestion

## Commands

- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm lint` — ESLint
- No test suite configured

Run `pnpm lint` (and `pnpm build` when practical) to verify work before finishing.

## Code Style

1. Make use of DRY
2. Make sure logic are not mixed with UI, and if they are suggest refactor
3. camelCase naming convention for functions
4. Types derived from zod schemas via `z.infer` (in `src/schemas`), never duplicated
5. Suffix files by purpose: `*.store.ts`, `*.schema.ts`, `*.type.ts`
6. Styles follow `.github/skills/scss-conventions` — no CSS Modules

## Gotchas

- Firebase image URLs need `images.remotePatterns` in `next.config.ts` (not yet configured)