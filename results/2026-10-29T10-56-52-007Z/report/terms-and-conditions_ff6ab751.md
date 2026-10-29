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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#9ff3faf8fef3dff8f0f8f3f0fde6b1fcf0f2 (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: H1: “Terms and Conditions” — locations: h1 — count: 1 — source: Page H1
✅ **B3** Person data — evidence: Body: “These Terms and Conditions (the ‘Terms’) govern your access to and use of the website” — locations: body — count: 1 — source: Page body
✅ **B4** Schema matches the page — evidence: H2: “14. Governing Law and Jurisdiction” — locations: h2 — count: 1 — source: Page H2

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: Body: “GoGloby LLC is referred to in these Terms as ‘GoGloby’” — locations: body — count: 1 — source: Page body
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: Body: “GoGloby LLC8 The Green, Ste. R, Dover, Delaware (DE) 19901, United States” — locations: body — count: 1 — source: Page body; Fact Sheet: Identity
✅ **D2** Client figures — evidence: Body: “Phone: +1-781-343-1777” — locations: body — count: 1 — source: Page body; Fact Sheet: Identity
❌ **D3** Clients not in the Fact Sheet — evidence: Schema: “legalName”: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the schema legal name to match the official company spelling. — source: decisions.md: Spelling; Fact Sheet: Identity
❌ **D4** Press and partners — evidence: Schema: “slogan”: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove or correct the schema positioning claim, which conflicts with approved company terminology. — source: Glossary §7

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: This is a terms page, not a service page; no service-fit claims are present in the page text. — source: Page body; Fact Sheet: Services
⚠️ **E2** Positioning — evidence: Body: “operating in the AI and software development industry” — locations: body — count: 1 — fix: Review the industry description for alignment with the approved company description and category. — source: decisions.md: Company description; Fact Sheet: Identity
✅ **E3** Call to action — evidence: Body: “Any provision of services by GoGloby is governed exclusively by a separate written agreement” — locations: body — count: 1 — source: Page body
✅ **E4** Lead order — evidence: Body: “These Terms apply solely to your use of the Website.” — locations: body — count: 1 — source: Page body

## F. GEO

❌ **F1** Answer first — evidence: Title: “Terms of Service | Globy” — locations: title — count: 1 — fix: Use the official company spelling in the title. — source: decisions.md: Spelling
❌ **F2** Buyer problem — evidence: Meta: “Review the terms of service for Globy.” — locations: meta — count: 1 — fix: Use the official company spelling in the meta description. — source: decisions.md: Spelling
✅ **F3** Recruiting firm stated early — evidence: H1: “Terms and Conditions” — locations: h1 — count: 1 — source: Page H1
✅ **F4** GoGloby named near claims — evidence: Body: “These Terms and Conditions (the ‘Terms’) govern your access to and use of the website” — locations: body — count: 1 — source: Page body
⚠️ **F5** FAQ — evidence: Body: “operating in the AI and software development industry” — locations: body — count: 1 — fix: Check the company-industry description against the approved description; avoid implying that GoGloby is a software development shop. — source: Fact Sheet: Identity; Glossary §1
✅ **F6** Audience — evidence: informational — locations: h1, body — count: 1 — fix: This legal page is informational rather than a buyer-ready service page, which is appropriate for its page type. — source: Page H1 and body; Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1, body — count: 0 — fix: No target keyword is warranted for this legal page. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: Schema: “description”: “We are a US-based talent acquisition agency specializing in assisting tech companies” — locations: schema — count: 1 — fix: Align organization schema description with the approved company description. — source: decisions.md: Company description; Fact Sheet: Identity
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: Keep this legal page and its descriptive H1. Separately address the incorrect former-name use in the page title and meta description. — source: decisions.md: Spelling
✅ **H2** Priority — evidence: low — locations: title, meta — count: 2 — fix: Low priority: correct the former-name spelling in title and meta; the page is a legal document and its H1 is appropriate. — source: decisions.md: Spelling
✅ **H3** Reasons — evidence: Title: “Terms of Service | Globy” (F1) | Meta: “Review the terms of service for Globy.” (F2) | Schema: “legalName”: “Gogloby LLC” (D3) | Schema: “slogan”: “Applied AI Engineering Partner” (D4) | Body: “operating in the AI and software development industry” (E2) — locations: title, meta, schema, body — count: 5 — fix: Correct the former-name spelling and review the conflicting schema and company-description claims. — source: decisions.md: Spelling; decisions.md: Company description; Glossary §7
