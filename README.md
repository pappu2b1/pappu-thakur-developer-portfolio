# Pappu Thakur — Developer Portfolio

React/Vite portfolio for Pappu Thakur with an Express contact API.

## Local setup

```bash
npm install
npm run dev
```

Run the API separately when testing contact submissions:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

### Frontend environment

Create `frontend/.env` from `frontend/.env.example`:

```text
VITE_API_BASE_URL=http://localhost:5000
```

For production, set `VITE_API_BASE_URL` to the deployed API origin before building the frontend.

### Backend environment

Create `backend/.env` from `backend/.env.example` and provide values through the hosting platform or shell environment:

```text
PORT=5000
CORS_ORIGINS=http://localhost:5173
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=contact@papputhakur.com
CONTACT_FROM_EMAIL=
```

`CONTACT_FROM_EMAIL` must be permitted by the SMTP provider. SMTP credentials and private `.env` files must never be committed. `CORS_ORIGINS` accepts comma-separated origins in production.

## Contact delivery behavior

`POST /api/contact` trims and validates the enquiry, then sends it through SMTP to `CONTACT_TO_EMAIL` with the visitor’s validated email as `replyTo`. The email contains the submitted fields, submission time, and request ID.

Successful responses are honest and include a safe delivery status:

- `201` with `deliveryStatus: "emailed"` after Nodemailer confirms delivery.
- `201` with `deliveryStatus: "queued"` after validated data is safely appended to `backend/data/contact-outbox.jsonl`.
- `400` for validation or honeypot failures.
- `429` for rate limiting.
- `503` when neither email delivery nor local storage succeeds.

The frontend shows the same normal success message for both emailed and queued enquiries. It never claims that queued enquiries were emailed.

The JSONL outbox is a local-development fallback. It may be lost on hosting platforms with ephemeral filesystems and is not a durable production queue. This project has no configured MongoDB persistence. For production, use a persistent volume or add a reviewed MongoDB-backed `ContactEnquiry` store before relying on queued fallback.

## Outbox retry

Retry queued records manually, one at a time:

```bash
npm run retry:contact-outbox --prefix backend
```

The command removes only successfully delivered records, preserves failed and malformed records, avoids logging message bodies, and prints attempted, delivered, failed, and remaining totals. If SMTP is not configured it stops safely without modifying the outbox.

## SMTP verification

Verify the SMTP connection without sending an email:

```bash
npm run verify:smtp --prefix backend
```

It exits unsuccessfully when SMTP configuration is incomplete or the connection cannot be verified. It never sends a visitor enquiry automatically during server startup.

## Operational endpoints

```text
GET /api/health
GET /api/version
POST /api/contact
```

Known limitations: real SMTP delivery requires provider credentials; the local JSONL fallback has no automatic retry worker; LinkedIn URL, verified project demos, repository URLs and screenshots are not configured. Live Hostinger applications, DNS, SSL, SMTP inbox delivery and the www redirect still require verification in hPanel.
## Hostinger deployment configuration

Production URLs:

```text
Production frontend: https://papputhakur.com
Production API: https://api.papputhakur.com
WWW redirect: https://www.papputhakur.com → https://papputhakur.com
```

Frontend application settings:

```text
Application root: frontend
Install command: npm ci
Build command: npm run build
Output directory: dist
Node.js: 22.x
VITE_API_BASE_URL=https://api.papputhakur.com
```

Backend application settings:

```text
Application root: backend
Install command: npm ci
Start command: npm start
Entry file: src/server.js
Node.js: 22.x
CORS_ORIGINS=https://papputhakur.com,https://www.papputhakur.com
```

Set SMTP credentials, `CONTACT_TO_EMAIL=contact@papputhakur.com`, and `CONTACT_FROM_EMAIL=contact@papputhakur.com` only in Hostinger environment settings. Never commit a production `.env` file.

The frontend includes `public/.htaccess` for client-side route fallback. The JSONL contact outbox is ignored and may not survive an ephemeral rebuild; configure persistent storage before relying on queued fallback in production.

The live Hostinger applications, DNS, SSL, SMTP inbox delivery, and `www` redirect must be verified in hPanel before they are reported as deployed.