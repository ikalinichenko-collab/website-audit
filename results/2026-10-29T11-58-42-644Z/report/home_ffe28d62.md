# Page report

- **URL:** https://gogloby.com/
- **Type:** homepage
- **Action:** needs_decision
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
✅ **A2** Title length — evidence: 53 characters — locations: title — source: audit.json: seo
✅ **A3** Meta description length — evidence: 146 characters — locations: meta — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
⚠️ **A10** Image alt text — evidence: 30 images without alt — locations: image_alt — count: 30 — fix: Add alt text to main content images. — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#91f9e3d1f6fef6fdfef3e8bff2fefc (404) | https://gogloby.com/cdn-cgi/l/email-protection#b0d8c2f0d7dfd7dcdfd2c99ed3dfdd (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: slogan: “Applied AI Engineering Partner” | description: “US-based talent acquisition agency” — locations: schema — count: 4 — fix: Correct the Organization schema slogan, description, and legalName to align with the approved company identity. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization node: slogan mismatch_ — slogan: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove the disallowed positioning slogan from the Organization node.
  ❌ _Organization node: description mismatch_ — description: “We are a US-based talent acquisition agency” — locations: schema — count: 1 — fix: Replace the Organization description with the approved company description.
  ❌ _Organization node: legalName mismatch_ — legalName: “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legalName spelling to match the Fact Sheet.
  ✅ _Organization node: name_ — name: “GoGloby” — locations: schema — count: 1
➖ **B3** Person data — evidence: No Person nodes are present in the supplied b3_person_evidence. — locations: schema — count: 0 — source: code_check_results: b3_person_evidence
❌ **B4** Schema matches the page — evidence: “reviewCount”: 4.9 — locations: schema — count: 1 — fix: Correct or remove the review count; the Fact Sheet reports 10 verified Clutch reviews. — source: GoGloby Fact Sheet: What clients say

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: team comes with the AI Intelligence Layer: every AI dollar vi | AI Engineering Visibility: d prove the return. AI Engineering Visibility AI Intelligence Lay — locations: body, schema, meta, title, h2 — count: 55 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Engineering Visibility" with AI Development Intelligence Layer. Remove or rephrase "AI-native production". — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — team comes with the AI Intelligence Layer: every AI dollar vi | it, and we run the AI Intelligence Layer that proves it agai — locations: body, schema — count: 21 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ❌ _AI Engineering Visibility_ — d prove the return. AI Engineering Visibility AI Intelligence Lay — locations: body — count: 1 — fix: Replace "AI Engineering Visibility" with AI Development Intelligence Layer.
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ng engineering into AI-native production: every AI dollar vi | RN ENGINEERING INTO AI-NATIVE PRODUCTION Uncover & Fix What’ — locations: meta, body, schema — count: 5 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — GoGloby is an Applied AI Engineering partner turning engineering | Back GoGloby is an Applied AI Engineering partner. We turn engineerin — locations: meta, body, schema — count: 11 — fix: Replace "Applied AI Engineering partner" with the approved company description.
  ❌ _Applied AI Company_ — Applied AI Company for Established Sof | What Is an Applied AI Company? — locations: title, h2, body, schema — count: 10 — fix: Replace "Applied AI Company" with the approved company description.
  ✅ _AI Production Engineering_
  ❌ _AI Leadership Search_ — t Works Recruitment AI Leadership Search We recruit US-based | irst, or alongside? AI Leadership Search runs in parallel. B — locations: body — count: 2 — fix: Remove or rephrase "AI Leadership Search".
  ❌ _every AI dollar visible_ — -native production: every AI dollar visible, every feature ship | Intelligence Layer: every AI dollar visible, cost and return pe — locations: meta, body, schema — count: 3 — fix: Remove or rephrase "every AI dollar visible".
  ✅ _AI talent staffing_
  ❌ _Staffing gives capacity_ — the bottlenecks. S Staffing Gives Capacity, GoGloby Owns Outco — locations: body — count: 1 — fix: Remove or rephrase "Staffing gives capacity".
  ❌ _owns outcomes_ — s Capacity, GoGloby Owns Outcomes Outcome: Added capa — locations: body — count: 1 — fix: Remove or rephrase "owns outcomes".
  ✅ _free trial_
  ✅ _hire in 48 hours_
  ✅ _mid-level_
  ✅ _mid level_
❌ **C2** Context terms — evidence: CTA heading: “Get Your Applied AI Engineering Benchmark” | CTA text: “Start With a Benchmark” — locations: h2, body — count: 6 — fix: Remove Benchmark as a primary call to action and review the listed positioning/offer terms against Glossary §7. — source: GoGloby Glossary: §7 Terms and claims we do not use
  ❌ _Benchmark occurrence: CTA heading_ — “Get Your Applied AI Engineering Benchmark” — locations: h2 — count: 1 — fix: Change the CTA framing so Benchmark is not the main call to action.
  ❌ _Benchmark occurrence: CTA section_ — “Start With a Benchmark” — locations: body — count: 1 — fix: Remove Benchmark as the main call to action.
  ❌ _Benchmark occurrence: contact-form pitch_ — “We will walk you through the Benchmark” — locations: body — count: 1 — fix: Review the contact-form pitch to avoid presenting Benchmark as the primary action.
  ❌ _Benchmark occurrence: FAQ answer_ — “We benchmark your AI spend” — locations: body — count: 1 — fix: Review this use against the restriction on Benchmark as the main call to action.
  ❌ _Claude Certified Architect_ — “Claude Certified Architects, Claude-specific.” — locations: body — count: 1 — fix: Remove this as an offered role or positioning claim; the glossary says it is not an offer.
  ❌ _AI Solutions Architect_ — “AI Solutions Architects, model-agnostic.” — locations: body — count: 1 — fix: Remove this as an offer or positioning claim; the glossary says it remains a role, not an offer.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: “Applied AI Company Trusted by 100+ Clients Across 10+ Industries” — locations: h2 — count: 1 — fix: Verify the client total and industry count against an approved source or remove the unverified figures. — source: GoGloby Fact Sheet: Selected clients; Featured clients
  ⚠️ _Claimed client and industry totals_ — “Trusted by 100+ Clients Across 10+ Industries” — locations: h2 — count: 1 — fix: Verify these totals against an approved source or remove them.
❌ **D2** Client figures — evidence: Hasbro: “$13.4B market cap” | Keywords: “13,000 employees” — locations: body — count: 13 — fix: Review all client metrics against the Fact Sheet; correct conflicts and remove or substantiate figures not verified there. — source: GoGloby Fact Sheet: Featured clients
  ❌ _Hasbro: client metrics_ — “$13.4B market cap” | “$4.7B revenue” — locations: body — count: 1 — fix: Reconcile the market-cap and revenue claims with the Fact Sheet, which lists approximately $5B revenue.
  ⚠️ _DrChrono: client metrics_ — “17M+ patients” | “$3B+ medical claims annually” — locations: body — count: 1 — fix: Verify these figures against an approved source; the Fact Sheet lists 17M+ patients and $3B in claims processed.
  ❌ _EverCommerce: client metrics_ — “$1.98B market cap” | “700,000+ business clients” — locations: body — count: 1 — fix: Reconcile the market-cap and client-count claims with the Fact Sheet, which lists approximately $700M revenue and 700K+ clients.
  ❌ _Keywords Studios: client metrics_ — “$2.8B EQT acquisition” | “13,000 employees” — locations: body — count: 1 — fix: Reconcile the acquisition and employee claims with the Fact Sheet, which lists approximately $879M revenue and 12,000+ employees.
  ⚠️ _MikeWorldWide: client metrics_ — “$57M fee income” | “230+ staff” — locations: body — count: 1 — fix: Verify these metrics; the Fact Sheet does not provide fee-income or staff figures.
  ⚠️ _TATA: client metrics_ — “$106B market cap” | “$30B revenue · 600,000+ employees” — locations: body — count: 1 — fix: Verify the market-cap claim; the Fact Sheet lists approximately $30B revenue and 600,000+ employees.
  ⚠️ _Canopy: client metrics_ — “Series F · $236.5M raised” | “#1 rated accounting SaaS” — locations: body — count: 1 — fix: Verify the funding and ranking claims; only the Series F and $236.5M raised figures are in the Fact Sheet.
  ❌ _Sydecar: client metrics_ — “$3B+ AUA” | “107% YoY revenue growth” — locations: body — count: 1 — fix: Reconcile AUA with the Fact Sheet, which lists $1B+ assets under administration, and verify the growth claim.
  ⚠️ _Bonusly: client metrics_ — “$32.4M raised” | “3,400+ clients” — locations: body — count: 1 — fix: Verify these figures; the Fact Sheet lists $20M Series B but does not provide a client count.
  ⚠️ _Every: client metrics_ — “$32M raised” | “$60M+ payroll processed” — locations: body — count: 1 — fix: Verify payroll volume; the Fact Sheet lists $32M Series A and 200+ startup clients.
  ⚠️ _Alchemy Health: client metrics_ — “$31M seed” | “25M+ prescriptions” — locations: body — count: 1 — fix: Verify the claims; the Fact Sheet lists $32M raised and 25M+ prescriptions.
  ⚠️ _Devsisters: client metrics_ — “200M+ users” | “$500M+ lifetime player spending” — locations: body — count: 1 — fix: Verify the user and spending claims; the Fact Sheet lists 200M+ players.
  ⚠️ _Zillow: client metrics_ — “$10.7B market cap” | “$2.58B revenue · 227M monthly users” — locations: body — count: 1 — fix: Verify these figures; the Fact Sheet lists approximately $2B revenue and does not provide market-cap or monthly-user figures.
❌ **D3** Clients not in the Fact Sheet — evidence: Image alt is empty; file_name: “logo-disney-1-grayscale.png” — locations: image_alt — count: 1 — fix: Confirm whether Disney is intended to be presented as a client; if so, verify its client status and provide accurate image alternative text. — source: GoGloby Fact Sheet: Featured clients; Page main_content_images
  ❌ _Disney_ — Image alt: empty; file_name: “logo-disney-1-grayscale.png” — locations: image_alt — count: 1 — fix: Verify whether Disney is a client before presenting its logo as client proof; add accurate alt text if retained.
❌ **D4** Press and partners — evidence: “A GoGloby Applied AI Engineering client building their internal AI Studio.” | “An active GoGloby Applied AI Engineering engagement.” — locations: body — count: 1 — fix: Verify client relationship and engagement descriptions against approved client records; remove or correct unverified descriptions. — source: GoGloby Fact Sheet: Featured clients
  ❌ _Client relationship and engagement descriptions_ — “building their internal AI Studio” | “active GoGloby Applied AI Engineering engagement” — locations: body — count: 1 — fix: Verify each specific engagement description against approved client records and remove or correct unsupported details.

## E. Positioning

❌ **E1** Service fit — evidence: Service fit: recruiting and staffing agency | Page presents: “Applied AI Engineering partner” — locations: title, meta, body — count: 1 — fix: Align the homepage description and service framing with GoGloby’s approved staffing and recruiting services. — source: decisions.md: Company description; GoGloby Fact Sheet: Services
❌ **E2** Positioning — evidence: “We embed Forward-Deployed Engineers.” — locations: body — count: 1 — fix: Make the approved recruiting and staffing offers the primary service descriptions rather than presenting forward-deployed engineering as a separate offer. — source: GoGloby Fact Sheet: Services; GoGloby Glossary: §2 The two services
❌ **E3** Call to action — evidence: “GoGloby is an Applied AI Engineering partner.” — locations: body — count: 1 — fix: Remove the disallowed positioning and use the approved company description. — source: GoGloby Glossary: §7 Terms and claims we do not use; decisions.md: Company description
❌ **E4** Lead order — evidence: “Every embedded team comes with the AI Intelligence Layer” — locations: body — count: 1 — fix: Use the approved product name and describe its availability consistently with the Fact Sheet. — source: GoGloby Fact Sheet: Services; GoGloby Glossary: §7 Terms and claims we do not use

## F. GEO

❌ **F1** Answer first — evidence: “Applied AI Company for Established Software” — locations: title — count: 1 — fix: Align the title with the approved homepage category and service terminology. — source: GoGloby Glossary: §7 Positioning terms
❌ **F2** Buyer problem — evidence: “GoGloby is an Applied AI Engineering partner” — locations: meta — count: 1 — fix: Replace the meta description’s positioning with approved company and service information. — source: decisions.md: Company description; GoGloby Glossary: §7 Terms and claims we do not use
⚠️ **F3** Recruiting firm stated early — evidence: H1: “Uncover & Fix What’s Holding Your AI Engineering Back” — locations: h1 — count: 1 — fix: Review the H1 so it clearly identifies the hiring services and buyer problem. — source: GoGloby Glossary: §9 How we write
❌ **F4** GoGloby named near claims — evidence: “Applied AI Services GoGloby Delivers” — locations: h2 — count: 1 — fix: Rework headings that frame GoGloby as an applied AI delivery company instead of a staffing and recruiting agency. — source: decisions.md: Company description; GoGloby Fact Sheet: Services
❌ **F5** FAQ — evidence: “AI talent” — locations: body — count: 1 — fix: Avoid the restricted standalone term and describe the engineers or specific service instead. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **F6** Audience — evidence: not_targeted | “What is an applied AI company?” | “An applied AI company helps businesses use AI in real production workflows” — locations: h2, body — count: 1 — fix: Replace informational explainer content with buyer-focused hiring information and service fit. — source: GoGloby Glossary: §9 How we write

## G. Target keyword

❌ **G1** Target keyword — evidence: none | Title: “Applied AI Company for Established Software | GoGloby” — locations: title — count: 1 — fix: Use the approved homepage keyword focus from Glossary §7 in the title. — source: GoGloby Glossary: §7 Positioning terms
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “Get Your Applied AI Engineering Benchmark” — locations: h2, body — count: 1 — fix: Remove the prohibited Benchmark-first CTA framing. — source: GoGloby Glossary: §7 Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: REMOVE | “Start With a Benchmark” — locations: body — count: 1 — fix: Remove the Benchmark CTA and align the main action with the appropriate service. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **H2** Priority — evidence: high | “Applied AI Company for Established Software | GoGloby” | “GoGloby is an Applied AI Engineering partner” — locations: title, meta — count: 1 — fix: Prioritize correcting the homepage title and meta description to match the approved identity and service positioning. — source: decisions.md: Company description; GoGloby Glossary: §7 Positioning terms
❌ **H3** Reasons — evidence: The page describes GoGloby as an “Applied AI Engineering partner,” conflicting with the approved staffing and recruiting description. | The content repeatedly promotes applied AI delivery, telemetry, and AI ROI rather than the approved recruiting and staffing services. | The page includes prohibited positioning and CTA language, including “Applied AI Company” and “Get Your Applied AI Engineering Benchmark.” — locations: title, meta, h2, body, schema — count: 3 — fix: Recenter page messaging on approved staffing and recruiting services, remove disallowed positioning and claims, and verify client metrics. — source: decisions.md: Company description; GoGloby Fact Sheet: Services and Featured clients; GoGloby Glossary: §§7, 9
