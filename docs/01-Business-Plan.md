# Cut2Fill — Business Plan

**Version:** 1.0
**Date:** 23 March 2026
**Prepared by:** Archers Group Pty Ltd
**ABN:** [Insert]
**Domain:** cut2fill.com.au (acquired)

---

## 1. Executive Summary

Cut2Fill is a digital platform that connects construction projects generating surplus earthworks material with projects that need it — eliminating unnecessary landfill disposal, reducing truck movements, and streamlining regulatory compliance for material movement across South East Queensland (SEQ).

The platform addresses a $380M+ annual problem: SEQ's construction industry generates approximately 3.4 million tonnes of construction and demolition (C&D) waste annually (23.2% of QLD's total waste stream), with an estimated 571,000 tonnes of reusable material still going to landfill. Since 1 July 2023, the removal of the clean earth levy exemption means every tonne of reusable fill sent to landfill now costs the industry $115/tonne (rising to $145/tonne by 2027-28) — a cost that didn't exist two years ago.

Cut2Fill is not a classifieds board for free dirt. It is a **compliance-first material exchange platform** designed for professional earthworks at scale (minimum 100m³), targeting government, tier 1-3 contractors, and licensed facilities. The platform integrates regulatory guidance, fire ant biosecurity zone awareness, registered facility mapping, and material classification compliance into every transaction.

### The Opportunity

- **$65.7M/year** in avoidable waste levy costs on reusable material (571,000t × $115/t)
- **No existing End of Waste (EOW) code** for soil/fill in Queensland — a regulatory gap that forces conservative disposal decisions
- **Brisbane 2032 Olympics** driving unprecedented SEQ construction activity
- **Fire ant biosecurity compliance** adds complexity and cost to every soil movement — no digital tool currently streamlines this
- **Government actively seeking** circular economy solutions (QLD Waste Management and Resource Recovery Strategy, Resource Recovery Industry Development Program funding up to $10M)

### Revenue Model

| Phase | Revenue Stream | Target |
|-------|---------------|--------|
| Year 1 | Free platform — user acquisition | 200 registered companies |
| Year 2 | Premium listings, verified supplier badges, API access | $180K ARR |
| Year 3 | Transaction facilitation, compliance documentation, government data licensing | $750K ARR |

---

## 2. Problem Statement

### 2.1 The Waste Problem

South East Queensland's construction boom (driven by population growth of 90,000+/year, Brisbane 2032 infrastructure, and Cross River Rail) generates enormous volumes of excavated material. Currently:

- **3.4 million tonnes** of C&D waste generated annually in QLD
- **571,000 tonnes** of reusable material still going to landfill
- **Waste levy of $115/tonne** (2025-26) applies to ALL material entering licensed landfills, including clean earth since the exemption removal on 1 July 2023
- **No centralised platform** connects material generators with material receivers
- Project managers rely on phone calls, word of mouth, and personal networks

### 2.2 The Compliance Problem

Moving earthworks material in Queensland involves overlapping regulatory requirements that are difficult for non-specialists to navigate:

| Regulation | Trigger | Consequence of Non-Compliance |
|-----------|---------|-------------------------------|
| EP Act 1994 s.319 | General environmental duty — ALL earthworks | Civil and criminal penalties |
| EP Act 1994 s.424-425 | Moving soil from EMR/CLR listed land | 100 penalty units ($16,692) per offence |
| Biosecurity Act 2014 s.23 | Moving soil within/between fire ant zones | 750 penalty units ($125,175) individuals; 3,750 ($625,875) corporations |
| EP Regulation 2019 ERA 60 | Disposing of waste at unlicensed site | Prosecution, remediation orders |
| State Planning Policy (ASS) | Excavation ≥100m³ below 5m AHD | Stop-work orders, remediation |
| Local government | Fill placement without approval | Compliance notices, fines |

The penalty for moving soil across a fire ant biosecurity zone boundary without a Biosecurity Instrument Permit (BIP) is **$125,175 for an individual and $625,875 for a corporation**. Yet there is no digital tool that alerts a project manager when a material exchange would cross zone boundaries.

### 2.3 The Information Problem

Critical data exists but is fragmented across multiple government systems:

- **Environmental Authorities Register** — lists all ERA-licensed facilities but has no coordinates (text addresses only)
- **QLD Waste Facilities Dataset** — has coordinates but last updated October 2018
- **Mining permits** — available via ArcGIS REST API but requires GIS expertise to query
- **Fire ant zones** — updated monthly via QLD Open Data but not integrated into any industry tool
- **EMR/CLR registers** — searchable only via DES website, no API

No single platform consolidates this information into an actionable tool for construction professionals.

---

## 3. Solution

### 3.1 Platform Overview

Cut2Fill is a web-based platform (responsive, mobile-ready) with three core capabilities:

**1. Material Exchange**
- Post listings for material available (surplus) or material wanted (demand)
- Minimum 100m³ per listing — professional scale only
- Smart matching algorithm considers material type, volume, location proximity, date overlap, and zone compatibility
- Two pricing tiers: **Free** (material available at no cost) or **Quote Required** (commercial arrangement)

**2. Compliance Intelligence**
- Automatic fire ant biosecurity zone checking on every listing
- Zone crossing warnings when matching listings across different biosecurity zones
- Material classification guidance with QLD-specific regulatory references
- Links to relevant permits, forms, and government resources
- Educational content for each material type (EP Act requirements, ASS management, contaminated land procedures)

**3. Registered Facility Mapping**
- All SEQ quarries (from QLD Mining Permits ArcGIS REST API)
- Licensed landfills and transfer stations (from QLD Waste Facilities dataset + EA Register)
- Licensed soil treatment facilities (ERA 53, 54, 55, 60 filtered from EA Register)
- PFAS treatment facilities
- C&D recyclers
- Key Resource Areas (KRA) overlay
- Fire ant biosecurity zone overlay (from QLD Open Data, updated monthly)

### 3.2 Target Users

| User Type | Need | Cut2Fill Value |
|-----------|------|---------------|
| **Tier 1-3 Contractors** | Dispose of surplus material quickly, cheaply, compliantly | Find receivers near their site, avoid $115/t levy, compliance guidance |
| **Civil Earthworks Companies** | Source fill material for projects | Find verified supply, reduce virgin quarry dependence |
| **Local Councils** | Monitor material flows, support circular economy targets | Dashboard data, facilitate reuse within LGA |
| **State Government (DES, TMR, BQCC)** | Track material movements, enforce compliance | Platform data informs policy, zone compliance built-in |
| **Licensed Facilities** | Attract customers, fill capacity | Permanent listings, verified badges, visibility |
| **Developers** | Manage earthworks costs on large projects | Find competitive fill/disposal options with compliance certainty |

### 3.3 What Cut2Fill Is NOT

- Not a marketplace for small residential loads (<100m³)
- Not a waste broker or transport company
- Not a testing laboratory or certification body
- Not a permit issuer — we provide guidance and links to government services

---

## 4. Market Analysis

### 4.1 Market Size

**SEQ Construction Earthworks Market:**

| Metric | Value | Source |
|--------|-------|--------|
| SEQ population growth | ~90,000/year | QLD Government Statistician |
| C&D waste generated (QLD) | 3.4M tonnes/year | QLD Waste Data Report |
| C&D waste to landfill | 571,000 tonnes/year | QLD Waste Strategy |
| Waste levy cost on reusable material | $65.7M/year | 571,000t × $115/t |
| Active construction sites SEQ (est.) | 2,000-3,000 | ABS Building Approvals |
| Major infrastructure projects (2025-2030) | 50+ ($50B+ pipeline) | Infrastructure Australia |

**Key infrastructure projects driving demand:**
- Brisbane 2032 Olympic & Paralympic Games venues and athlete village
- Cross River Rail (operational 2025, legacy works continuing)
- M1 Pacific Motorway upgrades
- Inland Rail (QLD section)
- Brisbane Metro
- Gold Coast Light Rail Stage 4
- Sunshine Coast Airport expansion
- Multiple major residential subdivisions (Springfield, Ripley, Yarrabilba, Caboolture West)

### 4.2 Competitive Landscape

| Competitor | Type | Weakness |
|-----------|------|----------|
| **ReadyFill** (readyfill.com.au) | WordPress classifieds for free fill | Small loads, no compliance, no mapping, no matching, residential focus |
| **Dial Before You Dump** | QLD phone service | Phone-only, no digital platform, no matching |
| **iSeekPlant / PlantMiner** | Equipment hire marketplace | Equipment focus, not material exchange |
| **UrbanMine** (Canada) | Material exchange platform | Not Australian, no QLD compliance |
| **Word of mouth / phone calls** | Industry default | No traceability, no compliance, no data |

**Cut2Fill's moat:** QLD-specific regulatory intelligence, fire ant zone integration, registered facility data, and government partnership positioning. No competitor has any of these.

### 4.3 Regulatory Tailwinds

1. **Waste levy escalation** — $115/t (2025-26) → $125/t (2026-27) → $145/t (2027-28). Every year, the economic case for reuse strengthens.
2. **Clean earth exemption removal** (1 July 2023) — previously, clean earth was exempt from the waste levy. Its removal created an entirely new cost pressure that didn't exist before.
3. **QLD Waste Management and Resource Recovery Strategy** — sets targets for C&D waste diversion.
4. **Resource Recovery Industry Development Program** — government funding up to $10M for C&D waste solutions.
5. **No EOW code for soil/fill** — this regulatory gap means there is no streamlined pathway for declaring excavated soil as "not waste." Cut2Fill can advocate for and facilitate the development of such a code.
6. **Brisbane 2032 sustainability commitments** — the Olympics bid included commitments to circular economy and sustainable construction.

---

## 5. Technology & Data Strategy

### 5.1 Architecture (MVP)

**Frontend:** Single-page application (HTML/CSS/JavaScript)
- Leaflet.js for mapping (open source, no API key required)
- Responsive design for field use on tablets/phones
- No framework dependency for MVP — vanilla JS for speed and simplicity

**Backend (Phase 2):**
- Node.js or Python (FastAPI) REST API
- PostgreSQL with PostGIS for spatial queries
- Authentication (email/password + optional Google OAuth)
- Listing CRUD, matching algorithm, notification system

**Data Integration:**

| Source | Method | Refresh |
|--------|--------|---------|
| Fire ant zones | QLD Open Data GPKG/SHP download or ArcGIS REST API (Layer 65) | Monthly |
| Quarries/mining permits | ArcGIS REST MapServer (MinesPermitsCurrent) | Live query |
| Key Resource Areas | QLD Open Data SHP + ArcGIS REST | Quarterly |
| Waste facilities | QLD Open Data CSV (CKAN API) | On update |
| Environmental Authorities | QLD Open Data XLSX + geocoding | Monthly |
| BCC transfer stations | BCC Open Data GeoJSON API | Quarterly |

### 5.2 Matching Algorithm

The matching engine considers:
1. **Material compatibility** — type match (e.g., clean fill available → clean fill wanted)
2. **Volume overlap** — minimum viable exchange quantity
3. **Proximity** — distance between sites (driving distance, not straight line — Phase 2)
4. **Date overlap** — availability windows must intersect
5. **Zone compatibility** — flag if exchange crosses fire ant biosecurity zone boundary
6. **Compliance requirements** — flag if material type requires permits (contaminated soil, ASS)

### 5.3 Data Moat

Over time, Cut2Fill accumulates:
- Historical material flow data across SEQ
- Pricing intelligence (market rates for different materials)
- Seasonal patterns in supply and demand
- Transport corridor utilisation
- Facility capacity and utilisation rates

This data becomes increasingly valuable to government for policy making and to industry for project planning.

---

## 6. Go-to-Market Strategy

### Phase 1: MVP & Validation (Months 1-6)

**Goal:** 50 registered companies, 200 active listings

- Launch free platform with sample data demonstrating capability
- Direct outreach to 20 civil earthworks companies in SEQ (Archers Group network)
- Present to CCIQ (Chamber of Commerce & Industry QLD) construction committee
- Present to CCF QLD (Civil Contractors Federation) members
- Seek endorsement from 2-3 councils (start with BCC and Logan)

**Key milestone:** First real material exchange facilitated through the platform

### Phase 2: Government Partnership (Months 6-12)

**Goal:** Government endorsement, 200 companies, platform with real data

- Formal approach to QLD Department of Environment and Science (DES)
- Partnership discussion with Biosecurity Queensland (BQCC) — integrate official zone data
- Present to SEQ Council of Mayors
- Submit data to support development of an EOW code for clean fill
- Apply for Resource Recovery Industry Development Program funding

### Phase 3: Revenue & Scale (Months 12-24)

**Goal:** Revenue generation, state-wide expansion

- Launch premium features (verified supplier badges, priority listing, API access)
- Transaction facilitation (optional — Cut2Fill manages compliance documentation)
- Expand beyond SEQ to QLD-wide, then nationally
- Government data licensing agreements

---

## 7. Financial Projections

### 7.1 Costs

| Item | Year 1 | Year 2 | Year 3 |
|------|--------|--------|--------|
| Development (platform) | $40,000 | $60,000 | $80,000 |
| Hosting & infrastructure | $3,600 | $7,200 | $14,400 |
| Data integration & maintenance | $5,000 | $12,000 | $20,000 |
| Marketing & outreach | $10,000 | $25,000 | $40,000 |
| Personnel (part-time → full-time) | $0* | $80,000 | $160,000 |
| Legal & compliance | $5,000 | $8,000 | $10,000 |
| **Total** | **$63,600** | **$192,200** | **$324,400** |

*Year 1 development via Archers Group internal capacity + AI-assisted development

### 7.2 Revenue

| Stream | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Platform fees (free) | $0 | — | — |
| Premium listings ($50/month) | — | $60,000 | $120,000 |
| Verified supplier badges ($200/year) | — | $20,000 | $60,000 |
| API access (councils, large contractors) | — | $50,000 | $150,000 |
| Transaction facilitation (1% of matched value) | — | $50,000 | $250,000 |
| Government data licensing | — | — | $170,000 |
| **Total** | **$0** | **$180,000** | **$750,000** |

### 7.3 Funding Strategy

| Source | Amount | Timing | Status |
|--------|--------|--------|--------|
| Archers Group internal | $40,000 | Immediate | Committed |
| CSIRO Kick-Start (Voucher 1) | $50,000 (matched) | Q2 2026 | Application pending |
| QLD Advance Queensland | $25,000 | Q3 2026 | To be investigated |
| Resource Recovery Industry Development Program | Up to $5M | Q4 2026 | Expression of interest |
| CSIRO Kick-Start (Voucher 2) | $50,000 (matched) | 2027 | Conditional on V1 completion |

---

## 8. Team

**Archers Group Pty Ltd** is a Queensland-based construction and engineering consultancy with direct industry experience in civil earthworks, project management, and regulatory compliance.

| Role | Person | Capability |
|------|--------|-----------|
| Founder / Product | Matthew Patterson | Civil construction industry experience, Archers Group director, domain expertise in earthworks compliance |
| Technical Development | AI-assisted development | Rapid prototyping capability demonstrated (MVP built) |
| Industry Advisory | [TBD — target CCF QLD committee member] | Industry credibility and network |
| Government Advisory | [TBD — target former DES/BQCC officer] | Regulatory expertise and government pathway |

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Low user adoption | Medium | High | Free platform, direct industry outreach, government endorsement |
| Regulatory change | Low | Medium | Platform designed for flexibility, ongoing monitoring |
| Competitor enters market | Medium | Medium | First-mover advantage, QLD-specific compliance moat, government relationships |
| Data accuracy issues | Medium | High | Official government data sources, user verification, disclaimer framework |
| Government won't partner | Low | Medium | Platform provides value independently; partnership enhances but isn't required |
| Fire ant zone boundaries change | Certain | Low | Monthly data refresh from official source |
| Legal liability for compliance guidance | Medium | High | Clear disclaimers — guidance only, not legal advice. Link to official sources. |

---

## 10. Impact Metrics

Cut2Fill will track and report:

| Metric | Year 1 Target | Year 3 Target |
|--------|--------------|--------------|
| Material diverted from landfill | 50,000 m³ | 500,000 m³ |
| Waste levy savings for industry | $3.8M | $38M |
| Truck trips avoided | 4,200 | 42,000 |
| CO₂ emissions avoided (tonnes) | 630 | 6,300 |
| Registered companies | 200 | 2,000 |
| Active listings | 500 | 5,000 |
| Government partnerships | 2 councils | All SEQ councils + DES |

---

## Appendices

- Appendix A: QLD Regulatory Compliance Framework (see 02-Regulatory-Framework.md)
- Appendix B: Feasibility Study & CSIRO Grant Application (see 03-Feasibility-Study.md)
- Appendix C: SEQ Registered Facilities Data Sources (see 04-Data-Sources.md)
- Appendix D: MVP Technical Specification (see 05-MVP-Specification.md)
- Appendix E: Cost Intelligence & Material Specification Engine (see 06-Cost-Intelligence-Feature.md)
- Appendix F: Material Tracking, Compliance Automation & Long-Term Vision (see 07-Material-Tracking-and-Vision.md)
