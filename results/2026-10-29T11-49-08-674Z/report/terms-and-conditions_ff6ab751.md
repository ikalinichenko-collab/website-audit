# Page report

- **URL:** https://gogloby.com/terms-and-conditions/
- **Type:** legal
- **Action:** needs_decision
- **Priority:** high

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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#6e020b090f022e09010902010c17400d0103 (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: “GoGloby LLC is a company founded in 2021, operating in the AI and software development industry.” — locations: body, schema — count: 4 — fix: Correct the company description/category in the terms and organization schema to match the approved staffing and recruiting description. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ✅ _Organization name_ — “GoGloby LLC” — locations: body, schema — count: 1
  ❌ _Company description and category_ — “operating in the AI and software development industry” | “Applied AI Engineering Partner” — locations: body, schema — count: 2 — fix: Replace the inaccurate category and positioning in the body and schema with the approved company description.
  ❌ _Legal name_ — “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legalName spelling to match the Fact Sheet.
❌ **B3** Person data — evidence: “Leads the Agentic SDLC methodology” | “Built the Applied AI Engineering system” — locations: schema — count: 2 — fix: Correct unsupported or disallowed founder Person descriptions and fields in the structured data. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — “Leads the Agentic SDLC methodology” | “Applied AI Engineering system” — locations: schema — count: 1 — fix: Revise the Person description and knowsAbout values to remove inaccurate or disallowed positioning.
  ❌ _Vitaly Koval_ — “generating $60M+ in value” | “Built the Applied AI Engineering system” — locations: schema — count: 1 — fix: Revise the Person description and knowsAbout values to use only approved, sourced information and remove disallowed positioning.
❌ **B4** Schema matches the page — evidence: “GoGloby is a company founded in 2021, operating in the AI and software development industry.” — locations: body — count: 1 — fix: Correct the business-category description; GoGloby is a staffing and recruiting agency, not a software development industry provider. — source: GoGloby Fact Sheet: Identity; decisions.md: Company description

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
✅ **C2** Context terms — evidence: “Terms and Conditions” — locations: h1 — count: 0 — source: Glossary §7; supplied context_term_occurrences (none)
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: “Any provision of services by GoGloby is governed exclusively by a separate written agreement” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity and Services; supplied page body
✅ **D2** Client figures — evidence: “The Terms apply solely to your use of the Website.” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity; supplied page body
✅ **D3** Clients not in the Fact Sheet — evidence: “Background” — locations: image_alt — count: 0 — source: GoGloby Fact Sheet: Featured clients; supplied main_content_images
✅ **D4** Press and partners — evidence: “GoGloby LLC8 The Green, Ste. R, Dover, Delaware (DE) 19901, United States” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity; supplied page body

## E. Positioning

➖ **E1** Service fit — evidence: not applicable — source: GoGloby Fact Sheet: Services; supplied page is a legal page
✅ **E2** Positioning — evidence: “They do not, by themselves, create any client, service, advisory, employment, or contractual engagement” — locations: body — count: 0 — source: GoGloby Fact Sheet: Services; supplied page body
✅ **E3** Call to action — evidence: “Any provision of services by GoGloby is governed exclusively by a separate written agreement signed by both parties” — locations: body — count: 0 — source: GoGloby Fact Sheet: Services; supplied page body
➖ **E4** Lead order — evidence: “These Terms apply solely to your use of the Website.” — locations: body — source: GoGloby Fact Sheet: Services; supplied page body

## F. GEO

✅ **F1** Answer first — evidence: “8 The Green, Ste. R, Dover, Delaware (DE) 19901, United States” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
✅ **F2** Buyer problem — evidence: “+1-781-343-1777” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
⚠️ **F3** Recruiting firm stated early — evidence: “[email protected]” — locations: body, link_text — count: 1 — fix: Verify that the displayed contact email and its protected link resolve to the official contact address. — source: GoGloby Fact Sheet: Identity
✅ **F4** GoGloby named near claims — evidence: “founded in 2021” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
✅ **F5** FAQ — evidence: “GoGloby LLC” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
✅ **F6** Audience — evidence: general website users and prospective clients — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity; supplied page body

## G. Target keyword

➖ **G1** Target keyword — evidence: none — source: Glossary §6; supplied trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: “Terms and Conditions” — locations: h1 — count: 0 — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: fail — locations: title — count: 1 — fix: Correct the former company name in the page title. — source: decisions.md: Spelling
❌ **H2** Priority — evidence: high — locations: schema, title — count: 1 — fix: Prioritize correcting the former name and disallowed positioning in the title and structured data. — source: decisions.md: Spelling; Glossary §7
❌ **H3** Reasons — evidence: The title and meta description use the former company name. | The structured data uses disallowed positioning and the old product name. | The provided code reports a broken internal email link. — locations: title, meta, schema, link_text — count: 3 — fix: Address the brand-name, schema terminology, and broken-link issues noted in the audit. — source: decisions.md: Spelling; Glossary §7; supplied code_check_results A11, C1, C3
