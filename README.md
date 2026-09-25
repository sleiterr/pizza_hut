<a id="readme-top"></a>

# Pizza Hut

Pizza Hut is a pnpm monorepo containing the customer-facing web application and the Sanity Studio used to manage its content.

## Applications

- [`apps/web`](apps/web) - Next.js website with menu browsing, cart, checkout, reservations, newsletter signup, and support forms.
- [`apps/studio`](apps/studio) - Sanity Studio for managing menus, products, categories, homepage content, and reservations.

## Stack

- Next.js 16
- React 19
- TypeScript
- Sanity Studio 5
- Supabase
- Resend
- pnpm workspaces

## Requirements

- Node.js `>=20`
- pnpm `>=10`

Check the installed versions:

```bash
node -v
pnpm -v
```

## Installation

Install all workspace dependencies from the repository root:

```bash
pnpm install
```

Do not commit environment files or their secrets. Each application should have its own local environment configuration.

## Development

Run both applications in parallel from the `apps` workspace package:

```bash
cd apps
pnpm run dev
```

The applications are available at:

- Web: `http://localhost:3000`
- Studio: `http://localhost:3333`

Run one application independently:

```bash
cd apps/web
pnpm run dev
```

```bash
cd apps/studio
pnpm run dev
```

## Build

Build both applications:

```bash
cd apps
pnpm run build
```

Build an individual application:

```bash
cd apps/web
pnpm run build
```

```bash
cd apps/studio
pnpm run build
```

## Workspace Structure

```text
pizza_hut/
├── README.md
├── .gitignore
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── apps/
	├── package.json       # shared workspace commands
	├── web/               # Next.js customer-facing application
	└── studio/            # Sanity content management application
```

For application-specific setup, configuration, and deployment details, see the README inside the relevant application directory.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
