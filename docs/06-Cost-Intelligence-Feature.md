# Cut2Fill — Cost Intelligence & Material Specification Engine

**Version:** 1.1
**Date:** 7 April 2026
**Status:** Feature specification (Phase 2-3)

---

## 1. The Problem

Finding material is only half the equation. A project manager needs to know:

1. **What will this actually cost me?** — Free fill 50km away may cost more than paid fill 5km away once you factor in trucks, fuel, hours, and traffic
2. **Will this material meet my spec?** — MRTS04 general earthworks and MRTS05 structural fill both have specific grading, plasticity, and strength requirements. A listing that says "clean fill" tells you nothing about compliance with design specifications
3. **What's my risk?** — Wet material costs more to handle, contaminated material has legal liability, untested material may fail on placement
4. **Can I win work with this?** — Demonstrating material reuse, reduced truck movements, and lower carbon emissions is increasingly a tender evaluation criterion. But more importantly: can a tenderer go into a bid with **confidence** that fill sources exist, that deals can be structured prior to tender, and that those arrangements — combined with existing supplier relationships — can be relied on during project delivery?

No existing platform addresses any of these. Cut2Fill's cost intelligence engine turns the platform from a listing board into a **decision support tool** that construction professionals trust with real money.

### 1.1 Two Use Cases

**Near-term: Pre-tender deal-making.** The platform's first commercial value is enabling contractors and suppliers to find each other and structure material supply arrangements *before* tender submission. A tenderer who knows they have 15,000m³ of fill secured at $X/m³ from a verified source 12km away has a cost advantage over a competitor guessing at quarry rates. The platform doesn't need live pricing to deliver this — it needs visibility of who has what and where.

**Future: Live cost intelligence.** As the platform matures, live material availability and real-time cost estimates feed directly into estimating workflows. This is Phase 2-3 functionality. The near-term value is the network and the confidence it provides.

---

## 2. True Cost Calculator

### 2.1 Cost Factors

The "free" material myth: a listing marked "Free" only means the material itself has no purchase price. The true cost includes:

| Cost Factor | Variables | Data Source |
|------------|-----------|-------------|
| **Material cost** | Free or quoted price per m³ | Listing data |
| **Truck hire** | Rate per hour (typically $140-180/hr for 6-wheeler, $200-250/hr for truck & dog) | Configurable rates |
| **Cartage distance** | Driving distance in km (not straight line). *Note: current calculator uses straight-line distance — routing API integration is a Phase 2 requirement.* | Routing API (Google/Mapbox) |
| **Travel time** | Full loop time per load: driving to site + queue/wait + loading + driving to destination + queue/wait + unloading + return. Not just travel time — time on site is often the dominant factor on busy projects. | Routing API + configurable site times |
| **Fuel consumption** | Litres per km by truck type | Standard consumption tables |
| **Fuel price** | Current diesel price per litre | AIP or manual update |
| **Number of loads** | Total volume ÷ truck capacity (m³ per load by truck type) | Calculation |
| **Loading method** | Self-load vs machine-loaded (affects time per load) | Listing data |
| **Time of day** | Day rate vs night rate (overtime/penalty rates, noise restrictions) | User input |
| **Material condition** | Wet material = heavier = fewer m³ per load, harder to handle | Listing flag |
| **Waste levy (if landfill)** | $125/t (2025-26), rising $10/yr to $145 by 2027-28. **Does not always apply** — day cover material is exempt, and some landfills have operational limits or agreements that mean the levy is not attracted on all disposals. Do not assume every tonne to landfill incurs the full levy. | [QLD Govt Levy Rates](https://www.qld.gov.au/environment/circular-economy-waste-reduction/disposal-levy/about/levy-rates) |
| **Permit costs** | BIP application, Soil Disposal Permit, ASSMP preparation | Regulatory schedule |

### 2.2 Cost Comparison View

When a user clicks "Find Matches" or browses listings, the platform calculates and displays:

```
┌──────────────────────────────────────────────────────────────┐
│  Your project: Springfield Rise Estate                        │
│  Need: 15,000 m³ Clean Fill                                  │
│  Truck: Truck & dog (12m³/load) = 1,250 loads               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  OPTION A: BrisConnect Civil — South Brisbane (32km)         │
│  ├─ Material: FREE                                           │
│  ├─ Cartage: 1,250 loads × $185/load = $231,250             │
│  ├─ Fuel: 1,250 × 64km RT × 0.45L/km × $1.85 = $66,600    │
│  ├─ Zone crossing: YES — BIP may be required                 │
│  ├─ TOTAL ESTIMATED: $297,850 ($19.86/m³)                    │
│  └─ Confidence: ●●●○○ MEDIUM (untested, zone crossing)      │
│                                                               │
│  OPTION B: Urban Dig Co — West End (28km)                    │
│  ├─ Material: FREE                                           │
│  ├─ Cartage: 1,250 loads × $185/load = $231,250             │
│  ├─ Fuel: 1,250 × 56km RT × 0.45L/km × $1.85 = $58,275    │
│  ├─ Zone crossing: NO                                        │
│  ├─ Material Tested: YES ✓                                   │
│  ├─ TOTAL ESTIMATED: $289,525 ($19.30/m³)                    │
│  └─ Confidence: ●●●●○ HIGH (tested, same zone)              │
│                                                               │
│  OPTION C: Landfill disposal (Swanbank, 18km)                │
│  ├─ Waste levy*: 15,000m³ × 1.7t/m³ × $125/t = $3,187,500  │
│  ├─ Cartage: 1,250 loads × $165/load = $206,250             │
│  ├─ Gate fee: est. $15/t × 25,500t = $382,500               │
│  ├─ TOTAL ESTIMATED: $3,776,250 ($251.75/m³)                 │
│  └─ * Levy may not apply to all disposals — see note below   │
│                                                               │
│  Compare truck types: switching to semi-tipper (18m³/load)   │
│  reduces loads from 1,250 to 834 — saving ~$77K on Option B  │
│  but requires suitable site access at both ends.              │
│                                                               │
└──────────────────────────────────────────────────────────────┘

*Note on waste levy: The $125/t levy applies to waste received at
levied landfills. It does not apply to all disposals — material
used as day cover, operational fill within licence conditions, or
disposals under specific site agreements may be exempt. The
landfill comparison above assumes full levy as a worst case. Actual
landfill costs should be confirmed with the receiving facility.*
```

### 2.3 Truck Types & Capacities

| Truck Type | Capacity (m³) | Hourly Rate (est.) | L/km (loaded) |
|-----------|--------------|-------------------|---------------|
| 6-wheeler tipper | 5-6 m³ | $140-160/hr | 0.35 |
| 8-wheeler tipper | 8-10 m³ | $160-180/hr | 0.40 |
| Truck & dog | 12-14 m³ | $200-250/hr | 0.45 |
| Semi-tipper | 16-20 m³ | $220-280/hr | 0.50 |
| B-double | 28-34 m³ | $280-350/hr | 0.55 |

*Rates are configurable per project. Capacities shown are neat (compacted) cubic metres. A future refinement is the neat-to-loose conversion factor — loose material occupies more volume in the truck body than its compacted equivalent (typically 1.2-1.4x depending on material type). This affects load counts and therefore total cost. Conceptual for now — conversion factors will be configurable when the cost engine is built.*

### 2.4 Wet vs Dry Material

Wet material impacts cost in three ways:
1. **Heavier** — fewer m³ per load before hitting legal weight limits
2. **Harder to handle** — slippery, compaction issues, may require drying time
3. **Specification non-compliance** — many fill specifications have moisture content limits

| Condition | Bulk density (t/m³) | Load reduction |
|-----------|-------------------|---------------|
| Dry fill | 1.5-1.7 | Baseline |
| Moist fill | 1.7-1.9 | 10-15% fewer m³/load |
| Wet/saturated fill | 1.9-2.2 | 20-30% fewer m³/load |

Platform flag: When a listing is marked "wet material," the cost calculator adjusts load counts and displays a warning about potential specification issues.

### 2.5 Out of Hours Working

Many sites restrict hours (typically 6am-6pm). If material must be moved outside standard hours:

| Time | Rate Factor | Notes |
|------|------------|-------|
| Standard (6am-6pm Mon-Fri) | 1.0x | Base rate |
| Saturday | 1.3-1.5x | Penalty rates apply |
| Sunday | 1.5-2.0x | Higher penalties |
| Night (6pm-6am) | 1.5-1.75x | Noise restrictions may apply — check council |

---

## 3. Material Specification Matching

### 3.1 The Specification Problem

A listing that says "Clean Fill" is meaningless to an engineer who needs material complying with project specifications. The relevant standards span TMR technical specifications, Australian Standards, and project-specific requirements.

**The primary spec for most Cut2Fill material movements is MRTS04 — General Earthworks.** This is the workhorse spec for bulk fill placement on civil projects. MRTS05 covers unbound pavements (quarried materials for road base/sub-base), but the material property requirements within MRTS05 are often referenced in MRTS04 contexts — so we deal with MRTS05-type material classification, typically within an MRTS04 framework.

### 3.2 Key Specifications

**MRTS04 — General Earthworks**
The primary TMR specification for earthworks construction. Covers clearing, grubbing, fill placement, compaction, and material suitability. Most material movements on civil projects reference MRTS04.

| Requirement | Detail |
|-------------|--------|
| **Material suitability** | Must be free of deleterious matter, vegetation, topsoil |
| **Maximum particle size** | Generally 2/3 of compacted layer thickness |
| **Compaction** | Minimum 95% standard (98% for top 300mm of subgrade) |
| **Moisture** | Within allowable range at time of compaction |
| **Testing frequency** | Lot-based testing per specification |

MRTS04 defines what constitutes acceptable fill and how it must be placed. Material property requirements (LL, PI, CBR) may be specified by reference to material types, project-specific requirements, or by the RPEQ.

**MRTS05 — Unbound Pavements**
Covers quarried pavement materials — road base, sub-base. These are manufactured/processed materials with tight grading and property requirements. Cut2Fill would deal with MRTS05-type materials primarily in the context of quarry-sourced material supply rather than site-won fill.

**AS3798 — Guidelines on Earthworks for Commercial and Residential Developments**
The Australian Standard for non-TMR earthworks. Residential subdivisions, commercial sites, and local government projects typically reference AS3798 for compaction and material requirements.

### 3.3 Compliance Documentation — Needs Development

> **Note:** The compliance documentation structure for specifications is currently underdeveloped. Before building the specification matching engine, we need to:
>
> 1. **Map the full specification landscape** — Identify all TMR MRTS specifications, Australian Standards, and common project-specific requirements that apply to material movements in QLD
> 2. **Define a testing framework** — Structured grades of testing appropriate to different specifications (e.g., basic suitability for MRTS04 general fill vs full classification for structural applications)
> 3. **Clarify the MRTS04/MRTS05 relationship** — Document how material type classifications from MRTS05 are applied within MRTS04 earthworks contexts
> 4. **Build a compliance matrix** — What tests are required, at what frequency, for what material types, under which specifications
>
> This is foundational work that needs to be done properly before the platform can credibly offer specification matching. Don't over-complicate too early — start with the most common scenarios and expand.

### 3.4 Platform Integration

**Listing side:**
- Optional material specification fields: LL (Liquid Limit), PI (Plasticity Index), CBR, max particle size, grading
- Upload field for test results (PDF) — Phase 2
- Auto-classify material against specification types based on entered properties
- Future: structured testing tiers matched to relevant specifications

**Search/match side:**
- Filter by specification compliance: "Show me fill that meets general earthworks requirements"
- Confidence badge: "Meets spec" (tested + compliant), "May meet spec" (partial data), "Unknown" (untested)

**Example listing with spec data:**
```
Clean Fill — Road Widening Project
├─ Material: Clean Fill / Earth
├─ Volume: 8,500 m³
├─ Test Results: LL=32, PI=14, CBR=12, Max particle=40mm
├─ Specification: MRTS04 general fill — compliant
├─ Geotech Report: Available on request
└─ Confidence: ●●●●● VERIFIED
```

### 3.5 Applicable Standards & Specifications

> **Note:** This table needs a proper deep dive. The specifications below are confirmed as relevant but the detail (application scope, key parameters) needs to be verified against current versions and expanded to cover the full landscape. Additional MRTS specifications, Australian Standards, and industry guidelines likely apply.

| Standard | Application | Status |
|----------|------------|--------|
| **MRTS04** | General earthworks — fill placement, compaction, material suitability | Primary spec for most Cut2Fill material movements |
| **MRTS05** | Unbound pavements — quarried base/sub-base materials | Relevant for material classifications referenced in MRTS04 contexts |
| **AS3798** | Earthworks for commercial and residential developments | Primary spec for non-TMR projects |
| **AS1289** | Methods of testing soils for engineering purposes | Referenced by MRTS04, MRTS05, AS3798 for test methods |
| **Project-specific RPEQ requirements** | Vary by project — may override or supplement standard specs | Must be captured per listing |

*Additional MRTS specifications and Australian Standards to be identified and documented as part of the compliance framework build.*

---

## 4. Confidence & Risk Scoring

### 4.1 Confidence Levels

Each listing receives a confidence score based on available data:

| Level | Badge | Criteria |
|-------|-------|---------|
| ●●●●● VERIFIED | Green | Material tested by NATA lab + spec compliance confirmed + geotech report available |
| ●●●●○ HIGH | Green-amber | Material tested + basic spec data provided |
| ●●●○○ MEDIUM | Amber | Visual inspection only, or partial test data |
| ●●○○○ LOW | Amber-red | No testing, no spec data, but material type is low risk |
| ●○○○○ UNKNOWN | Red | No data, potentially contaminated, or from unknown source |

### 4.2 Risk Alerts

Automatic alerts triggered by listing characteristics:

**Compliance & Regulatory**

| Trigger | Alert | Level |
|---------|-------|-------|
| Material from EMR/CLR listed area | "Source may be on contaminated land register — verify before accepting" | CRITICAL |
| Contaminated soil | "Soil Disposal Permit required — licensed facility only" | CRITICAL |
| Fire ant zone crossing | "BIP may be required for cross-zone movement" | HIGH |
| Acid sulfate soil material | "ASSMP may be required — check AHD level at receiving site" | HIGH |
| Material from demolition site | "Asbestos risk — requires clearance certificate or inspection before acceptance" | HIGH |
| Aboriginal cultural heritage area | "Cultural heritage management plan may apply — check DATSIP requirements" | HIGH |
| Material from flood-affected area | "Flood-affected material may have altered properties or contamination — testing recommended" | MEDIUM |

**Material Quality**

| Trigger | Alert | Level |
|---------|-------|-------|
| Untested material for spec-critical use | "Material is untested — request test results before committing" | HIGH |
| Wet material + structural fill spec | "Wet material may not meet moisture content requirements — drying time and cost may apply" | MEDIUM |
| Dispersive soil indicators | "Dispersive soils require treatment (gypsum/lime) before use as fill — verify Emerson class" | MEDIUM |
| Reactive clay (high PI) | "High plasticity material may cause shrink-swell issues — check suitability for intended use" | MEDIUM |
| Material stockpiled >6 months | "Long-stockpiled material may have altered moisture, weed growth, or settlement — inspect before accepting" | LOW |
| Mixed material sources | "Material from multiple sources may have inconsistent properties — additional testing recommended" | LOW |

**Logistics & Access**

| Trigger | Alert | Level |
|---------|-------|-------|
| Route includes load-limited bridges | "Transport route may include load-limited bridges — verify with council" | HIGH |
| Oversize vehicle restrictions on route | "Route may have vehicle size restrictions — confirm access for selected truck type" | MEDIUM |
| Site access constraints flagged | "Source or destination has access limitations — check turning circles, grade, width for truck type" | MEDIUM |
| Wet weather access risk | "One or both sites may have restricted wet weather access — confirm all-weather capability" | MEDIUM |
| Volume mismatch >50% | "Available volume significantly less than your requirement — may need multiple sources" | LOW |
| Expiring within 1 week | "This listing expires soon — act fast" | INFO |

### 4.3 Estimator Quick-Alert

For construction estimators, the platform provides a "Quick Cost Alert" summary:

```
┌─────────────────────────────────────────────────┐
│ 🔔 ESTIMATOR ALERT: Springfield Rise Estate     │
│                                                  │
│ 3 new listings match your 15,000m³ requirement  │
│                                                  │
│ Best option: Urban Dig Co, West End             │
│ Est. cost: $19.30/m³ delivered                  │
│ Risk: LOW (tested, same zone)                   │
│ Saving vs landfill: $3.4M                       │
│ Sustainability: 28t CO₂ avoided                 │
│                                                  │
│ ⚠ 1 option crosses fire ant zone               │
│ ⚠ 1 option expires in 5 days                   │
│                                                  │
│ [View Details] [Contact Supplier]               │
└─────────────────────────────────────────────────┘
```

---

## 5. Document Intelligence (Phase 3)

### 5.1 Geotech Report Upload & Parsing

Users can upload geotech or contamination reports (PDF). The platform uses AI to extract:

- Material classification (LL, PI, CBR, grading curves)
- Contamination results (heavy metals, PFAS, hydrocarbons)
- NEPM compliance assessment
- Material type classification against applicable specifications
- ASS indicators (pH, SCr results)

**Output:** Auto-populated listing fields + confidence score + risk alerts

### 5.2 Specification & Drawing Parsing

Receivers (projects needing fill) can upload the specification they're working to. The platform parses the document to:

- Identify which material types and properties are required
- Clarify ambiguities — especially for users who aren't sure what their specification actually calls for
- Auto-generate search filters that match the specification requirements
- Flag where the specification references other standards (e.g., MRTS04 referencing AS1289 test methods)

This is a relatively simple inclusion that adds significant value: many site supervisors and PMs know they need "fill to spec" but aren't clear on exactly what that means in terms of material properties. The platform interprets the specification for them.

### 5.3 Material Requirement Input

Users can describe their material requirement in plain language or by specification:

- "I need general fill for a subdivision pad, 15,000m³"
- "Clean fill for residential subdivision, minimum CBR 8"
- "Rock fill for retaining wall, 150mm minus"
- "MRTS04 general earthworks fill, 5,000m³"

The platform should be accessible enough that a site supervisor can describe what they need in plain language without having to know the specification numbers. The system interprets the intent and matches against available listings with test data, showing compliance confidence.

---

## 6. Sustainability Analysis

### 6.1 Per-Transaction Sustainability Report

Every facilitated material exchange generates a sustainability impact report:

| Metric | Calculation | Unit |
|--------|------------|------|
| **Material diverted from landfill** | Volume × bulk density | tonnes |
| **Waste levy savings** | Tonnes × levy rate | $ |
| **Truck trips avoided** | (Landfill distance - reuse distance) × loads | trips |
| **Truck-km avoided** | Trips avoided × avg distance | km |
| **Diesel saved** | Truck-km avoided × consumption rate | litres |
| **CO₂ avoided** | Diesel saved × 2.68 kg CO₂/L + embodied carbon of virgin material | tonnes CO₂ |
| **Virgin material preserved** | Volume of material that didn't need to be quarried | m³ |

### 6.2 Tender Sustainability Submission

For companies bidding on government contracts, Cut2Fill generates a downloadable sustainability statement:

```
─────────────────────────────────────────────────────
         CUT2FILL SUSTAINABILITY STATEMENT

Project: Springfield Rise Estate — Lot Pad Fill
Company: Ipswich Developments Pty Ltd
Date: 15 April 2026

MATERIAL REUSE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Material sourced via Cut2Fill:        15,000 m³
Material diverted from landfill:      25,500 tonnes
Waste levy savings:                   $2,932,500
Virgin quarry material avoided:       15,000 m³

TRANSPORT IMPACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Truck trips (reuse vs landfill):      1,250 vs 2,500
Truck-km saved:                       62,500 km
Diesel saved:                         28,125 litres
CO₂ emissions avoided:               75.4 tonnes

COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Material tested:                      ✓ NATA certified
Specification compliance:             ✓ MRTS04 general earthworks
Fire ant zone crossing:               ✗ None
Contamination status:                 ✓ Clean (NEPM compliant)
Biosecurity compliance:               ✓ Same zone

This statement is generated by Cut2Fill — Australia's
construction material exchange platform.
cut2fill.com.au
─────────────────────────────────────────────────────
```

### 6.3 Why This Wins Tenders

QLD Government procurement increasingly requires sustainability criteria:

- **QLD Procurement Policy 2024** — requires consideration of environmental sustainability
- **TMR Sustainability Assessment** — used in major road project tenders
- **Brisbane 2032 Sustainability Framework** — circular economy is a specific target
- **IS Rating (Infrastructure Sustainability Council)** — material sourcing and waste diversion are scored categories

A company that can demonstrate they sourced reused material instead of virgin quarry product, avoided X tonnes of CO₂, and saved Y truck-km **scores higher on sustainability criteria** even if their headline price is comparable or slightly higher. Cut2Fill makes this evidence automatic and verifiable.

### 6.4 Pre-Contract Sustainability Value

The sustainability analysis is particularly valuable at the pre-contract stage. Even before material is physically moved, the platform can generate **indicative sustainability impact statements** based on a proposed material sourcing strategy. This gives tenderers soft stats to include in their submissions:

- "Our proposed fill sourcing strategy diverts an estimated X tonnes from landfill"
- "Estimated CO₂ reduction of Y tonnes vs virgin quarry supply"
- "Z fewer truck movements through residential areas"

Cost isn't everything in modern tenders. Environmental and sustainability targets are increasingly weighted in evaluation criteria, and demonstrating a considered material sourcing strategy — backed by platform data — is a genuine competitive advantage. Cut2Fill makes this effortless rather than requiring manual research and estimation.

---

## 7. Implementation Phases

| Phase | Features | Timeline |
|-------|----------|----------|
| **MVP (current)** | Listings, map, basic matching, fire ant zones, compliance tooltips, pricing badges | Delivered |
| **Phase 2** | Cost calculator, routing distance, truck type selection, wet/dry flag, specification fields | Q3 2026 |
| **Phase 3** | Document upload (geotech/contamination reports, specifications), AI parsing, auto-classification | Q4 2026 |
| **Phase 4** | Sustainability reporting, tender submission generator, estimator alerts | Q1 2027 |
| **Phase 5** | API for integration with estimating software (CostX, Candy, Buildsoft) | Q2 2027 |

---

## 8. Research & Industry Partnerships

The cost intelligence and specification engine has genuine R&D depth that aligns with multiple research organisations and industry bodies. Partnerships in this space would accelerate development, add credibility, and open doors to government and institutional users.

### 8.1 CSIRO

| Feature | CSIRO Research Area |
|---------|-------------------|
| Cost modelling (transport, fuel, time) | CSIRO Data61 — optimisation, logistics |
| Material specification matching | CSIRO Manufacturing — materials science |
| Contamination risk assessment | CSIRO Environment — contaminated land |
| Carbon accounting methodology | CSIRO Environment — emissions modelling |
| AI document parsing (geotech reports) | CSIRO Data61 — NLP, document intelligence |
| Circular economy metrics | CSIRO Manufacturing — industrial ecology |

CSIRO Kick-Start provides a co-funded R&D pathway. The R&D challenge has genuine scientific depth beyond basic software development.

### 8.2 Industry & Standards Bodies

| Organisation | Relevance | Partnership Value |
|-------------|-----------|------------------|
| **TMR (Transport and Main Roads)** | Author of MRTS specifications. Largest earthworks client in QLD. | Specification accuracy, data partnership, pilot projects |
| **CCF QLD (Civil Contractors Federation)** | Peak body for civil contractors. Members are primary users. | Industry validation, distribution channel, feedback loop |
| **ASBEC / Green Building Council** | Sustainability rating frameworks (IS Rating, Green Star) | Sustainability metric methodology, certification alignment |
| **Infrastructure Sustainability Council** | IS Rating scheme — material sourcing and waste diversion are scored | Ensuring Cut2Fill sustainability reports align with IS Rating criteria |
| **Engineers Australia** | Professional body for RPEQs who specify and certify materials | Specification framework validation, professional credibility |
| **NATA (National Association of Testing Authorities)** | Lab accreditation for material testing | Testing framework alignment, lab referral integration |
| **Waste Management Association of Australia** | Waste and resource recovery industry body | Circular economy metrics, landfill data, policy advocacy |
| **QLD Dept of Environment and Science** | Waste levy policy, contaminated land register, environmental regulation | Regulatory data feeds, policy alignment, compliance validation |

### 8.3 University Research

| Institution | Potential Collaboration |
|------------|----------------------|
| **QUT (Queensland University of Technology)** | Construction materials, AI/data science, sustainability assessment |
| **UQ (University of Queensland)** | Geotechnical engineering, environmental science, contamination |
| **Griffith University** | Environmental policy, circular economy, smart cities |

### 8.4 Why This Matters

Partnerships with these bodies serve three purposes:
1. **Credibility** — Government and institutional users trust a platform endorsed by TMR, CCF, or CSIRO. Industry body partnerships are currency in construction.
2. **Accuracy** — Getting specifications, testing frameworks, and compliance requirements right requires domain expertise that sits in these organisations.
3. **Distribution** — CCF has the member base. TMR has the project pipeline. Universities have the research students. Partnerships provide reach that marketing can't buy.

> **Action:** Identify 2-3 partnership targets for initial approach during soft launch phase. CCF QLD and TMR are the highest-value relationships for platform credibility and adoption.
