# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** needs_decision
- **Priority:** high

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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#b9d1cbf9ded6ded5d6dbc097dad6d4 (404) | https://gogloby.com/cdn-cgi/l/email-protection#adc5dfedcac2cac1c2cfd483cec2c0 (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: slogan: “Applied AI Engineering Partner” | legalName: “Gogloby LLC” — locations: schema, title — count: 4 — fix: Correct the Organization node’s slogan, description, legalName, and name to match the approved company facts and description. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization slogan mismatch_ — “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove or correct the unapproved slogan.
  ❌ _Organization description mismatch_ — “US-based talent acquisition agency specializing in assisting tech companies” — locations: schema — count: 1 — fix: Replace the description with the approved one-sentence company description.
  ❌ _Organization legalName mismatch_ — “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal name to match the Fact Sheet.
  ❌ _Organization name mismatch_ — Title: “Privacy Policy | Globy” — locations: title — count: 1 — fix: Use the approved company spelling consistently in the page title.
➖ **B3** Person data — evidence: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 0 — fix: No Person nodes were supplied for review. — source: GoGloby Fact Sheet: Founders; code evidence: b3_person_evidence
⚠️ **B4** Schema matches the page — evidence: Page body: “GoGloby LLC” — locations: body — count: 1 — fix: Verify the page’s legal-entity references and contact details against the approved company records before publication. — source: GoGloby Fact Sheet: Identity

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
✅ **C2** Context terms — evidence: H1: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 0 — source: GoGloby Glossary §7; code evidence: context_term_occurrences
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: Page body: “GoGloby LLC” — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity
✅ **D2** Client figures — evidence: Page body: “GoGloby client” — locations: body — count: 0 — source: GoGloby Fact Sheet: Featured clients
✅ **D3** Clients not in the Fact Sheet — evidence: Image alt: “Background” — locations: image_alt — count: 0 — source: GoGloby Fact Sheet: Featured clients and External recognition; page main_content_images
⚠️ **D4** Press and partners — evidence: Page body: “up to 24 months” — locations: body — count: 1 — fix: Confirm privacy-policy claims, retention periods, and jurisdiction-specific statements with the responsible legal reviewer; these claims are not verified by the supplied company fact sources. — source: GoGloby Fact Sheet: Legal and security; page body
  ⚠️ _Privacy and retention claims_ — “up to 24 months” — locations: body — count: 1 — fix: Have legal review the stated privacy practices and retention periods; the supplied Fact Sheet does not verify them.

## E. Positioning

➖ **E1** Service fit — evidence: not a service page — locations: h1 — count: 0 — fix: No service-fit assessment is applicable to this legal policy page. — source: decisions.md: Out of scope for now; GoGloby Fact Sheet: Services
✅ **E2** Positioning — evidence: H1: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 1 — source: GoGloby Fact Sheet: Identity
⚠️ **E3** Call to action — evidence: Page body: “GoGloby LLC” — locations: body — count: 1 — fix: Verify the legal statements and entity details with counsel; they are not established by the supplied company fact sources. — source: GoGloby Fact Sheet: Identity; page body
✅ **E4** Lead order — evidence: H1: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 1 — source: GoGloby Fact Sheet: Identity

## F. GEO

✅ **F1** Answer first — evidence: H1: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 1 — source: GoGloby Glossary §9
✅ **F2** Buyer problem — evidence: Page body: “This Notice is intended to apply to individuals” — locations: body — count: 1 — source: GoGloby Glossary §9
✅ **F3** Recruiting firm stated early — evidence: H2: “Your Privacy Rights” — locations: h2 — count: 1 — source: GoGloby Glossary §9
✅ **F4** GoGloby named near claims — evidence: H1: “Privacy Policy and Candidate Privacy Notice” — locations: h1 — count: 1 — source: GoGloby Glossary §9
✅ **F5** FAQ — evidence: Page body: “contact us” — locations: body — count: 1 — source: GoGloby Glossary §9
✅ **F6** Audience — evidence: not_targeted | “visit or interact with gogloby.com” — locations: body — count: 1 — source: GoGloby Glossary §§5, 9

## G. Target keyword

➖ **G1** Target keyword — evidence: none — locations: title — count: 0 — fix: No target keyword was supplied for this legal page. — source: GoGloby Glossary §6; code evidence: trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: Page body: “Privacy Policy and Candidate Privacy Notice” — locations: body — count: 1 — source: GoGloby Glossary §§7–9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

⚠️ **H1** Action — evidence: review — locations: schema — count: 1 — fix: Review and correct the Organization schema fields that conflict with approved company identity and terminology. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity; GoGloby Glossary §7
❌ **H2** Priority — evidence: high — locations: schema, title, meta — count: 1 — fix: Prioritize correcting the company-name inconsistency and the inaccurate Organization schema description, slogan, and legal name. — source: decisions.md: Company description and Spelling; GoGloby Fact Sheet: Identity
⚠️ **H3** Reasons — evidence: The page title uses “Globy” instead of the approved “GoGloby.” | Organization schema includes an unapproved slogan and a description that does not match the approved company description. | The page contains legal and privacy claims that are not verified by the supplied company fact sources. — locations: title, schema, body — count: 3 — fix: Correct the company identity fields and have legal review the unverified privacy-policy claims. — source: decisions.md: Company description and Spelling; GoGloby Fact Sheet: Identity and Legal and security
