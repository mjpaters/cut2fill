# Cut2Fill — QLD Regulatory Compliance Framework

**Version:** 1.0
**Date:** 23 March 2026
**Purpose:** Comprehensive reference for all QLD regulations governing the movement, disposal, and reuse of earthworks materials. This document underpins the compliance intelligence layer of the Cut2Fill platform.

---

## 1. Regulatory Overview

Moving earthworks material in Queensland is governed by **six overlapping regulatory frameworks**. Non-compliance with any single framework can result in significant penalties, project delays, and remediation costs.

```
┌─────────────────────────────────────────────────────────┐
│                    MATERIAL MOVEMENT                     │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ EP Act   │Biosecur- │ Planning │  Waste   │   Local     │
│ 1994     │ity Act   │ Act 2016 │  Reduc-  │   Govt      │
│          │ 2014     │   + SPP  │  tion &  │   Laws      │
│          │          │          │  Recyc.  │             │
│          │          │          │  Act 2011│             │
├──────────┼──────────┼──────────┼──────────┼─────────────┤
│General   │Fire ant  │Acid      │Waste     │Fill         │
│environ-  │movement  │sulfate   │levy &    │placement    │
│mental    │controls  │soil      │tracking  │approvals    │
│duty      │BIP req.  │ASSMP     │EOW codes │Erosion &    │
│ERA lic.  │Zone      │          │Regulated │sediment     │
│Contam.   │restrict- │          │waste     │control      │
│land      │ions      │          │transport │             │
└──────────┴──────────┴──────────┴──────────┴─────────────┘
```

---

## 2. Environmental Protection Act 1994

### 2.1 General Environmental Duty (Section 319)

**Applies to:** Every person and company in Queensland conducting any activity.

> "A person must not carry out any activity that causes, or is likely to cause, environmental harm unless the person takes all reasonable and practicable measures to prevent or minimise the harm."

**Relevance to Cut2Fill:** Every material exchange facilitated through the platform must not cause environmental harm. The platform's compliance guidance helps users meet this duty.

### 2.2 Environmentally Relevant Activities (ERAs)

ERAs require an Environmental Authority (EA) from DES. The following ERAs are relevant to earthworks material handling:

| ERA | Description | Threshold | Relevance |
|-----|------------|-----------|-----------|
| **ERA 16** | Extractive and screening activities | >5,000t/year extraction | Quarries, sand/gravel pits, mobile screening |
| **ERA 53** | Composting and organic material processing | >200t/year | Soil blending with organic matter |
| **ERA 54** | Mechanical waste reprocessing | Any scale | Soil screening, crushing, recycling |
| **ERA 55** | Other waste treatment | Any scale | Soil treatment, remediation |
| **ERA 56** | Regulated waste storage | >various thresholds | Contaminated soil stockpiling |
| **ERA 57** | Regulated waste transport | >250kg at a time | Moving contaminated or regulated soil |
| **ERA 60** | Waste disposal — landfill | <50,000t/year to >200,000t/year (4 tiers) | All licensed landfills and disposal sites |

**Cut2Fill integration:** The platform will identify when a material type or activity triggers ERA requirements and alert the user. Registered facilities will display their ERA licence status.

### 2.3 Contaminated Land (Part 8, Divisions 1-6)

**Environmental Management Register (EMR):**
- Lists land where notifiable activities have been or are being conducted
- ~20 categories of notifiable activities (Schedule 3 of EP Act)
- Includes petroleum storage, landfill, mining, chemical manufacturing, etc.

**Contaminated Land Register (CLR):**
- Lists land where contamination has been confirmed through investigation
- Higher risk classification than EMR

**Soil Disposal Permits (Section 424-425):**
- **Required** when moving soil from EMR or CLR listed land
- Free to obtain, decided in 10 business days
- Cannot be amended once issued — new permit required for changes
- Non-compliance: **100 penalty units ($16,692) per offence**

**Cut2Fill integration:**
- When a listing address matches an EMR/CLR listed site, flag the requirement for a Soil Disposal Permit
- Provide link to DES Soil Disposal Permit application
- Display disclaimer that EMR/CLR checks should be independently verified

### 2.4 Key Offence Provisions

| Section | Offence | Penalty |
|---------|---------|---------|
| s.424 | Depositing contaminated soil without permit | 100 penalty units |
| s.425 | Failing to comply with soil disposal permit conditions | 100 penalty units |
| s.430 | Carrying out ERA without EA | 300 penalty units |
| s.437 | Contravening conditions of EA | 300 penalty units |
| s.440ZG | Unlawful deposit of prescribed waste | 4,500 penalty units or 5 years imprisonment |

*1 penalty unit = $166.90 (from 1 July 2025; [QLD Govt](https://www.dlgwv.qld.gov.au/local-government/for-councils/laws/value-of-a-penalty-unit))*

---

## 3. Biosecurity Act 2014 — Fire Ant Movement Controls

### 3.1 General Biosecurity Obligation (Section 23)

Every person in Queensland has a **General Biosecurity Obligation (GBO)** to take all reasonable and practical measures to prevent or minimise biosecurity risks. For fire ants, this specifically applies to the movement of soil, mulch, hay, and other carrier materials.

### 3.2 Biosecurity Zones

Fire ant biosecurity zones are declared under the Biosecurity Act 2014 and updated approximately monthly by Biosecurity Queensland (BQCC).

| Zone | Colour | Restrictions |
|------|--------|-------------|
| **Zone 1** (Restricted) | Red | Soil/carrier material must not be moved outside Zone 1 without a BIP. Movement within Zone 1 permitted with GBO compliance. |
| **Zone 2** (Buffer) | Orange | Soil/carrier material must not be moved outside Zone 2 without a BIP. Movement within Zone 2 permitted with GBO compliance. Movement from Zone 2 into Zone 1 permitted. |
| **Outside zones** | — | No fire ant movement restrictions, but GBO still applies. |

### 3.3 What Constitutes "Soil" Under Fire Ant Regulations

The regulations apply to soil within the **top 1 metre** of the ground surface, including:
- All types of soil, earth, fill, clay, sand, loam
- Soil attached to plants, machinery, or equipment
- Material containing soil (e.g., mulch mixed with soil)

### 3.4 Biosecurity Instrument Permits (BIP)

A BIP is required to move carrier materials (including soil) **out of** a biosecurity zone. BIPs specify:
- Treatment requirements (e.g., chemical treatment, visual inspection)
- Documentation requirements
- Destination restrictions
- Reporting obligations

### 3.5 Penalties

| Offence | Individual | Corporation |
|---------|-----------|-------------|
| Failing to comply with GBO | 750 penalty units ($125,175) | 3,750 penalty units ($625,875) |
| Breaching movement controls | 750 penalty units ($125,175) | 3,750 penalty units ($625,875) |
| Failing to comply with BIP conditions | 300 penalty units ($50,076) | 1,500 penalty units ($250,380) |

### 3.6 Cut2Fill Integration

**Zone checking:** Every listing is geocoded and checked against current biosecurity zone boundaries.

**Match warnings:** When "Find Matches" connects listings in different zones, the platform displays:
- Warning banner: *"Fire ant biosecurity zone crossing — BIP may be required"*
- Link to BQCC zone checker tool
- Link to BIP application process

**Zone data:** Sourced from QLD Open Data Portal (data.qld.gov.au) in GPKG/SHP format, or queried live from ArcGIS REST API (Layer 65 of Biosecurity MapServer). Refreshed monthly to match BQCC update cycle.

---

## 4. Acid Sulfate Soil (ASS) Management

### 4.1 Legislative Framework

ASS management in Queensland is governed by six interacting pieces of legislation:

1. **State Planning Policy (SPP)** — triggers assessment requirements
2. **Planning Act 2016** — development assessment framework
3. **Environmental Protection Act 1994** — environmental harm provisions
4. **Coastal Protection and Management Act 1995** — coastal zones
5. **Fisheries Act 1994** — waterways protection
6. **Water Act 2000** — groundwater impacts

### 4.2 When ASS Assessment is Required

Assessment is triggered when works involve:
- **Excavation of ≥100m³** of soil or sediment **at or below 5m AHD** (Australian Height Datum)
- **Filling of ≥500m³** at or below 5m AHD
- In some LGAs, the trigger level is **10m AHD** (more conservative)

**Note:** AHD thresholds vary by location. Coastal areas and floodplains are highest risk.

### 4.3 Acid Sulfate Soil Management Plan (ASSMP)

When triggered, an ASSMP must be prepared by a suitably qualified person. The ASSMP covers:
- Site investigation and testing (chromium reducible sulfur test — SCr)
- Treatment requirements (lime dosing rates)
- Monitoring plan (pH, water quality)
- Disposal/reuse plan for excavated ASS material
- Contingency measures

### 4.4 Cut2Fill Integration

- Material type "Acid Sulfate Soil" triggers automatic guidance
- Tooltip: *"ASSMP may be required below 5m AHD (10m AHD in some LGAs). See SPP guidelines."*
- Listings for ASS material display a prominent compliance badge
- Link to QLD ASS guidelines and SPP mapping

---

## 5. Waste Reduction and Recycling Act 2011

### 5.1 Waste Levy

The waste levy applies to all waste delivered to a levied waste disposal site in the waste levy zone (which includes all of SEQ).

| Year | Levy Rate (Metro Zone) | Source |
|------|----------------------|--------|
| 2023-24 | $105/tonne | [QLD Govt Levy Rates](https://www.qld.gov.au/environment/circular-economy-waste-reduction/disposal-levy/about/levy-rates) |
| 2024-25 | $115/tonne | " |
| 2025-26 | $125/tonne | " |
| 2026-27 | $135/tonne | " |
| 2027-28 | $145/tonne (cap, then CPI-indexed) | " |

**Critical change:** As of **1 July 2023**, the previous exemption for clean earth was **removed** [QLD Govt FAQ](https://www.qld.gov.au/environment/circular-economy-waste-reduction/policy-legislation/changes/frequently-asked-questions). This means:
- Clean fill **disposed** to a landfill now attracts the full general waste levy
- A single truck load (~15m³ / ~25 tonnes) of clean fill costs **$3,125** in levy alone (at $125/t, 2025-26)
- **Day cover exemption:** Landfill operators can apply for an operational purposes exemption for material used as day cover, access roads, or capping — this material does not attract the levy
- This creates a powerful economic incentive for reuse via a platform like Cut2Fill

### 5.2 Exempt Waste

Limited exemptions remain:
- Waste from natural disasters (declared under Disaster Management Act)
- Waste from emergency events
- Some specific industrial by-products with EOW codes

### 5.3 End of Waste (EOW) Codes

EOW codes provide a streamlined pathway for declaring that a material is no longer "waste" and can be used as a resource. As of March 2026, **47 EOW codes** have been approved.

**Construction-relevant EOW codes:**
| Code | Material | Relevance |
|------|----------|-----------|
| ENEW07604819 | Recycled aggregates | Crushed concrete, brick, tile |
| ENEW07278517 | Returned concrete | Unused concrete from batching plants |
| Various | Slag, fly ash, by-products | Industrial by-products for construction |

**Critical gap: There is NO EOW code for excavated soil or clean fill.**

This means excavated soil is legally classified as "waste" even when it is clean, uncontaminated, and suitable for direct reuse. This regulatory gap:
- Forces conservative disposal decisions (landfill rather than reuse)
- Creates unnecessary levy costs
- Increases truck movements and emissions
- Contradicts the intent of the QLD Waste Strategy

**Cut2Fill's role:** The platform can generate data to support the case for developing an EOW code for clean fill/excavated soil. Transaction data showing volumes of material successfully reused, material testing results, and compliance documentation would provide evidence for a DES submission.

### 5.4 Waste Tracking

**Regulated waste transport** (ERA 57) requires:
- Waste tracking certificates for regulated waste
- Transport only by licensed carriers
- Destination must hold appropriate EA

**Non-regulated waste** (including clean fill) does not require waste tracking certificates, but the general environmental duty (EP Act s.319) still applies.

### 5.5 Cut2Fill Integration

- Display waste levy calculator: *"Sending this material to landfill would cost approximately $X in waste levy alone"*
- Highlight cost savings from reuse vs. disposal
- For contaminated soil listings, flag regulated waste transport requirements
- Track EOW code status and notify users when relevant codes are approved

---

## 6. Planning Act 2016 & Local Government Requirements

### 6.1 Fill Placement Approvals

Most SEQ local governments require development approval for fill placement above certain thresholds:

| Council | Trigger for Approval |
|---------|---------------------|
| Brisbane City Council | Fill >50m³ in most zones; any fill in waterway corridors or flood areas |
| Gold Coast City Council | Fill requiring change to natural ground level >300mm |
| Sunshine Coast Regional Council | Fill >100m³ or depth >300mm |
| Ipswich City Council | Operational works approval for filling |
| Logan City Council | Fill >100m³ in residential zones |
| Moreton Bay Regional Council | Varies by overlay zone |

**Note:** Thresholds and requirements vary significantly between LGAs and between zone categories within each LGA. Always check the relevant planning scheme.

### 6.2 Erosion and Sediment Control

All fill placement and earthworks must comply with erosion and sediment control requirements. Most councils reference the IECA (International Erosion Control Association) Best Practice Erosion and Sediment Control guidelines.

### 6.3 Cut2Fill Integration

- When a listing involves fill placement, display the receiving LGA's fill approval requirements
- Link to relevant planning scheme provisions
- Remind users to obtain necessary development approvals before accepting material

---

## 7. National Environment Protection Measure (NEPM)

### 7.1 NEPM for Assessment of Site Contamination

The NEPM provides the national framework for assessing soil contamination, including:
- Health Investigation Levels (HILs) for various land uses
- Ecological Investigation Levels (EILs)
- Health Screening Levels (HSLs) for vapour intrusion
- Ecological Screening Levels (ESLs)

### 7.2 Application in QLD

Queensland adopts the NEPM as the technical standard for contamination assessment. The EP Act provides the enforcement mechanism.

**Key standards for material movement:**
- **Virgin Excavated Natural Material (VENM):** Soil that has not been subject to any notifiable activity and meets background concentrations. Lowest risk category.
- **Excavated Natural Material (ENM):** Soil from non-contaminated sites that may have slightly elevated but non-hazardous concentrations.
- **Contaminated Soil:** Soil exceeding NEPM investigation levels. Requires disposal at licensed facility or treatment.

### 7.3 Testing Requirements by Material Classification

| Classification | Testing Required | Disposal/Reuse Options |
|---------------|-----------------|----------------------|
| VENM | Visual assessment + site history (no laboratory testing required if provenance is clear) | Unrestricted reuse |
| ENM | Laboratory testing against NEPM criteria | Reuse with conditions |
| CT-1 (Contaminated Tier 1) | Full laboratory suite per NEPM | Licensed facility only |
| CT-2 (Contaminated Tier 2) | Extended laboratory suite | Licensed high-security facility |

### 7.4 Cut2Fill Integration

- "Material Tested" badge with classification level (VENM, ENM, CT-1, CT-2)
- Material type tooltips reference NEPM classification requirements
- Listings for contaminated material display appropriate warnings and disposal requirements

---

## 8. Chain of Custody & Documentation Requirements

### 8.1 Legal Requirements

There is no single "chain of custody" law in QLD for all material movements. However, documentation requirements arise from multiple sources:

| Requirement | Source | When Required |
|------------|--------|--------------|
| Soil Disposal Permit | EP Act s.424 | Soil from EMR/CLR land |
| Waste tracking certificate | EP Regulation | Regulated waste transport |
| BIP documentation | Biosecurity Act | Material crossing fire ant zones |
| ASSMP | SPP + EP Act | ASS material excavation |
| Test results / NATA certificates | NEPM + commercial requirements | Whenever material classification is disputed |
| Transport records | General environmental duty + commercial | All material movements (best practice) |

### 8.2 Best Practice Documentation

For commercial transactions, Cut2Fill will encourage (but not mandate):
- Material source declaration (project name, address, site history)
- Material classification (testing results if available)
- Volume and load records
- Destination confirmation
- Transport details
- Fire ant zone compliance confirmation

### 8.3 Cut2Fill Integration (Phase 2)

- Optional compliance documentation generation per transaction
- Material passport concept — digital record of material provenance, testing, and movement
- Downloadable PDF for site files and audits
- Integration with transport records

---

## 9. Compliance Decision Matrix

This matrix summarises what is required based on material type and circumstances:

| Material Type | Fire Ant Zone Crossing | From EMR/CLR Land | Receiving LGA Approval | Testing Required | Special Permit |
|--------------|----------------------|-------------------|----------------------|-----------------|----------------|
| **Clean Fill** | BIP required | Soil Disposal Permit | Fill placement approval if over threshold | No (but recommended) | No |
| **Rock / Rubble** | BIP required (if mixed with soil) | Soil Disposal Permit | Fill placement approval | No | No |
| **Sand** | BIP required | Soil Disposal Permit | Fill placement approval | ASS screening if coastal | No |
| **Topsoil** | BIP required | Soil Disposal Permit | Fill placement approval | Weed seed cert. recommended | No |
| **Concrete / Asphalt** | BIP required (if mixed with soil) | Soil Disposal Permit | Fill placement approval | Asbestos clearance | EOW code applies |
| **Mixed C&D** | BIP required | Soil Disposal Permit | Not for reuse — licensed facility only | Yes — waste classification | ERA 54 or 60 |
| **Acid Sulfate Soil** | BIP required | Soil Disposal Permit | ASSMP required + LGA approval | Yes — SCr test | ASSMP approval |
| **Contaminated Soil** | BIP required + additional conditions | Soil Disposal Permit REQUIRED | Not for reuse — licensed facility only | Yes — full NEPM suite | Soil Disposal Permit + waste tracking |

---

## 10. Regulatory Gap Analysis & Opportunities

### 10.1 Gaps Identified

1. **No EOW code for clean fill** — the most commonly moved material type has no streamlined regulatory pathway for reuse
2. **No digital fire ant compliance tool** — zone checking is manual via BQCC website
3. **No centralised material movement register** — government has no visibility on where material is going
4. **No real-time facility capacity data** — landfills and dump sites publish no capacity information
5. **Environmental Authorities register lacks coordinates** — the most authoritative facility register has no spatial data

### 10.2 Opportunities for Cut2Fill

| Gap | Cut2Fill Solution | Government Benefit |
|-----|------------------|-------------------|
| No EOW code for clean fill | Platform data demonstrates safe reuse at scale | Evidence base for EOW code development |
| No digital zone compliance | Automated zone checking and warnings | Improved biosecurity compliance |
| No material movement register | Platform tracks all facilitated exchanges | Policy intelligence, waste strategy monitoring |
| No capacity data | Facilities self-report capacity on platform | Proactive capacity planning |
| No spatial EA data | Cut2Fill geocodes and maps all licensed facilities | Public information access |

---

## References

### Primary Legislation
- Environmental Protection Act 1994 (Qld) — https://www.legislation.qld.gov.au/view/html/inforce/current/act-1994-062
- Environmental Protection Regulation 2019 (Qld) — https://www.legislation.qld.gov.au/view/whole/html/inforce/current/sl-2019-0155
- Biosecurity Act 2014 (Qld) — https://www.legislation.qld.gov.au/view/html/inforce/current/act-2014-007
- Waste Reduction and Recycling Act 2011 (Qld) — https://www.legislation.qld.gov.au/view/html/inforce/current/act-2011-031
- Planning Act 2016 (Qld) — https://www.legislation.qld.gov.au/view/html/inforce/current/act-2016-025

### Government Resources
- Soil Disposal Permits — https://www.qld.gov.au/environment/management/environmental/contaminated-land/permits/disposal-permit
- Fire Ant Biosecurity Zones — https://www.fireants.org.au/stop/biosecurity-zones
- Fire Ant Movement Controls Guide — https://www.fireants.org.au/stop/movement-controls/movement-controls-guide
- End of Waste Codes — https://www.business.qld.gov.au/running-business/environment/waste-management/regulated-waste/eow-codes
- ASS Legislation & Policies — https://www.qld.gov.au/environment/land/management/soil/acid-sulfate/legislation-policies
- Waste Levy Rates — https://www.qld.gov.au/environment/circular-economy-waste-reduction/disposal-levy/about/levy-rates
- NEPM Assessment of Site Contamination — https://www.nepc.gov.au/nepms/assessment-site-contamination
- QLD Waste Strategy — https://www.qld.gov.au/environment/circular-economy-waste-reduction/strategy-plans/strategy
- EA Public Register — https://apps.des.qld.gov.au/public-register/search/ea.php

### Data Sources
- Fire Ant Zone Data (SHP/GPKG) — https://www.data.qld.gov.au/dataset/fire-ant-biosecurity-zones-queensland
- QLD Waste Facilities — https://www.data.qld.gov.au/dataset/public-waste-and-recycling-facilities-in-queensland
- Environmental Authorities Register — https://www.data.qld.gov.au/dataset/environmental-authorities
- Mining Permits ArcGIS REST — https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Economy/MinesPermitsCurrent/MapServer
- Key Resource Areas — https://www.data.qld.gov.au/dataset/key-resource-areas-queensland-series
