# Cut2Fill — Cost Intelligence & Material Specification Engine

**Version:** 1.0
**Date:** 23 March 2026
**Status:** Feature specification (Phase 2-3)

---

## 1. The Problem

Finding material is only half the equation. A project manager needs to know:

1. **What will this actually cost me?** — Free fill 50km away may cost more than paid fill 5km away once you factor in trucks, fuel, hours, and traffic
2. **Will this material meet my spec?** — MRTS05 Type 2.1 material has specific grading, plasticity, and strength requirements. A listing that says "clean fill" tells you nothing about compliance with design specifications
3. **What's my risk?** — Wet material costs more to handle, contaminated material has legal liability, untested material may fail on placement
4. **Can I win work with this?** — Demonstrating material reuse, reduced truck movements, and lower carbon emissions is increasingly a tender evaluation criterion

No existing platform addresses any of these. Cut2Fill's cost intelligence engine turns the platform from a listing board into a **decision support tool** that construction professionals trust with real money.

---

## 2. True Cost Calculator

### 2.1 Cost Factors

The "free" material myth: a listing marked "Free" only means the material itself has no purchase price. The true cost includes:

| Cost Factor | Variables | Data Source |
|------------|-----------|-------------|
| **Material cost** | Free or quoted price per m³ | Listing data |
| **Truck hire** | Rate per hour (typically $140-180/hr for 6-wheeler, $200-250/hr for truck & dog) | Configurable rates |
| **Cartage distance** | Driving distance in km (not straight line) | Routing API (Google/Mapbox) |
| **Travel time** | Minutes per trip including loading/unloading | Routing API + configurable load/unload times |
| **Fuel consumption** | Litres per km by truck type | Standard consumption tables |
| **Fuel price** | Current diesel price per litre | AIP or manual update |
| **Number of loads** | Total volume ÷ truck capacity (m³ per load by truck type) | Calculation |
| **Loading method** | Self-load vs machine-loaded (affects time per load) | Listing data |
| **Time of day** | Day rate vs night rate (overtime/penalty rates, noise restrictions) | User input |
| **Material condition** | Wet material = heavier = fewer m³ per load, harder to handle | Listing flag |
| **Waste levy (if landfill)** | $115/t (2025-26), escalating annually | QLD levy schedule |
| **Permit costs** | BIP application, Soil Disposal Permit, ASSMP preparation | Regulatory schedule |

### 2.2 Cost Comparison View

When a user clicks "Find Matches" or browses listings, the platform calculates and displays:

```
┌─────────────────────────────────────────────────────────────┐
│  Your project: Springfield Rise Estate                       │
│  Need: 15,000 m³ Clean Fill                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  OPTION A: BrisConnect Civil — South Brisbane (32km)        │
│  ├─ Material: FREE                                          │
│  ├─ Cartage: 1,250 loads × $185/load = $231,250            │
│  ├─ Fuel: 1,250 × 64km × 0.45L/km × $1.85 = $66,600      │
│  ├─ Zone crossing: YES — BIP may be required                │
│  ├─ TOTAL ESTIMATED: $297,850 ($19.86/m³)                   │
│  └─ Confidence: ●●●○○ MEDIUM (untested, zone crossing)     │
│                                                              │
│  OPTION B: Urban Dig Co — West End (28km)                   │
│  ├─ Material: FREE                                          │
│  ├─ Cartage: 500 loads × $185/load = $92,500               │
│  ├─ Fuel: 500 × 56km × 0.45L/km × $1.85 = $23,310        │
│  ├─ Zone crossing: NO                                       │
│  ├─ Material Tested: YES ✓                                  │
│  ├─ TOTAL ESTIMATED: $115,810 ($19.30/m³)                   │
│  └─ Confidence: ●●●●○ HIGH (tested, same zone, 6,000m³)   │
│                                                              │
│  OPTION C: Landfill disposal (Swanbank, 18km)               │
│  ├─ Waste levy: 15,000m³ × 1.7t/m³ × $115/t = $2,932,500  │
│  ├─ Cartage: 1,250 loads × $165/load = $206,250            │
│  ├─ Gate fee: est. $15/t × 25,500t = $382,500              │
│  ├─ TOTAL ESTIMATED: $3,521,250 ($234.75/m³)                │
│  └─ YOU SAVE: $3,405,440 by choosing Option B               │
│                                                              │
│  ⚡ SUSTAINABILITY: Option B saves 62,500 truck-km,          │
│     28.1 tonnes CO₂, and diverts 15,000m³ from landfill     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Truck Types & Capacities

| Truck Type | Capacity (m³) | Hourly Rate (est.) | L/km (loaded) |
|-----------|--------------|-------------------|---------------|
| 6-wheeler tipper | 5-6 m³ | $140-160/hr | 0.35 |
| 8-wheeler tipper | 8-10 m³ | $160-180/hr | 0.40 |
| Truck & dog | 12-14 m³ | $200-250/hr | 0.45 |
| Semi-tipper | 16-20 m³ | $220-280/hr | 0.50 |
| B-double | 28-34 m³ | $280-350/hr | 0.55 |

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

### 2.5 Night Work Premium

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

A listing that says "Clean Fill" is meaningless to an engineer who needs material complying with **MRTS05 — Earthworks** (Queensland Transport and Main Roads Technical Specification). The spec defines multiple material classes with strict requirements.

### 3.2 MRTS05 Material Classifications

| Type | Description | Key Requirements |
|------|------------|-----------------|
| **Type 1** | General fill | LL ≤ 80, PI ≤ 55, max particle 150mm |
| **Type 2.1** | Structural fill (high quality) | LL ≤ 40, PI ≤ 20, CBR ≥ 8, max particle 75mm |
| **Type 2.2** | Structural fill (moderate) | LL ≤ 50, PI ≤ 25, CBR ≥ 5, max particle 75mm |
| **Type 2.3** | Bridge approach fill | LL ≤ 35, PI ≤ 12, CBR ≥ 15, max particle 37.5mm |
| **Type 2.4** | Reinforced earth fill | LL ≤ 30, PI ≤ 6, specific grading |
| **Type 3** | Rock fill | Max particle 2/3 layer thickness, no soil fines |
| **Type 4** | Select fill (subgrade replacement) | CBR ≥ 15, specific grading envelope |

### 3.3 Platform Integration

**Listing side:**
- Optional material specification fields: LL (Liquid Limit), PI (Plasticity Index), CBR, max particle size, grading
- Upload field for test results (PDF) — Phase 2
- Auto-classify material against MRTS05 types based on entered properties

**Search/match side:**
- Filter by specification compliance: "Show me fill that meets MRTS05 Type 2.1"
- Confidence badge: "Meets spec" (tested + compliant), "May meet spec" (partial data), "Unknown" (untested)

**Example listing with spec data:**
```
Clean Fill — Road Widening Project
├─ Material: Clean Fill / Earth
├─ Volume: 8,500 m³
├─ Test Results: LL=32, PI=14, CBR=12, Max particle=40mm
├─ MRTS05 Classification: ✓ Type 2.1 compliant
├─ Geotech Report: Available on request
└─ Confidence: ●●●●● VERIFIED
```

### 3.4 Other Specification Standards

| Standard | Application | Key Parameters |
|----------|------------|---------------|
| MRTS05 | TMR road/bridge earthworks | LL, PI, CBR, grading, max particle |
| AS3798 | Residential/commercial fill | Compaction requirements, material classification |
| MRTS04 | General earthworks | Broader than MRTS05 |
| MRTS06 | Subgrade reinstatement | Specific to pavement works |
| DTMR RPEQ specifications | Project-specific | Vary by project |

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

| Trigger | Alert | Level |
|---------|-------|-------|
| Material from EMR/CLR listed area | "Source may be on contaminated land register — verify before accepting" | HIGH |
| Acid sulfate soil material | "ASSMP may be required — check AHD level at receiving site" | HIGH |
| Contaminated soil | "Soil Disposal Permit required — licensed facility only" | CRITICAL |
| Fire ant zone crossing | "BIP may be required for cross-zone movement" | HIGH |
| Wet material + structural fill spec | "Wet material may not meet moisture content requirements" | MEDIUM |
| Volume mismatch >50% | "Available volume significantly less than your requirement" | LOW |
| Expiring within 1 week | "This listing expires soon — act fast" | INFO |
| Untested material for spec-critical use | "Material is untested — request test results before committing" | MEDIUM |

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
- MRTS05 type classification
- ASS indicators (pH, SCr results)

**Output:** Auto-populated listing fields + confidence score + risk alerts

### 5.2 Material Requirement Input

Users can describe their material requirement in plain language or by specification:

- "I need MRTS05 Type 2.1 fill, 15,000m³"
- "Clean fill for residential subdivision, minimum CBR 8"
- "Rock fill for retaining wall, 150mm minus"

The platform matches these requirements against available listings with test data, showing compliance confidence.

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
MRTS05 compliance:                    ✓ Type 2.1
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

---

## 7. Implementation Phases

| Phase | Features | Timeline |
|-------|----------|----------|
| **MVP (current)** | Listings, map, basic matching, fire ant zones, compliance tooltips, pricing badges | Delivered |
| **Phase 2** | Cost calculator, routing distance, truck type selection, wet/dry flag, specification fields | Q3 2026 |
| **Phase 3** | Document upload (geotech/contamination reports), AI parsing, MRTS05 auto-classification | Q4 2026 |
| **Phase 4** | Sustainability reporting, tender submission generator, estimator alerts | Q1 2027 |
| **Phase 5** | API for integration with estimating software (CostX, Candy, Buildsoft) | Q2 2027 |

---

## 8. CSIRO R&D Alignment

This feature set directly maps to CSIRO capabilities:

| Feature | CSIRO Research Area |
|---------|-------------------|
| Cost modelling (transport, fuel, time) | CSIRO Data61 — optimisation, logistics |
| Material specification matching | CSIRO Manufacturing — materials science |
| Contamination risk assessment | CSIRO Environment — contaminated land |
| Carbon accounting methodology | CSIRO Environment — emissions modelling |
| AI document parsing (geotech reports) | CSIRO Data61 — NLP, document intelligence |
| Circular economy metrics | CSIRO Manufacturing — industrial ecology |

This strengthens the Kick-Start application by demonstrating that the R&D challenge has genuine scientific depth beyond basic software development.
