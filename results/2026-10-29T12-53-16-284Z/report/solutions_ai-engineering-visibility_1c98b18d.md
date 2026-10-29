# Page report

- **URL:** https://gogloby.com/solutions/ai-engineering-visibility/
- **Type:** service
- **Action:** needs_decision
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 64 characters: "AI Cost Management and Engineering Visib..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
✅ **A3** Meta description length — evidence: 148 characters — locations: meta — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/solutions/ai-engineering-visibility/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **A10** Image alt text — evidence: 41 images without alt — locations: image_alt — count: 41 — fix: Add alt text to main content images. — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, ImageObject, Brand, PostalAddress, ContactPoint, Person, QuantitativeValue, AggregateRating, OfferCatalog, Offer, Service, BusinessAudience, WebSite, FAQPage, Question, Answer — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization schema: slogan "Applied AI Engineering Partner"; description "We are a US-based talent acquisition agency..."; legalName "Gogloby LLC" — locations: schema — count: 3 — fix: Review the Organization schema fields slogan, description, and legalName against the approved company facts and spelling. — source: decisions.md: Company description and Spelling; GoGloby Fact Sheet: Identity
  ❌ _Organization slogan_ — "Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Review the slogan against approved company positioning.
  ❌ _Organization description_ — "US-based talent acquisition agency specializing in assisting tech companies" — locations: schema — count: 1 — fix: Review the schema description against the approved company description.
  ❌ _Organization legalName_ — "Gogloby LLC" — locations: schema — count: 1 — fix: Correct the schema legal name to match the approved spelling and legal name.
❌ **B3** Person data — evidence: Sergey: "Leads the Agentic SDLC methodology... technical architecture behind the Applied AI Engineering system." | Vit: "Built the Applied AI Engineering system" — locations: schema — count: 2 — fix: Review Person descriptions and knowsAbout fields for disallowed positioning and align them with approved founder information. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — "technical architecture behind the Applied AI Engineering system" | knowsAbout includes "Applied AI Engineering" — locations: schema — count: 1 — fix: Review the description and knowsAbout terms against approved founder facts and terminology.
  ❌ _Vit Koval_ — "Built the Applied AI Engineering system" | knowsAbout includes "Applied AI Engineering Partnerships" — locations: schema — count: 1 — fix: Review the description and knowsAbout terms against approved founder facts and terminology.
✅ **B4** Schema matches the page — evidence: The title and H1 both identify an AI cost management solution. — locations: title, h1 — count: 1 — source: Glossary §9

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: hipped feature. The AI Intelligence Layer joins your AI spend | AI Engineering Visibility: AI ENGINEERING VISIBILITY AI Cost Management — locations: body, schema, title, h1, h2 — count: 69 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Engineering Visibility" with AI Development Intelligence Layer. Replace "AI Cost Management" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — hipped feature. The AI Intelligence Layer joins your AI spend | he Org We built the AI Intelligence Layer for the people who — locations: body, schema — count: 16 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ❌ _AI Engineering Visibility_ — AI ENGINEERING VISIBILITY AI Cost Management — locations: body — count: 1 — fix: Replace "AI Engineering Visibility" with AI Development Intelligence Layer.
  ❌ _AI Cost Management_ — AI Cost Management and Engineering Vis | AI Cost Management and Engineering Vis — locations: title, h1, h2, body, schema — count: 40 — fix: Replace "AI Cost Management" with AI Development Intelligence Layer.
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ns engineering into AI-native production. It puts Claude int | ng engineering into AI-native production: every AI dollar vi — locations: schema — count: 2 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS | A long-term GoGloby Applied AI Engineering partner. N Oil & Gas NOVILA — locations: body, schema — count: 9 — fix: Replace "Applied AI Engineering partner" with the approved company description.
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
❌ **C2** Context terms — evidence: Get Your AI Cost Benchmark | A GoGloby Applied AI Engineering client — locations: h2, body — count: 33 — fix: Remove Benchmark as a CTA and revise the company/client descriptions that use Applied AI Engineering as positioning. — source: GoGloby Glossary §7
  ❌ _c2:Benchmark:h2:0_ — Your AI Cost Management Benchmark — locations: h2 — count: 1 — fix: Remove Benchmark as a call to action.
  ❌ _c2:Benchmark:body:1_ — Get Your AI Cost Benchmark — locations: body — count: 1 — fix: Remove Benchmark as a call to action.
  ✅ _c2:Benchmark:body:2_ — Benchmark Setup Outcome — locations: body — count: 1
  ❌ _c2:Benchmark:body:3_ — START WITH A FREE BENCHMARK — locations: body — count: 1 — fix: Remove Benchmark as a call to action.
  ❌ _c2:Benchmark:body:4_ — Your AI Cost Management Benchmark — locations: body — count: 1 — fix: Remove Benchmark as a call to action.
  ✅ _c2:Benchmark:body:5_ — If you stop after the Benchmark — locations: body — count: 1
  ❌ _c2:Benchmark:body:6_ — Get Your AI Cost Benchmark — locations: body — count: 1 — fix: Remove Benchmark as a call to action.
  ✅ _c2:Benchmark:body:7_ — That’s the Benchmark. One week — locations: body — count: 1
  ✅ _c2:Benchmark:body:8_ — What happens after the Benchmark? — locations: body — count: 1
  ✅ _c2:Benchmark:body:9_ — If you stop after the Benchmark — locations: body — count: 1
  ❌ _c2:Applied AI Engineering:body:10_ — A GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:11_ — An active GoGloby Applied AI Engineering engagement — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:12_ — A long-term GoGloby Applied AI Engineering partner — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:13_ — A GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:14_ — A GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:15_ — A long-term GoGloby Applied AI Engineering partner — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:16_ — An active GoGloby Applied AI Engineering engagement — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:17_ — A GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:18_ — A long-term GoGloby Applied AI Engineering partner — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:19_ — A GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ❌ _c2:Applied AI Engineering:body:20_ — A GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Revise this description of GoGloby’s client relationship.
  ✅ _c2:Forward-Deployed Engineers:body:21_ — forward-deployed engineers work inside your team — locations: body — count: 1
  ❌ _c2:Agentic SDLC:body:22_ — set up the Agentic SDLC — locations: body — count: 1 — fix: Remove Agentic SDLC as a promoted offer/positioning.
  ✅ _c2:AI spend:body:23_ — optimizing AI spend across models — locations: body — count: 1
  ✅ _c2:AI spend:body:24_ — joins your AI spend to your actual work — locations: body — count: 1
  ✅ _c2:AI spend:body:25_ — AI Spend Is Untraceable at Source — locations: body — count: 1
  ✅ _c2:AI spend:body:26_ — makes AI spend comparable across teams — locations: body — count: 1
  ✅ _c2:AI spend:body:27_ — forecasted AI spend to what each team actually consumed — locations: body — count: 1
  ✅ _c2:AI spend:body:28_ — turn AI spend into shipped code — locations: body — count: 1
  ✅ _c2:AI spend:body:29_ — need AI spend broken down to the feature — locations: body — count: 1
  ✅ _c2:AI spend:body:30_ — joins your AI spend to your actual work — locations: body — count: 1
  ✅ _c2:AI spend:body:31_ — optimizing AI spend across models — locations: body — count: 1
  ✅ _c2:AI spend:body:32_ — joining AI spend to engineering output — locations: body — count: 1
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 21 em dash(es) found. — locations: body — count: 21 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "The whole pipeline deploys into your VPC" | "Telemetry never leaves the account" — locations: body — count: 1 — fix: Verify that these product and security claims are supported by approved company facts before publishing. — source: GoGloby Fact Sheet: Legal and security; Glossary §7
  ❌ _Unverified product/security claims_ — "The whole pipeline deploys into your VPC" — locations: body — count: 1 — fix: Verify the claim against approved product and security facts.
❌ **D2** Client figures — evidence: Hasbro: "$4.7B revenue"; TATA: "$30B revenue"; EverCommerce: "700,000+ business clients" — locations: body — count: 11 — fix: Check each displayed client metric against the Fact Sheet; remove, correct, or substantiate conflicting and unverified figures. — source: GoGloby Fact Sheet: Featured clients
  ❌ _d2:hasbro_ — Hasbro: "$4.7B revenue"; Fact Sheet: "~$5B revenue" — locations: body — count: 1 — fix: Reconcile the revenue and market-cap figures with the Fact Sheet.
  ✅ _d2:tata_ — TATA: "$30B revenue · 600,000+ employees" — locations: body — count: 1
  ⚠️ _d2:evercommerce_ — EverCommerce: "700,000+ business clients"; Fact Sheet says "700K+ clients" — locations: body — count: 1 — fix: Verify the wording and additional market-cap figure against an approved source.
  ⚠️ _d2:devsisters_ — Devsisters: "200M+ users"; Fact Sheet: "200M+ players" — locations: body — count: 1 — fix: Verify the users wording and extra figures against the Fact Sheet.
  ✅ _d2:drchrono_ — DrChrono: "17M+ patients · $3B+ medical claims annually" — locations: body — count: 1
  ⚠️ _d2:mikeworldwide_ — MikeWorldWide: "$57M fee income · 230+ staff" — locations: body — count: 1 — fix: Verify the financial and employee metrics against an approved source.
  ⚠️ _d2:every.io_ — Every: "$60M+ payroll processed" — locations: body — count: 1 — fix: Verify the figure against an approved source; it is not listed in the Fact Sheet.
  ❌ _d2:sydecar_ — Sydecar: "$3B+ AUA"; Fact Sheet: "$1B+ assets under administration" — locations: body — count: 1 — fix: Reconcile the AUA figure with the Fact Sheet.
  ⚠️ _d2:bonusly_ — Bonusly: "$32.4M raised"; Fact Sheet: "$20M Series B" — locations: body — count: 1 — fix: Verify and reconcile the funding figure with the Fact Sheet.
  ✅ _d2:alchemy health_ — Alchemy Health: "$31M seed · 25M+ prescriptions" — locations: body — count: 1
  ✅ _d2:canopy_ — Canopy: "Series F · $236.5M raised" — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: not_in_fact_sheet | NOVILAB — locations: body, image_alt — count: 51 — fix: Remove or verify client claims for names not present in the Fact Sheet; retain non-client labels and decorative image items as non-clients. — source: GoGloby Fact Sheet.md — Featured clients
  ✅ _client_card:who uses it_ — not_a_client | WHO USES IT — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — fact_sheet_client | DR. CHRONO 17M+ patients — locations: body — count: 1
  ✅ _client_card:evercommerce_ — fact_sheet_client | EVERCOMMERCE — locations: body — count: 1
  ✅ _client_card:keywords_ — fact_sheet_client | KEYWORDS — locations: body — count: 1
  ✅ _client_card:eqt_ — not_a_client | EQT acquisition — locations: body — count: 1
  ✅ _client_card:tata_ — fact_sheet_client | TATA — locations: body — count: 1
  ✅ _client_card:canopy_ — fact_sheet_client | CANOPY — locations: body — count: 1
  ✅ _client_card:sydecar_ — fact_sheet_client | SYDECAR — locations: body — count: 1
  ❌ _client_card:novilab_ — not_in_fact_sheet | NOVILAB Series B — locations: body — count: 1 — fix: Verify the client claim against the Fact Sheet or remove it.
  ✅ _client_card:bonusly_ — fact_sheet_client | BONUSLY — locations: body — count: 1
  ✅ _client_card:every_ — fact_sheet_client | EVERY — locations: body — count: 1
  ✅ _client_card:alchemy_ — fact_sheet_client | ALCHEMY — locations: body — count: 1
  ✅ _client_card:devsisters_ — fact_sheet_client | DEVSISTERS — locations: body — count: 1
  ✅ _logo_image:background_ — not_a_client | alt: Background — locations: image_alt — count: 1
  ✅ _logo_image:anthropic_ — not_a_client | alt: Anthropic — locations: image_alt — count: 1
  ✅ _logo_image:nvidia_ — not_a_client | alt: Nvidia — locations: image_alt — count: 1
  ✅ _logo_image:augment code_ — not_a_client | alt: Augment Code — locations: image_alt — count: 1
  ✅ _logo_image:snowflake_ — not_a_client | alt: Snowflake — locations: image_alt — count: 1
  ✅ _logo_image:cursor_ — not_a_client | alt: Cursor — locations: image_alt — count: 1
  ✅ _logo_image:gemini_ — not_a_client | alt: Gemini — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20157%20143%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20175%20158%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20120%20158%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20900%20496%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2035%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2034%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2031%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2031%2035%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2032%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2027%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2033%2035%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2032%2032%22%3e%3c%2fsvg%3e_ — not_a_client | alt:  — locations: image_alt — count: 1
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
  ✅ _text_cue:hasbro_ — fact_sheet_client | HASBRO — locations: body — count: 1
  ✅ _text_cue:nyse_ — not_a_client | NYSE — locations: body — count: 1
  ✅ _text_cue:nfl_ — not_a_client | NFL — locations: body — count: 1
  ✅ _text_cue:wnba_ — not_a_client | WNBA — locations: body — count: 1
❌ **D4** Press and partners — evidence: "NOVILAB ... An active GoGloby Applied AI Engineering engagement" | "An active GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Review the client and engagement claims for entities not included in the Fact Sheet. TATA is explicitly approved as a client by decisions.md. — source: decisions.md: Clients; GoGloby Fact Sheet: Featured clients
  ❌ _Non-verified client claim_ — "NOVILAB ... An active GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Verify or remove the unlisted client and engagement claim.

## E. Positioning

❌ **E1** Service fit — evidence: "Only GoGloby prices shipped features and deploys engineers to fix what the AI Intelligence Layer finds." — locations: body — count: 1 — fix: Review the page’s service fit: the page presents software/product and forward-deployed engineering services rather than the approved recruiting or staffing offers. — source: GoGloby Fact Sheet: Services; Glossary §2
❌ **E2** Positioning — evidence: "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Review the call to action against the approved service-page CTA guidance in Glossary §7. — source: Glossary §7
✅ **E3** Call to action — evidence: "CTOs, VPs of Engineering, platform leaders, and finance leaders" — locations: body — count: 1 — source: GoGloby Fact Sheet: Services; Glossary §2
❌ **E4** Lead order — evidence: "Who needs AI cost management software?" — locations: body — count: 1 — fix: Review informational FAQ content against the buyer-ready audience and page-writing guidance. — source: Glossary §9

## F. GEO

❌ **F1** Answer first — evidence: "What Is AI Cost Management?" — locations: h2 — count: 1 — fix: Review the page focus against approved GoGloby recruiting and staffing services. — source: GoGloby Fact Sheet: Services
❌ **F2** Buyer problem — evidence: "AI Cost Management and Engineering Visibility Solution" — locations: title, h1 — count: 1 — fix: Review the title and H1 for terminology and service alignment. — source: Glossary §7
❌ **F3** Recruiting firm stated early — evidence: "AI Intelligence Layer" — locations: body — count: 16 — fix: Use the approved product name where the product is referenced. — source: Glossary §7
❌ **F4** GoGloby named near claims — evidence: "WHAT WE BUILT Enterprise AI Cost Management Dashboard" — locations: body — count: 1 — fix: Review claims about product offerings against approved service and product facts. — source: GoGloby Fact Sheet: Services
❌ **F5** FAQ — evidence: "First numbers in one week" — locations: body — count: 1 — fix: Verify timelines and offer claims against approved service facts. — source: GoGloby Fact Sheet: Services
❌ **F6** Audience — evidence: not_targeted | "Who needs AI cost management software?" — locations: body — count: 1 — fix: Refocus the page on companies ready to hire GoGloby for its approved recruiting or staffing services rather than software/product buyers. — source: Glossary §9

## G. Target keyword

⚠️ **G1** Target keyword — evidence: none | "AI Cost Management and Engineering Visibility Solution" — locations: title, h1 — count: 1 — fix: Review the target keyword and title against the approved service-page keyword strategy; trap terms should not lead page targeting. — source: Glossary §§6, 8
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Review the CTA against Glossary §7 guidance on Benchmark as the main call to action. — source: Glossary §7
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: action token only: remove — locations: title, h1, body, schema — count: 1 — fix: Review title, H1, product naming, schema positioning, and CTA for alignment with approved company terminology and services. — source: decisions.md: Company description; Glossary §§2, 7
❌ **H2** Priority — evidence: high — locations: title, h1, body, schema — count: 1 — fix: Prioritize removal or review of prohibited product names and company-positioning claims, then validate unsupported client figures and software/service claims. — source: Glossary §§2, 7; GoGloby Fact Sheet: Featured clients
❌ **H3** Reasons — evidence: - The page promotes AI cost-management software and engineering visibility rather than the approved staffing and recruiting services. | - Page language includes prohibited positioning such as “Applied AI Engineering” and legacy “AI Intelligence Layer.” | - Multiple client metrics conflict with or are absent from the Fact Sheet; NOVILAB is not listed there. — locations: title, h1, body, schema — count: 1 — fix: Review product/service fit, terminology, client metrics, and unsupported client claims before publication. — source: GoGloby Fact Sheet: Services and Featured clients; Glossary §§2, 7, 9
