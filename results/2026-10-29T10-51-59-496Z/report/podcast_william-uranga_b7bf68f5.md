# Page report

- **URL:** https://gogloby.com/podcast/william-uranga/
- **Type:** other
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 68 characters: "How We Found Quality Talent in 17 U.S. S..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/william-uranga/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: “How We Found Quality Talent in 17 U.S. States and Globally” — locations: title, h1 — count: 1 — source: Page title and H1
⚠️ **B3** Person data — evidence: “William Uranga, Director of Talent Acquisition at Spokeo” — locations: body — count: 1 — fix: The page is an interview about Spokeo’s hiring rather than a direct explanation of GoGloby’s services; clarify its role as a podcast episode and avoid implying it describes GoGloby’s service offering. — source: Page body
✅ **B4** Schema matches the page — evidence: “September 27, 2024” — locations: body — count: 1 — source: Page body

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Schema legal name: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal-name capitalization in the Organization schema to match the Fact Sheet. — source: Fact Sheet: Identity
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: “William Uranga is a seasoned tech professional” — locations: body — count: 1 — source: Page body
✅ **D2** Client figures — evidence: “We discussed his strategies for acquiring talent on a global scale” — locations: body — count: 1 — source: Page body
⚠️ **D3** Clients not in the Fact Sheet — evidence: “How We Found Quality Talent in 17 U.S. States and Globally” — locations: title, h1 — count: 1 — fix: The title emphasizes broad talent acquisition rather than GoGloby’s Data & AI engineer staffing and recruiting focus; keep the scope of this podcast page clear. — source: Fact Sheet: Identity; Glossary §9
✅ **D4** Press and partners — evidence: “Latest podcasts” — locations: h2 — count: 1 — source: Page H2

## E. Positioning

✅ **E1** Service fit — evidence: both — locations: body — count: 1 — fix: The episode discusses hiring and talent acquisition generally, not GoGloby’s specific recruiting or staffing services. Keep the distinction clear and do not present the discussion as a description of GoGloby’s service model. — source: Fact Sheet: Services; Page body
✅ **E2** Positioning — evidence: “Director of Talent Acquisition at Spokeo” — locations: h2, body — count: 1 — source: Page body
⚠️ **E3** Call to action — evidence: “global hiring strategy” — locations: body — count: 1 — fix: Keep the international hiring discussion attributed to the interview guest and Spokeo; do not imply this is a GoGloby service claim. — source: Page body
✅ **E4** Lead order — evidence: “We work with employers of record in various countries” — locations: body — count: 1 — source: Page body

## F. GEO

⚠️ **F1** Answer first — evidence: “Quick Read: William Uranga” — locations: h2, body — count: 1 — fix: This is primarily an interview recap; ensure the page remains clearly framed as a podcast episode rather than a GoGloby service page. — source: Page H2 and body
✅ **F2** Buyer problem — evidence: “Listen Up” | “Watch Now” — locations: h2 — count: 2 — source: Page H2
⚠️ **F3** Recruiting firm stated early — evidence: “Listen Up: William Uranga” — locations: h2 — count: 1 — fix: The supplied internal links are to other podcast pages and the code-check results report no link to either service page. Add a relevant service-page link in the main content if appropriate to this episode. — source: Page internal_links; code check A12; decisions.md: Service pages
✅ **F4** GoGloby named near claims — evidence: “His perspective on the future trends in talent acquisition” — locations: body — count: 1 — source: Page body
⚠️ **F5** FAQ — evidence: “AI will play a significant role in hiring” — locations: body — count: 1 — fix: Keep this forward-looking statement attributed to Uranga; it is not a sourced GoGloby claim. — source: Page body
✅ **F6** Audience — evidence: informational — locations: title, h1, body — count: 1 — fix: This podcast interview is informational rather than a buyer-ready service page; keep its editorial purpose explicit. — source: Glossary §9; Page title, H1, and body

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No target keyword is supplied for this podcast page. Do not assign a service keyword without a page-level keyword brief. — source: Page trap_term_context; Glossary §§6, 8
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: “quality talent” — locations: title, h1 — count: 1 — fix: The title uses broad talent language. Keep the page’s podcast topic distinct from GoGloby’s approved service naming and positioning. — source: Fact Sheet: Services; Glossary §§2, 7
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the H1 for the interview page; it accurately identifies the episode topic. The page is not a service landing page. — source: Page H1; decisions.md: Out of scope for now
✅ **H2** Priority — evidence: low — locations: h2 — count: 6 — fix: Low priority: the headings describe the podcast and episode content, with no clear evidence that they need substantial changes. — source: Page H2
✅ **H3** Reasons — evidence: B2: “How We Found Quality Talent in 17 U.S. States and Globally” clearly identifies the episode. | D1: “William Uranga is a seasoned tech professional” introduces the guest. | F2: “Listen Up” and “Watch Now” identify episode formats. — locations: title, h1, body, h2 — count: 3 — source: Page title, H1, H2, and body
