# Cut2Fill — Soft Launch Specification

**Version:** 2.0
**Date:** 7 April 2026 *(replaces v1.0 MVP Specification, 23 March 2026)*
**Purpose:** Define what's built, what's needed for soft launch, and the development punch list.

---

## 1. Current Build (April 2026)

### 1.1 Landing Page (index.html)

Full marketing landing page at cut2fill.com.au:
- Hero section with animated map preview
- Problem statement cards (Material Sitting Idle, Untapped Value, "General Fill" Means Nothing)
- "Who It's For" section (Finding Fill, Selling Fill, Managing Sites, Connecting Haulage)
- Feature cards (Material Classification, Geotech Testing Framework, Fire Ant Zone Mapping, Live Site Status, Haul Distance Calculator, Vetted Listings)
- Interactive map preview pulling live facility data from backend API
- CTA to explore map or create account
- Footer with Archers Group branding

**Issues to resolve:**
- "Create Free Account" links to app.html (the map) — not an account creation flow
- "Live Site Status" and "Geotech Testing Framework" features advertised but not built
- Footer copyright says 2025

### 1.2 Map Application (app.html + app.js)

2,573-line vanilla JS application with Leaflet.js map.

**Facility Layer — 604 verified facilities:**
- 488 quarries (TMR registered, GeoResGlobe, mining permits — manually verified)
- 50 concrete suppliers
- 44 transfer stations
- 10 landfills
- 7 soil treatment facilities
- 3 C&D recyclers
- 2 PFAS treatment facilities

All hardcoded inline in app.js. Backend API exists to serve from PostGIS but frontend doesn't use it for facilities yet.

**Overlays:**
- Fire ant biosecurity zones (Zone 1 + Zone 2, inline GeoJSON from QLD Government data)
- Point-in-polygon zone checking for any location
- LGA boundaries (external GeoJSON file)
- Satellite/street toggle
- Major projects layer (12 Brisbane 2032 / SEQ infrastructure projects with phases and timelines)

**Water Fill Points — 83+ stations:**
- QUU (23), Unitywater (21), Gold Coast CC, Logan CC, Redland CC
- Hardcoded inline with live API fallback to backend
- **Decision: hide from soft launch MVP — keep code, disable UI**

**Tools:**
- Address search with geocoding (Nominatim)
- Logistics & emissions calculator (3 truck profiles, fuel, CO2, trips, time)
- Route line visualisation between site and facility
- My Location (browser geolocation)

**Views:**
- Map view (default)
- Dashboard view (facility stats — quarry/landfill/transfer/other counts)
- Sidebar with filters (facility type, hours, search text)
- Collapsible sidebar, mobile-responsive with filter drawer

**User Actions:**
- Post Listing form (submits as site registration to backend API with Formspree fallback)
- Submit a Source form (tip about missing facility)
- Feedback form
- Login / Register (Supabase auth)

**Buttons that don't fully work:**
- Heatmap toggle — shows "coming in full release" toast
- Post Listing form creates a submission for admin review, not a visible listing

### 1.3 Backend (backend/)

FastAPI (Python 3.12) deployed to Render via Docker.

**Routers (7):**
| Router | Endpoints | Status |
|--------|-----------|--------|
| facilities | GET /facilities (GeoJSON, bbox/near/type filters), GET /facilities/:id | Working |
| water_points | GET /water-points (GeoJSON) | Working |
| projects | GET /projects, GET /projects/:id (with phases) | Working |
| submissions | POST /submissions/site, /source, /feedback; GET /submissions/mine | Working |
| profile | Profile CRUD for authenticated users | Working |
| admin | Submissions review, facility CRUD, source health, user list | Working |
| health | GET /health, GET /health/detail | Working |

**Models:**
- Facility (PostGIS POINT, type, verified flag, source tracking)
- WaterFillPoint (PostGIS POINT, provider, access, water type)
- MajorProject + ProjectPhase (PostGIS POINT, phases with dates)
- Submission (type, status, JSONB data, review workflow)
- Profile (display name, company, role)

**Auth:** Supabase JWT via JWKS validation. `require_auth` and `require_admin` dependencies.

**Infrastructure:**
- Rate limiting: 60 req/min per IP (slowapi)
- CORS configured for frontend origins
- 2 Alembic migrations (initial schema + foreign keys)
- Connection pooled (max 10 + 5 overflow)

### 1.4 Supporting Pages

- **dashboard.html** — User dashboard (stats, submissions, facility overview)
- **admin.html** — Admin panel (submission review, facility CRUD, source health, user management)

### 1.5 Deployment

| Component | Host | Cost | URL |
|-----------|------|------|-----|
| Frontend | GitHub Pages (auto-deploy from master) | Free | cut2fill.com.au |
| Backend | Render (Docker, free tier) | Free | cut2fill.onrender.com |
| Database | Supabase PostgreSQL + PostGIS | Free tier | — |
| Domain | cut2fill.com.au (CNAME) | Acquired | — |

### 1.6 Data Files

| File | Contents |
|------|----------|
| data/fire-ant-simple.geojson | Simplified fire ant zone polygons |
| data/qld-lga-boundaries.geojson | SEQ LGA boundary polygons |
| data/seq-lga-simple.geojson | Simplified LGA boundaries |
| data/source-registry.json | Source metadata for health checks |
| scripts/check-sources.js | Source health check script |

---

## 2. Soft Launch Target

### 2.1 What "soft launch" means

A state where we can show the platform to an industry contact (e.g., Remondis, CCF member, council officer) and have them:
1. Understand what Cut2Fill does from the landing page
2. Explore the map and find relevant facilities near their operations
3. See fire ant zones and understand the compliance value
4. Submit a listing for fill available or fill wanted
5. See that listing appear on the map (after admin review)
6. Come back and check for new listings in their area

This is not a public launch. It's a controlled rollout to 10-20 trusted industry contacts to validate demand and collect feedback.

### 2.2 What soft launch is NOT

- Not a matching engine (no automated "you have fill, they need fill" matching)
- Not a marketplace (no transactions, no payments, no pricing)
- Not a material passport system (no chain of custody tracking)
- Not a trade module platform (earthworks only, no concrete/steel/drainage)
- Not a cost intelligence engine (logistics calculator exists but no routing API or real pricing)
- Not a mobile app (responsive web only)

---

## 3. Feature Punch List

### 3.1 Critical (must have for soft launch)

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | **Listing model + router** | New `Listing` model: material type, volume, dates, location, contact, status (pending/approved/expired). Router with POST (auth'd), GET (public, approved only), admin PATCH. | ✅ Done (2026-04-07) |
| 2 | **Admin listing approval** | Admin panel shows pending listings. Approve → listing appears on map. Reject → notification. | ✅ Done (2026-04-07) |
| 3 | **Listing markers on map** | Approved listings render as distinct markers (different style from facilities). Filter by material type, available/wanted. Detail panel shows volume, dates, material, contact. | ✅ Done (2026-04-07) |
| 4 | **Connect post form to listing system** | Modify existing post form to create a Listing (not just a Submission). Auth required. Form already collects all needed fields. | ✅ Done (2026-04-07) |
| 5 | **Hide water fill points** | Comment out `waterFillLayerGroup.addTo(map)` and related UI. Keep code and data intact. | ✅ Done (2026-04-07) |
| 6 | **Fix "Create Free Account" flow** | Landing page CTA should trigger the register modal in app.html, not just navigate to the map. | ✅ Done (2026-04-07) |
| 7 | **Fix footer copyright** | Change 2025 to 2026 in index.html. | ✅ Done (2026-04-07) |
| 8 | **Hide heatmap button** | Remove or hide until implemented. "Coming soon" toasts look unfinished. | ✅ Done (2026-04-07) |
| 9 | **Update landing page feature claims** | "Live Site Status" → reword or remove (not built). "Geotech Testing Framework" → reword to "Material Classification Guidance" (partially built). | ✅ Done (2026-04-07) |
| 10 | **Listing expiry** | Listings auto-expire when end date passes. Cron or check-on-load. | Backlog |

### 3.2 Important (should have, build during soft launch)

| # | Feature | Description | Effort |
|---|---------|-------------|--------|
| 11 | **User profile after registration** | After first login, prompt for company name, role, phone. Currently registration creates auth but no profile context. | Small |
| 12 | **Facility claim for suppliers** | A supplier (e.g., Remondis) can claim their existing facility listing and manage it. Add contact info, hours, notes. Requires admin approval of claim. | Medium |
| 13 | **Listing notifications** | Email when a new listing matches your area/material interest. Basic — even a daily digest to admin would be a start. | Medium |
| 14 | **Move facility data to API** | Frontend currently hardcodes 604 facilities in app.js. Move to fetching from backend API (data already in schema, needs import + frontend switch). | Medium |

### 3.3 Nice to Have (after soft launch proves demand)

| # | Feature | Description | Effort |
|---|---------|-------------|--------|
| 15 | **Material testing guidance** | Standardised testing framework per material type. What tests, what labs, what it costs. Educational content, not a testing service. | Medium |
| 16 | **Standardised classification selector** | Replace free-text material with structured MRTS05 / VENM / ENM classification. Builds on doc 11. | Medium |
| 17 | **Real road routing** | Replace haversine distance with HERE Routing API v8 (confirmed working in SEQ, Leaflet-compatible, 5,000 free truck routes/month). Prototype validated at `prototype-truck-routing.html`. Includes car vs truck route comparison. Proxy through backend to secure API key. | ✅ Done (2026-04-08) |
| 18 | **NHVR heavy vehicle network overlay** | Approved B-double, road train, and HML routes rendered via NHVR ArcGIS MapServer (esri-leaflet dynamicMapLayer). Prototype validated — server-rendered, complete coverage, updates on pan/zoom. Users visually check if their route follows approved HV roads. | Small |
| 19 | **Analytics dashboard** | Track platform usage: page views, map interactions, listing views, registration funnel. | Medium |

---

## 4. Architecture

### 4.1 Current Stack

```
Frontend (GitHub Pages)
├── index.html          — Landing page (marketing)
├── app.html            — Map application (the product)
├── app.js              — All client logic (2,573 lines)
├── styles.css          — Shared styles
├── dashboard.html      — User dashboard
├── admin.html          — Admin panel
└── data/               — GeoJSON files (LGA boundaries, fire ant zones)

Backend (Render — Docker)
├── FastAPI + async SQLAlchemy + PostGIS
├── Supabase JWT auth (JWKS validation)
├── 7 routers, 5 models, rate limiting
└── Alembic migrations

Database (Supabase)
├── PostgreSQL + PostGIS
├── Tables: facilities, water_fill_points, major_projects,
│           project_phases, submissions, profiles
└── Connection pooled (asyncpg, max 10 + 5 overflow)

Auth (Supabase)
├── Email/password registration
├── JWT tokens validated by backend
└── Admin role via profiles table
```

### 4.2 What stays the same for soft launch

- Vanilla JS frontend (no framework migration)
- FastAPI backend on Render free tier
- Supabase for auth and database
- GitHub Pages for static hosting
- No build step, no bundler

### 4.3 What changes for soft launch

- New `Listing` model added to backend
- New `/listings` router added
- app.js gains listing marker rendering and filter integration
- admin.html gains listing approval UI
- Post form modified to create listings instead of submissions

---

## 5. Material Types (Soft Launch)

The existing 8 material types are retained. These map to the material tooltips already in app.js:

| Type | Key | Compliance Note |
|------|-----|-----------------|
| Clean Fill | clean-fill | No testing required under EP Act for clean earth |
| Rock/Rubble | rock | Generally exempt if visually free of contamination |
| Sand | sand | Marine sand may need acid sulfate assessment |
| Topsoil | topsoil | Must be free of weed seed for landscaping use |
| Concrete/Asphalt | concrete | Exempt under EOW code ENEW07604819. Must be free of asbestos |
| Mixed C&D | mixed | Requires disposal at licensed facility |
| Acid Sulfate Soil | acid-sulfate | ASSMP may be required below 5m AHD |
| Contaminated Soil | contaminated | Soil Disposal Permit required from EMR/CLR listed sites |

Future enhancement: sub-classification within these types (e.g., MRTS05 Type 2.1-2.5 under Rock, VENM/ENM under Clean Fill). See doc 11.

---

## 6. Minimum Volume

**100 m³ minimum** retained for soft launch.

Rationale:
- Larger quantities typically come from a single source → more consistent material properties
- Reduces variability — engineering projects need consistency
- Filters out residential/small loads (not our market)
- Differentiates from ReadyFill (no minimum, mixed bag)
- 100 m³ is approximately 5-8 truck loads — meaningful but accessible

The threshold is arbitrary and can be adjusted based on soft launch feedback.

---

## 7. Listing Lifecycle

```
User creates listing (auth required)
        │
        ▼
   [PENDING] ── visible to admin only
        │
   Admin reviews
        │
   ┌────┴────┐
   ▼         ▼
[APPROVED]  [REJECTED]
   │           │
   │        User notified
   │        (reason provided)
   │
   Visible on map
   with distinct marker style
        │
        ▼
   End date passes
        │
        ▼
   [EXPIRED] ── removed from map
```

Admin can also:
- Edit listing details before approving
- Pause an approved listing (temporarily remove from map)
- Contact the listing owner for clarification

---

## 8. Browser Support

| Browser | Support |
|---------|---------|
| Chrome (desktop + mobile) | Full |
| Safari (desktop + iOS) | Full |
| Firefox | Full |
| Edge | Full |
| IE11 | Not supported |

---

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| Landing page load | < 2 seconds on 4G |
| Map initial render (facilities + overlays) | < 3 seconds |
| Filter application | < 100ms |
| Listing submission | < 2 seconds (API round trip) |
| Facility marker rendering (600+) | < 500ms |
