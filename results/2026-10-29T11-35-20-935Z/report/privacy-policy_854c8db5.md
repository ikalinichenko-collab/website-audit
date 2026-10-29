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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#d9b1ab99beb6beb5b6bba0f7bab6b4 (404) | https://gogloby.com/cdn-cgi/l/email-protection#c0a8b280a7afa7acafa2b9eea3afad (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization “GoGloby”: legalName “Gogloby LLC” differs in spelling from Fact Sheet “GoGloby LLC”; slogan “Applied AI Engineering Partner” conflicts with the approved positioning. | Organization description says “talent acquisition agency” and “US & EU time zones,” rather than the approved Fact Sheet definition. | Founder Sergey description includes “Applied AI Engineering system”; Vit description claims “generating $60M+ in value” and building that system, which are not supported by the source facts. | Schema lists reviewCount “4.9”; Fact Sheet gives “4.9 / 5 from 10 reviews.” | OfferCatalog includes “Applied AI Engineering” services, “AI Staff Augmentation,” and “Hire Applied AI Engineers,” with claims including “Vetted profiles delivered in 72 hours” and “Shortlist delivered in 5 days”; these conflict with approved service names and are unsupported or disallowed claims. | Schema includes unsupported or unavailable sameAs profiles including G2, Trustpilot, DesignRush, and YouTube; Fact Sheet marks G2 and YouTube unavailable, and does not list the other two as official profiles. — locations: schema — count: 1 — fix: Align the Organization fields and service catalog with approved company facts, service names, and claims. Correct the rating review count and remove unsupported or unavailable profile links and claims. — source: decisions.md: Company description; Fact Sheet: Identity, Official profiles, Founders, What clients say, Services; Glossary §§2, 7
❌ **B3** Person data — evidence: Sergey jobTitle “Co-founder & CTO” matches “Co-Founder and CTO” after normalizing ampersand and case; his description includes unsupported “Applied AI Engineering system.” | Vit’s name “Vit Koval” and jobTitle “Co-founder” match the approved “Vitaly (Vit) Koval: Co-Founder”; his description claims “$60M+ in value” and an “Applied AI Engineering system,” unsupported by the founder source. — locations: schema — count: 2 — fix: Keep the matching founder titles; revise founder schema descriptions to remove unsupported claims and align with the approved founder information. — source: decisions.md: Founders; Fact Sheet: Founders
✅ **B4** Schema matches the page — evidence: The page identifies the organization as “GoGloby LLC” and gives its Dover, Delaware address. — locations: body — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: The body states “GoGloby LLC” and “GoGloby,” using the current company name. — locations: body — source: decisions.md: Spelling
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: The policy states “GoGloby LLC is generally the controller or business responsible” for the covered information. — locations: body — source: Fact Sheet: Identity
✅ **D2** Client figures — evidence: The page includes retention periods such as “up to 12 months”; it does not show a Fact Sheet client metric. — locations: body — count: 0 — source: Fact Sheet: Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: The supplied page content contains no client logos or client cards. — locations: body — count: 0 — source: Fact Sheet: Selected clients; Featured clients
✅ **D4** Press and partners — evidence: The policy describes candidate-data handling and states, “We do not sell candidate application information for monetary consideration.” — locations: body — source: Fact Sheet: Legal and security

## E. Positioning

✅ **E1** Service fit — evidence: none — count: 0 — fix: This legal/privacy page does not present a recruiting or staffing service offer. — source: Fact Sheet: Services
✅ **E2** Positioning — evidence: The policy describes candidate applications and recruiting processes: “apply for a job, contractor position, project, placement, or other professional opportunity.” — locations: body — source: Fact Sheet: Services
✅ **E3** Call to action — evidence: The page says, “We will not use candidate personal information for unrelated advertising purposes.” — locations: body — source: Fact Sheet: Legal and security
✅ **E4** Lead order — evidence: The page states, “GoGloby does not make final hiring, engagement, or placement decisions based solely on automated processing.” — locations: body — source: Fact Sheet: Services

## F. GEO

✅ **F1** Answer first — evidence: The page is explicitly headed “Privacy Policy and Candidate Privacy Notice.” — locations: h1 — source: Fact Sheet: Identity
✅ **F2** Buyer problem — evidence: The policy says it applies to people who “visit or interact with gogloby.com” and submit forms or applications. — locations: body — source: Fact Sheet: Identity
✅ **F3** Recruiting firm stated early — evidence: The page states, “GoGloby LLC is generally the controller or business responsible” for covered personal information. — locations: body — source: Fact Sheet: Identity
✅ **F4** GoGloby named near claims — evidence: The policy names several collection categories, including “Identity and contact information” and “Professional and career information.” — locations: body — source: Fact Sheet: Legal and security
✅ **F5** FAQ — evidence: The page includes a “Contact and Privacy Requests” section and says requests may be submitted by email. — locations: h2, body — source: Fact Sheet: Identity
✅ **F6** Audience — evidence: informational — locations: h1, body — fix: This is a legal notice, not a buyer-facing service page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — count: 0 — fix: No target keyword is supplied for this legal page. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: The H1 is “Privacy Policy and Candidate Privacy Notice,” which accurately describes the page. — locations: h1 — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: The H1 accurately identifies the legal notice. No H1 change is needed. — source: Fact Sheet: Identity
✅ **H2** Priority — evidence: low — locations: title, meta — count: 2 — fix: Low priority: update the title and meta description to use the current company name “GoGloby” instead of “Globy.” — source: decisions.md: Spelling
✅ **H3** Reasons — evidence: C3: Page metadata says “Privacy Policy | Globy”; company spelling should be GoGloby. | A11: The supplied link-check evidence reports email links returning “404.” | B2: Organization schema contains unsupported service catalog claims and outdated positioning. | B3: Founder schema descriptions contain unsupported claims. | A2/A3: Supplied checks flag title length and meta-description length. — locations: title, meta, schema, link_text — count: 5 — fix: Resolve the cited issues in the title/meta, email links, and structured data. — source: decisions.md: Spelling; Fact Sheet: Founders, Services; audit evidence A2, A3, A11, C3
