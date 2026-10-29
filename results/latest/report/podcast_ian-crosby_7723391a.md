# Page report

- **URL:** https://gogloby.com/podcast/ian-crosby/
- **Type:** other
- **Action:** keep
- **Priority:** medium

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 66 characters: "From Developer to CTO: Leading a 260+ Gl..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/ian-crosby/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Schema description: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove the disallowed positioning from the organization schema. — source: Glossary §7
❌ **B3** Person data — evidence: Schema slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Align organization schema positioning with the approved company description. — source: decisions.md: Company description
❌ **B4** Schema matches the page — evidence: Schema name: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal name spelling in the schema. — source: decisions.md: Spelling

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Schema slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove this disallowed description of the company from the schema. — source: Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: Page title: “From Developer to CTO: Leading a 260+ Global Remote Team” — locations: title — fix: Consider whether this legacy podcast page should remain indexable; the title is episode-focused rather than buyer-focused. — source: Glossary §9
❌ **D2** Client figures — evidence: “Latest podcasts” — locations: body — fix: Add relevant links from the page’s main content to the approved staffing or recruiting service pages. — source: decisions.md: Service pages
❌ **D3** Clients not in the Fact Sheet — evidence: Meta description: “(empty)” — locations: meta — fix: Add a page-specific meta description that accurately summarizes the episode. — source: Glossary §9
⚠️ **D4** Press and partners — evidence: Article description: “(empty)” — locations: schema — fix: Add an accurate description to the Article schema. — source: Glossary §9

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — fix: The page is an interview about cloud, remote work, and engineering, not a service offer. No service-fit change is indicated. — source: Fact Sheet: Services
⚠️ **E2** Positioning — evidence: “The Future of Global Hiring” — locations: body — fix: Keep the hiring discussion clearly framed as the interviewee’s perspective, not as a GoGloby service claim. — source: Fact Sheet: Services
✅ **E3** Call to action — evidence: “Default Global Episode #104 with Ian Crosby” — locations: body — fix: No change indicated; the page identifies the podcast episode and interviewee. — source: Fact Sheet: Identity
⚠️ **E4** Lead order — evidence: “Latest podcasts” — locations: body — fix: Keep podcast navigation and related episode content within the page’s editorial purpose. — source: Glossary §9

## F. GEO

✅ **F1** Answer first — evidence: “Ian Crosby, Field CTO at Aptum” — locations: h2, body — fix: No change indicated; the interview subject and role are stated clearly. — source: Glossary §9
⚠️ **F2** Buyer problem — evidence: “260+ Global Remote Team” — locations: title, h1 — fix: Verify the quantified claim before retaining it; the supplied source documents do not substantiate this page-specific figure. — source: Fact Sheet: Identity
✅ **F3** Recruiting firm stated early — evidence: “The Power of Cloud and Open Source” — locations: body — fix: No change indicated; the article covers the interview’s stated technology topics. — source: Glossary §9
⚠️ **F4** GoGloby named near claims — evidence: “AI Era Is Now!Lead or Fall Behind?” — locations: h2 — fix: Review this unrelated promotional heading for relevance to the episode page. — source: Glossary §9
✅ **F5** FAQ — evidence: “Vit’s In-Depth Talk with Ian Crosby” — locations: h2 — fix: No change indicated; the page identifies the host and guest. — source: Fact Sheet: Founders
⚠️ **F6** Audience — evidence: informational — locations: title, h1, body — fix: This is editorial podcast content rather than a buyer-ready service page. Keep its purpose clear and avoid treating it as a primary hiring landing page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — fix: No buyer-ready hiring keyword is appropriate for this episode-focused page; do not force a service keyword into its title or H1. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: “From Developer to CTO: Leading a 260+ Global Remote Team” — locations: title, h1 — fix: Keep the title and H1 descriptive of the episode; assess separately whether the page merits ongoing search optimization. — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the episode-specific H1. It matches the page’s editorial subject, and the supplied source documents do not establish a replacement or redirect decision. — source: Glossary §9
✅ **H2** Priority — evidence: medium — locations: title, meta, schema — fix: Address the missing meta description and empty Article description, and review the title’s length and page relevance. — source: Glossary §9
✅ **H3** Reasons — evidence: Missing meta description: code check A3; page evidence “(empty)” in meta_description. | Missing service-page links: code check A12; body includes “Latest podcasts” but no service links. | Schema uses former-name spelling: code check C3; schema says “Gogloby LLC”. | Schema uses disallowed positioning: code check C1 reports no banned phrases in page text, but schema says “Applied AI Engineering Partner”; Glossary §7. | Title exceeds the supplied SEO length guidance: code check A2; title begins “From Developer to CTO: Leading a 260+ Global…” — locations: title, meta, schema, body — count: 5 — fix: Prioritize the metadata and schema corrections, then assess whether this editorial page needs service links. Do not add irrelevant service messaging to the interview. — source: decisions.md: Company description; decisions.md: Spelling; Glossary §§7, 9
