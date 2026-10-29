# Page report

- **URL:** https://gogloby.com/podcast/joliz-cedeno/
- **Type:** other
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 70 characters: "How We Foster Community and Career Growt..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/joliz-cedeno/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: “GoGloby” appears in the page title. — locations: title — count: 1 — source: decisions.md: Spelling
⚠️ **B3** Person data — evidence: “How We Foster Community and Career Growth for Latiné in Tech” focuses on a podcast guest and community, not GoGloby’s services. — locations: title, h1 — count: 1 — fix: Keep the page’s editorial purpose clear and avoid presenting it as a core service page. — source: Glossary §9
✅ **B4** Schema matches the page — evidence: “Executive Director at Techqueria” identifies the featured guest’s role. — locations: h2, body — count: 1 — source: Page body

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
⚠️ **C2** Context terms — evidence: “diversity and inclusion contribute to business growth and innovation” is an attributed episode quote, not a GoGloby company claim. — locations: body — count: 1 — fix: Keep guest views clearly attributed; do not present them as GoGloby’s own verified service claims. — source: Fact Sheet: What clients say
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: “Joliz Cedeño is the Executive Director at Techqueria” names and describes the guest. — locations: first_paragraph, body — count: 1 — source: Page body
✅ **D2** Client figures — evidence: “Default Global Episode #108” identifies the podcast episode. — locations: body — count: 1 — source: Page body
⚠️ **D3** Clients not in the Fact Sheet — evidence: “September 27, 2024” appears in the page body; the article schema gives a different published date, “2024-06-12”. — locations: body, schema — count: 2 — fix: Verify the publication date and make the visible date and Article schema consistent. — source: Page body; Article schema
✅ **D4** Press and partners — evidence: “Latest podcasts” links to other podcast pages. — locations: h2, link_text — count: 6 — source: Page internal_links

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: No recruiting or staffing service is described on this editorial podcast page. — source: Fact Sheet: Services
✅ **E2** Positioning — evidence: “Techqueria operates with a mission to empower Latiné professionals in tech” describes the guest’s organization, not GoGloby’s offering. — locations: body — count: 1 — source: Page body
⚠️ **E3** Call to action — evidence: “Latest podcasts” appears, but no staffing or recruiting service link is reported. — locations: h2, link_text — count: 0 — fix: Consider adding a relevant service-page link if this editorial page is intended to support service discovery. — source: Fact Sheet: Services
✅ **E4** Lead order — evidence: “Listen Up” and “Watch Now” identify episode media sections. — locations: h2 — count: 2 — source: Page headings

## F. GEO

✅ **F1** Answer first — evidence: “Joliz Cedeño” is consistently used in the page title and content. — locations: title, h1, body — count: 1 — source: Page content
⚠️ **F2** Buyer problem — evidence: “Born in New York City and raised in Puerto Rico” differs from the later account, “raised in Barcelona, Puerto Rico.” — locations: body — count: 2 — fix: Verify the guest’s biographical details and resolve the inconsistency. — source: Page body
✅ **F3** Recruiting firm stated early — evidence: “Vitaly Koval” is named as the podcast host in the body. — locations: body — count: 1 — source: decisions.md: Founders
✅ **F4** GoGloby named near claims — evidence: “community and equity” describes the episode’s subject. — locations: body — count: 1 — source: Page body
⚠️ **F5** FAQ — evidence: “Listen Up: … Full Podcast Episode on Spotify” is present, but the supplied page data reports no external links. — locations: h2 — count: 1 — fix: Verify that the Spotify and video calls to action resolve to working media destinations. — source: Page headings; Page external_links
✅ **F6** Audience — evidence: informational — locations: title, h1, body — count: 1 — fix: This podcast content is informational rather than aimed at a buyer ready to hire; keep its purpose distinct from buyer-facing service pages. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No target keyword was supplied; do not infer one from the page topic. — source: Page trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: “How We Foster Community and Career Growth for Latiné in Tech” accurately reflects the page’s community-focused interview topic. — locations: title, h1 — count: 1 — source: Page title and content
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the editorial H1; it matches the podcast page topic. The action token is “keep.” — source: Page H1
✅ **H2** Priority — evidence: low — locations: h2 — count: 6 — fix: Low priority: this is an editorial podcast page rather than a core service or buyer-intent landing page. — source: Glossary §9
✅ **H3** Reasons — evidence: Title length needs review: A2 reports 70 characters. | Meta description is missing: A3. | No service-page links are reported: A12. | BreadcrumbList is missing: B1. | Brand spelling in schema needs correction: C3. — locations: title, meta, schema — count: 5 — fix: Prioritize the issues identified in A2, A3, A12, B1, and C3. — source: Supplied code_check_results
