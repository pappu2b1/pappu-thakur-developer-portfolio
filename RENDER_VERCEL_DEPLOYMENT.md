# Fresh Vercel + Render deployment

This is a fresh deployment. No existing Vercel project or Render service is assumed.

## Architecture

- Frontend: a new Vercel Hobby project from GitHub, rooted at `frontend`.
- Backend: a new Render Free Web Service from GitHub, rooted at `backend`.
- Contact email delivery: Resend HTTPS API.
- Database: not required for portfolio v1.
- Final domains and DNS are deployment-time configuration; no production URLs are assumed here.

## New Render Web Service

Dashboard action: **New → Web Service**

- Root Directory: `backend`
- Runtime: Node
- Instance Type: Free
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Auto Deploy: Enabled
- Temporary URL: Assigned by Render after first deployment

Render environment variables:

```env
NODE_ENV=production
NODE_VERSION=22
CORS_ORIGINS=[SET THE FINAL VERCEL ORIGIN IN RENDER]
FRONTEND_URL=[OR SET ONE FINAL VERCEL ORIGIN IN RENDER]
EMAIL_PROVIDER=resend
RESEND_API_KEY=[ADD ONLY IN RENDER DASHBOARD]
CONTACT_TO_EMAIL=[YOUR RECEIVING EMAIL]
CONTACT_FROM_EMAIL=[YOUR VERIFIED RESEND SENDER]
CONTACT_FILE_FALLBACK=false
```

The backend uses `process.env.PORT`, defaults to port `10000` in production, and binds to `0.0.0.0`. Production fallback is disabled because Render Free storage is temporary. If Resend fails, the API returns `503`; it does not return a queued success.

## New Vercel project

Dashboard action: **Add New → Project**

- Root Directory: `frontend`
- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: 22
- Temporary URL: Assigned by Vercel after first deployment

Vercel environment variable during the initial deployment:

```env
VITE_API_BASE_URL=[USE THE WORKING RENDER API URL ENDING IN /api]
```

After Render is deployed, set `VITE_API_BASE_URL` to the actual Render API base URL, including `/api` (for example, `https://ACTUAL-RENDER-BACKEND.onrender.com/api`).

`frontend/vercel.json` rewrites application routes to `index.html` while leaving real public files, including the resume, assets, sitemap, robots, and manifest, directly accessible.

## Fresh deployment order

1. Prepare and push repository changes.
2. Create a Resend account.
3. Add and verify a sending domain or address in Resend using the exact instructions it provides.
4. Complete any required DNS verification manually.
5. Create a Resend API key.
6. Create a new Render Web Service from GitHub.
7. Add Render environment variables.
8. Deploy the backend.
9. Test Render temporary health/version URLs.
10. Test contact email.
11. Create a new Vercel project from GitHub.
12. Add the working Render API URL to `VITE_API_BASE_URL`.
13. Deploy the frontend.
14. Temporarily allow the exact Vercel deployment URL in Render CORS if required; remove it after the custom domain is active.
15. Test the complete application.
16. Configure optional custom domains manually.
17. Set `VITE_API_BASE_URL` to the actual Render API base URL.
18. Redeploy Vercel.
19. Set the final Render CORS origin.
20. Verify routes, resume, and email.

## Resend setup

1. Create a Resend account.
2. Add a sending domain or address in Resend.
3. Complete the exact verification steps supplied by Resend.
4. Wait until Resend reports the sender as verified.
5. Create an API key.
6. Add it only to Render Environment Variables as `RESEND_API_KEY`.

Do not invent DNS values or commit an API key. No DNS changes, Resend verification, Vercel project, Render service, domain, SSL, or production email receipt has been completed or claimed.

## Verification checklist

Verify `papputhakur.com` (or the actual sending domain) in Resend before final contact-form verification.

Before claiming production readiness, verify `/api/health` and `/api/version` on the Render temporary URL, run a controlled contact test, open and refresh every React Router route, open and download the resume, confirm the final CORS allowlist, verify SSL and the `www` redirect, and confirm receipt through the Resend-sent email.
