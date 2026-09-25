# Pizza Hut Web

The customer-facing Pizza Hut website built with Next.js. The application provides menu browsing, product discovery, cart and checkout flows, reservations, newsletter signup, and a support contact form.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Formik and Yup
- Zustand
- Sanity
- Supabase
- Resend

## Requirements

- Node.js `>=20`
- pnpm `>=10`

The shared workspace is installed from the repository root:

```bash
cd ../..
pnpm install
```

## Environment Variables

Create a local environment file in `apps/web` and configure the services used by the application. Do not commit `.env` or `.env.local` files.

The application uses variables for:

- Sanity project and dataset configuration
- Supabase URL and public client key
- Supabase server service-role key for protected API routes
- Resend API key for transactional email
- Mailchimp configuration for newsletter subscriptions
- Next.js draft mode and presentation URLs

Use the variable names already referenced in the source and keep server-only secrets, such as `SUPABASE_SERVICE_ROLE_KEY`, unprefixed with `NEXT_PUBLIC_`.

## Development

Run the web application from this directory:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The development server uses webpack. If port `3000` is already in use, stop the existing Next.js process before restarting.

## Scripts

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `pnpm run dev`   | Start the Next.js development server.       |
| `pnpm run lint`  | Run ESLint.                                 |
| `pnpm run build` | Create a production build.                  |
| `pnpm run start` | Start the production server after building. |

## Main Features

- Homepage sections powered by Sanity content.
- Menu categories, product details, favorites, and pagination.
- Persistent cart state with checkout and order confirmation.
- Courier and pickup delivery flows.
- Card, cash, and Apple Pay or Google Pay checkout options.
- Reservation form and newsletter subscription API routes.
- Support form with Supabase message storage and Resend email notifications.
- Sanity Presentation Tool and draft mode integration.

## Project Structure

```text
apps/web/
├── public/                  # static images, icons, and brand assets
├── src/
│   ├── app/                  # routes, pages, layouts, and API handlers
│   ├── components/          # reusable UI and feature components
│   ├── hooks/                # client-side hooks
│   ├── sanity/               # Sanity client, queries, images, and types
│   ├── store/                # Zustand stores
│   ├── styles/               # global styles and theme variables
│   ├── types/                # shared TypeScript declarations
│   └── utils/                # integrations and shared helpers
├── next.config.ts
├── package.json
└── tsconfig.json
```

## API Routes

API handlers are located in `src/app/api` and include:

- `draft-mode` - enable and disable Sanity draft mode.
- `newsletter` - subscribe users to the newsletter.
- `reservation` - create reservation requests.
- `send-contact-message` - save support messages and send notifications.
- `send-order-email` - send order confirmation emails.

## Production Build

Build and run the production application locally:

```bash
pnpm run build
pnpm run start
```

For deployment, configure all required environment variables in the hosting provider. Vercel should use `apps/web` as the project root when deploying this application from the monorepo.

## Related Documentation

See the repository [README](../../README.md) for workspace-level commands and the relationship between the web application and Sanity Studio.
