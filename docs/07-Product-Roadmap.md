# Cut2Fill — Product Roadmap

**Version:** 1.0
**Date:** 7 April 2026
**Source:** Extracted from Material Tracking & Vision doc and Soft Launch Specification

---

## Overview

Five phases from current state (map + facilities) to full ecosystem (tracking, compliance, national expansion). Each phase builds on the last. No phase begins until the previous phase has validated demand.

---

## Phase 1: Map & Match (MVP) — DELIVERED

**Status:** Live at cut2fill.com.au
**Delivered:** March 2026

| Feature | Status |
|---------|--------|
| 604 verified facilities mapped (quarries, landfills, transfer stations, treatment) | Done |
| Fire ant biosecurity zone overlay (Zone 1 + Zone 2) | Done |
| LGA boundary overlay | Done |
| 12 major projects layer (Brisbane 2032 / SEQ infrastructure) | Done |
| 83+ water fill points (hidden from soft launch) | Done |
| Address search with geocoding | Done |
| Logistics & emissions calculator (3 truck profiles) | Done |
| Route line visualisation | Done |
| Supabase auth (register/login) | Done |
| Submission forms (site registration, source tip, feedback) | Done |
| Admin panel (submission review, facility CRUD, source health) | Done |
| User dashboard | Done |
| Backend API with PostGIS | Done |
| Landing page | Done |

### What Phase 1 Proved

- The data can be assembled (604 facilities verified manually)
- The compliance layer (fire ant zones) is technically feasible
- The platform runs on free-tier infrastructure
- The UI works on mobile and desktop

### What Phase 1 Did NOT Prove

- Whether industry professionals find it useful (soft launch will test this)
- Whether people will submit listings
- Whether suppliers want to manage their profiles
- Whether anyone will pay

---

## Soft Launch — IN PROGRESS

**Target:** April-July 2026
**Goal:** 10-20 trusted industry contacts validate demand

See `05-Soft-Launch-Specification.md` for full punch list and `12-Soft-Launch-Playbook.md` for tactical approach.

### Critical items (must ship)

| # | Feature | Effort |
|---|---------|--------|
| 1 | Listing model + router | Small |
| 2 | Admin listing approval | Small |
| 3 | Listing markers on map | Small |
| 4 | Connect post form to listing system | Small |
| 5 | Hide water fill points | Tiny |
| 6 | Fix "Create Free Account" flow | Tiny |
| 7 | Fix footer copyright | Tiny |
| 8 | Hide heatmap button | Tiny |
| 9 | Update landing page feature claims | Tiny |
| 10 | Listing expiry | Small |

### Important items (during soft launch)

| # | Feature | Effort |
|---|---------|--------|
| 11 | User profile after registration | Small |
| 12 | Facility claim for suppliers | Medium |
| 13 | Listing notifications | Medium |
| 14 | Move facility data to API | Medium |

---

## Phase 2: Cost & Specification — Q3-Q4 2026

**Prerequisite:** Soft launch validates demand (3+ return users, 5+ organic listings)

| Feature | Detail |
|---------|--------|
| True cost calculator with routing | Google/Mapbox Directions API replaces haversine distance |
| Material specification fields | MRTS05 / VENM / ENM structured classification |
| Confidence/risk scoring | Material match quality rating |
| Premium subscriptions launch | $50/month for cost calculator + spec matching |
| Standardised material testing guidance | What tests, what labs, what it costs per material type |

### Revenue starts here

| Feature | Price |
|---------|-------|
| True cost calculator | $50/month |
| Specification matching | $50/month |
| Estimator alerts | $50/month |

---

## Phase 3: Intelligence — Q1-Q2 2027

**Prerequisite:** Phase 2 has paying subscribers

| Feature | Detail |
|---------|--------|
| Geotech/contamination report upload | Users upload lab reports |
| AI document parsing | Extract material properties from uploaded PDFs |
| Treatment pathway recommendations | "Your material can be treated at X for $Y to meet spec Z" |
| Sustainability reporting | Tender-ready impact statements |
| Government pilot (2-3 councils) | Real-time material flow visibility for LGAs |

---

## Phase 4: Tracking — Q3-Q4 2027

**Prerequisite:** Government pilot interest confirmed

| Feature | Detail |
|---------|--------|
| Digital agreements between parties | Mutual acknowledgement of terms, material, volume, timing |
| Truck driver GPS tracking app | Auto-detect load/unload via geofencing |
| Automated load counting | No typing, no forms, no dockets |
| Compliance certificate generation | Downloadable PDF with full chain of custody, QR verification |
| Form B auto-population | TMR quality assurance documentation |
| Government data feed | Real-time material flow visibility |

### Revenue scales here

| Feature | Price |
|---------|-------|
| Material tracking (GPS) | $200/month per active agreement |
| Compliance certificates | $50 per certificate |
| API access | $500/month |

See `07b-Material-Tracking-Vision.md` for the full feature specification.

---

## Phase 5: Ecosystem — 2028+

**Prerequisite:** Phase 4 tracking system operational

| Feature | Detail |
|---------|--------|
| API for estimating software integration | Plug into existing tools |
| Weighbridge data integration | Automated tonnage verification |
| Treatment facility booking | Book treatment slots through the platform |
| National expansion (NSW, VIC) | Adapt regulatory layer for other states |
| EOW code advocacy | Data-driven submission to government |
| Regional material balance dashboard (government) | Real-time supply/demand across SEQ |
| Material passport | Full lifecycle tracking |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| March 2026 | Phase 1 is free, permanently | Network effects require low barriers |
| March 2026 | No mobile app | Responsive web covers the use case |
| March 2026 | QLD first | Regulatory complexity means state-by-state |
| April 2026 | Soft launch before public | Need to validate demand with trusted contacts |
| April 2026 | Revenue starts Phase 2 | Don't charge until the free product has proven value |
| April 2026 | Value prop = visibility + classification | Not waste levies (outcome, not pitch) |

---

*This roadmap is sequenced by dependency, not by ambition. Each phase validates the next. No phase is skipped.*
