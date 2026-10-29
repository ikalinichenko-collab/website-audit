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
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **A10** Image alt text — evidence: 30 images without alt — locations: image_alt — count: 30 — fix: Add alt text to main content images. — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#aec6dceec9c1c9c2c1ccd780cdc1c3 (404) | https://gogloby.com/cdn-cgi/l/email-protection#640c1624030b03080b061d4a070b09 (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Title: “Applied AI Company for Established Software”; schema slogan: “Applied AI Engineering Partner.” — locations: schema — count: 4 — fix: Correct the Organization node’s slogan, description, legalName, and any inconsistent name fields to match the approved company identity and description. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _slogan_ — “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Replace the non-approved slogan in Organization schema.
  ❌ _description_ — “US-based talent acquisition agency specializing in assisting tech companies” — locations: schema — count: 1 — fix: Replace the schema description with the approved company description.
  ❌ _legalName_ — “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the capitalization of the legal name in Organization schema.
  ✅ _name_ — Organization schema name: “GoGloby” — locations: schema — count: 1
❌ **B3** Person data — evidence: Sergey description: “Leads the Agentic SDLC methodology” | Vit description: “generating $60M+ in value” — locations: schema — count: 2 — fix: Revise Person descriptions and knowsAbout fields to align with approved source facts and remove unsupported or disallowed claims. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — “Leads the Agentic SDLC methodology” | knowsAbout includes “Applied AI Engineering” — locations: schema — count: 1 — fix: Replace the unsupported description and remove disallowed positioning from knowsAbout; approved jobTitle match is accepted.
  ❌ _Vit Koval_ — “generating $60M+ in value” | knowsAbout includes “Nearshore AI talent” — locations: schema — count: 1 — fix: Replace unsupported description details and remove disallowed standalone AI talent phrasing from knowsAbout; approved jobTitle match is accepted.
⚠️ **B4** Schema matches the page — evidence: Schema lists sales@gogloby.com and hr@gogloby.com; Fact Sheet lists sales@gogloby.com. — locations: schema — count: 2 — fix: Verify the extra candidate-support email before presenting it as an official company contact. — source: GoGloby Fact Sheet: Identity

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
❌ **C2** Context terms — evidence: Title: “Applied AI Company for Established Software” | CTA: “Start With a Benchmark” — locations: h2, body, meta — count: 56 — fix: Remove Glossary §7-breaking uses of positioning claims and benchmark-as-CTA; retain terms only where they do not break the specified restrictions. — source: GoGloby Glossary §7
  ❌ _c2:Benchmark:h2:0_ — “Get Your Applied AI Engineering Benchmark” — locations: h2 — count: 1 — fix: Remove benchmark as a main call to action.
  ❌ _c2:Benchmark:body:1_ — “walk you through the Benchmark” — locations: body — count: 1 — fix: Remove benchmark-as-CTA wording.
  ❌ _c2:Benchmark:body:2_ — “Start With a Benchmark” — locations: body — count: 1 — fix: Remove benchmark-as-CTA wording.
  ❌ _c2:Benchmark:body:3_ — “Get Your Applied AI Engineering Benchmark” — locations: body — count: 1 — fix: Remove benchmark-as-CTA wording.
  ✅ _c2:Benchmark:body:4_ — “We benchmark your AI spend” — locations: body — count: 1
  ❌ _c2:Claude Certified Architect:body:5_ — “Claude Certified Architects, Claude-specific” — locations: body — count: 1 — fix: Remove Claude Certified Architect as an offer or positioning.
  ❌ _c2:AI Solutions Architect:body:6_ — “AI Solutions Architects, model-agnostic” — locations: body — count: 1 — fix: Remove AI Solutions Architect as positioning or an offer.
  ❌ _c2:Applied AI Engineering:meta:7_ — “Applied AI Engineering partner” — locations: meta — count: 1 — fix: Remove this prohibited description of GoGloby.
  ❌ _c2:Applied AI Engineering:h2:8_ — “Applied AI Engineering Gaps We Solve” — locations: h2 — count: 1 — fix: Remove Applied AI Engineering as a way of positioning GoGloby.
  ❌ _c2:Applied AI Engineering:h2:9_ — “Applied AI Engineering Model Works” — locations: h2 — count: 1 — fix: Remove Applied AI Engineering as a way of positioning GoGloby.
  ❌ _c2:Applied AI Engineering:h2:10_ — “Applied AI Engineering Hubs” — locations: h2 — count: 1 — fix: Remove Applied AI Engineering as a way of positioning GoGloby.
  ❌ _c2:Applied AI Engineering:h2:11_ — “Applied AI Engineering Benchmark” — locations: h2 — count: 1 — fix: Remove prohibited positioning and benchmark-as-CTA language.
  ❌ _c2:Applied AI Engineering:body:12_ — “GoGloby is an Applied AI Engineering partner” — locations: body — count: 1 — fix: Remove this prohibited description of GoGloby.
  ❌ _c2:Applied AI Engineering:body:13_ — “Applied AI Engineering Gaps We Solve” — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of positioning GoGloby.
  ❌ _c2:Applied AI Engineering:body:14_ — “Applied AI Engineering Model Works” — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of positioning GoGloby.
  ❌ _c2:Applied AI Engineering:body:15_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:16_ — “Applied AI Engineering engagement” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:17_ — “Applied AI Engineering partner” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:18_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:19_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:20_ — “Applied AI Engineering engagement” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:21_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:22_ — “Applied AI Engineering partner” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:23_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:24_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:25_ — “Applied AI Engineering client” — locations: body — count: 1 — fix: Remove the prohibited positioning phrase from client descriptions.
  ❌ _c2:Applied AI Engineering:body:26_ — “Applied AI Engineering Hubs” — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of positioning GoGloby.
  ❌ _c2:Applied AI Engineering:body:27_ — “Get Your Applied AI Engineering Benchmark” — locations: body — count: 1 — fix: Remove prohibited positioning and benchmark-as-CTA language.
  ❌ _c2:Forward-Deployed Engineering:body:28_ — “Forward-Deployed Engineering” — locations: body — count: 1 — fix: Do not present Forward Deployed Engineering as positioning or an offer.
  ✅ _c2:Forward-Deployed Engineers:body:29_ — “We embed Forward-Deployed Engineers” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:30_ — “forward-deployed engineers who ship it” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:31_ — “Forward-deployed engineers work inside your existing repositories” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:32_ — “Forward-Deployed Engineers Ship With You” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:33_ — “Forward-deployed engineers work with the team” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:34_ — “forward-deployed engineers who clear the bottlenecks” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:35_ — “Forward-Deployed Engineers who install” — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:36_ — “agentic SDLC on production code” — locations: body — count: 1
  ❌ _c2:Agentic SDLC:body:37_ — “engineers who install the Agentic SDLC” — locations: body — count: 1 — fix: Remove Agentic SDLC as a named offer or positioning.
  ❌ _c2:AI ROI:body:38_ — “We prove AI ROI” — locations: body — count: 1 — fix: Remove hero or headline emphasis on AI ROI.
  ✅ _c2:AI ROI:body:39_ — “Invisible AI ROI” — locations: body — count: 1
  ✅ _c2:AI ROI:body:40_ — “connects AI ROI to shipped work” — locations: body — count: 1
  ✅ _c2:AI ROI:body:41_ — “measure AI ROI” — locations: body — count: 1
  ✅ _c2:AI ROI:body:42_ — “board pressure to prove AI ROI” — locations: body — count: 1
  ✅ _c2:AI spend:body:43_ — “Uncontrolled AI Spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:44_ — “AI spending can grow quickly” — locations: body — count: 1
  ✅ _c2:AI spend:body:45_ — “connects AI spending to the work” — locations: body — count: 1
  ✅ _c2:AI spend:body:46_ — “AI spend by team, developer, and model” — locations: body — count: 1
  ✅ _c2:AI spend:body:47_ — “Where AI spending produces value” — locations: body — count: 1
  ✅ _c2:AI spend:body:48_ — “delivery and AI spending” — locations: body — count: 1
  ✅ _c2:AI spend:body:49_ — “AI spending and engineering time” — locations: body — count: 1
  ✅ _c2:AI spend:body:50_ — “AI spending contributes to shipped work” — locations: body — count: 1
  ✅ _c2:AI spend:body:51_ — “AI spend and engineering time” — locations: body — count: 1
  ✅ _c2:AI spend:body:52_ — “AI spend optimization” — locations: body — count: 1
  ✅ _c2:AI spend:body:53_ — “benchmark your AI spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:54_ — “AI spending with engineering work” — locations: body — count: 1
  ❌ _c2:AI talent:body:55_ — “Proven AI Talent” — locations: body — count: 1 — fix: Avoid standalone AI talent phrasing; use approved service terminology.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: “Trusted by 100+ Clients Across 10+ Industries” — locations: body — count: 1 — fix: Remove or substantiate the unverified client-count and industry-count claim. — source: GoGloby Fact Sheet: Identity; Selected clients; Featured clients
  ❌ _Client-count claim_ — “Trusted by 100+ Clients Across 10+ Industries” — locations: body — count: 1 — fix: Remove or substantiate the unverified counts.
❌ **D2** Client figures — evidence: Hasbro shown with “$4.7B revenue”; Fact Sheet: “~$5B revenue.” | TATA shown as “$106B market cap”; Fact Sheet: “~$30B revenue.” — locations: body — count: 12 — fix: Correct conflicting figures and verify figures not present in the Fact Sheet before publishing. — source: GoGloby Fact Sheet: Featured clients; decisions.md: Clients
  ❌ _d2:hasbro_ — “$4.7B revenue” conflicts with Fact Sheet “~$5B revenue.” — locations: body — count: 1 — fix: Correct the conflicting Hasbro revenue figure.
  ⚠️ _d2:tata_ — “$106B market cap” is not provided in the Fact Sheet; “$30B revenue” and “600,000+ employees” are consistent. — locations: body — count: 1 — fix: Verify the market-cap claim against an approved source.
  ⚠️ _d2:evercommerce_ — “$1.98B market cap” is not in Fact Sheet; “700,000+ business clients” is broadly consistent with “700K+ clients.” — locations: body — count: 1 — fix: Verify the market-cap claim.
  ⚠️ _d2:zillow_ — “$10.7B market cap” and “227M monthly users” are not Fact Sheet figures; “$2.58B revenue” differs in precision from “~$2B revenue.” — locations: body — count: 1 — fix: Verify market-cap and user figures and align revenue to approved sourcing.
  ⚠️ _d2:devsisters_ — “$299M market cap,” “200M+ users,” and “$500M+ lifetime player spending” are not Fact Sheet figures; player count is stated as “200M+ players.” — locations: body — count: 1 — fix: Verify the additional financial and user-spending claims.
  ⚠️ _d2:drchrono_ — “17M+ patients” and “$3B+ medical claims” appear in Fact Sheet; “annually” is not specified there. — locations: body — count: 1 — fix: Verify the annual period attached to medical claims.
  ⚠️ _d2:mikeworldwide_ — “$57M fee income” and “230+ staff” are not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the fee-income and staff figures.
  ⚠️ _d2:every.io_ — “$32M raised” is in the Fact Sheet; “$60M+ payroll processed” is not. — locations: body — count: 1 — fix: Verify the payroll-processing figure.
  ❌ _d2:sydecar_ — “$3B+ AUA” conflicts with Fact Sheet “$1B+ assets under administration.” — locations: body — count: 1 — fix: Correct the conflicting assets-under-administration figure; verify the unlisted growth claim.
  ⚠️ _d2:bonusly_ — “$32.4M raised” and “3,400+ clients” are not exact Fact Sheet figures; Fact Sheet states “$20M Series B.” — locations: body — count: 1 — fix: Verify the funding and client-count figures.
  ✅ _d2:alchemy health_ — “$31M” and “25M+ prescriptions” are consistent with Fact Sheet “$32M raised” and “25M+ prescriptions.” — locations: body — count: 1
  ✅ _d2:canopy_ — “Series F · $236.5M raised” matches Fact Sheet. — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: not_in_fact_sheet: NOVILAB — locations: body, image_alt — count: 65 — fix: Verify client-card and logo entities against the Fact Sheet; remove or clarify unsupported client references. — source: GoGloby Fact Sheet §Featured clients; decisions.md §Clients
  ✅ _client_card:hasbro nyse_ — fact_sheet_client — HASBRO NYSE · $13.4B market cap — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — fact_sheet_client — DR. CHRONO 17M+ patients — locations: body — count: 1
  ✅ _client_card:evercommerce_ — fact_sheet_client — EVERCOMMERCE Nasdaq-listed SaaS — locations: body — count: 1
  ✅ _client_card:keywords_ — fact_sheet_client — KEYWORDS $2.8B EQT acquisition — locations: body — count: 1
  ✅ _client_card:eqt_ — not_a_client — EQT acquisition · $844M revenue — locations: body — count: 1
  ✅ _client_card:tata_ — fact_sheet_client — TATA $106B market cap — locations: body — count: 1
  ✅ _client_card:canopy_ — fact_sheet_client — CANOPY Series F — locations: body — count: 1
  ✅ _client_card:sydecar_ — fact_sheet_client — SYDECAR $3B+ AUA — locations: body — count: 1
  ❌ _client_card:novilab_ — not_in_fact_sheet — NOVILAB Series B · $46M raised — locations: body — count: 1 — fix: Confirm this client reference or remove it.
  ✅ _client_card:bonusly_ — fact_sheet_client — BONUSLY Series B — locations: body — count: 1
  ✅ _client_card:every_ — fact_sheet_client — EVERY $32M raised — locations: body — count: 1
  ✅ _client_card:alchemy_ — fact_sheet_client — ALCHEMY $31M seed — locations: body — count: 1
  ✅ _client_card:devsisters_ — fact_sheet_client — DEVSISTERS Public — locations: body — count: 1
  ✅ _client_card:zillow nasdaq_ — fact_sheet_client — ZILLOW NASDAQ — locations: body — count: 1
  ✅ _client_card:gitlab_ — not_a_client — GITLAB $8B+ market cap — locations: body — count: 1
  ✅ _client_card:ai. oyster_ — not_a_client — AI. OYSTER $1.2B valuation — locations: body — count: 1
  ✅ _logo_image:background_ — not_a_client — alt: Background — locations: image_alt — count: 1
  ✅ _logo_image:forbes_ — not_a_client — alt: Forbes — locations: image_alt — count: 1
  ✅ _logo_image:london daily news_ — not_a_client — alt: London Daily News — locations: image_alt — count: 1
  ✅ _logo_image:nbc_ — not_a_client — alt: NBC — locations: image_alt — count: 1
  ✅ _logo_image:hubspot_ — not_a_client — alt: HubSpot — locations: image_alt — count: 1
  ✅ _logo_image:fox news_ — not_a_client — alt: Fox News — locations: image_alt — count: 1
  ✅ _logo_image:hasbro_ — fact_sheet_client — alt: Hasbro — locations: image_alt — count: 1
  ✅ _logo_image:evercommerce_ — fact_sheet_client — alt: Evercommerce — locations: image_alt — count: 1
  ✅ _logo_image:drchrono_ — fact_sheet_client — alt: DrChrono — locations: image_alt — count: 1
  ✅ _logo_image:mww_ — fact_sheet_client — alt: MWW — locations: image_alt — count: 1
  ✅ _logo_image:tata_ — fact_sheet_client — alt: TATA — locations: image_alt — count: 1
  ✅ _logo_image:zillow_ — fact_sheet_client — alt: Zillow — locations: image_alt — count: 1
  ✅ _logo_image:keywords_ — fact_sheet_client — alt: Keywords — locations: image_alt — count: 1
  ✅ _logo_image:deel 1 grayscale_ — fact_sheet_client — file_name: logo-deel-1-grayscale.png — locations: image_alt — count: 1
  ✅ _logo_image:disney 1 grayscale_ — not_a_client — file_name: logo-disney-1-grayscale.png — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20158%20160%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20137%20160%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20162%20160%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20160%20153%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20196%20200%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20187%20160%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20200%20168%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20200%20184%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20200%20194%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20228%2072%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20348%20102%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20294%20126%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20210%2075%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20708%2072%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20357%2090%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20708%20102%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20603%20138%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%201024%20683%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%201024%20797%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%201024%20645%22%3e%3c/svg%3e_ — not_a_client — file_name is an encoded SVG placeholder, not a client identity — locations: image_alt — count: 1
  ✅ _text_cue:hasbro_ — fact_sheet_client — HASBRO NYSE · $13.4B market cap — locations: body — count: 1
  ✅ _text_cue:nyse_ — not_a_client — NYSE — locations: body — count: 1
  ✅ _text_cue:nfl_ — not_a_client — NFL — locations: body — count: 1
  ✅ _text_cue:wnba_ — not_a_client — WNBA — locations: body — count: 1
  ✅ _text_cue:every_ — fact_sheet_client — EVERY $32M raised — locations: body — count: 1
  ✅ _text_cue:zillow_ — fact_sheet_client — ZILLOW NASDAQ — locations: body — count: 1
  ✅ _text_cue:nasdaq_ — not_a_client — NASDAQ — locations: body — count: 1
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20158%20160%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20137%20160%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20162%20160%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20160%20153%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20196%20200%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20187%20160%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20200%20168%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:arrow icon_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20200%20184%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20200%20194%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:map_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20228%2072%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20348%20102%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20294%20126%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20210%2075%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%2072%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20357%2090%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%20102%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20603%20138%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201024%20683%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201024%20797%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201024%20645%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
❌ **D4** Press and partners — evidence: “Trusted by 100+ Clients Across 10+ Industries” | “IT Services TATA” — locations: body — count: 2 — fix: Remove unverified target/scale claims and avoid presenting out-of-scope industries as target markets; the approved TATA client listing is not itself a targeting violation. — source: GoGloby Glossary §5; decisions.md: Clients
  ❌ _100+ clients / 10+ industries targeting claim_ — “Trusted by 100+ Clients Across 10+ Industries” — locations: body — count: 1 — fix: Remove or substantiate this unsupported broad claim.
  ❌ _IT services firm targeting signal_ — “IT Services TATA” — locations: body — count: 1 — fix: Clarify that TATA is a client, not a target segment; TATA’s listing as a client is approved by decision.

## E. Positioning

❌ **E1** Service fit — evidence: “GoGloby is an Applied AI Engineering partner” — locations: first_paragraph, meta — count: 1 — fix: Align the stated service fit and company description with staffing and recruiting for Data & AI Engineers. — source: decisions.md: Company description; GoGloby Fact Sheet: Services
❌ **E2** Positioning — evidence: “We embed Forward-Deployed Engineers” — locations: body — count: 1 — fix: Align service descriptions with the approved US recruiting and nearshore staffing service definitions and approved service names. — source: GoGloby Fact Sheet: Services; decisions.md: Service pages
❌ **E3** Call to action — evidence: “No fee until hire” — locations: body — count: 1 — fix: Remove claims that conflict with the approved service scope or overstate guarantees; verify all timing, pricing, and delivery statements against the Fact Sheet. — source: GoGloby Fact Sheet: Services; Glossary §7
⚠️ **E4** Lead order — evidence: “4-stage technical assessment” — locations: body — count: 1 — fix: Check assessment and guarantee claims against the Fact Sheet; keep only supported details and qualifiers. — source: GoGloby Fact Sheet: How we vet; Services

## F. GEO

❌ **F1** Answer first — evidence: “Uncover & Fix What’s Holding Your AI Engineering Back” — locations: h1 — count: 1 — fix: Make the primary page message identify the approved staffing and recruiting offer for Data & AI Engineers. — source: decisions.md: Company description; GoGloby Glossary §9
❌ **F2** Buyer problem — evidence: “What Is an Applied AI Company?” — locations: body — count: 1 — fix: Refocus the content on buyer-ready hiring and service information rather than explaining a category. — source: GoGloby Glossary §9
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
❌ **F4** GoGloby named near claims — evidence: “Start With a Benchmark” — locations: body — count: 1 — fix: Replace benchmark-centered calls to action with the approved service-specific action type. — source: GoGloby Glossary §7
❌ **F5** FAQ — evidence: “every AI dollar visible” — locations: meta, body — count: 1 — fix: Remove headline emphasis on AI spend or ROI and keep cost only as a supporting measurement detail where appropriate. — source: GoGloby Glossary §7
❌ **F6** Audience — evidence: buyer_ready — locations: title, h1, body — count: 1 — fix: Refocus the page on companies ready to hire staffing or recruiting services rather than buyers of an AI engineering product or measurement system. — source: GoGloby Glossary §9

## G. Target keyword

❌ **G1** Target keyword — evidence: none | Title: “Applied AI Company for Established Software” — locations: title — count: 0 — fix: Use an approved buyer-search term tied to staffing or recruiting in the title and primary page content. — source: GoGloby Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “Applied AI Company for Established Software” — locations: title — count: 1 — fix: Align title and meta messaging with approved staffing and recruiting positioning and remove trap or prohibited positioning terms. — source: GoGloby Glossary §§6, 8
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: replace — locations: title, meta, h1, body — count: 1 — fix: Replace the current product/Applied AI positioning with the approved staffing and recruiting identity. — source: decisions.md: Company description; GoGloby Glossary §§6–7
❌ **H2** Priority — evidence: high — locations: title, meta, body — count: 1 — fix: Prioritize removal of disallowed positioning, unsupported claims, inaccurate client figures, and buyer-misaligned content. — source: decisions.md; GoGloby Fact Sheet; GoGloby Glossary
❌ **H3** Reasons — evidence: - Company description and service positioning conflict with decisions.md and the Fact Sheet. | - Schema includes an incorrect legalName and unsupported founder descriptions/claims. | - Multiple client metrics conflict with or are unverified against the Fact Sheet. | - Body and metadata contain disallowed glossary terms and benchmark-focused calls to action. | - The homepage predominantly describes an AI delivery/measurement product rather than the approved staffing and recruiting services. — locations: title, meta, body, schema — count: 5 — fix: Address identity and positioning first, then verify claims, client figures, schema fields, and service-page alignment. — source: decisions.md; GoGloby Fact Sheet: Identity, Founders, Services, Featured clients; GoGloby Glossary §§5–9
