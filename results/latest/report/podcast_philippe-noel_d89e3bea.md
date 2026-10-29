# Page report

- **URL:** https://gogloby.com/podcast/philippe-noel/
- **Type:** other
- **Action:** noindex
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 80 characters: "How to Join YC, Raise $2M, and Land Fort..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/philippe-noel/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: Title ends with “| GoGloby”. — locations: title — count: 1 — source: decisions.md: Spelling
❌ **B3** Person data — evidence: Schema legal name is “Gogloby LLC”. — locations: schema — count: 1 — fix: Correct the company-name spelling in the schema to match the approved company name. — source: decisions.md: Spelling
❌ **B4** Schema matches the page — evidence: Schema slogan: “Applied AI Engineering Partner”. — locations: schema — count: 1 — fix: Remove the prohibited positioning from the organization schema. — source: Glossary §7

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Schema description calls GoGloby a “talent acquisition agency”. — locations: schema — count: 1 — fix: Align the organization description in schema with the approved company description. — source: decisions.md: Company description
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Schema description says “within the US & EU time zones”. — locations: schema — count: 1 — fix: Correct the unsupported service-area claim in schema against the approved company facts. — source: Fact Sheet: Identity
❌ **D2** Client figures — evidence: Schema includes “Vetted profiles delivered in 72 hours.” — locations: schema — count: 1 — fix: Remove or substantiate the delivery-time claim; the approved service facts specify 2–3 weeks to start for staffing and 4–6 weeks to offer for recruiting. — source: Fact Sheet: Services
❌ **D3** Clients not in the Fact Sheet — evidence: Schema includes “Shortlist delivered in 5 days.” — locations: schema — count: 1 — fix: Remove or substantiate the shortlist-time claim; the approved recruiting time is 4–6 weeks to offer. — source: Fact Sheet: Services
❌ **D4** Press and partners — evidence: Schema rating uses “reviewCount”: 4.9. — locations: schema — count: 1 — fix: Correct the review count to match the approved review information; the Fact Sheet says 4.9 / 5 from 10 reviews. — source: Fact Sheet: What clients say

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: title, h1, body — count: 0 — fix: This page discusses an entrepreneur and podcast episode, not GoGloby's recruiting or staffing services. — source: Fact Sheet: Services
⚠️ **E2** Positioning — evidence: The episode describes Philippe's “journey from Whist to ParadeDB”. — locations: body — count: 1 — fix: Keep the editorial focus, but clarify the page's relationship to GoGloby if it is intended to support company-service discovery. — source: Glossary §9
❌ **E3** Call to action — evidence: “No link to staffing or recruiting service pages” (supplied code check A12). — locations: body, link_text — count: 0 — fix: Add an in-content link to the relevant service page if this page is intended to direct readers to GoGloby's services. — source: code_check_results: A12; decisions.md: Service pages
✅ **E4** Lead order — evidence: “Philippe Noël, Co-founder and CEO of ParadeDB”. — locations: body — count: 1 — source: Page body

## F. GEO

❌ **F1** Answer first — evidence: “AI Era Is Now!Lead or Fall Behind?” — locations: h2 — count: 1 — fix: Correct the joined words and punctuation in this heading. — source: Page H2
❌ **F2** Buyer problem — evidence: “149 Rejections, 1 Yes: The Truth About Fundraising”. — locations: h2 — count: 1 — fix: Review headings for consistent spacing and date formatting; the supplied heading text includes inconsistent spacing in other page elements. — source: Page H2 and H3
⚠️ **F3** Recruiting firm stated early — evidence: “Quick Read: Philippe Noël, Co-founder & CEO at ParadeDB, Interview Highlight”. — locations: h2 — count: 1 — fix: Use consistent spelling and styling for role titles and symbols across headings. — source: Page H2; Glossary §9
❌ **F4** GoGloby named near claims — evidence: “Our conversation today was enlightening and filled with practical wisdom.” — locations: body — count: 1 — fix: Review the article for repetitive, generic closing language and remove material that does not add specific information. — source: Page body; Glossary §9
❌ **F5** FAQ — evidence: “Our very first client was a fellow startup from the YC batch we were part of.” — locations: body — count: 1 — fix: Check whether the interview article's claims and quotations have supporting source material before retaining them as factual statements. — source: Page body; Fact Sheet: What clients say
⚠️ **F6** Audience — evidence: informational — locations: title, h1, body — count: 1 — fix: The page is an entrepreneurship podcast article, not content for buyers ready to hire GoGloby; assess whether it should remain indexable as an editorial page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1, body — count: 0 — fix: No service-target keyword is evidenced for this editorial podcast page; do not force a hiring keyword onto it. — source: Glossary §6; supplied trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: Meta description is empty; the supplied code check reports “Missing meta description”. — locations: meta — count: 0 — fix: Add a page-specific meta description that accurately summarizes the podcast episode. — source: code_check_results: A3
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: noindex — locations: h1 — count: 1 — fix: The H1 “How to Join YC, Raise $2M, and Land Fortune 500 Clients After Setbacks” targets an informational founder audience rather than buyers ready to hire. Consider noindexing this page unless it has a deliberate editorial-search purpose. — source: Glossary §9
✅ **H2** Priority — evidence: low — locations: h1, body — count: 1 — fix: Low priority: this is a podcast editorial page, not a service page. The supplied code check reports a title length of 80 characters; review title length only if retaining it as an indexable page. — source: code_check_results: A2; Glossary §9
✅ **H3** Reasons — evidence: Informational rather than buyer-ready topic: “How to Join YC, Raise $2M” (F6). | No service-target keyword evidenced: “Default Global Episode #109” (G1). | No in-content service-page link reported (E3). | Schema contains disallowed company positioning: “Applied AI Engineering Partner” (B4). | Missing meta description reported by the supplied code check (G3). — locations: title, meta, h1, body, schema, link_text — count: 5 — fix: Review indexation and service-discovery intent; correct the identified schema and metadata issues if the page is retained. — source: Glossary §§7, 9; code_check_results: A3, A12
