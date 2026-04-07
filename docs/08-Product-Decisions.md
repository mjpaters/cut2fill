# Cut2Fill — Product Decisions & Revenue Roadmap

**Version:** 1.1
**Date:** 7 April 2026 *(v1.0: 24 March 2026)*
**Purpose:** Living document for product decisions, revenue strategy, and feature prioritisation. Updated as decisions are made.

---

## 1. Current State (April 2026)

### What's Live

Full-stack platform deployed at cut2fill.com.au with real verified data.

| Component | Status | Notes |
|-----------|--------|-------|
| Landing page | Live | Marketing page with hero, features, embedded map preview |
| Interactive map (Leaflet.js) | Live | SEQ region, dark theme, 604 facility markers |
| 8 material types with compliance tooltips | Live | QLD-specific regulatory guidance |
| Fire ant zone overlays | Live | Zone 1/2 with point-in-polygon checking |
| LGA boundary overlays | Live | All SEQ councils |
| Registered facilities (604) | Live | 488 quarries, 50 concrete, 44 transfer, 10 landfill, 7 soil treatment, 3 C&D recycler, 2 PFAS — all manually verified |
| Water fill points (83+) | Live | QUU, Unitywater, Gold Coast CC, Logan CC, Redland CC — to be hidden for soft launch |
| Major projects layer (12) | Live | Brisbane 2032 + SEQ infrastructure pipeline with phases |
| Logistics & emissions calculator | Live | 3 truck profiles, fuel, CO2, trips, time |
| Address search + geocoding | Live | Nominatim |
| Listing form (100m³ minimum) | Live | Submits to backend as site registration for review |
| Source tip + feedback forms | Live | Submit to backend with Formspree fallback |
| Dashboard with stats | Live | Facility counts by type |
| User accounts / auth | Live | Supabase email/password, JWT validation |
| Backend API (FastAPI) | Live | 7 routers, PostGIS, rate limiting, admin endpoints |
| Admin panel | Live | Submission review, facility CRUD, source health, user management |
| User dashboard | Live | Submission tracking |
| Database (PostgreSQL + PostGIS) | Live | Supabase hosted, 2 Alembic migrations |
| Domain (cut2fill.com.au) | Live | GitHub Pages with CNAME |
| Backend hosting (Render) | Live | Docker, free tier |

### What This Means

We have a working platform with real data, deployed infrastructure, and user auth. The gap between current state and soft market launch is: a visible listing system (submit → review → appear on map), hiding unfinished features, and correcting landing page claims. See 05-Soft-Launch-Specification.md for the full punch list.

### Key Decision (April 2026): Soft launch before matching engine

The matching algorithm, trade modules, and cost intelligence engine are deferred. Soft launch focuses on: facility visibility, compliance overlays, listings with admin review, and logistics calculator. Prove the value of industry-wide visibility before building complex features.

---

## 2. Platform Vision — From Earthworks to Construction Industry Tool

### The Evolution

Cut2Fill started as an earthworks material exchange. But what we're actually building is simpler and bigger at the same time: **a free platform that shows construction companies what's around them.**

The universal layer is dead simple — show suppliers in the network on a map. That's it. Grow the supplier network, grow the features slowly as the data tells us what people need. Don't overengineer it. The value is in the network, not in complex features.

Then, as the network grows, we add trade-specific views that filter out the noise. A concrete contractor doesn't want to see quarries. An earthmover doesn't want to see reo suppliers. Trade modules are just filters on the same network — with suppliers paying to be visible in their trade.

> **Show what's nearby → Let people find what they need → Connect them → Collect the data → Sell the insights**

### Platform Structure

```
CUT2FILL PLATFORM (free for all users)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
├── UNIVERSAL LAYER (free, always)
│   ├── Interactive map with all facilities
│   ├── Safety layer (hospitals, fire stations, police)
│   ├── Fire ant zone overlays
│   ├── Project cut/fill site mapping
│   ├── Cost comparison tools
│   ├── Compliance guidance
│   └── Project reports for tenders
│
├── TRADE MODULES (subscription per trade)
│   │
│   ├── EARTHMOVING MODULE ← we build this first
│   │   ├── Quarries, tips, transfer stations, treatment facilities
│   │   ├── Material exchange (fill available/wanted)
│   │   ├── Material specification matching (MRTS05)
│   │   ├── Quarry product comparison (densities, specs, pricing)
│   │   ├── Automated quoting from quarries
│   │   ├── Waste levy calculator
│   │   └── Supply chain carbon mapping
│   │
│   ├── CONCRETE MODULE ← second trade
│   │   ├── Batch plants mapped (Hanson, Boral, Holcim, independents)
│   │   ├── Concrete pump suppliers
│   │   ├── Reinforcement suppliers (mesh, rebar, fibres)
│   │   ├── Trade stores (tools, formwork, consumables)
│   │   ├── Concrete waste/washout dumping sites
│   │   ├── Testing labs (NATA certified)
│   │   ├── Specification matching (AS1379, project specs)
│   │   ├── Mix design comparison (strength, slump, aggregate size)
│   │   ├── Automated quoting from batch plants
│   │   └── Carbon comparison (cement content, SCM substitution)
│   │
│   ├── STRUCTURAL STEEL MODULE ← future
│   │   ├── Fabricators mapped
│   │   ├── Steel suppliers (merchant bar, structural sections)
│   │   ├── Hot-dip galvanising facilities
│   │   ├── Bolt/fastener suppliers
│   │   ├── Scrap metal recyclers
│   │   ├── Specification matching (AS4100, weld categories)
│   │   └── Automated quoting from fabricators
│   │
│   ├── DRAINAGE / CIVIL MODULE ← future
│   │   ├── Pipe suppliers (concrete, HDPE, PVC)
│   │   ├── Precast suppliers (pits, headwalls, culverts)
│   │   ├── Geotextile/geogrid suppliers
│   │   └── Stormwater modelling integration
│   │
│   ├── DEMOLITION MODULE ← future
│   │   ├── Licensed demolition contractors
│   │   ├── Asbestos removal/disposal facilities
│   │   ├── C&D recyclers
│   │   ├── Salvage/reuse yards
│   │   └── Waste classification guidance
│   │
│   └── [MORE TRADES AS DEMAND GROWS]
│       Paving, landscaping, electrical, plumbing, roofing...
│
└── DATA LAYER (monetised — sold to government, industry, researchers)
    ├── Material flow intelligence
    ├── Pricing benchmarks by trade
    ├── Supply chain carbon data
    ├── Regional supply/demand analysis
    └── Circular economy impact reporting
```

### Why Trade Modules Work

**For users (free):** The universal platform shows everything. But a concrete contractor doesn't care about quarry densities, and an earthmover doesn't care about rebar suppliers. Trade modules act as a **filter** — switch to your trade and the platform shows only what's relevant to you. Batch plants, not quarries. Reo suppliers, not quarry trucks. Washout sites, not clean fill listings.

**For suppliers (subscription):** A batch plant pays $200-500/mo to be listed in the concrete module with enhanced profile, automated quoting, and analytics. A reo supplier pays the same. A quarry pays to be in the earthmoving module. Each trade module is a **supplier marketplace** where the suppliers pay for visibility and demand signals, and the users get the information free.

**For Cut2Fill (revenue):** Each trade module is a new revenue stream. The earthmoving module is where we prove the model. Once it works — suppliers paying, users happy, data flowing — we replicate it for concrete, steel, drainage, demolition. Same platform, same architecture, new suppliers paying.

### The Concrete Module — Worked Example

A concrete contractor opens Cut2Fill, switches to the Concrete trade view:

```
CONCRETE VIEW — Springfield Rise Estate

BATCH PLANTS NEARBY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hanson — Goodna          8km    N32 available now
  40MPa/20mm/100slump    $235/m³ delivered
  Lead time: 24hr        Min order: 3m³

Boral — Darra           14km    All grades available
  40MPa/20mm/100slump    $242/m³ delivered
  Lead time: 48hr        Min order: 5m³

Independent — Ipswich    6km    N32, N40 only
  40MPa/20mm/100slump    $228/m³ delivered
  Lead time: same day    Min order: 2m³

REINFORCEMENT SUPPLIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
InfraBuild — Acacia Ridge    22km
  Mesh: SL82, SL92, SL102 in stock
  Bar: N12-N36 cut & bent, 3 day lead

Steel Force — Wacol          18km
  Mesh: all standard sizes in stock
  Bar: N12-N28, 2 day lead
  Fibres: steel & poly available

CONCRETE PUMPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Schwing — Brisbane South     15km
  32m boom    $1,200/pour (4hr min)
  42m boom    $1,800/pour (4hr min)

QLD Concrete Pumping         12km
  28m boom    $1,100/pour
  Line pump   $850/pour

TESTING LABS (NATA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aurecon — Springfield        4km
Cardno — Ipswich            10km

WASHOUT / WASTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Boral Recycling — Goodna     9km    Accepts concrete washout
Alex Fraser — Wacol         16km    C&D recycling, accepts hardened concrete

TRADE STORES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sunstate Cement — Goodna     7km    Admixtures, curing, consumables
Coates Hire — Springfield    3km    Formwork, vibrators, finishing tools
```

**Everything above is free to the user.** The batch plants, reo suppliers, and pump companies pay a subscription to appear with enhanced profiles and receive automated quote requests.

---

## 3. Revenue Strategy — Platform Free, Monetise Data + Trade Subscriptions

### Core Principle

> **The platform is free. Always. Every useful feature stays free.** If it helps someone do their job better, it's free. Revenue comes from three places: managed transactions (the money flows through us), supplier subscriptions, and data monetisation.

The moment you charge a site foreman to check a fire ant zone or see a cost estimate, you've lost him. The platform only works if people actually use it.

### Why This Works

Every interaction generates data. And when the money actually flows through the platform — when we manage the transaction — we capture the richest data of all: real pricing, real volumes, real costs. That data is worth far more than subscriptions.

**Three revenue engines:**
1. **Managed transactions** — money flows through Cut2Fill, we take a small fee to handle procurement, accounts, compliance, and insurance on behalf of both parties (Uber/Hipages model)
2. **Supplier subscriptions** — suppliers pay per trade module for visibility, quoting, analytics (LinkedIn/Seek model)
3. **Data monetisation** — sell insights to government, industry bodies, researchers (Google model)

### Revenue Stream 1: Managed Transactions — Let the Money Flow Through Cut2Fill

#### The Problem This Solves

Right now, when a contractor needs 500 truck loads of fill moved from Site A to Site B, this is what happens:

1. Find a trucking company (phone calls, word of mouth)
2. Get a quote (back and forth, days)
3. Set up the trucking company as a vendor in your accounting system (procurement form, insurance check, ABN verification, SWMS review)
4. Negotiate terms (30-day payment? 14-day? COD?)
5. Receive 500 individual dockets
6. Reconcile dockets against the quote
7. Process an invoice
8. Chase payment (if you're the trucking company)

This is a nightmare for both sides. The contractor's accounts team hates setting up new vendors for a one-off job. The trucking company hates chasing invoices. Small operators get burned by slow-paying contractors. And nobody has proper compliance documentation at the end.

#### How Cut2Fill Fixes This

```
CURRENT PROCESS (painful)
━━━━━━━━━━━━━━━━━━━━━━━━
Contractor ←──phone──→ Trucking Co
    │                      │
    ├─ Vendor setup         ├─ Quote
    ├─ Insurance check      ├─ Wait for PO
    ├─ PO raised            ├─ Do the work
    ├─ Docket reconciliation├─ Send invoice
    ├─ Invoice processing   ├─ Chase payment (60+ days)
    └─ Payment (eventually) └─ Maybe get paid


CUT2FILL MANAGED TRANSACTION (simple)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contractor ←──Cut2Fill──→ Trucking Co
    │                          │
    ├─ Finds match on platform ├─ Registered on Cut2Fill
    ├─ Accepts quote           ├─ Quote via platform
    ├─ Pays Cut2Fill           ├─ Does the work
    ├─ Job tracked on platform ├─ Loads logged automatically
    └─ Done. Compliance cert   └─ Paid by Cut2Fill (7 days)
       generated automatically
```

**Cut2Fill sits in the middle:**
- The contractor pays Cut2Fill (credit card, EFT, whatever)
- Cut2Fill pays the trucking company / supplier (fast — 7-day terms)
- Cut2Fill takes a small transaction fee (2-5%)
- Cut2Fill holds the compliance documentation, insurances, and audit trail

#### Why Both Sides Want This

**For the contractor (buyer):**

| Pain Point | Cut2Fill Solution |
|-----------|------------------|
| Setting up new vendors is slow | Cut2Fill is already your vendor — one setup, access to every supplier in the network |
| Checking insurances, ABNs, SWMS | We've already verified them. Every supplier on the platform has current insurances on file. |
| 500 dockets to reconcile | Loads tracked digitally. One invoice from Cut2Fill with full breakdown. |
| No compliance documentation | Compliance certificate generated automatically — fire ant zones, material source, chain of custody |
| Accounts team hates one-off vendors | They don't need to know who the trucking company is. They pay Cut2Fill. One vendor, unlimited suppliers. |

**For the trucking company / supplier (seller):**

| Pain Point | Cut2Fill Solution |
|-----------|------------------|
| Finding work is word of mouth | Platform pushes jobs to you based on your location, truck type, availability |
| Quoting takes time, often wasted | Quote via platform in 2 minutes. Accept/decline. Done. |
| Slow payment (60-90 day terms from contractors) | Cut2Fill pays you in 7 days. We chase the contractor, not you. |
| Insurance/compliance admin | Upload once to Cut2Fill. Valid for every job. No repeating paperwork per client. |
| Small operators get squeezed | Equal footing with large haulage companies. Compete on price and availability, not who you know. |

#### The Transaction Fee

| Service Level | Fee | What's Included |
|--------------|-----|----------------|
| **Basic transaction** | 2-3% | Payment processing, single invoice, basic load tracking |
| **Managed transaction** | 4-5% | Payment processing, compliance verification, insurance check, load tracking, compliance certificate, 7-day supplier payment |
| **Full service** | 6-8% | Everything above + material testing coordination, permit management, sustainability reporting |

**Example: 500 loads of fill at $185/load = $92,500 job**

| Fee Level | Cut2Fill Revenue | Contractor Pays | Supplier Gets |
|-----------|-----------------|----------------|--------------|
| 3% basic | $2,775 | $92,500 | $89,725 (paid in 7 days) |
| 5% managed | $4,625 | $92,500 | $87,875 (paid in 7 days) |

The supplier takes a small haircut on the rate but gets paid in 7 days instead of 60-90. For most small trucking companies, that's a better deal.

#### What Cut2Fill Needs to Make This Work

| Requirement | Detail | Effort |
|-------------|--------|--------|
| **Payment processing** | Stripe or similar. Accept credit card and EFT from contractors. Disburse to suppliers. | Medium — Stripe Connect handles marketplace payments out of the box |
| **Supplier onboarding** | ABN verification, insurance upload (public liability, workers comp, motor vehicle), SWMS template | Medium — forms + document storage |
| **Insurance management** | Track expiry dates, send reminders, flag expired insurances | Low-medium — automated alerts |
| **Digital docketing** | Load tracking (GPS or manual), running tally, auto-reconciliation | Medium — Phase 4 GPS tracking feeds into this |
| **Invoicing** | Automated invoice generation: one invoice to contractor, one remittance to supplier | Low — template + Stripe data |
| **Compliance certificates** | Auto-generated from transaction data — material, source, destination, loads, zone compliance | Medium — template + data aggregation |
| **Trust account / holding** | May need a trust account structure depending on financial regulations. Legal advice required. | Research needed |

#### Why This Is the Biggest Revenue Stream

Transaction fees scale with volume. Unlike subscriptions (fixed per supplier) or data licensing (fixed per client), transaction revenue grows with every job that flows through the platform.

| Scenario | Monthly Volume | At 4% Fee | Annual Revenue |
|----------|---------------|-----------|---------------|
| 10 jobs/month, avg $50K | $500K | $20K/mo | $240K |
| 50 jobs/month, avg $50K | $2.5M | $100K/mo | $1.2M |
| 200 jobs/month, avg $50K | $10M | $400K/mo | $4.8M |

At 200 jobs/month across SEQ (a fraction of total material movements), the platform generates **$4.8M/year** in transaction fees alone. This dwarfs supplier subscriptions and data licensing combined.

#### Insurance & Compliance — Cut2Fill as the Trusted Party

This is the real moat. When Cut2Fill manages the transaction, we hold:

| Document | What It Covers |
|----------|---------------|
| **Public liability insurance** | Verified for every supplier on the platform |
| **Workers compensation** | Verified for every supplier |
| **Motor vehicle insurance** | Verified for trucking companies |
| **Environmental compliance** | Fire ant zone checks, contaminated land awareness, permit requirements flagged |
| **Material chain of custody** | Source verified, destination verified, loads counted |
| **SWMS / Safe Work Method Statement** | On file for the activity type |

A contractor using Cut2Fill doesn't need to independently verify any of this. They trust the platform to have done it. That trust is what makes them willing to pay 3-5% on the transaction — it's cheaper than their own admin cost of setting up and verifying a new vendor.

For government clients especially, this is powerful: "All material movements were managed through Cut2Fill. Compliance certificates, insurance verification, and chain of custody documentation available for audit."

---

### Revenue Stream 2: Trade Module Supplier Subscriptions

| Stream | What It Is | Who Pays | Price Point | When |
|--------|-----------|----------|-------------|------|
| **Trade module subscriptions** | Enhanced profile, automated quoting, analytics. Suppliers get demand signals pushed to them. | Quarries, batch plants, reo suppliers, pump companies, recyclers, trade stores | $200-500/mo per supplier | Phase 2 (earthmoving), Phase 3+ (other trades) |

### Revenue Stream 3: Project Reports & Data

| Stream | What It Is | Who Pays | Price Point | When |
|--------|-----------|----------|-------------|------|
| **Project Reports** | Printable project profile for tenders | Contractors, developers, estimators | $25-75 per report | Phase 2 |
| **Data Insights & Analytics** | Regional dashboards, supply/demand forecasts, pricing trends | Government, industry bodies, large contractors | $25K-100K/yr per licence | Phase 3 |
| **Circular Economy Reporting** | Aggregated diversion, carbon, levy data | State government, Olympic authority | $50K-200K/yr | Phase 3 |
| **Trade-Specific Price Index** | Quarterly pricing benchmarks by trade | Industry bodies, estimating firms | $10K-25K/yr | Phase 3 |
| **API Access** | Data feed for estimating software, council systems | Software vendors, contractors, councils | $500-2,000/mo | Phase 3 |

### Combined Revenue Model

| Revenue Engine | Year 1 | Year 2 | Year 3 |
|---------------|--------|--------|--------|
| **Managed transactions (2-5% fee)** | $0 (building trust) | $240K-600K | $1.2M-4.8M |
| **Supplier subscriptions** | $0 (free period) | $108K-180K | $342K+ |
| **Project reports** | $0 | $50K-100K | $100K-200K |
| **Data licensing** | $0 | $0-50K | $100K-400K |
| **Total** | **$0** | **$400K-930K** | **$1.7M-5.7M** |

The managed transaction model is where the real money is. Subscriptions and data are solid, but transaction fees scale with the industry itself. As SEQ's $103.9B construction pipeline rolls through, even capturing a tiny fraction of material movement transactions generates serious revenue.

### What Stays Free (Non-negotiable)

| Feature | Why It's Free |
|---------|--------------|
| Browse all listings, facilities, and suppliers on the map | This IS the platform — gating it kills it |
| Post listings (available/wanted) | Every listing = data = value |
| Fire ant zone checking | Safety and compliance — never gate this |
| Material compliance tooltips | Helping people stay legal builds trust |
| Cost comparison tools | Shows the value proposition instantly |
| Matching engine | Connecting people is the point |
| Closest hospital, emergency info | Safety — free, always |
| Trade module browsing (basic supplier info) | Users need to see suppliers to generate demand |
| Quarry/facility/supplier locations | The map is the hook |
| Contacting suppliers directly (bypassing Cut2Fill) | Always allowed — we never force transactions through the platform. People choose managed transactions because it's easier, not because they have to. |

### What Stays Free (Non-negotiable)

| Feature | Why It's Free |
|---------|--------------|
| Browse all listings, facilities, and suppliers on the map | This IS the platform — gating it kills it |
| Post listings (available/wanted) | Every listing = data = value |
| Fire ant zone checking | Safety and compliance — never gate this |
| Material compliance tooltips | Helping people stay legal builds trust |
| Cost comparison tools | Shows the value proposition instantly |
| Matching engine | Connecting people is the point |
| Closest hospital, emergency info | Safety — free, always |
| Trade module browsing (basic supplier info) | Users need to see suppliers to generate demand |
| Quarry/facility/supplier locations | The map is the hook |

### Revenue Milestones

| Milestone | What Proves It | Target Date |
|-----------|---------------|-------------|
| First 50 real listings | People will use a free platform | |
| First material exchange facilitated | Platform creates real-world value | |
| First project report sold | Someone will pay for packaged insights | |
| First supplier paying for enhanced profile | Supplier revenue model works | |
| First trade module beyond earthmoving | Platform scales across trades | |
| 10 paying suppliers | Revenue stream is repeatable | |
| First government data conversation | Data has institutional value | |
| First government data licence signed | $25K+ | |
| 50 paying suppliers across 3+ trades | Platform is a real business | |

---

## 3. Feature Prioritisation — What to Build Next

### Guiding Principle

> **Be helpful at all times.** Every feature should make someone's job easier the moment they use it. If a feature doesn't immediately help the person in front of it, it doesn't ship. The data collection happens in the background — the user experience is always "this tool just saved me time/money/risk."

### Priority Stack (ordered)

Everything below is ordered by: **what makes the platform most useful fastest, while collecting the most valuable data**.

#### Priority 1: Backend & Real Data (Foundation)

No one comes back to a demo. Before anything else:

- [ ] **Backend API** — FastAPI (Python, we know it) or Node
- [ ] **Database** — PostgreSQL + PostGIS
- [ ] **User auth** — email/password, maybe Google OAuth
- [ ] **Listing CRUD** — create, read, update, delete with persistence
- [ ] **Deploy to cut2fill.com.au** — real domain, SSL, hosted
- [ ] **Seed with real facility data** — pull from QLD govt APIs (quarries, tips, waste facilities)
- [ ] **Fire ant zones from live data** — QLD Open Data monthly refresh

**Decision:** What backend stack?
- FastAPI (Python) — aligns with existing skills, PostGIS libraries are mature
- Node.js — larger ecosystem, faster frontend-backend integration
- **TBD**

**Decision:** Where to host?
- AWS (EC2 + RDS) — full control, scales well
- Railway / Render — simpler, faster to deploy, good for MVP
- Vercel (frontend) + Supabase (backend/DB) — modern, fast, free tier
- **TBD**

#### Priority 2: The Map That's Worth Bookmarking (Free — the hook)

The facility map is the reason someone lands on cut2fill.com.au and comes back. Even before a single listing is posted, this map is the most complete view of SEQ's earthworks infrastructure anywhere.

- [ ] **QLD Mining Permits ArcGIS API** — live quarry data
- [ ] **QLD Waste Facilities dataset** — tips, transfer stations
- [ ] **Environmental Authorities Register** — treatment facilities, geocoded
- [ ] **BCC transfer stations** — GeoJSON API
- [ ] **Fire ant zones** — monthly refresh from QLD Open Data
- [ ] **Closest hospital to any point** — safety layer, always visible (see Section 3A)
- [ ] **Major project cut/fill sites** — large projects with known earthworks volumes (see Section 3B)

**Decision: YES** — Build the facility map as a standalone value proposition. This is the free tool that drives traffic and becomes the foundation everything else builds on.

#### Priority 3: Major Project Cut/Fill Sites (Free — massive data value)

**The insight:** Large construction projects (subdivisions, road upgrades, commercial developments) generate or consume enormous volumes of material. These are often publicly known through DA approvals, government announcements, and industry networks — but nobody maps them.

**What we map:**

| Data Point | Source | Example |
|-----------|--------|---------|
| Project name & location | DA approvals, TMR announcements, council records | "Springfield Rise Estate — 180,000m³ cut, 120,000m³ fill" |
| Estimated cut volume | Bulk earthworks estimates from project docs | Shows where surplus material will come from |
| Estimated fill volume | Bulk earthworks estimates from project docs | Shows where material is needed |
| Net position (cut or fill) | Cut minus fill | Net 60,000m³ surplus = material available |
| Timeline | Project start/completion dates | When material will be available/needed |
| Material type (if known) | Geotech reports, project specs | Clean fill, rock, mixed |

**Minimum threshold:** Only map projects with **5,000m³+ net cut or fill**. This keeps it at the scale where logistics planning actually matters and filters out noise.

**Why this is gold:**
- A developer lands on the map, sees 3 projects within 20km that are about to generate surplus — that's free fill he didn't know existed
- A contractor with surplus sees 5 projects nearby that need fill — that's demand he can serve
- Government sees a real-time picture of material supply and demand across SEQ — that's planning intelligence they can't get anywhere else
- Over time, this becomes the definitive dataset of material flows in the region

**Data collection note:** Every time someone clicks on a project site, checks distances, or requests a match — we're collecting demand signals. This is the circular economy dataset that government will pay for.

#### Priority 4: Project Profile & Reports (First revenue — small, high-volume)

**The product:** A printable, professional project report that a contractor or estimator can hand to a client, attach to a tender, or use for internal planning. Generated from the platform data in seconds.

**What's in a Project Report:**

```
═══════════════════════════════════════════════════════
            CUT2FILL PROJECT PROFILE
═══════════════════════════════════════════════════════

PROJECT: Springfield Rise Estate — Stage 4
LOCATION: Springfield, Ipswich LGA
DATE: 24 March 2026
PREPARED FOR: [Company Name]

SITE CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fire Ant Zone:              Zone 2 (Orange)
LGA:                        Ipswich City Council
Nearest Hospital:           Springfield Central Medical
                            (3.2km — 6 min drive)
Nearest Fire Station:       Springfield Fire & Rescue
                            (4.1km — 7 min drive)

QUARRY COMPARISON (within 50km)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    Distance  Travel   Products
Boral Purga         12km      18min    Fill, rock, gravel
                    Density: 1.65t/m³ (Type 2.1 fill)
                    Est. delivered: $38/m³

Karreman Quarries   24km      32min    Fill, rock, road base
                    Density: 1.72t/m³ (crushed rock)
                    Est. delivered: $44/m³

Wagners Wacol       35km      40min    Fill, concrete agg
                    Density: 1.58t/m³ (general fill)
                    Est. delivered: $52/m³

FREE MATERIAL NEARBY (from Cut2Fill listings)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ripley Valley Stage 12      8km     15,000m³ clean fill
  Est. delivered: $14/m³ (cartage only)
  Zone crossing: NO
  Saving vs quarry: $24/m³ = $360,000

Brisbane Metro Woolloong.   28km    40,000m³ mixed fill
  Est. delivered: $22/m³ (cartage only)
  Zone crossing: YES — BIP may be required
  Saving vs quarry: $16/m³ = $240,000

COMPLIANCE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Fire ant BIP required for Zone 1 → Zone 2 imports
☐ Check EMR/CLR for source site before accepting fill
☐ MRTS05 Type 2.1 spec requires LL≤40, PI≤20, CBR≥8
☐ Soil disposal permit needed for any contaminated material

SUSTAINABILITY IMPACT (if using reused material)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Material diverted from landfill:   25,500 tonnes
Waste levy saving:                 $2,932,500
Truck-km avoided:                  31,250 km
CO₂ emissions avoided:            37.5 tonnes

              Generated by Cut2Fill
              cut2fill.com.au
═══════════════════════════════════════════════════════
```

**Pricing:** $25 for a basic report. $75 for a detailed report with full quarry comparison, cost modelling, and sustainability statement for tenders. The report costs nothing to generate — it's pure margin from data we already have.

**Why people pay:** This replaces hours of phone calls to quarries, Google Maps distance checks, and manual spreadsheet work. An estimator pricing a tender gets a professional document in 30 seconds that would take half a day to assemble manually.

#### Priority 5: Quarry & Facility Intelligence (Free to browse, paid for suppliers)

**For users (free):** See every quarry and facility on the map with useful detail — what they supply, how far away, estimated delivery cost to your site.

**The density collection play:** When quarries sign up for enhanced profiles, we collect their material densities, product specs, and pricing. Over time, Cut2Fill builds the most comprehensive quarry product database in QLD.

| Data We Collect | How We Get It | What It Enables |
|----------------|---------------|-----------------|
| Material densities (t/m³) by product | Quarry profiles, user submissions, geotech reports | Accurate load calculations — "12m³ of this product = X tonnes = Y loads" |
| Product range & specs | Quarry self-service profiles | Spec matching — "which quarries supply MRTS05 Type 2.1?" |
| Indicative pricing | Quarry profiles (optional) or automated quoting | Real cost comparisons — not guesses |
| Availability / stock levels | Quarry self-reporting | "This quarry is currently out of road base" |
| Operating hours & access | Quarry profiles | Practical logistics planning |

**Insights we can sell from this data:**
- Regional pricing benchmarks (what does Type 2.1 fill cost per m³ delivered across SEQ?)
- Supply gap analysis (which materials are in short supply in which regions?)
- Quarry utilisation trends (are quarries running at capacity?)
- Transport cost benchmarks by corridor

#### Priority 6: Automated Quoting & Immediate Pricing (Paid feature for suppliers)

**How it works:**

1. A user posts a listing: "Need 10,000m³ Type 2.1 fill, Springfield"
2. Platform automatically identifies quarries and available listings within range
3. **Free users** see: estimated costs based on platform data (distances, average rates)
4. **Paid suppliers** (quarries, facilities) get an automated quote request pushed to them — "10,000m³ Type 2.1 fill needed at Springfield, 18km from your site. Respond with pricing."
5. Supplier responds with a live quote → user sees real pricing alongside free material options

**For the supplier paying $200-500/mo:**
- Every relevant demand signal in their region pushed to them automatically
- They respond with pricing in-app — no phone tag, no emails
- Their quotes appear to the user alongside free material and other quarries
- Analytics on win rate, quote volume, market position

**For the user (free):**
- Posts what they need → gets real quotes from multiple suppliers without making a single phone call
- Sees free material options alongside commercial options with true delivered cost
- Makes an informed decision with real numbers

**Data value:** Every quote request and response is a pricing data point. Thousands of these build a real-time pricing index for construction materials in SEQ. That index is worth serious money to industry analysts, government procurement, and large contractors planning budgets.

#### Priority 7: Cost Calculator (Free — it collects data)

The cost calculator stays free. Every calculation a user runs tells us: what material they need, where they need it, what volume, and what alternatives they're considering. That's demand intelligence.

- [ ] Routing distance (Google Maps or Mapbox API)
- [ ] Truck type selection (6 types with capacity/rate/fuel)
- [ ] Wet/dry material adjustment
- [ ] Waste levy comparison (always show "vs landfill" cost)
- [ ] Per-m³ delivered cost using actual densities from quarry database
- [ ] Side-by-side comparison: free material vs quarry vs landfill

#### Priority 8: Safety & Site Context Layer (Free — always)

**Closest hospital** to any point on the map. Every construction site needs this for their safety management plan. It's a small thing that makes the platform immediately useful to site managers who aren't even thinking about material exchange yet — they came for the hospital location and discovered the rest.

- [ ] Nearest hospital (with drive time)
- [ ] Nearest fire station
- [ ] Nearest police station
- [ ] Fire ant zone status
- [ ] LGA and relevant council contact
- [ ] Known contaminated land nearby (EMR/CLR overlay — Phase 3)

**Why this matters for data:** People who come to the site for safety info also see listings, quarries, and the material exchange. It's a traffic driver that feeds the core platform.

#### Priority 9: Notifications & Matching

- [ ] Email alerts when a new listing matches your requirements
- [ ] "Watching" a material type in a region
- [ ] Weekly digest of new listings

#### Priority 10: Material Specification Fields

- [ ] Optional fields: LL, PI, CBR, max particle size
- [ ] MRTS05 auto-classification
- [ ] Spec-based filtering ("show me Type 2.1 compliant fill")

---

## 4. Use Cases — Who Uses This and Why

### Use Case 1: Civil Contractor with Surplus

**User:** Site foreman or project manager on a road/subdivision project
**Situation:** 8,000m³ of excavated material, currently planning to send to tip
**Current approach:** Call the nearest tip, book trucks, pay $125/t levy = ~$1.5M
**Cut2Fill approach:** Post listing → matched with a project 15km away that needs fill → material is free, cartage only → saves $1.3M
**What they get free:** Matching, cost comparison, compliance guidance, zone checking
**Data we collect:** Material type, volume, location, timeline, where it went

### Use Case 2: Developer Needing Fill

**User:** Project manager on a residential estate
**Situation:** Needs 20,000m³ of structural fill for lot pads
**Current approach:** Call quarries, get quotes, arrange trucks. Pays $30-40/m³ for material + cartage.
**Cut2Fill approach:** Find free fill from a nearby project → pay cartage only → specification matching confirms it meets MRTS05 Type 2.1. Or compare 5 quarries side-by-side with real densities, delivered costs, and specs without making a single phone call.
**What they get free:** All of it — matching, quarry comparison, cost calculator, spec matching
**What they might buy:** A $75 project report for their tender submission with full sustainability statement
**Data we collect:** What material they need, where, what spec, which options they considered, what they chose

### Use Case 3: Estimator Pricing a Tender

**User:** Quantity surveyor pricing earthworks for a government tender
**Situation:** Needs to price 50,000m³ of import fill for a road project
**Current approach:** Call 3 quarries, guess at cartage, add 15% contingency. Takes half a day.
**Cut2Fill approach:** Open the platform → enter project location and requirements → instantly see every quarry within 50km with delivered cost per m³, every free material listing nearby, and a printable project report with sustainability statement for the tender submission. Takes 10 minutes.
**What they get free:** The search, comparison, and cost estimates
**What they buy:** The $75 project report that goes into the tender
**Data we collect:** Tender demand signals — what material, what volume, where, when. This is leading-indicator data for the entire SEQ construction pipeline.

### Use Case 4: Quarry Operations Manager

**User:** Operations manager at a quarry wanting more customers
**Situation:** Has capacity, good product, but relies on word of mouth and repeat customers
**Current approach:** Wait for the phone to ring
**Cut2Fill approach:** Signs up for an enhanced profile ($200-500/mo) → platform pushes automated quote requests whenever someone nearby needs their product → quarry responds with live pricing → wins work they never would have known about
**What they get free:** Basic listing on the map with location, products, contact
**What they pay for:** Automated quote requests, analytics, enhanced profile with densities/specs/pricing
**Data we collect:** Product specs, densities, pricing, availability, response rates, win rates — the quarry product database

### Use Case 5: Council Compliance / Planning Officer

**User:** Environmental compliance or infrastructure planning officer at a local council
**Situation:** Needs to understand material flows in their LGA — where fill is coming from, where it's going, whether biosecurity compliance is being maintained
**Current approach:** No visibility. Relies on complaints and reactive inspections.
**Cut2Fill approach:** Dashboard showing all material movements within LGA, compliance rates, volume trends, facility utilisation
**What they get free:** Nothing — they're not using the exchange platform, they're buying intelligence
**What they pay for:** Data licence ($25K-100K/yr) — regional dashboard, API access, quarterly reports
**Data we collect:** We already have it from the free users. This is the monetisation.

### Use Case 6: Major Project with Known Cut/Fill

**User:** Project director on a large subdivision, road upgrade, or commercial development
**Situation:** Project has 200,000m³ cut and 140,000m³ fill — net 60,000m³ surplus that needs a home
**Current approach:** Engage an earthworks contractor who figures it out. Often defaults to nearest tip.
**Cut2Fill approach:** Project appears on the map as a major cut/fill site. Nearby projects needing fill see it. The platform connects them automatically. Project report shows the cost of reuse vs landfill — the numbers make the decision.
**What they get free:** Listing, matching, cost comparison, zone checking
**What they might buy:** Project report for board/client. Compliance certificates once material starts moving.
**Data we collect:** Large-scale material flow data — the highest-value dataset for government planning

---

## 4A. The Circular Economy Data Play

### Why Data Is the Real Product

Every interaction on the platform generates data that doesn't exist anywhere else:

| User Action | Data Generated | Who'd Pay For It |
|-------------|---------------|-----------------|
| Posts a listing (available) | Material type, volume, location, timeline | Government (supply mapping) |
| Posts a listing (wanted) | Demand signal — what, where, when, how much | Government (demand forecasting), quarries (market intelligence) |
| Runs a cost comparison | Which options were considered, what was chosen | Industry bodies (benchmarking) |
| Requests a quarry quote | Pricing data point | Industry analysts, large contractors (budget planning) |
| Completes a material exchange | Actual movement data — from, to, volume, cost | Government (circular economy targets), researchers |
| Views a project site | Interest/demand for that location | Project owners, developers |
| Checks fire ant zones | Compliance awareness data | BQCC (enforcement intelligence) |

### Data Products We Can Sell

**1. SEQ Material Flow Dashboard (Government)**
Real-time view of where material is being generated, where it's going, and how much is being diverted from landfill. Updated daily. No one else has this.
- Price: $50K-100K/yr per council, $100K-200K/yr for state government
- Buyers: Councils (11 in SEQ), DES, TMR, BQCC, Olympic delivery authority

**2. Construction Material Price Index (Industry)**
Quarterly report on material pricing across SEQ — what Type 2.1 fill costs delivered to different regions, how prices are trending, where supply is tight.
- Price: $10K-25K/yr subscription
- Buyers: Large contractors, estimating firms, industry bodies (CCF, CCIQ, MBA)

**3. Quarry Market Intelligence (Suppliers)**
Analytics for quarries on their competitive position — how their pricing compares to peers, where demand is growing, which corridors they should target.
- Price: Included in $200-500/mo enhanced profile
- Buyers: Quarries, material suppliers

**4. Circular Economy Impact Report (Brisbane 2032)**
Aggregated sustainability metrics — tonnes diverted, carbon avoided, levy savings — packaged specifically for Brisbane 2032 Olympic sustainability reporting.
- Price: $100K-200K/yr
- Buyers: Olympic delivery authority, QLD Government

**5. Research Data Access (Academic/CSIRO)**
Anonymised material flow dataset for circular economy research, transport modelling, waste management studies.
- Price: $5K-25K per dataset
- Buyers: CSIRO, universities, research bodies

### The Flywheel

```
More free users
     │
     ▼
More listings & interactions
     │
     ▼
More data collected
     │
     ▼
Better insights & matching
     │
     ▼
Platform becomes more useful ──────► More free users
     │
     ▼
Data products worth more
     │
     ▼
Government & industry pay for insights
     │
     ▼
Revenue funds platform improvement ──► Better platform
```

The platform never needs to charge users to be profitable. The more useful it is (free), the more people use it, the more data it generates, the more valuable the data products become. Users and revenue are not in tension — they reinforce each other.

---

## 5. Decisions Log

Record every significant product decision here with date and reasoning.

| Date | Decision | Options Considered | Chosen | Reasoning |
|------|----------|-------------------|--------|-----------|
| 24 Mar 2026 | Document created | — | — | Need a living decisions document separate from business case |
| 24 Mar 2026 | Revenue model | SaaS subscriptions vs free platform + data monetisation | **Free platform + data** | Paywalling features kills adoption. Data from free users is worth more than subscriptions. Google model, not SaaS. |
| 24 Mar 2026 | Cost calculator pricing | Paid vs free | **Free** | Every calculation = demand data. More valuable as data collection than as a $50/mo feature. |
| 24 Mar 2026 | Facility map as standalone hook | Bundled vs standalone | **Standalone** | The map alone is worth bookmarking — drives traffic before listings exist |
| 24 Mar 2026 | Map major project cut/fill sites | Yes/no, threshold | **Yes, 5,000m³+ net** | Solves cold start (value without listings), generates highest-value data for government |
| 24 Mar 2026 | Project reports | Free vs paid | **Paid ($25-75)** | Pure margin, replaces hours of manual work, high perceived value for tenders |
| 24 Mar 2026 | Safety layer (hospitals etc.) | Include vs exclude | **Include, free always** | Makes platform useful to site managers who aren't thinking about material yet — traffic driver |
| 24 Mar 2026 | Quarry density collection | Active vs passive | **Active** — collect through enhanced profiles | Builds the quarry product database that enables accurate cost calcs and insights |
| 24 Mar 2026 | Automated quoting | Free vs paid | **Paid for suppliers ($200-500/mo)** | Suppliers pay for demand signals, users get free quotes — both sides win |
| 24 Mar 2026 | Platform scope | Earthworks only vs universal construction platform | **Universal platform with trade modules** | The pattern (map → compare → connect → collect data) works for every trade. Earthworks first, then concrete, steel, drainage, demo. Each trade = new revenue stream from supplier subscriptions. |
| 24 Mar 2026 | Trade module model | Free vs subscription | **Free for users, subscription for suppliers** | Users browse free (generates data + demand). Suppliers pay $200-500/mo for enhanced profiles, automated quoting, analytics. Same as LinkedIn/Seek model — suppliers pay for access to demand signals. |
| 24 Mar 2026 | Second trade module | Concrete vs steel vs drainage | **Concrete** | Natural extension from earthworks. Concrete contractors already on site with earthmovers. Batch plants, reo suppliers, pump companies, testing labs, washout sites — all mappable, all willing to pay for leads. |
| 25 Mar 2026 | Managed transactions | Platform as info layer vs transaction layer | **Transaction layer — money flows through Cut2Fill** | Solves the procurement/accounts pain for both sides. Contractor gets one vendor (Cut2Fill) instead of setting up 50. Supplier gets paid in 7 days instead of 60-90. Cut2Fill takes 2-5% fee, holds insurances and compliance. Scales with volume — biggest revenue potential by far. |
| 25 Mar 2026 | Supplier payment terms | Match contractor terms vs fast pay | **Fast pay (7 days)** | Small operators choose Cut2Fill because they get paid fast. The 3-5% fee is worth it vs waiting 60-90 days. This is the hook for supplier adoption. |
| 25 Mar 2026 | Direct contact always allowed | Force transactions through platform vs allow bypass | **Always allow direct contact** | Never lock users in. People choose managed transactions because it's easier, not because they're forced. Forced = resentment. Optional = trust. |
| | Backend stack | FastAPI vs Node.js vs Supabase | TBD | |
| | Hosting platform | AWS vs Railway vs Vercel+Supabase | TBD | |

---

## 6. Open Questions

Things we need to figure out before building:

1. **Do we build the backend ourselves or use a BaaS (Supabase, Firebase)?** — Speed vs control tradeoff. Data monetisation strategy may favour owning the stack.
2. **How do we populate major project cut/fill sites?** — DA approvals are public but scattered. TMR project announcements. Council development registers. Could we scrape/aggregate, or does this need manual curation initially?
3. **How do we handle the cold start?** — The facility map + major project sites solve this. Even with zero user-posted listings, the platform shows every quarry, tip, treatment facility, and major project in SEQ. That's useful day one.
4. **What data do we need to anonymise before selling?** — Individual company data stays private. Aggregated trends, regional flows, pricing benchmarks — these are anonymised. Need clear data policy.
5. **Should the MVP be mobile-first?** — Site foremen are on phones, not desktops. Current MVP is responsive but not mobile-optimised.
6. **Do we need a mobile app or is PWA enough?** — For Phase 4 GPS tracking, probably need native. For everything else, PWA works.
7. **What's our position on data accuracy disclaimers?** — Government data has errors. If someone relies on our fire ant zone map and it's wrong, what's our liability? Need legal advice.
8. **CSIRO Kick-Start timing** — Application pending. Does the grant timeline drive our build timeline, or do we build regardless?
9. **Hospital/emergency services data source?** — Need a reliable, maintained dataset. QLD Health publishes hospital locations. Ambulance, fire, police — where's the best data?
10. **How do we collect quarry densities at scale?** — Start with the enhanced profile self-service, but how do we seed the database before quarries sign up? Published product datasheets? MRTS05 reference values?
11. **Government data licensing — who do we approach first?** — Councils are smaller deals but easier to close. State government is bigger but slower. Do we start with one progressive council (Logan? BCC?) as a proof of concept?
12. **Which trade module second?** — Concrete is the natural next step (batch plants, reo, pumps, testing, washout). But do we validate the earthmoving module fully before starting the second, or build them in parallel?
13. **Trade module architecture** — Do we build trade modules as separate views/filters on the same map, or as distinct sections of the platform? Filter approach is simpler and keeps everything connected. Separate sections risk fragmenting the user base.
14. **Supplier onboarding for trade modules** — How do we get the first 10 batch plants or reo suppliers to sign up? Direct outreach? Partner with industry associations (CIA, SRIA)? Seed with public data and then approach for enhanced profiles?
15. **Supply chain resilience data** — COVID exposed how fragile construction supply chains are. Could Cut2Fill track supplier availability in real-time ("this batch plant is currently out of 40MPa", "this reo supplier has N16 in stock")? That availability data is extremely valuable during shortages and could be a premium data product.
16. **Managed transactions — legal/financial structure** — If money flows through Cut2Fill, do we need a trust account? AFSL? What are the financial services regulations for holding client funds? Need legal and accounting advice before building this.
17. **Payment processing — Stripe Connect vs custom** — Stripe Connect is built for marketplace payments (split payments, managed payouts to suppliers). Do we use it or build custom? Stripe takes ~1.75% + 30c per transaction on top of our fee.
18. **Insurance — do we hold umbrella policies?** — If Cut2Fill verifies supplier insurances, do we also need our own umbrella policy that covers gaps? What happens if a supplier's insurance lapses between our checks? Need insurance broker advice.
19. **Supplier verification depth** — How deep do we verify? ABN + insurance certificates + SWMS is minimum. Do we also check licences (e.g., ERA for waste facilities), safety records, financial viability? More verification = more trust = more admin.
20. **Transaction fee sensitivity** — Is 3-5% acceptable to the construction industry? Compare: Uber takes 25-30%. Hipages takes 15-20%. Credit card processing is 1.5-2%. Construction margins are tight — need to test pricing carefully. The fast-pay value prop for suppliers may justify it.

---

## 7. Competitive Moves

Things that would strengthen our position if done early:

| Move | Effort | Impact | When |
|------|--------|--------|------|
| Publish SEQ facility map as free tool | Medium (data integration) | Very high — immediate utility, SEO, traffic | First thing after backend |
| Map 50 major project cut/fill sites | Medium (research + data entry) | High — solves cold start, demonstrates data value | Alongside facility map |
| Get 3 council endorsements | Medium (relationships) | High — credibility, first data licence conversations | Before launch |
| Present at CCF QLD event | Low | Medium — industry visibility | Next available event |
| Get featured in QLD DES circular economy newsletter | Low (pitch email) | Medium — government awareness | After facility map live |
| Partner with 1 geotech lab for verified testing | Medium | High — quality signal | Phase 2 |
| Sign first quarry to enhanced profile | Medium (sales) | High — proves supplier revenue model, seeds density database | Phase 2 |
| Pilot data dashboard with one council | Medium | Very high — proves government data monetisation | Phase 3 |
| Write the EOW code submission | High | Very high — positions us as industry leader | Phase 3+ |

---

## 8. North Star Metrics

Two metrics, because the platform serves two purposes:

**For the free platform:** Cubic metres of material exchanged through the platform.
Not listings posted. Not users registered. Not page views. Actual material moved from one site to another because Cut2Fill connected them.

**For data monetisation:** Number of unique data points collected per month.
Every listing, every match, every cost comparison, every quote request, every quarry profile view — each one is a data point. The more data points, the more valuable the insights we can sell.

Both metrics reinforce each other. More exchanges = more data. More data = better matching = more exchanges.

---

## 9. Supply Chain Resilience — The COVID Lesson

### What COVID Taught Construction

During COVID, the construction industry couldn't get materials. Concrete was rationed. Reo was on 12-week lead times. Timber tripled in price. Sand was short. And project managers had no way to find out who had stock, who had capacity, or who could supply an alternative — except by making 30 phone calls.

The industry was forced to be incredibly resourceful. People who'd never sourced from a particular supplier suddenly had to. People who'd always used one quarry had to find three alternatives. The problem wasn't that the materials didn't exist — it was that **nobody could see what was available and where**.

### Cut2Fill Solves This Permanently

With trade modules tracking supplier availability in real-time, the next supply chain disruption doesn't hit as hard:

| COVID Problem | Cut2Fill Solution |
|--------------|------------------|
| "Who has 40MPa in stock?" | Platform shows every batch plant, current availability, lead times |
| "My reo supplier has a 12-week lead" | See alternative suppliers with current stock levels, get instant quotes |
| "Can anyone supply 20mm aggregate?" | Every quarry's product range and availability on the map |
| "Where can I get concrete pumped this week?" | Every pump company with availability calendar |
| "Prices have spiked — am I being gouged?" | Platform pricing data shows regional benchmarks. You can see what others are paying. |

### Availability Tracking as a Feature

Suppliers who pay for enhanced profiles can flag their availability status:

```
STATUS: AVAILABLE        → Normal operations
STATUS: LIMITED          → Reduced capacity, longer lead times
STATUS: WAITLIST         → Accepting orders but delayed
STATUS: UNAVAILABLE      → Not currently supplying this product
```

Users see this on the map. During a crisis, the platform becomes the single source of truth for "who can supply what right now." That's the kind of value that gets people coming back every day, not just when they need to find fill.

### Data Value in a Crisis

During a supply disruption, the platform data becomes exponentially more valuable:
- **Government** needs to know where shortages are and which projects are affected
- **Industry bodies** need real-time intelligence to advocate for supply chain interventions
- **Large contractors** need to plan across multiple projects with constrained supply
- **Insurers** need to understand delay risk

This is a data product you can't build after the crisis starts — you need the supplier network and tracking in place before it happens. Building it now, during normal times, means it's ready when it's needed most.

---

## 10. Go-to-Market — The MVP Is Ready to Share

### Current MVP as a Conversation Starter

The static MVP — even without a backend, even with sample data — is a functional demo that shows the concept. It can be dropped into LinkedIn right now as a video walkthrough, a screenshot series, or a link to a hosted demo.

### LinkedIn Strategy

The construction industry lives on LinkedIn. Project managers, estimators, site engineers, company directors — they're all there. Cut2Fill content on LinkedIn serves two purposes:

1. **Build awareness** before the platform launches — "this is coming, register your interest"
2. **Validate demand** — comments, shares, and DMs tell us what people actually want

**Content angles that work on LinkedIn:**

| Post Type | Hook | Example |
|-----------|------|---------|
| **The waste levy shock** | "Your clean earth now costs $125/tonne to tip. Here's what that means for a 10,000m³ project." | Calculator screenshot showing $1.15M levy vs $60K reuse |
| **The fire ant fine** | "$625,875. That's the fine for moving soil across a fire ant zone without a permit. Do you know which zone your project is in?" | Map screenshot with zone overlay |
| **The demo walkthrough** | "We built a tool that shows every quarry, tip, and treatment facility in SEQ. Free. Here's what it looks like." | 60-second screen recording |
| **The cost comparison** | "Free fill from a nearby project vs quarry vs landfill. Same material, three very different costs." | Cost comparison screenshot |
| **The COVID memory** | "Remember when you couldn't get concrete? We're building a tool so you can always see who has stock, where, and at what price." | Platform supplier availability view |
| **The circular economy story** | "571,000 tonnes of reusable material goes to landfill in QLD every year. We're building the platform to fix that." | Dashboard stats screenshot |

### Sharing the Demo

**Options for sharing the current MVP:**
1. **Host on a temporary URL** — Netlify/Vercel free tier, takes 5 minutes to deploy
2. **Screen recording** — 60-90 second video walking through the map, listings, matching
3. **Screenshot series** — 4-5 screenshots posted as a LinkedIn carousel
4. **Live demo in meetings** — run locally, show to councils, CCF, potential partners

**Decision:** Deploy to a temporary URL so it can be shared via link? The demo is functional and impressive — even without real data, the UI and concept are clear.
- **TBD**

---

## 11. Material Supply Chain Mapping (Future Feature)

### "Where Does Your Material Come From?"

**The concept:** A mapping tool that traces construction materials from raw extraction to final destination, showing the full environmental footprint of material choices.

**Example: Concrete in Brisbane**

A user clicks on a concrete batch plant in Brisbane. The platform shows:

```
MATERIAL SUPPLY CHAIN: Hanson Concrete — Darra Batch Plant

RAW MATERIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Coarse Aggregate (20mm)
  Source: Mt Coot-tha Quarry (7km)
  Density: 1.45 t/m³
  Transport: 14km round trip
  CO₂ per tonne delivered: 1.2 kg

Fine Aggregate (manufactured sand)
  Source: Boral Purga Quarry (42km)
  Density: 1.55 t/m³
  Transport: 84km round trip
  CO₂ per tonne delivered: 5.8 kg

Cement
  Source: Cement Australia — Pinkenba (18km)
  Clinker origin: Gladstone (550km by rail)
  CO₂ per tonne: 820 kg (production) + 12 kg (transport)

Fly Ash (supplementary cite)
  Source: Tarong Power Station (215km)
  CO₂ per tonne delivered: 18 kg

Water
  Source: SEQ Water grid
  CO₂: negligible

SUPPLY CHAIN MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Map showing lines from each source to the batch plant,
 colour-coded by CO₂ intensity, with truck counts annotated]

TOTAL EMBEDDED CO₂: 285 kg CO₂ per m³ of concrete
TOTAL TRANSPORT: 363 km of material movement per m³

COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If coarse aggregate sourced from Karreman (Mt Cotton, 28km):
  Transport CO₂ increases by 4.2 kg/t
  Total embedded CO₂: 291 kg/m³ (+2.1%)

If cement replaced with 30% fly ash blend:
  Production CO₂ decreases by 246 kg/m³
  Total embedded CO₂: 39 kg/m³ (-86%)
```

### What This Enables

| Audience | Value |
|----------|-------|
| **Engineers / specifiers** | Choose materials with lower embedded carbon — increasingly a tender requirement |
| **Contractors** | Demonstrate supply chain transparency for sustainability-scored tenders |
| **Government** | Understand the true environmental cost of infrastructure materials |
| **Quarries / suppliers** | Differentiate on proximity and environmental performance |
| **Researchers** | Real data on construction material supply chains in Australian cities |
| **Olympic delivery** | Track embedded carbon across Brisbane 2032 venue construction |

### How We Build This

1. **Phase 1:** Map the quarries (already doing this) and batch plants. Connect them with known supply relationships.
2. **Phase 2:** Collect material densities, transport distances, and basic carbon factors. Use MRTS05 reference values and published EPDs (Environmental Product Declarations) where available.
3. **Phase 3:** Allow suppliers to self-report their supply chains (which quarries supply which plants). Incentivise with "sustainability profile" that helps them win tenders.
4. **Phase 4:** Full lifecycle analysis tool — user enters a project's material requirements, platform calculates total embedded carbon, transport impact, and suggests lower-impact alternatives.

### Data Sources

| Data | Source | Status |
|------|--------|--------|
| Quarry locations | QLD Mining Permits ArcGIS API | Available |
| Batch plant locations | Manual curation + industry directories | Research needed |
| Supply relationships (quarry → plant) | Supplier self-reporting, industry knowledge | Needs collection |
| Material densities | Quarry profiles, MRTS05, published datasheets | Partial |
| Carbon factors | AusLCI database, published EPDs, NGER data | Available |
| Cement/clinker origins | Published company reports | Available |
| Transport emissions | NTM (Network for Transport Measures) factors | Available |

### Why This Is a Moat

Nobody else is mapping construction material supply chains at this granularity in Australia. The data is fragmented across quarry operators, batch plant managers, transport companies, and government registers. Cut2Fill is the only platform positioned to bring it together because we're already mapping the facilities and collecting the material data.

This feature directly supports Brisbane 2032 sustainability targets and QLD Government circular economy strategy. It's the kind of tool that gets government attention and funding.

---

*This document is updated as decisions are made. Check the Decisions Log (Section 5) for the latest.*
