# Page report

- **URL:** https://gogloby.com/podcast/anthony-onesto/
- **Type:** other
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 73 characters: "Gen Z, AI, and the Future of Work: Insig..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/anthony-onesto/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: “Gen Z, AI, and the Future of Work: Insights from Anthony Onesto” — locations: title, h1 — count: 1 — source: decisions.md: Company description
❌ **B3** Person data — evidence: Schema legalName: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal name spelling in the organization schema. — source: Fact Sheet: Identity
❌ **B4** Schema matches the page — evidence: Schema slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove the disallowed company positioning from the organization schema. — source: Glossary §7

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
⚠️ **C2** Context terms — evidence: Schema description: “US-based talent acquisition agency” — locations: schema — count: 1 — fix: Review the organization schema description against the approved company description; this page’s article body does not make a conflicting company-description claim. — source: decisions.md: Company description
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Meta description: “”; Article description: “”; OG description begins “Meet Anthony Onesto, Chief People Officer at Suzy” — locations: meta, schema — count: 2 — fix: Add a page-specific meta description and populate the article schema description. — source: audit.json: seo; page JSON-LD Article
❌ **D2** Client figures — evidence: Title: “Gen Z, AI, and the Future of Work: Insights from Anthony Onesto | GoGloby” — locations: title — count: 1 — fix: Shorten the title; the supplied code check reports it is 73 characters. — source: audit.json: seo
✅ **D3** Clients not in the Fact Sheet — evidence: H1: “Gen Z, AI, and the Future of Work: Insights from Anthony Onesto” — locations: h1 — count: 1 — source: audit.json: seo
⚠️ **D4** Press and partners — evidence: Body: “Latest podcasts” — locations: body — count: 1 — fix: Consider adding contextual links from the article to relevant service pages; the supplied link check found none. — source: audit.json: checklist A12

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: This article is a podcast feature, not a service page; no service-fit correction is indicated. — source: Fact Sheet: Services
⚠️ **E2** Positioning — evidence: Article describes “Future Work Trends” and “AI”’s influence on hiring — locations: body — count: 1 — fix: Keep the article clearly framed as an informational podcast feature rather than a hiring-service page. — source: Glossary §9
✅ **E3** Call to action — evidence: “Chief People Officer at Suzy” — locations: body — count: 1 — source: page body
⚠️ **E4** Lead order — evidence: Body: “Future Work Trends” — locations: body — count: 1 — fix: No direct service claim is made in the article body; keep any future hiring advice aligned with the buyer-focused audience and approved service positioning. — source: Glossary §§1, 9

## F. GEO

✅ **F1** Answer first — evidence: “Anthony Onesto, Chief People Officer at Suzy” — locations: h2, body — count: 1 — source: page body
✅ **F2** Buyer problem — evidence: “Default Global Episode #69 with Anthony Onesto” — locations: body — count: 1 — source: page body
⚠️ **F3** Recruiting firm stated early — evidence: Schema author: “Vit Koval” — locations: schema — count: 1 — fix: Verify the article author attribution; the page data names Vit Koval, but the supplied sources do not confirm this episode’s author. — source: Fact Sheet: Founders
⚠️ **F4** GoGloby named near claims — evidence: Article says Anthony has “20+ years of experience” — locations: body — count: 1 — fix: Verify the guest biography detail before treating it as a company-approved fact; it is not supported by the supplied source documents. — source: Fact Sheet: What clients say; page body
✅ **F5** FAQ — evidence: “Suzy’s Chief People Officer” — locations: body — count: 1 — source: page body
✅ **F6** Audience — evidence: informational — locations: title, h1, body — count: 1 — fix: This podcast article is informational rather than a direct service conversion page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No target keyword was supplied; do not infer one from the page text. — source: Page audit data: trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: The supplied internal links point to “From $1Billion to $100 Billion: Secrets to Scaling Globally” and other podcast pages. — locations: link_text — count: 6 — fix: The provided link data contains related podcast links but no service-page links; consider adding relevant service links within the main article content. — source: audit.json: checklist A12
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the H1: “Gen Z, AI, and the Future of Work: Insights from Anthony Onesto” accurately identifies the podcast feature. — source: page H1; Glossary §9
✅ **H2** Priority — evidence: low — locations: h2 — count: 6 — fix: Low priority: the headings organize the guest introduction, episode formats, interview highlights, and related podcasts; no material heading issue is evident. — source: page H2; Glossary §9
✅ **H3** Reasons — evidence: Title exceeds the supplied length recommendation: “Gen Z, AI, and the Future of Work: Insights from Anthony Onesto | GoGloby” (D2). | Meta description is missing: “” (D1). | Schema has a company-name spelling inconsistency: “Gogloby LLC” (B3). | Schema uses disallowed positioning: “Applied AI Engineering Partner” (B4). | No service-page links were found in the supplied link check (D4). — locations: title, meta, schema, link_text — count: 5 — fix: Address the title length, missing description, schema spelling and positioning, and service-link gap. — source: Page audit data; decisions.md: Spelling; Glossary §7
