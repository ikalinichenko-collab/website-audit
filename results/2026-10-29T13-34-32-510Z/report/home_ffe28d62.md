# Page report

- **URL:** https://gogloby.com/
- **Type:** homepage
- **Action:** needs_decision
- **Priority:** high

## First paragraph

GoGloby is an Applied AI Engineering partner. We turn engineering into AI-native production for established software companies: we find what’s slowing your engineering down, put the right people inside your team to fix it, and prove the result every month. We embed Forward-Deployed Engineers. Senior AI engineers inside your team in under 4 weeks, shipping at AI speed against your own baseline. We prove AI ROI. Every embedded team comes with the AI Intelligence Layer: every AI dollar visible, cost

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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#d2baa092b5bdb5bebdb0abfcb1bdbf (404) | https://gogloby.com/cdn-cgi/l/email-protection#3a52487a5d555d5655584314595557 (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Schema slogan: “Applied AI Engineering Partner”; description: “US-based talent acquisition agency”; legalName: “Gogloby LLC”. | Schema name is “GoGloby”. — locations: schema — count: 4 — fix: Correct the Organization schema slogan, description, and legalName to align with approved company identity; retain the correctly spelled name. — source: decisions.md § Company description; GoGloby Fact Sheet § Identity
  ❌ _Organization slogan_ — “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Replace the unapproved slogan in Organization schema.
  ❌ _Organization description_ — “US-based talent acquisition agency specializing in assisting tech companies” — locations: schema — count: 1 — fix: Set the Organization schema description to the approved company description.
  ❌ _Organization legalName_ — “Gogloby LLC” — locations: schema — count: 1 — fix: Correct the legal name spelling in Organization schema.
  ✅ _Organization name_ — “name":"GoGloby” — locations: schema — count: 1
❌ **B3** Person data — evidence: Sergey description: “Leads the Agentic SDLC methodology” | Vit description: “generating $60M+ in value” — locations: schema — count: 2 — fix: Align the Person descriptions and knowsAbout fields with approved founder information; remove unapproved claims and terms. — source: decisions.md § Founders; GoGloby Fact Sheet § Founders
  ❌ _Sergey Matikaynen_ — “Leads the Agentic SDLC methodology” | knowsAbout includes “Applied AI Engineering” and “Secure AI development environments” — locations: schema — count: 1 — fix: Revise the description and knowsAbout values to match approved founder details. jobTitle is approved.
  ❌ _Vit Koval_ — “generating $60M+ in value” | knowsAbout includes “Applied AI Engineering Partnerships” and “Nearshore AI talent” — locations: schema — count: 1 — fix: Revise the description and knowsAbout values to match approved founder details. jobTitle is approved.
❌ **B4** Schema matches the page — evidence: “GoGloby is an Applied AI Engineering partner” — locations: meta, body — count: 1 — fix: Use the approved company description in place of the unapproved company characterization. — source: decisions.md § Company description

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: team comes with the AI Intelligence Layer: every AI dollar vi | AI Engineering Visibility: d prove the return. AI Engineering Visibility AI Intelligence Lay — locations: first_paragraph, body, schema, meta, title, h2 — count: 55 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Engineering Visibility" with AI Development Intelligence Layer. Remove or rephrase "AI-native production". — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — team comes with the AI Intelligence Layer: every AI dollar vi | it, and we run the AI Intelligence Layer that proves it agai — locations: first_paragraph, body, schema — count: 21 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ❌ _AI Engineering Visibility_ — d prove the return. AI Engineering Visibility AI Intelligence Lay — locations: body — count: 1 — fix: Replace "AI Engineering Visibility" with AI Development Intelligence Layer.
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ng engineering into AI-native production: every AI dollar vi | rn engineering into AI-native production for established sof — locations: meta, first_paragraph, body, schema — count: 5 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — GoGloby is an Applied AI Engineering partner turning engineering | GoGloby is an Applied AI Engineering partner. We turn engineerin — locations: meta, first_paragraph, body, schema — count: 11 — fix: Replace "Applied AI Engineering partner" with the approved company description.
  ❌ _Applied AI Company_ — Applied AI Company for Established Sof | What Is an Applied AI Company? — locations: title, h2, body, schema — count: 10 — fix: Replace "Applied AI Company" with the approved company description.
  ✅ _AI Production Engineering_
  ❌ _AI Leadership Search_ — t Works Recruitment AI Leadership Search We recruit US-based | irst, or alongside? AI Leadership Search runs in parallel. B — locations: body — count: 2 — fix: Remove or rephrase "AI Leadership Search".
  ❌ _every AI dollar visible_ — -native production: every AI dollar visible, every feature ship | Intelligence Layer: every AI dollar visible, cost — locations: meta, first_paragraph, schema — count: 3 — fix: Remove or rephrase "every AI dollar visible".
  ✅ _AI talent staffing_
  ❌ _Staffing gives capacity_ — the bottlenecks. S Staffing Gives Capacity, GoGloby Owns Outco — locations: body — count: 1 — fix: Remove or rephrase "Staffing gives capacity".
  ❌ _owns outcomes_ — s Capacity, GoGloby Owns Outcomes Outcome: Added capa — locations: body — count: 1 — fix: Remove or rephrase "owns outcomes".
  ✅ _free trial_
  ✅ _hire in 48 hours_
  ✅ _mid-level_
  ✅ _mid level_
❌ **C2** Context terms — evidence: “Start With a Benchmark” | “Claude Certified Architects” — locations: h2, body, meta — count: 56 — fix: Remove or rework term uses that conflict with Glossary §7; review each listed occurrence. — source: GoGloby Glossary §7 Terms and claims we do not use
  ❌ _c2:Benchmark:h2:0_ — “Applied AI Engineering Benchmark” — locations: h2 — count: 1 — fix: Remove Benchmark as the main CTA.
  ❌ _c2:Benchmark:body:1_ — “walk you through the Benchmark” — locations: body — count: 1 — fix: Remove Benchmark as the main CTA.
  ❌ _c2:Benchmark:body:2_ — “Start With a Benchmark” — locations: body — count: 1 — fix: Remove Benchmark as the main CTA.
  ❌ _c2:Benchmark:body:3_ — “Get Your Applied AI Engineering Benchmark” — locations: body — count: 1 — fix: Remove Benchmark as the main CTA.
  ✅ _c2:Benchmark:body:4_ — “benchmark your AI spend” — locations: body — count: 1
  ❌ _c2:Claude Certified Architect:body:5_ — “Claude Certified Architects, Claude-specific” — locations: body — count: 1 — fix: Remove the prohibited named architect role as an offer or positioning.
  ❌ _c2:AI Solutions Architect:body:6_ — “AI Solutions Architects, model-agnostic” — locations: body — count: 1 — fix: Remove the prohibited AI Solutions Architect offer/positioning.
  ❌ _c2:Applied AI Engineering:meta:7_ — “Applied AI Engineering partner” — locations: meta — count: 1 — fix: Remove the prohibited partner characterization.
  ✅ _c2:Applied AI Engineering:h2:8_ — “The Applied AI Engineering Gaps We Solve” — locations: h2 — count: 1
  ✅ _c2:Applied AI Engineering:h2:9_ — “How Our Applied AI Engineering Model Works” — locations: h2 — count: 1
  ✅ _c2:Applied AI Engineering:h2:10_ — “US-Aligned Applied AI Engineering Hubs” — locations: h2 — count: 1
  ❌ _c2:Applied AI Engineering:h2:11_ — “Get Your Applied AI Engineering Benchmark” — locations: h2 — count: 1 — fix: Remove Benchmark as the main CTA.
  ❌ _c2:Applied AI Engineering:body:12_ — “GoGloby is an Applied AI Engineering partner” — locations: body — count: 1 — fix: Remove the prohibited partner characterization.
  ✅ _c2:Applied AI Engineering:body:13_ — “Applied AI Engineering Gaps We Solve” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:14_ — “Applied AI Engineering Model Works” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:15_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:16_ — “GoGloby Applied AI Engineering engagement” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:17_ — “GoGloby Applied AI Engineering partner” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:18_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:19_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:20_ — “GoGloby Applied AI Engineering engagement” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:21_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:22_ — “GoGloby Applied AI Engineering partner” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:23_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:24_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:25_ — “GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:26_ — “Applied AI Engineering Hubs” — locations: body — count: 1
  ❌ _c2:Applied AI Engineering:body:27_ — “Get Your Applied AI Engineering Benchmark” — locations: body — count: 1 — fix: Remove Benchmark as the main CTA.
  ❌ _c2:Forward-Deployed Engineering:body:28_ — “Forward-Deployed Engineering” — locations: body — count: 1 — fix: Remove Forward Deployed Engineering as positioning or an offer; keep it only as a role.
  ✅ _c2:Forward-Deployed Engineers:body:29_ — “We embed Forward-Deployed Engineers” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:30_ — “we embed the forward-deployed engineers who ship it” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:31_ — “Forward-deployed engineers work inside your existing repositories” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:32_ — “Forward-Deployed Engineers Ship With You” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:33_ — “Forward-deployed engineers work with the team” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:34_ — “forward-deployed engineers who clear the bottlenecks” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:35_ — “Forward-Deployed Engineers who install the Agentic SDLC” — locations: body — count: 1
  ❌ _c2:Agentic SDLC:body:36_ — “run an agentic SDLC on production code” — locations: body — count: 1 — fix: Remove Agentic SDLC as positioning.
  ❌ _c2:Agentic SDLC:body:37_ — “install the Agentic SDLC” — locations: body — count: 1 — fix: Remove Agentic SDLC as positioning.
  ❌ _c2:AI ROI:body:38_ — “We prove AI ROI” — locations: body — count: 1 — fix: Remove hero/headline emphasis on AI ROI.
  ✅ _c2:AI ROI:body:39_ — “Invisible AI ROI” — locations: body — count: 1
  ✅ _c2:AI ROI:body:40_ — “connects AI ROI to shipped work” — locations: body — count: 1
  ✅ _c2:AI ROI:body:41_ — “measure AI ROI?” — locations: body — count: 1
  ✅ _c2:AI ROI:body:42_ — “board pressure to prove AI ROI” — locations: body — count: 1
  ✅ _c2:AI spend:body:43_ — “Uncontrolled AI Spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:44_ — “AI spending can grow quickly” — locations: body — count: 1
  ✅ _c2:AI spend:body:45_ — “connects AI spending to the work” — locations: body — count: 1
  ✅ _c2:AI spend:body:46_ — “AI spend by team, developer, and model” — locations: body — count: 1
  ✅ _c2:AI spend:body:47_ — “Where AI spending produces value” — locations: body — count: 1
  ✅ _c2:AI spend:body:48_ — “Compare delivery and AI spending” — locations: body — count: 1
  ✅ _c2:AI spend:body:49_ — “AI spending and engineering time” — locations: body — count: 1
  ✅ _c2:AI spend:body:50_ — “AI spending contributes to shipped work” — locations: body — count: 1
  ✅ _c2:AI spend:body:51_ — “Visibility into where AI spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:52_ — “AI spend optimization” — locations: body — count: 1
  ✅ _c2:AI spend:body:53_ — “benchmark your AI spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:54_ — “AI spending with engineering work” — locations: body — count: 1
  ❌ _c2:AI talent:body:55_ — “No Access to Proven AI Talent” — locations: body — count: 1 — fix: Replace standalone AI talent phrasing with approved service terminology.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: “Senior AI engineers inside your team in under 4 weeks” | “Vetted profiles delivered in 72 hours” appears in schema. — locations: body, schema — count: 2 — fix: Check and substantiate timing, offer, delivery and performance assertions against approved facts; remove unverified claims. — source: GoGloby Fact Sheet § Services; GoGloby Glossary §10 Fact sheet
  ❌ _Claims and service assertions_ — “under 4 weeks” | “first validated feature in 3 to 5 business days” — locations: body, schema — count: 2 — fix: Substantiate or remove claims not supported by the approved sources.
❌ **D2** Client figures — evidence: Hasbro card shows “$4.7B revenue”; Fact Sheet states “~$5B revenue”. | Zillow card shows “$2.58B revenue”; Fact Sheet states “~$2B revenue”. — locations: body — count: 12 — fix: Reconcile client figures with the Fact Sheet and remove figures that are not supported there. — source: GoGloby Fact Sheet § Featured clients
  ❌ _d2:hasbro — Hasbro_ — “$4.7B revenue” | Fact Sheet: “~$5B revenue” — locations: body — count: 1 — fix: Reconcile the displayed revenue figure with the Fact Sheet.
  ✅ _d2:tata — TATA_ — “$30B revenue · 600,000+ employees” | Fact Sheet: “~$30B revenue, 600,000+ employees” — locations: body — count: 1
  ⚠️ _d2:evercommerce — EverCommerce_ — “700,000+ business clients” | Fact Sheet: “700K+ clients” — locations: body — count: 1 — fix: Verify the displayed figure and its description against an approved source.
  ❌ _d2:zillow — Zillow_ — “$2.58B revenue” | Fact Sheet: “~$2B revenue” — locations: body — count: 1 — fix: Reconcile the displayed revenue figure with the Fact Sheet.
  ❌ _d2:devsisters — Devsisters_ — “200M+ users” — locations: body — count: 1 — fix: Remove or substantiate the figure; the Fact Sheet gives “200M+ players,” not users.
  ⚠️ _d2:drchrono — DrChrono_ — “$3B+ medical claims annually” | Fact Sheet: “$3B in medical claims processed” — locations: body — count: 1 — fix: Verify the figure and revise the claim to match the Fact Sheet's scope.
  ⚠️ _d2:mikeworldwide — MikeWorldWide_ — “$57M fee income · 230+ staff” — locations: body — count: 1 — fix: Remove or substantiate the unverified figures.
  ✅ _d2:every.io — Every.io_ — “$32M raised” | Fact Sheet: “$32M Series A” — locations: body — count: 1
  ❌ _d2:sydecar — Sydecar_ — “$3B+ AUA” | Fact Sheet: “$1B+ assets under administration” — locations: body — count: 1 — fix: Reconcile the displayed AUA figure with the Fact Sheet.
  ⚠️ _d2:bonusly — Bonusly_ — “$32.4M raised · 3,400+ clients” | Fact Sheet: “$20M Series B” — locations: body — count: 1 — fix: Remove or substantiate figures not verified in the Fact Sheet.
  ✅ _d2:alchemy health — Alchemy Health_ — “25M+ prescriptions” | Fact Sheet: “25M+ prescriptions” — locations: body — count: 1
  ✅ _d2:canopy — Canopy_ — “Series F · $236.5M raised” | Fact Sheet: “Series F, $236.5M raised” — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: not_in_fact_sheet | HASBRO NYSE · $13.4B market cap — locations: body, image_alt — count: 60 — fix: Verify client names against the Fact Sheet and remove any unsupported client references. — source: GoGloby Fact Sheet: Featured clients; decisions.md: Clients
  ✅ _client_card:hasbro nyse_ — fact_sheet_client | HASBRO NYSE · $13.4B market cap — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — fact_sheet_client | DR. CHRONO 17M+ patients — locations: body — count: 1
  ✅ _client_card:evercommerce_ — fact_sheet_client | EVERCOMMERCE Nasdaq-listed SaaS — locations: body — count: 1
  ✅ _client_card:keywords_ — fact_sheet_client | KEYWORDS $2.8B EQT acquisition — locations: body — count: 1
  ✅ _client_card:eqt_ — not_a_client | EQT acquisition · $844M revenue — locations: body — count: 1
  ✅ _client_card:tata_ — fact_sheet_client | TATA $106B market cap — locations: body — count: 1
  ✅ _client_card:canopy_ — fact_sheet_client | CANOPY Series F — locations: body — count: 1
  ✅ _client_card:sydecar_ — fact_sheet_client | SYDECAR $3B+ AUA — locations: body — count: 1
  ❌ _client_card:novilab_ — not_in_fact_sheet | NOVILAB Series B · $46M raised — locations: body — count: 1 — fix: Verify the client relationship or remove the unsupported client reference.
  ✅ _client_card:bonusly_ — fact_sheet_client | BONUSLY Series B — locations: body — count: 1
  ✅ _client_card:every_ — fact_sheet_client | EVERY $32M raised — locations: body — count: 1
  ✅ _client_card:alchemy_ — fact_sheet_client | ALCHEMY $31M seed — locations: body — count: 1
  ✅ _client_card:devsisters_ — fact_sheet_client | DEVSISTERS Public — locations: body — count: 1
  ✅ _client_card:zillow nasdaq_ — fact_sheet_client | ZILLOW NASDAQ — locations: body — count: 1
  ❌ _client_card:gitlab_ — not_in_fact_sheet | GITLAB $8B+ market cap — locations: body — count: 1 — fix: Verify the client relationship or remove the unsupported client reference.
  ✅ _client_card:ai. oyster_ — not_a_client | OYSTER $1.2B valuation — locations: body — count: 1
  ✅ _logo_image:background_ — not_a_client | alt: Background — locations: image_alt — count: 1
  ✅ _logo_image:forbes_ — not_a_client | alt: Forbes — locations: image_alt — count: 1
  ✅ _logo_image:london daily news_ — not_a_client | alt: London Daily News — locations: image_alt — count: 1
  ✅ _logo_image:nbc_ — not_a_client | alt: NBC — locations: image_alt — count: 1
  ✅ _logo_image:hubspot_ — not_a_client | alt: HubSpot — locations: image_alt — count: 1
  ✅ _logo_image:fox news_ — not_a_client | alt: Fox News — locations: image_alt — count: 1
  ✅ _logo_image:hasbro_ — fact_sheet_client | alt: Hasbro — locations: image_alt — count: 1
  ✅ _logo_image:evercommerce_ — fact_sheet_client | alt: Evercommerce — locations: image_alt — count: 1
  ✅ _logo_image:drchrono_ — fact_sheet_client | alt: DrChrono — locations: image_alt — count: 1
  ✅ _logo_image:mww_ — fact_sheet_client | alt: MWW — locations: image_alt — count: 1
  ✅ _logo_image:tata_ — fact_sheet_client | alt: TATA — locations: image_alt — count: 1
  ✅ _logo_image:zillow_ — fact_sheet_client | alt: Zillow — locations: image_alt — count: 1
  ✅ _logo_image:keywords_ — fact_sheet_client | alt: Keywords — locations: image_alt — count: 1
  ✅ _logo_image:deel 1 grayscale_ — fact_sheet_client | file_name: logo-deel-1-grayscale.png; alt:  — locations: image_alt — count: 1
  ✅ _logo_image:disney 1 grayscale_ — not_a_client | file_name: logo-disney-1-grayscale.png; alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20158%20160%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20137%20160%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20162%20160%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20160%20153%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20196%20200%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20187%20160%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20200%20168%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:arrow icon_ — not_a_client | alt: Arrow icon — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20200%20184%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20200%20194%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:map_ — not_a_client | alt: Map — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20228%2072%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20348%20102%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20294%20126%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20210%2075%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%2072%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20357%2090%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%20102%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20603%20138%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201024%20683%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201024%20797%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201024%20645%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ⏭️ _text_cue:nfl_ — not judged by LLM — locations: body
  ⏭️ _text_cue:wnba_ — not judged by LLM — locations: body
❌ **D4** Press and partners — evidence: “Trusted by 100+ Clients Across 10+ Industries” | “No fee until hire, 120-day replacement.” — locations: body — count: 2 — fix: Substantiate or remove unverified client-count and service claims; reconcile guarantees with approved service terms. — source: GoGloby Fact Sheet § Services; GoGloby Fact Sheet § Key metrics
  ⚠️ _Client count claim_ — “Trusted by 100+ Clients” — locations: body — count: 1 — fix: Verify the client-count claim against an approved source.
  ❌ _Guarantee and offer claims_ — “120-Day Performance Guarantee” | “No fee until hire” — locations: body — count: 1 — fix: Align guarantee descriptions with the applicable service terms in the Fact Sheet.

## E. Positioning

❌ **E1** Service fit — evidence: “Forward-Deployed Engineering” | “Applied AI Services GoGloby Delivers” — locations: body — count: 1 — fix: Describe the business and offerings within the approved recruiting and staffing service scope. — source: decisions.md § Company description; GoGloby Fact Sheet § Services
❌ **E2** Positioning — evidence: “We embed Forward-Deployed Engineers” — locations: body — count: 1 — fix: Align the page’s service descriptions and delivery claims with the approved services and terms. — source: GoGloby Fact Sheet § Services
❌ **E3** Call to action — evidence: “We prove AI ROI” — locations: body — count: 1 — fix: Remove or revise claims that conflict with the glossary’s rule against hero or headline positioning on AI ROI or AI spend. — source: GoGloby Glossary §7 Terms and claims we do not use
❌ **E4** Lead order — evidence: “GoGloby delivers outcomes, not hours” — locations: body — count: 1 — fix: Remove outcome claims that conflict with the approved role of GoGloby as recruiter and staffing provider. — source: GoGloby Fact Sheet § Identity

## F. GEO

❌ **F1** Answer first — evidence: “Applied AI Company for Established Software” — locations: title — count: 1 — fix: Align the title with the approved company description and approved homepage positioning. — source: decisions.md § Company description; GoGloby Glossary §7
❌ **F2** Buyer problem — evidence: “GoGloby is an Applied AI Engineering partner” — locations: meta — count: 1 — fix: Use the approved company description rather than the prohibited characterization. — source: decisions.md § Company description; GoGloby Glossary §7
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
❌ **F4** GoGloby named near claims — evidence: “Uncover & Fix What’s Holding Your AI Engineering Back” — locations: h1 — count: 1 — fix: Align the hero headline with the approved service positioning and remove AI spend/ROI-led framing where present. — source: GoGloby Glossary §7; GoGloby Glossary §9
❌ **F5** FAQ — evidence: “Featured: What Is an Applied AI Company?” — locations: body — count: 1 — fix: Reduce explanatory material that positions the company as an Applied AI Company and focus content on buyers ready to hire. — source: GoGloby Glossary §7; GoGloby Glossary §9
❌ **F6** Audience — evidence: buyer_ready | “What is an applied AI company?” — locations: body — count: 1 — fix: Remove or revise informational sections and prioritize content for buyers ready to hire. — source: GoGloby Glossary §9 How we write

## G. Target keyword

⚠️ **G1** Target keyword — evidence: none | “AI engineering” — locations: title, h1 — count: 1 — fix: Consider aligning the title and first lines with a priority service/category term from the glossary. — source: GoGloby Glossary §7 Terms and claims we do not use
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “Start With a Benchmark” — locations: body — count: 1 — fix: Remove Benchmark as the main call to action. — source: GoGloby Glossary §7 Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: remove — locations: body — count: 1 — fix: Remove prohibited terminology and unsupported service offers identified in the audit. — source: GoGloby Glossary §7 Terms and claims we do not use
❌ **H2** Priority — evidence: high — locations: title, body — count: 1 — fix: Prioritize correcting the positioning and service claims in the title and hero, then reconcile unsupported client figures and schema. — source: decisions.md § Company description; GoGloby Fact Sheet § Identity
❌ **H3** Reasons — evidence: - The title and meta description use prohibited company positioning. | - Multiple claims describe software/consulting and outcomes beyond the approved staffing and recruiting scope. | - Client figures conflict with or are unsupported by the Fact Sheet. | - Organization schema identity and founder descriptions are inconsistent with approved sources. — locations: title, meta, body, schema — count: 4 — fix: Address the listed identity, scope, factual-accuracy, and structured-data issues. — source: decisions.md; GoGloby Fact Sheet § Identity, Founders, Featured clients; GoGloby Glossary §7
