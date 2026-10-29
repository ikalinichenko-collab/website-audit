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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#177f65577078707b78756e3974787a (404) | https://gogloby.com/cdn-cgi/l/email-protection#f59d87b5929a92999a978cdb969a98 (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: slogan: "Applied AI Engineering Partner" | description: "US-based talent acquisition agency" — locations: schema — count: 4 — fix: Align the Organization slogan, description, and legalName with the approved company facts and spelling. — source: decisions.md: Company description and Spelling; GoGloby Fact Sheet: Identity
  ✅ _Organization node — name_ — name: "GoGloby" — locations: schema — count: 1
  ❌ _Organization node — slogan_ — slogan: "Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the non-approved positioning slogan from the Organization node.
  ❌ _Organization node — description_ — description: "US-based talent acquisition agency" — locations: schema — count: 1 — fix: Replace the Organization description with the approved one-sentence company description.
  ❌ _Organization node — legalName_ — legalName: "Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legalName spelling to match the Fact Sheet.
➖ **B3** Person data — evidence: No Person nodes supplied in person_nodes; b3_person_evidence is empty. — locations: schema — count: 0 — source: Page audit data: person_nodes and b3_person_evidence
❌ **B4** Schema matches the page — evidence: sameAs includes "https://www.g2.com/products/gogloby/reviews" — locations: schema — count: 1 — fix: Remove profiles not confirmed as official or available in the approved profile sources. — source: GoGloby Fact Sheet: Official profiles; decisions.md: Official profiles

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
❌ **C2** Context terms — evidence: h2: "Get Your Applied AI Engineering Benchmark" | body: "We benchmark your AI spend" — locations: h2, body — count: 9 — fix: Remove the prohibited benchmark CTA/framing, prohibited positioning or offer terms, and standalone AI talent usage identified below. — source: GoGloby Glossary: §7 Terms and claims we do not use
  ❌ _Benchmark — h2 occurrence_ — "Get Your Applied AI Engineering Benchmark" — locations: h2 — count: 1 — fix: Change the benchmark-led CTA framing.
  ❌ _Benchmark — body occurrence: technical briefing_ — "walk you through the Benchmark" — locations: body — count: 1 — fix: Remove benchmark-as-CTA framing.
  ❌ _Benchmark — body occurrence: CTA heading_ — "Start With a Benchmark" — locations: body — count: 1 — fix: Remove benchmark-as-main-CTA framing.
  ❌ _Benchmark — body occurrence: CTA label_ — "Get Your Applied AI Engineering Benchmark" — locations: body — count: 1 — fix: Remove benchmark-as-main-CTA framing.
  ❌ _Benchmark — body occurrence: benchmark spend_ — "We benchmark your AI spend" — locations: body — count: 1 — fix: Remove benchmark as the main call to action or service framing.
  ❌ _Claude Certified Architect_ — "Claude Certified Architects, Claude-specific." — locations: body — count: 1 — fix: Remove this as a positioning or offer term.
  ❌ _AI Solutions Architect_ — "AI Solutions Architects, model-agnostic." — locations: body — count: 1 — fix: Remove this as a positioning or offer term.
  ❌ _AI talent — standalone use_ — "No Access to Proven AI Talent" — locations: body — count: 1 — fix: Avoid standalone use of “AI talent”; use an approved role or service term.
  ❌ _AI ROI — hero-led claim_ — "We prove AI ROI." — locations: body — count: 1 — fix: Remove AI ROI as a leading hero claim.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "Trusted by 100+ Clients Across 10+ Industries" — locations: h2, body — count: 1 — fix: Verify the client-count and industry-count claims against an approved source or remove them. — source: GoGloby Fact Sheet: Selected clients and Featured clients
  ❌ _Client-count and industry-count claim_ — "Trusted by 100+ Clients Across 10+ Industries" — locations: h2, body — count: 1 — fix: Verify or remove the unsubstantiated count claim.
❌ **D2** Client figures — evidence: Hasbro: "$4.7B revenue" | DrChrono: "17M+ patients · $3B+ medical claims annually" — locations: body — count: 12 — fix: Reconcile client figures with the Fact Sheet and verify figures not provided there; remove or correct unsupported metrics. — source: GoGloby Fact Sheet: Featured clients; decisions.md: Clients
  ❌ _Hasbro — client metrics_ — Hasbro: "$4.7B revenue" — locations: body — count: 1 — fix: Reconcile the revenue figure with the Fact Sheet or substantiate it.
  ❌ _DrChrono — client metrics_ — DrChrono: "17M+ patients · $3B+ medical claims annually" — locations: body — count: 1 — fix: Reconcile the patient and claims figures with the Fact Sheet.
  ❌ _EverCommerce — client metrics_ — EverCommerce: "700,000+ business clients" — locations: body — count: 1 — fix: Reconcile the client-count figure with the Fact Sheet.
  ❌ _Keywords Studios — client metrics_ — Keywords: "$844M revenue · 13,000 employees" — locations: body — count: 1 — fix: Reconcile the revenue and employee figures with the Fact Sheet.
  ❌ _TATA — client metrics_ — TATA: "$30B revenue · 600,000+ employees" — locations: body — count: 1 — fix: Reconcile the employee count with the Fact Sheet; the page’s $30B revenue is consistent with the Fact Sheet.
  ❌ _Canopy — client metrics_ — Canopy: "$236.5M raised" — locations: body — count: 1 — fix: Verify the raised amount; it is not provided in the Fact Sheet.
  ❌ _Sydecar — client metrics_ — Sydecar: "$3B+ AUA" — locations: body — count: 1 — fix: Reconcile the assets-under-administration figure with the Fact Sheet.
  ❌ _Bonusly — client metrics_ — Bonusly: "$32.4M raised" — locations: body — count: 1 — fix: Verify the raised amount; it is not provided in the Fact Sheet.
  ❌ _Every — client metrics_ — Every: "$32M raised" — locations: body — count: 1 — fix: Verify the raised amount; it is not provided in the Fact Sheet.
  ❌ _Alchemy Health — client metrics_ — Alchemy: "$31M seed · 25M+ prescriptions" — locations: body — count: 1 — fix: Reconcile the raised amount with the Fact Sheet; verify the prescription figure.
  ❌ _Devsisters — client metrics_ — Devsisters: "200M+ users" — locations: body — count: 1 — fix: Reconcile the user figure with the Fact Sheet.
  ❌ _Zillow — client metrics_ — Zillow: "$2.58B revenue" — locations: body — count: 1 — fix: Reconcile the revenue figure with the Fact Sheet.
❌ **D3** Clients not in the Fact Sheet — evidence: Novilab: "An active GoGloby Applied AI Engineering engagement." | main_content_images: alt "Disney", file_name "logo-disney-1-grayscale.png" — locations: body, image_alt — count: 2 — fix: Remove or verify client presentations for companies not in the Fact Sheet client list. — source: GoGloby Fact Sheet: Featured clients; Page audit data: main_content_images
  ❌ _Novilab — presented as a client_ — "NOVILAB"; "An active GoGloby Applied AI Engineering engagement." — locations: body — count: 1 — fix: Verify this client relationship or remove the client presentation.
  ⚠️ _Disney — client logo_ — main_content_images: alt is null, file_name "logo-disney-1-grayscale.png" — locations: image_alt — count: 1 — fix: Confirm whether the logo is intended to identify a client; remove or label it accordingly if not verified.
❌ **D4** Press and partners — evidence: FAQ schema: "reviewCount": 4.9 | Fact Sheet: "4.9 / 5 from 10 reviews" — locations: schema — count: 1 — fix: Correct the review count to match the Fact Sheet and verify any separate Trustpilot rating claims. — source: GoGloby Fact Sheet: What clients say; External recognition
  ❌ _Clutch aggregate rating review count_ — schema: "ratingValue": "4.9", "reviewCount": 4.9 — locations: schema — count: 1 — fix: Replace the invalid review count with the Fact Sheet’s verified count.

## E. Positioning

❌ **E1** Service fit — evidence: "AI Intelligence Layer" — locations: body, schema — count: 1 — fix: Align the described service with the approved staffing and recruiting service fit; remove unsupported AI development service offers. — source: GoGloby Fact Sheet: Services; GoGloby Glossary: §2 The two services
❌ **E2** Positioning — evidence: "Generative AI Development Services" — locations: schema — count: 1 — fix: Remove or verify service offerings that are not part of the approved service catalog. — source: GoGloby Fact Sheet: Services
❌ **E3** Call to action — evidence: "Vetted profiles delivered in 72 hours." — locations: schema — count: 1 — fix: Remove or verify the unsupported delivery-time claim. — source: GoGloby Fact Sheet: Services
❌ **E4** Lead order — evidence: "First validated feature in 3 to 5 business days." — locations: schema — count: 1 — fix: Remove or verify the unsupported performance claim. — source: GoGloby Fact Sheet: Services

## F. GEO

❌ **F1** Answer first — evidence: "GoGloby is an Applied AI Engineering partner." — locations: body, meta — count: 1 — fix: Use the approved company description and positioning. — source: decisions.md: Company description
❌ **F2** Buyer problem — evidence: "Applied AI Company for Established Software | GoGloby" — locations: title — count: 1 — fix: Align the homepage title with the approved homepage positioning in the Glossary. — source: GoGloby Glossary: §6 Positioning terms
❌ **F3** Recruiting firm stated early — evidence: "Applied AI Company Trusted by 100+ Clients Across 10+ Industries" — locations: h2 — count: 1 — fix: Remove the disallowed company-category description and verify the numerical claim. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **F4** GoGloby named near claims — evidence: "AI Leadership Search" — locations: body — count: 1 — fix: Use the approved recruiting service framing and role terminology. — source: GoGloby Glossary: §2 The two services; §7 Terms and claims we do not use
❌ **F5** FAQ — evidence: "AI Intelligence Layer" — locations: body, schema — count: 1 — fix: Use the current product name and confirm that the described offer is limited to the approved staffing service. — source: GoGloby Fact Sheet: Services; GoGloby Glossary: §7 Terms and claims we do not use
❌ **F6** Audience — evidence: not_targeted | Audience assessment: the page addresses AI company information and AI ROI education rather than primarily a ready-to-hire staffing or recruiting buyer. — locations: h1, h2, body — count: 1 — fix: Refocus the homepage on buyers ready to hire through GoGloby’s approved recruiting and staffing services. — source: GoGloby Glossary: §9 How we write

## G. Target keyword

❌ **G1** Target keyword — evidence: none | "Applied AI Company for Established Software | GoGloby" — locations: title — count: 0 — fix: Use an approved homepage target keyword and remove disallowed title positioning. — source: GoGloby Glossary: §6 Positioning terms
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "AI staff augmentation" — locations: schema — count: 1 — fix: Use the approved staffing service name rather than the prohibited standalone term. — source: GoGloby Glossary: §7 Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: remove — locations: body, schema — count: 1 — fix: Remove or correct prohibited, unsupported, or conflicting claims in the page and schema. — source: GoGloby Glossary: §7 Terms and claims we do not use; GoGloby Fact Sheet: Identity and Featured clients
❌ **H2** Priority — evidence: high — locations: title, meta, body, schema — count: 1 — fix: Prioritize changes to brand positioning, unsupported claims and structured-data conflicts. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **H3** Reasons — evidence: The title and meta describe an Applied AI Company, not the approved staffing and recruiting agency. | Organization schema contains incorrect legal-name spelling and disallowed positioning. | The page includes unsupported client metrics and a client not in the approved client list. | The Clutch review count conflicts with the Fact Sheet. — locations: title, meta, body, schema — count: 4 — fix: Resolve high-impact brand, factual, and structured-data issues before lower-priority copy edits. — source: decisions.md: Company description and Clients; GoGloby Fact Sheet: Identity, Featured clients, What clients say
