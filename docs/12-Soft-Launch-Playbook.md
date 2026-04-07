# Cut2Fill — Soft Launch Playbook

**Version:** 1.0
**Date:** 7 April 2026
**Purpose:** Tactical guide for rolling Cut2Fill out to the first 10-20 industry contacts. How to approach people, what to show, how to protect IP, and how to convert interest into platform engagement.

---

## 1. What We're Trying to Prove

Before scaling, we need answers to five questions:

| # | Question | How We Test It | Success Signal |
|---|----------|---------------|----------------|
| 1 | Do industry professionals find the facility map useful on its own? | Show it to 10 contacts, track whether they bookmark/return | 3+ return unprompted within 2 weeks |
| 2 | Will people submit listings for available/wanted fill? | Enable listing system, seed with 2-3 Archers network listings | 5 organic listings within 60 days |
| 3 | Do suppliers see value in being on the platform? | Approach 5 facilities (starting with Remondis), gauge interest | 2 expressions of interest in enhanced profiles |
| 4 | Does the compliance/zone layer resonate? | Ask contacts: "Would zone crossing alerts change how you plan movements?" | Qualitative — look for "yes, that would save me time" |
| 5 | Is anyone willing to pay? | After 90 days, approach active users about premium features | 1 paid commitment or strong verbal |

---

## 2. Who to Approach First

### Tier 1: Trusted Network (Weeks 1-4)

People who will give honest feedback and won't copy the idea.

| Contact | Type | Approach | What They Test |
|---------|------|----------|----------------|
| Archers Group subcontractors | Earthworks / civil | Direct call + link | "Is this useful for finding fill?" |
| Archers Group clients | Developers / builders | Direct call + link | "Would you use this for sourcing?" |
| Trusted trucking company contacts | Haulage | Direct call + link | "Does this change how you'd source fill?" |
| 2-3 quarry operators (personal contacts) | Suppliers | In-person demo | "Would you want to manage your listing?" |

### Tier 2: Warm Leads (Weeks 4-8)

People who've expressed interest or are reachable via introduction.

| Contact | Type | Approach | What They Test |
|---------|------|----------|----------------|
| **Remondis** (BDM contact, April 2026) | Waste management | Send info pack, follow with demo meeting | Supplier engagement, facility claim interest |
| CCF QLD members (via networking events) | Civil contractors | Demo at event, follow up | Broader industry interest |
| Council waste/engineering officers (Logan, Ipswich) | Government | Formal intro meeting | Government data interest |

### Tier 3: Cold Outreach (Weeks 8-12)

Only after Tier 1-2 feedback is incorporated.

| Channel | Approach |
|---------|----------|
| LinkedIn (founder posts) | Platform demos, waste levy content, invite to explore |
| Trade publications | Contributed articles (see 10-Marketing-Plan.md) |
| Industry events | FWD Festival (7-9 May), CCF QLD events |

---

## 3. What to Show (and What Not To)

### The Demo Sequence

For any meeting or demo, follow this order:

**1. Start with the landing page (30 seconds)**
- "This is Cut2Fill. Free platform for the construction earthworks industry."
- Let the landing page do the talking — problem cards, features, "who it's for"

**2. Open the map (2 minutes)**
- Zoom to their area. "Here's every quarry, tip, and treatment facility near your operations."
- Click a facility near them. Show the detail panel.
- Toggle fire ant zones on. "See if your site is in a restricted zone."
- Use the address search to find their office/yard. "Here's what's within 20km of you."

**3. Show the logistics calculator (1 minute)**
- Click a facility, enter their typical volume. "This is what it costs to move 500 tonnes from here to there — fuel, trips, CO2."

**4. Show a listing (1 minute)**
- "This is where it gets interesting. Someone has 2,000m3 of select fill available 8km from your current project. You didn't know it existed until now."
- (For soft launch, we need 2-3 seed listings to demonstrate this.)

**5. Ask the question**
- "If this existed six months ago, would it have changed any decisions on your last project?"
- Then shut up and listen.

### What NOT to show or discuss

| Don't Show | Why |
|-----------|-----|
| Admin panel | Internal tooling, not relevant to the user |
| Backend architecture | Nobody cares about FastAPI vs Node |
| The matching algorithm (not built yet) | Don't promise features that don't exist |
| Revenue model details | They don't need to know how we make money yet |
| Detailed roadmap | Gives away strategic direction |

---

## 4. Protecting the Idea

### What's defensible

- **The data**: 604 manually verified facilities with coordinates and metadata. This took weeks and can't be scraped or replicated quickly.
- **The compliance layer**: Fire ant zone integration, material classification tooltips, regulatory guidance. Domain expertise baked into the product.
- **The network**: Once users are posting listings and facilities are managing profiles, the network effect is the moat.
- **First-mover in QLD**: Nobody else is building this for Queensland. Being first and building relationships with government is a significant advantage.

### What's NOT defensible

- **The concept**: "Material exchange platform" is not protectable. Soil Connect exists in the US, Earth Exchange in the UK. The idea itself is public.
- **The code**: Vanilla JS frontend is viewable in browser dev tools. But the code isn't the value — the data and network are.

### Practical IP protection for meetings

1. **Don't share the business plan.** Share the platform itself.
2. **Don't discuss revenue model details.** "The platform is free for users" is all anyone needs to know.
3. **Don't share the roadmap.** Talk about what's live, not what's coming.
4. **Do share the platform link freely.** The more people using it, the stronger the network. You can't build a network by hiding it.
5. **Do get feedback in writing.** After meetings, send a follow-up email summarising what they said. Creates a paper trail and validates demand.

### If someone asks "What stops me from building this?"

"Nothing. But we've already verified 604 facilities, integrated fire ant compliance data, built the backend, and we're six months ahead. The question isn't whether someone could build it — it's whether you want to wait for them to, or start using this now."

---

## 5. The Info Pack (for sending to warm leads like Remondis)

A one-page PDF or email that covers:

**Subject line:** "Cut2Fill — free platform for SEQ construction earthworks"

**Body:**
1. One sentence: what it is
2. Screenshot of the map zoomed to their area with their facility visible
3. Three bullet points: what it does for them specifically
4. Link to the platform
5. "Happy to walk you through it — 15 minutes over Teams or in person"

**Do NOT include:**
- Business plan or financial details
- Technical architecture
- Revenue model
- Anything that reads like a pitch deck

The goal is to get a meeting, not to sell. The platform sells itself once they see it.

---

## 6. Advance Queensland Opportunities

### Innovation Event Delegations

Free delegate/exhibitor tickets to QLD innovation events. Apply per event.

| Event | Date | Location | Fit |
|-------|------|----------|-----|
| **FWD Festival** | 7-9 May 2026 | Sunshine Coast | Good — local, general innovation audience. Validate messaging outside construction bubble. |
| **Tropical Innovation Festival** | 23-27 June 2026 | Cairns | Moderate — more distant, broader innovation audience. |

**Eligibility:** QLD-headquartered, <100 FTE, one application per ABN per event.
**Apply:** [advance.qld.gov.au/innovation-event-delegations](https://advance.qld.gov.au/innovation-event-delegations)
**Note:** They provide tickets only. Travel/accommodation at own cost.

### Ignite Ideas Fund

Up to $100,000 (Tier 1) for commercialisation of innovative products at MVP stage or beyond.
**Apply:** [advance.qld.gov.au/grants-and-programs/ignite-ideas-fund](https://advance.qld.gov.au/grants-and-programs/ignite-ideas-fund)
**Timing:** Investigate Q3 2026 round.

---

## 7. Government Engagement Strategy

### Why the government should care about Cut2Fill

The waste levy is explicitly a **behavioural incentive** — the government's stated purpose is to drive diversion, not generate revenue. 70% of levy revenue (~$300M/year) is committed to reinvestment in waste and resource recovery programs. Cut2Fill is directly aligned with this purpose: every material match that diverts fill from landfill is a measurable outcome the government is paying hundreds of millions to achieve.

### Key arguments for government engagement

1. **"We're a diversion mechanism."** The levy creates the stick. Cut2Fill provides the carrot — a free tool that makes reuse easier than disposal. The government doesn't have to build this; they just have to endorse it.
2. **Precedent exists.** QLD Government invested $2.4M in Recycle Mate (private digital waste platform). ASPIRE (CSIRO material exchange) adopted by 5+ SEQ councils. Cut2Fill is a more targeted, construction-specific version.
3. **C&D targets already exceeded — new targets are coming.** The current 75% diversion target is already at 83.3%. The new 2025-2030 strategy being developed now will set more ambitious targets. Cut2Fill is a tool to reach them.
4. **Road safety co-benefit.** Heavy vehicles are involved in ~15% of QLD road fatalities despite being 2% of vehicles. Every local material match reduces truck-kms. TMR co-funds CLOCS-A construction logistics safety. This gives TMR a reason to care, not just DES.
5. **Data the government can't get anywhere else.** Material flow data across SEQ — where material originates, where it goes, volumes, types, seasonal patterns. No government system currently tracks this.

### Active funding programs to target

| Program | Amount | Action |
|---------|--------|--------|
| **Circular Economy Investment Program** | $250K-$750K | High priority — apply immediately. Funds circular economy business model transitions. |
| **Recycling and Jobs Fund — Industry Dev** | Up to $10M | EOI open. Larger, more competitive, but Cut2Fill's digital platform fits the "technology and innovation" category. |
| CSIRO Kick-Start | Up to $50K matched | Standard pathway. Apply Q2 2026. |
| Advance QLD — Ignite Ideas | Up to $100K | Q3 2026 round. |

### Future advocacy: Levy credit scheme

There is currently no mechanism for contractors to claim levy credits for demonstrating diversion. Cut2Fill could propose filling this gap:
- Contractor uses Cut2Fill to source fill instead of landfilling
- Platform generates auditable proof of diversion (material type, volume, origin, destination)
- Contractor claims credit against waste levy exposure
- Government gets verified diversion data without building anything

This requires policy change. Position it as a submission to the new 2025-2030 waste strategy consultation.

### ASPIRE Partnership

ASPIRE (aspiresme.com) is a CSIRO-spinout circular economy waste exchange platform already used by 5+ SEQ councils (Sunshine Coast, Moreton Bay, Redland, Gold Coast, Logan, Brisbane). It's a general-purpose platform — batteries, plastics, textiles, organics — with soil/spoil as a minor category. It has no construction-specific features.

**The play:** Position Cut2Fill as the construction-specific vertical that complements ASPIRE. Councils already understand material exchange through ASPIRE — Cut2Fill is the earthworks specialist.

**How to approach:**
1. Contact Cameron McKenzie (CEO) via their [partnership program](https://aspiresme.com/aspire-partnership-program-empower-businesses-together/)
2. Pitch: "Your councils are already asking about construction materials. We handle that vertical. Cross-refer, don't compete."
3. Joint council pitch: "The complete circular materials solution — ASPIRE for general waste, Cut2Fill for earthworks"
4. Shared impact reporting: Cut2Fill feeds diversion metrics into council circular economy KPIs

**What Cut2Fill gets:** Instant credibility with 5+ SEQ councils through ASPIRE's existing relationships.
**What ASPIRE gets:** A specialist partner for a material category they handle poorly.

### Government engagement sequence

1. **Now:** Apply for Circular Economy Investment Program grant. Contact ASPIRE about partnership.
2. **Month 1-2:** Informal meeting with DES circular economy team — show the platform, reference Recycle Mate and ASPIRE precedents
3. **Month 2-3:** Present to 1-2 council waste/engineering officers (Logan, Ipswich) — demo the facility map for their LGA. Leverage ASPIRE council relationships if partnership progresses.
4. **Month 3-6:** Formal approach to DES and TMR — position Cut2Fill as a diversion verification platform
5. **Month 6+:** Propose levy credit pilot to new waste strategy team

---

## 8. Platform Readiness Checklist

Before approaching Tier 2+ contacts, the platform needs:

- [ ] Listing system live (submit, review, appear on map)
- [ ] 2-3 seed listings visible on the map (from Archers network)
- [ ] Water fill points hidden
- [ ] Heatmap button hidden or removed
- [ ] Landing page features match reality (no "Live Site Status" claim)
- [ ] Footer copyright updated to 2026
- [ ] "Create Free Account" links to registration flow

See 05-Soft-Launch-Specification.md for the full technical punch list.

---

## 9. Metrics to Track During Soft Launch

| Metric | Tool | Target (90 days) |
|--------|------|-------------------|
| Unique visitors | Analytics (to set up) | 200 |
| Return visitors | Analytics | 30% return rate |
| Registered users | Supabase dashboard | 30 |
| Listings submitted | Admin panel | 10 |
| Facility detail views | To build | Track which facilities get clicked |
| Demo meetings held | Manual tracking | 10 |
| Inbound enquiries | Email/LinkedIn | 5 |

---

*This playbook is a starting point. Update it as real feedback comes in from Tier 1 contacts.*
