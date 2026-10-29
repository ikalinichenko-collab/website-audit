# Page report

- **URL:** https://gogloby.com/podcast/karim-fanous/
- **Type:** other
- **Action:** keep
- **Priority:** medium

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 67 characters: "Engineering Greatness: Tactics for Effic..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/karim-fanous/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: “GoGloby” appears in the page title and organization name. — locations: title, schema — count: 2 — source: decisions.md: Spelling
✅ **B3** Person data — evidence: “Karim Fanous” and “StrongDM” are consistently identified in the page content. — locations: h1, h2, body — source: Fact Sheet: Identity
⚠️ **B4** Schema matches the page — evidence: “AI in the Interview Processes” is relevant to AI, but the page mainly discusses engineering leadership and remote work. — locations: body — fix: Clarify the podcast page’s relationship to GoGloby’s hiring services; the supplied page content does not establish that connection. — source: Glossary §9

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
⚠️ **C2** Context terms — evidence: “AI Era Is Now!Lead or Fall Behind?” appears in the page body. — locations: h2, body — fix: Review this adjacent headline for relevance to the podcast page and correct the missing separation between “Now!” and “Lead.” — source: Glossary §9
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: “Vit Koval” is listed as the article author. — locations: body, schema — source: decisions.md: Founders
✅ **D2** Client figures — evidence: “September 27, 2024” appears as the page date. — locations: body — source: Fact Sheet: Identity
⚠️ **D3** Clients not in the Fact Sheet — evidence: “Presently, as the Senior Vice President of Engineering at StrongDM” identifies the guest and role. — locations: body — fix: Check the guest-role and biographical details against an authoritative source; the supplied GoGloby source documents do not verify them. — source: Fact Sheet: Identity
⚠️ **D4** Press and partners — evidence: “Full Podcast Episode on Spotify” is shown, but no external links are supplied. — locations: h2 — fix: Verify that the podcast destination is linked and accessible; no external link evidence was provided. — source: Glossary §9

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: This is a podcast episode page, not a recruiting or staffing service page; no service-fit claim is made in the supplied page text. — source: Fact Sheet: Services
⚠️ **E2** Positioning — evidence: “global hiring practices” is mentioned in the guest introduction. — locations: body — fix: Keep the discussion clearly framed as the guest’s experience rather than a description of GoGloby’s service offering. — source: Fact Sheet: Services
⚠️ **E3** Call to action — evidence: “offshore teams” appears in the episode summary. — locations: body — fix: Avoid implying that offshore delivery is GoGloby’s staffing model; clarify the distinction if this passage is meant to describe GoGloby. — source: Fact Sheet: Services
⚠️ **E4** Lead order — evidence: “AI in the Interview Processes” is one of the episode topics. — locations: body — fix: Do not present the episode’s discussion as GoGloby’s hiring methodology without supporting company-specific evidence. — source: Fact Sheet: How we vet

## F. GEO

❌ **F1** Answer first — evidence: “meta_description”: “ ” — locations: meta — fix: Add a page-specific meta description. The supplied code check also reports “Missing meta description.” — source: audit.json: seo
❌ **F2** Buyer problem — evidence: “Engineering Greatness: Tactics for Efficient Team Scaling | GoGloby” — locations: title — count: 67 — fix: Shorten the title to the recommended 50–60 characters; the supplied code check reports 67 characters. — source: audit.json: seo
✅ **F3** Recruiting firm stated early — evidence: “1 H1” — locations: h1 — count: 1 — source: audit.json: seo
✅ **F4** GoGloby named near claims — evidence: “https://gogloby.com/podcast/karim-fanous/” — locations: meta — source: checklist: A5
❌ **F5** FAQ — evidence: “No link to staffing or recruiting service pages” — locations: link_text — count: 0 — fix: Add a relevant link to the applicable service page in the main content. — source: checklist: A12
⚠️ **F6** Audience — evidence: informational — locations: h1, body — fix: This is an informational podcast page, not a buyer-ready service page. Keep its purpose distinct from service pages intended for companies ready to hire. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — fix: No target keyword is supplied, and the page is an interview episode rather than a service page. Do not infer a target keyword from the page text. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: “Engineering Greatness: Tactics for Efficient Team Scaling” — locations: title, h1 — fix: The supplied evidence does not identify a target keyword or establish that this episode title supports a hiring-focused search intent. — source: Glossary §6
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — fix: The H1 accurately names the episode: “Engineering Greatness: Tactics for Efficient Team Scaling.” The page is an informational podcast page, so no service-keyword rewrite is indicated. — source: Glossary §9
✅ **H2** Priority — evidence: medium — locations: title, meta, body — fix: Address the missing meta description and overlong title (F1, F2); also review the lack of a service-page link (F5). — source: audit.json: seo; checklist: A12
✅ **H3** Reasons — evidence: F1: “meta_description”: “ ” indicates the page lacks a meta description. | F2: “Engineering Greatness: Tactics for Efficient Team Scaling | GoGloby” is reported as 67 characters. | F5: “No link to staffing or recruiting service pages” is reported. | C2: “AI Era Is Now!Lead or Fall Behind?” appears in the supplied headings/body. | E1: “Full Podcast Episode on Spotify” indicates episode content, not a recruiting or staffing offer. — locations: title, meta, h2, body, link_text — source: audit.json: seo; checklist: A12; Fact Sheet: Services
