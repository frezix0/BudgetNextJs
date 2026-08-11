# BudgetApp
 
A simple, modern personal budget tracker built with Next.js 14 (App Router), TypeScript, Prisma, and PostgreSQL. Track budgets, log expenses, and see remaining balances in IDR at a glance.
 
## Features
 
- Credentials-based authentication with NextAuth.js (JWT session strategy).
- Full CRUD for budgets and expenses (pengeluaran), scoped per user.
- Rupiah (IDR) formatting and per-budget remaining-balance calculation.
- Sort expenses by date, name, or amount.
- Light / dark theme with system preference detection via `next-themes`.
- Toast notifications backed by a Zustand store.
- React Query for server-state caching and mutations.
## Tech Stack
 
| Category | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 5 |
| Auth | NextAuth.js 4 (Credentials) |
| Server state | TanStack React Query |
| Client state | Zustand |
| Styling | Tailwind CSS + CSS variables |
| Icons | lucide-react |
| Validation | Zod |
 
## Project Structure
 
```
.
├── app/
│   ├── (auth)/                  # Unauthenticated routes (login, register)
│   │   ├── layout.tsx           # Redirects to / if already signed in
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/             # Authenticated routes
│   │   ├── layout.tsx           # Redirects to /login if no session
│   │   ├── page.tsx             # Budget list
│   │   └── budget/[id]/page.tsx # Budget detail + expenses
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── budgets/
│   │   │   ├── route.ts         # GET list, POST create
│   │   │   └── [id]/route.ts    # GET, PUT, DELETE (ownership-checked)
│   │   └── pengeluaran/
│   │       ├── route.ts         # POST create
│   │       └── [id]/route.ts    # PUT, DELETE (ownership-checked)
│   ├── error.tsx                # App-level error boundary
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── layout.tsx               # Root layout + Providers + toast host
│   ├── providers.tsx            # SessionProvider + QueryClient + ThemeProvider
│   └── globals.css              # Tailwind + CSS variables (light/dark tokens)
├── components/
│   ├── auth/                    # login-form, register-form, auth-input
│   ├── budget/                  # budget list, card, form, detail, add button
│   ├── layout/                  # header, theme-switcher, notification (toast)
│   └── pengeluaran/             # list, card, form, sort-select
├── hooks/
│   ├── use-budgets.ts           # React Query hooks for budgets
│   ├── use-pengeluaran.ts       # React Query hooks for expenses
│   ├── use-notification.ts      # Zustand toast store
│   └── use-theme.ts             # Thin wrapper over next-themes
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client singleton
│   ├── session.ts               # getCurrentUserId helper
│   ├── utils.ts                 # cn, formatRupiah, sortPengeluaran
│   └── validations.ts           # Zod schemas
├── prisma/
│   ├── schema.prisma            # User, Budget, Pengeluaran models
│   └── seed.ts                  # Demo user + sample data
├── types/
│   ├── budget.ts                # Shared frontend types
│   └── next-auth.d.ts           # Session/User/JWT augmentation
├── public/img/                  # Static assets (logo, background)
├── .env.example                 # Required environment variables
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```
 
## Requirements
 
- Node.js 18.17+ (Next.js 14 requirement).
- A running PostgreSQL instance (local, Docker, or managed: Neon / Supabase / Vercel Postgres).
- Git.
## Installation
 
Clone the repo and install dependencies:
 
```bash
git clone https://github.com/frezix0/budgetnextjs.git
cd budgetnextjs
npm install
```
 
`postinstall` runs `prisma generate` automatically.
 
## Environment Variables
 
Copy `.env.example` to `.env` and fill in the values:
 
```bash
cp .env.example .env
```
 
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. Use a pooled URL in production. |
| `NEXTAUTH_SECRET` | Random secret used to sign JWTs. Generate with `openssl rand -base64 32`. Required in production. |
| `NEXTAUTH_URL` | Full base URL of the deployment, e.g. `http://localhost:3000` locally or `https://your-app.vercel.app` in production. |
 
## Database Setup
 
Apply the schema and (optionally) seed demo data:
 
```bash
# Apply schema to the database
npx prisma migrate dev --name init
# Or, if you don't want migration files:
# npx prisma db push
 
# Seed demo data (optional)
npx prisma db seed
```
 
The seed script creates one demo account:
 
```
Email:    demo@budgetapp.com
Password: password123
```
 
## Running the App
 
Start the dev server:
 
```bash
npm run dev
```
 
The app runs at [http://localhost:3000](http://localhost:3000) by default.
 
## Scripts
 
| Script | Purpose |
|---|---|
| `npm run dev` | Start the Next.js dev server. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the production build. |
| `npm run lint` | Run `next lint`. |
| `npx prisma db seed` | Run the seed script in `prisma/seed.ts`. |
 
