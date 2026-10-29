# Page report

- **URL:** https://gogloby.com/services/ai-staff-augmentation/
- **Type:** service
- **Action:** rewrite
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 62 characters: "AI Staff Augmentation for Business-Criti..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: 169 characters — locations: meta — fix: Adjust meta description to 120-158 characters. — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/services/ai-staff-augmentation/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
⚠️ **A10** Image alt text — evidence: 21 images without alt — locations: image_alt — count: 21 — fix: Add alt text to main content images. — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Service, FAQPage — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: “median time to first production commit of 23 days” — locations: schema — fix: Check the 23-day claim against an approved source before retaining it. — source: Fact Sheet: Services
❌ **B3** Person data — evidence: “Claude Certified Architects” — locations: meta, body — fix: Remove the prohibited positioning term and use approved role names. — source: Glossary §7
❌ **B4** Schema matches the page — evidence: “AI Intelligence Layer” — locations: body, schema — count: 7 — fix: Use the current product name where the product is referenced. — source: Glossary §7

## C. Wording

❌ **C1** Banned phrases — evidence: ed feature from the AI Intelligence Layer, grounded in what a | Your Perimeter The AI Intelligence Layer deploys in your VPC — locations: body — count: 7 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: “Applied AI Engineering partner” — locations: schema, body — fix: Remove this positioning description and align the company description with the approved definition. — source: decisions.md: Company description
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: “Vetted profiles delivered in 72 hours” — locations: schema — fix: Verify or remove the 72-hour delivery claim; it is not supported by the supplied source facts. — source: Fact Sheet: Services
❌ **D2** Client figures — evidence: “First validated feature in 3 to 5 business days” — locations: schema — fix: Verify or remove the first-feature timing claim; it is not supported by the supplied source facts. — source: Fact Sheet: Services
❌ **D3** Clients not in the Fact Sheet — evidence: “The fee is credited in full toward your first month of delivery” — locations: body — fix: Remove or substantiate the paid Benchmark offer; the approved staffing model is a flat monthly fee. — source: Fact Sheet: Services
❌ **D4** Press and partners — evidence: “for 2 consecutive sprints” — locations: body — fix: Align the replacement guarantee details with the approved performance-based replacement terms. — source: Fact Sheet: Services

## E. Positioning

✅ **E1** Service fit — evidence: staffing — locations: title, h1, body — fix: The page describes embedded engineers on a monthly fee, matching staffing; keep its service scope distinct from recruiting. — source: decisions.md: Service pages; Fact Sheet: Services
❌ **E2** Positioning — evidence: “AI Staff Augmentation” — locations: title, h1, body — fix: Use the official service name and spelling in page-level service references. — source: decisions.md: Spelling; Glossary §2
❌ **E3** Call to action — evidence: “recruiting a comparable senior hire” — locations: body — fix: Describe the approved nearshore service model and its Latin America sourcing rather than presenting an unspecified forward-deployed offer. — source: Fact Sheet: Services
❌ **E4** Lead order — evidence: “GoGloby handles payroll, hardware provisioning, and compliance” — locations: body — fix: Ensure descriptions of the staffing engagement remain consistent with the approved service definition and terms. — source: Fact Sheet: Services

## F. GEO

❌ **F1** Answer first — evidence: “Forward-deploy vetted Claude Certified Architects” — locations: meta — fix: Remove prohibited role positioning and align the description with the approved senior Data & AI engineer staffing offer. — source: Glossary §7
❌ **F2** Buyer problem — evidence: “cost and return per shipped feature” — locations: meta, body — fix: Do not lead with AI ROI or return-per-feature claims; present AI cost tracking only as an Intelligence Layer capability. — source: Glossary §7
❌ **F3** Recruiting firm stated early — evidence: “under 4 weeks” — locations: meta, body — fix: Use the approved staffing start-time claim of 2–3 weeks, or substantiate any different timing. — source: Fact Sheet: Services
❌ **F4** GoGloby named near claims — evidence: “$3M Combined Liability (Cyber, Data and Professional)” — locations: h2, body — fix: Align the insurance description with the approved $3M data and cyber liability policy; remove unsupported coverage categories. — source: Fact Sheet: Services
❌ **F5** FAQ — evidence: “Every engagement starts with the Benchmark” — locations: body — fix: Remove Benchmark as a main call to action and remove the unsupported paid Benchmark offer. — source: Glossary §7
❌ **F6** Audience — evidence: not_targeted — locations: title, h1, body — fix: Reorient the page toward companies ready to hire senior Data & AI engineers through the approved nearshore staffing service, rather than Claude deployment or applied AI engineering delivery. — source: Glossary §9; Fact Sheet: Ideal Customer Profile

## G. Target keyword

❌ **G1** Target keyword — evidence: AI engineer staffing — locations: title, h1, meta, body — fix: Use the approved target phrase naturally in the page title, description, and opening content; avoid using “AI staffing” alone. — source: Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “AI Staff Augmentation for Business-Critical Software” — locations: title, h1 — fix: Align the title and H1 with the approved nearshore Data & AI engineer staffing service and its buyer intent. — source: decisions.md: Service pages; Glossary §6
⚠️ **G4** Competing pages — evidence: https://gogloby.com/ — count: 1 — fix: Resolve keyword cannibalization across competing URLs. — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: rewrite — locations: h1 — fix: The H1 uses the generic “AI Staff Augmentation” label and frames the offer around business-critical software, rather than the approved Nearshore Data & AI Engineers Staffing service. — source: decisions.md: Spelling; Glossary §2
✅ **H2** Priority — evidence: high — locations: h2 — fix: The H2s emphasize Claude deployment and forward-deployed engineering, which do not match the approved service positioning. — source: Fact Sheet: Services; Glossary §7
✅ **H3** Reasons — evidence: The page presents the service as “Claude Certified Architects” rather than approved senior Data & AI Engineers (B3, F1). | The “AI Intelligence Layer” name is outdated (B4). | The paid Benchmark is a prohibited CTA and unsupported offer (D3, F5). | The page claims a “first validated feature in 3 to 5 business days,” unsupported by the source facts (D2). | Service language and page headings do not align with the approved nearshore staffing offer (E2, E3, G3). — locations: title, meta, h1, h2, body, schema — fix: Prioritize correcting the service positioning, unsupported offer and performance claims, product terminology, and page headings. — source: decisions.md; Fact Sheet: Services; Glossary §§2, 6–7, 9
