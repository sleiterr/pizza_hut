# Pizza Hut Monorepo

This repository is a pnpm workspace with two main apps:

- `apps/web` - Next.js customer-facing website
- `apps/studio` - Sanity Studio for content management

## Stack

- Next.js 16
- React 19
- TypeScript
- Sanity Studio 5
- styled-components
- pnpm workspaces

## Workspace layout

The workspace command scripts live in `apps/package.json`.

That means:

- running commands from `pizza_hut/pizza_hut` will fail (no root `package.json` there)
- run workspace-level commands from `pizza_hut/pizza_hut/apps`
- run app-level commands from `apps/web` or `apps/studio`

## Requirements

- Node.js `>=20`
- pnpm `>=10`

Check versions:

```bash
node -v
pnpm -v
```

## Install

From the workspace root:

```bash
cd /Users/Oleg/Next/pizza_hut/pizza_hut/apps
pnpm install
```

## Run in development

### Run both apps together

```bash
cd /Users/Oleg/Next/pizza_hut/pizza_hut/apps
pnpm run dev
```

Expected:

- web at `http://localhost:3000`
- studio at `http://localhost:3333`

### Run web only

```bash
cd /Users/Oleg/Next/pizza_hut/pizza_hut/apps/web
pnpm run dev
```

### Run studio only

```bash
cd /Users/Oleg/Next/pizza_hut/pizza_hut/apps/studio
pnpm run dev
```

## Common port issue

If you see `Another next dev server is already running`, clear active processes and restart:

```bash
lsof -ti:3000,3333 | xargs kill -9 2>/dev/null
```

Then run dev again.

## Project structure (folders + key files)

```text
pizza_hut/
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── apps/
    ├── package.json                      # workspace scripts (parallel dev/build)
    ├── package-lock.json
    ├── web/
    │   ├── .env
    │   ├── .env.local
    │   ├── package.json
    │   ├── next.config.ts
    │   ├── tsconfig.json
    │   ├── eslint.config.mjs
    │   ├── postcss.config.mjs
    │   ├── public/
    │   │   ├── appImage/
    │   │   ├── background/
    │   │   ├── feedback/
    │   │   ├── footer/
    │   │   ├── heroGallery/
    │   │   ├── icons/
    │   │   └── logo/
    │   └── src/
    │       ├── app/
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   ├── cart/page.tsx
    │       │   ├── confirmation/page.tsx
    │       │   └── api/
    │       │       ├── draft-mode/
    │       │       ├── newsletter/
    │       │       └── reservation/
    │       ├── components/
    │       │   ├── AppSection/
    │       │   ├── Booking/
    │       │   ├── Button/
    │       │   ├── DiscoverMenu/
    │       │   ├── FeaturedAbout/
    │       │   ├── FeaturedDishes/
    │       │   ├── Feedbacks/
    │       │   ├── Footer/
    │       │   ├── Header/
    │       │   ├── Hero/
    │       │   ├── HeroGallery/
    │       │   ├── MenuCategory/
    │       │   ├── News/
    │       │   ├── OurTeam/
    │       │   ├── Pagination/
    │       │   └── Section/
    │       ├── hooks/
    │       │   ├── useCart.js
    │       │   └── useFavorites.js
    │       ├── sanity/
    │       │   ├── client.ts
    │       │   ├── fetchers.ts
    │       │   ├── image.ts
    │       │   ├── live.ts
    │       │   ├── queries.ts
    │       │   └── types.ts
    │       ├── styles/
    │       │   ├── fonts.css
    │       │   ├── globals.css
    │       │   ├── theme.css
    │       │   └── variables.css
    │       ├── types/
    │       │   └── mailchimp.d.ts
    │       └── utils/
    │           ├── localStorage.js
    │           ├── mailchimp.ts
    │           └── supabase.ts
    └── studio/
        ├── .env
        ├── package.json
        ├── sanity.cli.ts
        ├── sanity.config.ts
        ├── schema.json
        ├── tsconfig.json
        ├── eslint.config.mjs
        ├── config/
        │   ├── presentation.ts
        │   └── structure.ts
        ├── presentation/
        │   └── resolve.ts
        ├── schemaTypes/
        │   ├── index.ts
        │   ├── homePageType.ts
        │   ├── menuType.ts
        │   ├── productType.ts
        │   ├── categoryType.ts
        │   └── reservationsType.ts
        └── static/
```

## Build

Run both apps build from workspace root:

```bash
cd /Users/Oleg/Next/pizza_hut/pizza_hut/apps
pnpm run build
```

Run web build only:

```bash
cd /Users/Oleg/Next/pizza_hut/pizza_hut/apps/web
pnpm run build
pnpm run start
```

## Should studio be included in structure?

Yes. This is the right approach for this project.

Even if the current file is inside `apps/web`, the actual development flow depends on both `web` and `studio`, so documenting both now saves time and confusion later.
