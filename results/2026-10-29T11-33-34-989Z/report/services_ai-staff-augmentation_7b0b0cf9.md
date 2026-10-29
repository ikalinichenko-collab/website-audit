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
❌ **B2** Organization data — evidence: Organization: legalName “Gogloby LLC” conflicts with “GoGloby LLC”; slogan “Applied AI Engineering Partner” conflicts with the approved description; description “US-based talent acquisition agency” conflicts with the approved description. | Organization: knowsAbout/keywords include “AI Intelligence Layer” and “Applied AI Engineering Partner”; sameAs includes G2, Trustpilot, DesignRush and YouTube profiles not confirmed as available in the Fact Sheet. | WebSite: description says “Applied AI Engineering partner”; it conflicts with the approved company description. | Organization offer catalog and Service nodes describe “Applied AI Engineering” and development services rather than the approved staffing/recruiting services. — locations: schema — count: 3 — fix: Align the Organization and WebSite descriptions, slogan, legal name, service catalog, and unverified profile links with the approved sources. Remove prohibited positioning and outdated product terminology. — source: decisions.md: Company description; Fact Sheet: Identity and Official profiles; Glossary §§2, 7
✅ **B3** Person data — evidence: Sergey jobTitle “Co-founder & CTO” matches “Co-Founder and CTO” after normalizing ampersand, case, and hyphenation. | Vit Koval jobTitle “Co-founder” matches the approved “Co-Founder”; alternateName is “Vitaly Koval”. — locations: schema — count: 2 — source: decisions.md: Founders
⚠️ **B4** Schema matches the page — evidence: Organization contactPoint lists “hr@gogloby.com”; the Fact Sheet lists “sales@gogloby.com” as the company email. — locations: schema — count: 1 — fix: Check whether the HR address is intended as a general company contact; use the sourced company contact where appropriate. — source: Fact Sheet: Identity

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: ed feature from the AI Intelligence Layer, grounded in what a | Applied AI Engineering partner: A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS — locations: body — count: 7 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Page says “GoGloby is an Applied AI Engineering partner”; the approved description is a staffing and recruiting agency specializing in hiring Data & AI Engineers. | Benchmark: ill walk you through the Benchmark, what your features cost | Claude Certified Architect: Forward-deploy vetted Claude Certified Architects and Applied AI Engineer | AI Solutions Architect: de Certified Architects, AI Solutions Architects, and Applied AI Enginee | Forward-Deployed Engineering: How Forward-Deployed Engineering Works | Agentic SDLC: one arrives on the same Agentic SDLC, so architectural contex — locations: body — count: 1 — fix: Align the page’s company description and positioning with the approved description; remove language that presents GoGloby as an engineering delivery partner. — source: decisions.md: Company description; Glossary §§1, 7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Page says candidates navigate a “100K+ line codebase”; the Fact Sheet assessment specifies a “50,000-line codebase.” | Page says each stage eliminates “60% to 70%” of candidates; the Fact Sheet specifies only that approximately 4% pass. — locations: body — count: 2 — fix: Correct the assessment details against the Fact Sheet and remove unsupported stage-by-stage elimination figures. — source: Fact Sheet: How we vet
❌ **D2** Client figures — evidence: Hasbro card: “$4.7B revenue” conflicts with Fact Sheet “~$5B revenue.” | DrChrono card: “17M+ patients” conflicts with “17M+ patients” only in scale wording? No conflict in patient count; “$3B+ medical claims annually” is not the Fact Sheet metric “$3B in medical claims processed.” | EverCommerce card: “700,000+ business clients” conflicts with Fact Sheet “700K+ clients” only in wording? No numerical conflict. | Keywords card: “$844M revenue” is not supported by the Fact Sheet featured-client entry. | MikeWorldWide card: “$57M fee income” is not supported by the Fact Sheet featured-client entry. | TATA card: “$106B market cap” is not supported by the Fact Sheet featured-client entry. — locations: body — count: 4 — fix: Correct the conflicting Hasbro figure and remove or verify the additional client metrics that are not supported by the Fact Sheet. — source: Fact Sheet: Featured clients
❌ **D3** Clients not in the Fact Sheet — evidence: Client card “NOVILAB” is not in the Fact Sheet client list. — locations: h2, body — count: 1 — fix: Remove or verify the Novilab client card. Other listed client cards are present in the Fact Sheet client list. — source: Fact Sheet: Featured clients; decisions.md: Clients
⚠️ **D4** Press and partners — evidence: FAQ says “fixed fee for one month”; the Fact Sheet does not list a paid Benchmark engagement. — locations: body — count: 1 — fix: Verify this offer and fee with the company before presenting it as a current service term. — source: Fact Sheet: Services; Glossary §7

## E. Positioning

❌ **E1** Service fit — evidence: contradicts — locations: title, meta, h1, body — count: 1 — fix: Reframe the page as the approved nearshore staffing service, not as Applied AI engineering delivery or a separate forward-deployed engineering offer. — source: decisions.md: Service pages; Fact Sheet: Services; Glossary §§2, 7
❌ **E2** Positioning — evidence: Page calls the service “AI Staff Augmentation”; the approved service name is “Nearshore Data & AI Engineers Staffing.” — locations: title, h1, body — count: 1 — fix: Use the official service name and clarify the senior Data & AI engineer staffing model. — source: decisions.md: Spelling; Fact Sheet: Services
❌ **E3** Call to action — evidence: Page describes “Claude Certified Architects” and “AI Solutions Architects”; the service roles in the Fact Sheet are senior Data & AI Engineers and listed engineering roles. — locations: meta, h2, body — count: 1 — fix: Remove positioning around unapproved roles and describe only the sourced staffing roles. — source: Fact Sheet: Services; Glossary §§3, 7
❌ **E4** Lead order — evidence: Page claims “Vetted Profiles In 3 To 5 Business Days”; the Fact Sheet says “2–3 weeks to start.” — locations: h2, body — count: 1 — fix: Remove or verify the profile-delivery timing and align service timing with the Fact Sheet. — source: Fact Sheet: Services

## F. GEO

❌ **F1** Answer first — evidence: Page says “first validated feature in 3 to 5 business days”; this performance claim is not in the Fact Sheet. — locations: body — count: 1 — fix: Remove or verify the unsupported delivery-time claim. — source: Fact Sheet: Services
❌ **F2** Buyer problem — evidence: Page says “median time to first production commit of 23 days”; this metric is not in the Fact Sheet. — locations: schema — count: 1 — fix: Remove or verify this unsupported metric. — source: Fact Sheet: Key metrics and Services
❌ **F3** Recruiting firm stated early — evidence: Page claims “120-day performance guarantee” triggered by “2 consecutive sprints”; the Fact Sheet describes replacement if results fall below baseline and cancellation during the first 120 days. — locations: body, schema — count: 1 — fix: Align the replacement and cancellation terms with the Fact Sheet; remove the unsupported two-sprint trigger. — source: Fact Sheet: Services
❌ **F4** GoGloby named near claims — evidence: Page says “$3M combined liability (cyber, data and professional)”; the Fact Sheet specifies “$3M data and cyber liability.” — locations: body, schema — count: 1 — fix: Use the sourced insurance description and remove the unsupported professional-liability characterization. — source: Fact Sheet: Services; Legal and security
❌ **F5** FAQ — evidence: Page says the Layer is “deployed in your VPC”; the Fact Sheet says telemetry is metadata-only, aggregated and anonymized, with no code or sensitive data transmitted. — locations: body — count: 1 — fix: Align the Intelligence Layer and data-handling claims with the Fact Sheet; remove unsupported deployment claims. — source: Fact Sheet: Services; Legal and security
❌ **F6** Audience — evidence: not_targeted — locations: title, meta, h1, body — count: 1 — fix: Refocus the page on companies ready to hire senior Data & AI Engineers through the approved staffing service, rather than promoting an Applied AI engineering delivery offer. — source: Glossary §9; Fact Sheet: Services

## G. Target keyword

❌ **G1** Target keyword — evidence: AI engineer staffing — locations: title, meta, h1 — count: 1 — fix: Use the target phrase in a buyer-ready context and pair general staffing terminology with AI engineers and Latin America as directed. — source: Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: Page uses the prohibited headline phrase “Claude Certified Architect”; the Glossary says not to use this as positioning or as an offer. — locations: meta, h2, body — count: 1 — fix: Remove prohibited positioning terms and keep those concepts out of the offer and headline. — source: Glossary §7
⚠️ **G4** Competing pages — evidence: https://gogloby.com/ — count: 1 — fix: Resolve keyword cannibalization across competing URLs. — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: rewrite — locations: h1 — count: 1 — fix: The H1 “AI Staff Augmentation for Business-Critical Software” does not use the official service name or identify Data & AI Engineers; rewrite it to match the approved service and buyer intent. — source: decisions.md: Spelling and Service pages; Glossary §6
✅ **H2** Priority — evidence: high — locations: h2 — count: 8 — fix: Prioritize replacing headings that promote Claude-specific engineering, Applied AI engineering, or Forward-Deployed Engineering as the offer with headings aligned to the approved nearshore staffing service. — source: decisions.md: Service pages; Glossary §§2, 7
✅ **H3** Reasons — evidence: C2: “Applied AI Engineering partner” conflicts with approved company positioning. | E2: “AI Staff Augmentation” is not the official service name. | E3: “Claude Certified Architect” is used as an offer. | D3: “NOVILAB” appears as an unlisted client card. | D1: “100K+ line codebase” conflicts with the 50,000-line assessment fact. — locations: h2, body — count: 5 — fix: Address the cited high-priority positioning, service-name, client-list, and factual issues. — source: decisions.md; Fact Sheet: Services, How we vet, Featured clients; Glossary §§2, 7
