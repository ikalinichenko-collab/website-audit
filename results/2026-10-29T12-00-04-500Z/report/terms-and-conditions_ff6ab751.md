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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#c0aca5a7a1ac80a7afa7acafa2b9eea3afad (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: slogan: "Applied AI Engineering Partner" | legalName: "Gogloby LLC" — locations: schema — count: 3 — fix: Correct the Organization schema slogan, description, and legalName to match approved company facts. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization legalName mismatch_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the Organization legalName to the approved legal name.
  ❌ _Organization slogan mismatch_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove or correct the unapproved slogan in the Organization schema.
  ❌ _Organization description mismatch_ — "We are a US-based talent acquisition agency specializing in assisting tech companies" — locations: schema — count: 1 — fix: Replace the schema description with the approved company description.
➖ **B3** Person data — evidence: The page's code evidence reports no Person nodes. — locations: schema — count: 0 — source: GoGloby Fact Sheet: Founders
❌ **B4** Schema matches the page — evidence: "operating in the AI and software development industry" — locations: body — count: 1 — fix: Correct or remove the industry description so it does not characterize GoGloby as a software development company. — source: GoGloby Fact Sheet: Identity; What GoGloby is not

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
✅ **C2** Context terms — evidence: The supplied code evidence reports no context-term occurrences. — count: 0 — source: GoGloby Glossary §7
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "operating in the AI and software development industry" — locations: body — count: 1 — fix: Review and correct the statement that characterizes the company as operating in software development. — source: GoGloby Fact Sheet: Identity; What GoGloby is not
  ❌ _Company industry description_ — "operating in the AI and software development industry" — locations: body — count: 1 — fix: Correct or remove the software development industry characterization.
➖ **D2** Client figures — evidence: The page body contains no client names with metrics. — locations: body — count: 0 — source: GoGloby Fact Sheet: Featured clients
➖ **D3** Clients not in the Fact Sheet — evidence: The supplied main-content image evidence lists only background images. — locations: image_alt — count: 0 — source: GoGloby Fact Sheet: Featured clients; External recognition
➖ **D4** Press and partners — evidence: The page body does not present client testimonials or review claims. — locations: body — count: 0 — source: GoGloby Fact Sheet: What clients say

## E. Positioning

➖ **E1** Service fit — evidence: not_service_page — locations: h1 — count: 0 — source: decisions.md: Service pages
➖ **E2** Positioning — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: decisions.md: Service pages
➖ **E3** Call to action — evidence: "These Terms apply solely to your use of the Website." — locations: body — count: 0 — source: decisions.md: Service pages
➖ **E4** Lead order — evidence: "Any provision of services by GoGloby is governed exclusively by a separate written agreement" — locations: body — count: 0 — source: GoGloby Fact Sheet: Services

## F. GEO

➖ **F1** Answer first — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9
➖ **F2** Buyer problem — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9
➖ **F3** Recruiting firm stated early — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9
➖ **F4** GoGloby named near claims — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9
➖ **F5** FAQ — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9
➖ **F6** Audience — evidence: not_targeted | Terms of Service | Globy — locations: title — count: 0 — source: GoGloby Glossary §9

## G. Target keyword

➖ **G1** Target keyword — evidence: none | Terms and Conditions — locations: h1 — count: 0 — source: GoGloby Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "Terms of Service | Globy" | "Review the terms of service for Globy." — locations: title, meta — count: 2 — fix: Use the approved company spelling consistently in the title and meta description. — source: decisions.md: Spelling
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: action | 24 characters: "Terms of Service | Globy..." — locations: title — count: 1 — fix: Adjust the title length to the supplied 50–60 character requirement and correct the company spelling. — source: audit.json: seo; decisions.md: Spelling
❌ **H2** Priority — evidence: high | Terms of Service | Globy — locations: title — count: 1 — fix: Correct the company spelling in the title. — source: audit.json: brand_spelling; decisions.md: Spelling
❌ **H3** Reasons — evidence: The title and meta description use the former company name spelling. | The broken internal email-protection link is reported as a 404. — locations: title, meta, link_text — count: 3 — fix: Correct the company spelling in the title and meta description, and repair or remove the broken internal email link. — source: decisions.md: Spelling; checklist: A11
