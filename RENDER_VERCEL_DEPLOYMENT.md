# Fresh Vercel + Render deployment

This is a fresh deployment. No existing Vercel project or Render service is assumed.

## Architecture

- Frontend: a new Vercel Hobby project from GitHub, rooted at `frontend`.
- Backend: a new Render Free Web Service from GitHub, rooted at `backend`.
- Email: Resend HTTPS API delivering to `contact@papputhakur.com`.
- Domain and DNS management remain manual through Hostinger. No DNS or mailbox changes are made by this repository preparation.

## New Render Web Service

Dashboard action: **New → Web Service**

- Repository: `pappu2b1/pappu-thakur-developer-portfolio`
- Branch: `main`
- Root Directory: `backend`
- Runtime: Node
- Instance Type: Free
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Auto Deploy: Enabled
- Temporary URL: Assigned by Render after first deployment
- Final custom domain: `api.papputhakur.com`

Render environment variables:

```env
NODE_ENV=production
NODE_VERSION=22
CORS_ORIGINS=https://papputhakur.com,https://www.papputhakur.com
EMAIL_PROVIDER=resend
RESEND_API_KEY=[ADD ONLY IN RENDER DASHBOARD]
CONTACT_TO_EMAIL=contact@papputhakur.com
CONTACT_FROM_EMAIL=Pappu Thakur Portfolio <portfolio@updates.papputhakur.com>
CONTACT_FILE_FALLBACK=false
```

The backend uses `process.env.PORT`, defaults to port `10000` in production, and binds to `0.0.0.0`. Production fallback is disabled because Render Free storage is temporary. If Resend fails, the API returns `503`; it does not return a queued success.

## New Vercel project

Dashboard action: **Add New → Project**

- Repository: `pappu2b1/pappu-thakur-developer-portfolio`
- Production Branch: `main`
- Root Directory: `frontend`
- Framework Preset: Vite
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: 22
- Temporary URL: Assigned by Vercel after first deployment
- Final custom domain: `papputhakur.com`

Vercel environment variable during the initial deployment:

```env
VITE_API_BASE_URL=[USE THE WORKING RENDER API URL DURING INITIAL DEPLOYMENT]
```

After the API custom domain is active, set:

```env
VITE_API_BASE_URL=https://api.papputhakur.com
```

`frontend/vercel.json` rewrites application routes to `index.html` while leaving real public files, including the resume, assets, sitemap, robots, and manifest, directly accessible.

## Fresh deployment order

1. Prepare and push repository changes.
2. Create a Resend account.
3. Add and verify `updates.papputhakur.com` in Resend.
4. Add the exact SPF and DKIM records supplied by Resend in Hostinger DNS; do not remove existing Hostinger MX records.
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
16. Connect `api.papputhakur.com` to Render.
17. Connect `papputhakur.com` to Vercel.
18. Set `VITE_API_BASE_URL=https://api.papputhakur.com`.
19. Redeploy Vercel.
20. Set final Render CORS origins.
21. Verify SSL, redirects, routes, resume, and email.

## Resend setup

1. Create a Resend account.
2. Add the sending subdomain `updates.papputhakur.com`.
3. Copy the exact SPF and DKIM records supplied by Resend.
4. Add only those exact records in Hostinger DNS.
5. Do not remove existing Hostinger MX records.
6. Wait until Resend reports the domain as verified.
7. Create an API key.
8. Add it only to Render Environment Variables as `RESEND_API_KEY`.

Do not invent DNS values or commit an API key. No DNS changes, Resend verification, Vercel project, Render service, domain, SSL, or production email receipt has been completed or claimed.

## Verification checklist

Before claiming production readiness, verify `/api/health` and `/api/version` on the Render temporary URL, run a controlled contact test, open and refresh every React Router route, open and download the resume, confirm the final CORS allowlist, verify SSL and the `www` redirect, and confirm receipt through the Resend-sent email.