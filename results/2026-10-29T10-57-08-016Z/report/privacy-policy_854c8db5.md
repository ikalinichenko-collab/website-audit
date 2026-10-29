# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 22 characters: "Privacy Policy | Globy..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: 116 characters — locations: meta — fix: Adjust meta description to 120-158 characters. — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/privacy-policy/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#91f9e3d1f6fef6fdfef3e8bff2fefc (404) | https://gogloby.com/cdn-cgi/l/email-protection#274f55674048404b48455e0944484a (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Title: “Privacy Policy | Globy” — locations: title — count: 1 — fix: Use the approved company spelling; the page title uses the former name. — source: decisions.md: Spelling
❌ **B3** Person data — evidence: Schema description: “talent acquisition agency” — locations: schema — count: 1 — fix: Align the organization description with the approved company description. — source: decisions.md: Company description
❌ **B4** Schema matches the page — evidence: Schema slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove this positioning from the organization schema; it is explicitly disallowed. — source: Glossary §7

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Schema service description: “GoGloby turns engineering into AI-native production.” — locations: schema — count: 1 — fix: Remove the disallowed phrase from the schema content. — source: Glossary §7
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: Body: “GoGloby LLC (‘GoGloby,’ ‘we,’ ‘us,’ or ‘our’)” — locations: body — count: 1 — source: Fact Sheet: Identity
❌ **D2** Client figures — evidence: Schema legal name: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal-name capitalization to match the Fact Sheet. — source: Fact Sheet: Identity
❌ **D3** Clients not in the Fact Sheet — evidence: Schema: “reviewCount”: 4.9 — locations: schema — count: 1 — fix: Correct or remove the review count; the Fact Sheet reports 10 reviews. — source: Fact Sheet: What clients say
❌ **D4** Press and partners — evidence: Schema slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove the inaccurate positioning and align schema facts with the approved company description. — source: decisions.md: Company description

## E. Positioning

❌ **E1** Service fit — evidence: Schema service: “Generative AI Development Services” — locations: schema — count: 1 — fix: Remove service schema that describes GoGloby as a development-services provider; its approved services are recruiting and staffing. — source: Fact Sheet: Services
❌ **E2** Positioning — evidence: Schema service description: “build copilots, AI agents, RAG applications” — locations: schema — count: 1 — fix: Remove schema claims that present GoGloby as building and delivering software. — source: Fact Sheet: Identity
❌ **E3** Call to action — evidence: Schema service: “AI Staff Augmentation” — locations: schema — count: 1 — fix: Use the approved service name and remove unsupported service-offer details. — source: decisions.md: Spelling; Fact Sheet: Services
❌ **E4** Lead order — evidence: Schema: “Vetted profiles delivered in 72 hours.” — locations: schema — count: 1 — fix: Remove unsupported delivery-time claims from the service schema. — source: Fact Sheet: Services

## F. GEO

✅ **F1** Answer first — evidence: H1: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 1 — source: Page content
✅ **F2** Buyer problem — evidence: H2: “Your Privacy Rights” — locations: h2 — count: 1 — source: Page content
✅ **F3** Recruiting firm stated early — evidence: Body: “We do not sell candidate application information for monetary consideration.” — locations: body — count: 1 — source: Page content
✅ **F4** GoGloby named near claims — evidence: Body: “GoGloby uses administrative, technical, and organizational safeguards” — locations: body — count: 1 — source: Page content
⚠️ **F5** FAQ — evidence: Body: “Privacy email: [email protected]” — locations: body, link_text — count: 3 — fix: Verify the privacy contact links resolve correctly; the supplied code check reports three broken internal email links. — source: Page content; code check A11
✅ **F6** Audience — evidence: informational — locations: h1 — count: 1 — fix: This legal notice serves an informational privacy purpose, not a buyer-ready hiring purpose; it is appropriate for the page type. The H1 is “Privacy Policy and Candidate Privacy Notice.” — source: Page content; Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No target hiring keyword is appropriate for this legal page. — source: Glossary §9
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: Title: “Privacy Policy | Globy” — locations: title — count: 1 — fix: Correct the former company name in the title. — source: decisions.md: Spelling
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the legal-page H1. It accurately describes the content: “Privacy Policy and Candidate Privacy Notice.” — source: Page content
✅ **H2** Priority — evidence: low — locations: h2 — count: 17 — fix: Low priority: the page's numbered privacy sections are relevant and clearly organized. Example: “How We Use Candidate Information.” — source: Page content
✅ **H3** Reasons — evidence: Brand inconsistency: C3 identifies “Privacy Policy | Globy.” | Schema positioning conflict: B4 flags “Applied AI Engineering Partner.” | Schema service mismatch: E1 flags “Generative AI Development Services.” | Unsupported schema fact: D3 identifies “reviewCount”: 4.9. — locations: title, schema — count: 4 — fix: Prioritize the brand and schema corrections identified in C3, B4, E1, and D3. — source: decisions.md: Spelling; Glossary §7; Fact Sheet: What clients say
