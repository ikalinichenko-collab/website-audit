# Page report

- **URL:** https://gogloby.com/solutions/ai-engineering-visibility/
- **Type:** service
- **Action:** needs_decision
- **Priority:** medium

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
❌ **B2** Organization data — evidence: Schema slogan: "Applied AI Engineering Partner" | Schema description: "US-based talent acquisition agency" — locations: schema — count: 4 — fix: Review and correct the Organization name, legalName, slogan, and description against the approved company identity. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ✅ _Organization name_ — "name":"GoGloby" — locations: schema — count: 1
  ❌ _Organization legalName_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name to the approved spelling.
  ❌ _Organization slogan_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the unapproved positioning in the Organization slogan.
  ❌ _Organization description_ — "US-based talent acquisition agency specializing in assisting tech companies" — locations: schema — count: 1 — fix: Replace the Organization description with the approved company description.
❌ **B3** Person data — evidence: Sergey: "technical architecture behind the Applied AI Engineering system" | Vit: "Built the Applied AI Engineering system" — locations: schema — count: 2 — fix: Align the Person descriptions and knowsAbout values with approved founder information; remove unapproved positioning and claims. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders
  ❌ _Sergey Matikaynen_ — "technical architecture behind the Applied AI Engineering system" | knowsAbout includes "Applied AI Engineering" — locations: schema — count: 1 — fix: Review the founder description and knowsAbout values for unapproved positioning.
  ❌ _Vit Koval_ — "For the past decade" | "generating $60M+ in value" — locations: schema — count: 1 — fix: Align the description and knowsAbout values with the approved founder facts.
✅ **B4** Schema matches the page — evidence: The page body uses "GoGloby". — locations: body — count: 0 — source: decisions.md: Spelling

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
❌ **C2** Context terms — evidence: "Get Your AI Cost Benchmark" | "A GoGloby Applied AI Engineering client" — locations: h2, body — count: 33 — fix: Review the listed prohibited CTA and company-positioning uses under Glossary §7. — source: GoGloby Glossary §7
  ❌ _c2:Benchmark:h2:0_ — "Your AI Cost Management Benchmark" — locations: h2 — count: 1 — fix: Remove Benchmark as a primary call to action.
  ❌ _c2:Benchmark:body:1_ — "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Remove Benchmark as the call to action.
  ✅ _c2:Benchmark:body:2_ — "Benchmark Setup Outcome" — locations: body — count: 1
  ❌ _c2:Benchmark:body:3_ — "START WITH A FREE BENCHMARK" — locations: body — count: 1 — fix: Remove the prohibited free benchmark offer.
  ❌ _c2:Benchmark:body:4_ — "Your AI Cost Management Benchmark" — locations: body — count: 1 — fix: Remove Benchmark as the primary call to action.
  ✅ _c2:Benchmark:body:5_ — "If you stop after the Benchmark" — locations: body — count: 1
  ❌ _c2:Benchmark:body:6_ — "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Remove Benchmark as the call to action.
  ✅ _c2:Benchmark:body:7_ — "That’s the Benchmark" — locations: body — count: 1
  ✅ _c2:Benchmark:body:8_ — "What happens after the Benchmark?" — locations: body — count: 1
  ✅ _c2:Benchmark:body:9_ — "stop after the Benchmark" — locations: body — count: 1
  ❌ _c2:Applied AI Engineering:body:10_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:11_ — "GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:12_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:13_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:14_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:15_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:16_ — "GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:17_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:18_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:19_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Applied AI Engineering:body:20_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ✅ _c2:Forward-Deployed Engineers:body:21_ — "forward-deployed engineers work inside your team" — locations: body — count: 1
  ⚠️ _c2:Agentic SDLC:body:22_ — "set up the Agentic SDLC" — locations: body — count: 1 — fix: Review this as a named offer; Glossary §7 disallows Agentic SDLC as a main marketing keyword.
  ✅ _c2:AI spend:body:23_ — "optimizing AI spend across models" — locations: body — count: 1
  ✅ _c2:AI spend:body:24_ — "AI spend to your actual work" — locations: body — count: 1
  ✅ _c2:AI spend:body:25_ — "AI Spend Is Untraceable at Source" — locations: body — count: 1
  ✅ _c2:AI spend:body:26_ — "AI spend comparable across teams" — locations: body — count: 1
  ✅ _c2:AI spend:body:27_ — "forecasted AI spend" — locations: body — count: 1
  ✅ _c2:AI spend:body:28_ — "turn AI spend into shipped code" — locations: body — count: 1
  ✅ _c2:AI spend:body:29_ — "AI spend broken down to the feature" — locations: body — count: 1
  ✅ _c2:AI spend:body:30_ — "AI spend to your actual work" — locations: body — count: 1
  ✅ _c2:AI spend:body:31_ — "optimizing AI spend" — locations: body — count: 1
  ✅ _c2:AI spend:body:32_ — "joining AI spend to engineering output" — locations: body — count: 1
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 21 em dash(es) found. — locations: body — count: 21 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

➖ **D1** Company facts — evidence: No D1 candidate evidence supplied. — count: 0 — source: GoGloby Fact Sheet: Selected clients; Featured clients
❌ **D2** Client figures — evidence: HASBRO: "$4.7B revenue" | TATA: "$30B revenue" — locations: body — count: 11 — fix: Verify and correct the client metrics that conflict with or are not supported by the Fact Sheet. — source: GoGloby Fact Sheet: Featured clients
  ⚠️ _d2:hasbro — Hasbro_ — "$4.7B revenue"; Fact Sheet: "~$5B revenue" — locations: body — count: 1 — fix: Verify the revenue figure against an approved current source.
  ⚠️ _d2:tata — TATA_ — "$30B revenue"; Fact Sheet: "~$30B revenue" — locations: body — count: 1 — fix: Verify other displayed metrics, including the market-cap and employee claims.
  ⚠️ _d2:evercommerce — EverCommerce_ — "$1.98B market cap"; Fact Sheet lists "~$700M revenue, 700K+ clients" — locations: body — count: 1 — fix: Verify the market-cap figure; it is not in the Fact Sheet.
  ⚠️ _d2:devsisters — Devsisters_ — "200M+ users"; Fact Sheet: "200M+ players" — locations: body — count: 1 — fix: Verify the additional displayed figures not established in the Fact Sheet.
  ✅ _d2:drchrono — DrChrono_ — "17M+ patients · $3B+ medical claims annually"; Fact Sheet: "17M+ patients, $3B in medical claims processed" — locations: body — count: 1
  ⚠️ _d2:mikeworldwide — MikeWorldWide_ — "$57M fee income · 230+ staff"; Fact Sheet provides no corresponding metrics — locations: body — count: 1 — fix: Verify the fee-income and staff figures.
  ⚠️ _d2:every.io — Every.io_ — "$60M+ payroll processed"; Fact Sheet does not provide this figure — locations: body — count: 1 — fix: Verify displayed figures not supported by the Fact Sheet.
  ❌ _d2:sydecar — Sydecar_ — "$3B+ AUA"; Fact Sheet: "$1B+ assets under administration" — locations: body — count: 1 — fix: Correct the AUA figure to the Fact Sheet value or substantiate the revised figure.
  ⚠️ _d2:bonusly — Bonusly_ — "$32.4M raised"; Fact Sheet: "$20M Series B" — locations: body — count: 1 — fix: Verify the total raised figure; the Fact Sheet supports $20M Series B.
  ⚠️ _d2:alchemy health — Alchemy Health_ — "$31M seed"; Fact Sheet: "$32M raised" — locations: body — count: 1 — fix: Verify the amount and clarify its basis.
  ✅ _d2:canopy — Canopy_ — "Series F · $236.5M raised"; Fact Sheet: "Series F, $236.5M raised" — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: "NOVILAB" appears as a client but is not in the Fact Sheet. — locations: body, image_alt — count: 53 — fix: Remove or verify client claims not supported by the Fact Sheet; distinguish non-client text and decorative image labels from client listings. — source: GoGloby Fact Sheet: Featured clients; decisions.md: Clients
  ✅ _client_card:who uses it_ — not_a_client | "WHO USES IT" — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — fact_sheet_client | "DR. CHRONO 17M+ patients" — locations: body — count: 1
  ✅ _client_card:evercommerce_ — fact_sheet_client | "EVERCOMMERCE Nasdaq-listed SaaS" — locations: body — count: 1
  ✅ _client_card:keywords_ — fact_sheet_client | "KEYWORDS $2.8B EQT acquisition" — locations: body — count: 1
  ✅ _client_card:eqt_ — not_a_client | "EQT acquisition" — locations: body — count: 1
  ✅ _client_card:tata_ — fact_sheet_client | "TATA $106B market cap" — locations: body — count: 1
  ✅ _client_card:canopy_ — fact_sheet_client | "CANOPY Series F" — locations: body — count: 1
  ✅ _client_card:sydecar_ — fact_sheet_client | "SYDECAR $3B+ AUA" — locations: body — count: 1
  ❌ _client_card:novilab_ — not_in_fact_sheet | "NOVILAB Series B" — locations: body — count: 1 — fix: Verify the client relationship and add an approved source, or remove the client card.
  ✅ _client_card:bonusly_ — fact_sheet_client | "BONUSLY Series B" — locations: body — count: 1
  ✅ _client_card:every_ — fact_sheet_client | "EVERY $32M raised" — locations: body — count: 1
  ✅ _client_card:alchemy_ — fact_sheet_client | "ALCHEMY $31M seed" — locations: body — count: 1
  ✅ _client_card:devsisters_ — fact_sheet_client | "DEVSISTERS Public" — locations: body — count: 1
  ✅ _logo_image:background_ — not_a_client | "alt: Background" — locations: image_alt — count: 1
  ✅ _logo_image:anthropic_ — not_a_client | "alt: Anthropic" — locations: image_alt — count: 1
  ✅ _logo_image:nvidia_ — not_a_client | "alt: Nvidia" — locations: image_alt — count: 1
  ✅ _logo_image:augment code_ — not_a_client | "alt: Augment Code" — locations: image_alt — count: 1
  ✅ _logo_image:snowflake_ — not_a_client | "alt: Snowflake" — locations: image_alt — count: 1
  ✅ _logo_image:cursor_ — not_a_client | "alt: Cursor" — locations: image_alt — count: 1
  ✅ _logo_image:gemini_ — not_a_client | "alt: Gemini" — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20157%20143%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20175%20158%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20120%20158%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20900%20496%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2035%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2034%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2031%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2031%2035%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2032%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2035%2027%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2033%2035%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%2032%2032%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20228%2072%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20348%20102%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20294%20126%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20210%2075%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%2072%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20357%2090%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%20102%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20603%20138%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c%2fsvg%3e_ — not_a_client | "alt: " (empty alt) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c%2fsvg%3e_ — not_a_client | alt omitted — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c%2fsvg%3e_ — not_a_client | alt omitted — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c%2fsvg%3e_ — not_a_client | alt omitted — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c%2fsvg%3e_ — not_a_client | alt omitted — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_a_client | alt omitted — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_a_client | alt omitted — locations: image_alt — count: 1
  ✅ _text_cue:hasbro_ — fact_sheet_client | "HASBRO NYSE" — locations: body — count: 1
  ✅ _text_cue:nyse_ — not_a_client | "NYSE" — locations: body — count: 1
  ✅ _text_cue:nfl_ — not_a_client | "NFL" — locations: body — count: 1
  ✅ _text_cue:wnba_ — not_a_client | "WNBA" — locations: body — count: 1
  ✅ _text_cue:every_ — fact_sheet_client | "EVERY $32M raised" — locations: body — count: 1
⚠️ **D4** Press and partners — evidence: "Working with GoGloby to build their AI engineering leadership." — locations: body — count: 1 — fix: Verify the displayed client relationships and descriptions not established in the Fact Sheet. — source: GoGloby Fact Sheet: Featured clients
  ⚠️ _Client relationship claims_ — "A GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Verify client relationship and engagement descriptions that are not supported by the Fact Sheet.

## E. Positioning

❌ **E1** Service fit — evidence: informational / software-tool positioning: "What Is AI Cost Management?" — locations: h1, body — count: 1 — fix: Refocus the page on the approved recruiting or staffing service and its hiring audience. — source: GoGloby Glossary §2, §9
❌ **E2** Positioning — evidence: "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Remove the benchmark offer and align the page's offer with an approved GoGloby service. — source: GoGloby Glossary §7
❌ **E3** Call to action — evidence: "AI Intelligence Layer" — locations: body — count: 16 — fix: Use the approved product name where applicable and remove unsupported standalone product positioning. — source: GoGloby Glossary §7; GoGloby Fact Sheet: Services
❌ **E4** Lead order — evidence: "AI cost management" — locations: title, h1, body — count: 1 — fix: Review whether this page belongs on the site; its product/tool framing is outside the documented service offering. — source: GoGloby Fact Sheet: Services; GoGloby Glossary §2

## F. GEO

❌ **F1** Answer first — evidence: "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Replace the benchmark-oriented conversion path with an approved service inquiry path. — source: GoGloby Glossary §7
❌ **F2** Buyer problem — evidence: "START WITH A FREE BENCHMARK" — locations: body — count: 1 — fix: Remove the unapproved free benchmark offer. — source: GoGloby Glossary §7
⚠️ **F3** Recruiting firm stated early — evidence: "Submit your information to schedule a technical briefing." — locations: body — count: 1 — fix: Clarify the connection between the contact form and an approved recruiting or staffing service. — source: GoGloby Glossary §2
❌ **F4** GoGloby named near claims — evidence: "Get Your AI Cost Benchmark" — locations: body — count: 1 — fix: Remove the prohibited Benchmark primary CTA. — source: GoGloby Glossary §7
⚠️ **F5** FAQ — evidence: "schedule a technical briefing" — locations: body — count: 1 — fix: Ensure the form and follow-up promise reflect an approved service and buyer journey. — source: GoGloby Glossary §2, §9
❌ **F6** Audience — evidence: not_targeted | "Who needs AI cost management software? CTOs, VPs of Engineering..." — locations: body — count: 1 — fix: Retarget the page to companies hiring engineers through GoGloby's approved services. — source: GoGloby Glossary §9

## G. Target keyword

❌ **G1** Target keyword — evidence: none | "AI Cost Management and Engineering Visibility Solution" — locations: title, h1 — count: 1 — fix: Align title and H1 with a documented recruiting or staffing topic and its approved keyword direction. — source: GoGloby Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: "AI Cost Management" — locations: title, h1, body — count: 1 — fix: Review the page's search intent and whether it targets an approved GoGloby service. — source: GoGloby Glossary §6, §8
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: benchmark — locations: body — count: 1 — fix: Change the primary action to an approved service CTA; remove the unapproved benchmark offer. — source: GoGloby Glossary §7
❌ **H2** Priority — evidence: P1 — locations: title, h1, body — count: 1 — fix: Prioritize resolving the page's prohibited offer, outdated product terminology, and unsupported company positioning. — source: GoGloby Glossary §7
❌ **H3** Reasons — evidence: - The page presents AI cost management as a GoGloby product/service, outside the two documented service lines. | - It repeatedly uses the outdated product name "AI Intelligence Layer". | - It uses the prohibited "Applied AI Engineering" positioning and a Benchmark CTA. | - Client metrics and relationships include conflicts or unsupported claims. — locations: title, h1, body, schema — count: 4 — fix: Prioritize a scope and positioning review; then correct terminology, CTA, client claims, and schema facts. — source: GoGloby Fact Sheet: Identity, Services, Featured clients; GoGloby Glossary §2, §7, §9
