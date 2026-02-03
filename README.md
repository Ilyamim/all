# BrightPath Volunteer

BrightPath Volunteer is a production-ready React + Vite platform for managing volunteer programs with role-based dashboards, QR check-ins, and premium retro-modern UI.

## Features

- **Roles**: volunteer, organizer, admin (admin enforced via UID allowlist)
- **Firebase**: Auth + Firestore + extendable Storage
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion with reduced-motion support
- **Testing**: Vitest + React Testing Library, Playwright E2E
- **Quality**: ESLint + Prettier

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file using the provided template:

```bash
cp .env.example .env
```

Fill in Firebase keys and admin allowlist:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_ADMIN_UIDS=uid1,uid2
```

### 3) Run the app

```bash
npm run dev
```

## Testing

### Unit tests (Vitest + RTL)

```bash
npm test
```

### E2E tests (Playwright)

Seed test data, then run Playwright:

```bash
npm run seed
npm run e2e
```

Playwright uses environment variables for login credentials:

```bash
E2E_ORGANIZER_EMAIL=organizer@example.com
E2E_ORGANIZER_PASSWORD=password123
E2E_VOLUNTEER_EMAIL=volunteer@example.com
E2E_VOLUNTEER_PASSWORD=password123
E2E_DEFAULT_PASSWORD=password123
```

## How to customize branding/colors

1. Update CSS variables in `src/styles/theme.css`.
2. Tailwind reads those values through `tailwind.config.cjs` (`colors` are mapped to CSS variables).
3. Restart the dev server if your Tailwind build cache doesn’t pick up new values.

## How to add new pages

1. Create a new page component under `src/pages/`.
2. Add a lazy import to `src/App.tsx`.
3. Add a new `<Route>` entry and wrap it with `RouteGuard` if needed.
4. If it’s a dashboard view, wrap it with `AppShell` using `withShell(...)`.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build production bundle
- `npm run preview` – preview production build
- `npm run lint` – run ESLint
- `npm run format` – check formatting
- `npm run test` – run unit tests
- `npm run e2e` – run Playwright tests
- `npm run seed` – seed Firebase for E2E
