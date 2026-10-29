# Page report

- **URL:** https://gogloby.com/terms-and-conditions/
- **Type:** legal
- **Action:** needs_decision
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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#9df1f8fafcf1ddfaf2faf1f2ffe4b3fef2f0 (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "slogan":"Applied AI Engineering Partner" | "legalName":"Gogloby LLC" — locations: schema — count: 4 — fix: Correct the Organization schema slogan, description, and legalName to match approved identity facts. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ✅ _Organization node: name_ — "name":"GoGloby" — locations: schema — count: 1
  ❌ _Organization node: legalName_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legalName capitalization to match the Fact Sheet.
  ❌ _Organization node: slogan_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the disallowed positioning phrase from the Organization schema.
  ❌ _Organization node: description_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies — locations: schema — count: 1 — fix: Replace the schema description with the approved company description.
✅ **B3** Person data — evidence: "founder": [ — locations: schema — count: 0 — source: decisions.md: Founders; GoGloby Fact Sheet: Founders
❌ **B4** Schema matches the page — evidence: "Terms of Service | Globy" — locations: title — count: 1 — fix: Correct the former company name in the page title. — source: decisions.md: Spelling

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
✅ **C2** Context terms — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: "prospective clients and other interested parties" — locations: body — count: 0 — source: GoGloby Fact Sheet: Selected clients
✅ **D2** Client figures — evidence: "The Website is provided for general informational purposes" — locations: body — count: 0 — source: GoGloby Fact Sheet: Featured clients
✅ **D3** Clients not in the Fact Sheet — evidence: "Background" — locations: image_alt — count: 0 — source: GoGloby Fact Sheet: Featured clients; External recognition
✅ **D4** Press and partners — evidence: "company founded in 2021" — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
  ✅ _Founded in 2021_ — "company founded in 2021" — locations: body — count: 1

## E. Positioning

➖ **E1** Service fit — evidence: not_applicable — locations: body — count: 0 — source: GoGloby Fact Sheet: Services
✅ **E2** Positioning — evidence: "Terms and Conditions" — locations: h1 — count: 1 — source: GoGloby Fact Sheet: Identity
✅ **E3** Call to action — evidence: "These Terms apply solely to your use of the Website." — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
✅ **E4** Lead order — evidence: "Any provision of services by GoGloby is governed exclusively by a separate written agreement" — locations: body — count: 1 — source: GoGloby Fact Sheet: Services

## F. GEO

➖ **F1** Answer first — evidence: "These Terms and Conditions" — locations: body — count: 0 — source: GoGloby Glossary §9: How we write
✅ **F2** Buyer problem — evidence: "Terms and Conditions" — locations: h1 — count: 1 — source: GoGloby Glossary §9: How we write
➖ **F3** Recruiting firm stated early — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9: How we write
✅ **F4** GoGloby named near claims — evidence: "Please read these Terms carefully." — locations: body — count: 1 — source: GoGloby Glossary §9: How we write
✅ **F5** FAQ — evidence: "The Website is provided for general informational purposes" — locations: body — count: 1 — source: GoGloby Glossary §9: How we write
✅ **F6** Audience — evidence: informational — locations: body — count: 1 — source: GoGloby Glossary §9: How we write

## G. Target keyword

➖ **G1** Target keyword — evidence: none — count: 0 — source: GoGloby Glossary §6: Terms we use
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: "Terms and Conditions" — locations: h1 — count: 0 — source: GoGloby Glossary §9: How we write
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: review — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
✅ **H2** Priority — evidence: low — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
✅ **H3** Reasons — evidence: - Legal terms page, rather than a service landing page. | - The body explicitly says it is for general informational purposes. | - No buyer-oriented service pitch or hire-focused call to action appears. — locations: body — count: 3 — source: GoGloby Glossary §9: How we write
