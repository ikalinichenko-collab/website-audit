# Page report

- **URL:** https://gogloby.com/podcast/ashwin-baskaran/
- **Type:** other
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 63 characters: "Engineering Leadership in the Age of Dec..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/ashwin-baskaran/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: “Default Global Episode #85 with Ashwin Baskaran” — locations: body — source: Fact Sheet: Official profiles
✅ **B3** Person data — evidence: “Vit Koval” — locations: body — source: Fact Sheet: Founders
✅ **B4** Schema matches the page — evidence: “global hiring, remote work, employment compliance” — locations: body — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
⚠️ **C2** Context terms — evidence: “Engineering Leadership in the Age of Decentralization” — locations: title, h1 — fix: This episode-focused headline does not identify GoGloby’s staffing and recruiting services; assess whether the page needs clearer company context. — source: decisions.md: Company description
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: “VP of Engineering at 0x” — locations: body — source: Fact Sheet: Identity
✅ **D2** Client figures — evidence: “VMware, Citrix, and Cisco” — locations: body — source: Page content
⚠️ **D3** Clients not in the Fact Sheet — evidence: “a year and a half ago, he embraced the crypto realm” — locations: body — fix: The supplied sources do not verify this guest-specific biographical detail; verify it before relying on it as a factual claim. — source: Fact Sheet: Identity
✅ **D4** Press and partners — evidence: “global-first companies” — locations: body — source: Page content

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — fix: This episode page does not present a recruiting or staffing service offer; it is not a service-fit claim. — source: Fact Sheet: Services
⚠️ **E2** Positioning — evidence: “Hiring Strategy for Engineering Talent” — locations: h2, body — fix: The hiring discussion is about the guest’s approach, not GoGloby’s recruiting offer; make that distinction clear if readers could confuse them. — source: Fact Sheet: Services
⚠️ **E3** Call to action — evidence: “valuable perspective for both leaders and aspiring professionals” — locations: body — fix: The closing broadens the audience beyond buyer-ready companies; review whether that audience framing is appropriate for the page. — source: Glossary §9
✅ **E4** Lead order — evidence: “remote-first, globally distributed team” — locations: body — source: Page content

## F. GEO

✅ **F1** Answer first — evidence: “Latest podcasts” — locations: h2, link_text — count: 6 — source: Page content
⚠️ **F2** Buyer problem — evidence: “September 27, 2024” — locations: body — fix: The episode is dated 2024; check whether the date and page status should be kept current for the intended use. — source: Page content
✅ **F3** Recruiting firm stated early — evidence: “Quick Read: Ashwin Baskaran” — locations: h2, body — source: Page content
❌ **F4** GoGloby named near claims — evidence: “Missing meta description” — locations: meta — fix: Add a meta description that accurately summarizes this episode page. — source: code_check_results: A3
❌ **F5** FAQ — evidence: “No link to staffing or recruiting service pages” — locations: link_text — fix: Add a relevant in-content link to the applicable service page, if appropriate for this episode page. — source: code_check_results: A12
✅ **F6** Audience — evidence: informational — locations: h1, body — fix: This is an informational podcast episode, not buyer-ready service content: “Engineering Leadership in the Age of Decentralization.” — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — fix: No target keyword is supplied for this page; do not infer one from the supplied occurrence data. — source: Page audit data: trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: “Engineering Leadership in the Age of Decentralization” — locations: title, h1 — fix: The title and H1 describe the episode but do not explicitly identify the podcast or guest; assess whether that context should be clearer. — source: Page content
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — fix: Keep the episode-specific heading; the page is a podcast episode and the supplied data does not establish a need to merge or redirect it. The heading is “Engineering Leadership in the Age of Decentralization.” — source: Page content
✅ **H2** Priority — evidence: low — locations: title, meta — fix: Low priority: this is an informational podcast page rather than a core service page. The page identifies itself as “Default Global Episode #85.” — source: Glossary §9
✅ **H3** Reasons — evidence: Low commercial relevance for the core services (F6, E1): “Default Global Episode #85.” | Missing meta description (F4): “meta_description”: “”. | No service-page links reported (F5): “No link to staffing or recruiting service pages.” — locations: title, meta, body, link_text — source: Glossary §9
