# Page report

- **URL:** https://gogloby.com/terms-and-conditions/
- **Type:** legal
- **Action:** fix
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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#b1ddd4d6d0ddf1d6ded6ddded3c89fd2dedc (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "name":"GoGloby" | "legalName":"Gogloby LLC" — locations: schema — count: 4 — fix: Correct the Organization schema fields that conflict with the approved company identity, description, and positioning. — source: decisions.md: Company description; Spelling; GoGloby Fact Sheet: Identity
  ✅ _Organization name_ — "name":"GoGloby" — locations: schema — count: 1
  ❌ _Organization legalName_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name to match the approved company spelling and legal name.
  ❌ _Organization slogan_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the prohibited positioning from the Organization schema.
  ❌ _Organization description_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies..." — locations: schema — count: 1 — fix: Use the approved company description in the Organization schema.
➖ **B3** Person data — evidence: No Person nodes are listed in b3_person_evidence. — locations: schema — count: 0 — source: Page audit data: b3_person_evidence
✅ **B4** Schema matches the page — evidence: "name":"GoGloby" | "url":"https://gogloby.com/" — locations: schema — count: 1 — source: GoGloby Fact Sheet: Identity

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
✅ **C2** Context terms — evidence: The supplied context_term_occurrences array is empty. — count: 0 — source: GoGloby Glossary §7; Page audit data: context_term_occurrences
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: "GoGloby LLC is a company founded in 2021" — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
  ✅ _Company founding year_ — "founded in 2021" — locations: body — count: 1
➖ **D2** Client figures — evidence: No Fact Sheet client company is shown with a metric in the page body. — count: 0 — source: GoGloby Fact Sheet: Featured clients; Page audit data: body
➖ **D3** Clients not in the Fact Sheet — evidence: The page images are listed as background images, not client representations. — locations: image_alt — count: 0 — source: GoGloby Fact Sheet: Featured clients; Page audit data: main_content_images
✅ **D4** Press and partners — evidence: "GoGloby LLC8 The Green, Ste. R, Dover, Delaware (DE) 19901, United States" — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
  ✅ _Headquarters address_ — "8 The Green, Ste. R, Dover, Delaware (DE) 19901" — locations: body — count: 1

## E. Positioning

✅ **E1** Service fit — evidence: informational — locations: h1 — count: 1 — source: GoGloby Glossary §9
✅ **E2** Positioning — evidence: "Terms and Conditions" — locations: h1 — count: 1 — source: GoGloby Glossary §9
✅ **E3** Call to action — evidence: "These Terms apply solely to your use of the Website." — locations: body — count: 1 — source: Page audit data: body
✅ **E4** Lead order — evidence: "They do not, by themselves, create any client, service, advisory, employment, or contractual engagement" — locations: body — count: 1 — source: Page audit data: body

## F. GEO

✅ **F1** Answer first — evidence: "Terms and Conditions" — locations: h1 — count: 1 — source: Page audit data: h1
✅ **F2** Buyer problem — evidence: "Please read these Terms carefully." — locations: body — count: 1 — source: Page audit data: body
✅ **F3** Recruiting firm stated early — evidence: "If you do not agree to these Terms, you must not access or use the Website." — locations: body — count: 1 — source: Page audit data: body
✅ **F4** GoGloby named near claims — evidence: "These Terms and Conditions" — locations: h1 — count: 1 — source: Page audit data: h1
✅ **F5** FAQ — evidence: "If you have any questions about these Terms, you may contact us at" — locations: body — count: 1 — source: Page audit data: body
✅ **F6** Audience — evidence: informational | The page states that the terms govern website use and are for general informational context. — locations: body — count: 1 — source: GoGloby Glossary §9; Page audit data: body

## G. Target keyword

➖ **G1** Target keyword — evidence: none | "Terms and Conditions" — locations: h1 — count: 0 — source: Page audit data: trap_term_context
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: "GoGloby LLC is a company founded in 2021" — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: fix — locations: title, meta — count: 3 — fix: Correct the former company name in the title and meta description, and update the Organization schema's mismatched identity and prohibited positioning fields. — source: decisions.md: Spelling; Company description; GoGloby Glossary §7
❌ **H2** Priority — evidence: high — locations: schema — count: 1 — fix: Address the identity and prohibited positioning inconsistencies in structured data; the page is legal content and does not require keyword-targeting changes. — source: decisions.md: Company description; Spelling; GoGloby Glossary §7
❌ **H3** Reasons — evidence: Title and meta description use the former name: "Terms of Service | Globy" and "terms of service for Globy." | Schema uses the incorrect legal-name casing: "legalName":"Gogloby LLC". | Schema contains prohibited positioning: "Applied AI Engineering Partner". — locations: title, meta, schema — count: 3 — fix: Correct the legacy company-name references, legal-name casing, and prohibited schema positioning. — source: decisions.md: Spelling; Company description; GoGloby Glossary §7
