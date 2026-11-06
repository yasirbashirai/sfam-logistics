# SFam Logistics LLC — Website Handover

**Handover date:** 6 November 2026
**Live website:** https://sfamlogistics.com
**Prepared by:** Yasir Bashir (developer)

This document gives SFam Logistics LLC everything needed to own, run, change and redeploy the website without the original developer. Passwords and secret keys are **not** stored in this file (the repository is public). They are delivered separately in a private credentials sheet.

---

## 1. Ownership statement

All source code, design, written content, images supplied for or created for this project, the database contents, and every deliverable listed here belong to **SFam Logistics LLC**. SFam Logistics LLC may use, change, host, copy or hand the project to any other developer without restriction.

Third-party pieces keep their own open-source licences (all permissive: React, Vite, Tailwind CSS, Express, Lucide icons, Framer Motion, Google Fonts "Exo 2" and "Saira" under the SIL Open Font Licence). None of them restrict commercial use.

---

## 2. How the website is built (the 5 pieces)

| # | Piece | Service | What it does | Who owns the account today |
|---|---|---|---|---|
| 1 | **Domain + DNS** `sfamlogistics.com` | DomainRegistry.com / businessidentity.llc nameservers | Points the domain at the website. Registered 18 Mar 2026, **expires 18 Mar 2027 — renew it.** | SFam (client account) |
| 2 | **Website files (frontend)** | businessidentity.llc hosting (SFTP) | Serves the public site at sfamlogistics.com | SFam (client account) |
| 3 | **Backend API** `sfam-logistics-api.onrender.com` | Render.com (free plan) | Receives every form, stores it, sends email alerts, runs the admin dashboard | **Developer account → must transfer** |
| 4 | **Database** | Neon.tech Postgres | Permanently stores quotes, carriers, agents, contacts, subscribers, chats, loads and uploaded files (resumes, W-9s, etc.) | **Developer account → must transfer** |
| 5 | **Source code** | GitHub `yasirbashirai/sfam-logistics` | The full code + change history. Render deploys from it automatically | **Developer account → must transfer** |
| – | Preview copy (optional) | Vercel `sfam-logistics.vercel.app` | Test copy used for client review only. Not needed to run the live site | Developer account → can be deleted |
| – | Company email | Google Workspace (MX = smtp.google.com) | info@, support@, qoutes@, agentes@, onboarding@ inboxes | SFam (client account) |

> **Note:** this project does **not** use Supabase. The database is Neon (Postgres).

**How a form submission travels:**
Visitor fills a form on sfamlogistics.com → browser sends it to the Render API → API saves it in the Neon database (and any uploaded file) → API emails the right SFam inbox (if SMTP is configured) → staff see it in the admin dashboard at https://sfamlogistics.com/login.

---

## 3. Ownership transfer checklist (do these in order)

⚠️ **Do not delete anything on the developer side until steps 1–3 are confirmed done.** Deleting the GitHub repo, Render service or Neon project first would break the live forms and lose the leads.

### Step 1 — GitHub (source code)
1. SFam creates a free GitHub account (or organisation), e.g. `sfamlogistics`.
2. Developer: GitHub → repo `sfam-logistics` → Settings → General → **Transfer ownership** → enter SFam's username.
3. SFam accepts the transfer email. All code and history move over; the old URL redirects automatically.
4. Optional: SFam sets the repo to **Private** (Settings → Danger Zone → Change visibility).

Backup: a full copy of the repo with complete history is in the handover package as `sfam-logistics.git.bundle` (restore with `git clone sfam-logistics.git.bundle sfam-logistics`).

### Step 2 — Neon (database)
Option A (recommended, keeps everything as-is):
1. SFam creates a Neon account at https://neon.tech (free).
2. Developer: Neon console → project → Settings → **Transfer project** → to SFam's Neon account/organisation.
3. The connection string (`DATABASE_URL`) does not change, so nothing else breaks.

Option B (fresh database):
1. SFam creates a new Neon project, copies its connection string.
2. Run `pg_dump` from the old database and `psql` into the new one (or start empty; the server creates all tables automatically on first start).
3. Put the new `DATABASE_URL` into Render (Step 3).

A full export of the current data (JSON + CSV + uploaded files) is in the handover package `data-export/` as a safety copy.

### Step 3 — Render (backend API)
1. SFam creates a Render account at https://render.com (sign in with the SFam GitHub account from Step 1).
2. Easiest path: **New + → Blueprint** → choose the `sfam-logistics` repo. Render reads `render.yaml` and creates the `sfam-logistics-api` service.
3. In the new service → **Environment**, add every variable from section 5 (values from the private credentials sheet).
4. Wait for the deploy, then open `https://<new-service>.onrender.com/api/health`. It must say `"storage":"postgres"`.
5. If the new URL is different from `https://sfam-logistics-api.onrender.com`: edit `.env.production` → `VITE_API_URL=<new URL>`, rebuild and re-upload the website (section 4). The developer then deletes the old Render service.
   *(Alternative: the developer can move the existing service to SFam via a shared Render workspace, which keeps the same URL. Ask the developer if preferred.)*

### Step 4 — Admin dashboard login
1. Go to https://sfamlogistics.com/login.
2. Click **Forgot password?** and reset the password for the admin email (requires SMTP, section 5). Or set `ADMIN_EMAIL` / `ADMIN_PASSWORD` on a **fresh** database before first start.
3. Never keep the default demo password.

### Step 5 — Hosting & domain (already SFam's)
- Confirm SFam has the login for the businessidentity.llc hosting panel + SFTP, and for the domain registrar.
- Turn on **auto-renew** for `sfamlogistics.com` (expires 18 Mar 2027).

### Step 6 — Clean-up (developer, only after 1–5 are confirmed)
- Delete the Vercel preview project `sfam-logistics`.
- Delete the old Render service (if SFam created a new one).
- Remove developer access from any SFam accounts.
- SFam changes every password the developer ever knew (hosting, SFTP, email, admin).

---

## 4. Making changes and redeploying the website

Requirements: Node.js 20+, Git.

```bash
git clone https://github.com/<sfam-account>/sfam-logistics.git
cd sfam-logistics
npm install
npm run dev          # website at http://localhost:5173
npm run dev:server   # backend at http://localhost:4000 (uses local SQLite unless DATABASE_URL is set)
```

**Where to edit common things**
| What | File |
|---|---|
| Phone, email, addresses, MC/USDOT, slogan, services, FAQ, blog posts | `src/data/site.js` |
| SEO titles / descriptions per page | `src/data/seo.js` and `index.html` |
| Pages | `src/pages/*.jsx` (admin pages in `src/pages/admin/`) |
| Shared parts (header, footer, forms, chat bot) | `src/components/` |
| Images | `public/images/` |
| Terms & Conditions PDF | `public/terms.pdf` (served at /terms) |
| Backend (forms, emails, database, admin login) | `server/index.js` |
| Which inbox gets which form | `server/index.js` (`ALERT_TO_*` defaults) or Render env vars |

**Deploying the website (frontend)**
1. `npm run build` → creates `dist/` (each public page is pre-rendered to real HTML for Google).
2. Upload **the contents of `dist/`** to the hosting folder `/webroot/wordpress` over SFTP (host `western-silken-crow.businessidentity.llc`, port `2022`). Any SFTP app works (FileZilla, Cyberduck). The folder name says "wordpress" but it holds this React site; it is not WordPress.
3. Do **not** delete the `terms/` folder or `wp-content/` on the server.
4. Check the live site in a private browser window.

**Deploying the backend:** push to the `main` branch on GitHub. Render redeploys automatically in about a minute.

---

## 5. Backend environment variables (set on Render → Environment)

| Variable | Purpose | Example / note |
|---|---|---|
| `DATABASE_URL` | Neon Postgres connection string. **Required.** | `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require` |
| `SITE_URL` | Links in alert emails | `https://sfamlogistics.com` |
| `NODE_VERSION` | Node version on Render | `20` |
| `SMTP_HOST` | Outgoing mail server | Google Workspace: `smtp.gmail.com` |
| `SMTP_PORT` | | `465` |
| `SMTP_USER` | Mailbox that sends alerts | e.g. `info@sfamlogistics.com` |
| `SMTP_PASS` | Mailbox password / Google **App Password** | secret |
| `SMTP_FROM` | "From" address | `info@sfamlogistics.com` |
| `ALERT_TO_QUOTES` | Quote alerts | default `qoutes@sfamlogistics.com` |
| `ALERT_TO_AGENTS` | Agent applications | default `agentes@sfamlogistics.com` |
| `ALERT_TO_CARRIERS` | Carrier onboarding | default `onboarding@sfamlogistics.com` |
| `ALERT_TO_CONTACTS` | Contact form | default `support@sfamlogistics.com` |
| `ALERT_TO_SUBSCRIBERS` | Newsletter sign-ups | default `info@sfamlogistics.com` |
| `ALERT_TO` | Fallback for everything else | `info@sfamlogistics.com` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeds the admin login on a brand-new database only | secret |
| `GOOGLE_MAPS_API_KEY` | Optional: live Google reviews on the home page | from Google Cloud, Places API (New) |
| `GOOGLE_PLACE_ID` / `GOOGLE_PLACE_QUERY` | Optional, for the reviews widget | |

Frontend: `.env.production` → `VITE_API_URL` = the Render backend URL.

---

## 6. Things SFam should know (open items)

1. **Admin data endpoints need a login check (security).** The list endpoints (`/api/agents`, `/api/carriers`, `/api/quotes`, `/api/contacts`, `/api/subscribers`, `/api/chat/conversations`) do not yet check the admin login, so someone who knows the URL could read applicant data. Recommended first job for the next developer: require the admin session token on all `GET`/`PATCH`/`DELETE` admin routes in `server/index.js`.
2. **Email alerts** only send when the `SMTP_*` variables are set on Render. With Google Workspace, use an App Password.
3. **Render free plan sleeps** after 15 minutes idle; the first form after a quiet period takes ~50 seconds. Upgrade to the $7/month plan to remove this.
4. **Google Search Console** is not verified yet. `index.html` has a placeholder `google-site-verification` tag; replace `VERIFICATION_CODE` with SFam's code, rebuild, upload.
5. **Google reviews widget** shows a fixed snapshot of 2 reviews until `GOOGLE_MAPS_API_KEY` is added.
6. **Signed terms.pdf** may still show the old Bothell address; replace `public/terms.pdf` when a new version is signed.
7. **Domain renewal:** 18 March 2027.
8. 3 agent resumes sent before 9 Aug 2026 were lost by the old hosting setup (Raúl Sánchez, Vincent Montgomery, Abdul Basit) and need to be re-sent by the applicants.

---

## 7. Contents of the handover package

| Item | What it is |
|---|---|
| `HANDOVER.md` / `.pdf` | This document |
| `sfam-logistics-source.zip` | Clean copy of all source code |
| `sfam-logistics.git.bundle` | Full Git repository incl. complete change history |
| `sfam-logistics-live-build.zip` | Exact files currently live on sfamlogistics.com |
| `data-export/` | All database records (JSON + CSV) and uploaded files as of 6 Nov 2026 — **contains personal data, store securely** |
| `social-media-kit/` | Facebook cover, LinkedIn banner, Instagram posts |
| `CREDENTIALS.md` | Private credentials sheet — **delivered separately, never commit to GitHub** |
