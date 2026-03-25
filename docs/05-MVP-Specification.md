# Cut2Fill — MVP Technical Specification

**Version:** 1.0
**Date:** 23 March 2026

---

## 1. MVP Scope

### 1.1 In Scope

| Feature | Description |
|---------|------------|
| Cut2Fill branding | Logo, tagline, page title |
| Interactive map | Leaflet.js with SEQ region, dark theme |
| Listing types | Fill Available, Fill Wanted, Public Tip/Transfer Station, Private Dump Site |
| Material types (8) | Clean Fill, Rock/Rubble, Sand, Topsoil, Concrete/Asphalt, Mixed C&D, Acid Sulfate Soil, Contaminated Soil |
| Material compliance tooltips | QLD-specific regulatory guidance per material type |
| Pricing | Free / Quote Required (two-tier) |
| Delivery/Pickup | Separate checkboxes with icon badges |
| Date availability badges | Available Now, Starting Soon, Expiring Soon |
| Fire ant zone overlays | Zone 1 (red), Zone 2 (orange) — toggle on/off |
| Zone crossing warnings | Warning banner when matching across zones |
| BQCC zone checker link | Direct link to official zone checking tool |
| Registered facilities | Curated SEQ quarries, tips, treatment facilities as map markers |
| Matching engine | Material + zone-aware matching with visual connection lines |
| Filters | Type, material, pricing, status, delivery, volume range, search |
| Listings view | Card grid with badges, sorting |
| Dashboard | Material flow stats, regional bars, material chart, recent matches |
| Post listing form | Full form with material tooltips, pricing radios, delivery/pickup checkboxes |
| Minimum volume | 100m³ enforced in form |

### 1.2 Out of Scope (Phase 2)

| Feature | Reason |
|---------|--------|
| User authentication | Requires backend |
| Data persistence | Requires database |
| Real-time notifications | Requires backend + email/SMS service |
| Live government data integration | Requires ETL pipeline |
| Transport cost calculator | Requires routing API and cost model |
| Document upload (geotech reports) | Requires file storage |
| Material specification matching (MRTS) | Requires specification database |
| Compliance documentation generation | Requires templating engine |
| Mobile app | Web-first approach sufficient for MVP |

---

## 2. Minimum Volume Enforcement

The form enforces a **100m³ minimum** to maintain professional positioning:

```javascript
// In form validation
document.getElementById('formVolume').min = 100;
// Placeholder updated to reflect minimum
// "e.g. 500 (minimum 100m³)"
```

Sample data updated to remove listings below 100m³ threshold.

---

## 3. Registered Facility Layer

Facilities are displayed as a distinct marker layer (different from user-posted listings):

| Facility Type | Icon | Colour | Source |
|--------------|------|--------|--------|
| Quarry | `fa-gem` | Grey (#9ca3af) | QLD Mining Permits |
| Landfill | `fa-dumpster` | Brown (#92400e) | QLD Waste Facilities |
| Transfer Station | `fa-recycle` | Blue (#3b82f6) | QLD Waste Facilities |
| Soil Treatment | `fa-flask` | Purple (#8b5cf6) | EA Register |
| C&D Recycler | `fa-cogs` | Teal (#14b8a6) | EA Register |
| PFAS Treatment | `fa-biohazard` | Red (#ef4444) | EA Register |

Facilities are always visible on the map (not affected by listing filters) with a separate toggle control.

---

## 4. File Structure

```
C:/material-exchange/          (development)
├── index.html                 Main application
├── styles.css                 Stylesheet
├── app.js                     Application logic + sample data
└── data/                      (Phase 2 — static data files)
    ├── facilities.json        Curated SEQ facilities
    ├── fire-ant-zones.json    Simplified zone polygons
    └── quarries.json          SEQ quarry locations

Cut2Fill/                      (OneDrive — project files)
├── index.html                 Copy of MVP
├── styles.css                 Copy of MVP
├── app.js                     Copy of MVP
├── mvp/                       (future: production build)
└── docs/
    ├── 01-Business-Plan.md
    ├── 02-Regulatory-Framework.md
    ├── 03-Feasibility-Study.md
    ├── 04-Data-Sources.md
    └── 05-MVP-Specification.md
```

---

## 5. Deployment

### MVP (Current)
- Static files served via `npx http-server` on port 8070
- No backend required
- All data embedded in app.js

### Phase 2
- Frontend: Static hosting (Netlify, Vercel, or CloudFront)
- Backend: FastAPI or Node.js on AWS/GCP
- Database: PostgreSQL + PostGIS on managed service
- Domain: cut2fill.com.au → DNS configured to hosting

---

## 6. Browser Support

| Browser | Support |
|---------|---------|
| Chrome (desktop + mobile) | Full |
| Safari (desktop + iOS) | Full |
| Firefox | Full |
| Edge | Full |
| IE11 | Not supported |

---

## 7. Performance Targets

| Metric | Target |
|--------|--------|
| Initial page load | <2 seconds on 4G |
| Map interaction (zoom/pan) | 60fps |
| Filter application | <100ms |
| Marker rendering (25 listings) | <50ms |
| Marker rendering (500 listings — Phase 2) | <200ms with clustering |
