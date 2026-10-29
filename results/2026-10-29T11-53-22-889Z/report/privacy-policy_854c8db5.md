# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** fix
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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#fc948ebc9b939b90939e85d29f9391 (404) | https://gogloby.com/cdn-cgi/l/email-protection#bfd7cdffd8d0d8d3d0ddc691dcd0d2 (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "legalName":"Gogloby LLC" | "slogan":"Applied AI Engineering Partner" — locations: schema — count: 3 — fix: Correct the Organization node’s legalName, slogan, and description to align with the approved company identity and description. — source: decisions.md: Company description; GoGloby Fact Sheet §Identity
  ❌ _Organization node: legalName mismatch_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Align the legalName field with the Fact Sheet legal name.
  ❌ _Organization node: slogan mismatch_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the disallowed positioning from the slogan field.
  ❌ _Organization node: description mismatch_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire the world's most thoroughly vetted talent within the US & EU time zones." — locations: schema — count: 1 — fix: Replace the description field with the approved company description.
⏭️ **B3** Person data — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — fix: No Person-node evidence was supplied for this check. — source: Page audit data: b3_person_evidence
⚠️ **B4** Schema matches the page — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — fix: Review page-specific structured data for relevance to this legal page. — source: Page audit data: json_ld

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
✅ **C2** Context terms — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — source: GoGloby Glossary §7; Page audit data: context_term_occurrences
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "reviewCount":4.9 — locations: schema — count: 1 — fix: Verify the structured-data review count against an authoritative source and correct or remove the figure. — source: GoGloby Fact Sheet §External recognition
  ❌ _Organization aggregateRating reviewCount_ — "reviewCount":4.9 — locations: schema — count: 1 — fix: Verify the review count and correct or remove the schema value.
✅ **D2** Client figures — evidence: "Privacy Policy and Candidate Privacy Notice" — locations: h1 — count: 0 — source: GoGloby Fact Sheet §Featured clients; Page audit data: body and json_ld
✅ **D3** Clients not in the Fact Sheet — evidence: alt="Background" | file_name="block-bg-1-01.png" — locations: image_alt — count: 0 — source: GoGloby Fact Sheet §Featured clients; Page audit data: main_content_images
❌ **D4** Press and partners — evidence: "name":"Applied AI Engineering" | "description":"GoGloby turns engineering into AI-native production." — locations: schema — count: 4 — fix: Review and remove or correct unrelated, outdated, and unsupported service catalog entries on this legal page. — source: decisions.md: Company description; GoGloby Fact Sheet §Services; GoGloby Glossary §§2, 7
  ❌ _Schema offer: Applied AI Engineering_ — "name":"Applied AI Engineering" | "GoGloby turns engineering into AI-native production." — locations: schema — count: 1 — fix: Remove or correct this service entry and its disallowed positioning.
  ❌ _Schema offer: Generative AI Development Services_ — "name":"Generative AI Development Services" | "Production-ready generative AI delivery" — locations: schema — count: 1 — fix: Review this service entry for consistency with the approved service catalog and claims.
  ❌ _Schema offer: AI Staff Augmentation_ — "name":"AI Staff Augmentation" | "Vetted profiles delivered in 72 hours." — locations: schema — count: 1 — fix: Review the service name and unsupported timing and guarantee claims against the approved service information.
  ❌ _Schema offer: Hire Applied AI Engineers_ — "name":"Hire Applied AI Engineers" | "Shortlist delivered in 5 days." — locations: schema — count: 1 — fix: Review the service name and unsupported timing claims against the approved service information.

## E. Positioning

➖ **E1** Service fit — evidence: not a service page | "Privacy Policy and Candidate Privacy Notice" — locations: h1 — source: Page audit data: page_type
✅ **E2** Positioning — evidence: "This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information" — locations: body — source: Page audit data: body
✅ **E3** Call to action — evidence: "17. Contact and Privacy Requests" — locations: h2 — source: Page audit data: h2
⚠️ **E4** Lead order — evidence: "Privacy email: [email protected]" — locations: body — fix: Check that the privacy contact details are displayed and usable to visitors. — source: Page audit data: body; code_check_results A11

## F. GEO

✅ **F1** Answer first — evidence: "This Notice is intended to apply to individuals in the United States, the European Economic Area (“EEA”), and Latin America" — locations: body — source: Page audit data: body
✅ **F2** Buyer problem — evidence: "Effective Date: September 16, 2026" — locations: body — source: Page audit data: body
✅ **F3** Recruiting firm stated early — evidence: "Last Updated: September 16, 2026" — locations: body — source: Page audit data: body
✅ **F4** GoGloby named near claims — evidence: "GoGloby LLC is generally the controller or business responsible" — locations: body — source: Page audit data: body
✅ **F5** FAQ — evidence: "We do not sell candidate application information for monetary consideration." — locations: body — source: Page audit data: body
✅ **F6** Audience — evidence: informational | "Privacy Policy and Candidate Privacy Notice" — locations: h1 — source: GoGloby Glossary §9; Page audit data: h1

## G. Target keyword

➖ **G1** Target keyword — evidence: none | "Privacy Policy and Candidate Privacy Notice" — locations: h1 — source: Page audit data: trap_term_context.targetKeyword
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "Privacy Policy | Globy" | "Read Globy's privacy policy" — locations: title, meta — count: 3 — fix: Use the approved GoGloby spelling consistently in the title, meta description, and schema. — source: decisions.md: Spelling
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: fix | "Privacy Policy | Globy" — locations: title — fix: Correct the title brand spelling and review its length. — source: Page audit data: title; code_check_results A2, C3
❌ **H2** Priority — evidence: high | "https://gogloby.com/cdn-cgi/l/email-protection#fc948ebc9b939b90939e85d29f9391 (404)" — locations: link_text — count: 3 — fix: Fix or remove the broken internal email links. — source: Page audit data: code_check_results A11
❌ **H3** Reasons — evidence: Brand spelling is inconsistent: the title and meta say “Globy”. | Organization schema uses an incorrect legalName, disallowed slogan, and non-approved description. | Structured data contains irrelevant service catalog entries and disallowed positioning. | The privacy email links are reported as broken. — locations: title, meta, schema, link_text — fix: Prioritize correcting the brand and Organization schema, reviewing irrelevant structured data, and repairing the broken internal links. — source: decisions.md: Company description and Spelling; Page audit data: code_check_results A11, C3; organization_nodes
