# Page report

- **URL:** https://gogloby.com/solutions/ai-engineering-visibility/
- **Type:** service
- **Action:** needs_decision
- **Priority:** high

## First paragraph

See, govern, and predict the cost of AI engineering. Every token, model call, PR, and shipped feature tied to dollars, teams, and ROI against your own baseline.

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
❌ **B2** Organization data — evidence: Organization schema name is “GoGloby”; its legalName is “Gogloby LLC” and description is “We are a US-based talent acquisition agency…” | Schema slogan is “Applied AI Engineering Partner”; the page’s listed client evidence includes “A GoGloby Applied AI Engineering client.” — locations: schema — count: 12 — fix: Align Organization fields with approved company facts and terminology; review every Organization field against the sources. — source: decisions.md: Company description, Spelling; GoGloby Fact Sheet: Identity, Official profiles, Founders; Glossary §7
  ✅ _Organization node — name_ — Schema name: “GoGloby”. — locations: schema — count: 1
  ❌ _Organization node — legalName_ — Schema legalName: “Gogloby LLC”; approved legal name: “GoGloby LLC”. — locations: schema — count: 1 — fix: Correct the legalName casing to match the Fact Sheet.
  ❌ _Organization node — description_ — Schema: “US-based talent acquisition agency specializing in assisting tech companies…”; approved description: “GoGloby is a staffing and recruiting agency specializing in hiring Data & AI Engineers.” — locations: schema — count: 1 — fix: Use the approved one-sentence description verbatim.
  ❌ _Organization node — slogan_ — Schema slogan: “Applied AI Engineering Partner”; Glossary §7 prohibits “Applied AI Engineering partner” as a description of GoGloby. — locations: schema — count: 1 — fix: Remove or change the prohibited slogan.
  ✅ _Organization node — url_ — Schema URL: “https://gogloby.com/”. — locations: schema — count: 1
  ⚠️ _Organization node — logo_ — Schema logo file is “globy-logo-square-1-01.png”. — locations: schema — count: 1 — fix: Verify that the logo asset uses the current GoGloby branding, not the former name.
  ❌ _Organization node — sameAs_ — Schema includes “https://www.g2.com/products/gogloby/reviews” and “https://www.trustpilot.com/review/gogloby.com”; the Fact Sheet marks G2 as “Not available yet” and does not list Trustpilot among official profiles. — locations: schema — count: 1 — fix: Remove or verify profile URLs that are not approved in the source facts.
  ✅ _Organization node — address_ — Schema address: “8 The Green”, “Dover”, “DE”, “19901”, “US”. — locations: schema — count: 1
  ✅ _Organization node — founders and jobTitle_ — Schema founder titles include “Co-founder & CTO” and “Co-founder”, matching approved titles after normalization. — locations: schema — count: 1
  ✅ _Organization node — foundingDate_ — Schema foundingDate: “2021”. — locations: schema — count: 1
  ✅ _Organization node — telephone_ — Schema telephone: “+1-781-343-1777”. — locations: schema — count: 1
  ❌ _Organization node — knowsAbout_ — Schema knowsAbout includes “Applied AI Engineering Partner”, “AI Agent Development”, and “Generative ai development services”; these conflict with the approved category and prohibited positioning. — locations: schema — count: 1 — fix: Remove prohibited positioning and unsupported subject claims from knowsAbout.
❌ **B3** Person data — evidence: Sergey’s Person description includes “Applied AI Engineering system”; Vit’s includes “Applied AI Engineering system” and “$60M+ in value”. — locations: schema — count: 2 — fix: Review Person descriptions and knowsAbout against approved founder information and remove prohibited positioning or unsupported claims. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — Description: “technical architecture behind the Applied AI Engineering system.” | knowsAbout includes “Applied AI Engineering” and “Secure AI development environments.” — locations: schema — count: 1 — fix: Remove prohibited positioning and align founder details with approved information.
  ❌ _Vit Koval_ — Description: “generating $60M+ in value” and “Built the Applied AI Engineering system.” | knowsAbout includes “Applied AI Engineering Partnerships” and “Nearshore AI talent.” — locations: schema — count: 1 — fix: Remove prohibited positioning and unsupported claims; align the person record with approved founder information.
❌ **B4** Schema matches the page — evidence: FAQPage is present in schema, but the provided schema evidence does not establish that its questions match the visible FAQ content. | Visible page describes an AI cost management product; schema Service examples describe generative AI delivery, staff augmentation, and recruiting instead. — locations: schema, body — fix: Align FAQPage and Service schema with the visible page content and remove schema-only claims. — source: page body: FAQs; organization_nodes.hasOfferCatalog

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
❌ **C2** Context terms — evidence: Get Your AI Cost Benchmark | GoGloby Applied AI Engineering client — locations: h2, body — count: 33 — fix: Remove Benchmark as the primary call to action and remove Applied AI Engineering used to describe GoGloby or its offering. — source: GoGloby Glossary §7
  ❌ _c2:Benchmark:h2:0_ — Your AI Cost Management Benchmark — locations: h2 — count: 1 — fix: Do not use Benchmark as the primary call to action.
  ❌ _c2:Benchmark:body:1_ — Get Your AI Cost Benchmark — locations: body — count: 1 — fix: Do not use Benchmark as the primary call to action.
  ✅ _c2:Benchmark:body:2_ — Benchmark Setup Outcome — locations: body — count: 1
  ❌ _c2:Benchmark:body:3_ — START WITH A FREE BENCHMARK — locations: body — count: 1 — fix: Do not present a Benchmark as the primary call to action.
  ❌ _c2:Benchmark:body:4_ — Your AI Cost Management Benchmark — locations: body — count: 1 — fix: Do not use Benchmark as the primary call to action.
  ✅ _c2:Benchmark:body:5_ — If you stop after the Benchmark — locations: body — count: 1
  ❌ _c2:Benchmark:body:6_ — Get Your AI Cost Benchmark — locations: body — count: 1 — fix: Do not use Benchmark as the primary call to action.
  ✅ _c2:Benchmark:body:7_ — That’s the Benchmark — locations: body — count: 1
  ✅ _c2:Benchmark:body:8_ — What happens after the Benchmark? — locations: body — count: 1
  ✅ _c2:Benchmark:body:9_ — If you stop after the Benchmark — locations: body — count: 1
  ❌ _c2:Applied AI Engineering:body:10_ — GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:11_ — GoGloby Applied AI Engineering engagement — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:12_ — GoGloby Applied AI Engineering partner — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:13_ — GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:14_ — GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:15_ — GoGloby Applied AI Engineering partner — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:16_ — GoGloby Applied AI Engineering engagement — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:17_ — GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:18_ — GoGloby Applied AI Engineering partner — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:19_ — GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ❌ _c2:Applied AI Engineering:body:20_ — GoGloby Applied AI Engineering client — locations: body — count: 1 — fix: Remove Applied AI Engineering used to describe GoGloby or its offering.
  ✅ _c2:Forward-Deployed Engineers:body:21_ — forward-deployed engineers work inside your team — locations: body — count: 1
  ✅ _c2:Agentic SDLC:body:22_ — set up the Agentic SDLC — locations: body — count: 1
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

❌ **D1** Company facts — evidence: Page says “The AI Intelligence Layer”; the Fact Sheet names this system “AI Development Intelligence Layer” and says it is sold only bundled with nearshore staffing, never separately. | Page presents an “AI Cost Management” solution, free benchmark, and forward-deployed engineers; the approved description and services are staffing and recruiting. — locations: title, h1, body, schema — fix: Review company, product and service claims against approved facts; remove or verify unsupported claims and outdated product naming. — source: decisions.md: Company description; GoGloby Fact Sheet: Services, Key metrics, Legal and security; Glossary §2, §7
❌ **D2** Client figures — evidence: Client cards list figures for multiple Fact Sheet clients, including “$13.4B market cap” and “$4.7B revenue” for Hasbro. — locations: body — count: 11 — fix: Correct conflicting client figures and verify figures not present in the Fact Sheet before publication. — source: GoGloby Fact Sheet: Featured clients
  ❌ _d2:hasbro — Hasbro_ — “$13.4B market cap” is not in the Fact Sheet; “$4.7B revenue” conflicts with Fact Sheet “~$5B revenue”. — locations: body — count: 1 — fix: Correct the conflicting revenue figure and verify the market-cap figure.
  ⚠️ _d2:tata — TATA_ — “$30B revenue” agrees with the Fact Sheet; “$106B market cap” is not listed there. — locations: body — count: 1 — fix: Verify the market-cap figure against an approved source.
  ⚠️ _d2:evercommerce — EverCommerce_ — “700,000+ business clients” is not verified by the Fact Sheet, which states “700K+ clients”; “$1.98B market cap” is not listed. — locations: body — count: 1 — fix: Verify these figures and ensure the client-count metric is accurately represented.
  ⚠️ _d2:devsisters — Devsisters_ — “200M+ users” aligns broadly with the Fact Sheet’s “200M+ players”; market cap, lifetime player spending and country count are not listed there. — locations: body — count: 1 — fix: Verify the market-cap, lifetime-spending and country figures.
  ⚠️ _d2:drchrono — DrChrono_ — “17M+ patients” and “$3B+ medical claims annually” are not exact Fact Sheet metrics; it states “17M+ patients, $3B in medical claims processed.” — locations: body — count: 1 — fix: Verify the annual and plus-qualified figures; align them with the Fact Sheet metrics.
  ⚠️ _d2:mikeworldwide — MikeWorldWide_ — “$57M fee income” and “230+ staff” are not listed in the Fact Sheet; it describes the company as an independent integrated communications firm. — locations: body — count: 1 — fix: Verify fee-income and staff figures.
  ⚠️ _d2:every.io — Every.io_ — “$32M raised” is not in the Fact Sheet, which states “$32M Series A”; payroll processed, tax penalties and the award are not verified there. — locations: body — count: 1 — fix: Verify the figures and award, and preserve the funding-stage detail if confirmed.
  ⚠️ _d2:sydecar — Sydecar_ — “$3B+ AUA” conflicts with Fact Sheet “$1B+ assets under administration”; “107% YoY revenue growth” is not listed. — locations: body — count: 1 — fix: Correct the assets-under-administration figure and verify revenue growth.
  ⚠️ _d2:bonusly — Bonusly_ — “$32.4M raised” is not in the Fact Sheet, which states “$20M Series B”; “3,400+ clients” is not listed. — locations: body — count: 1 — fix: Verify the funding and client-count figures against approved sources.
  ⚠️ _d2:alchemy health — Alchemy Health_ — “$31M seed” conflicts with the Fact Sheet’s “$32M raised”; “25M+ prescriptions” is listed, while the investor claim is not. — locations: body — count: 1 — fix: Correct the funding figure and verify the stage and investor claim.
  ✅ _d2:canopy — Canopy_ — “Series F · $236.5M raised” matches the Fact Sheet; “#1 rated accounting SaaS” is an unsubstantiated ranking but is not a metric specified there. — locations: body — count: 1 — fix: Verify the comparative ranking claim.
❌ **D3** Clients not in the Fact Sheet — evidence: The page presents “NOVILAB” as “An active GoGloby Applied AI Engineering engagement”; NOVILAB is not in the Fact Sheet. — locations: body, image_alt — count: 25 — fix: Remove or verify client representations for companies not listed as clients in the Fact Sheet. — source: GoGloby Fact Sheet: Featured clients, External recognition
  ✅ _client_card:who uses it_ — “WHO USES IT Trusted by Enterprise Software Teams Managing AI Engineering at Scale” is a section heading, not a company. — locations: body — count: 1
  ✅ _client_card:dr. chrono 17m_ — “DR. CHRONO” is an alias for Fact Sheet client DrChrono. — locations: body — count: 1
  ✅ _client_card:evercommerce_ — “EVERCOMMERCE” is Fact Sheet client EverCommerce. — locations: body — count: 1
  ✅ _client_card:keywords_ — “KEYWORDS” identifies Fact Sheet client Keywords Studios. — locations: body — count: 1
  ✅ _client_card:eqt_ — “EQT” appears in “$2.8B EQT acquisition”; it is an acquisition reference, not presented as a GoGloby client. — locations: body — count: 1
  ✅ _client_card:tata_ — “TATA” is identified as a Fact Sheet client; decisions.md confirms the listing is correct. — locations: body — count: 1
  ✅ _client_card:canopy_ — “CANOPY” is Fact Sheet client Canopy. — locations: body — count: 1
  ✅ _client_card:sydecar_ — “SYDECAR” is Fact Sheet client Sydecar. — locations: body — count: 1
  ❌ _client_card:novilab_ — “NOVILAB … An active GoGloby Applied AI Engineering engagement”; NOVILAB is not a Fact Sheet client. — locations: body — count: 1 — fix: Remove or verify the client claim.
  ✅ _client_card:bonusly_ — “BONUSLY” is Fact Sheet client Bonusly. — locations: body — count: 1
  ✅ _client_card:every_ — “EVERY” is an alias for Fact Sheet client Every.io. — locations: body — count: 1
  ✅ _client_card:alchemy_ — “ALCHEMY” identifies Fact Sheet client Alchemy Health. — locations: body — count: 1
  ✅ _client_card:devsisters_ — “DEVSISTERS” is Fact Sheet client Devsisters. — locations: body — count: 1
  ✅ _logo_image:background_ — Image alt is “Background”; this is not a company/client. — locations: image_alt — count: 1
  ✅ _logo_image:anthropic_ — “Anthropic” appears as a tool/vendor logo, not as a GoGloby client claim. — locations: image_alt — count: 1
  ✅ _logo_image:nvidia_ — “Nvidia” appears as a vendor logo, not as a GoGloby client claim. — locations: image_alt — count: 1
  ✅ _logo_image:augment code_ — “Augment Code” appears as a tool/vendor logo, not as a GoGloby client claim. — locations: image_alt — count: 1
  ✅ _logo_image:snowflake_ — “Snowflake” appears as a vendor logo, not as a GoGloby client claim. — locations: image_alt — count: 1
  ✅ _logo_image:cursor_ — “Cursor” appears as a tool/vendor logo, not as a GoGloby client claim. — locations: image_alt — count: 1
  ✅ _logo_image:gemini_ — “Gemini” appears as a tool/vendor logo, not as a GoGloby client claim. — locations: image_alt — count: 1
  ✅ _text_cue:hasbro_ — “HASBRO … A GoGloby Applied AI Engineering client” identifies Fact Sheet client Hasbro. — locations: body — count: 1
  ✅ _text_cue:nyse_ — “NYSE” is a stock-exchange reference in the Hasbro card, not a client. — locations: body — count: 1
  ✅ _text_cue:nfl_ — “NFL” appears in MikeWorldWide’s client roster, not as a GoGloby client. — locations: body — count: 1
  ✅ _text_cue:wnba_ — “WNBA” appears in MikeWorldWide’s client roster, not as a GoGloby client. — locations: body — count: 1
  ✅ _text_cue:every_ — “EVERY” is an alias for Fact Sheet client Every.io. — locations: body — count: 1
➖ **D4** Press and partners — evidence: The supplied main-content text ends with “We follow data & security practices:” and contains no identifiable press, partner, or award claims to compare. — locations: body — count: 0 — source: GoGloby Fact Sheet: External recognition

## E. Positioning

❌ **E1** Service fit — value: contradicts — evidence: AI Cost Management and Engineering Visibility Solution | forward-deployed engineers work inside your team — locations: title, h1, body — fix: Reassess the page’s purpose and service alignment; it presents an AI product/solution and implementation, not the approved recruiting or staffing services. — source: decisions.md: Service pages; GoGloby Fact Sheet: Services; GoGloby Glossary §2
❌ **E2** Positioning — evidence: AI Cost Management and Engineering Visibility Solution | WHAT WE BUILT Enterprise AI Cost Management Dashboard — locations: title, h1, body — fix: Reassess the page’s presentation of GoGloby as an AI product/solution provider against the approved company description and exclusions. — source: decisions.md: Company description; GoGloby Fact Sheet: Identity, What GoGloby is not
❌ **E3** Call to action — evidence: Get Your AI Cost Benchmark | Schedule a Technical Briefing — locations: body — count: 2 — fix: Review the page CTAs against the service-specific CTA requirements; the page has no recruiting or staffing service CTA and uses Benchmark as a CTA. — source: GoGloby Glossary §7
❌ **E4** Lead order — evidence: See, govern, and predict the cost of AI engineering. | First numbers in one week. — locations: first_paragraph, body — fix: Reorder the opening to lead with the hire and applicable service, then present supporting proof, assessment, guarantees, and the Intelligence Layer. — source: GoGloby Glossary §9

## F. GEO

✅ **F1** Answer first — evidence: Sentence 1: “See, govern, and predict the cost of AI engineering.” | Sentence 2: “Every token, model call, PR, and shipped feature tied to dollars, teams, and ROI against your own baseline.” — locations: first_paragraph — count: 2 — source: Checks for LLM call 3: F1
❌ **F2** Buyer problem — evidence: The page opens with “See, govern, and predict the cost of AI engineering,” rather than one of the buyer problems in Glossary §1. — locations: first_paragraph — count: 0 — fix: Open with one of the buyer problems listed in Glossary §1. — source: Glossary §1, “The three problems buyers bring us”
➖ **F3** Recruiting firm stated early — evidence: The page presents an “AI Cost Management” solution, not a recruiting service. — locations: h1, body — source: Checks for LLM call 3: F3
❌ **F4** GoGloby named near claims — evidence: The opening claim says “See, govern, and predict” without naming GoGloby. | The page says “Only GoGloby prices shipped features,” but many other product claims use “we,” such as “We built the AI Intelligence Layer.” — locations: first_paragraph, body — fix: Review key claims so quoted fragments identify GoGloby by name. — source: Checks for LLM call 3: F4; Glossary §9, “Aim for the answers that name companies”
✅ **F5** FAQ — evidence: “How long until we see numbers? First numbers in one week” | “Does our code or telemetry leave our environment? No.” — locations: body — source: Checks for LLM call 3: F5
❌ **F6** Audience — value: not_targeted — evidence: The page targets “CTOs, VPs of Engineering, platform leaders, and finance leaders” for AI cost management software, rather than buyers seeking GoGloby’s staffing or recruiting services. — locations: body — fix: Align the page audience with the buyer and services described in the approved positioning, or obtain a decision on this separate offering. — source: Glossary §5, “Who we do not target”; Glossary §9, “Write only for buyers who are ready to hire”

## G. Target keyword

⚠️ **G1** Target keyword — value: none — evidence: The title is “AI Cost Management and Engineering Visibility Solution”; Glossary §6 lists staffing and recruiting terms, not this product phrase. — locations: title — fix: Review the target keyword against Glossary §6; no matching term is evident for this page. — source: Glossary §6, “Terms we use”
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
✅ **G3** Trap terms in title or H1 — evidence: The title and H1 use “AI Cost Management and Engineering Visibility Solution”; neither contains a trap term listed in Glossary §8. — locations: title, h1 — count: 0 — source: Glossary §8, “Trap terms”
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

ℹ️ **H1** Action — value: needs_decision — evidence: The page offers a separate “AI Cost Management” solution and says “Get Your AI Cost Benchmark.” | The Fact Sheet says the AI Development Intelligence Layer is “Sold only bundled with nearshore staffing, never separately.” — locations: h1, body — fix: Confirm whether this separate product offering is approved before deciding the page’s long-term action. — source: Fact Sheet, Services, note on “AI Development Intelligence Layer”; Glossary §2, “The AI Development Intelligence Layer”
ℹ️ **H2** Priority — value: high — evidence: The page promotes a “FREE BENCHMARK” and claims “First numbers in one week,” while the approved service description says the Intelligence Layer is bundled with nearshore staffing and never sold separately. — locations: body — fix: Resolve the offering and positioning conflict promptly. — source: Fact Sheet, Services, note on “AI Development Intelligence Layer”; Glossary §2, “The AI Development Intelligence Layer”
ℹ️ **H3** Reasons — value: F2: The opening does not lead with a buyer problem; F4: Key claims often use “we” rather than naming GoGloby; F6: The page targets a standalone software purchase rather than GoGloby’s staffing or recruiting buyers; H1: The page’s separate product positioning conflicts with approved bundling — evidence: Opening: “See, govern, and predict the cost of AI engineering.” | Offer: “Get Your AI Cost Benchmark”; approved note: “Sold only bundled with nearshore staffing, never separately.” — locations: first_paragraph, body — fix: Address the cited audience, attribution, and offering-alignment issues. — source: Checks for LLM call 3: F2, F4, F6, H1; Fact Sheet, Services, note on “AI Development Intelligence Layer”; Glossary §9
