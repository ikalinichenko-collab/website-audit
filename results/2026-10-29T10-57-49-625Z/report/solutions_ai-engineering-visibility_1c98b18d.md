# Page report

- **URL:** https://gogloby.com/solutions/ai-engineering-visibility/
- **Type:** service
- **Action:** redirect_to:https://gogloby.com/services/ai-staff-augmentation/
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 64 characters: "AI Cost Management and Engineering Visib..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
✅ **A3** Meta description length — evidence: 148 characters — locations: meta — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/solutions/ai-engineering-visibility/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
⚠️ **A10** Image alt text — evidence: 41 images without alt — locations: image_alt — count: 41 — fix: Add alt text to main content images. — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: Service, BreadcrumbList | Found: Organization, WebSite, FAQPage — locations: schema — fix: Add JSON-LD types: Service, BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: “AI ENGINEERING VISIBILITY” (body) frames the page as a standalone product. — locations: body — count: 1 — fix: Align the page’s framing with the approved description of GoGloby and its services, or remove the standalone product framing. Source: “GoGloby is a staffing and recruiting agency specializing in hiring Data & AI Engineers.” — source: decisions.md: Company description
❌ **B3** Person data — evidence: “AI Intelligence Layer” (body) uses a retired product name. — locations: body, schema — count: 47 — fix: Replace the retired name with the current name where relevant. The approved name is “AI Development Intelligence Layer”; it is bundled with nearshore staffing and is not a separate product. Source: Glossary §2, §7. — source: Glossary §2, §7
❌ **B4** Schema matches the page — evidence: “Applied AI Engineering client” (body) describes GoGloby using a prohibited positioning term. — locations: body, schema — count: 10 — fix: Remove “Applied AI Engineering” as a description of GoGloby or its offer. Source: Glossary §7 prohibits “Applied AI Company” and “Applied AI Engineering partner” as descriptions. — source: Glossary §7

## C. Wording

❌ **C1** Banned phrases — evidence: hipped feature. The AI Intelligence Layer joins your AI spend | he Org We built the AI Intelligence Layer for the people who — locations: body, title, h1, h2 — count: 47 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: “Get Your AI Cost Benchmark” (body) uses “Benchmark” as the main call to action. — locations: body, h2, schema — count: 10 — fix: Remove the standalone benchmark offer and benchmark-led CTA; the Intelligence Layer is sold only bundled with nearshore staffing, not separately. Source: Glossary §2, §7. — source: Glossary §2, §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 21 em dash(es) found. — locations: body — count: 21 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: “AI Cost Management and Engineering Visibility Solution” (h1) presents a standalone solution rather than a recruiting or staffing service. — locations: title, h1 — count: 2 — fix: Rework the page’s purpose and disposition so it supports an approved recruiting or staffing service rather than presenting this as a separate software solution. Source: Fact Sheet: Services; Glossary §2. — source: Fact Sheet: Services; Glossary §2
❌ **D2** Client figures — evidence: “First numbers in one week” (body) is a product delivery promise not established in the approved service facts. — locations: body, schema — count: 3 — fix: Remove or verify product-specific delivery claims against approved service facts; do not present them as established GoGloby service commitments. Source: Fact Sheet: Services. — source: Fact Sheet: Services
❌ **D3** Clients not in the Fact Sheet — evidence: “Vetted profiles delivered in 72 hours” (schema) conflicts with the approved recruiting time of “4–6 weeks to offer.” — locations: schema — count: 1 — fix: Correct or remove schema claims that conflict with the Fact Sheet, including timelines and guarantees. Source: Fact Sheet: Services. — source: Fact Sheet: Services
❌ **D4** Press and partners — evidence: “The AI Intelligence Layer” (body) is repeatedly described as a product available independently of staffing. — locations: body, schema — count: 47 — fix: Clarify that the AI Development Intelligence Layer is included only with nearshore staffing and is never sold separately or with recruiting. Source: Glossary §2. — source: Glossary §2

## E. Positioning

❌ **E1** Service fit — evidence: “AI Cost Management Services GoGloby Delivers” (h2) describes software services, not the approved recruiting or staffing offers. — locations: h2, body, schema — count: 1 — fix: Remove or reposition the separate cost-management offer. Keep the Intelligence Layer only as a feature bundled with nearshore staffing. Source: Fact Sheet: Services; Glossary §2. — source: Fact Sheet: Services; Glossary §2
❌ **E2** Positioning — evidence: “AI Cost Management and Engineering Visibility Solution” (h1) does not identify either approved service. — locations: h1, title — count: 1 — fix: Tie the page to an approved service, or remove it as a standalone service page. Source: Fact Sheet: Services. — source: Fact Sheet: Services
❌ **E3** Call to action — evidence: “forward-deployed engineers work inside your team” (body) presents engineers as a way to deliver a separate cost-management product. — locations: body, schema — count: 2 — fix: Describe engineers only in the context of the approved recruiting or nearshore staffing engagement; remove unsupported product-delivery claims. Source: Fact Sheet: Services. — source: Fact Sheet: Services
❌ **E4** Lead order — evidence: “Get Your AI Cost Benchmark” (body) promotes an offer absent from the approved service catalog. — locations: body, h2 — count: 2 — fix: Remove the benchmark offer and route the page to an approved service path if retained. Source: Fact Sheet: Services; Glossary §7. — source: Fact Sheet: Services; Glossary §7

## F. GEO

❌ **F1** Answer first — evidence: “Who needs AI cost management software?” (body) targets buyers of standalone software. — locations: body, schema — count: 1 — fix: Refocus the audience on companies ready to hire through GoGloby’s recruiting or staffing services. Source: Glossary §9. — source: Glossary §9
⚠️ **F2** Buyer problem — evidence: “Trusted by Enterprise Software Teams” (h2) targets enterprise software teams, while the approved ICP also includes startups and PE-backed software companies. — locations: h2, body — count: 1 — fix: If this page is retained, align its audience framing with the approved ICP rather than implying a narrower or different product audience. Source: Fact Sheet: Ideal Customer Profile. — source: Fact Sheet: Ideal Customer Profile
❌ **F3** Recruiting firm stated early — evidence: “TATA” (h3) is correctly listed as a client, but the page positions it as an IT services company using this offer. — locations: body, h2 — count: 1 — fix: The TATA client listing itself is approved; remove its use as evidence for a standalone software offer. Source: decisions.md: Clients; Fact Sheet: Featured clients. — source: decisions.md: Clients
❌ **F4** GoGloby named near claims — evidence: “A GoGloby Applied AI Engineering client” (body) uses prohibited positioning for client descriptions. — locations: body — count: 10 — fix: Describe client relationships without positioning GoGloby as an Applied AI Engineering provider. Source: Glossary §7. — source: Glossary §7
❌ **F5** FAQ — evidence: “every dollar resolves to a person, team, feature, and model” (body) claims product functionality beyond the approved Intelligence Layer facts. — locations: body, schema — count: 2 — fix: Remove or verify functionality claims not established in the source of truth; keep approved Intelligence Layer claims limited to performance, velocity, and AI cost reporting sprint by sprint, without source-code access. Source: Fact Sheet: Services. — source: Fact Sheet: Services
❌ **F6** Audience — evidence: not_targeted | “Get Your AI Cost Management Benchmark” (h2) offers a standalone product, not an approved hiring service. — locations: h2, body — count: 1 — fix: Reposition the page toward buyers ready to hire through an approved GoGloby staffing or recruiting service, or remove the page. Source: Glossary §9; Fact Sheet: Services. — source: Glossary §9; Fact Sheet: Services

## G. Target keyword

❌ **G1** Target keyword — evidence: none | “AI Cost Management and Engineering Visibility Solution” (title) targets a standalone cost-management product, not an approved hiring-intent keyword. — locations: title, h1 — count: 1 — fix: Do not target standalone AI cost management as a GoGloby service keyword. Align any retained page with the approved service keyword and role strategy. Source: Glossary §3, §6. — source: Glossary §3, §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “AI Cost Management and Engineering Visibility Solution” (title) is not aligned with either approved service page. — locations: title, h1, body — count: 1 — fix: Use the page only to support an approved service topic; otherwise remove or consolidate it with the relevant service page. Source: decisions.md: Service pages; Glossary §6. — source: decisions.md: Service pages; Glossary §6
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: redirect_to:https://gogloby.com/services/ai-staff-augmentation/ — locations: title, h1, body — count: 1 — fix: Redirect this standalone product page to the approved Nearshore Data & AI Engineers Staffing page: the Intelligence Layer is sold only bundled with nearshore staffing, never separately. Page evidence: “Get Your AI Cost Benchmark.” Source: Glossary §2, §7; decisions.md: Service pages. — source: Glossary §2, §7; decisions.md: Service pages
✅ **H2** Priority — evidence: high — locations: title, h1, body, schema — count: 1 — fix: High priority: the page presents a standalone product, uses retired product naming, and contains unsupported offer and service claims. Page evidence: “AI Cost Management Services GoGloby Delivers.” Source: Glossary §2, §7; Fact Sheet: Services. — source: Glossary §2, §7; Fact Sheet: Services
✅ **H3** Reasons — evidence: Standalone product framing conflicts with approved bundled-only status (E1, E4): “Get Your AI Cost Benchmark.” | Retired product name appears in page copy and schema (B3): “AI Intelligence Layer.” | Prohibited positioning appears in client descriptions (B4, F4): “Applied AI Engineering client.” | Product claims and timelines lack support or conflict with approved service facts (D2, D3, F5): “First numbers in one week.” | The page targets software buyers rather than buyers ready to hire through an approved service (F1, F6, G1): “Who needs AI cost management software?”. — locations: body, schema, title, h1 — count: 5 — fix: Resolve the standalone product positioning and unsupported claims before retaining or redirecting the page. Source: Glossary §2, §7, §9; Fact Sheet: Services. — source: Glossary §2, §7, §9; Fact Sheet: Services
