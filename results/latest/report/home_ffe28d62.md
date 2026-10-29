# Page report

- **URL:** https://gogloby.com/
- **Type:** homepage
- **Action:** rewrite
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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#70180230171f171c1f12095e131f1d (404) | https://gogloby.com/cdn-cgi/l/email-protection#167e64567179717a79746f3875797b (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization schema: "legalName":"Gogloby LLC" | Organization schema: "slogan":"Applied AI Engineering Partner" — locations: schema — count: 12 — fix: Align each mismatching Organization field with the approved company facts and remove or verify unapproved profile URLs. — source: decisions.md: Company description, Spelling, Official profiles; GoGloby Fact Sheet: Identity, Official profiles
  ✅ _Organization — name_ — Organization schema: "name":"GoGloby" — locations: schema — count: 1
  ❌ _Organization — legalName_ — Organization schema: "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name to match the Fact Sheet.
  ❌ _Organization — description_ — Organization schema: "We are a US-based talent acquisition agency..." — locations: schema — count: 1 — fix: Replace the schema description with the approved one-sentence company description.
  ❌ _Organization — slogan_ — Organization schema: "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove or correct the slogan so it does not describe GoGloby using a disallowed positioning term.
  ✅ _Organization — url_ — Organization schema: "url":"https://gogloby.com/" — locations: schema — count: 1
  ⚠️ _Organization — logo_ — Organization schema logo URL contains "globy-logo-square" — locations: schema — count: 1 — fix: Verify that the schema logo uses the current GoGloby branding rather than the former name.
  ⚠️ _Organization — sameAs_ — Organization schema sameAs includes "https://www.g2.com/products/gogloby/reviews" — locations: schema — count: 1 — fix: Remove or verify sameAs profiles not confirmed as official in the approved sources.
  ✅ _Organization — address_ — Organization schema: "8 The Green", "Dover", "DE", "19901", "US" — locations: schema — count: 1
  ✅ _Organization — founders and jobTitle_ — Organization schema includes Sergey Matikaynen, "Co-founder & CTO", and Vit Koval, "Co-founder" — locations: schema — count: 1
  ✅ _Organization — foundingDate_ — Organization schema: "foundingDate":"2021" — locations: schema — count: 1
  ✅ _Organization — telephone_ — Organization schema: "telephone":"+1-781-343-1777" — locations: schema — count: 1
  ❌ _Organization — knowsAbout_ — Organization schema knowsAbout includes "Applied AI Engineering Partner" and "AI Agent Development" — locations: schema — count: 1 — fix: Remove or revise schema topics that conflict with the approved company positioning and scope.
❌ **B3** Person data — evidence: Sergey: "secure development environment design" | Vit: "generating $60M+ in value" — locations: schema — count: 2 — fix: Review Person schema descriptions, knowsAbout values, and profile URLs against the approved founder information. — source: decisions.md: Founders, Official profiles; GoGloby Fact Sheet: Founders, Official profiles
  ❌ _Sergey Matikaynen_ — Description: "secure development environment design" | knowsAbout includes "Secure AI development environments" — locations: schema — count: 1 — fix: Align the Person description and knowsAbout values with the approved founder information; verify the listed profile URL.
  ❌ _Vit Koval_ — Description: "generating $60M+ in value" | knowsAbout includes "Nearshore AI talent" — locations: schema — count: 1 — fix: Align the Person description and knowsAbout values with the approved founder information; verify the listed profile URL.
❌ **B4** Schema matches the page — evidence: Visible FAQ: "What is an applied AI company?" | Service schema includes "Vetted profiles delivered in 72 hours" — locations: body, schema — count: 1 — fix: Make FAQ and Service schema reflect the visible page and approved service facts; remove unsupported or conflicting schema claims. — source: GoGloby Fact Sheet: Services; Glossary §7: Terms and claims we do not use

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
❌ **C2** Context terms — evidence: “Start With a Benchmark” uses the prohibited benchmark CTA. | “Applied AI Engineering partner” and “Applied AI Company” describe GoGloby in ways prohibited by Glossary §7. — locations: h2, body, meta, first_paragraph — count: 56 — fix: Change prohibited benchmark calls to action, descriptions of GoGloby as an Applied AI Company or partner, architect offerings, and standalone “AI talent” usage. Review each listed occurrence against Glossary §7. — source: GoGloby Glossary §7
  ❌ _c2:Benchmark:h2:0_ — “Get Your Applied AI Engineering Benchmark” — locations: h2 — count: 1 — fix: Change this benchmark CTA; Glossary §7 prohibits “Benchmark” as the main call to action.
  ❌ _c2:Benchmark:body:1_ — “walk you through the Benchmark” — locations: body — count: 1 — fix: Change this benchmark CTA; Glossary §7 prohibits “Benchmark” as the main call to action.
  ❌ _c2:Benchmark:body:2_ — “Start With a Benchmark” — locations: body — count: 1 — fix: Change this benchmark CTA; Glossary §7 prohibits “Benchmark” as the main call to action.
  ❌ _c2:Benchmark:body:3_ — “Get Your Applied AI Engineering Benchmark” — locations: body — count: 1 — fix: Change this benchmark CTA; Glossary §7 prohibits “Benchmark” as the main call to action.
  ✅ _c2:Benchmark:body:4_ — “benchmark your AI spend” — locations: body — count: 1
  ❌ _c2:Claude Certified Architect:body:5_ — “Claude Certified Architects, Claude-specific” — locations: body — count: 1 — fix: Remove the architect credential as an offer; Glossary §7 prohibits “Claude Certified Architect” as positioning or an offer.
  ❌ _c2:AI Solutions Architect:body:6_ — “AI Solutions Architects, model-agnostic” — locations: body — count: 1 — fix: Remove the architect role as an offer; Glossary §7 prohibits “AI Solutions Architect” as positioning or an offer.
  ❌ _c2:Applied AI Engineering:meta:7_ — “GoGloby is an Applied AI Engineering partner” — locations: meta — count: 1 — fix: Change the description of GoGloby as an Applied AI Engineering partner; Glossary §7 disallows this positioning.
  ✅ _c2:Applied AI Engineering:h2:8_ — “The Applied AI Engineering Gaps We Solve” — locations: h2 — count: 1
  ✅ _c2:Applied AI Engineering:h2:9_ — “How Our Applied AI Engineering Model Works” — locations: h2 — count: 1
  ✅ _c2:Applied AI Engineering:h2:10_ — “US-Aligned Applied AI Engineering Hubs” — locations: h2 — count: 1
  ✅ _c2:Applied AI Engineering:h2:11_ — “Get Your Applied AI Engineering Benchmark” — locations: h2 — count: 1
  ❌ _c2:Applied AI Engineering:first_paragraph:12_ — “GoGloby is an Applied AI Engineering partner” — locations: first_paragraph — count: 1 — fix: Change the description of GoGloby as an Applied AI Engineering partner; Glossary §7 disallows this positioning.
  ✅ _c2:Applied AI Engineering:body:13_ — “The Applied AI Engineering Gaps We Solve” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:14_ — “How Our Applied AI Engineering Model Works” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:15_ — “A GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:16_ — “A GoGloby Applied AI Engineering engagement” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:17_ — “A long-term GoGloby Applied AI Engineering partner” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:18_ — “A GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:19_ — “A GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:20_ — “A long-term GoGloby Applied AI Engineering partner” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:21_ — “A GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:22_ — “A GoGloby Applied AI Engineering partner” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:23_ — “A GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:24_ — “A GoGloby Applied AI Engineering client” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:25_ — “Why GoGloby Is Different From Other Applied AI Companies” — locations: body — count: 1
  ✅ _c2:Applied AI Engineering:body:26_ — “US-Aligned Applied AI Engineering Hubs” — locations: body — count: 1
  ❌ _c2:Applied AI Engineering:body:27_ — “Get Your Applied AI Engineering Benchmark” — locations: body — count: 1 — fix: Change this benchmark CTA; Glossary §7 prohibits “Benchmark” as the main call to action.
  ✅ _c2:Forward-Deployed Engineering:body:28_ — “Forward-Deployed Engineering” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:first_paragraph:29_ — “We embed Forward-Deployed Engineers” — locations: first_paragraph — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:30_ — “we embed the forward-deployed engineers who ship it” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:31_ — “Forward-deployed engineers work inside your existing repositories” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:32_ — “Forward-Deployed Engineers Ship With You” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:33_ — “Forward-deployed engineers work with the team” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:34_ — “forward-deployed engineers who clear the bottlenecks” — locations: body — count: 1
  ✅ _c2:Forward-Deployed Engineers:body:35_ — “Forward-Deployed Engineers who install the Agentic SDLC” — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:36_ — “run an agentic SDLC on production code” — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:37_ — “install the Agentic SDLC” — locations: body — count: 1
  ❌ _c2:AI ROI:first_paragraph:38_ — “We prove AI ROI” — locations: first_paragraph — count: 1 — fix: Change the hero lead, which leads with AI ROI contrary to Glossary §7.
  ✅ _c2:AI ROI:body:39_ — “Invisible AI ROI” — locations: body — count: 1
  ✅ _c2:AI ROI:body:40_ — “GoGloby connects AI ROI to shipped work” — locations: body — count: 1
  ✅ _c2:AI ROI:body:41_ — “How does the AI Intelligence Layer measure AI ROI?” — locations: body — count: 1
  ✅ _c2:AI ROI:body:42_ — “board pressure to prove AI ROI” — locations: body — count: 1
  ✅ _c2:AI spend:body:43_ — “Uncontrolled AI Spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:44_ — “AI spending can grow quickly” — locations: body — count: 1
  ✅ _c2:AI spend:body:45_ — “connects AI spending to the work” — locations: body — count: 1
  ✅ _c2:AI spend:body:46_ — “AI spend by team, developer, and model” — locations: body — count: 1
  ✅ _c2:AI spend:body:47_ — “Where AI spending produces value” — locations: body — count: 1
  ✅ _c2:AI spend:body:48_ — “Compare delivery and AI spending” — locations: body — count: 1
  ✅ _c2:AI spend:body:49_ — “AI spending and engineering time are going” — locations: body — count: 1
  ✅ _c2:AI spend:body:50_ — “See where AI spending contributes to shipped work” — locations: body — count: 1
  ✅ _c2:AI spend:body:51_ — “Visibility into where AI spend and engineering time go” — locations: body — count: 1
  ✅ _c2:AI spend:body:52_ — “AI spend optimization” — locations: body — count: 1
  ✅ _c2:AI spend:body:53_ — “benchmark your AI spend” — locations: body — count: 1
  ✅ _c2:AI spend:body:54_ — “connects AI spending with engineering work” — locations: body — count: 1
  ❌ _c2:AI talent:body:55_ — “No Access to Proven AI Talent” — locations: body — count: 1 — fix: Change the standalone “AI Talent” use; Glossary §7 prohibits this term on its own.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Page: "Forward-deployed in under 4 weeks" | Page: "$3M Combined Liability (Cyber, Data and Professional)" — locations: first_paragraph, body, schema, meta — count: 11 — fix: Review company, service, timing, guarantee, insurance, and assessment claims against the approved source values. — source: GoGloby Fact Sheet: Identity, Services, How we vet, Key metrics, Legal and security; decisions.md: Company description
  ❌ _Company description and positioning_ — Page: "GoGloby is an Applied AI Engineering partner" | Page: "Applied AI Company Trusted by 100+ Clients" — locations: first_paragraph, body — count: 1 — fix: Correct the company description and remove unsupported company positioning and client-count claims.
  ✅ _Years in business_ — Page describes "3+ years" in the MikeWorldWide card; Fact Sheet states five years in business. — locations: body — count: 1 — fix: Review the MikeWorldWide tenure statement separately if it is intended as a company-years-in-business claim.
  ✅ _Founding year_ — Organization schema: "foundingDate":"2021" — locations: schema — count: 1
  ⚠️ _Headquarters and offices_ — Page: "Office in Argentina" and "Office in Brazil" — locations: body — count: 1 — fix: Verify office-location claims that are not stated in the Fact Sheet.
  ⚠️ _Team size and client count_ — Page: "Trusted by 100+ Clients" — locations: body — count: 1 — fix: Verify the client-count claim; the Fact Sheet does not provide a total client count.
  ❌ _Services and business model_ — Page: "we run the AI Intelligence Layer" | Page: "GoGloby delivers outcomes, not hours" — locations: first_paragraph, body — count: 1 — fix: Correct service and business-model claims that present unapproved offerings or conflict with the stated recruiting and staffing services.
  ❌ _Staffing start timeline_ — Page: "Senior AI engineers inside your team in under 4 weeks" | Fact Sheet: nearshore staffing time is "2–3 weeks to start" — locations: first_paragraph, body — count: 1 — fix: Correct the staffing timeline to the approved time to start.
  ✅ _Assessment pass rate_ — Page: "4-stage technical assessment" — locations: body — count: 1
  ❌ _Guarantee_ — Page: "underperforms against the agreed baseline for two consecutive sprints" | Fact Sheet: staffing replacement is performance-based if results fall below baseline; cancel any time in the first 120 days. — locations: body — count: 1 — fix: Align guarantee terms with the approved service-specific guarantee.
  ❌ _Insurance_ — Page: "$3M Combined Liability (Cyber, Data and Professional)" | Fact Sheet: "$3M data and cyber liability" — locations: body — count: 1 — fix: Correct the insurance description to match the Fact Sheet.
  ⚠️ _Key metrics_ — Page: "every AI dollar visible" — locations: meta, first_paragraph, body — count: 1 — fix: Verify unsubstantiated performance and outcome claims; remove claims not supported by approved facts.
❌ **D2** Client figures — evidence: Hasbro: "$4.7B revenue" | TATA: "$106B market cap" — locations: body — count: 12 — fix: Correct figures that conflict with the Fact Sheet and verify metrics it does not provide. — source: GoGloby Fact Sheet: Featured clients
  ❌ _d2:hasbro — Hasbro_ — HASBRO: "$4.7B revenue"; Fact Sheet: "~$5B revenue". | HASBRO: "$13.4B market cap" is not stated in the Fact Sheet. — locations: body — count: 1 — fix: Correct the revenue figure and verify the unlisted market-cap figure.
  ⚠️ _d2:tata — TATA_ — TATA: "$30B revenue" and "600,000+ employees" match the Fact Sheet. | TATA: "$106B market cap" is not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the market-cap figure.
  ⚠️ _d2:evercommerce — EverCommerce_ — EVERCOMMERCE: "700,000+ business clients"; Fact Sheet states "700K+ clients". | EVERCOMMERCE: "$1.98B market cap" is not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the market-cap figure and clarify whether the client metric is comparable to the Fact Sheet metric.
  ❌ _d2:zillow — Zillow_ — ZILLOW: "$2.58B revenue"; Fact Sheet: "~$2B revenue". | ZILLOW: "$10.7B market cap" and "227M monthly users" are not stated in the Fact Sheet. — locations: body — count: 1 — fix: Correct the revenue figure and verify the unlisted market-cap and user figures.
  ⚠️ _d2:devsisters — Devsisters_ — DEVSISTERS: "200M+ users"; Fact Sheet: "200M+ players". | Market cap, lifetime spending, and country count are not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the figures not listed in the Fact Sheet and ensure the audience metric is accurately described.
  ✅ _d2:drchrono — DrChrono_ — DR. CHRONO: "17M+ patients" and "$3B+ medical claims annually" match the Fact Sheet's 17M+ patients and $3B in claims processed. — locations: body — count: 1
  ⚠️ _d2:mikeworldwide — MikeWorldWide_ — MikeWorldWide: "$57M fee income" and "230+ staff" are not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the fee-income and staff figures.
  ⚠️ _d2:every.io — Every.io_ — EVERY: "$32M raised" matches the Fact Sheet. | Payroll processed, tax penalties, and the award claim are not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the payroll, tax, and award claims.
  ⚠️ _d2:sydecar — Sydecar_ — SYDECAR: "$3B+ AUA"; Fact Sheet: "$1B+ assets under administration". | SYDECAR: "107% YoY revenue growth" is not stated in the Fact Sheet. — locations: body — count: 1 — fix: Verify the assets-under-administration and revenue-growth figures.
  ⚠️ _d2:bonusly — Bonusly_ — BONUSLY: "$32.4M raised"; Fact Sheet: "$20M Series B". | The Fact Sheet provides a funding-round amount, not a total raised figure; "3,400+ clients" is not stated. — locations: body — count: 1 — fix: Verify total funding and client-count figures and distinguish them from the Fact Sheet's Series B amount.
  ✅ _d2:alchemy health — Alchemy Health_ — ALCHEMY: "$31M seed" and "25M+ prescriptions"; Fact Sheet: "$32M raised" and "25M+ prescriptions". The page's seed-round figure is not directly comparable to total raised. — locations: body — count: 1
  ✅ _d2:canopy — Canopy_ — CANOPY: "Series F · $236.5M raised" matches the Fact Sheet. — locations: body — count: 1
❌ **D3** Clients not in the Fact Sheet — evidence: Page: "NOVILAB Series B · $46M raised" | Page: "GITLAB $8B+ market cap" — locations: body, image_alt — count: 33 — fix: Remove or verify client claims for companies not supported as clients by the Fact Sheet; distinguish non-client logo-wall companies. — source: GoGloby Fact Sheet: Featured clients, External recognition; decisions.md: Clients
  ✅ _client_card:hasbro nyse_ — Verdict: fact_sheet_client. Page: "HASBRO NYSE". — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — Verdict: fact_sheet_client. Page: "DR. CHRONO 17M+ patients". — locations: body — count: 1
  ✅ _client_card:evercommerce_ — Verdict: fact_sheet_client. Page: "EVERCOMMERCE Nasdaq-listed SaaS". — locations: body — count: 1
  ✅ _client_card:keywords_ — Verdict: fact_sheet_client. Page: "KEYWORDS $2.8B EQT acquisition"; Fact Sheet client: Keywords Studios. — locations: body — count: 1
  ✅ _client_card:eqt_ — Verdict: not_a_client. Page: "$2.8B EQT acquisition" identifies EQT as the acquirer, not as a GoGloby client. — locations: body — count: 1
  ✅ _client_card:tata_ — Verdict: fact_sheet_client. Page: "TATA $106B market cap"; decisions.md confirms TATA/TCS is a client. — locations: body — count: 1
  ✅ _client_card:canopy_ — Verdict: fact_sheet_client. Page: "CANOPY Series F". — locations: body — count: 1
  ✅ _client_card:sydecar_ — Verdict: fact_sheet_client. Page: "SYDECAR $3B+ AUA". — locations: body — count: 1
  ❌ _client_card:novilab_ — Verdict: not_in_fact_sheet. Page: "NOVILAB Series B · $46M raised" and "An active GoGloby Applied AI Engineering engagement". — locations: body — count: 1 — fix: Remove or verify the claim that Novilab is a GoGloby client.
  ✅ _client_card:bonusly_ — Verdict: fact_sheet_client. Page: "BONUSLY Series B". — locations: body — count: 1
  ✅ _client_card:every_ — Verdict: fact_sheet_client. Page: "EVERY $32M raised"; Fact Sheet client: Every.io. — locations: body — count: 1
  ✅ _client_card:alchemy_ — Verdict: fact_sheet_client. Page: "ALCHEMY $31M seed"; Fact Sheet client: Alchemy Health. — locations: body — count: 1
  ✅ _client_card:devsisters_ — Verdict: fact_sheet_client. Page: "DEVSISTERS Public". — locations: body — count: 1
  ✅ _client_card:zillow nasdaq_ — Verdict: fact_sheet_client. Page: "ZILLOW NASDAQ". — locations: body — count: 1
  ✅ _client_card:gitlab_ — Verdict: not_a_client. Page places "GITLAB" in the "Featured by"/software-company section, not among client engagements. — locations: body — count: 1
  ✅ _client_card:ai. oyster_ — Verdict: not_a_client. Page: "OYSTER" in the featured-company listing; Fact Sheet lists Oyster under External recognition partners. — locations: body — count: 1
  ✅ _logo_image:background_ — Verdict: not_a_client. Page image alt: "Background". — locations: image_alt — count: 1
  ✅ _logo_image:hasbro_ — Verdict: fact_sheet_client. Page image alt: "Hasbro". — locations: image_alt — count: 1
  ✅ _logo_image:evercommerce_ — Verdict: fact_sheet_client. Page image alt: "Evercommerce". — locations: image_alt — count: 1
  ✅ _logo_image:drchrono_ — Verdict: fact_sheet_client. Page image alt: "DrChrono". — locations: image_alt — count: 1
  ✅ _logo_image:mww_ — Verdict: fact_sheet_client. Page image alt: "MWW"; Fact Sheet client: MikeWorldWide. — locations: image_alt — count: 1
  ✅ _logo_image:tata_ — Verdict: fact_sheet_client. Page image alt: "TATA"; decisions.md confirms the client listing. — locations: image_alt — count: 1
  ✅ _logo_image:zillow_ — Verdict: fact_sheet_client. Page image alt: "Zillow". — locations: image_alt — count: 1
  ✅ _logo_image:keywords_ — Verdict: fact_sheet_client. Page image alt: "Keywords"; Fact Sheet client: Keywords Studios. — locations: image_alt — count: 1
  ✅ _logo_image:deel 1 grayscale_ — Verdict: fact_sheet_client. Page image file: "logo-deel-1-grayscale.png"; Fact Sheet client: Deel. — locations: image_alt — count: 1
  ❌ _logo_image:disney 1 grayscale_ — Verdict: not_in_fact_sheet. Page image file: "logo-disney-1-grayscale.png"; no Disney client entry is in the Fact Sheet. — locations: image_alt — count: 1 — fix: Remove or verify the Disney client logo.
  ✅ _text_cue:hasbro_ — Verdict: fact_sheet_client. Page: "HASBRO NYSE". — locations: body — count: 1
  ✅ _text_cue:nyse_ — Verdict: not_a_client. Page: "HASBRO NYSE"; NYSE identifies the listing venue, not a client. — locations: body — count: 1
  ✅ _text_cue:nfl_ — Verdict: not_a_client. Page lists "Amazon · NFL · Deloitte · WNBA" as MikeWorldWide's roster, not GoGloby clients. — locations: body — count: 1
  ✅ _text_cue:wnba_ — Verdict: not_a_client. Page lists "Amazon · NFL · Deloitte · WNBA" as MikeWorldWide's roster, not GoGloby clients. — locations: body — count: 1
  ✅ _text_cue:every_ — Verdict: fact_sheet_client. Page: "EVERY $32M raised"; Fact Sheet client: Every.io. — locations: body — count: 1
  ✅ _text_cue:zillow_ — Verdict: fact_sheet_client. Page: "ZILLOW NASDAQ". — locations: body — count: 1
  ✅ _text_cue:nasdaq_ — Verdict: not_a_client. Page: "ZILLOW NASDAQ"; NASDAQ identifies the listing venue, not a client. — locations: body — count: 1
⚠️ **D4** Press and partners — evidence: Page: "Forbes", "NBC", "HubSpot", and "Fox News" | Organization schema award: "Clutch TOP Applied AI Engineering Partner 2025" — locations: body, image_alt, schema — count: 1 — fix: Verify press, partner, and award claims against the Fact Sheet; remove or substantiate unsupported mentions. — source: GoGloby Fact Sheet: External recognition
  ⚠️ _Press, partners, and awards_ — Page/logo text includes "Forbes", "NBC", "HubSpot", and "Fox News"; Fact Sheet lists Forbes, NBC, and HubSpot, but does not list Fox News. | Page has a schema award: "Clutch TOP Applied AI Engineering Partner 2025"; Fact Sheet award is "Clutch Top Applied AI Engineering Partner, 2025". — locations: body, image_alt, schema — count: 1 — fix: Verify the Fox News mention and keep press, partner, and award claims consistent with the Fact Sheet.

## E. Positioning

✅ **E1** Service fit — value: both — evidence: “We recruit US AI leaders” | “We embed Forward-Deployed Engineers” — locations: first_paragraph, body — source: GoGloby Fact Sheet — Services; Glossary §2 The two services
❌ **E2** Positioning — evidence: “GoGloby is an Applied AI Engineering partner” | “we run the AI Intelligence Layer” — locations: title, meta, first_paragraph, body — fix: Reposition the page to describe GoGloby as the staffing and recruiting agency in the approved company description; remove claims that position it as an Applied AI Engineering partner or product/service delivery company. — source: decisions.md — Company description; GoGloby Fact Sheet — Identity, What GoGloby is not
❌ **E3** Call to action — evidence: “Start With a Benchmark” | “Schedule a Technical Briefing” | “Talk to Us” | “Check How It Works” — locations: body — count: 4 — fix: Review the page CTAs against Glossary §7 and use the approved recruiting or staffing CTA for the relevant service; remove benchmark-as-CTA wording. — source: GoGloby Glossary §7 — Terms and claims we do not use
❌ **E4** Lead order — evidence: “GoGloby is an Applied AI Engineering partner” | “We embed Forward-Deployed Engineers” | “We prove AI ROI” | “No Access to Proven AI Talent” — locations: first_paragraph, body — fix: Reorder the opening to lead with the hire and service, then present proof, assessment, guarantees, and the Intelligence Layer; remove the product/ROI-led opening and keep nearshore or Latin America details out of the hero. — source: GoGloby Glossary §9 — How we write

## F. GEO

❌ **F1** Answer first — evidence: Title: “Applied AI Company for Established Software | GoGloby” | First sentence: “GoGloby is an Applied AI Engineering partner.” | Second sentence: “We turn engineering into AI-native production for established software companies: we find what’s slowing your engineering down, put the right people inside your team to fix it, and prove the result every month.” — locations: title, first_paragraph — count: 2 — fix: Align the opening two sentences with the homepage title and approved company description. — source: Glossary §9 (Answer first); decisions.md, Company description
❌ **F2** Buyer problem — evidence: Opening: “We embed Forward-Deployed Engineers. Senior AI engineers inside your team in under 4 weeks” | Opening: “We prove AI ROI.” — locations: first_paragraph — count: 0 — fix: Open with one of the buyer problems specified in Glossary §1. — source: Glossary §1, The three problems buyers bring us
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **F4** GoGloby named near claims — evidence: Opening: “We embed Forward-Deployed Engineers.” | Opening: “We prove AI ROI.” — locations: first_paragraph, body — fix: Name GoGloby in key claims that currently rely on “we” so quoted fragments identify the company. — source: Glossary §9, Aim for the answers that name companies
✅ **F5** FAQ — evidence: FAQ heading: “FAQs” | FAQ answer: “No. The AI Intelligence Layer connects with tools the team already uses, such as Jira, GitHub, Claude Code, and Cursor.” — locations: body — source: Checks for LLM call 3, F5 — FAQ
✅ **F6** Audience — value: buyer_ready — evidence: CTA: “Schedule a Technical Briefing” | FAQ audience: “GoGloby is for established B2B software companies, usually a CTO or VP of Engineering” — locations: body — source: Glossary §9, Write only for buyers who are ready to hire

## G. Target keyword

✅ **G1** Target keyword — value: AI engineer staffing — evidence: Title: “Applied AI Company for Established Software | GoGloby” | Body: “We embed Forward-Deployed Engineers. Senior AI engineers inside your team in under 4 weeks” — locations: title, first_paragraph — fix: Use the homepage’s designated target term in its title and relevant prominent page content. — source: Glossary §6, Positioning terms
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: Title: “Applied AI Company for Established Software | GoGloby” | H1: “Uncover & Fix What’s Holding Your AI Engineering Back” — locations: title, h1 — count: 0 — source: Glossary §8, Trap terms
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

ℹ️ **H1** Action — value: rewrite — evidence: Title: “Applied AI Company for Established Software | GoGloby” | Opening: “GoGloby is an Applied AI Engineering partner.” | Body: “We recruit the AI leaders, embed the FDE engineers, and run the measurement” — locations: title, first_paragraph, body — fix: Rework the homepage positioning and opening to reflect the approved company description and services. — source: decisions.md, Company description; Glossary §1 and §9
ℹ️ **H2** Priority — value: high — evidence: Title: “Applied AI Company for Established Software | GoGloby” | Body: “Start With a Benchmark” — locations: title, body — fix: Prioritize correcting the homepage’s positioning and prohibited claims. — source: Glossary §7, Terms and claims we do not use; Glossary §9
ℹ️ **H3** Reasons — value: F1: opening does not answer the title with the approved company description; F2: opening does not lead with a buyer problem; F4: key opening claims use “we” without naming GoGloby; H1: homepage positioning diverges from approved description and services — evidence: Opening: “GoGloby is an Applied AI Engineering partner.” | Opening: “We embed Forward-Deployed Engineers.” | Body: “Start With a Benchmark” — locations: title, first_paragraph, body — fix: Address the listed content and positioning issues on the homepage. — source: Glossary §1, §7, §9; decisions.md, Company description
