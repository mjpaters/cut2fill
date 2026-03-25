# Cut2Fill — Data Sources & Methodology

## LGA Boundaries (All QLD)

- **Source**: Queensland Government Spatial Services — ArcGIS REST API
- **Endpoint**: `https://spatial-gis.information.qld.gov.au/arcgis/rest/services/PlanningCadastre/LandParcelPropertyFramework/MapServer/20`
- **Layer**: 20 — Local Government Areas
- **Format**: GeoJSON (WGS84 / EPSG:4326)
- **Processing**: Douglas-Peucker simplification at 0.001° tolerance (~110m accuracy), 514k → 42k coordinate points
- **Output**: `data/qld-lga-boundaries.geojson` (745 KB, 78 LGAs)
- **Date pulled**: 2026-03-25
- **Update frequency**: Static — LGA boundaries rarely change. Re-pull if council amalgamations occur.

---

## Fire Ant Biosecurity Zones (SEQ)

- **Source**: Queensland Government biosecurity zone data (simplified)
- **Format**: GeoJSON inline in app.js, also at `data/fire-ant-simple.geojson`
- **Coverage**: SEQ only (Zone 1 restricted, Zone 2 buffer)
- **Update frequency**: Zones change periodically — check BQCC for updates

---

## Registered Facilities (Curated)

All facility data is manually curated and verified by the Archers team. Sources per facility type:

### Quarries (35 listed as of 2026-03-25)
- **Primary sources**: Operator websites (Boral, Hanson/Heidelberg, Holcim, Adbri, etc.), council planning registers, industry directories
- **Verification**: Cross-referenced against TMR Registered Suppliers list, Key Resource Area (KRA) designations, and Environmental Authority (ERA 16) registrations
- **Coverage**: All 12 SEQ LGAs + Toowoomba. Gap analysis completed 2026-03-25.
- **Known gaps**: Smaller freehold quarries without state mining leases may be missing

### Concrete Suppliers (50 listed as of 2026-03-25)
- **Primary sources**: Operator websites, Yellow Pages, industry directories
- **Operators covered**: Boral/Q-Crete, Holcim/Readymix, Heidelberg/Hanson, Wagners, Nucon, Neilsens, Neil Mansell, Sunmix, Cordwells, SPS, Hymix
- **Known gaps**: Heidelberg Materials likely has additional unlisted plants (rebrand from Hanson obscured some locations)

### Landfills, Transfer Stations, Soil Treatment, C&D Recyclers, PFAS Treatment
- **Primary sources**: Council websites, EPA registers, operator websites
- **Coverage**: SEQ focus

### Water Fill Points (83 listed)
- **Primary sources**: QUU, Unitywater, Gold Coast CC, Logan CC, Redland CC official fill station listings
- **Coverage**: SEQ only

---

## Potential Live Data Sources (Investigated 2026-03-25)

### 1. GeoResGlobe — Mining Tenure WFS (BEST LIVE OPTION)
- **Endpoint**: `https://spatial-gis.information.qld.gov.au/arcgis/rest/services/` (mining tenure layers)
- **What it provides**: State-issued mining leases and extractive permits with spatial boundaries
- **Format**: WFS / ArcGIS REST API — returns GeoJSON
- **Limitation**: Only covers state-tenured operations. Misses quarries on freehold land operating under council DAs.
- **Use case**: Supplementary layer to identify quarries we might be missing

### 2. TMR Registered Suppliers — Quarry Products
- **URL**: https://www.tmr.qld.gov.au (search "registered suppliers quarries")
- **Format**: Excel spreadsheet (.xlsx) download
- **What it provides**: Quarries with TMR-approved products (road base, aggregates, etc.)
- **Update frequency**: Periodic (roughly quarterly)
- **Limitation**: No API — manual or scripted download required. URL changes between updates.
- **Use case**: Cross-check against our curated list to catch new registrations

### 3. Environmental Authority Register (DESI)
- **URL**: https://apps.des.qld.gov.au/env-authorities/
- **What it provides**: ERA 16 (Extractive & Screening) environmental authorities
- **Format**: Web form search — HTML results, no API
- **Limitation**: Scrapable but fragile. No bulk download.
- **Use case**: Verify environmental compliance of listed quarries

### 4. QLD Open Data Portal (CKAN)
- **URL**: https://www.data.qld.gov.au/
- **API**: CKAN standard API
- **What it provides**: Various government datasets — search for "quarry", "extractive", "mining permit"
- **Use case**: May provide convenient pre-packaged snapshots

### Why no single live feed exists
Many quarries (especially smaller ones on freehold land) operate under local council development permits, not state mining leases. There is no centralised register of all quarries in Queensland. This structural gap means some manual curation will always be needed — which is Cut2Fill's competitive advantage.

---

## Major Projects (10 listed as of 2026-03-25)
- **Source**: Queensland Government project announcements, TMR project pages, Cross River Rail Delivery Authority, ARTC Inland Rail
- **Coverage**: Top 10 SEQ infrastructure projects in Brisbane 2032 Olympics pipeline
- **Update frequency**: Manual — project status, dates, and phases should be reviewed quarterly

---

## Data Quality Principles
1. **Accuracy over quantity** — only list verified, currently operating facilities
2. **Source attribution** — every data point should be traceable to a government or operator source
3. **Regular cross-checking** — diff curated data against TMR/GeoResGlobe/EA registers periodically
4. **Compliance-first** — prefer facilities with verifiable environmental and planning approvals
