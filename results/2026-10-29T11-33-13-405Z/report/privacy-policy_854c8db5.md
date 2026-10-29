# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** fix
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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#375f45775058505b58554e1954585a (404) | https://gogloby.com/cdn-cgi/l/email-protection#c3abb183a4aca4afaca1baeda0acae (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization GoGloby: legalName "Gogloby LLC" conflicts with page "GoGloby LLC"; slogan "Applied AI Engineering Partner" conflicts with the restriction on that description; description "US-based talent acquisition agency" does not match the approved company description; knowsAbout/keywords include old product terminology such as "AI Intelligence Layer"; offer catalog includes "Generative AI Development Services" and "AI Staff Augmentation" as services. — locations: schema — count: 1 — fix: Correct the Organization fields and remove unsupported or disallowed service, slogan, and product claims from the schema. — source: decisions.md: Company description; Fact Sheet: Identity, Services; Glossary §§2, 7
❌ **B3** Person data — evidence: Sergey Matikaynen: jobTitle "Co-founder & CTO" matches after normalization; description includes "Applied AI Engineering system" and "secure development environment," which are not supported by the founder source. — locations: schema — count: 1 — fix: Align founder descriptions with verified source information and remove unsupported claims. — source: decisions.md: Founders; Fact Sheet: Founders; Glossary §7
✅ **B4** Schema matches the page — evidence: Page identifies the responsible entity as "GoGloby LLC". — locations: body — count: 0 — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: The page identifies the company as "GoGloby LLC". — locations: body — count: 0 — source: decisions.md: Spelling
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: The notice says "We may use analytics providers such as Google Analytics"; this specific provider is not verified in the supplied sources. — locations: body — count: 1 — fix: Verify the named provider and keep the statement only if accurate. — source: Fact Sheet: Legal and security
✅ **D2** Client figures — evidence: No Fact Sheet client metrics are shown; the page states "up to 24 months" for talent-pool retention, which is not a client metric. — locations: body — count: 0 — source: Fact Sheet: Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: No client logos or client cards appear in the supplied page content; it refers to "a GoGloby client" generically. — locations: body — count: 0 — source: Fact Sheet: Selected clients
✅ **D4** Press and partners — evidence: The page states "GDPR applies" conditionally and does not present an unsupported certification claim. — locations: body — count: 0 — source: Fact Sheet: Legal and security

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: This legal notice is not a service landing page; no service-fit change is indicated. — source: Fact Sheet: Services
✅ **E2** Positioning — evidence: The notice describes recruiting and placement activities as "recruiting or selection process". — locations: body — count: 0 — source: Fact Sheet: Services
✅ **E3** Call to action — evidence: The notice explains information sharing when evaluating candidates "for an opportunity involving a GoGloby client". — locations: body — count: 0 — source: Fact Sheet: Services
✅ **E4** Lead order — evidence: The page describes privacy practices and does not claim GoGloby delivers software development. — locations: body — count: 0 — source: Fact Sheet: Identity

## F. GEO

✅ **F1** Answer first — evidence: The content is a privacy notice, headed "Privacy Policy and Candidate Privacy Notice". — locations: h1 — count: 0 — source: Fact Sheet: Identity
✅ **F2** Buyer problem — evidence: The page explains "How We Use Candidate Information". — locations: h2 — count: 0 — source: Fact Sheet: Services
✅ **F3** Recruiting firm stated early — evidence: The notice identifies "GoGloby LLC" as responsible for personal information. — locations: body — count: 0 — source: Fact Sheet: Identity
✅ **F4** GoGloby named near claims — evidence: The notice includes contact details via "Privacy email: [email protected]". — locations: body — count: 0 — source: Fact Sheet: Identity
✅ **F5** FAQ — evidence: The page says "We do not sell candidate application information for monetary consideration." — locations: body — count: 0 — source: Fact Sheet: Legal and security
✅ **F6** Audience — evidence: informational — locations: h1, body — count: 0 — fix: This legal page is informational rather than a buyer-facing service page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No service keyword target is appropriate for this legal notice. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: The page is a privacy notice, with the H1 "Privacy Policy and Candidate Privacy Notice". — locations: h1 — count: 0 — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: fix — locations: title, meta — count: 0 — fix: The title and meta description use the former name: "Privacy Policy | Globy" and "Read Globy's privacy policy". Correct brand spelling and address the title-length issue. — source: decisions.md: Spelling
✅ **H2** Priority — evidence: low — locations: h2 — count: 0 — fix: Heading structure is clear for a legal notice; no priority heading changes are indicated. — source: Page content: H2 headings
✅ **H3** Reasons — evidence: C3: title/meta use former brand name: "Privacy Policy | Globy". | A11: email links return 404; supplied evidence lists two broken URLs. | B2: Organization schema uses "Gogloby LLC" and an unapproved description. | B3: Sergey’s schema description includes unsupported claims about the "Applied AI Engineering system". — locations: title, meta, link_text, schema — count: 4 — fix: Address the cited brand, broken-link, and schema mismatches. — source: decisions.md: Spelling; Fact Sheet: Identity, Founders; Glossary §7
