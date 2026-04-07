# SFam Logistics LLC — Website (Phase 1)

Bold, futuristic, dark-themed freight brokerage website built with **React + Vite + Tailwind CSS**. Includes a full admin dashboard for managing quote requests, carriers, agents, and contact forms.

## ⚡ Quick Start

```bash
cd "Claude code 2026/sfam-logistics"
npm install
npm run dev
```

Then open http://localhost:5173

## 🔑 Admin Login (Demo)

- URL: http://localhost:5173/login
- Email: `admin@sfamlogistics.com`
- Password: `admin123`

The admin dashboard lives at `/admin` and is protected by a simple localStorage flag — replace with real auth in Phase 2.

## 📦 What's Included

### Public Pages
- **Home** — Hero, quick quote, services, why us, stats, how it works, testimonials, CTA
- **About** — Story, mission, vision, values, "the SFam difference"
- **Services** — Listing + 6 individual service detail pages (FTL, LTL, Reefer, Flatbed, Dedicated, Expedited)
- **Request a Quote** — 4-step form with live rate estimator
- **Carrier Onboarding** — Form with MC/DOT, insurance, W-9, truck photo uploads
- **Agent Opportunities** — Independent contractor application with resume upload
- **Blog** — SEO-ready post listing + individual article pages
- **Contact** — Contact info + form
- **Privacy Policy** + **Terms of Service** (footer)
- **404** — Custom not-found page

### Admin Dashboard
- **Overview** — Stats cards + recent activity
- **Quote Requests** — Searchable table, view details, status updates, CSV export, PDF export
- **Carriers** — Same table + uploaded document references
- **Agents** — Same table + resume references
- **Contact Messages**

### Features
- ✅ All form submissions saved to localStorage (drop-in backend later)
- ✅ Each submission individually exportable as PDF (browser print)
- ✅ Bulk CSV export per submission type
- ✅ AI-style chatbot widget with FAQs
- ✅ Live rate estimator on quote form
- ✅ Mobile-first responsive design
- ✅ SEO meta tags + OpenGraph
- ✅ Bold dark theme with animated gradients, glassmorphism, neon borders

## 🛠 Tech Stack
- **React 18** + **Vite 5**
- **React Router 6**
- **Tailwind CSS 3**
- **Lucide Icons**
- **Framer Motion** (installed, ready to use)

## 📁 Folder Structure

```
sfam-logistics/
├── public/
├── src/
│   ├── components/    # Navbar, Footer, Chatbot, Section helpers
│   ├── context/       # SubmissionsContext (localStorage CRUD)
│   ├── data/          # site.js (services, blog posts, company info)
│   ├── pages/
│   │   ├── services/  # ServiceDetail
│   │   └── admin/     # AdminLayout, Dashboard, tables
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🔮 Phase 2 Roadmap (Built to Scale)

The architecture is designed so that Phase 2 features slot in without rewrites:

1. **Backend API (Node.js + Express + PostgreSQL + Prisma)** — Replace `SubmissionsContext` (localStorage) with REST/GraphQL calls. The context API surface (`add`, `update`, `remove`) stays identical.
2. **Real authentication** — Swap `Login.jsx` for JWT/OAuth.
3. **CRM auto-sync** — Add webhooks in the form submit handlers (HubSpot, GoHighLevel, Pipedrive). All form submits already pass through one function.
4. **Email + SMS alerts** — Add Twilio/SendGrid hooks server-side on submission.
5. **Secure document storage** — Move file uploads from in-memory to S3/R2 with signed URLs.
6. **Live load tracking** — Add a `/track/:id` page wired to a TMS API.
7. **Live chat handoff** — The chatbot component is already set up — swap the FAQ matcher for an LLM API call.

## 📞 Contact
SFam Logistics LLC
19125 North Creek Parkway Suite 120, Bothell, WA 98011
Phone: 1 (888) 698-5556
Email: info@sfamlogistics.com
