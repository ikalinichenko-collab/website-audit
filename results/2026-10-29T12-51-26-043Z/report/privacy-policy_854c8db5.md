# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** needs_decision
- **Priority:** medium

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
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#abc3d9ebccc4ccc7c4c9d285c8c4c6 (404) | https://gogloby.com/cdn-cgi/l/email-protection#aac2d8eacdc5cdc6c5c8d384c9c5c7 (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Schema slogan: "Applied AI Engineering Partner" | Schema description: "We are a US-based talent acquisition agency specializing in assisting tech companies" — locations: schema — count: 3 — fix: Align the Organization schema slogan and description with approved company positioning and correct the legal-name capitalization. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization 1 slogan mismatch_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove or revise the unapproved slogan.
  ❌ _Organization 1 description mismatch_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire the world's most thoroughly vetted talent within the US & EU time zones." — locations: schema — count: 1 — fix: Replace the schema description with the approved company description.
  ❌ _Organization 1 legalName mismatch_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal-name capitalization to match the source of truth.
❌ **B3** Person data — evidence: Sergey: "Leads the Agentic SDLC methodology" and "Applied AI Engineering system" | Vit: "generating $60M+ in value" — locations: schema — count: 2 — fix: Revise Person descriptions and knowsAbout fields to remove unsupported or disallowed claims, and remove unverified sameAs profile URLs. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — "Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system." | "sameAs":["https://www.linkedin.com/in/sergeymatikaynen/"] — locations: schema — count: 1 — fix: Remove or substantiate the unsupported description and knowsAbout claims, and verify or remove the unlisted profile URL.
  ❌ _Vit Koval_ — "generating $60M+ in value" | "sameAs":["https://www.linkedin.com/in/vitalykoval/"] — locations: schema — count: 1 — fix: Remove or substantiate the unsupported description and knowsAbout claims, and verify or remove the unlisted profile URL.
✅ **B4** Schema matches the page — evidence: "GoGloby LLC (“GoGloby,” “we,” “us,” or “our”)" — locations: body — count: 0 — source: decisions.md: Spelling

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: "Agentic Workflow","AI Intelligence Layer (engineering teleme | AI-native production: ns engineering into AI-native production. It puts Claude int — locations: schema — count: 12 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Remove or rephrase "AI-native production". Replace "Applied AI Engineering partner" with the approved company description. — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — "Agentic Workflow","AI Intelligence Layer (engineering teleme | "Agentic Workflow","AI Intelligence Layer","AI development in — locations: schema — count: 3 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ✅ _AI Engineering Visibility_
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ns engineering into AI-native production. It puts Claude int | ng engineering into AI-native production: every AI dollar vi — locations: schema — count: 2 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — 1-01.png","slogan":"Applied AI Engineering Partner","description":"We | en"],"knowsAbout":["Applied AI Engineering Partner","Applied AI Engine — locations: schema — count: 6 — fix: Replace "Applied AI Engineering partner" with the approved company description.
  ✅ _Applied AI Company_
  ✅ _AI Production Engineering_
  ✅ _AI Leadership Search_
  ❌ _every AI dollar visible_ — -native production: every AI dollar visible, every feature ship — locations: schema — count: 1 — fix: Remove or rephrase "every AI dollar visible".
  ✅ _AI talent staffing_
  ✅ _Staffing gives capacity_
  ✅ _owns outcomes_
  ✅ _free trial_
  ✅ _hire in 48 hours_
  ✅ _mid-level_
  ✅ _mid level_
✅ **C2** Context terms — evidence: No context-term occurrences were supplied by code evidence; the page body contains no supplied candidate occurrence. — locations: body — count: 0 — source: Glossary §7
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: "GoGloby also operates through teams and business locations in Latin America and Europe." — locations: body — count: 1 — fix: Verify the stated business locations against an approved source or remove the unsupported claim. — source: GoGloby Fact Sheet: Identity; GoGloby Glossary §10
  ⚠️ _Business locations in Latin America and Europe_ — "GoGloby also operates through teams and business locations in Latin America and Europe." — locations: body — count: 1 — fix: Verify the stated business locations against an approved source or remove the unsupported claim.
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: "GoGloby uses administrative, technical, and organizational safeguards designed to protect personal information" — locations: body — count: 0 — source: GoGloby Fact Sheet: Legal and security

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **E2** Positioning — evidence: "This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information" — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

✅ **F1** Answer first — evidence: "This Notice is intended to apply to individuals in the United States, the European Economic Area (“EEA”), and Latin America" — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F4** GoGloby named near claims — evidence: "For privacy questions or requests, contact: Email: [email protected]" — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F6** Audience — evidence: informational | "Privacy Policy and Candidate Privacy Notice" — locations: title, h1 — count: 0 — source: Glossary §9

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G4** Competing pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## H. Recommendation

✅ **H1** Action — evidence: none | "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — source: Glossary §6
➖ **H2** Priority — evidence: not_applicable | "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — source: Glossary §6
✅ **H3** Reasons — evidence: - Legal/privacy-policy content rather than a hiring-service or informational marketing page. | - No service-targeting keyword is apparent in the title or H1. — locations: title, h1 — count: 0 — source: Glossary §9
