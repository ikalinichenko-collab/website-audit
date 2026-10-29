# Page report

- **URL:** https://gogloby.com/terms-and-conditions/
- **Type:** legal
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 24 characters: "Terms of Service | Globy..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
✅ **A3** Meta description length — evidence: 122 characters — locations: meta — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/terms-and-conditions/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#761a1311171a361119111a19140f5815191b (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization schema says legalName “Gogloby LLC”; the page body says “GoGloby LLC.” | Schema slogan is “Applied AI Engineering Partner”; schema description calls GoGloby a “talent acquisition agency.” | Schema hasOfferCatalog includes “Generative AI Development Services”; the page says services are governed by “a separate written agreement.” — locations: schema, body — count: 3 — fix: Correct the legal name and remove or update conflicting positioning and service-catalog fields. The approved description is in decisions.md. — source: decisions.md: Company description; Fact Sheet: Identity and Services
✅ **B3** Person data — evidence: Sergey’s schema jobTitle “Co-founder & CTO” matches the approved “Co-Founder and CTO” after normalizing ampersand and case. | Vit Koval’s schema jobTitle “Co-founder” matches the approved “Co-Founder.” — locations: schema — count: 2 — source: decisions.md: Founders
➖ **B4** Schema matches the page — evidence: Page body says “Terms and Conditions.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
➖ **C2** Context terms — evidence: Page H1 is “Terms and Conditions.” — locations: h1 — fix: Not applicable to this legal page. — source: Fact Sheet: Identity
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: The page identifies the company as “GoGloby LLC.” — locations: body — count: 1 — source: Fact Sheet: Identity
✅ **D2** Client figures — evidence: The page contains no Fact Sheet client metrics; its body discusses terms and “general informational purposes.” — locations: body — count: 0 — source: Fact Sheet: Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: No client logos or client cards appear in the supplied page content; the body describes “your use of the Website.” — locations: body — count: 0 — source: Fact Sheet: Featured clients
➖ **D4** Press and partners — evidence: The page says “These Terms and Conditions govern your access to and use of the website.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Identity

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: No service-fit claim is made in the page content. — source: Fact Sheet: Services
➖ **E2** Positioning — evidence: The page states services are governed by “a separate written agreement.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Services
➖ **E3** Call to action — evidence: The page says it is for “general informational purposes.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Services
➖ **E4** Lead order — evidence: The page discusses “your use of the Website.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Services

## F. GEO

➖ **F1** Answer first — evidence: The page is titled “Terms and Conditions.” — locations: h1 — fix: Not applicable to this legal page. — source: Glossary §9
➖ **F2** Buyer problem — evidence: The page says it is for “general informational purposes.” — locations: body — fix: Not applicable to this legal page. — source: Glossary §9
➖ **F3** Recruiting firm stated early — evidence: The page concerns “access to and use of the Website.” — locations: body — fix: Not applicable to this legal page. — source: Glossary §9
➖ **F4** GoGloby named near claims — evidence: The page says service provision is governed by “a separate written agreement.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Services
➖ **F5** FAQ — evidence: The page says it applies “solely to your use of the Website.” — locations: body — fix: Not applicable to this legal page. — source: Fact Sheet: Identity
✅ **F6** Audience — evidence: not_targeted — locations: h1, body — fix: Legal terms page; it is not intended as a buyer acquisition page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — fix: No buyer-intent target keyword is appropriate for this legal page. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
➖ **G3** Trap terms in title or H1 — evidence: The H1 is “Terms and Conditions.” — locations: h1 — fix: Not applicable to this legal page. — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the legal page. Correct the stale former-name use in the title and meta, and address the schema discrepancies separately. — source: decisions.md: Spelling
✅ **H2** Priority — evidence: low — locations: title, meta, schema — count: 3 — fix: Low priority: the page is a legal document, but update the title and meta to use the current company name and correct the conflicting Organization schema. — source: decisions.md: Spelling; Fact Sheet: Identity
✅ **H3** Reasons — evidence: C3: Title says “Terms of Service | Globy”; use the approved company spelling. | B2: Schema legalName is “Gogloby LLC”; the page body says “GoGloby LLC.” | B2: Schema positioning says “Applied AI Engineering Partner”; the page body describes GoGloby as operating in “the AI and software development industry.” | C5: Body includes em dashes in “content — including” and “rights — are”; replace the punctuation per writing guidance. | A11: The contact link text is “[email protected]”; supplied code check reports its destination returns 404. — locations: title, meta, schema, body, link_text — count: 5 — fix: Resolve these issues as noted in the cited checks. — source: decisions.md: Spelling; Fact Sheet: Identity; Glossary §9
