# Glaj News

Next.js (App Router) + TypeScript + Tailwind CSS, Neon Postgres (Prisma), Cloudinary for media, deployed on Vercel.

## Architecture (MVC + services)

```
src/app/          Routes only. Pages call a controller and render one view component. API route handlers wrap controllers.
src/controllers/  Page / request logic: gathers data, enforces access, returns view payloads.
src/services/     Business rules: validation, mapping, hashing, sessions, Cloudinary signing.
src/models/       Data access (Prisma) in *.model.ts, plain types in *.dto.ts.
src/utils/        Pure helpers (time, html, jwt, constants, http, ...).
src/components/   One component per folder (components/<kebab-name>/<PascalName>.tsx), reused everywhere.
```

Flow: `page.tsx -> controller -> service -> model -> database`.

## Setup

```bash
npm install
cp .env.example .env        # fill in the values
npx prisma db push          # create tables (first time only)
npm run db:seed             # super admin (safe to re-run)
npm run dev
```

Environment variables: `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and for seeding `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`.
Set the first six in Vercel too.

## Notes

- Admin area: `/auth/dashboard/*` (proxy + controller checks). New registrations are inactive until a super admin activates them on the Users page.
- Uploads go browser -> Cloudinary with a server-signed request (images 10MB, videos 100MB).
- The old Firebase posts were removed to start fresh; an archive is kept in `prisma/data/legacy-posts.json`.
