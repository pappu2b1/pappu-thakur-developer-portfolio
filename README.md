# Pappu Thakur — Developer Portfolio

React/Vite portfolio for Pappu Thakur with an Express contact API.

## Deployment status

Deployment status: **Not deployed yet**

- Frontend target: Vercel Hobby
- Backend target: Render Free
- Deployment source: GitHub `main` branch
- Intended frontend domain: `https://papputhakur.com`
- Intended backend domain: `https://api.papputhakur.com`
- Email provider: Resend HTTPS API
- Receiving inbox: `contact@papputhakur.com`

No Vercel project, Render service, Resend domain, DNS record, SSL certificate, custom domain, or production email integration is assumed to exist.

See [RENDER_VERCEL_DEPLOYMENT.md](RENDER_VERCEL_DEPLOYMENT.md) for the fresh deployment sequence.

## Local setup

```bash
npm install
npm run dev
npm run dev --prefix backend
npm run dev --prefix frontend
```

Frontend local environment (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:5000
```

Backend local environment (`backend/.env`):

```env
NODE_ENV=development
PORT=5000
CORS_ORIGINS=http://localhost:5173
EMAIL_PROVIDER=resend
RESEND_API_KEY=
CONTACT_TO_EMAIL=contact@papputhakur.com
CONTACT_FROM_EMAIL=Pappu Thakur Portfolio <portfolio@updates.papputhakur.com>
CONTACT_FILE_FALLBACK=true
```

Never commit `.env` files or provider keys.

## Commands

- Frontend install: `npm ci` from `frontend`
- Frontend build: `npm run build` from `frontend`
- Frontend output: `dist`
- Backend install: `npm ci` from `backend`
- Backend start: `npm start` from `backend`
- Backend entry: `src/server.js`
- Node.js target: `22.x`

## Contact delivery

`POST /api/contact` validates and trims submissions, preserves honeypot and rate limiting, and sends through the Resend HTTPS API. The visitor email is used only as `Reply-To`; the configured portfolio address remains the sender. Messages include the enquiry fields, timestamp, and request ID in plain text and escaped HTML.

- `201` with `deliveryStatus: "emailed"` only after Resend accepts the message.
- `201` with `deliveryStatus: "queued"` only for local development when `CONTACT_FILE_FALLBACK=true` and JSONL storage succeeds.
- `503` when Resend fails in production or when delivery and enabled local fallback both fail.
- `400` for validation or honeypot failures.
- `429` for rate limiting.

Render production sets `CONTACT_FILE_FALLBACK=false` because its filesystem is temporary. No queued success is reported in production. The local JSONL outbox remains ignored and must not be treated as durable production storage.

## Public routes and SEO

The frontend uses React Router browser history for `/`, `/projects`, `/projects/:slug`, `/about`, `/experience`, `/skills`, `/resume`, `/contact`, and `/privacy`. Vercel rewrites application routes to `index.html` while preserving real public files such as the resume, sitemap, robots, manifest, and assets.

The canonical SEO base is `https://papputhakur.com`. The sitemap contains only public frontend routes. Production URLs are intended configuration and are not claimed live until deployment is completed and manually verified.

## Known limitations

Resend domain verification, DNS, SSL, Vercel, Render, custom domains, and real email receipt still require manual setup and verification. LinkedIn URL, verified project demos, repository URLs, and screenshots are not configured.