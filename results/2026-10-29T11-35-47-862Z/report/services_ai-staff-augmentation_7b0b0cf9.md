# Page report

- **URL:** https://gogloby.com/services/ai-staff-augmentation/
- **Type:** service
- **Action:** rewrite
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
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
⚠️ **A10** Image alt text — evidence: 21 images without alt — locations: image_alt — count: 21 — fix: Add alt text to main content images. — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Service, FAQPage — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization says legalName “Gogloby LLC”; source says “GoGloby LLC”. | Organization slogan is “Applied AI Engineering Partner”; source description is “GoGloby is a staffing and recruiting agency specializing in hiring Data & AI Engineers.” | Organization description says “talent acquisition agency”; the approved description is “staffing and recruiting agency”. | Organization sameAs includes G2, Trustpilot, DesignRush and YouTube; Fact Sheet marks G2 and YouTube unavailable and does not verify Trustpilot or DesignRush. — locations: schema — count: 4 — fix: Correct the legal name, slogan and description to match the approved company identity. Remove or verify profile URLs that conflict with the official-profile source. — source: decisions.md: Company description; Fact Sheet: Identity; Fact Sheet: Official profiles (sameAs)
✅ **B3** Person data — evidence: Person nodes are embedded as Organization founders: “Sergey Matikaynen” and “Vit Koval”; their job titles match the decisions, with “&” normalized to “and”. — locations: schema — count: 2 — source: decisions.md: Founders
⚠️ **B4** Schema matches the page — evidence: Organization schema includes “reviewCount”: 4.9, but the source states “4.9 / 5 from 10 reviews”. — locations: schema — count: 1 — fix: Verify the review-count value against the source before publishing the rating markup. — source: Fact Sheet: What clients say

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: ed feature from the AI Intelligence Layer, grounded in what a | Applied AI Engineering partner: A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS — locations: body — count: 7 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: The page says “GoGloby is an Applied AI Engineering partner”; the approved description identifies GoGloby as a “staffing and recruiting agency”. | Benchmark: ill walk you through the Benchmark, what your features cost | Claude Certified Architect: Forward-deploy vetted Claude Certified Architects and Applied AI Engineer | AI Solutions Architect: de Certified Architects, AI Solutions Architects, and Applied AI Enginee | Forward-Deployed Engineering: How Forward-Deployed Engineering Works | Agentic SDLC: one arrives on the same Agentic SDLC, so architectural contex — locations: body — count: 1 — fix: Remove the disallowed company-positioning phrase and align the company description with the approved description. — source: decisions.md: Company description; Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: The page says “The Layer makes that call” and “the AI Intelligence Layer deploys in your VPC”; the source names it the “AI Development Intelligence Layer” and says it uses metadata with “no source-code access”. — locations: body, schema — count: 2 — fix: Use the current product name and remove claims about VPC deployment unless verified against the source. — source: Fact Sheet: Services; Glossary §2; Glossary §7
❌ **D2** Client figures — evidence: Hasbro: page says “$4.7B revenue”; Fact Sheet says “~$5B revenue”. | DrChrono: page says “17M+ patients” and “$3B+ medical claims annually”; Fact Sheet says “17M+ patients” and “$3B in medical claims processed”. | EverCommerce: page says “700,000+ business clients”; Fact Sheet says “700K+ clients” (not a clear conflict), but page’s “$1.98B market cap” is not verified in the Fact Sheet. | Keywords Studios: page says “$844M revenue” and “13,000 employees”; Fact Sheet says “~$879M revenue” and “12,000+ employees”. | TATA: page says “$106B market cap”; Fact Sheet says “~$30B revenue” and does not verify market capitalization. | Sydecar: page says “$3B+ AUA”; Fact Sheet says “$1B+ assets under administration”. | Bonusly: page says “$32.4M raised”; Fact Sheet says “$20M Series B”. | Alchemy Health: page says “$31M seed”; Fact Sheet says “$32M raised”. | Devsisters: page says “200M+ users”; Fact Sheet says “200M+ players”. | Canopy: page says “Series F · $236.5M raised”; Fact Sheet confirms those figures. — locations: body — count: 9 — fix: Correct conflicting client metrics to the Fact Sheet values. Remove or verify page metrics that are not stated in the Fact Sheet before retaining them. — source: Fact Sheet: Featured clients; Fact Sheet: Ideal Customer Profile; Fact Sheet: Key metrics
❌ **D3** Clients not in the Fact Sheet — evidence: The page presents a client card for “NOVILAB”; it is absent from the Fact Sheet client list. — locations: h2, h2, body — count: 1 — fix: Remove the Novilab client card or verify its client status with the company. TATA is not flagged: decisions.md confirms its client listing is correct. — source: decisions.md: Clients; Fact Sheet: Selected clients; Fact Sheet: Featured clients
❌ **D4** Press and partners — evidence: The page says “Vetted Profiles In 3 To 5 Business Days”; the Fact Sheet states “2–3 weeks to start” for the staffing service. | The page promises “First validated feature in 3 to 5 business days”; no such timing appears in the source. — locations: h2, body — count: 2 — fix: Remove or verify the unsupported delivery-time claims and distinguish profile delivery from engineer start time. — source: Fact Sheet: Services

## E. Positioning

✅ **E1** Service fit — evidence: staffing — locations: h1, body — count: 1 — fix: The page describes embedded engineers, a flat monthly fee and client direction, which fit staffing. Align the service terminology with the official service name. — source: decisions.md: Service pages; Fact Sheet: Services
❌ **E2** Positioning — evidence: The service page labels the offer “AI Staff Augmentation”; the official service name is “Nearshore Data & AI Engineers Staffing”. — locations: title, h1, body, schema — count: 1 — fix: Use the official service name and service positioning consistently on the page. — source: decisions.md: Spelling; decisions.md: Service pages; Fact Sheet: Services
❌ **E3** Call to action — evidence: The page repeatedly describes “Claude Certified Architects” and “AI Solutions Architects”; the source lists roles such as “AI, Applied AI, GenAI, LLM and Agentic AI Engineers” and says the restricted terms should not be used as an offer. — locations: meta, h2, body — count: 2 — fix: Remove restricted offer/positioning terms and align named roles with the approved service role list. — source: Fact Sheet: Services; Glossary §7
❌ **E4** Lead order — evidence: The page says “Every engagement starts with the Benchmark”; the source says not to use “Benchmark” as the main call to action. — locations: body — count: 3 — fix: Remove the Benchmark-led CTA and check all occurrences of the term against the approved CTA guidance. — source: Glossary §7

## F. GEO

❌ **F1** Answer first — evidence: The page claims “No minimum term”; the source says staffing clients can cancel “any time in the first 120 days” and does not establish no minimum term. — locations: body — count: 1 — fix: Remove or verify the no-minimum-term claim. — source: Fact Sheet: Services; Glossary §2
❌ **F2** Buyer problem — evidence: The page says “Your codebase stays in your own cloud” and the FAQ claims code “never leaves your environment”; the source specifies work in the client’s environment and metadata-only telemetry, not the stated cloud architecture. — locations: body — count: 2 — fix: Remove or substantiate the specific cloud and code-location claims; retain only source-supported security statements. — source: Fact Sheet: Legal and security; Fact Sheet: Services
❌ **F3** Recruiting firm stated early — evidence: The page promises “$3M combined liability (cyber, data and professional)”; the Fact Sheet specifies “$3M data and cyber liability”. — locations: h2, body, schema — count: 1 — fix: Align the insurance description with the Fact Sheet and remove the unverified professional-liability component. — source: Fact Sheet: Services; Fact Sheet: Legal and security
❌ **F4** GoGloby named near claims — evidence: The page claims a “120-Day Performance Guarantee” judged by a “baseline for 2 consecutive sprints”; the source specifies replacement if results fall below baseline and cancellation during the first 120 days, without the two-sprint condition. — locations: h2, body — count: 1 — fix: Use only the documented replacement and cancellation terms; remove the unsupported condition. — source: Fact Sheet: Services
❌ **F5** FAQ — evidence: The page says “Only 4% of our curated outbound pipeline passes”; the Fact Sheet says “Approximately 4% of candidates pass” the assessment. — locations: body — count: 1 — fix: Use the sourced candidate-pass-rate framing and remove unsupported distinctions about the outbound pipeline. — source: Fact Sheet: How we vet; Fact Sheet: Key metrics
❌ **F6** Audience — evidence: not_targeted — locations: title, h1, body — count: 1 — fix: The page is primarily framed around Claude-specific architecture and putting Claude into production rather than the source-defined buyer need for nearshore Data & AI Engineers Staffing. Reorient to the intended hiring buyer and service. — source: Glossary §9; Fact Sheet: Services

## G. Target keyword

❌ **G1** Target keyword — evidence: none — locations: title, meta, h1 — count: 0 — fix: The supplied targetKeyword is null. Select the approved primary phrase for this staffing service and align title, H1 and page content to it. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: The page’s H1 is “AI Staff Augmentation for Business-Critical Software”; the approved service is “Nearshore Data & AI Engineers Staffing”. — locations: h1 — count: 1 — fix: Align the H1 with the approved service and buyer intent. — source: decisions.md: Spelling; decisions.md: Service pages; Glossary §6
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: rewrite — locations: h1 — count: 1 — fix: Rewrite the H1 to reflect the approved nearshore staffing service and its Data & AI Engineer focus; the current heading is centered on generic AI staff augmentation. — source: decisions.md: Service pages; Fact Sheet: Services
✅ **H2** Priority — evidence: high — locations: h2 — count: 8 — fix: High priority because the page’s headings repeatedly position the offer around Claude and forward-deployed engineering instead of the approved staffing service; review and align the H2s with the source-defined service and buyer. — source: decisions.md: Service pages; Glossary §9
✅ **H3** Reasons — evidence: High number of off-source client cards: “NOVILAB” is not in the client list (D3). | Multiple card metrics conflict with or are unsupported by the Fact Sheet: “$4.7B revenue” and “$3B+ medical claims annually” are examples (D2). | H3s and page content promote a different offer: “Claude Certified Architect” (E3). — locations: h2, body — count: 3 — fix: Review client-card names and figures against the Fact Sheet, then align card framing with the approved service. — source: Fact Sheet: Featured clients; decisions.md: Service pages; Glossary §7
