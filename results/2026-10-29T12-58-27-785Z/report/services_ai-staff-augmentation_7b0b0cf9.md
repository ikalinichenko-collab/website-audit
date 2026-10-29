# Page report

- **URL:** https://gogloby.com/services/ai-staff-augmentation/
- **Type:** service
- **Action:** needs_decision
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 62 characters: "AI Staff Augmentation for Business-Criti..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: 169 characters — locations: meta — fix: Adjust meta description to 120-158 characters. — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/services/ai-staff-augmentation/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **A10** Image alt text — evidence: 21 images without alt — locations: image_alt — count: 21 — fix: Add alt text to main content images. — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, ImageObject, Brand, PostalAddress, ContactPoint, Person, QuantitativeValue, AggregateRating, OfferCatalog, Offer, Service, BusinessAudience, WebSite, FAQPage, Question, Answer — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "slogan":"Applied AI Engineering Partner" | "legalName":"Gogloby LLC" — locations: schema — count: 4 — fix: Correct the Organization slogan, description, and legalName to align with approved company identity. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _Organization slogan_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the unapproved slogan.
  ❌ _Organization description_ — "We are a US-based talent acquisition agency specializing in assisting tech companies" — locations: schema — count: 1 — fix: Replace the description with the approved company description.
  ❌ _Organization legalName_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name spelling to match the Fact Sheet.
  ✅ _Organization name_ — "name":"GoGloby" — locations: schema — count: 1
❌ **B3** Person data — evidence: "Leads the Agentic SDLC methodology" | "generating $60M+ in value" — locations: schema — count: 2 — fix: Align Person descriptions and knowsAbout fields with approved founder facts; remove unsupported or positioning claims. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders
  ❌ _Sergey Matikaynen_ — "Leads the Agentic SDLC methodology" | "Applied AI Engineering system" — locations: schema — count: 1 — fix: Revise the description and knowsAbout values to remove unsupported claims and positioning.
  ❌ _Vit Koval_ — "generating $60M+ in value" | "Nearshore AI talent" — locations: schema — count: 1 — fix: Revise the description and knowsAbout values to match documented founder information and approved terminology.
✅ **B4** Schema matches the page — evidence: "name":"GoGloby" — locations: schema — count: 1 — source: decisions.md: Spelling

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: ed feature from the AI Intelligence Layer, grounded in what a | AI-native production: ns engineering into AI-native production. It puts Claude int — locations: body, schema — count: 21 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Remove or rephrase "AI-native production". Replace "Applied AI Engineering partner" with the approved company description. — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — ed feature from the AI Intelligence Layer, grounded in what a | Your Perimeter The AI Intelligence Layer deploys in your VPC — locations: body, schema — count: 7 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ✅ _AI Engineering Visibility_
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ns engineering into AI-native production. It puts Claude int | ng engineering into AI-native production: every AI dollar vi — locations: schema — count: 2 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS | A long-term GoGloby Applied AI Engineering partner. N Oil & Gas NOVILA — locations: body, schema — count: 11 — fix: Replace "Applied AI Engineering partner" with the approved company description.
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
❌ **C2** Context terms — evidence: "The Benchmark" | "GoGloby is an Applied AI Engineering partner." — locations: body, meta, h2 — count: 40 — fix: Remove term uses that violate Glossary §7, including Benchmark as the main CTA, prohibited offer/positioning descriptions, and disallowed role positioning. — source: GoGloby Glossary §7: Terms and claims we do not use
  ❌ _c2:Benchmark:body:0_ — "walk you through the Benchmark" — locations: body — count: 1 — fix: Remove Benchmark as the main call to action.
  ❌ _c2:Benchmark:body:1_ — "What does the Benchmark include?" — locations: body — count: 1 — fix: Remove or revise the Benchmark-led offer and CTA.
  ❌ _c2:Benchmark:body:2_ — "engagement starts with the Benchmark" — locations: body — count: 1 — fix: Remove the Benchmark offer claim.
  ❌ _c2:Claude Certified Architect:meta:3_ — "Forward-deploy vetted Claude Certified Architects" — locations: meta — count: 1 — fix: Remove the prohibited title as an offer or positioning.
  ❌ _c2:Claude Certified Architect:h2:4_ — "How We Forward-Deploy a Claude Certified Architect" — locations: h2 — count: 1 — fix: Remove the prohibited title from the page heading.
  ❌ _c2:Claude Certified Architect:body:5_ — "Forward-Deployed Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:6_ — "forward-deploys senior Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:7_ — "We forward-deploy senior Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:8_ — "embedded Claude Certified Architect misses" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:9_ — "Forward-Deploy a Claude Certified Architect" — locations: body — count: 1 — fix: Remove the prohibited title from offer-focused copy.
  ❌ _c2:Claude Certified Architect:body:10_ — "forward-deploys senior Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:11_ — "What Is a Claude Certified Architect?" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:12_ — "A Claude Certified Architect is a senior" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:13_ — "A Claude Certified Architect embeds in under 4 weeks" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:Claude Certified Architect:body:14_ — "vetted Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited title as a product or offer.
  ❌ _c2:AI Solutions Architect:body:15_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1 — fix: Remove AI Solutions Architect as an offer or positioning.
  ❌ _c2:AI Solutions Architect:body:16_ — "An AI Solutions Architect embeds in under 4 weeks" — locations: body — count: 1 — fix: Remove the prohibited role as an offer.
  ❌ _c2:AI Solutions Architect:body:17_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1 — fix: Remove AI Solutions Architect as an offer or positioning.
  ❌ _c2:AI Solutions Architect:body:18_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1 — fix: Remove AI Solutions Architect as an offer or positioning.
  ❌ _c2:AI Solutions Architect:body:19_ — "AI Solutions Architects, who are LLM-agnostic" — locations: body — count: 1 — fix: Remove the prohibited role as an offer.
  ❌ _c2:AI Solutions Architect:body:20_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1 — fix: Remove AI Solutions Architect as an offer or positioning.
  ❌ _c2:Applied AI Engineering:body:21_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:22_ — "GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:23_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:24_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:25_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:26_ — "GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:27_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:28_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:29_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:30_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:31_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a way of describing GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:32_ — "GoGloby is an Applied AI Engineering partner." — locations: body — count: 1 — fix: Remove the prohibited company description.
  ❌ _c2:Forward-Deployed Engineering:h2:33_ — "How Forward-Deployed Engineering Works" — locations: h2 — count: 1 — fix: Remove Forward Deployed Engineering as positioning or an offer.
  ❌ _c2:Forward-Deployed Engineering:body:34_ — "How Forward-Deployed Engineering Works" — locations: body — count: 1 — fix: Remove Forward Deployed Engineering as positioning or an offer.
  ✅ _c2:Agentic SDLC:body:35_ — "same Agentic SDLC" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:36_ — "installs the Agentic SDLC immediately" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:37_ — "The Agentic SDLC" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:38_ — "install the Agentic SDLC from day 1" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:39_ — "with the Agentic SDLC" — locations: body — count: 1
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "Only 4% of our curated outbound pipeline passes it" — locations: title, body — count: 1 — fix: Align service claims with the approved service definitions and assessment facts; remove unsupported or conflicting claims. — source: GoGloby Fact Sheet: Services; How we vet
  ❌ _Staffing service and offer claims_ — "AI Staff Augmentation" | "Vetted Profiles In 3 To 5 Business Days" — locations: title, body — count: 1 — fix: Align the service name, delivery timing, guarantee, and engagement terms with the approved Nearshore Data & AI Engineers Staffing definition.
❌ **D2** Client figures — evidence: "HASBRO NYSE · $13.4B market cap · $4.7B revenue" | "TATA $106B market cap · $30B revenue" — locations: body — count: 11 — fix: Correct client figures that conflict with the Fact Sheet and verify figures not listed there before publication. — source: GoGloby Fact Sheet: Featured clients
  ❌ _d2:hasbro — Hasbro_ — "$4.7B revenue" — locations: body — count: 1 — fix: Correct the revenue figure to the Fact Sheet value or remove it.
  ⚠️ _d2:tata — TATA_ — "$106B market cap" | "$30B revenue" — locations: body — count: 1 — fix: Verify the market-cap figure; do not present unsupported revenue data beyond the Fact Sheet's approximate figure.
  ⚠️ _d2:evercommerce — EverCommerce_ — "$1.98B market cap" | "700,000+ business clients" — locations: body — count: 1 — fix: Verify the market-cap and client-count figures against an approved source.
  ⚠️ _d2:devsisters — Devsisters_ — "$299M market cap" | "$500M+ lifetime player spending" — locations: body — count: 1 — fix: Verify figures not established by the Fact Sheet; its player figure differs from the page's users figure.
  ⚠️ _d2:drchrono — DrChrono_ — "17M+ patients" | "$3B+ medical claims annually" — locations: body — count: 1 — fix: Verify the annual claims figure; the Fact Sheet describes $3B in medical claims processed.
  ⚠️ _d2:mikeworldwide — MikeWorldWide_ — "$57M fee income" | "230+ staff" — locations: body — count: 1 — fix: Verify the financial and employee figures with an approved source.
  ⚠️ _d2:every.io — Every.io_ — "$60M+ payroll processed" — locations: body — count: 1 — fix: Verify the payroll figure with an approved source.
  ❌ _d2:sydecar — Sydecar_ — "$3B+ AUA" — locations: body — count: 1 — fix: Correct the assets-under-administration figure to the Fact Sheet value or remove it.
  ⚠️ _d2:bonusly — Bonusly_ — "$32.4M raised" | "3,400+ clients" — locations: body — count: 1 — fix: Verify these figures; the Fact Sheet gives $20M Series B and does not establish this client count.
  ✅ _d2:alchemy health — Alchemy Health_ — "25M+ prescriptions" — locations: body — count: 1
  ✅ _d2:canopy — Canopy_ — "$236.5M raised" — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: not_in_fact_sheet | not_a_client — locations: body, image_alt — count: 47 — fix: Verify client names against the Fact Sheet and remove or substantiate names that are not listed. Replace or remove unsupported client logos and claims. — source: GoGloby Fact Sheet: Featured clients; decisions.md: Clients
  ✅ _client_card:hasbro nyse_ — fact_sheet_client | “HASBRO NYSE” — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — fact_sheet_client | “DR. CHRONO 17M+ patients” — locations: body — count: 1
  ✅ _client_card:evercommerce_ — fact_sheet_client | “EVERCOMMERCE Nasdaq-listed SaaS” — locations: body — count: 1
  ✅ _client_card:keywords_ — fact_sheet_client | “KEYWORDS $2.8B EQT acquisition” — locations: body — count: 1
  ✅ _client_card:eqt_ — not_a_client | “EQT acquisition” (named as acquirer, not as a GoGloby client) — locations: body — count: 1
  ✅ _client_card:tata_ — fact_sheet_client | “TATA $106B market cap” — locations: body — count: 1
  ✅ _client_card:canopy_ — fact_sheet_client | “CANOPY Series F” — locations: body — count: 1
  ✅ _client_card:sydecar_ — fact_sheet_client | “SYDECAR $3B+ AUA” — locations: body — count: 1
  ❌ _client_card:novilab_ — not_in_fact_sheet | “NOVILAB Series B” — locations: body — count: 1 — fix: Verify the client claim against an approved source or remove it.
  ✅ _client_card:bonusly_ — fact_sheet_client | “BONUSLY Series B” — locations: body — count: 1
  ✅ _client_card:every_ — fact_sheet_client | “EVERY $32M raised” — locations: body — count: 1
  ✅ _client_card:alchemy_ — fact_sheet_client | “ALCHEMY $31M seed” — locations: body — count: 1
  ✅ _client_card:devsisters_ — fact_sheet_client | “DEVSISTERS Public” — locations: body — count: 1
  ✅ _logo_image:background_ — not_a_client | “alt: Background” — locations: image_alt — count: 1
  ✅ _logo_image:tata_ — fact_sheet_client | “alt: TATA” — locations: image_alt — count: 1
  ✅ _logo_image:deel_ — fact_sheet_client | “alt: Deel” — locations: image_alt — count: 1
  ✅ _logo_image:zillow_ — fact_sheet_client | “alt: Zillow” — locations: image_alt — count: 1
  ✅ _logo_image:evercommerce_ — fact_sheet_client | “alt: EverCommerce” — locations: image_alt — count: 1
  ❌ _logo_image:gitlab_ — not_in_fact_sheet | “alt: GitLab” — locations: image_alt — count: 1 — fix: Verify the client claim against an approved source or remove the logo.
  ❌ _logo_image:pandora_ — not_in_fact_sheet | “alt: Pandora” — locations: image_alt — count: 1 — fix: Verify the client claim against an approved source or remove the logo.
  ✅ _logo_image:hasbro_ — fact_sheet_client | “alt: Hasbro” — locations: image_alt — count: 1
  ❌ _logo_image:disney_ — not_in_fact_sheet | “alt: Disney” — locations: image_alt — count: 1 — fix: Verify the client claim against an approved source or remove the logo.
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20116%20162%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20157%20143%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20175%20158%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20120%20158%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201055%20930%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20228%2072%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20348%20102%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20294%20126%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20210%2075%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%2072%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20357%2090%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%20102%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20603%20138%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_a_client | “alt: ” (empty alt text; SVG placeholder, no client name identified) — locations: image_alt — count: 1
  ✅ _text_cue:nfl_ — not_a_client | “Amazon · NFL · Deloitte · WNBA” (listed among MikeWorldWide clients, not as GoGloby clients) — locations: body — count: 1
  ✅ _text_cue:wnba_ — not_a_client | “Amazon · NFL · Deloitte · WNBA” (listed among MikeWorldWide clients, not as GoGloby clients) — locations: body — count: 1
  ✅ _text_cue:every_ — fact_sheet_client | “EVERY $32M raised” — locations: body — count: 1
  ✅ _text_cue:faq_ — not_a_client | “FAQ What Is AI Staff Augmentation at GoGloby?” — locations: body — count: 1
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
❌ **D4** Press and partners — evidence: "AI Staff Augmentation" | "GoGloby forward-deploys senior Claude Certified Architects" — locations: title, h1, body — count: 1 — fix: Align the page's service terminology and claims to the approved Nearshore Data & AI Engineers Staffing service; remove disallowed product and role positioning. — source: decisions.md: Service pages; GoGloby Fact Sheet: Services; GoGloby Glossary §§2, 7
  ❌ _Service identity and positioning_ — "AI Staff Augmentation for Business-Critical Software" | "GoGloby is an Applied AI Engineering partner." — locations: title, h1, body — count: 1 — fix: Reconcile the page identity, service positioning, and offer with the approved service page.

## E. Positioning

❌ **E1** Service fit — evidence: "Established Software Companies Putting Claude Into Production" — locations: h2 — count: 1 — fix: Refocus the page on the approved service and its intended buyers. — source: GoGloby Fact Sheet: Services; Ideal Customer Profile
❌ **E2** Positioning — evidence: "forward-deploys senior Claude Certified Architects" — locations: first_paragraph — count: 1 — fix: Align the opening with the approved description of the staffing service and its buyer. — source: GoGloby Glossary §9: How we write; GoGloby Fact Sheet: Services
❌ **E3** Call to action — evidence: "AI Staff Augmentation" — locations: title, h1 — count: 1 — fix: Use approved service naming and terminology throughout. — source: decisions.md: Spelling; GoGloby Fact Sheet: Services
❌ **E4** Lead order — evidence: "Vetted Profiles In 3 To 5 Business Days" — locations: body — count: 1 — fix: Verify or remove service timelines and promises that are not in the Fact Sheet. — source: GoGloby Fact Sheet: Services

## F. GEO

❌ **F1** Answer first — evidence: "$3M Combined Liability (Cyber, Data and Professional)" — locations: body — count: 1 — fix: State the approved insurance coverage accurately; remove unsupported additions. — source: GoGloby Fact Sheet: Services; Legal and security
❌ **F2** Buyer problem — evidence: "120-Day Performance Guarantee" — locations: body — count: 1 — fix: Align the staffing guarantee terms with the Fact Sheet; remove unsupported baseline and sprint conditions. — source: GoGloby Fact Sheet: Services
❌ **F3** Recruiting firm stated early — evidence: "The AI Intelligence Layer deploys in your VPC" — locations: body — count: 1 — fix: Use the approved product name and accurately represent the performance-tracking and data boundaries. — source: GoGloby Fact Sheet: Services; Legal and security
❌ **F4** GoGloby named near claims — evidence: "Your team runs on Claude Enterprise" — locations: body — count: 1 — fix: Verify the named tool and related security claims against approved company sources or remove them. — source: GoGloby Fact Sheet: Legal and security
❌ **F5** FAQ — evidence: "Only 4% of our curated outbound pipeline passes it" — locations: body — count: 1 — fix: Use the approved candidate assessment statistic and avoid introducing a different applicant denominator. — source: GoGloby Fact Sheet: How we vet
❌ **F6** Audience — evidence: buyer_ready | "Submit your information to schedule a technical briefing" — locations: body — count: 1 — fix: Make the CTA consistent with the approved service-specific CTA; remove the Benchmark CTA. — source: GoGloby Glossary §§7, 9

## G. Target keyword

❌ **G1** Target keyword — evidence: none | "AI Staff Augmentation for Business-Critical Software" — locations: title, h1 — count: 1 — fix: Use the approved service-page keyword direction rather than the current unapproved positioning. — source: GoGloby Glossary §6: Terms we use
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "Forward-Deploy an Architect" — locations: body — count: 1 — fix: Replace role-led or prohibited calls to action with the approved service CTA. — source: GoGloby Glossary §7: Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: Forward-Deploy — locations: body — count: 1 — fix: Remove the disallowed CTA token and use the approved service CTA. — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **H2** Priority — evidence: high — locations: title, h1, body — count: 1 — fix: Prioritize removing prohibited positioning and claims, correcting client figures, and aligning service identity with the approved source. — source: decisions.md; GoGloby Fact Sheet; GoGloby Glossary §7
❌ **H3** Reasons — evidence: Page positions the offering as an Applied AI Engineering product rather than an approved GoGloby service. | Multiple unsupported and conflicting client metrics appear, including Hasbro and Sydecar figures. | The page uses prohibited product names and claims, including AI Intelligence Layer and Benchmark as a CTA. | Service terms, guarantee details, timeline, and technical assertions do not align with the approved service information. — locations: title, body, schema — count: 4 — fix: Revise the page against the approved service definition, fact-check client metrics, and remove glossary-prohibited claims. — source: decisions.md; GoGloby Fact Sheet: Services, Featured clients, Legal and security; GoGloby Glossary §§7, 9
