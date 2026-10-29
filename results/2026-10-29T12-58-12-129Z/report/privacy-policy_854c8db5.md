# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** needs_decision
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
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#09617b496e666e65666b70276a6664 (404) | https://gogloby.com/cdn-cgi/l/email-protection#ddb5af9dbab2bab1b2bfa4f3beb2b0 (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "slogan":"Applied AI Engineering Partner" | "legalName":"Gogloby LLC" — locations: schema — count: 4 — fix: Correct the Organization schema slogan, description, and legalName to match approved company information. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization 1 — slogan_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove or correct the unapproved slogan.
  ❌ _Organization 1 — description_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire the world's most thoroughly vetted talent within the US & EU time zones." — locations: schema — count: 1 — fix: Replace the schema description with the approved one-sentence description verbatim.
  ❌ _Organization 1 — legalName_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name’s capitalization to match the Fact Sheet.
  ✅ _Organization 1 — name_ — "name":"GoGloby" — locations: schema — count: 1
❌ **B3** Person data — evidence: "Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system." | "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe — generating $60M+ in value." — locations: schema — count: 2 — fix: Align Person schema descriptions and knowsAbout fields with approved founder information, and remove or verify profile URLs not listed as official. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders and Official profiles
  ❌ _Sergey Matikaynen_ — "description":"Co-founder & CTO of GoGloby. Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system." | "sameAs":["https://www.linkedin.com/in/sergeymatikaynen/"] — locations: schema — count: 1 — fix: Align the description and knowsAbout claims with the Fact Sheet, and remove or verify the LinkedIn URL; it is not listed among official profiles.
  ❌ _Vit Koval_ — "description":"Co-founder of GoGloby. For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe — generating $60M+ in value." | "sameAs":["https://www.linkedin.com/in/vitalykoval/"] — locations: schema — count: 1 — fix: Align the description and knowsAbout claims with the Fact Sheet, and remove or verify the LinkedIn URL; it is not listed among official profiles.
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
✅ **C2** Context terms — evidence: No context-term occurrences were supplied by code; the page title is “Privacy Policy | Globy”. — locations: title — count: 0 — source: GoGloby Glossary §7: Terms and claims we do not use; code_check_results.context_term_occurrences (empty)
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: “GoGloby LLC Effective Date: September 16, 2026” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: “GoGloby LLC” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **E2** Positioning — evidence: “GoGloby LLC (‘GoGloby,’ ‘we,’ ‘us,’ or ‘our’) respects your privacy” — locations: first_paragraph — count: 0 — source: GoGloby Glossary §9: How we write
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

✅ **F1** Answer first — evidence: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 0 — source: GoGloby Glossary §9: How we write
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F4** GoGloby named near claims — evidence: “This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information” — locations: body — count: 0 — source: GoGloby Glossary §9: Answer first
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F6** Audience — evidence: informational | “This Notice is intended to apply to individuals in the United States, the European Economic Area (‘EEA’), and Latin America” — locations: body — count: 0 — source: GoGloby Glossary §9: Write only for buyers who are ready to hire

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G4** Competing pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## H. Recommendation

❌ **H1** Action — evidence: none | “Privacy Policy | Globy” — locations: title — count: 0 — fix: Use the approved company name in the title. — source: decisions.md: Spelling
⚠️ **H2** Priority — evidence: low | “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 0 — fix: Review the title and meta description for length and company-name consistency. — source: audit.json: seo
⚠️ **H3** Reasons — evidence: - Page title uses former company name: “Privacy Policy | Globy”. | - Meta description also uses the former name: “Read Globy's privacy policy”. | - Body identifies the entity as GoGloby LLC, so page identity is inconsistent. — locations: title, meta, body — count: 2 — fix: Correct the former-name references in the title and meta description; retain the policy’s legal substance for appropriate legal review. — source: decisions.md: Spelling
