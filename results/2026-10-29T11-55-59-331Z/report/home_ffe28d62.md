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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#6d051f2d0a020a01020f14430e0200 (404) | https://gogloby.com/cdn-cgi/l/email-protection#234b5163444c444f4c415a0d404c4e (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: legalName":"Gogloby LLC" | "slogan":"Applied AI Engineering Partner" — locations: schema — count: 4 — fix: Correct the Organization node fields that do not match the approved company name, legal name, description, and positioning. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
  ✅ _Organization name_ — "name":"GoGloby" — locations: schema — count: 1
  ❌ _Organization legalName_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Use the legal name recorded in the Fact Sheet.
  ❌ _Organization slogan_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the unapproved positioning from the Organization node.
  ❌ _Organization description_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies — locations: schema — count: 1 — fix: Replace the Organization description with the approved company description.
➖ **B3** Person data — evidence: No Person nodes supplied in b3_person_evidence. — locations: schema — count: 0 — source: code_check_results: b3_person_evidence
❌ **B4** Schema matches the page — evidence: "reviewCount":4.9 — locations: schema — count: 1 — fix: Correct or remove the review count; the Fact Sheet records 10 Clutch reviews, not 4.9. — source: GoGloby Fact Sheet: What clients say

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
❌ **C2** Context terms — evidence: r Applied AI Engineering Benchmark | No Access to Proven AI Talent — locations: h2, body — count: 8 — fix: Remove or revise each Glossary §7 prohibited term occurrence, including the benchmark CTA and standalone AI talent reference. — source: GoGloby Glossary: §7 Terms and claims we do not use
  ❌ _Benchmark — h2_ — r Applied AI Engineering Benchmark — locations: h2 — count: 1 — fix: Remove the prohibited benchmark CTA wording.
  ❌ _Benchmark — body, technical briefing_ — ill walk you through the Benchmark, what your features cost — locations: body — count: 1 — fix: Remove the benchmark-as-CTA reference.
  ❌ _Benchmark — body, section heading_ — , Galileo™. Start With a Benchmark Get Your Applied AI Engi — locations: body — count: 1 — fix: Remove the benchmark-as-CTA reference.
  ❌ _Benchmark — body, CTA_ — r Applied AI Engineering Benchmark See what your engineerin — locations: body — count: 1 — fix: Remove the benchmark-as-CTA reference.
  ❌ _Benchmark — body, FAQ_ — We benchmark your AI spend — locations: body — count: 1 — fix: Remove benchmark as the primary action or service framing.
  ❌ _Claude Certified Architect_ — Claude Certified Architects, Claude-specific. — locations: body — count: 1 — fix: Remove the prohibited title or offer framing.
  ❌ _AI Solutions Architect_ — AI Solutions Architects, model-agnostic. — locations: body — count: 1 — fix: Remove the prohibited positioning or offer framing.
  ❌ _AI talent — standalone usage_ — No Access to Proven AI Talent — locations: h2, body — count: 1 — fix: Replace the standalone AI talent term with an approved service or role term.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Applied AI Company Trusted by 100+ Clients Across 10+ Industries | Engineers who already run an agentic SDLC on production code are a few thousand people — locations: h2, body — count: 5 — fix: Verify the public claims against the Fact Sheet and remove, correct, or substantiate claims not supported there. — source: GoGloby Fact Sheet: Identity; Key metrics; GoGloby Glossary: §10 Fact sheet
  ❌ _100+ clients / 10+ industries_ — Trusted by 100+ Clients Across 10+ Industries — locations: h2, body — count: 1 — fix: Verify or remove the client and industry totals; they are not stated in the Fact Sheet.
  ⚠️ _Under four weeks_ — Senior AI engineers inside your team in under 4 weeks — locations: body — count: 1 — fix: Check this timing claim against the approved service-specific timing before retaining it.
  ❌ _A few thousand qualified engineers_ — are a few thousand people — locations: body — count: 1 — fix: Verify or remove the unsupported market-size claim.
  ❌ _World’s #1 video game services company_ — The world’s #1 video game services company — locations: body — count: 1 — fix: Verify or remove this ranking claim.
  ⚠️ _Largest/leading superlative claim_ — America’s real estate super app — locations: body — count: 1 — fix: Verify this superlative or remove it.
❌ **D2** Client figures — evidence: HASBRO NYSE · $13.4B market cap · $4.7B revenue | ZILLOW NASDAQ · $10.7B market cap · $2.58B revenue — locations: body — count: 27 — fix: Check every listed client metric against the Fact Sheet; correct conflicts and verify figures not recorded there. — source: GoGloby Fact Sheet: Featured clients
  ❌ _Hasbro — market capitalization and revenue_ — HASBRO NYSE · $13.4B market cap · $4.7B revenue — locations: body — count: 2 — fix: Correct or verify both figures against the approved Hasbro information.
  ❌ _DrChrono — annual medical claims_ — DR. CHRONO 17M+ patients · $3B+ medical claims annually — locations: body — count: 2 — fix: Verify the patient and claims figures; the Fact Sheet states 17M+ patients and $3B in claims processed.
  ❌ _EverCommerce — market capitalization and client count_ — EVERCOMMERCE Nasdaq-listed SaaS · $1.98B market cap · 700,000+ business clients — locations: body — count: 2 — fix: Verify the market capitalization and client-count figures; the Fact Sheet records approximately $700M revenue and 700K+ clients.
  ❌ _Keywords Studios — acquisition value, revenue, employees_ — KEYWORDS $2.8B EQT acquisition · $844M revenue · 13,000 employees — locations: body — count: 3 — fix: Correct or verify the acquisition, revenue, and employee figures against the Fact Sheet.
  ❌ _MikeWorldWide — fee income and staff_ — MikeWorldWide Fortune 500 agency · $57M fee income · 230+ staff — locations: body — count: 2 — fix: Verify the fee-income and staff figures; they are not in the Fact Sheet.
  ❌ _TATA — market capitalization and revenue_ — TATA $106B market cap · $30B revenue — locations: body — count: 2 — fix: Verify the market-cap figure; the Fact Sheet records approximately $30B revenue.
  ⚠️ _Canopy — fundraising_ — CANOPY Series F · $236.5M raised — locations: body — count: 2 — fix: Verify these figures; the Fact Sheet records Series F and $236.5M raised.
  ❌ _Sydecar — assets under administration and revenue growth_ — SYDECAR $3B+ AUA · 107% YoY revenue growth — locations: body — count: 2 — fix: Verify both metrics; the Fact Sheet records $1B+ assets under administration.
  ❌ _Bonusly — funding and client count_ — BONUSLY Series B · $32.4M raised · 3,400+ clients — locations: body — count: 2 — fix: Verify both figures; the Fact Sheet records $20M Series B.
  ❌ _Every.io — payroll and tax-penalty claims_ — $60M+ payroll processed · $0 in tax penalties — locations: body — count: 2 — fix: Verify or remove these unsupported metrics.
  ❌ _Devsisters — market capitalization and lifetime spending_ — Public · $299M market cap · 200M+ users · $500M+ lifetime player spending — locations: body — count: 3 — fix: Verify the market-cap and spending figures; the Fact Sheet records 200M+ players.
  ❌ _Zillow — market capitalization, revenue, monthly users_ — ZILLOW NASDAQ · $10.7B market cap · $2.58B revenue · 227M monthly users — locations: body — count: 3 — fix: Verify each figure; the Fact Sheet records approximately $2B revenue.
❌ **D3** Clients not in the Fact Sheet — evidence: alt text: null; file_name: logo-disney-1-grayscale.png — locations: image_alt — count: 1 — fix: Remove or clarify the Disney logo if it is intended to imply a client relationship; otherwise provide accurate context. — source: GoGloby Fact Sheet: Featured clients; External recognition
  ❌ _Disney_ — alt text: null; file_name: logo-disney-1-grayscale.png — locations: image_alt — count: 1 — fix: Remove or clarify the logo if it is intended to imply a client relationship.
❌ **D4** Press and partners — evidence: Trustpilot: 4.5 | Clutch: 4.9 | reviewCount":4.9 — locations: schema, body, image_alt — count: 4 — fix: Align recognition and review claims with the Fact Sheet and correct unsupported review-count details. — source: GoGloby Fact Sheet: What clients say; External recognition
  ❌ _Clutch review count_ — "reviewCount":4.9 — locations: schema — count: 1 — fix: Use the review count recorded by the Fact Sheet or remove the count.
  ✅ _Trustpilot rating_ — Trustpilot: 4.5 — locations: body — count: 1
  ⚠️ _Clutch award wording_ — Clutch TOP Applied AI Engineering Partner 2025 — locations: schema — count: 1 — fix: Align award wording with the Fact Sheet award name.
  ❌ _London Daily News recognition_ — alt text: London Daily News; file_name: svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 — locations: image_alt — count: 1 — fix: Verify or remove this recognition logo; it is not listed in Fact Sheet External recognition.

## E. Positioning

❌ **E1** Service fit — evidence: not_fit — locations: title, meta, h1, h2, body — count: 1 — fix: Reposition the homepage around the approved staffing and recruiting services rather than AI product delivery. — source: GoGloby Fact Sheet: Identity and Services
❌ **E2** Positioning — evidence: "Applied AI Company for Established Software" — locations: title, meta — count: 1 — fix: Change the title and meta description to accurately identify GoGloby's staffing and recruiting focus. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
❌ **E3** Call to action — evidence: "Applied AI Services GoGloby Delivers" — locations: h2, body — count: 1 — fix: Remove or revise sections that present GoGloby as a software-development or AI-delivery provider. — source: GoGloby Fact Sheet: What GoGloby is not
❌ **E4** Lead order — evidence: "We embed Forward-Deployed Engineers." — locations: body — count: 1 — fix: Clarify the service model using the approved recruiting and staffing definitions. — source: GoGloby Fact Sheet: Services

## F. GEO

❌ **F1** Answer first — evidence: "Uncover & Fix What’s Holding Your AI Engineering Back" — locations: h1 — count: 1 — fix: Revise the hero so it clearly communicates the approved hiring services and buyer problem. — source: GoGloby Glossary: §9 How we write
❌ **F2** Buyer problem — evidence: "GoGloby is an Applied AI Engineering partner." — locations: body — count: 1 — fix: Replace the inaccurate company positioning with the approved description. — source: decisions.md: Company description
❌ **F3** Recruiting firm stated early — evidence: "AI Solutions Architects, model-agnostic." — locations: body — count: 1 — fix: Remove prohibited offer and positioning language. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **F4** GoGloby named near claims — evidence: "Vetted profiles delivered in 72 hours" — locations: schema — count: 1 — fix: Remove unsupported delivery-time and outcome claims from structured data. — source: GoGloby Fact Sheet: Services
❌ **F5** FAQ — evidence: "every AI dollar visible" — locations: meta, body — count: 1 — fix: Remove the prohibited AI-spend-led hero claim and keep cost as a supporting Intelligence Layer detail. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **F6** Audience — evidence: buyer_ready | The homepage directs visitors to a technical briefing and benchmark. | It frames the offer around AI engineering outcomes rather than hiring services. — locations: h2, body — count: 1 — fix: Make the page directly address companies ready to hire staffing or recruiting support. — source: GoGloby Glossary: §9 How we write

## G. Target keyword

❌ **G1** Target keyword — evidence: none | No target keyword supplied; the title instead uses “Applied AI Company”. — locations: title — count: 1 — fix: Align the homepage title with the approved homepage keyword direction in Glossary §6. — source: GoGloby Glossary: §6 Terms we use
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "Get Your Applied AI Engineering Benchmark" — locations: h2, body — count: 1 — fix: Remove the benchmark CTA and use a service-appropriate action. — source: GoGloby Glossary: §7 Terms and claims we do not use
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: remove — locations: meta, h2, body — count: 1 — fix: Remove prohibited positioning, obsolete product names, and unsupported claims from the page. — source: GoGloby Glossary: §7 Terms and claims we do not use
❌ **H2** Priority — evidence: high — locations: title, meta, h1, schema, body — count: 1 — fix: Prioritize correcting the company description and service identity across prominent page and schema fields. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity
❌ **H3** Reasons — evidence: • The title and meta position GoGloby as an Applied AI company/partner rather than a staffing and recruiting agency. | • Organization and Website schema repeat unapproved positioning and obsolete product terminology. | • The page presents delivery/consulting work, contradicting the Fact Sheet statement that GoGloby is not a software development shop. | • Client metrics contain multiple conflicts or figures not confirmed in the Fact Sheet. | • Several Glossary §7 prohibited terms and claims appear in headings, body text, and metadata. — locations: title, meta, h1, h2, body, schema — count: 5 — fix: Prioritize positioning and schema corrections, then audit client figures, prohibited terms, and unsupported claims. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity, Services, Featured clients; GoGloby Glossary: §§7, 9
