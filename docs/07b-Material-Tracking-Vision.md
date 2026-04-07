# Cut2Fill — Material Tracking & Compliance Vision

**Version:** 1.1
**Date:** 7 April 2026 *(roadmap extracted to 07-Product-Roadmap.md)*
**Scope:** Phase 3-4 feature specifications — material tracking, agreements, compliance certificates, treatment pathways, government data value.

---

## 1. Material Tracking System

### 1.1 The Problem Today

Material movements on government projects currently require manual paper trails — docket books, Form B receipts, weighbridge tickets, and spreadsheets. This is:

- **Error-prone** — handwritten dockets lost, illegible, or incomplete
- **Unverifiable** — no independent record of where material actually went
- **Labour-intensive** — admin staff manually reconciling dockets against claims
- **Non-compliant** — auditors can't trace material chain of custody with confidence
- **Invisible** — government has no real-time visibility on material flows across the region

### 1.2 Form B (TMR Lot Acceptance)

For Queensland Transport and Main Roads (TMR) projects, **Form B — Lot Acceptance** is the standard quality assurance document for earthworks. It records:

- Material source and description
- Test results (compaction, moisture, CBR, grading)
- Lot identification (location, volume, layer)
- Acceptance/rejection decision
- Signed by RPEQ or authorised person

Form B is part of the TMR quality system under MRTS04/MRTS05 and is required for **all government road and bridge earthworks**. Similar documentation is required by councils and other government agencies under AS3798.

### 1.3 Cut2Fill Tracking Flow

```
PHASE 1 — Agreement & Registration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Supplier                              Receiver
   │                                     │
   ├─ Lists material on Cut2Fill         │
   │                                     ├─ Finds match, requests material
   │                                     │
   └────────── AGREEMENT ────────────────┘
               │
               ├─ Material type & spec confirmed
               ├─ Volume agreed
               ├─ Pricing agreed (free or quoted)
               ├─ Transport responsibility assigned
               ├─ Fire ant zone compliance checked ✓
               ├─ Permits identified (if required)
               └─ Digital agreement signed by both parties


PHASE 2 — Movement Tracking
━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    ┌─────────────┐
                    │  Truck      │
                    │  Driver App │
                    │  (GPS)      │
                    └──────┬──────┘
                           │
        Load confirmed     │     Delivery confirmed
        at source ────────►├────► at destination
        (geofence)         │     (geofence)
                           │
                    Auto-logged:
                    ├─ Timestamp (load/unload)
                    ├─ GPS route taken
                    ├─ Source site (geofence match)
                    ├─ Destination site (geofence match)
                    ├─ Load count (running total)
                    ├─ Zone crossings detected
                    └─ Distance & duration


PHASE 3 — Compliance Certificate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When exchange is complete:
   │
   ├─ Total volume moved (load count × capacity)
   ├─ Material source verified (GPS)
   ├─ Material destination verified (GPS)
   ├─ Zone compliance confirmed (no unauthorised crossings)
   ├─ All loads timestamped and geolocated
   ├─ Test results attached (if uploaded)
   ├─ Agreement between parties on record
   │
   └─► CERTIFICATE OF COMPLIANCE generated
       ├─ Downloadable PDF for site files
       ├─ QR code for audit verification
       └─ Permanent record on platform
```

### 1.4 Truck Driver Experience

The driver doesn't need to do anything complex. They open the app, tap "Start Shift", and it runs in the background:

1. **Start shift** — driver selects the job (linked to an active agreement)
2. **Auto-detect load** — when GPS enters source site geofence + stationary for >5 min = loading
3. **Auto-detect delivery** — when GPS enters destination geofence + stationary for >5 min = unloading
4. **Load counter** — increments automatically, driver can correct if needed
5. **End shift** — summary of loads, distances, hours
6. **No typing, no forms, no dockets** — it just works

### 1.5 What This Replaces

| Current Process | Cut2Fill Replacement |
|----------------|---------------------|
| Paper docket books | Automatic GPS load/unload logging |
| Manual load counting | Auto-increment with geofence detection |
| Weighbridge tickets (some sites) | Integrates with weighbridge data (Phase 4) |
| Form B manual preparation | Auto-populated from tracked data + test results |
| Spreadsheet reconciliation | Real-time dashboard showing loads, volume, progress |
| End-of-project audit folder | Digital compliance certificate with full trail |

---

## 2. Agreement System

### 2.1 Digital Agreement Between Parties

When a match is confirmed, both parties digitally agree to terms:

| Field | Detail |
|-------|--------|
| Supplier | Company, contact, site address |
| Receiver | Company, contact, site address |
| Material | Type, specification (if applicable), test status |
| Volume | Agreed quantity (m³) |
| Pricing | Free or agreed rate |
| Transport | Who arranges — supplier, receiver, or third party |
| Timing | Start date, end date, permitted hours |
| Access | Site access conditions, safety requirements |
| Compliance | Fire ant zone status, permits identified, testing requirements |
| Acceptance criteria | What constitutes acceptable material at receiving end |

This isn't a legal contract — it's a **mutual acknowledgement** that both parties understand the terms and compliance requirements. It creates a record that can be referenced if issues arise.

### 2.2 Dispute Prevention

The agreement + tracking combination prevents the most common disputes:
- "They sent less than agreed" → GPS-verified load count
- "The material wasn't what was described" → Test results on record, acceptance criteria documented
- "They dumped outside hours" → Timestamped delivery records
- "We never agreed to that price" → Digital agreement with both parties' confirmation

---

## 3. Compliance Certificates

### 3.1 Certificate Contents

```
═══════════════════════════════════════════════════════════
              CUT2FILL MATERIAL MOVEMENT CERTIFICATE
═══════════════════════════════════════════════════════════

Certificate ID:     C2F-2026-00142
Date Issued:        30 June 2026
Agreement Ref:      AGR-2026-00089

SOURCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company:            Urban Dig Co Pty Ltd
Project:            Montague Markets Tower, West End
Contact:            [Name] — 0400 123 456
Material:           Clean Fill / Earth
Test Results:       LL=32, PI=14, CBR=12 (NATA Cert #12345)

DESTINATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company:            Ipswich Developments Pty Ltd
Project:            Springfield Rise Estate, Springfield
Contact:            [Name] — 0422 888 999
Specification:      MRTS05 Type 2.1 (confirmed compliant)

MOVEMENT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Period:             1 April 2026 — 28 June 2026
Total Loads:        500
Total Volume:       6,000 m³ (estimated from load count)
Transport:          Truck & dog (12m³ capacity)
Average Distance:   28.4 km per trip

COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fire Ant Zone:      Source Zone 1, Destination Zone 2
Zone Crossing:      ✓ Compliant — movement Zone 1 → Zone 2 permitted
BIP Required:       No (inward movement to lower restriction zone)
EMR/CLR Check:      ✓ Source site not listed
Contamination:      ✓ Clean — NEPM compliant (test certificate attached)
Acid Sulfate:       N/A — source above 5m AHD

SUSTAINABILITY IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Material diverted from landfill:    10,200 tonnes
Waste levy saving:                  $1,173,000
Truck-km avoided (vs nearest tip): 31,250 km
CO₂ emissions avoided:             37.5 tonnes
Virgin quarry material preserved:   6,000 m³

VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This certificate was generated from GPS-verified
movement data recorded through the Cut2Fill platform.

QR Code: [████████] — Scan to verify online
URL: cut2fill.com.au/verify/C2F-2026-00142

═══════════════════════════════════════════════════════════
```

### 3.2 Certificate Use Cases

| Audience | How They Use It |
|----------|----------------|
| **Site engineer** | Attach to Form B lot acceptance documentation |
| **Project manager** | Include in monthly progress reports |
| **Estimator** | Reconcile actual vs estimated cartage costs |
| **Council compliance officer** | Verify fill placement approvals were met |
| **TMR quality auditor** | Trace material source and chain of custody |
| **Tender submission** | Demonstrate sustainability credentials |
| **BQCC inspector** | Verify fire ant zone compliance for material movements |
| **Environmental auditor** | Confirm no contaminated material was placed inappropriately |

---

## 4. Free Tier Strategy — Useable From Day One

### 4.1 Core Principle

> The platform must deliver value the moment someone lands on it, without signing up, without paying, without a sales call.

### 4.2 What's Free Forever

| Feature | Detail |
|---------|--------|
| **Browse all listings** | See every active listing on the map — no login wall |
| **View registered facilities** | Every quarry, tip, transfer station, recycler mapped |
| **Fire ant zone overlay** | Toggle zones on/off, see which zone a listing is in |
| **Material compliance tooltips** | QLD regulatory guidance for all 8 material types |
| **Basic matching** | Click "Find Matches" on any listing |
| **Cost comparison (basic)** | Straight-line distance estimate, levy comparison |
| **Post listings** | Register (free) and post unlimited listings |
| **Contact suppliers/receivers** | Direct contact details visible |

### 4.3 What's Premium (Phase 2+)

| Feature | Value Proposition | Price Point |
|---------|------------------|-------------|
| **True cost calculator** | Routing distance, truck selection, fuel, time — real numbers | $50/month |
| **Specification matching** | Match against MRTS/AS specs, filter by material properties | $50/month |
| **Material tracking (GPS)** | Automated load counting, route logging | $200/month per active agreement |
| **Compliance certificates** | Downloadable PDF with full chain of custody | $50 per certificate |
| **Sustainability reports** | Tender-ready impact statements | Included with tracking |
| **Estimator alerts** | Push notifications when material matches your requirements | $50/month |
| **API access** | Integration with estimating software | $500/month |
| **Verified supplier badge** | Platform-verified, builds trust | $200/year |
| **Priority listing** | Appear first in search results | $100/month |

### 4.4 The Conversion Logic

Free users see enough to understand the value:
- "This exchange would save you approximately $X vs landfill" (basic estimate)
- "Upgrade for exact routing cost, specification matching, and compliance certificates"
- The gap between the basic estimate and the precise calculation is where the subscription earns its keep

A $50/month subscription that saves a single project $50,000 in one transaction is an absurd ROI. The product sells itself once people see real numbers.

---

## 5. Material Treatment at Scale

### 5.1 The Insight

Not all material needs to go to landfill, and not all material is ready for reuse in its current state. There's a middle ground: **treatment**.

Currently, low-quality materials are sent to landfill because:
1. Nobody knows where treatment facilities exist
2. Treatment costs are unclear
3. The logistics of getting material to treatment and then to its final destination are complex
4. There's no way to compare treatment + reuse vs straight-to-landfill costs

### 5.2 Treatment Options

| Material Issue | Treatment | Outcome | Facility Type |
|---------------|-----------|---------|--------------|
| Oversized particles | Screening, crushing | Meets grading spec | Mobile or fixed crusher |
| High plasticity (PI too high) | Lime stabilisation | Reduced PI, improved CBR | On-site or mobile plant |
| Contaminated (hydrocarbons) | Bioremediation, thermal desorption | Below NEPM limits | Licensed treatment facility |
| Contaminated (PFAS) | Immobilisation, thermal treatment | Below guideline values | HiQ Yatala (QLD's only PFAS facility) |
| Acid sulfate potential | Lime treatment, neutralisation | pH stabilised | On-site with ASSMP |
| Wet material | Drying (stockpile, lime addition) | Meets moisture spec | On-site or dedicated pad |
| Mixed C&D | Sorting, screening | Separated recyclable streams | Licensed C&D recycler |

### 5.3 Cut2Fill's Role in Treatment

The platform enables a **three-way exchange**:

```
SOURCE ──────► TREATMENT FACILITY ──────► DESTINATION
(low quality    (upgrade material        (receives material
 material)       to specification)        meeting spec)
```

**Example:**
1. Contractor A has 5,000m³ of clay fill (PI=35, too plastic for MRTS05 Type 2.1)
2. Lime stabilisation plant can treat it to PI<20 for $25/m³
3. Contractor B needs 5,000m³ of Type 2.1 fill, willing to pay $15/m³

**Cost comparison:**
- Without treatment: Contractor A pays $125/t levy to landfill = ~$977,500. Contractor B buys virgin quarry material at $30/m³ = $150,000. **Total: $1,127,500**
- With Cut2Fill treatment pathway: Treatment $125,000 + cartage. Contractor B gets fill at $15/m³ = $75,000. **Total: ~$300,000. Saving: $827,500**

### 5.4 Whole-of-Life Material Decisions

This is where Cut2Fill becomes genuinely valuable to engineers:

> "Should I use expensive, perfectly-graded imported fill? Or cheaper, treated local fill that achieves the same performance?"

The platform helps engineers make **whole-of-life decisions** by comparing:

| Factor | Virgin Quarry Material | Treated Reused Material |
|--------|----------------------|------------------------|
| Material cost | $25-40/m³ | $0-25/m³ (treatment cost) |
| Transport | Long-haul from quarry | Potentially shorter from nearby site |
| Embodied carbon | High (quarrying, crushing, transport) | Lower (no extraction) |
| Landfill diversion | None | Full volume diverted |
| Waste levy avoided | None | $125/t saved by source |
| Specification compliance | Guaranteed by quarry | Verified by testing post-treatment |
| Sustainability score | Low | High |

Sometimes the treated reused material is genuinely cheaper. Sometimes it's slightly more expensive but wins on sustainability. Sometimes the virgin material is the right call. **Cut2Fill gives the data to make that decision with confidence rather than defaulting to "just send it to the tip."**

---

## 6. Why Landfills Aren't Always the Answer

> **Note:** The product roadmap has been moved to `07-Product-Roadmap.md`.

### 6.1 The Default Behaviour Problem

The construction industry defaults to landfill because:
1. It's simple — call a tip truck, send it to the nearest licensed site
2. It's habitual — "that's how we've always done it"
3. The alternatives are unknown — "I didn't know there was a treatment option"
4. Time pressure — finding a reuse option takes effort; landfill takes a phone call

### 6.2 When Reuse/Treatment Is Better Than Landfill

| Scenario | Landfill | Reuse/Treatment | Winner |
|----------|---------|-----------------|--------|
| 10,000m³ clean fill, receiver 15km away | $1.15M levy + $80K cartage | $0 + $60K cartage | Reuse saves $1.17M |
| 3,000m³ clay (PI too high), lime plant 20km away | $345K levy + $50K cartage | $75K treatment + $40K cartage | Treatment saves $280K |
| 500m³ contaminated soil, PFAS detected | $120K levy + gate fee + $30K cartage | $90K treatment (HiQ Yatala) + $20K cartage | Treatment saves $40K + material recovered |
| 5,000m³ mixed C&D | $575K levy + $60K cartage | $125K sorting/recycling + $40K cartage | Recycling saves $470K |

### 6.3 Cut2Fill Makes the Alternative Visible

The platform doesn't tell people they can't use a landfill. It shows them what the alternatives are, what they cost, and what the compliance requirements are — then lets them make an informed decision. Most of the time, the numbers speak for themselves.

---

## 7. Data Value to Government

### 7.1 What Government Gets From Cut2Fill Data

| Data | Government Use |
|------|---------------|
| Real-time material flows across SEQ | Infrastructure planning, waste strategy monitoring |
| Volume of material diverted from landfill | Waste reduction target tracking |
| Fire ant zone compliance rates | Biosecurity enforcement intelligence |
| Material pricing trends | Market analysis, policy impact assessment |
| Regional supply/demand imbalance | Identify where infrastructure investment is needed |
| Treatment facility utilisation | Capacity planning |
| Transport patterns | Road planning, truck route management |
| Carbon emissions avoided | Climate action reporting |

### 7.2 The Government Partnership Pitch

> "We're building the data infrastructure that your waste strategy needs but doesn't currently have. Every material exchange on Cut2Fill generates data that helps you track progress against circular economy targets, enforce biosecurity compliance, and plan infrastructure investment. We're not asking for a handout — we're offering a data partnership where the platform serves industry and government simultaneously."

This is not a startup asking government for money. This is a platform offering government **visibility they can't currently get anywhere else**, in exchange for endorsement, data access, and eventually licensing fees.
