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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#365a5351575a765159515a59544f1855595b (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Page identifies the entity as “GoGloby LLC”; the Organization schema has mismatched slogan and description fields. — locations: schema — count: 4 — fix: Correct the Organization schema slogan, description, and legalName to match approved company information. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ✅ _Organization node — name_ — Page: “GoGloby LLC”; schema name: “GoGloby”. — locations: schema — count: 1
  ❌ _Organization node — legalName_ — Page: “GoGloby LLC”; schema legalName: “Gogloby LLC”. — locations: schema — count: 1 — fix: Correct the schema legalName spelling to match the legal name shown on the page and in the Fact Sheet.
  ❌ _Organization node — slogan_ — Page identifies the company as “GoGloby LLC”; schema slogan is “Applied AI Engineering Partner”. — locations: schema — count: 1 — fix: Remove the unapproved slogan from the Organization schema.
  ❌ _Organization node — description_ — Page describes GoGloby as “operating in the AI and software development industry”; schema describes a “talent acquisition agency”. — locations: schema — count: 1 — fix: Replace the schema description with the approved company description.
❌ **B3** Person data — evidence: “Sergey Matikaynen” | “Vit Koval” — locations: schema — count: 2 — fix: Review the Person descriptions and knowsAbout values against approved founder information; remove unsupported or disallowed claims. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders
  ❌ _Sergey Matikaynen_ — “Leads the Agentic SDLC methodology, secure development environment design” | “Applied AI Engineering” — locations: schema — count: 1 — fix: Revise the description and knowsAbout values to remove unsupported claims and terminology that conflicts with approved positioning.
  ❌ _Vit Koval_ — “generating $60M+ in value” | “Applied AI Engineering system” — locations: schema — count: 1 — fix: Revise the description and knowsAbout values to remove unsupported claims and terminology that conflicts with approved positioning.
✅ **B4** Schema matches the page — evidence: The page states “GoGloby LLC”. — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity

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
✅ **C2** Context terms — evidence: “Terms and Conditions” — locations: h1 — count: 0 — source: GoGloby Glossary §7; code evidence: context_term_occurrences
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: “operating in the AI and software development industry” — locations: body — count: 1 — fix: Correct the company-industry description to align with the approved company category and positioning. — source: GoGloby Fact Sheet: Identity
  ❌ _Company industry description_ — “operating in the AI and software development industry” — locations: body — count: 1 — fix: Review and correct the industry description; GoGloby is a staffing and recruiting agency, not a software development shop.
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: “GoGloby LLC Effective Date: June 2, 2026” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **E2** Positioning — evidence: “These Terms apply solely to your use of the Website.” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

✅ **F1** Answer first — evidence: “These Terms and Conditions” — locations: h1 — count: 0 — source: GoGloby Glossary §9
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F4** GoGloby named near claims — evidence: “The Website is provided for general informational purposes” — locations: body — count: 0 — source: GoGloby Glossary §9
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F6** Audience — evidence: informational — locations: body — count: 0 — source: GoGloby Glossary §9

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G4** Competing pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## H. Recommendation

✅ **H1** Action — evidence: none — count: 0 — source: GoGloby Glossary §6
✅ **H2** Priority — evidence: none — count: 0 — source: GoGloby Glossary §6
✅ **H3** Reasons — evidence: Legal terms page, not a service or hiring-intent landing page. | No target keyword is supplied for the page. — locations: body — count: 0 — source: GoGloby Glossary §§6, 9
