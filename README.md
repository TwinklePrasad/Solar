# OM SAI SOLAR

Angular marketing website for OM SAI SOLAR. Visitors can request installation quotes and job seekers can browse open roles or submit a general application with a resume.

## Features

- Marketing pages: Home, Services, How It Works, FAQ, About
- Customer quote form (`/get-quote`)
- Careers listing (`/careers`) with open roles and general apply
- Job application form with resume upload (`/careers/apply`, `/careers/:jobId/apply`)
- Demo mode when Supabase is not configured (forms succeed locally; jobs use seed data)

## Tech stack

- Angular 22 (standalone components, lazy routes, reactive forms)
- SCSS with CSS variables for theming
- Supabase (optional) for leads, applications, jobs, and resume storage

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Build

```bash
npm run build
```

Production output is written to `dist/sol-app/`.

## Supabase setup (optional)

Without credentials the site runs in **demo mode**: quote and job forms show success, and careers uses built-in seed jobs.

To persist submissions:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Confirm a private Storage bucket named `resumes` exists (the SQL script creates it).
4. Copy **Project URL** and **anon public** key from Project Settings → API.
5. Paste them into:

- [`src/environments/environment.ts`](src/environments/environment.ts) (local)
- [`src/environments/environment.prod.ts`](src/environments/environment.prod.ts) (production)

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR_ANON_KEY',
};
```

6. Restart `npm start`.

### Managing data

- **Jobs**: edit rows in the `jobs` table (`is_active = true` to show on the site).
- **Quote leads**: view `quote_requests`.
- **Applications**: view `job_applications`; resume files are in Storage → `resumes`.

## Customize branding

Update CSS variables in [`src/styles.scss`](src/styles.scss) for brand colors. Replace placeholder contact details on the About page and in the footer.

## Deploy

Build the app, then host the `dist/sol-app/browser` folder on Netlify, Vercel, Firebase Hosting, or any static host. Point production environment variables (or `environment.prod.ts`) at your Supabase project before building.
