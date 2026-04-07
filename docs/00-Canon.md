# Cut2Fill — Canon

**Purpose:** Single source of truth for all locked decisions. If it's in this document, it's decided. Everything else is exploratory.

**Last updated:** 7 April 2026

---

## 1. Brand Identity

| Decision | Value | Locked |
|----------|-------|--------|
| **Brand name** | Cut2Fill | Yes |
| **Name treatment** | Capital C, numeral 2, capital F, no space | Yes |
| **Shorthand** | C2F | Yes |
| **Domain** | cut2fill.com.au | Yes |
| **Primary tagline** | Source. Verify. Build. | Yes |
| **Secondary tagline** | Find it. Verify it. Fill it. | Yes |
| **Functional descriptor** | QLD's construction material platform. | Yes |
| **Retired tagline** | Connect. Reuse. Sustain. (sustainability contexts only) | Yes |
| **Brand personality** | Your most useful mate on site — who also happens to be an engineer | Yes |
| **Logo direction** | C2F monogram (geometric, bold) | Preferred, not final |
| **Logo reference file** | `db9383e3-0e87-45ff-b798-5efa4a489c61.svg` | Favourite, needs designer refinement |

### Colour Palette

| Role | Hex | Locked |
|------|-----|--------|
| Brand Green (primary) | `#6b8f5e` | Yes |
| Brand Amber (secondary) | `#c4843e` | Yes |
| Slate Blue (tertiary) | `#5c8a97` | Yes |
| Dark Ground (bg) | `#0f0d0a` | Yes |
| Elevated Ground (cards) | `#1a1814` | Yes |
| Light Text | `#e8e4dc` | Yes |
| Muted Text | `#9c9488` | Yes |
| Light Background (print) | `#f5f3ef` | Yes |

### Typography

| Context | Font | Locked |
|---------|------|--------|
| Digital (all) | Inter | Yes |
| Print body (formal docs) | Serif TBD (Source Serif 4 / Merriweather) | No |

### Tone

| Trait | Meaning |
|-------|---------|
| Direct | Says what it means. No marketing waffle. |
| Accessible | Every level of the industry feels welcome |
| Quietly competent | Technical depth is there but doesn't lead with jargon |
| Fast | Everything communicates speed and efficiency |
| Grounded | Literally about the ground. Earthy, real, physical. |

### Never Say

- "AI-powered", "data-driven"
- "Revolutionising", "disrupting"
- "Sustainable solution" as a headline
- "Smart platform", "intelligent matching"

---

## 2. Product

| Decision | Value | Locked |
|----------|-------|--------|
| **What it is** | Interactive map and intelligence layer for construction earthworks | Yes |
| **Who it's for** | Site PMs, estimators, civil contractors, trucking companies, quarry operators, councils, government | Yes |
| **Geography** | Queensland (SEQ focus for soft launch) | Yes |
| **Price** | Free to use (browse, post listings, view facilities) | Yes |
| **Revenue model** | Premium features in Phase 2+ (subscriptions, certificates, API) | Yes |
| **Minimum listing volume** | 100 m3 | Yes |
| **Material types** | 8 (clean fill, rock/rubble, sand, topsoil, concrete/asphalt, mixed C&D, acid sulfate, contaminated) | Yes |
| **Verified facilities** | 604 (488 quarries, 50 concrete, 44 transfer, 10 landfill, 7 soil treatment, 3 C&D, 2 PFAS) | Yes |
| **Water fill points** | 83+ (hidden from soft launch, code retained) | Yes |
| **Major projects** | 12 (Brisbane 2032 / SEQ infrastructure) | Yes |

### Value Proposition

**Lead with:** Industry visibility + material classification

**Not:** Waste levy savings (that's an outcome, not the pitch)

"Verify" is the global differentiator — no competitor has compliance/verification built in.

---

## 3. Technical Stack

| Component | Technology | Locked |
|-----------|-----------|--------|
| Frontend | Vanilla HTML/JS/CSS, Leaflet.js, GitHub Pages | Yes |
| Backend | FastAPI (Python 3.12), async SQLAlchemy, PostGIS | Yes |
| Database | Supabase PostgreSQL + PostGIS | Yes |
| Auth | Supabase (email/password, JWT) | Yes |
| Hosting (frontend) | GitHub Pages (auto-deploy from master) | Yes |
| Hosting (backend) | Render (Docker, free tier) | Yes |
| Domain | cut2fill.com.au (CNAME to GitHub Pages) | Yes |
| Build step | None — files deployed as-is | Yes |

---

## 4. Strategic Decisions

| Decision | Detail | Date |
|----------|--------|------|
| Soft launch before public launch | 10-20 trusted contacts, validate demand | April 2026 |
| Free tier is permanent | Free browsing/posting is not a beta perk — it's the model | March 2026 |
| No mobile app | Responsive web only for foreseeable future | March 2026 |
| QLD first, national later | NSW/VIC expansion is Phase 5 (2028+) | March 2026 |
| Doc 07 split | Roadmap separate from Material Tracking feature spec | April 2026 |
| Value prop reframe | Industry visibility + classification, not waste levies | April 2026 |
| Material testing standardisation | Key future differentiator | April 2026 |

---

## 5. Parent Organisation

| Field | Value |
|-------|-------|
| Company | Archers Group Pty Ltd |
| Founder | Matt Patterson |
| Location | Queensland, Australia |
| Related entity | Flowstate Civil (construction) |

---

*This document is append-only for decisions. If a decision changes, update the row and note the date. Never delete — cross out and explain why it changed.*
