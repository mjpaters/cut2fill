# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Cut2Fill is a Queensland construction material sourcing platform — an interactive map connecting earthworks suppliers (quarries, landfills, transfer stations) with projects needing fill material. Domain: cut2fill.com.au.

## Architecture

**Hybrid stack with two independently deployed components:**

- **Frontend** (repo root): Static HTML/JS/CSS served via GitHub Pages. Leaflet.js map as the primary UI, Supabase JS for auth. No build step — files are deployed as-is on push to master.
- **Backend** (`backend/`): FastAPI (Python 3.12) with async SQLAlchemy, PostGIS for geospatial queries, Supabase JWT auth. Deployed to Render via Docker.
- **Database**: Supabase-hosted PostgreSQL with PostGIS. Alembic for migrations.
- **MVP snapshot** (`mvp/`): Earlier static-only version preserved for reference. Not actively deployed.

### Frontend entry points
- `index.html` — Main app: Supabase auth gate, then Leaflet map with facility markers, filters, fire ant zone overlays
- `dashboard.html` — User dashboard: stats, submissions, facility overview
- `admin.html` — Admin panel: submission review, source health checks
- `app.js` — All client-side logic (2500+ lines): map init, sample facility data, material definitions, event handlers

### Backend structure (`backend/app/`)
- `main.py` — FastAPI app, router registration, CORS middleware
- `middleware/auth.py` — JWT validation via Supabase JWKS, `require_auth`/`require_admin` dependencies
- `routers/` — Domain-separated endpoints: facilities (GeoJSON), projects, submissions, water_points, admin, health, profile
- `models/` — SQLAlchemy ORM with PostGIS geometry (SRID 4326), UUIDs, JSONB
- `schemas/` — Pydantic request/response models including GeoJSON types
- All DB operations are async (AsyncSession + asyncpg)

### API
All endpoints under `/api/v1/`. Key routes:
- `GET /facilities` — GeoJSON with bbox/nearest/type filters
- `POST /submissions` — User-submitted facility registrations
- `GET /health` and `/health/detail` — Service health

## Commands

### Backend local dev
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # fill in Supabase + DATABASE_URL credentials
python run.py              # starts on http://localhost:8000
```

### Database migrations
```bash
cd backend
alembic upgrade head                          # apply migrations
alembic revision --autogenerate -m "desc"     # create new migration
```

Migration files in `backend/alembic/versions/` (currently 001_initial_schema, 002_add_foreign_keys).

### Frontend
No build step. Open `index.html` directly or use any static server. Deployed automatically to GitHub Pages on push to master via `.github/workflows/pages.yml`.

### Source health check
```bash
node scripts/check-sources.js
```

## Key Conventions

- **Auth flow**: Frontend Supabase login -> JWT in Authorization header -> Backend validates via JWKS -> role check from `profiles` table
- **Geospatial**: All geometries are PostGIS POINT with SRID 4326 (WGS84). GIST index on `facilities.location`.
- **Frontend state**: Global variables in app.js (`currentSession`, `supabaseClient`, registered sites). Vanilla JS, no framework. Fetch API for HTTP.
- **CSS**: Dark theme using CSS custom properties (`--bg`, `--text`, `--green`). Responsive with sidebar collapse.
- **Rate limiting**: 60 req/min per IP via slowapi on backend
- **No test suite exists** — no pytest or jest configured

## Deployment

- **Frontend**: GitHub Pages, auto-deployed from master. CNAME: cut2fill.com.au
- **Backend**: Render (Docker, free tier). Config in `render.yaml`. Health check: `/api/v1/health`
- **Database**: Supabase PostgreSQL (connection pooled, max 10 + 5 overflow)

## Environment Variables (Backend)

Required in `backend/.env` (see `.env.example`):
- `DATABASE_URL` — asyncpg connection string
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `SUPABASE_JWT_SECRET`
- `APP_ENV` — `development` or `production`
- `CORS_ORIGINS` — JSON array of allowed origins
