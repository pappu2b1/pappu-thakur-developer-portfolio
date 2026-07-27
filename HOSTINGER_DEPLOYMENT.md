# Hostinger deployment guide

This project is prepared for two separate Hostinger Web Apps. Deployment is not claimed complete until the live URLs, SSL, DNS, routing, backend health, and SMTP delivery are verified in hPanel.

## Backend Web App

- Application name: Pappu Thakur Portfolio API
- Repository: `pappu2b1/pappu-thakur-developer-portfolio`
- Branch: `main`
- Root directory: `backend`
- Node.js version: `22`
- Install command: `npm ci`
- Start command: `npm start`
- Entry file: `src/server.js`
- Domain: `api.papputhakur.com`

Environment variables in Hostinger hPanel:

```env
NODE_ENV=production
PORT=3000
CORS_ORIGINS=https://papputhakur.com,https://www.papputhakur.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@papputhakur.com
SMTP_PASS=[ADD ONLY IN HOSTINGER HPANEL]
CONTACT_TO_EMAIL=contact@papputhakur.com
CONTACT_FROM_EMAIL=contact@papputhakur.com
```

Hostinger's assigned runtime port takes priority over the application's fallback port. The server binds to `0.0.0.0` and exposes `GET /api/health`, `GET /api/version`, and `POST /api/contact`.

Contact submissions return `201` with `deliveryStatus: "emailed"` only after SMTP delivery succeeds. If SMTP fails, the validated enquiry is written to the ignored JSONL outbox and returns `201` with `deliveryStatus: "queued"`. If both delivery and storage fail, the API returns `503`. The JSONL contact outbox may not be durable across Hostinger application rebuilds or redeployments. SMTP delivery should be verified after production deployment.

Before frontend deployment, verify:

- `https://api.papputhakur.com/api/health` returns `200`.
- `https://api.papputhakur.com/api/version` returns `200`.
- A controlled contact test confirms the expected SMTP or queued result without exposing enquiry data.

## Frontend Web App

- Application name: Pappu Thakur Portfolio
- Repository: `pappu2b1/pappu-thakur-developer-portfolio`
- Branch: `main`
- Root directory: `frontend`
- Node.js version: `22`
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Domain: `papputhakur.com`

Production environment variable:

```env
VITE_API_BASE_URL=https://api.papputhakur.com
```

The committed `frontend/.env.example` remains local-development configuration:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Deploy the backend before building the final frontend so the production API URL is available at build time. Do not commit a real `.env` file.

## Routing, static files, and SEO

The frontend uses React Router with browser history. Hostinger's static frontend must route non-file requests to `/index.html` using the committed `frontend/public/.htaccess`. Real files must remain directly accessible, including `/assets/*`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and `/resume/Pappu-Thakur-Junior-Full-Stack-Developer-Resume.pdf`.

The production canonical base is `https://papputhakur.com`. The canonical URL, Open Graph URL, structured metadata, manifest, robots file, sitemap, and README use that domain. The sitemap contains only public frontend routes and no API, localhost, private, or legacy VyasByte URLs.

After deployment, manually verify:

- SSL is active for `papputhakur.com`, `www.papputhakur.com`, and `api.papputhakur.com`.
- `www.papputhakur.com` redirects to `papputhakur.com`.
- Direct opening and refreshing of `/projects`, `/projects/leadfollow-crm`, `/about`, `/experience`, `/skills`, `/resume`, `/contact`, and `/privacy` works.
- The resume PDF opens and downloads without a 404.
- Contact CORS accepts only `https://papputhakur.com` and `https://www.papputhakur.com` in production.
- SMTP delivery reaches `contact@papputhakur.com`.

Production URLs are documented configuration only; this file does not claim that Hostinger deployment, DNS, SSL, or production SMTP success has been completed.