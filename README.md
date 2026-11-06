# SFam Logistics LLC — Website

Official website of **SFam Logistics LLC**, a Pacific Northwest freight brokerage (Bothell, WA).
Live at **https://sfamlogistics.com**.

👉 **Taking over this project? Read [HANDOVER.md](HANDOVER.md) first.** It covers ownership, hosting, the database, environment variables, deployment and open items.

## Stack
- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3, React Router 6, Framer Motion, Lucide icons. Public pages are pre-rendered to static HTML at build time (Puppeteer) for SEO.
- **Backend:** Node.js + Express (`server/index.js`), hosted on Render.
- **Database:** Neon Postgres (falls back to local SQLite when `DATABASE_URL` is not set, for development only).
- **Email:** Nodemailer over SMTP (alerts per form type + subscriber confirmations).

## Quick start
```bash
npm install
npm run dev          # frontend → http://localhost:5173
npm run dev:server   # backend  → http://localhost:4000
npm run dev:all      # both together
npm run build        # production build → dist/ (upload contents to hosting)
```
Copy `server/.env.example` to `.env` for local backend settings.

## Features
- Public pages: Home, About, Services (+ detail pages), Shippers, Safety & Compliance, Request a Quote, Track a Load, Carrier Onboarding, Agent Opportunities, Blog, Contact, Privacy, Terms.
- Forms with file uploads (stored in the database), email alerts routed to the right inbox.
- Admin dashboard (`/login` → `/admin`): quotes, carriers, agents, contacts, subscribers, shipments/load tracking, live chat; CSV/PDF export; password reset by email.
- Chatbot with FAQ answers and live-agent handoff.

## Folder structure
```
public/            static files, images, terms.pdf
src/components/    shared UI (Navbar, Footer, Chatbot, ...)
src/data/          site.js (company info, services, FAQ, blog) + seo.js
src/pages/         pages (admin/ = dashboard)
server/index.js    Express API + database + email
scripts/           prerender.js (build-time SEO rendering)
render.yaml        Render blueprint for the backend
```

© SFam Logistics LLC. All rights reserved.
