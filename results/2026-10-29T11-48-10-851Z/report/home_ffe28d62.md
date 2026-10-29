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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#5c342e1c3b333b30333e25723f3331 (404) | https://gogloby.com/cdn-cgi/l/email-protection#a8c0dae8cfc7cfc4c7cad186cbc7c5 (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: "We are a US-based talent acquisition agency" — locations: schema — count: 1 — fix: Align Organization schema company description with the approved one-sentence description. — source: decisions.md § Company description; Fact Sheet § Identity
  ❌ _Organization description_ — "We are a US-based talent acquisition agency" — locations: schema — count: 1 — fix: Update the Organization description to match the approved company description.
❌ **B3** Person data — evidence: "Leads the Agentic SDLC methodology" | "Built the Applied AI Engineering system" — locations: schema — count: 2 — fix: Review founder Person descriptions, knowsAbout values, and profile URLs against approved sources; jobTitle differences alone are not treated as failures because code evidence is unavailable. — source: decisions.md § Founders; Fact Sheet § Founders and Official profiles; supplied code evidence: b3_person_evidence is empty
  ❌ _Person schema: Sergey Matikaynen_ — "Leads the Agentic SDLC methodology" — locations: schema — count: 1 — fix: Review the Person description and knowsAbout fields against approved founder information and remove unsupported or disallowed claims.
  ❌ _Person schema: Vit Koval_ — "Built the Applied AI Engineering system" — locations: schema — count: 1 — fix: Review the Person description and knowsAbout fields against approved founder information and remove unsupported or disallowed claims.
❌ **B4** Schema matches the page — evidence: "GoGloby is an Applied AI Engineering partner" — locations: schema — count: 1 — fix: Bring Organization and WebSite schema descriptions into line with the approved company description. — source: decisions.md § Company description; Fact Sheet § Identity

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
❌ **C2** Context terms — evidence: "Get Your Applied AI Engineering Benchmark" | "walk you through the Benchmark" — locations: h2, body — count: 7 — fix: Remove or revise the listed occurrences that conflict with Glossary §7; use the approved service naming and calls to action. — source: Glossary §§ 7, 9; supplied code evidence: context_term_occurrences
  ❌ _Benchmark — h2_ — "Get Your Applied AI Engineering Benchmark" — locations: h2 — count: 1 — fix: Change the benchmark-led CTA to an approved service-appropriate CTA.
  ❌ _Benchmark — body (technical briefing)_ — "walk you through the Benchmark" — locations: body — count: 1 — fix: Remove the benchmark-as-CTA framing.
  ❌ _Benchmark — body (section title)_ — "Start With a Benchmark" — locations: body — count: 1 — fix: Remove the benchmark-as-CTA framing.
  ❌ _Benchmark — body (CTA)_ — "Get Your Applied AI Engineering Benchmark" — locations: body — count: 1 — fix: Change the benchmark-led CTA to an approved service-appropriate CTA.
  ❌ _Benchmark — body (FAQ answer)_ — "We benchmark your AI spend" — locations: body — count: 1 — fix: Remove benchmark wording where it presents benchmarking as the main offer or CTA.
  ❌ _Claude Certified Architect — body_ — "Claude Certified Architects, Claude-specific" — locations: body — count: 1 — fix: Remove this as a positioning or offered role label.
  ❌ _AI Solutions Architect — body_ — "AI Solutions Architects, model-agnostic" — locations: body — count: 1 — fix: Remove this as a positioning or offer; the glossary says this term should remain only as a role recruited or staffed.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "100+ Clients Across 10+ Industries" | "NOVILAB" — locations: h2, body — count: 2 — fix: Reconcile client-count and client-list claims with the Fact Sheet; remove unsupported client claims or obtain confirmation. — source: Fact Sheet §§ Identity, Featured clients
  ❌ _Client count claim_ — "100+ Clients Across 10+ Industries" — locations: h2 — count: 1 — fix: Verify the client count and industry count against an approved source or remove the unsupported figures.
  ❌ _Novilab client claim_ — "An active GoGloby Applied AI Engineering engagement" — locations: body — count: 1 — fix: Verify Novilab's client status with an approved source or remove the client claim.
❌ **D2** Client figures — evidence: "120-Day Performance Guarantee" | "120-day replacement guarantee" — locations: body, schema — count: 2 — fix: Align guarantee language and conditions with the service-specific Fact Sheet terms. — source: Fact Sheet § Services; Glossary § 2
  ❌ _Homepage guarantee claim_ — "If a forward-deployed Architect or engineer underperforms" — locations: body — count: 1 — fix: Verify and align the guarantee's eligibility and conditions with the approved service terms.
  ❌ _Schema guarantee claim_ — "120-day telemetry-backed replacement guarantee" — locations: schema — count: 1 — fix: Replace unsupported schema guarantee terms and conditions with approved service-specific terms.
❌ **D3** Clients not in the Fact Sheet — evidence: "logo-disney-1-grayscale.png" | "logo-deel-1-grayscale.png" — locations: image_alt — count: 1 — fix: Review main-content images presented as client logos against the Fact Sheet featured-client list; remove unsupported client logos or confirm them. Press and partner logos are not counted as clients. — source: Fact Sheet § Featured clients; decisions.md § Clients; supplied main_content_images
  ❌ _Disney logo image_ — "logo-disney-1-grayscale.png" — locations: image_alt — count: 1 — fix: Confirm Disney as a client in an approved source or remove the client-logo image.
❌ **D4** Press and partners — evidence: "4.9" | "reviewCount": 4.9 — locations: schema — count: 1 — fix: Use the Fact Sheet review count rather than a rating value as reviewCount; verify the rating source and representation. — source: Fact Sheet § What clients say; External recognition
  ❌ _AggregateRating review count_ — "reviewCount": 4.9 — locations: schema — count: 1 — fix: Correct the reviewCount field to reflect the Fact Sheet's 10 reviews; check rating claims against the approved source.

## E. Positioning

❌ **E1** Service fit — evidence: service fit: mismatch — "We embed Forward-Deployed Engineers" — locations: body — count: 1 — fix: Reframe the homepage around the approved recruiting and staffing services rather than presenting engineering delivery/AI implementation as the primary offer. — source: Fact Sheet § Services; Glossary §§ 1–2
❌ **E2** Positioning — evidence: "GoGloby is an Applied AI Engineering partner" — locations: body — count: 1 — fix: Correct the company description to the approved description. — source: decisions.md § Company description; Fact Sheet § Identity
❌ **E3** Call to action — evidence: "We recruit US AI leaders" — locations: body — count: 1 — fix: Check service and role descriptions against the approved recruiting and staffing definitions and scope. — source: Fact Sheet § Services; Glossary §§ 2–3
❌ **E4** Lead order — evidence: "Senior AI engineers inside your team in under 4 weeks" — locations: body — count: 1 — fix: Remove or substantiate the unsupported timing claim and align the service description with the Fact Sheet. — source: Fact Sheet § Services

## F. GEO

❌ **F1** Answer first — evidence: "Forward-deployed engineers work inside your existing repositories" — locations: body — count: 1 — fix: Describe GoGloby's approved recruiting and staffing engagement models; remove claims that position it as an implementation provider. — source: Fact Sheet § Identity and Services
❌ **F2** Buyer problem — evidence: "AI Intelligence Layer" — locations: body — count: 21 — fix: Use the current approved product name, AI Development Intelligence Layer, and remove unsupported product claims. — source: Glossary § 7; Fact Sheet § Services
❌ **F3** Recruiting firm stated early — evidence: "Vetted profiles delivered in 72 hours" — locations: schema — count: 1 — fix: Remove or substantiate the delivery-time claim using an approved source. — source: Fact Sheet § Services; Glossary § 10
❌ **F4** GoGloby named near claims — evidence: "First validated feature in 3 to 5 business days" — locations: schema — count: 1 — fix: Remove or substantiate the feature-delivery claim using an approved source. — source: Fact Sheet § Services
❌ **F5** FAQ — evidence: "120-day telemetry-backed replacement guarantee" — locations: schema — count: 1 — fix: Align schema guarantee details with the approved service-specific terms. — source: Fact Sheet § Services
❌ **F6** Audience — evidence: audience label: "established B2B software companies" — locations: schema, body — count: 1 — fix: Align audience descriptions with the approved ICP; do not imply that only established software companies are in scope. — source: Fact Sheet § Ideal Customer Profile; Glossary §§ 2, 5

## G. Target keyword

❌ **G1** Target keyword — evidence: none — locations: title — count: 0 — fix: Align the homepage title with the approved homepage title guidance and primary service positioning. — source: Glossary § 6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "Applied AI Company for Established Software | GoGloby" — locations: title — count: 1 — fix: Replace the unsupported company-category title with positioning that reflects staffing and recruiting. — source: decisions.md § Company description; Glossary § 6
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: benchmark — locations: h2 — count: 1 — fix: Replace the benchmark-led primary CTA with a service-appropriate CTA. — source: Glossary § 7
❌ **H2** Priority — evidence: high — locations: body — count: 1 — fix: Prioritize correcting the homepage's service positioning and removing claims that conflict with approved sources. — source: decisions.md § Company description; Fact Sheet § Services; Glossary §§ 7, 9
❌ **H3** Reasons — evidence: - The title and description characterize GoGloby as an Applied AI company/partner rather than an approved staffing and recruiting agency. | - Multiple claims position GoGloby as an AI implementation and measurement provider. | - Client, guarantee, and schema claims include items not supported by the Fact Sheet. — locations: title, meta, body, schema — count: 3 — fix: Address the company description and service-positioning conflicts first, then review unsupported client and schema claims against approved sources. — source: decisions.md § Company description; Fact Sheet §§ Identity, Services, Featured clients; Glossary §§ 1, 2, 7
