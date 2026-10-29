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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#79110b391e161e15161b00571a1614 (404) | https://gogloby.com/cdn-cgi/l/email-protection#ea8298aa8d858d86858893c4898587 (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: legalName: "Gogloby LLC" | slogan: "Applied AI Engineering Partner" — locations: schema — count: 4 — fix: Correct the Organization legalName, slogan, and description to align with the approved company facts and positioning. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ✅ _Organization name_ — name: "GoGloby" — locations: schema — count: 1
  ❌ _Organization legalName_ — legalName: "Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name to match the Fact Sheet.
  ❌ _Organization slogan_ — slogan: "Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the unapproved positioning term from the Organization schema.
  ❌ _Organization description_ — description: "We are a US-based talent acquisition agency specializing in assisting tech companies..." — locations: schema — count: 1 — fix: Replace the description with the approved company description.
➖ **B3** Person data — evidence: No Person nodes were supplied; the page's Organization schema has no founder Person nodes in the code evidence. — locations: schema — count: 0 — source: GoGloby Fact Sheet: Founders; code evidence: b3_person_evidence
❌ **B4** Schema matches the page — evidence: sameAs includes "https://www.g2.com/products/gogloby/reviews" — locations: schema — count: 1 — fix: Remove or verify profile URLs that are listed as unavailable in the Fact Sheet; retain the additional Facebook and X profiles confirmed in decisions.md. — source: decisions.md: Official profiles; GoGloby Fact Sheet: Official profiles (sameAs)

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
✅ **C2** Context terms — evidence: No context-term occurrences were supplied for this page. — count: 0 — source: GoGloby Glossary §7; context_term_occurrences
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: "Effective Date: September 16, 2026" — locations: body — count: 1 — fix: Verify and correct the effective and last-updated dates against approved company records. — source: GoGloby Fact Sheet: Last updated
  ⚠️ _Privacy notice effective date_ — "Effective Date: September 16, 2026" — locations: body — count: 1 — fix: Confirm the date is accurate and approved; the Fact Sheet does not establish the privacy notice's effective date.
➖ **D2** Client figures — evidence: No Fact Sheet client company with a metric is shown in the page content. — count: 0 — source: GoGloby Fact Sheet: Featured clients; page body
➖ **D3** Clients not in the Fact Sheet — evidence: Main content image evidence contains only "Background" images. — locations: image_alt — count: 0 — source: GoGloby Fact Sheet: Featured clients; page main_content_images
⚠️ **D4** Press and partners — evidence: "Email: [email protected]" — locations: body — count: 1 — fix: Check privacy contact details and the stated operational, legal, and security claims with the responsible teams before publication. — source: GoGloby Fact Sheet: Identity; Legal and security
  ⚠️ _Privacy contact and policy claims_ — "Email: [email protected]" | "GoGloby uses administrative, technical, and organizational safeguards" — locations: body — count: 1 — fix: Verify the privacy contact address and policy statements with the responsible legal and security owners.

## E. Positioning

✅ **E1** Service fit — evidence: informational — locations: h1 — count: 1 — source: GoGloby Glossary §9
✅ **E2** Positioning — evidence: The page is a privacy notice, not a service offer; it describes how personal information is handled. — locations: h1, body — count: 1 — source: GoGloby Glossary §9; page H1 and body
✅ **E3** Call to action — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 1 — source: GoGloby Glossary §9; page H1
⚠️ **E4** Lead order — evidence: "This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information" — locations: body — count: 1 — fix: Have the notice reviewed for legal accuracy and jurisdiction-specific completeness. — source: GoGloby Fact Sheet: Legal and security

## F. GEO

✅ **F1** Answer first — evidence: "Your Privacy Rights" — locations: h2 — count: 1 — source: GoGloby Fact Sheet: Legal and security
✅ **F2** Buyer problem — evidence: "GoGloby LLC" — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
⚠️ **F3** Recruiting firm stated early — evidence: "Email: [email protected]" — locations: body — count: 1 — fix: Ensure the privacy contact address is a usable, monitored contact channel. — source: GoGloby Fact Sheet: Identity
✅ **F4** GoGloby named near claims — evidence: "GoGloby LLC8 The Green, Ste. RDover, Delaware 19901United States" — locations: body — count: 1 — source: GoGloby Fact Sheet: Identity
⚠️ **F5** FAQ — evidence: "We do not sell candidate application information for monetary consideration." — locations: body — count: 1 — fix: Confirm privacy disclosures and legal statements with counsel before publication. — source: GoGloby Fact Sheet: Legal and security
✅ **F6** Audience — evidence: informational | not_targeted — locations: h1, body — count: 1 — source: GoGloby Glossary §9

## G. Target keyword

➖ **G1** Target keyword — evidence: none — count: 0 — source: GoGloby Glossary §6; trap_term_context
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 1 — source: GoGloby Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

⚠️ **H1** Action — evidence: review — locations: title, meta, schema — count: 4 — fix: Review the indexed title and meta description for the former company name; validate the structured data separately. — source: decisions.md: Spelling
❌ **H2** Priority — evidence: high — locations: schema — count: 1 — fix: Prioritize correcting schema's obsolete positioning and unapproved service-catalog claims; also address broken privacy email links and title/meta length issues. — source: code_check_results: A11, A2, A3, C1, C3
❌ **H3** Reasons — evidence: The Organization schema uses the banned positioning phrase "Applied AI Engineering Partner". | Schema includes the banned phrase "AI-native production" and the obsolete product name "AI Intelligence Layer". | The page title and meta description use the former brand spelling "Globy". | Code evidence reports three broken internal email links. — locations: schema, title, meta, link_text — count: 4 — fix: Correct the brand spelling and structured data, review the unsupported service claims and obsolete terms, and repair or replace the broken email links. — source: decisions.md: Company description and Spelling; GoGloby Glossary §7
