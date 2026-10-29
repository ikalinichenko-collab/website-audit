# Page report

- **URL:** https://gogloby.com/terms-and-conditions/
- **Type:** legal
- **Action:** needs_decision
- **Priority:** medium

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
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#e18d8486808da1868e868d8e8398cf828e8c (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Schema slogan: “Applied AI Engineering Partner” | Schema description: “US-based talent acquisition agency” — locations: schema, body — count: 3 — fix: Correct the organization schema slogan, description, and legalName to match the approved company identity and description. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization 1 slogan_ — Schema slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove the unapproved slogan from the organization schema.
  ❌ _Organization 1 description_ — Schema description: “We are a US-based talent acquisition agency” — locations: schema — count: 1 — fix: Replace the schema description with the approved company description.
  ❌ _Organization 1 legalName_ — Page identifies “GoGloby LLC”; schema legalName is “Gogloby LLC” — locations: schema, body — count: 1 — fix: Correct the legalName capitalization in the organization schema.
❌ **B3** Person data — evidence: Sergey: “technical architecture behind the Applied AI Engineering system” | Vit: “generating $60M+ in value” — locations: schema — count: 2 — fix: Review both Person nodes and remove unsupported or unapproved descriptions, knowsAbout entries, and sameAs profile URLs. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders and Official profiles
  ❌ _Sergey Matikaynen_ — Description: “technical architecture behind the Applied AI Engineering system” | sameAs: “https://www.linkedin.com/in/sergeymatikaynen/” — locations: schema — count: 1 — fix: Correct the Person description and knowsAbout claims to approved, supported information; remove or verify the LinkedIn URL, which is not listed as an official profile.
  ❌ _Vit Koval_ — Description: “generating $60M+ in value” | sameAs: “https://www.linkedin.com/in/vitalykoval/” — locations: schema — count: 1 — fix: Correct the Person description and knowsAbout claims to approved, supported information; remove or verify the LinkedIn URL, which is not listed as an official profile.
✅ **B4** Schema matches the page — evidence: The page identifies the entity as “GoGloby LLC”. — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity

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
✅ **C2** Context terms — evidence: Page text: “These Terms and Conditions” — locations: body — count: 0 — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: The page calls GoGloby “operating in the AI and software development industry.” — locations: body — count: 1 — fix: Correct the company-industry description to reflect its staffing and recruiting category. — source: GoGloby Fact Sheet: Identity
  ❌ _Company industry description_ — “operating in the AI and software development industry” — locations: body — count: 1 — fix: Correct the company-industry description to match the approved identity.
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: The page states “GoGloby LLC” and gives the Dover, Delaware address. — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **E2** Positioning — evidence: The page says the terms “govern your access to and use of the website.” — locations: body — count: 0 — source: Page content: Terms and Conditions
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

✅ **F1** Answer first — evidence: The page describes its purpose as “general informational purposes” and explains website-use terms. — locations: body — count: 0 — source: GoGloby Glossary §9: How we write
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F4** GoGloby named near claims — evidence: The page includes “Effective Date: June 2, 2026” and “Last Updated: June 2, 2026.” — locations: body — count: 0 — source: Page content: Terms and Conditions
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F6** Audience — evidence: informational | The page says it is “provided for general informational purposes.” — locations: body — count: 0 — source: GoGloby Glossary §9: How we write

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G4** Competing pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## H. Recommendation

❌ **H1** Action — evidence: Globy — locations: title, meta — count: 2 — fix: Correct the former company name in the title and meta description. — source: decisions.md: Spelling
✅ **H2** Priority — evidence: informational — locations: body — count: 0 — source: GoGloby Glossary §9: How we write
❌ **H3** Reasons — evidence: The title uses the former name: “Terms of Service | Globy”. | The page describes GoGloby as operating in the “AI and software development industry,” conflicting with its approved staffing and recruiting category. — locations: title, body — count: 2 — fix: Correct the former name in the title and the company-industry description in the body. — source: decisions.md: Spelling; GoGloby Fact Sheet: Identity
