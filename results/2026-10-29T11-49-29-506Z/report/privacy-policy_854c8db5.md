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
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#f69e84b69199919a99948fd895999b (404) | https://gogloby.com/cdn-cgi/l/email-protection#e28a90a2858d858e8d809bcc818d8f (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "legalName":"Gogloby LLC" | "email":"hr@gogloby.com" — locations: schema — count: 3 — fix: Correct the legal name and review count to match approved sources; use the approved company email where the schema represents the company contact. — source: GoGloby Fact Sheet §Identity; §What clients say; decisions.md §Company description
  ❌ _Legal name_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the schema legal name to match the Fact Sheet.
  ❌ _Contact email_ — "email":"hr@gogloby.com" — locations: schema — count: 1 — fix: Use the approved sales email for the organization-level contact, or clarify that this is candidate support.
  ❌ _Review count_ — "reviewCount":4.9 — locations: schema — count: 1 — fix: Correct or remove the review count; the Fact Sheet specifies 10 verified Clutch reviews.
❌ **B3** Person data — evidence: "description":"Co-founder & CTO of GoGloby. Leads the Agentic SDLC methodology" | "description":"Co-founder of GoGloby. For the past decade, has helped engineering leaders scale teams" — locations: schema — count: 2 — fix: Update Person descriptions and knowsAbout fields to remove unsupported or disallowed positioning and align founder information with approved sources. — source: GoGloby Fact Sheet §Founders; decisions.md §Founders; Glossary §7 Terms and claims we do not use
  ❌ _Sergey Matikaynen_ — "description":"Co-founder & CTO of GoGloby. Leads the Agentic SDLC methodology" | "Applied AI Engineering" — locations: schema — count: 1 — fix: Revise the description and knowsAbout entries to use approved founder facts and avoid disallowed positioning.
  ❌ _Vit Koval / Vitaly Koval_ — "description":"Co-founder of GoGloby. For the past decade, has helped engineering leaders scale teams" | "Applied AI Engineering Partnerships" — locations: schema — count: 1 — fix: Revise the description and knowsAbout entries to align with approved founder facts and avoid disallowed positioning.
❌ **B4** Schema matches the page — evidence: "slogan":"Applied AI Engineering Partner" | "description":"We are a US-based talent acquisition agency" — locations: schema — count: 2 — fix: Replace the unsupported slogan and organization description with the approved company description. — source: decisions.md §Company description; GoGloby Fact Sheet §Identity

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
✅ **C2** Context terms — evidence: "h1":"Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — source: Glossary §7 Terms and claims we do not use; supplied context_term_occurrences
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

➖ **D1** Company facts — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — fix: No client-claim assessment applies to this legal policy page. — source: GoGloby Fact Sheet §Featured clients
➖ **D2** Client figures — evidence: "GoGloby does not sell candidate application information" — locations: body — count: 0 — fix: No client-figure assessment applies to this legal policy page. — source: GoGloby Fact Sheet §Featured clients; §Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: "alt":"Background" — locations: image_alt — count: 0 — source: GoGloby Fact Sheet §Featured clients; supplied main_content_images
➖ **D4** Press and partners — evidence: "external_links": [] — locations: link_text — count: 0 — fix: No press or partner claim assessment applies to this legal policy page. — source: GoGloby Fact Sheet §External recognition

## E. Positioning

✅ **E1** Service fit — evidence: legal — count: 1 — source: GoGloby Fact Sheet §Identity; supplied page_type
✅ **E2** Positioning — evidence: "Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information" — locations: body — count: 1 — source: GoGloby Fact Sheet §Legal and security
✅ **E3** Call to action — evidence: "GoGloby LLC is generally the controller or business responsible" — locations: body — count: 1 — source: GoGloby Fact Sheet §Identity
⚠️ **E4** Lead order — evidence: "GoGloby also operates through teams and business locations in Latin America and Europe." — locations: body — count: 1 — fix: Verify the operational-location claim against an approved source before retaining it. — source: GoGloby Fact Sheet §Identity

## F. GEO

✅ **F1** Answer first — evidence: "This Notice is intended to apply to individuals in the United States, the European Economic Area (“EEA”), and Latin America" — locations: body — count: 1 — source: GoGloby Fact Sheet §Identity; §Services
⚠️ **F2** Buyer problem — evidence: "Effective Date: September 16, 2026" — locations: body — count: 1 — fix: Confirm the effective and last-updated dates before publication; the Fact Sheet does not establish a policy date. — source: GoGloby Fact Sheet §Last updated
✅ **F3** Recruiting firm stated early — evidence: "Questions, concerns, and requests relating to personal information may be submitted to" — locations: body — count: 1 — source: GoGloby Fact Sheet §Identity
✅ **F4** GoGloby named near claims — evidence: "GoGloby does not make final hiring, engagement, or placement decisions based solely on automated processing" — locations: body — count: 1 — source: GoGloby Fact Sheet §Legal and security
⚠️ **F5** FAQ — evidence: "For EEA-related inquiries, you may also contact us through our European business location" — locations: body — count: 1 — fix: Verify the listed European location and contact details against an approved source. — source: GoGloby Fact Sheet §Identity
✅ **F6** Audience — evidence: Candidates and applicants — locations: h1, body — count: 1 — source: GoGloby Fact Sheet §Identity; supplied page body

## G. Target keyword

➖ **G1** Target keyword — evidence: none — count: 0 — fix: No target keyword is supplied for this legal page. — source: Glossary §6 Terms we use; supplied trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 1 — source: Glossary §9 How we write
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: none — count: 0 — source: Glossary §9 How we write
✅ **H2** Priority — evidence: low — count: 0 — source: GoGloby Fact Sheet §Identity
⚠️ **H3** Reasons — evidence: The title and meta description use the former name: “Privacy Policy | Globy”. | Organization schema has a misspelled legal name: “Gogloby LLC”. | Organization schema includes disallowed or outdated positioning, including “Applied AI Engineering Partner” and “AI-native production”. | Schema contains unsupported operational and service claims not established by the approved sources. — locations: title, meta, schema — count: 4 — fix: Prioritize brand consistency and schema accuracy; verify unsupported legal and operational details before publication. — source: decisions.md §Spelling; §Company description; GoGloby Fact Sheet §Identity; Glossary §7 Terms and claims we do not use
