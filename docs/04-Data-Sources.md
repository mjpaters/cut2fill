# Cut2Fill — SEQ Data Sources & Integration Strategy

**Version:** 1.1
**Date:** 7 April 2026 *(v1.0: 23 March 2026)*

---

## Integration Status Summary (April 2026)

| Source | Status | Notes |
|--------|--------|-------|
| Fire ant biosecurity zones | **Integrated** | Inline GeoJSON from QLD Government data, point-in-polygon checking |
| Quarries (TMR, GeoResGlobe, mining permits) | **Integrated** | 488 quarries manually verified, hardcoded in app.js |
| Landfills + transfer stations | **Integrated** | 54 facilities from QLD Waste Facilities + manual verification |
| Soil treatment / C&D recyclers / PFAS | **Integrated** | 12 facilities from EA Register + manual verification |
| Concrete suppliers | **Integrated** | 50 suppliers, manually compiled |
| Water fill points | **Integrated** | 83+ stations from council websites (QUU, Unitywater, GCCC, Logan, Redland) |
| LGA boundaries | **Integrated** | External GeoJSON file |
| Major projects | **Integrated** | 12 Brisbane 2032 / SEQ projects, manually compiled |
| Environmental Authorities Register | Planned | Full register requires geocoding (~1,000+ text addresses) |
| Mining permits (live ArcGIS) | Planned | ArcGIS REST API available but not yet queried live |
| Key Resource Areas | Planned | QLD Open Data SHP available |
| BCC transfer stations (live API) | Planned | BCC Open Data GeoJSON API available |

*Note: All currently integrated data is hardcoded inline in app.js or as static GeoJSON files. The backend has the schema to serve from PostGIS but the frontend does not yet fetch facilities from the API. Migration to API-served data is a soft launch priority.*

---

## 1. Data Source Inventory

### 1.1 Fire Ant Biosecurity Zones

| Field | Detail |
|-------|--------|
| **Source** | QLD Open Data Portal / Biosecurity Queensland |
| **URL** | https://www.data.qld.gov.au/dataset/fire-ant-biosecurity-zones-queensland |
| **Formats** | SHP, TAB, FGDB, KMZ, GPKG |
| **License** | CC-BY 4.0 |
| **Update frequency** | Monthly (non-regular schedule) |
| **Last updated** | 22 March 2026 |
| **Contains** | Zone 1 and Zone 2 polygon boundaries |
| **Live API** | ArcGIS REST: `https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Farming/Biosecurity/MapServer/65` |
| **Integration method** | Download GPKG for initial load; query ArcGIS REST for live updates. Convert to GeoJSON for Leaflet overlay. |
| **Priority** | CRITICAL — core compliance feature |

### 1.2 QLD Public Waste & Recycling Facilities

| Field | Detail |
|-------|--------|
| **Source** | QLD Department of Environment and Science |
| **URL** | https://www.data.qld.gov.au/dataset/public-waste-and-recycling-facilities-in-queensland |
| **Direct CSV** | https://data.des.qld.gov.au/__data/assets/file/0021/84351/waste-facilities.csv |
| **CKAN API** | `https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=620c726c-646a-4aef-999c-45f9e26cf7d2` |
| **Fields** | Name, Phone, Website, LGA, Address, Suburb, Postcode, Facility Type, **Latitude, Longitude** |
| **Facility types** | Landfills, transfer stations, metal recyclers, C&D recyclers, organic processors, battery recyclers, tyre recyclers, paint recyclers |
| **License** | CC-BY 4.0 |
| **Last updated** | October 2018 (STALE — needs supplementation) |
| **Integration method** | CKAN datastore API with filtering. Lat/lng available for direct map plotting. |
| **Priority** | HIGH — provides geocoded facility base layer |
| **Caveat** | Data is 7+ years old. Must cross-reference with EA register for currency. |

### 1.3 Environmental Authorities Register

| Field | Detail |
|-------|--------|
| **Source** | QLD Department of Environment and Science |
| **URL** | https://www.data.qld.gov.au/dataset/environmental-authorities |
| **Web search** | https://apps.des.qld.gov.au/public-register/search/ea.php |
| **Fields** | Permit Reference, Permit Type, Permit Holder, Effective Date, Status, Condition Type, Industry, Activities, **Locations (TEXT ONLY)** |
| **Formats** | XLSX, CSV, TSV, JSON, XML |
| **License** | CC-BY 4.0 |
| **Last updated** | 20 March 2026 (CURRENT) |
| **Integration method** | Download via CKAN API. Filter by ERA codes (16, 53, 54, 55, 56, 57, 60). **GEOCODE addresses** via Google/Mapbox API to obtain coordinates. |
| **Priority** | HIGH — authoritative facility register, but requires geocoding |
| **Key ERA filters** | ERA 16 (quarries), ERA 53 (composting), ERA 54 (waste reprocessing), ERA 55 (waste treatment), ERA 60 (landfill) |

### 1.4 Mining Permits (Quarries)

| Field | Detail |
|-------|--------|
| **Source** | QLD Department of Resources / Geological Survey |
| **ArcGIS REST** | `https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Economy/MinesPermitsCurrent/MapServer` |
| **Key layers** | Layer 38-46 (Mining Leases — granted and applications) |
| **Fields** | Permit number, holder, status, area, commodity, polygon geometry |
| **Format** | ArcGIS REST API — JSON/GeoJSON query |
| **Integration method** | Query by bounding box (SEQ extent) and commodity type (extractive materials). Returns polygon boundaries. |
| **Priority** | MEDIUM — quarries are important but less dynamic than waste facilities |
| **Example query** | `/MapServer/42/query?where=1=1&geometry={"xmin":151.5,"ymin":-28.5,"xmax":153.6,"ymax":-26.0}&geometryType=esriGeometryEnvelope&outFields=*&f=json` |

### 1.5 Key Resource Areas (KRA)

| Field | Detail |
|-------|--------|
| **Source** | QLD Department of Resources |
| **URL** | https://www.data.qld.gov.au/dataset/key-resource-areas-queensland-series |
| **Formats** | SHP (4 layers: Resource/Processing Areas, Haulage Corridors, Transport Routes, Separation Areas) |
| **ArcGIS REST** | `https://spatial-gis.information.qld.gov.au/arcgis/rest/services/GeoscientificInformation/MiningResources/MapServer` |
| **WMS** | `https://spatial-gis.information.qld.gov.au/arcgis/services/GeoscientificInformation/MiningResources/MapServer/WMSServer` |
| **Integration method** | Load SHP/GeoJSON as static overlay. KRA data changes infrequently. |
| **Priority** | LOW for MVP — useful for professional/government audience |

### 1.6 Brisbane City Council Transfer Stations

| Field | Detail |
|-------|--------|
| **Source** | Brisbane City Council Open Data |
| **URL** | https://data.brisbane.qld.gov.au/explore/dataset/waste-transfer-stations/information/ |
| **Formats** | CSV, JSON, Excel, **GeoJSON** |
| **Fields** | Name, Address, Opening hours, **Latitude, Longitude** |
| **Integration method** | Direct GeoJSON fetch. Small dataset (4 facilities). |
| **Priority** | LOW — already included in statewide waste facilities CSV |

### 1.7 Acid Sulfate Soil Mapping

| Field | Detail |
|-------|--------|
| **Source** | QLD Department of Environment and Science |
| **URL** | https://www.publications.qld.gov.au/dataset/acid-sulfate-soil-guidelines |
| **Spatial data** | Available via QSpatial (https://qldspatial.information.qld.gov.au/) — search "acid sulfate" |
| **Format** | Raster/vector layers showing ASS probability |
| **Integration method** | WMS overlay for visual reference. Not required for MVP but valuable for Phase 2. |
| **Priority** | LOW for MVP — tooltip guidance sufficient initially |

### 1.8 EMR/CLR Registers

| Field | Detail |
|-------|--------|
| **Source** | QLD Department of Environment and Science |
| **Search tool** | https://www.qld.gov.au/environment/management/environmental/contaminated-land/registers/search |
| **Format** | Web search only — no bulk download or API available |
| **Integration method** | Cannot integrate directly. Users must independently check EMR/CLR status. Platform provides link and guidance. |
| **Priority** | N/A for direct integration — provide guidance and links |

---

## 2. Integration Architecture

### 2.1 Data Pipeline (Phase 2 — Backend)

```
┌──────────────────────────────────────────────────────────────┐
│                    DATA SOURCES (External)                     │
├────────────┬────────────┬────────────┬────────────┬──────────┤
│ Fire Ant   │ Waste      │ EA         │ Mining     │ KRA      │
│ Zones      │ Facilities │ Register   │ Permits    │          │
│ (ArcGIS)   │ (CKAN CSV) │ (CKAN XLSX)│ (ArcGIS)   │ (SHP)    │
└─────┬──────┴─────┬──────┴─────┬──────┴─────┬──────┴────┬─────┘
      │            │            │            │           │
      ▼            ▼            ▼            ▼           ▼
┌─────────────────────────────────────────────────────────────┐
│              ETL / DATA PROCESSING LAYER                      │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌────────────┐  │
│  │ GeoJSON │  │ CSV      │  │ Geocoder  │  │ ArcGIS     │  │
│  │ Convert │  │ Parser   │  │ (Mapbox / │  │ REST Query │  │
│  │         │  │          │  │  Google)  │  │            │  │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘  └─────┬──────┘  │
│       │            │              │               │          │
│       ▼            ▼              ▼               ▼          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         PostgreSQL + PostGIS Database                 │   │
│  │  ┌──────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │ facilities   │  │ zones       │  │ listings   │  │   │
│  │  │ (points)     │  │ (polygons)  │  │ (user data)│  │   │
│  │  └──────────────┘  └─────────────┘  └────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    REST API (FastAPI/Node.js)                 │
│  GET /facilities?type=quarry&bounds=...                      │
│  GET /zones/fire-ant?point=lat,lng                           │
│  GET /listings?material=clean-fill&within=50km               │
│  POST /listings                                              │
│  GET /match/{listingId}                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Leaflet.js)                      │
│  Map layers: listings, facilities, zones, KRA                │
│  Filters: material, type, pricing, delivery, volume          │
│  Matching: spatial + material + date + zone-aware            │
│  Compliance: tooltips, badges, warnings, decision support    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 MVP Data Strategy (No Backend)

For the MVP (static frontend), data is embedded directly:

| Data | Method | Refresh Process |
|------|--------|----------------|
| Fire ant zones | Simplified polygon coordinates in app.js | Manual update from QLD Open Data monthly |
| Sample listings | JSON array in app.js | Manual — sample data only |
| Waste facilities | JSON array in app.js (curated SEQ subset) | Manual from CSV download |
| Material tooltips | Static object in app.js | Manual from regulatory review |

### 2.3 Phase 2 Data Refresh Schedule

| Dataset | Refresh | Method |
|---------|---------|--------|
| Fire ant zones | Monthly | Automated download from QLD Open Data; convert to GeoJSON; deploy |
| EA Register | Monthly | Automated CKAN download; diff against existing; geocode new entries |
| Waste facilities | Quarterly | Check for CSV updates; cross-reference EA register |
| Mining permits | Quarterly | ArcGIS REST query; update quarry layer |
| KRA | Annually | SHP download; unlikely to change frequently |
| User listings | Real-time | User-submitted via platform |

---

## 3. Known Facility Data (SEQ — For MVP)

### 3.1 Major Landfills

| Facility | Operator | Suburb | Lat | Lng | ERA |
|----------|----------|--------|-----|-----|-----|
| Nudgee Transfer Station | BCC | Nudgee | -27.3711 | 153.0871 | 60 |
| Swanbank Landfill | Remondis | Swanbank | -27.6833 | 152.8500 | 60 |
| Willawong Resource Recovery | Cleanaway | Willawong | -27.5889 | 152.9778 | 60 |
| Reedy Creek Refuse | GCCC | Reedy Creek | -28.1100 | 153.3900 | 60 |
| Caloundra Landfill | SCRC | Caloundra West | -26.7933 | 153.1253 | 60 |
| Ti-Tree Bioenergy | MBRC | Dakabin | -27.2280 | 152.9890 | 60 |
| Staplyton Landfill | Cleanaway | Staplyton | -27.7500 | 153.2700 | 60 |
| Riverview Recycling | Ipswich CC | Riverview | -27.6100 | 152.7800 | 60 |

### 3.2 Major Quarries / Extractive Sites

| Facility | Operator | Suburb | Lat | Lng | Material |
|----------|----------|--------|-----|-----|----------|
| Mt Coot-tha Quarry | Boral | Mt Coot-tha | -27.4850 | 152.9550 | Hard rock |
| Pine Rivers Quarry | Boral | Petrie | -27.2600 | 152.9800 | Hard rock |
| Ormeau Quarry | Hanson | Ormeau | -27.7700 | 153.2500 | Sand, gravel |
| Narangba Quarry | Boral | Narangba | -27.2000 | 152.9600 | Hard rock |
| Purga Quarry | Wagners | Purga | -27.6800 | 152.7200 | Hard rock |
| Wacol Quarry | Various | Wacol | -27.6000 | 152.9300 | Sand |
| Gold Coast Quarry | Boral | Reedy Creek | -28.1200 | 153.3600 | Hard rock |
| Caboolture Quarry | Boral | Caboolture | -27.0500 | 152.9200 | Hard rock |

### 3.3 Licensed Soil Treatment / Recycling

| Facility | Operator | Suburb | Lat | Lng | Capability |
|----------|----------|--------|-----|-----|-----------|
| Hi-Quality PFAS Treatment | HiQ Group | Yatala | -27.7300 | 153.2200 | PFAS soil treatment (350,000t/yr) |
| ResourceCo | ResourceCo | Hemmant | -27.4500 | 153.1200 | C&D waste, soil recycling |
| Rino Recycling | Rino | Pinkenba | -27.4200 | 153.1100 | Soil, sand, aggregate recycling |
| Barry's Recycling (Yatala) | Barry's | Yatala | -27.7400 | 153.2300 | Concrete, soil, aggregate |
| Barry's Recycling (Redland Bay) | Barry's | Redland Bay | -27.6300 | 153.3000 | Concrete, soil, aggregate |
| EnviroSoil Solutions | EnviroSoil | Wacol | -27.6400 | 152.9200 | Contaminated soil treatment |
| Boral Recycling | Boral | Various | Various | Various | VENM, CT-1 soils, clean fill |

---

## 4. API Endpoint Examples

### Fire Ant Zones (ArcGIS REST)

**Get all zone boundaries as GeoJSON:**
```
GET https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Farming/Biosecurity/MapServer/65/query?where=1%3D1&outFields=*&f=geojson
```

**Check if a point is in a fire ant zone:**
```
GET https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Farming/Biosecurity/MapServer/65/query?geometry=153.02,-27.47&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=*&f=json
```

### QLD Waste Facilities (CKAN Datastore)

**Get all SEQ facilities:**
```
GET https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=620c726c-646a-4aef-999c-45f9e26cf7d2&limit=500
```

**Filter by LGA:**
```
GET https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=620c726c-646a-4aef-999c-45f9e26cf7d2&filters={"LGA":"BRISBANE"}
```

### Environmental Authorities (CKAN Datastore)

**Search for ERA 60 (landfill) facilities:**
```
GET https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=<resource_id>&q=ERA%2060
```

### Mining Permits (ArcGIS REST)

**Query granted mining leases in SEQ bounding box:**
```
GET https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Economy/MinesPermitsCurrent/MapServer/42/query?where=1%3D1&geometry=%7B%22xmin%22%3A151.5%2C%22ymin%22%3A-28.5%2C%22xmax%22%3A153.6%2C%22ymax%22%3A-26.0%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&f=json
```
