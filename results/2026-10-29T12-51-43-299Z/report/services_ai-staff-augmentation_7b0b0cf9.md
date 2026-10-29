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
❌ **B2** Organization data — evidence: Schema slogan: "Applied AI Engineering Partner" | Schema description: "We are a US-based talent acquisition agency..." — locations: schema — count: 4 — fix: Align the Organization node’s slogan, description, legalName, and name with approved company identity and description. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ❌ _slogan_ — "Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Review the Organization slogan against approved positioning.
  ❌ _description_ — "US-based talent acquisition agency" — locations: schema — count: 1 — fix: Replace the Organization description with the approved company description.
  ❌ _legalName_ — "Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name to match the Fact Sheet.
  ✅ _name_ — "name":"GoGloby" — locations: schema — count: 1
❌ **B3** Person data — evidence: Sergey description: "technical architecture behind the Applied AI Engineering system" | Vit description: "generating $60M+ in value" — locations: schema — count: 2 — fix: Align Person descriptions and knowsAbout values with approved founder information; preserve approved job titles. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders
  ❌ _Sergey Matikaynen_ — "technical architecture behind the Applied AI Engineering system" | knowsAbout includes "Applied AI Engineering" — locations: schema — count: 1 — fix: Align the founder description and knowsAbout values with the Fact Sheet; jobTitle matches the approved source.
  ❌ _Vit Koval_ — "generating $60M+ in value" | knowsAbout includes "Nearshore AI talent" — locations: schema — count: 1 — fix: Align the founder description and knowsAbout values with the Fact Sheet; use the approved founder name and details.
⚠️ **B4** Schema matches the page — evidence: Visible page claims "$3M Combined Liability (Cyber, Data and Professional)" — locations: body — count: 1 — fix: Verify the additional professional-liability wording against the approved insurance fact before retaining it. — source: GoGloby Fact Sheet: Legal and security

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
❌ **C2** Context terms — evidence: "Benchmark" used as a CTA: "walk you through the Benchmark" | "Claude Certified Architect" used as a marketed offer — locations: body, meta, h2 — count: 40 — fix: Remove or revise the occurrences that violate Glossary §7; retain role mentions only where they are not framed as positioning or an offer. — source: GoGloby Glossary §7: Terms and claims we do not use
  ❌ _c2:Benchmark:body:0_ — "walk you through the Benchmark" — locations: body — count: 1 — fix: Remove Benchmark as the main call to action.
  ❌ _c2:Benchmark:body:1_ — "What does the Benchmark include?" — locations: body — count: 1 — fix: Remove Benchmark as the main call to action.
  ❌ _c2:Benchmark:body:2_ — "starts with the Benchmark" — locations: body — count: 1 — fix: Remove Benchmark as the main call to action.
  ❌ _c2:Claude Certified Architect:meta:3_ — "Forward-deploy vetted Claude Certified Architects" — locations: meta — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:h2:4_ — "Forward-Deploy a Claude Certified Architect" — locations: h2 — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:5_ — "Forward-Deployed Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:6_ — "forward-deploys senior Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:7_ — "forward-deploy senior Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:8_ — "embedded Claude Certified Architect" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:9_ — "Forward-Deploy a Claude Certified Architect" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:10_ — "forward-deploys senior Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:11_ — "What Is a Claude Certified Architect?" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:12_ — "A Claude Certified Architect is a senior" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:13_ — "A Claude Certified Architect embeds in under 4 weeks" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ❌ _c2:Claude Certified Architect:body:14_ — "vetted Claude Certified Architects" — locations: body — count: 1 — fix: Remove the prohibited named architect offer/positioning.
  ✅ _c2:AI Solutions Architect:body:15_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1
  ✅ _c2:AI Solutions Architect:body:16_ — "An AI Solutions Architect embeds in under 4 weeks" — locations: body — count: 1
  ✅ _c2:AI Solutions Architect:body:17_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1
  ✅ _c2:AI Solutions Architect:body:18_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1
  ✅ _c2:AI Solutions Architect:body:19_ — "AI Solutions Architects, who are LLM-agnostic" — locations: body — count: 1
  ✅ _c2:AI Solutions Architect:body:20_ — "AI Solutions Architects, and Applied AI Engineers" — locations: body — count: 1
  ❌ _c2:Applied AI Engineering:body:21_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:22_ — "GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:23_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:24_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:25_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:26_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:27_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:28_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:29_ — "GoGloby Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:30_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:31_ — "GoGloby Applied AI Engineering client" — locations: body — count: 1 — fix: Remove Applied AI Engineering as a description of the company or its client relationship.
  ❌ _c2:Applied AI Engineering:body:32_ — "GoGloby is an Applied AI Engineering partner" — locations: body — count: 1 — fix: Remove the prohibited company-positioning phrase.
  ❌ _c2:Forward-Deployed Engineering:h2:33_ — "How Forward-Deployed Engineering Works" — locations: h2 — count: 1 — fix: Do not use Forward Deployed Engineering as positioning or as an offer; retain it only as a role term.
  ❌ _c2:Forward-Deployed Engineering:body:34_ — "How Forward-Deployed Engineering Works" — locations: body — count: 1 — fix: Do not use Forward Deployed Engineering as positioning or as an offer; retain it only as a role term.
  ✅ _c2:Agentic SDLC:body:35_ — "same Agentic SDLC" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:36_ — "installs the Agentic SDLC immediately" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:37_ — "The Agentic SDLC" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:38_ — "install the Agentic SDLC from day 1" — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:39_ — "with the Agentic SDLC" — locations: body — count: 1
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "AI-native production" | "Applied AI Engineering partner" — locations: body, schema — count: 2 — fix: Remove unsupported or prohibited claims and verify service, delivery, security, and performance statements against the Fact Sheet. — source: GoGloby Fact Sheet: Services; GoGloby Glossary §7
❌ **D2** Client figures — evidence: Hasbro: "$13.4B market cap"; Fact Sheet lists approximately "$5B revenue". | TATA: "$106B market cap"; Fact Sheet lists approximately "$30B revenue". — locations: body — count: 11 — fix: Correct conflicting client figures and remove or substantiate metrics not verified in the Fact Sheet. — source: GoGloby Fact Sheet: Featured clients; decisions.md: Clients
  ❌ _d2:hasbro_ — "$13.4B market cap · $4.7B revenue"; Fact Sheet: approximately $5B revenue. — locations: body — count: 1 — fix: Reconcile Hasbro revenue with the Fact Sheet; remove or verify the market-cap and other figures.
  ❌ _d2:tata_ — "$106B market cap · $30B revenue"; Fact Sheet: approximately $30B revenue. — locations: body — count: 1 — fix: Remove or verify the market-cap figure; Fact Sheet revenue is approximately $30B.
  ⚠️ _d2:evercommerce_ — "$1.98B market cap · 700,000+ business clients"; Fact Sheet lists approximately $700M revenue and 700K+ clients. — locations: body — count: 1 — fix: Verify the market-cap figure and align any financial metric with the Fact Sheet.
  ⚠️ _d2:devsisters_ — "$299M market cap · 200M+ users · $500M+ lifetime player spending"; Fact Sheet confirms 200M+ players only. — locations: body — count: 1 — fix: Verify the market-cap and lifetime-spending figures; use only substantiated metrics.
  ⚠️ _d2:drchrono_ — "17M+ patients · $3B+ medical claims annually"; Fact Sheet confirms 17M+ patients and $3B in medical claims processed. — locations: body — count: 1 — fix: Verify that the annual claims wording is supported; Fact Sheet specifies claims processed.
  ⚠️ _d2:mikeworldwide_ — "$57M fee income · 230+ staff"; Fact Sheet contains no such figures. — locations: body — count: 1 — fix: Verify or remove the fee-income and staff figures.
  ⚠️ _d2:every.io_ — "$60M+ payroll processed"; Fact Sheet has no matching payroll figure. — locations: body — count: 1 — fix: Verify or remove the payroll figure.
  ❌ _d2:sydecar_ — "$3B+ AUA"; Fact Sheet lists "$1B+ assets under administration". — locations: body — count: 1 — fix: Correct Sydecar assets-under-administration figure to match the Fact Sheet.
  ⚠️ _d2:bonusly_ — "$32.4M raised · 3,400+ clients"; Fact Sheet confirms $20M Series B but not these raised/client counts. — locations: body — count: 1 — fix: Verify or remove the unsupported raised amount and client count.
  ⚠️ _d2:alchemy health_ — "$31M seed"; Fact Sheet lists "$32M raised". — locations: body — count: 1 — fix: Align the raised amount with the Fact Sheet and verify the seed-round label.
  ✅ _d2:canopy_ — "Series F · $236.5M raised"; Fact Sheet: Series F, $236.5M raised. — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: not_in_fact_sheet | The page includes client-card entries and logo/text cues that do not appear as clients in the Fact Sheet. — locations: body, image_alt — count: 47 — fix: Verify client names against the Fact Sheet and remove or clarify unverified client listings and unidentified logo placeholders. — source: GoGloby Fact Sheet — Featured clients; decisions.md — Clients
  ✅ _client_card:hasbro nyse_ — fact_sheet_client | “HASBRO NYSE” — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — fact_sheet_client | “DR. CHRONO 17M+ patients” — locations: body — count: 1
  ✅ _client_card:evercommerce_ — fact_sheet_client | “EVERCOMMERCE Nasdaq-listed SaaS” — locations: body — count: 1
  ✅ _client_card:keywords_ — fact_sheet_client | “KEYWORDS $2.8B EQT acquisition” — locations: body — count: 1
  ❌ _client_card:eqt_ — not_in_fact_sheet | “EQT acquisition” — locations: body — count: 1 — fix: Verify or remove EQT as a client reference; it is not listed as a Fact Sheet client.
  ✅ _client_card:tata_ — fact_sheet_client | “TATA $106B market cap” — locations: body — count: 1
  ✅ _client_card:canopy_ — fact_sheet_client | “CANOPY Series F” — locations: body — count: 1
  ✅ _client_card:sydecar_ — fact_sheet_client | “SYDECAR $3B+ AUA” — locations: body — count: 1
  ❌ _client_card:novilab_ — not_in_fact_sheet | “NOVILAB Series B” — locations: body — count: 1 — fix: Verify or remove Novilab as a client reference; it is not listed as a Fact Sheet client.
  ✅ _client_card:bonusly_ — fact_sheet_client | “BONUSLY Series B” — locations: body — count: 1
  ✅ _client_card:every_ — fact_sheet_client | “EVERY $32M raised” — locations: body — count: 1
  ✅ _client_card:alchemy_ — fact_sheet_client | “ALCHEMY $31M seed” — locations: body — count: 1
  ✅ _client_card:devsisters_ — fact_sheet_client | “DEVSISTERS Public” — locations: body — count: 1
  ✅ _logo_image:background_ — not_a_client | “alt: Background” — locations: image_alt — count: 1
  ✅ _logo_image:tata_ — fact_sheet_client | “alt: TATA” — locations: image_alt — count: 1
  ✅ _logo_image:deel_ — fact_sheet_client | “alt: Deel” — locations: image_alt — count: 1
  ✅ _logo_image:zillow_ — fact_sheet_client | “alt: Zillow” — locations: image_alt — count: 1
  ✅ _logo_image:evercommerce_ — fact_sheet_client | “alt: EverCommerce” — locations: image_alt — count: 1
  ❌ _logo_image:gitlab_ — not_in_fact_sheet | “alt: GitLab” — locations: image_alt — count: 1 — fix: Verify or remove GitLab as a client logo; it is not listed as a Fact Sheet client.
  ❌ _logo_image:pandora_ — not_in_fact_sheet | “alt: Pandora” — locations: image_alt — count: 1 — fix: Verify or remove Pandora as a client logo; it is not listed as a Fact Sheet client.
  ✅ _logo_image:hasbro_ — fact_sheet_client | “alt: Hasbro” — locations: image_alt — count: 1
  ❌ _logo_image:disney_ — not_in_fact_sheet | “alt: Disney” — locations: image_alt — count: 1 — fix: Verify or remove Disney as a client logo; it is not listed as a Fact Sheet client.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20116%20162%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20157%20143%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20175%20158%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20120%20158%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%201055%20930%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20228%2072%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20348%20102%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20294%20126%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20210%2075%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%2072%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20357%2090%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20708%20102%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20603%20138%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20156%20156%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20201%20168%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20312%2087%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org%2f2000/svg%22%20viewbox%3d%220%200%20540%20132%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f2fwww.w3.org/2000/svg%22%20viewbox%3d%220%200%20432%20108%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http://www.w3.org/2000/svg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ❌ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http://www.w3.org/2000/svg%22%20viewbox%3d%220%200%20242%20242%22%3e%3c%2fsvg%3e_ — not_in_fact_sheet | “alt: ” (SVG image; no client name is identifiable) — locations: image_alt — count: 1 — fix: Identify the logo or remove the unidentified image from client-related content.
  ✅ _text_cue:nfl_ — not_a_client | “Amazon · NFL · Deloitte · WNBA” — locations: body — count: 1
  ✅ _text_cue:wnba_ — not_a_client | “Amazon · NFL · Deloitte · WNBA” — locations: body — count: 1
  ✅ _text_cue:every_ — fact_sheet_client | “EVERY $32M raised” — locations: body — count: 1
  ✅ _text_cue:faq_ — not_a_client | “FAQ What Is AI Staff Augmentation at GoGloby?” — locations: body — count: 1
  ⏭️ _logo_image:svg+xml,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewbox%3d%220%200%20337%2091%22%3e%3c%2fsvg%3e_ — not judged by LLM — locations: image_alt
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
❌ **D4** Press and partners — evidence: "NOVILAB" is presented as an active client engagement. | "AI executes, and ownership of intent and risk stays with your team." — locations: body — count: 2 — fix: Verify unsupported client claims and reconcile service, performance, and security statements with approved materials. — source: GoGloby Fact Sheet: Services; Legal and security

## E. Positioning

❌ **E1** Service fit — evidence: "GoGloby is an Applied AI Engineering partner" — locations: body — count: 1 — fix: Reposition the page around an approved GoGloby service and its buyer rather than Applied AI Engineering. — source: decisions.md: Company description; GoGloby Fact Sheet: Services
❌ **E2** Positioning — evidence: "Claude Certified Architects" — locations: title, meta, body — count: 1 — fix: Align the page service and terminology with the approved service page and service definition. — source: decisions.md: Service pages; GoGloby Fact Sheet: Services
❌ **E3** Call to action — evidence: "GoGloby forward-deploys senior Claude Certified Architects" — locations: first_paragraph — count: 1 — fix: Correct the opening service description to match the approved staffing service definition. — source: decisions.md: Company description; GoGloby Fact Sheet: Services
❌ **E4** Lead order — evidence: "under 4 weeks" — locations: meta, body — count: 1 — fix: Verify time-to-start claims against the approved service-specific timing; the Fact Sheet states 2–3 weeks for nearshore staffing. — source: GoGloby Fact Sheet: Services

## F. GEO

❌ **F1** Answer first — evidence: "Forward-Deploy an Architect" — locations: body — count: 1 — fix: Replace the CTA treatment that conflicts with the approved CTA guidance for staffing. — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **F2** Buyer problem — evidence: "Benchmark" — locations: body — count: 3 — fix: Remove Benchmark as the main call to action. — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **F3** Recruiting firm stated early — evidence: "every AI dollar visible" — locations: body, schema — count: 1 — fix: Remove the prohibited AI-spend-led headline/claim. — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **F4** GoGloby named near claims — evidence: "codebase stays in your own cloud on AWS, Amazon Bedrock, or Google Cloud Vertex AI" — locations: body — count: 1 — fix: Review security and product claims against approved legal and security facts; avoid unsupported named deployment claims. — source: GoGloby Fact Sheet: Legal and security
❌ **F5** FAQ — evidence: "Free trial" is absent; page instead offers a paid fixed-fee Benchmark. — locations: body — count: 1 — fix: Review the unapproved Benchmark product and fee offer against the approved service scope. — source: GoGloby Glossary §7: Terms and claims we do not use
❌ **F6** Audience — evidence: buyer_ready | "Submit your information to schedule a technical briefing." — locations: body — count: 1 — fix: Rework the page to address a company ready to hire through an approved staffing service, rather than an unapproved architect/Benchmark offer. — source: GoGloby Glossary §9: How we write

## G. Target keyword

⚠️ **G1** Target keyword — evidence: none | H1: "AI Staff Augmentation for Business-Critical Software" — locations: title, h1 — count: 1 — fix: Use the approved service-page keyword focus and service naming. — source: GoGloby Glossary §6: Terms we use
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "AI Staff Augmentation" — locations: title, h1, body — count: 1 — fix: Use the approved full service name and avoid standalone AI staffing terminology. — source: GoGloby Glossary §7: Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: revise — locations: title, meta, h1, body, schema — count: 1 — fix: Prioritize correcting the offer, claims, and identity/schema conflicts before SEO refinements. — source: Audit findings: C1, B2, D2
❌ **H2** Priority — evidence: high — locations: body, schema — count: 1 — fix: Address high-priority positioning and substantiation issues first, especially prohibited claims and conflicting client metrics. — source: Audit findings: C1, D2, D3
❌ **H3** Reasons — evidence: - The page presents an unapproved architecture/Claude-centered offer. | - Multiple client metrics conflict with or are absent from the Fact Sheet. | - Schema company identity and founder descriptions do not align with approved sources. — locations: title, meta, body, schema — count: 3 — fix: Resolve positioning, fact verification, and schema identity issues before publishing. — source: decisions.md; GoGloby Fact Sheet: Identity, Services, Featured clients, Founders; GoGloby Glossary §§7, 9
