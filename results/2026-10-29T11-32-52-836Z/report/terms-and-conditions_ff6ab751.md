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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#026e6765636e42656d656e6d607b2c616d6f (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization node: legalName “Gogloby LLC” conflicts with “GoGloby LLC”; source: Fact Sheet §Identity. | Organization node: description “US-based talent acquisition agency...” does not match approved description “GoGloby is a staffing and recruiting agency specializing in hiring Data & AI Engineers.” | Organization node: slogan “Applied AI Engineering Partner” is disallowed as a company description; source: Glossary §7. | Organization node: email “hr@gogloby.com” is not the Fact Sheet company email “sales@gogloby.com”. | Organization node: knowsAbout/keywords include obsolete or disallowed “AI Intelligence Layer” and “Applied AI Engineering Partner”; source: Glossary §7. | Organization node: award says “Clutch TOP Applied AI Engineering Partner 2025”; source records “Clutch Top Applied AI Engineering Partner, 2025”. | Organization node: aggregateRating reviewCount “4.9” conflicts with Fact Sheet “4.9 / 5 from 10 reviews”. | Organization node: service catalog includes “Applied AI Engineering”, “Generative AI Development Services”, and “AI Staff Augmentation”, which conflict with the two approved recruiting/staffing services and prohibited product positioning. | Page text evidence: “GoGloby LLC is a company founded in 2021” and “GoGloby LLC”. — locations: schema, body — count: 8 — fix: Correct the mismatched Organization fields and remove unsupported or conflicting schema values, especially the service catalog and obsolete positioning. — source: decisions.md: Company description; Fact Sheet: Identity, Official profiles, Services, External recognition; Glossary §§2, 7
✅ **B3** Person data — evidence: Sergey Matikaynen jobTitle “Co-founder & CTO” matches “Co-Founder and CTO” after normalizing '&' and case. | Vit Koval (alternateName “Vitaly Koval”) jobTitle “Co-founder” matches “Co-Founder”. — locations: schema — count: 0 — source: decisions.md: Founders
✅ **B4** Schema matches the page — evidence: Page body: “These Terms and Conditions (the ‘Terms’) govern your access” identifies the page as terms and conditions. — locations: h1, body — count: 0 — source: Page content

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: Page body: “Terms and Conditions GoGloby LLC Effective Date: June 2, 2026” is legal-page content, not substantive service marketing. — locations: body — count: 0 — source: Page content
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: Page body: “GoGloby LLC is a company founded in 2021”; Fact Sheet confirms founded 2021. — locations: body — count: 0 — source: Fact Sheet: Identity
✅ **D2** Client figures — evidence: Page body: “company founded in 2021”; Fact Sheet: “Founded | 2021” (no client metrics shown). — locations: body — count: 0 — source: Fact Sheet: Identity, Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: Page body contains no client logos or client cards; it refers to prospective clients only: “prospective clients and other interested parties”. — locations: body — count: 0 — source: Fact Sheet: Selected clients, Featured clients
✅ **D4** Press and partners — evidence: Page body: “Any provision of services by GoGloby is governed exclusively by a separate written agreement” appropriately distinguishes these website terms from service agreements. — locations: body — count: 0 — source: Page content

## E. Positioning

✅ **E1** Service fit — evidence: none — count: 0 — fix: No service-fit claim is made on this legal page. — source: Fact Sheet: Services
✅ **E2** Positioning — evidence: Page body: “Any provision of services by GoGloby is governed exclusively by a separate written agreement” makes clear that the terms page is not itself a service offer. — locations: body — count: 0 — source: Page content
✅ **E3** Call to action — evidence: Page body: “They do not, by themselves, create any client, service, advisory, employment, or contractual engagement” avoids implying a service relationship. — locations: body — count: 0 — source: Page content
✅ **E4** Lead order — evidence: Page body: “nothing on the Website constitutes an offer to provide services on any particular terms.” — locations: body — count: 0 — source: Page content

## F. GEO

✅ **F1** Answer first — evidence: Page body: “These Terms and Conditions” accurately labels the legal document. — locations: h1, body — count: 0 — source: Page content
✅ **F2** Buyer problem — evidence: Page body: “If you do not agree to these Terms, you must not access or use the Website.” — locations: body — count: 0 — source: Page content
✅ **F3** Recruiting firm stated early — evidence: Page body: “Any changes are effective when posted.” — locations: body — count: 0 — source: Page content
✅ **F4** GoGloby named near claims — evidence: Page body: “These Terms and any dispute arising out of or relating to them or the Website are governed by the laws of the State of Delaware” matches the Delaware LLC identity. — locations: body — count: 0 — source: Fact Sheet: Identity
✅ **F5** FAQ — evidence: Page body: “If you have any questions about these Terms, you may contact us at” provides contact instructions; body gives phone and email. — locations: body — count: 0 — source: Fact Sheet: Identity
✅ **F6** Audience — evidence: informational — locations: body — count: 0 — fix: Legal information page rather than a buyer-ready service page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No target service keyword is appropriate for a legal terms page. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: Page body: “These Terms apply solely to your use of the Website.” — locations: body — count: 0 — source: Page content
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the descriptive legal-page heading; it identifies the document and is appropriate for this page type. — source: Page content
✅ **H2** Priority — evidence: low — locations: h2 — count: 17 — fix: Low priority: the numbered section headings are clear and useful for navigating the terms. — source: Page content
✅ **H3** Reasons — evidence: C3: the title says “Terms of Service | Globy” and the meta says “for Globy.” | B2: schema uses legalName “Gogloby LLC” instead of “GoGloby LLC”. | A11: the body provides a protected email link returning “404”. | C5: the legal body contains “content — including text” and “of or relating to”. — locations: title, meta, schema, link_text, body — count: 4 — fix: Address the listed brand, schema, contact-link, and punctuation issues. — source: audit.json: C3, A11, C5; Fact Sheet: Identity
