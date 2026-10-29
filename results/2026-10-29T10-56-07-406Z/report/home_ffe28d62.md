# Page report

- **URL:** https://gogloby.com/
- **Type:** homepage
- **Action:** rewrite
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
✅ **A2** Title length — evidence: 53 characters — locations: title — source: audit.json: seo
✅ **A3** Meta description length — evidence: 146 characters — locations: meta — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
⚠️ **A10** Image alt text — evidence: 30 images without alt — locations: image_alt — count: 30 — fix: Add alt text to main content images. — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#4d253f0d2a222a21222f34632e2220 (404) | https://gogloby.com/cdn-cgi/l/email-protection#7f170d3f18101813101d06511c1012 (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Schema legal name: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal-name capitalization to match the Fact Sheet. — source: Fact Sheet: Identity
❌ **B3** Person data — evidence: Schema description: “US-based talent acquisition agency” — locations: schema — count: 1 — fix: Align the Organization description with the approved company description and specialization. — source: decisions.md: Company description
❌ **B4** Schema matches the page — evidence: Schema service name: “Generative AI Development Services” — locations: schema — count: 4 — fix: Update the schema service catalog to reflect the two approved recruiting and staffing services; remove unsupported service offers and claims. — source: decisions.md: Service pages; Fact Sheet: Services

## C. Wording

❌ **C1** Banned phrases — evidence: team comes with the AI Intelligence Layer: every AI dollar vi | it, and we run the AI Intelligence Layer that proves it agai — locations: body, meta, title, h2 — count: 37 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Body claim: “100+ Clients Across 10+ Industries” — locations: h2, body — fix: Verify or remove client-count and other quantitative claims that are not supported by the Fact Sheet. — source: Fact Sheet: Identity; Fact Sheet: Featured clients
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Title: “Applied AI Company for Established Software” — locations: title — fix: Reposition the homepage title around the approved staffing and recruiting category and Data & AI Engineers. — source: Glossary §6: Positioning terms
❌ **D2** Client figures — evidence: H1: “Uncover & Fix What’s Holding Your AI Engineering Back” — locations: h1 — fix: Make the opening headline and first lines identify the hiring service and the engineers GoGloby places. — source: Glossary §9: How we write
❌ **D3** Clients not in the Fact Sheet — evidence: Body: “we put the right people inside your team to fix it” — locations: body — fix: Describe GoGloby as recruiting and staffing engineers, with clients directing and running the work; remove language presenting GoGloby as an engineering-delivery provider. — source: Fact Sheet: Identity; Glossary §1: What GoGloby is not
❌ **D4** Press and partners — evidence: H2: “Get Your Applied AI Engineering Benchmark” — locations: h2, body — count: 5 — fix: Remove the benchmark-led CTA and use the approved service-specific CTA approach. — source: Glossary §7: Terms and claims we do not use

## E. Positioning

❌ **E1** Service fit — evidence: contradicts — locations: body, schema — fix: The page presents development delivery and applied-AI implementation as services, rather than the approved recruiting and staffing offer. Align page and schema service descriptions with the two approved services. — source: Fact Sheet: Services; Glossary §1: What GoGloby is not
❌ **E2** Positioning — evidence: Body: “We embed Forward-Deployed Engineers” — locations: body, schema — fix: Keep Forward Deployed Engineers framed as roles GoGloby recruits or staffs, not as a standalone engineering-delivery offer. — source: Fact Sheet: Services; Glossary §7: Terms and claims we do not use
❌ **E3** Call to action — evidence: Body: “Claude Certified Architects, Claude-specific.” — locations: body — fix: Remove Claude Certified Architect as positioning or an offer; retain it only if relevant as a role being recruited or staffed. — source: Glossary §7: Terms and claims we do not use
❌ **E4** Lead order — evidence: Body: “GoGloby is an Applied AI Engineering partner” — locations: title, meta, body, schema — fix: Remove Applied AI Company/Engineering Partner positioning and the claim that GoGloby turns engineering into AI-native production. — source: Glossary §7: Terms and claims we do not use

## F. GEO

❌ **F1** Answer first — evidence: Body: “Vetted profiles delivered in 72 hours” — locations: schema — fix: Remove or substantiate this delivery-time claim; it is not supported by the approved service facts. — source: Fact Sheet: Services; Glossary §7: Terms and claims we do not use
❌ **F2** Buyer problem — evidence: Body: “First validated feature in 3 to 5 business days” — locations: schema — fix: Remove or substantiate the feature-delivery claim; the approved offer is recruiting and staffing engineers, not shipping client features. — source: Fact Sheet: Services; Glossary §1: What GoGloby is not
❌ **F3** Recruiting firm stated early — evidence: Body: “AI Intelligence Layer runs inside the client’s VPC” — locations: body, schema — fix: Use the current product name where the bundled staffing performance-tracking system is accurately described, and remove unsupported claims about deployment in a client VPC. — source: Fact Sheet: Services; Glossary §2: Nearshore Data and AI Engineers Staffing
❌ **F4** GoGloby named near claims — evidence: Body: “$3M Combined Liability (Cyber, Data and Professional)” — locations: h2, body, schema — fix: Align insurance wording to the Fact Sheet’s $3M data and cyber liability policy; remove unsupported professional-liability wording. — source: Fact Sheet: Services; Fact Sheet: Legal and security
❌ **F5** FAQ — evidence: Body: “120-Day Performance Guarantee” — locations: h2, body — fix: Describe the recruiting replacement guarantee and staffing replacement/cancellation terms separately, using the approved conditions. — source: Fact Sheet: Services
❌ **F6** Audience — evidence: not_targeted — locations: title, meta, h1, body — fix: Refocus the homepage on companies ready to hire through GoGloby’s recruiting or staffing services. The page currently targets companies seeking applied-AI implementation and ROI measurement. — source: Glossary §9: How we write

## G. Target keyword

❌ **G1** Target keyword — evidence: AI engineer staffing — locations: title, meta, h1, h2, body — fix: Use the homepage target phrase in the title and relevant opening content; the current page instead leads with applied-AI company positioning. — source: Glossary §6: Positioning terms
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: Body: “Applied AI Engineering” — locations: title, meta, h2, body, schema — fix: Replace off-positioning terminology with approved service and role language. Do not target “AI talent” on its own or “AI staffing” on its own. — source: Glossary §6: Positioning terms; Glossary §7: Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: rewrite — locations: title, h1 — fix: The homepage should be rewritten to represent GoGloby’s approved staffing and recruiting offer. Its current title and headline lead with applied-AI implementation, not the approved company description or primary hire-ready search terms. — source: decisions.md: Company description; Glossary §6: Positioning terms
✅ **H2** Priority — evidence: high — locations: title, meta, h1, h2, body, schema — fix: High priority: the title, description, and main content conflict with approved positioning and contain unsupported service, product, and performance claims. — source: decisions.md: Company description; Fact Sheet: Services; Glossary §7: Terms and claims we do not use
✅ **H3** Reasons — evidence: Homepage positioning and offer conflict with approved services (D1, D3, E1). | Homepage title and opening headline do not lead with the approved hire-ready positioning (D1, D2, G1). | Multiple claims and schema offers are not supported by the approved service facts (B4, C2, F1, F2, F4, F5). | The page uses explicitly disallowed positioning and CTA language (D4, E3, E4, G3). | Audience focus is applied-AI implementation rather than buyers ready to hire (F6). — locations: title, meta, h1, h2, body, schema — fix: Prioritize a homepage rewrite around approved recruiting and staffing services; then align schema, remove unsupported claims, and revise CTAs and terminology. — source: decisions.md: Company description; Fact Sheet: Services; Glossary §§6–9
