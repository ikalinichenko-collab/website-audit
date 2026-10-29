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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#ee828b898f82ae89818982818c97c08d8183 (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization: legalName “Gogloby LLC” conflicts with Fact Sheet “GoGloby LLC”; slogan “Applied AI Engineering Partner” conflicts with Glossary §7 restriction; description “US-based talent acquisition agency” conflicts with approved description “staffing and recruiting agency”; knowsAbout/keywords and offer catalog use “Applied AI Engineering,” “AI Intelligence Layer,” and “AI Staff Augmentation,” contrary to Glossary §7; aggregateRating reviewCount “4.9” conflicts with Fact Sheet “4.9 / 5 from 10 reviews.” | Website: description “GoGloby is an Applied AI Engineering partner” conflicts with approved company description. — locations: schema — count: 2 — fix: Align Organization and WebSite schema fields with the approved company name, legal name, company description, permitted terminology, service names, and verified review count. Check schema claims and URLs against the source documents before retaining them. — source: decisions.md: Company description; Fact Sheet: Identity, What clients say; Glossary §7
⚠️ **B3** Person data — evidence: Sergey’s jobTitle “Co-founder & CTO” matches “Co-Founder and CTO” after normalizing “&” and case. Vit Koval’s “Co-founder” matches “Co-Founder”; alternateName “Vitaly Koval” is consistent with the approved founder name. Descriptions contain claims not verified by the founder source entries. — locations: schema — count: 2 — fix: Keep the matching names and normalized job titles; verify or remove founder-description claims not substantiated by the founder source entries. — source: decisions.md: Founders; Fact Sheet: Founders
✅ **B4** Schema matches the page — evidence: The page identifies the entity as “GoGloby LLC” in its terms text. — locations: body — count: 0 — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: The page uses “GoGloby” in the body and OG site name. — locations: body, meta — count: 0 — source: decisions.md: Spelling
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: The page states “Effective Date: June 2, 2026” and “Last Updated: June 2, 2026”; no conflicting source-date claim is supplied. — locations: body — count: 0 — source: Page content
✅ **D2** Client figures — evidence: The page contains no Fact Sheet client metrics; its “one hundred U.S. dollars (US$100)” liability cap is not a client metric. — locations: body — count: 0 — source: Fact Sheet: Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: No client logos or client cards are shown in the supplied page content. — locations: body — count: 0 — source: Fact Sheet: Selected clients; Featured clients
✅ **D4** Press and partners — evidence: The page states “8 The Green, Ste. R, Dover, Delaware (DE) 19901, United States,” consistent with the Fact Sheet headquarters. — locations: body — count: 0 — source: Fact Sheet: Identity

## E. Positioning

✅ **E1** Service fit — evidence: both — locations: body — count: 1 — fix: The terms page describes the company, not a specific service page; its wording does not contradict staffing and recruiting as the company’s service fit. — source: Fact Sheet: Identity, Services
✅ **E2** Positioning — evidence: “They do not, by themselves, create any client, service, advisory, employment, or contractual engagement” appropriately limits the legal terms to website use. — locations: body — count: 0 — source: Fact Sheet: Services
✅ **E3** Call to action — evidence: The page describes the website as “provided for general informational purposes”; this is legal-purpose language, not an informational content strategy or service claim. — locations: body — count: 0 — source: Glossary §9
✅ **E4** Lead order — evidence: The page makes no separate recruiting or staffing guarantee claim; it says services require “a separate written agreement signed by both parties.” — locations: body — count: 0 — source: Fact Sheet: Services

## F. GEO

✅ **F1** Answer first — evidence: The H1 is “Terms and Conditions,” matching the legal page subject. — locations: h1 — count: 1 — source: Page content
✅ **F2** Buyer problem — evidence: The H2 sequence runs from “1. About GoGloby and Scope of These Terms” through “17. Contact Us,” providing a clear legal-document structure. — locations: h2 — count: 17 — source: Page content
✅ **F3** Recruiting firm stated early — evidence: The opening body identifies the document as “These Terms and Conditions” and states what they govern. — locations: body — count: 1 — source: Page content
✅ **F4** GoGloby named near claims — evidence: The page provides “GoGloby LLC” and the Dover, Delaware address in its contact section. — locations: body — count: 1 — source: Fact Sheet: Identity
✅ **F5** FAQ — evidence: The contact section lists “Phone: +1-781-343-1777,” matching the Fact Sheet phone digits. — locations: body — count: 1 — source: Fact Sheet: Identity
✅ **F6** Audience — evidence: not_targeted — locations: body — count: 1 — fix: This is a legal terms page, not a buyer-acquisition page; no audience or service positioning change is needed. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No service-target keyword is appropriate for this legal page. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: The page’s “Terms and Conditions” heading is plainly descriptive of its legal-document purpose. — locations: h1 — count: 0 — source: Page content
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep the legal-page H1 “Terms and Conditions”; it accurately identifies the document. — source: Page content
✅ **H2** Priority — evidence: low — locations: title, meta — count: 2 — fix: Low priority: replace the former name “Globy” in the title and meta description with the current company name. The title is also flagged as short by the supplied code check. — source: decisions.md: Spelling
✅ **H3** Reasons — evidence: Title spelling needs correction: “Terms of Service | Globy” uses the former name (C3). | Schema identity and positioning fields need review: “Applied AI Engineering Partner” conflicts with approved terminology (B2). | The title length is flagged: “24 characters” (A2). — locations: title, schema — count: 3 — fix: Prioritize the current company name in the title and audit the outdated schema fields; title length is a lower-priority legal-page SEO issue. — source: decisions.md: Spelling; Glossary §7
