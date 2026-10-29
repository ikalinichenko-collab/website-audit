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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#e9819ba98e868e85868b90c78a8684 (404) | https://gogloby.com/cdn-cgi/l/email-protection#264e54664149414a49445f0845494b (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization «GoGloby»: legalName «Gogloby LLC» conflicts with Fact Sheet «GoGloby LLC»; slogan «Applied AI Engineering Partner» conflicts with Glossary §7; description «US-based talent acquisition agency» conflicts with approved company description. Other notable mismatches: award uses «Applied AI Engineering Partner»; aggregateRating reviewCount is 4.9, while Fact Sheet says 10 reviews. The page also has legacy service/catalog claims, including «Vetted profiles delivered in 72 hours» and «120-day telemetry-backed replacement guarantee». — locations: schema — count: 1 — fix: Correct the mismatched Organization fields against the approved company description and Fact Sheet; remove or verify unsupported catalog claims and values. — source: decisions.md: Company description; Fact Sheet: Identity, What clients say, External recognition; Glossary §7
✅ **B3** Person data — evidence: Sergey: «Co-founder & CTO» matches «Co-Founder and CTO» after normalizing ampersand and case. | Vit Koval: «Co-founder» matches the approved «Co-Founder» title; alternateName «Vitaly Koval» matches the approved founder name. — locations: schema — count: 2 — source: decisions.md: Founders
⚠️ **B4** Schema matches the page — evidence: «GoGloby LLC (“GoGloby,” “we,” “us,” or “our”)»; the page does not provide a separate author. — locations: body — fix: No page author is supplied to validate; confirm whether a named author or reviewer is required for this legal page. — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: The title is «Privacy Policy | Globy» and the meta description begins «Read Globy's privacy policy»; the page body also states «GoGloby LLC». — locations: title, meta, body — count: 2 — fix: Use the current company spelling consistently in the title and meta description. — source: decisions.md: Spelling
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: The notice says «GoGloby also operates through teams and business locations in Latin America and Europe»; these operating-location details are not established in the Fact Sheet. — locations: body — fix: Verify the operating-location statement against an approved source or remove it if it cannot be substantiated. — source: Fact Sheet: Identity
✅ **D2** Client figures — evidence: No Fact Sheet client metrics are shown in the page text; the page includes the retention period «up to 24 months», which is not a Fact Sheet client metric. — locations: body — count: 0 — source: Fact Sheet: Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: No client logos or client cards are present in the supplied page content; the text refers generically to «a GoGloby client». — locations: body — count: 0 — source: Fact Sheet: Featured clients
⚠️ **D4** Press and partners — evidence: The privacy notice gives an «Effective Date: September 16, 2026» and describes processing practices; these legal details are not independently verifiable from the supplied company sources. — locations: body — fix: Have the relevant legal/privacy owner verify the notice date and processing statements. — source: Fact Sheet: Legal and security

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: This is a privacy notice, not a service page; the incidental reference to «recruiting or selection process» does not establish service targeting. — source: Fact Sheet: Services
✅ **E2** Positioning — evidence: «This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information» clearly states the legal page's subject. — locations: h1, body — count: 1 — source: Fact Sheet: Identity
✅ **E3** Call to action — evidence: «For privacy questions or requests, contact» gives a clear route for privacy inquiries. — locations: body — count: 1 — source: Fact Sheet: Identity
⚠️ **E4** Lead order — evidence: The notice says «Privacy email: [email protected]»; the supplied page data shows the email links as protected links returning 404. — locations: link_text — count: 3 — fix: Check and repair the privacy-contact links so readers can use them. — source: Fact Sheet: Identity; supplied code check A11

## F. GEO

✅ **F1** Answer first — evidence: «Privacy Policy and Candidate Privacy Notice» accurately identifies the page as a privacy notice. — locations: h1 — count: 1 — source: Fact Sheet: Legal and security
✅ **F2** Buyer problem — evidence: The page explains «how we collect, use, disclose, store, and protect personal information» and sets out collection, use, sharing, retention, and rights sections. — locations: body — count: 1 — source: Fact Sheet: Legal and security
⚠️ **F3** Recruiting firm stated early — evidence: The notice states «GoGloby LLC is generally the controller» but also refers to «a GoGloby affiliate or another entity»; the responsible entities are not detailed in the supplied sources. — locations: body — fix: Confirm the controller and affiliate details with the legal/privacy owner. — source: Fact Sheet: Identity
✅ **F4** GoGloby named near claims — evidence: «Depending on where you live» introduces privacy rights and the notice provides jurisdiction-specific sections. — locations: body — count: 1 — source: Fact Sheet: Legal and security
✅ **F5** FAQ — evidence: The page identifies «GoGloby LLC» and gives «8 The Green, Ste. R» and «Delaware 19901» as the headquarters address. — locations: body — count: 1 — source: Fact Sheet: Identity
✅ **F6** Audience — evidence: informational — locations: h1, body — count: 1 — fix: The page is a legal notice rather than a buyer-facing service page; its H1 is «Privacy Policy and Candidate Privacy Notice». — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No service-targeting keyword is appropriate for this legal page; its title is «Privacy Policy | Globy». — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: «Privacy Policy and Candidate Privacy Notice» is a clear legal-page title, though the page title still uses the former company name. — locations: h1 — count: 1 — fix: Correct the legacy brand spelling in the title metadata; no service keyword targeting is needed. — source: decisions.md: Spelling; Glossary §6
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the legal-page H1 «Privacy Policy and Candidate Privacy Notice»; it describes the notice's scope. — source: Fact Sheet: Legal and security
✅ **H2** Priority — evidence: low — locations: h2 — count: 17 — fix: Low priority: the headings are organized and descriptive, for example «2. Personal Information We Collect» and «12. Your Privacy Rights». — source: Fact Sheet: Legal and security
✅ **H3** Reasons — evidence: C2: title/meta use former name: «Privacy Policy | Globy». | B2: Organization schema conflicts on legalName and description: «Gogloby LLC» and «US-based talent acquisition agency». | D2: no Fact Sheet client metrics appear; the page says «up to 24 months», a retention period. | E4: privacy contact links fail per supplied code check A11; page text shows «Privacy email: [email protected]». — locations: title, meta, schema, body, link_text — count: 4 — fix: Address the cited brand, schema, and contact-link issues; no client-metric conflict was found. — source: decisions.md: Spelling; Fact Sheet: Identity, Key metrics; supplied code check A11
