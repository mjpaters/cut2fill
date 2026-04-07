# Cut2Fill — Marketing & Go-to-Market Plan

**Version:** 1.0
**Date:** 24 March 2026
**Purpose:** Get Cut2Fill into the market. Stress test demand. Build the network. Start generating data.

---

## 1. Positioning

### What Cut2Fill Is (One Sentence)

**Cut2Fill is a free platform that helps construction companies see what's around them — suppliers, facilities, material, compliance requirements — so they can make informed decisions instead of relying on phone calls and guesswork.**

### The Elevator Pitch (30 seconds)

"Every construction project in SEQ moves material. Right now, finding out where to source fill, which quarries are nearby, what the compliance requirements are, or where to dispose of spoil takes half a day of phone calls. Cut2Fill puts it all on one map — for free. Quarries, tips, treatment facilities, available material from other projects, fire ant zones, closest hospital, cost comparisons. The platform is free because we monetise the data — material flow insights that government and industry can't get anywhere else."

### The Circular Economy Angle

Cut2Fill is positioned as a **circular economy platform for construction**. Not a classifieds board. Not a marketplace. A decision-support tool that happens to divert material from landfill by making reuse the obvious, cheaper, easier choice.

The messaging always leads with: **"Make better decisions with better information."**

The sustainability and waste diversion outcomes are the consequence of good decisions, not the sales pitch. Construction people don't buy "sustainability" — they buy "save $1.2M on disposal costs." The sustainability story is for government, media, and tenders.

### Key Messages by Audience

| Audience | What They Care About | Cut2Fill Message |
|----------|---------------------|-----------------|
| **Site foreman / PM** | "Where do I send this material?" | "See every option within 50km in 30 seconds — free." |
| **Estimator** | "What does fill cost delivered to site?" | "Compare quarries, free material, and landfill side-by-side with real costs." |
| **Company director** | "How do I reduce project costs?" | "Your last project paid $1.2M in waste levy. This one doesn't have to." |
| **Council officer** | "Where is material going in our LGA?" | "Real-time visibility on material flows you can't get anywhere else." |
| **Government (DES/TMR)** | "How do we track circular economy progress?" | "Every exchange on the platform is a data point toward your targets." |
| **Quarry operator** | "How do I get more customers?" | "Every project manager in SEQ looking for material sees your quarry first." |
| **Media** | "What's the story?" | "571,000 tonnes of reusable material goes to landfill every year. One QLD company is building the tool to fix it." |

---

## 2. Market Stress Test — What We Need to Prove

Before scaling, we need to prove five things:

| # | Hypothesis | How We Test It | Success Signal |
|---|-----------|---------------|----------------|
| 1 | Construction professionals will use a free platform | Deploy MVP, share on LinkedIn, track signups/visits | 500 unique visitors in first 60 days |
| 2 | People will post real listings | Enable listing creation with persistence | 20 real listings in first 90 days |
| 3 | The facility map alone has standalone value | Track engagement with map features vs listing features | Users return to browse the map without posting |
| 4 | Suppliers will pay for enhanced profiles | Approach 10 quarries/facilities with the value proposition | 3 expressions of interest |
| 5 | Government sees data value | Present to 2 councils with mock data dashboard | 1 formal conversation about data licensing |

### Minimum Viable Launch Checklist

Before we go to market, we need:

- [x] **Backend deployed** — FastAPI on Render, Supabase auth, PostGIS *(done April 2026)*
- [x] **Real facility data** — 604 verified facilities from TMR, GeoResGlobe, mining permits, EA Register *(done March 2026)*
- [x] **Fire ant zones live** — Zone 1 + Zone 2 from QLD Government data *(done March 2026)*
- [x] **Domain live** — cut2fill.com.au on GitHub Pages with SSL *(done March 2026)*
- [ ] **Listing system live** — submit → review → appear on map *(see 05-Soft-Launch-Specification.md)*
- [ ] **5 seed listings** — real or realistic, from Archers Group network
- [ ] **Google Business Profile** — set up for Brisbane
- [ ] **LinkedIn company page** — branded, with 3 posts ready to go
- [ ] **3 SEO landing pages** — Brisbane, Gold Coast, Sunshine Coast/Ipswich

### Pre-Launch (Can Do Now)

- [x] **Platform live at cut2fill.com.au** — full landing page + map application *(done)*
- [ ] **Start founder LinkedIn posting** — 3-4x/week
- [ ] **Screen recording** — 60-second demo walkthrough for LinkedIn
- [ ] **Join CCF QLD** as a member
- [ ] **Join WMRR** as a member
- [ ] **Write first 3 blog posts** (see Content Plan below)
- [ ] **Build email waitlist** — "Get notified when Cut2Fill launches in your region"

---

## 3. Content Plan — Blog, Video, Education

### Content Strategy

Three content pillars, all serving the same goal: **establish Cut2Fill as the authority on construction material decisions in QLD.**

```
PILLAR 1: REGULATORY / COMPLIANCE EDUCATION
"Here's what you need to know to stay legal"
→ Builds trust, drives SEO traffic, demonstrates expertise

PILLAR 2: COST / ECONOMICS
"Here's what things actually cost and how to save"
→ Drives action, shows platform value, attracts estimators

PILLAR 3: CIRCULAR ECONOMY / SUSTAINABILITY
"Here's what the industry is doing and where it's going"
→ Attracts government, media, tenders, and forward-thinking companies
```

### Blog Posts (First 12 — Publish Schedule)

These are written for SEO and LinkedIn sharing. Each one educates, provides genuine value, and points to Cut2Fill as the tool that solves the problem discussed.

#### Month 1 — Launch Content

| # | Title | Pillar | Target Keywords | LinkedIn Hook |
|---|-------|--------|----------------|---------------|
| 1 | **QLD Waste Levy Guide for Construction: What You Need to Know in 2026** | Cost | "QLD waste levy construction", "cost of landfill disposal QLD" | "Your clean earth now costs $125/tonne to tip. Here's exactly what that means for your next project." |
| 2 | **Clean Fill vs Contaminated Fill: QLD Classification Guide** | Compliance | "clean fill vs contaminated fill QLD", "VENM disposal QLD" | "Do you know the difference between clean fill and contaminated fill under QLD law? The penalties for getting it wrong start at $16,692." |
| 3 | **Where to Find Fill Material in Brisbane — The Complete Guide** | Cost | "fill material Brisbane", "clean fill near me", "bulk fill SEQ" | "Stop making 15 phone calls to find fill. Here's every option in SEQ." |

#### Month 2 — Compliance Deep Dives

| # | Title | Pillar | Target Keywords | LinkedIn Hook |
|---|-------|--------|----------------|---------------|
| 4 | **Fire Ant Zones Explained: What Every QLD Contractor Needs to Know** | Compliance | "fire ant zones QLD", "fire ant compliance construction" | "$625,875. That's the corporate fine for moving soil across a fire ant zone without a permit. Do you know which zone your project is in?" |
| 5 | **How Much Does Spoil Disposal Actually Cost in QLD?** | Cost | "spoil disposal cost QLD", "how to dispose of excavation spoil" | "We broke down the true cost of disposing spoil in SEQ — levy, cartage, gate fees. The numbers will change how you price your next job." |
| 6 | **The 6 Regulations You Must Navigate for Every Material Movement in QLD** | Compliance | "material movement regulations QLD", "EP Act earthworks" | "Six separate regulatory frameworks. Overlapping requirements. Fines up to $750,690. Here's the decision matrix that keeps you compliant." |

#### Month 3 — Circular Economy & Industry

| # | Title | Pillar | Target Keywords | LinkedIn Hook |
|---|-------|--------|----------------|---------------|
| 7 | **571,000 Tonnes: QLD's Reusable Material Going to Landfill Every Year** | Sustainability | "construction waste QLD", "circular economy construction" | "571,000 tonnes of material that could be reused on another project goes to landfill in QLD every year. That's $65M in waste levy burned." |
| 8 | **SEQ Quarry Guide: Products, Locations, and What to Expect** | Cost | "quarries Brisbane", "quarry suppliers SEQ" | "We mapped every quarry in SEQ with products, distances, and estimated delivered costs. Here's what we found." |
| 9 | **How to Win Government Tenders with Material Reuse** | Sustainability | "sustainability tender construction", "circular economy tender QLD" | "QLD Government procurement now scores sustainability. Here's how material reuse wins you points — and how to prove it." |

#### Month 4 — Case Studies & Depth

| # | Title | Pillar | Target Keywords | LinkedIn Hook |
|---|-------|--------|----------------|---------------|
| 10 | **Case Study: How One Project Saved $1.2M by Reusing Fill Instead of Landfilling** | Cost | "construction cost savings QLD", "material reuse case study" | "Same material. Same project. Two options: $1.35M to landfill, or $150K to reuse. The difference was knowing who needed fill 12km away." |
| 11 | **Acid Sulfate Soil in SEQ: When Do You Need an ASSMP?** | Compliance | "acid sulfate soil QLD", "ASSMP requirements" | "If you're excavating below 5m AHD in SEQ, you probably need an Acid Sulfate Soil Management Plan. Here's when, why, and how." |
| 12 | **COVID Taught Us Construction Supply Chains Are Fragile. Here's How to Fix That.** | Sustainability | "construction supply chain resilience", "material availability" | "During COVID, you couldn't get concrete. You couldn't get reo. You couldn't get sand. The problem wasn't supply — it was visibility." |

### Video Content

| Type | Format | Frequency | Platform |
|------|--------|-----------|----------|
| **Platform demo walkthrough** | 60-90 sec screen recording | Once (re-record when platform updates) | LinkedIn, YouTube |
| **"Did You Know?" regulatory clips** | 30-60 sec, text overlay on site footage | 2x/month | LinkedIn, Instagram Reels |
| **Waste levy explainer** | 2-3 min animation or talking head | Once | LinkedIn, YouTube, embed in blog |
| **Quarry/facility profiles** | 2-3 min site visit video | Monthly (when relationships develop) | LinkedIn, YouTube |
| **Founder story** | 3-5 min talking head / site background | Once | LinkedIn |
| **Customer testimonials** | 60-90 sec interview | When available | LinkedIn, website |

### Educational Series: "Know Your Options"

A recurring content series (blog + LinkedIn + eventually video) that walks through specific scenarios:

1. "Know Your Options: 10,000m3 of Clean Fill — Tip It, Reuse It, or Treat It?"
2. "Know Your Options: Your Project Crosses a Fire Ant Zone Boundary"
3. "Know Your Options: You've Hit Acid Sulfate Soil at 3m Below Surface"
4. "Know Your Options: You Need 20,000m3 of Structural Fill for Lot Pads"
5. "Know Your Options: Contaminated Soil Detected on Site"
6. "Know Your Options: Concrete Washout — Where Can You Legally Dump It?"

Each post presents the scenario, walks through the options with real costs and compliance requirements, and ends with "Cut2Fill shows you all of these options on one map."

---

## 4. LinkedIn Strategy

### Account Setup

**Company page:** Cut2Fill — "Free construction decision-support platform. See what's around you."

**Founder personal account (Matthew Patterson):** This is the primary channel. Construction LinkedIn is personal-brand-driven. The company page amplifies, but Matt's posts drive engagement.

### Posting Cadence

| Day | Post Type | Example |
|-----|-----------|---------|
| **Monday** | Industry insight / data point | "QLD's waste levy hits $125/tonne this financial year. Here's what that means for a typical subdivision..." |
| **Tuesday** | Educational / compliance | "Did you know there are 6 separate regulatory frameworks for moving soil in QLD? Here's the cheat sheet..." |
| **Wednesday** | Platform update / demo | Screenshot or video of the platform. "We just mapped every quarry in SEQ. Here's what it looks like." |
| **Thursday** | Story / opinion / discussion | "During COVID we couldn't get materials. The problem wasn't supply — it was visibility. Here's what we're building to fix that." |
| **Friday** | (Optional) Industry news / share | Share a relevant article with commentary. |

### Hashtag Strategy

Use 3-5 per post, mix of:
- **Broad:** #Construction #CivilEngineering #Infrastructure
- **Mid-tier:** #CircularEconomy #ConstructionTech #QLDConstruction #Earthworks
- **Niche:** #WasteLevy #MaterialReuse #SEQInfrastructure #Cut2Fill

### Engagement Strategy

Before posting your own content, spend 2-3 weeks engaging on other people's posts:
- Comment meaningfully on posts from CCF QLD, BMD Group, Seymour Whyte, Fulton Hogan project managers
- Engage with TMR infrastructure updates
- Comment on QMCA pipeline reports
- Build presence so your first posts aren't from a cold account

### Content That Works in Construction LinkedIn

| Format | Engagement Level | Notes |
|--------|-----------------|-------|
| Drone footage / site photos | Very high | Show real construction, not stock photos |
| Data-driven posts with one surprising stat | High | "$625,875 fine for..." stops the scroll |
| Carousel / document posts (step-by-step) | High | "5 things you need to know about..." |
| Short video (<90 sec) | High | LinkedIn algorithm favours native video |
| Personal stories from site | High | Authenticity wins in construction |
| Screenshot of platform | Medium-high | Shows progress, invites feedback |
| Polls | Medium | "Where does your surplus fill usually end up?" |
| External link shares | Low | LinkedIn suppresses posts with outbound links — put link in comments |

### LinkedIn Milestones

| Milestone | Target |
|-----------|--------|
| First 100 connections (construction professionals) | Month 1 |
| First post with 50+ reactions | Month 1-2 |
| First inbound DM asking about the platform | Month 1-2 |
| 500 company page followers | Month 3 |
| First post shared by an industry figure | Month 2-3 |
| First media enquiry from LinkedIn visibility | Month 3-6 |

---

## 5. Industry Associations & Events

### Priority Memberships

| Association | Why | Cost (approx) | Action |
|------------|-----|---------------|--------|
| **CCF QLD** | Their members ARE our users — civil contractors, earthmovers | $500-2,000/yr | Join immediately. Attend networking events. Offer to present on waste levy / material reuse. |
| **WMRR** | Circular economy / waste industry. Credibility for sustainability positioning. | $500-1,500/yr | Join. Connects us to facility operators, government waste policy people. |
| **IQA** (Institute of Quarrying Australia) | Quarry operators are our first supplier revenue stream. | $300-800/yr | Join. Direct access to quarry operations managers. |

### Secondary Memberships (Phase 2)

| Association | Why | When |
|------------|-----|------|
| CCIQ | Business credibility, government introductions | When approaching government formally |
| Engineers Australia QLD | Reach civil/structural engineers who specify materials | When spec-matching features launch |
| IPWEAQ | Council engineers and works managers — critical for government data sales | Before approaching councils |
| CIA (Concrete Institute) | When concrete trade module launches | Phase 3 |

### Events to Attend (2026)

| Event | When | Action | Budget |
|-------|------|--------|--------|
| **CCF QLD networking events** | Monthly, Brisbane | Attend every one. Hand out cards. Talk to people. | $0-50 per event |
| **CCF QLD Earth Awards** | Q1-Q2 2026 | Attend. Sponsor if possible ($2-5K gets logo on materials + table). | $2-5K |
| **LGAQ Annual Conference** | Oct 2026 (usually regional) | **Critical for councils.** Book early. All QLD councils attend. | $1-2K registration + travel |
| **IPWEAQ QLD Conference** | Check dates | Present on material flow data for councils. | $500-1K |
| **TMR Industry Briefings** | Periodic, watch TMR website | Attend every one. Network. Learn the pipeline. | Free |
| **Waste Conference (WMRR)** | Check if QLD 2026 | Attend. Strong circular economy audience. | $1-2K |
| **IQA QLD Conference** | Q3 2026 | Present on quarry visibility / digital supplier profiles. | $500-1K |
| **FWD Festival** (Advance QLD) | 7-9 May 2026, Sunshine Coast | Innovation event. Apply for delegate ticket via [Innovation Event Delegations](https://advance.qld.gov.au/innovation-event-delegations). Travel at own cost. | $0 (ticket) + travel |
| **Tropical Innovation Festival** (Advance QLD) | 23-27 June 2026, Cairns | Innovation networking. Apply for delegate ticket. | $0 (ticket) + travel |

### Presenting / Speaking

Offer free presentations on topics the associations' members care about:

| Topic | Audience | Association |
|-------|----------|-------------|
| "The True Cost of QLD's Waste Levy on Earthworks" | Civil contractors | CCF QLD |
| "Fire Ant Compliance for Material Movements — What You Need to Know" | Civil contractors, site managers | CCF QLD, MBA QLD |
| "Circular Economy in Construction: Where's the Money?" | Waste / sustainability professionals | WMRR |
| "Digital Tools for Material Flow Tracking" | Council engineers | IPWEAQ |
| "Making Your Quarry Visible to Every Project Manager in SEQ" | Quarry operators | IQA |

These aren't sales pitches — they're genuine educational sessions that position Cut2Fill as the expert. The platform mention comes at the end: "By the way, we built a tool that does all of this. It's free."

---

## 6. Media & PR

### Earned Media Strategy

Construction trade media is hungry for Australian data and case studies. Cut2Fill has a strong story: local company, real industry problem, data-backed, circular economy angle, Olympic connection.

### Target Publications

| Publication | Angle | Approach |
|-------------|-------|----------|
| **Roads & Infrastructure Magazine** | Material reuse on road projects, waste levy impact, quarry comparison tool | Contributed article (800-1,200 words, free if non-promotional) |
| **Inside Construction** | Construction tech innovation from QLD, platform launch story | Press release + founder interview pitch |
| **Quarry Magazine** | How quarries benefit from digital visibility, material reuse from construction sites | Contributed article on quarry-contractor relationships |
| **Waste Management Review** | Circular economy platform, C&D waste diversion data, EOW code advocacy | Feature story pitch — strong alignment with their readers |
| **Infrastructure Magazine** | Brisbane 2032 sustainability, material tracking for major projects | Thought leadership piece on infrastructure sustainability |
| **The Urban Developer** | SEQ development pipeline, material costs for developers | Data-driven piece on fill costs across SEQ |
| **Courier Mail / Brisbane Times** | General interest: local startup tackling construction waste | Launch story, $65M/year waste angle |

### PR Timeline

| When | Action |
|------|--------|
| **Pre-launch (now)** | Pitch contributed articles to Roads & Infrastructure and Waste Management Review. Topic: waste levy impact on earthworks. No platform mention needed — just establish expertise. |
| **Launch week** | Press release to Inside Construction, Infrastructure Magazine, The Urban Developer. Story: "QLD startup launches free platform to tackle $65M construction waste problem." |
| **Month 2-3** | Pitch Quarry Magazine article on digital visibility for quarries. Pitch Inside Construction founder interview. |
| **Month 4-6** | Pitch Courier Mail / Brisbane Times if platform has real traction data (users, listings, material diverted). |
| **Ongoing** | Quarterly data releases: "X tonnes diverted, $Y saved" — media loves data milestones. |

### Podcast Appearances

| Podcast | Pitch Angle |
|---------|------------|
| Inside Construction Podcast | "We mapped every quarry and tip in SEQ. Here's what we found about construction material waste." |
| The Site Shed | "How small contractors can save on material costs with better information" |
| Circular Economy Podcast | "Building Australia's construction material exchange — lessons from the ground" |

---

## 7. Government Engagement

### Strategy: Prove Value, Then Sell Data

Don't lead with "buy our data." Lead with "here's a tool your ratepayers can use for free — and here's the insight it generates."

### Council Engagement Plan

**Target councils (start with 2):**

| Council | Why | Contact Path |
|---------|-----|-------------|
| **Logan City Council** | Progressive on waste/sustainability, strong residential growth generating earthworks, manageable size | Archers Group network, CCF QLD connections |
| **Ipswich City Council** | Massive growth corridor (Springfield, Ripley), huge earthworks volumes, waste management focus | Direct approach to Director of Infrastructure |
| **Moreton Bay Regional Council** | Caboolture West growth area, large civil works program | IPWEAQ connections |

**Engagement sequence:**
1. **Month 1-2:** Informal intro meeting — show the demo, explain the concept, ask what data they'd find useful
2. **Month 3-4:** Follow up with a mock data dashboard for their LGA using platform data (even if limited)
3. **Month 5-6:** Formal presentation to Director/GM level — "here's what we can provide, here's what it would cost"
4. **Month 6-12:** Pilot agreement — reduced rate or free trial of data dashboard in exchange for endorsement

### State Government Engagement

| Agency | Why | Approach |
|--------|-----|---------|
| **DES** (Dept of Environment & Science) | Waste strategy, waste levy policy, EOW codes, circular economy targets | Approach via circular economy team. Position Cut2Fill as evidence-base for EOW code development. |
| **TMR** (Transport & Main Roads) | Largest single generator/consumer of earthworks material in QLD | Approach via innovation team. Offer pilot on a road project for material tracking. |
| **BQCC** (Biosecurity QLD) | Fire ant zone compliance | Approach with platform demo showing zone integration. Offer to promote compliance awareness. |
| **QRA** (QLD Reconstruction Authority) | Disaster recovery earthworks, flood levee material sourcing | Approach with "material availability for emergency response" angle. |

### Government Funding Alignment

| Program | Potential | Status |
|---------|----------|--------|
| **CSIRO Kick-Start** | $50K matched ($100K total) | Application pending |
| **QLD Recycling Modernisation Fund (QRMF)** | Varies — successor to RRIDP (now closed) | [QLD State Development](https://www.statedevelopment.qld.gov.au/industry/critical-industry-support/resource-recovery) |
| **Advance Queensland** | Innovation grants, varies | Research current programs |
| **Local Buy Panel** | Not a grant — procurement pathway for all QLD councils to buy from us | Apply when data product is ready |

---

## 8. SEO & Website Strategy

### Domain: cut2fill.com.au

### Site Structure

```
cut2fill.com.au
├── / (home — map, platform access)
├── /about
├── /blog
│   ├── /qld-waste-levy-guide-2026
│   ├── /clean-fill-vs-contaminated-fill-qld
│   ├── /fill-material-brisbane
│   ├── /fire-ant-zones-explained
│   ├── /spoil-disposal-cost-qld
│   └── [more posts per content plan]
├── /suppliers (for quarries/facilities — "list your business")
├── /brisbane (location page)
├── /gold-coast (location page)
├── /sunshine-coast (location page)
├── /ipswich-logan (location page)
├── /toowoomba (location page)
├── /townsville (location page — Phase 2)
└── /contact
```

### Location Pages

Each location page is a standalone landing page optimised for local search:

**Example: cut2fill.com.au/brisbane**
- "Find Fill Material in Brisbane"
- Map showing all quarries, tips, treatment facilities in Brisbane region
- List of nearby facilities with distances
- Current fire ant zone status
- Link to platform with Brisbane pre-filtered
- Blog posts relevant to Brisbane construction

Target keywords: "fill material Brisbane", "clean fill Brisbane", "quarries Brisbane", "spoil disposal Brisbane"

### SEO Priority Keywords

| Priority | Keywords | Content Type |
|----------|----------|-------------|
| **Highest** | "fill material Brisbane/Gold Coast/SEQ", "clean fill near me", "spoil disposal QLD" | Location pages + blog |
| **High** | "QLD waste levy construction", "cost of landfill QLD", "fire ant zones QLD" | Blog posts |
| **Medium** | "quarries Brisbane", "construction material suppliers SEQ" | Location pages + facility data |
| **Long-tail** | "MRTS05 Type 2.1 fill QLD", "acid sulfate soil management plan QLD", "contaminated soil disposal regulations QLD" | Deep blog posts |

### Technical SEO

- [ ] Google Business Profile — Brisbane, verified
- [ ] Google Search Console — submit sitemap
- [ ] Meta descriptions on all pages
- [ ] Schema markup for local business
- [ ] Fast page load (static site helps here)
- [ ] Mobile-optimised (construction people are on phones)
- [ ] Backlinks from CCF QLD, WMRR, industry directories

---

## 9. Supplier Acquisition Strategy

### First 10 Quarries / Facilities

We need paying suppliers to validate revenue. Target the 10 most prominent facilities in SEQ:

| Facility | Type | Why |
|----------|------|-----|
| Boral Purga | Quarry | Large operation, well-known, Ipswich corridor |
| Karreman Quarries | Quarry | Multiple SEQ sites, family-owned, may be more responsive |
| Wagners | Quarry + concrete | Major QLD player, innovation-minded |
| Hi-Quality Group (Yatala) | Treatment / recycling | Only PFAS treatment facility in QLD, unique |
| ResourceCo | Treatment / recycling | Multi-site, sustainability-focused |
| Cleanaway | Waste management | National, multiple SEQ tips |
| **Remondis** | Waste management | Operates Swanbank, major facility. **Warm lead — BDM expressed interest April 2026. Follow up with info pack.** |
| Alex Fraser | C&D recycling | Growing presence in SEQ |
| Boral Recycling | C&D recycling | Brand recognition |
| Barry's Recycling | Recycling | Local SEQ operator, multiple sites |

### Approach

1. **Cold approach via LinkedIn** — connect with operations manager, reference platform
2. **Show them their listing on the map** — "Your facility is already on Cut2Fill. Here's what users see."
3. **Demo the enhanced profile** — "For $300/month, you get automated quote requests, analytics, and a verified badge."
4. **The pitch:** "Every project manager in SEQ looking for material or disposal sees your facility. We push their requirements to you automatically. You respond with pricing. No phone tag, no missed opportunities."

### Value Proposition for Suppliers

| What They Get | Value |
|---------------|-------|
| Permanent map listing (basic — free) | Visibility to every platform user |
| Enhanced profile with products, specs, pricing | Differentiation from competitors |
| Automated quote requests | Demand signals pushed directly — no waiting for the phone |
| Analytics (views, quote requests, win rate) | Data on their market position |
| Verified badge | Trust signal for users |

---

## 10. Budget & Timeline

### Phase 1: Pre-Launch (Now — Month 2)

| Item | Cost | Notes |
|------|------|-------|
| CCF QLD membership | $500-2,000 | Join immediately |
| WMRR membership | $500-1,500 | Join immediately |
| LinkedIn content creation | $0 (time only) | Matt posts 3-4x/week |
| Demo deployment (Netlify) | $0 | Free tier |
| Blog writing (3 posts) | $0 (internal) or $500-1,500 (outsource) | SEO-focused articles |
| Domain/SSL (already acquired) | $0 | cut2fill.com.au |
| **Phase 1 Total** | **$1,000-5,000** | |

### Phase 2: Launch (Month 3-6)

| Item | Cost | Notes |
|------|------|-------|
| Backend development + deployment | $5,000-15,000 | Internal or contracted |
| CCF QLD Earth Awards sponsorship | $2,000-5,000 | Table + logo |
| CCF QLD networking events (attendance) | $0-500 | Regular attendance |
| Blog writing (6 more posts) | $0-3,000 | Ongoing content |
| Google Business Profile + local SEO setup | $0 | DIY |
| Contributed articles to trade pubs | $0 | Time only — publications accept free |
| Screen recording / demo video | $0-500 | DIY or basic production |
| **Phase 2 Total** | **$7,000-24,000** | |

### Phase 3: Traction (Month 6-12)

| Item | Cost | Notes |
|------|------|-------|
| LGAQ Conference registration + travel | $1,500-3,000 | Non-negotiable — every council in QLD |
| IPWEAQ Conference | $500-1,000 | Council engineers |
| IQA Conference | $500-1,000 | Quarry operators |
| Ongoing blog/content | $0-3,000 | Monthly posts |
| PR — press release distribution | $500-1,000 | Launch and milestone announcements |
| Podcast guest appearances | $0 | Pitch to hosts |
| Supplier outreach (travel/meetings) | $500-2,000 | Visit quarries, demo in person |
| WMRR / Waste Conference | $1,000-2,000 | Attendance + networking |
| Google Ads (test) | $1,000-3,000 | Test keywords: "fill material Brisbane", "spoil disposal QLD" |
| **Phase 3 Total** | **$5,500-16,000** | |

### Total Year 1 Marketing Budget: $13,500 - $45,000

This is conservative and heavily weighted toward relationship-building (events, associations) over paid advertising. Construction is a relationship industry. The platform sells itself once people see it — the marketing job is getting it in front of the right people.

---

## 11. Success Metrics

### Month 3 (Launch)

| Metric | Target |
|--------|--------|
| Website unique visitors | 500 |
| Registered users | 50 |
| Real listings posted | 10 |
| LinkedIn followers (company) | 200 |
| LinkedIn post with 50+ reactions | At least 1 |
| Blog posts published | 3 |
| Association memberships active | 2 (CCF QLD, WMRR) |

### Month 6

| Metric | Target |
|--------|--------|
| Website unique visitors (cumulative) | 3,000 |
| Registered users | 200 |
| Real listings posted | 50 |
| First material exchange facilitated | 1 |
| Supplier conversations (quarries/facilities) | 10 |
| Paying suppliers | 2-3 |
| Council conversations | 2 |
| Media coverage | 1 trade publication |

### Month 12

| Metric | Target |
|--------|--------|
| Registered users | 500 |
| Active listings | 100+ |
| Material exchanges facilitated | 20+ |
| Cubic metres exchanged | 50,000+ |
| Paying suppliers | 10+ |
| Monthly data points collected | 5,000+ |
| Revenue (supplier subscriptions + reports) | $3,000-5,000/month |
| Council pilot agreements | 1-2 |
| Trade publication features | 3+ |

---

## 12. Competitive Positioning — What We Say About Competitors

### If asked about Fillsites / Fill Wanted (Australian competitors):

"They're listing boards — like putting a card up at the hardware store. Cut2Fill is a decision-support platform with real data. We show compliance requirements, cost comparisons, fire ant zones, quarry alternatives, and sustainability impact. The listing is just the starting point."

### If asked about Soil Connect (USA):

"Soil Connect is doing great work in the US — they've proven the market exists. We're building something different for Australia. QLD has unique compliance requirements — fire ant biosecurity zones, specific waste levy structures, contaminated land registers — that a US platform can't address. And our model is different: the platform is free. We monetise the data, not the users."

### If asked "why would anyone use this?":

"Because the alternative is making 15 phone calls to find out what quarries are nearby, what they charge, whether the material meets spec, whether you're crossing a fire ant zone, and whether you need a permit. Cut2Fill shows you all of that in 30 seconds. For free."

---

## 13. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Nobody posts listings (cold start) | Facility map provides standalone value. Seed with Archers Group network listings. Major project sites layer provides content without user listings. |
| Suppliers won't pay | Start free, demonstrate traffic/leads, then convert. If 500 users are viewing their facility monthly, $300/mo is obvious ROI. |
| Government moves slowly | Don't depend on government revenue early. Supplier subscriptions and project reports are the near-term revenue. Government is Year 2-3. |
| Low LinkedIn engagement | Consistency over 6 months. Engage on others' posts first. Use data-driven hooks (dollar figures, penalties) that stop the scroll. |
| Platform bugs / downtime | Launch quietly to a small group first. Fix issues before broad promotion. |
| Competitor launches in Australia | First-mover advantage + regulatory intelligence moat. No competitor can build the QLD compliance layer quickly. |

---

*This plan is a living document. Update targets and tactics as market feedback comes in. The first 90 days will tell us more than 90 days of planning.*
