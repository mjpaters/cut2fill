# Cut2Fill — Feasibility Study & CSIRO Kick-Start Grant Application Brief

**Version:** 1.0
**Date:** 23 March 2026
**Applicant:** Archers Group Pty Ltd

---

## 1. Feasibility Assessment

### 1.1 Technical Feasibility — CONFIRMED & DEMONSTRATED

| Component | Status | Evidence |
|-----------|--------|---------|
| Interactive mapping platform | **Built & deployed** | Leaflet.js map at cut2fill.com.au with 604 facilities, overlays, filters |
| Fire ant zone overlay | **Built & deployed** | QLD Government zone polygons with point-in-polygon checking |
| Registered facility mapping | **Built & deployed** | 604 verified facilities from TMR, GeoResGlobe, mining permits, EA Register |
| Backend API | **Built & deployed** | FastAPI on Render, async SQLAlchemy, PostGIS, 7 routers |
| User authentication | **Built & deployed** | Supabase JWT auth with JWKS validation, admin roles |
| Database / persistence | **Built & deployed** | Supabase PostgreSQL + PostGIS, Alembic migrations |
| Material matching algorithm | Feasible | Not yet built; spatial + material + date matching achievable |
| Compliance intelligence | Partially built | Regulatory framework mapped; material tooltips built; decision tree logic planned |
| Mobile responsiveness | **Built & deployed** | Responsive design with collapsible sidebar, mobile filter drawer |

**Key technical risk (mitigated):** The Environmental Authorities register geocoding challenge has been partially addressed — 604 facilities have been manually verified with coordinates. Full EA Register geocoding remains a future task for automated data refresh.

### 1.2 Market Feasibility — STRONG

**Demand indicators:**

1. **Waste levy escalation creates urgent economic need.** At $125/tonne (2025-26, metro zone), a single subdivision project generating 10,000m³ of clean fill (approximately 17,000 tonnes) faces a potential levy cost of **$2.13M** if sent to landfill as waste. Note: material accepted as day cover under operational purposes exemptions avoids the levy, but this is limited. The incentive to find reuse options is overwhelming and growing annually.

2. **Clean earth levy exemption removal (1 July 2023) is recent.** Industry is still adapting to the new cost reality. Many smaller operators are unaware of the exemption removal or don't know their options.

3. **Brisbane 2032 Olympics pipeline.** The largest construction program in QLD history is underway, generating and requiring massive volumes of material. Government will need visibility on material flows.

4. **No existing digital solution.** Industry currently relies on phone calls, personal networks, and occasional social media posts. The "Dial Before You Dump" phone service has no digital platform.

5. **Government alignment.** QLD Waste Management and Resource Recovery Strategy explicitly targets increased C&D waste diversion. The QLD Recycling Modernisation Fund (QRMF, successor to the now-closed RRIDP) funds resource recovery solutions. [QLD State Development](https://www.statedevelopment.qld.gov.au/industry/critical-industry-support/resource-recovery)

**Demand validation planned:**
- Survey of 30 civil earthworks companies in SEQ (Archers Group network)
- Interviews with 5 council waste management officers
- Letter of support from CCF QLD (Civil Contractors Federation)
- Letter of support from at least 2 SEQ councils

### 1.3 Financial Feasibility — VIABLE

**Break-even analysis:**

| Scenario | Monthly Cost | Revenue Required | Users Required |
|----------|-------------|-----------------|----------------|
| MVP (Year 1) | $5,300/month | $0 (funded) | N/A — user acquisition phase |
| Growth (Year 2) | $16,000/month | $15,000/month | 100 premium subscribers @ $50/month + API clients |
| Scale (Year 3) | $27,000/month | $62,500/month | 200 subscribers + transaction fees + govt contracts |

**Key financial insight:** The platform's value to a single large contractor can be demonstrated in a single transaction. One project that avoids sending 5,000m³ of clean fill to landfill saves approximately **$575,000 in waste levy costs**. Against that saving, a $50/month platform subscription is effectively zero cost.

### 1.4 Regulatory Feasibility — FAVOURABLE

- No regulatory barriers to operating a material exchange platform
- Platform facilitates compliance, does not replace or undermine it
- Government data sources are publicly available under open licenses (CC-BY 4.0)
- Fire ant zone data is published with intent for third-party use
- Appropriate disclaimers protect against liability (guidance only, not legal advice)

### 1.5 Organisational Feasibility — ACHIEVABLE

**Archers Group capabilities:**
- Direct construction industry experience and networks
- Understanding of QLD earthworks regulatory environment
- Demonstrated rapid prototyping capability (MVP built)
- Domain acquired (cut2fill)
- Existing business entity with ABN, GST registration, ACN

**Gaps to fill:**
- Dedicated product/development resource (CSIRO collaboration can fill R&D component)
- Government relationship manager (target: former DES or BQCC staff member)
- Industry advisory board (target: 3-5 members from major contractors, council, DES)

---

## 2. CSIRO Kick-Start Application Brief

### 2.1 Program Alignment

| CSIRO Requirement | Cut2Fill Fit |
|------------------|-------------|
| Turnover <$10M or trading <3 years | Archers Group meets one of these criteria |
| ACN held | Yes |
| GST registered | Yes |
| Cash matched funding ($10K-$50K) | Archers Group commits $50,000 cash match |
| R&D requiring scientific/technical expertise | Spatial data integration, matching algorithms, compliance decision modelling |
| 2-12 month project duration | 12-month project proposed |
| Aligns with CSIRO capability | CSIRO Data61 (spatial analytics), CSIRO Manufacturing (circular economy), CSIRO Environment (waste and contamination) |

### 2.2 Proposed R&D Project: "Intelligent Material Exchange for Construction Circular Economy"

**Project Title:** Development of a Spatially-Intelligent Material Exchange Platform for Construction Earthworks in South East Queensland

**Duration:** 12 months

**CSIRO Funding Requested:** $50,000

**Archers Group Cash Match:** $50,000

**Total Project Value:** $100,000

### 2.3 R&D Challenge Statement

*"How can spatial data analytics, regulatory intelligence, and material classification science be combined into a digital platform that optimises the reuse of construction earthworks material while ensuring compliance with QLD's complex, overlapping environmental, biosecurity, and planning regulations?"*

This challenge requires expertise beyond the applicant's capability in three areas:

**1. Spatial Data Science**
- Integration of multiple government spatial datasets (fire ant zones, mining permits, waste facilities, KRA overlays) into a unified geospatial engine
- Development of a spatial matching algorithm that considers proximity, transport corridors, zone boundaries, and LGA boundaries
- Geocoding and validation of 1,000+ facility addresses from the Environmental Authorities register

**2. Environmental Science / Contamination Assessment**
- Development of a material classification decision support model based on NEPM criteria
- Risk scoring for material types based on provenance, testing status, and regulatory classification
- Assessment of the feasibility and data requirements for developing an End of Waste (EOW) code submission for clean fill/excavated soil

**3. Data Analytics / Circular Economy Modelling**
- Development of metrics for measuring material diversion from landfill
- Carbon emission reduction modelling (avoided truck trips, avoided virgin material extraction)
- Economic modelling of waste levy savings and industry benefit
- Regional material balance analysis (supply vs demand by LGA)

### 2.4 Proposed Work Packages

| WP | Title | CSIRO Contribution | Archers Contribution | Duration |
|----|-------|-------------------|---------------------|----------|
| WP1 | Geospatial Data Integration & Validation | Spatial data science expertise, geocoding methodology, data quality framework | Platform development, data sourcing, field validation | Months 1-4 |
| WP2 | Material Classification Decision Model | Environmental science expertise, NEPM interpretation, risk assessment methodology | Industry input on practical workflows, user interface design | Months 3-7 |
| WP3 | Matching Algorithm & Compliance Engine | Algorithm design, spatial optimisation, constraint modelling (zone boundaries, transport corridors) | Platform integration, testing with real industry scenarios | Months 5-9 |
| WP4 | Impact Measurement & EOW Feasibility | Circular economy modelling, carbon accounting methodology, policy analysis | Data collection, industry engagement, stakeholder liaison | Months 8-12 |

### 2.5 Expected Outcomes

| Outcome | Measure | Timeframe |
|---------|---------|-----------|
| Functional platform with integrated government spatial data | All SEQ registered facilities mapped with verified coordinates | Month 6 |
| Material classification decision support tool | Validated against 50 real material exchange scenarios | Month 9 |
| Spatial matching algorithm with compliance checking | Demonstrated zone-crossing detection accuracy >99% | Month 9 |
| Circular economy impact model | Peer-reviewable methodology for material diversion metrics | Month 12 |
| EOW code feasibility report | Assessment of data requirements and regulatory pathway | Month 12 |
| Pilot with industry | 50 registered companies, 10 facilitated exchanges | Month 12 |

### 2.6 Why CSIRO?

The R&D challenge sits at the intersection of:
- **Data61** — spatial data integration, algorithm development, geospatial analytics
- **CSIRO Environment** — contaminated land science, waste management, regulatory frameworks
- **CSIRO Manufacturing** — circular economy research, industrial ecology, material flows

CSIRO's existing research programs in **Circular Economy** and **Sustainable Materials Management** directly align with this project. CSIRO has published extensively on construction waste diversion and circular economy metrics.

### 2.7 Commercialisation Pathway

| Phase | Milestone | Revenue |
|-------|----------|---------|
| R&D (Year 1) | Platform development, data integration, pilot | $0 (grant-funded) |
| Market entry (Year 2) | 200 companies, premium features launch | $180K ARR |
| Growth (Year 3) | Government contracts, state-wide expansion | $750K ARR |
| Scale (Year 4-5) | National platform, multiple state jurisdictions | $2-5M ARR |

**Exit / scale pathways:**
- Acquisition by government (platform becomes public infrastructure)
- Acquisition by construction technology company (e.g., Procore, Aconex)
- Partnership/licensing with waste management companies (Cleanaway, Veolia, Remondis)
- SaaS growth to national platform (each state has equivalent regulations)

### 2.8 National Scalability

Every Australian state has:
- State-specific contaminated land registers
- Waste levies (NSW, VIC, QLD, SA, WA)
- Planning requirements for fill placement
- Biosecurity obligations (fire ants specific to QLD but other pests nationally)
- Construction material movement challenges

The QLD platform serves as the proof of concept. The regulatory intelligence layer is modular — state-specific rules can be added as configuration, not code rewrites.

---

## 3. Risk Assessment

### 3.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Government data quality issues | High | Medium | Cross-reference multiple sources; build user-reported correction mechanism |
| Geocoding errors for EA register | Medium | Medium | Manual validation of key facilities; use multiple geocoding services |
| Fire ant zone boundary precision | Low | High | Use official data source; monthly refresh; disclaimer on approximate boundary display |
| Matching algorithm produces poor matches | Medium | Medium | Human review loop in MVP; iterate algorithm based on user feedback |
| Platform scalability under load | Low | Low | Cloud hosting with auto-scaling; CDN for static assets |

### 3.2 Market Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Industry slow to adopt digital tools | Medium | High | Free tier removes cost barrier; direct outreach via industry bodies; demonstrate ROI per transaction |
| Government unwilling to partner | Low | Medium | Platform provides value independently; partnership enhances but isn't required |
| Competitor launches similar platform | Medium | Medium | First-mover advantage; compliance depth as moat; government relationships |
| Users post inaccurate listings | High | Medium | Verification process; user reputation system; disclaimers |

### 3.3 Regulatory Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Liability for compliance guidance | Medium | High | Clear disclaimers (guidance only, not legal advice); link to official sources; professional indemnity insurance |
| Regulation changes invalidate guidance | Medium | Medium | Modular compliance rules; monitoring of legislative changes; automated alerts |
| Platform perceived as facilitating non-compliance | Low | Very High | Compliance-first design; government partnership; audit trail; refuse listings for obviously non-compliant material |

---

## 4. Letters of Support (To Be Obtained)

The following letters of support will strengthen the CSIRO application:

| Organisation | Contact | Purpose |
|-------------|---------|---------|
| Civil Contractors Federation QLD | CEO/GM | Industry body endorsement |
| Brisbane City Council (Waste & Resource Recovery) | Manager | LGA support, data access |
| Logan City Council | Waste officer | LGA support, pilot partnership |
| Biosecurity Queensland (BQCC) | Director | Fire ant data partnership |
| QLD Department of Environment & Science | Waste policy officer | Regulatory alignment |
| 2-3 civil earthworks companies | Directors | End-user demand validation |

---

## 5. Budget Breakdown (CSIRO Application)

### 5.1 CSIRO Contribution ($50,000)

| Item | Amount | Detail |
|------|--------|--------|
| Spatial data scientist (0.2 FTE, 12 months) | $25,000 | Geospatial integration, geocoding, algorithm design |
| Environmental scientist (0.1 FTE, 6 months) | $12,500 | Material classification model, NEPM, EOW feasibility |
| Circular economy analyst (0.1 FTE, 4 months) | $7,500 | Impact metrics, carbon accounting, policy analysis |
| Computing / data infrastructure | $5,000 | Cloud resources, data processing |

### 5.2 Archers Group Cash Match ($50,000)

| Item | Amount | Detail |
|------|--------|--------|
| Platform development | $25,000 | Frontend, backend, database, hosting |
| Data acquisition & processing | $5,000 | Geocoding API costs, data licensing (if any) |
| Industry engagement & validation | $8,000 | Travel, meetings, pilot support |
| Project management | $7,000 | Coordination, reporting, milestone tracking |
| Legal & IP | $5,000 | Terms of service, disclaimers, IP protection |

---

## 6. Timeline

```
2026 Q2 (Apr-Jun)     CSIRO EOI submission and scoping
                       ├─ Submit Expression of Interest
                       ├─ Scope project with CSIRO researcher
                       └─ Secure letters of support

2026 Q3 (Jul-Sep)     WP1: Geospatial Data Integration
                       ├─ Integrate fire ant zone data (official source)
                       ├─ Geocode EA register facilities
                       ├─ Map quarries from Mining Permits REST API
                       ├─ Load KRA overlays
                       └─ Data quality validation

2026 Q3-Q4             WP2: Material Classification Model
                       ├─ Map NEPM criteria to decision logic
                       ├─ Build classification guidance engine
                       ├─ Validate with environmental consultants
                       └─ Integrate into platform

2026 Q4-2027 Q1        WP3: Matching Algorithm & Compliance
                       ├─ Spatial matching with zone awareness
                       ├─ Compliance decision engine
                       ├─ Transport corridor optimisation
                       └─ Beta testing with industry partners

2027 Q1-Q2             WP4: Impact & EOW Feasibility
                       ├─ Circular economy metrics framework
                       ├─ Carbon accounting methodology
                       ├─ EOW code feasibility assessment
                       ├─ Pilot results analysis
                       └─ Final report and publication
```

---

## 7. Intellectual Property

| IP Component | Owner | Notes |
|-------------|-------|-------|
| Platform code | Archers Group | Developed independently and with CSIRO collaboration |
| Matching algorithm | Joint — negotiable with CSIRO | Core R&D output |
| Material classification model | Joint — negotiable with CSIRO | Based on public regulatory frameworks |
| Impact measurement methodology | Joint — negotiable with CSIRO | Publishable/shareable for industry benefit |
| Government data integrations | N/A — public data | CC-BY 4.0 licensed, no IP restrictions |
| Domain and brand (Cut2Fill) | Archers Group | Trademark to be registered |

**CSIRO Kick-Start IP note:** Standard CSIRO Kick-Start terms provide for IP to be owned by the business with CSIRO retaining rights to publish and use for further research. Specific terms negotiated per project.
