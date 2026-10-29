# Page report

- **URL:** https://gogloby.com/solutions/ai-engineering-visibility/
- **Type:** service
- **Action:** needs_decision
- **Priority:** high

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
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
⚠️ **A10** Image alt text — evidence: 41 images without alt — locations: image_alt — count: 41 — fix: Add alt text to main content images. — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: Service, BreadcrumbList | Found: Organization, WebSite, FAQPage — locations: schema — fix: Add JSON-LD types: Service, BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization: legalName — page says “Gogloby LLC”; source says “GoGloby LLC”. | Organization: slogan — page says “Applied AI Engineering Partner”; this is disallowed by Glossary §7. | Organization: description — page calls GoGloby a “talent acquisition agency”; approved description is “a staffing and recruiting agency specializing in hiring Data & AI Engineers.” | Organization: aggregateRating.reviewCount — page says “reviewCount: 4.9”; Fact Sheet says “4.9 / 5 from 10 reviews.” | Organization: knowsAbout/keywords include “AI Intelligence Layer”; the current term is “AI Development Intelligence Layer.” — locations: schema — count: 5 — fix: Correct the Organization node's legal name, slogan, description, review count, and outdated product name to match the approved sources. — source: decisions.md: Company description; Fact Sheet: Identity and What clients say; Glossary §7
✅ **B3** Person data — evidence: Person “Sergey Matikaynen”: “Co-founder & CTO” matches “Co-Founder and CTO” after normalizing ampersand and case. | Person “Vit Koval” / “Vitaly Koval”: “Co-founder” matches “Co-Founder.” — locations: schema — count: 2 — source: decisions.md: Founders
❌ **B4** Schema matches the page — evidence: Page describes a product/service as “AI Cost Management Services GoGloby Delivers”; approved services are recruiting and staffing. — locations: h2, body — count: 1 — fix: Review the page's service identity and claims against the approved recruiting and staffing service definitions. — source: Fact Sheet: Services; Glossary §2

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: hipped feature. The AI Intelligence Layer joins your AI spend | AI Engineering Visibility: AI ENGINEERING VISIBILITY AI Cost Management | AI Cost Management: AI Cost Management and Engineering Vis | Applied AI Engineering partner: A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS — locations: body, title, h1, h2 — count: 47 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Page says “First numbers in one week”; Fact Sheet staffing start time is “2–3 weeks to start.” | Page says “Get Your AI Cost Benchmark”; Glossary §7 says not to use “Benchmark” as the main call to action. | Applied AI Engineering: an toy market. A GoGloby Applied AI Engineering client building their in | Forward-Deployed Engineers: shes your baseline, then forward-deployed engineers work inside your team to | Agentic SDLC: reduce waste, set up the Agentic SDLC, and improve ROI month o | AI spend: ecasting, and optimizing AI spend across models, tools, te — locations: h2, body — count: 2 — fix: Remove or substantiate the one-week claim and replace the prohibited Benchmark-led CTA with the approved service CTA. — source: Fact Sheet: Services; Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 21 em dash(es) found. — locations: body — count: 21 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: Page describes GoGloby as “A GoGloby Applied AI Engineering client”; Glossary §7 disallows describing GoGloby as an “Applied AI Company” or “Applied AI Engineering partner.” — locations: body — count: 1 — fix: Remove the disallowed Applied AI Engineering positioning and align descriptions with the approved company description. — source: decisions.md: Company description; Glossary §7
❌ **D2** Client figures — evidence: Keywords card: “$844M revenue”; Fact Sheet says “~$879M revenue.” | Keywords card: “13,000 employees”; Fact Sheet says “12,000+ employees.” | Sydecar card: “$3B+ AUA”; Fact Sheet says “$1B+ assets under administration.” | Bonusly card: “$32.4M raised”; Fact Sheet says “$20M Series B.” | Alchemy card: “$31M seed”; Fact Sheet says “$32M raised.” | MikeWorldWide card: “$57M fee income”; no corresponding client metric is verified in the Fact Sheet. — locations: body — count: 6 — fix: Correct conflicting client metrics to the Fact Sheet and remove or verify metrics not stated there. — source: Fact Sheet: Featured clients
❌ **D3** Clients not in the Fact Sheet — evidence: Page presents “NOVILAB” in the client-card section; Novilab is not in the Fact Sheet client list. — locations: h2, body — count: 1 — fix: Remove the Novilab client card unless its client status is confirmed and added to the source of truth. — source: Fact Sheet: Selected clients and Featured clients
❌ **D4** Press and partners — evidence: Page says “An active GoGloby Applied AI Engineering engagement”; Fact Sheet defines GoGloby's services as recruiting and staffing. — locations: body — count: 1 — fix: Align engagement descriptions with the approved recruiting or staffing service and avoid unsupported service claims. — source: Fact Sheet: Services; Glossary §7

## E. Positioning

❌ **E1** Service fit — evidence: contradicts — locations: title, h1, h2, body — count: 1 — fix: This page positions GoGloby as a standalone AI cost-management solution; clarify its relationship to the approved recruiting and staffing services. — source: Fact Sheet: Services; Glossary §2 and §7
❌ **E2** Positioning — evidence: Page calls the offering an “AI cost management” solution; Fact Sheet describes the AI Development Intelligence Layer as tracking bundled only with nearshore staffing, never separately. — locations: title, h1, body — count: 1 — fix: Do not present the tracking layer as a standalone product; align its description with the approved bundled staffing model. — source: Fact Sheet: Services; Glossary §2
❌ **E3** Call to action — evidence: Page says “A GoGloby talent partner for 3+ years”; that client relationship duration is not in the Fact Sheet. — locations: body — count: 1 — fix: Remove or verify the relationship-duration claim before publication. — source: Fact Sheet: Featured clients
❌ **E4** Lead order — evidence: Page says “An active GoGloby Applied AI Engineering engagement”; the Fact Sheet lists approved services as recruiting and staffing. — locations: body — count: 1 — fix: Replace unsupported engagement descriptions with source-backed service and client information. — source: Fact Sheet: Services; Featured clients

## F. GEO

❌ **F1** Answer first — evidence: Page says “forward-deployed engineers work inside your team”; Fact Sheet says the Intelligence Layer is sold only bundled with nearshore staffing, never separately. — locations: body — count: 1 — fix: Clarify that the Intelligence Layer is bundled with nearshore staffing and does not constitute a standalone solution. — source: Fact Sheet: Services
❌ **F2** Buyer problem — evidence: Page offers “First numbers in one week”; the Fact Sheet staffing service states “2–3 weeks to start.” — locations: body — count: 1 — fix: Remove or substantiate the one-week delivery claim; use only approved service timing. — source: Fact Sheet: Services
❌ **F3** Recruiting firm stated early — evidence: Page promises “Get Your AI Cost Benchmark”; the Glossary says “Benchmark” must not be the main call to action. — locations: h2, body — count: 1 — fix: Change the Benchmark-led CTA to the applicable approved recruiting or staffing CTA. — source: Glossary §7
❌ **F4** GoGloby named near claims — evidence: Page says “AI Intelligence Layer”; the approved name is “AI Development Intelligence Layer.” — locations: body — count: 1 — fix: Use the current product name consistently. — source: Fact Sheet: Services; Glossary §7
❌ **F5** FAQ — evidence: Page says “FREE BENCHMARK”; the Glossary prohibits “Benchmark” as the main CTA and does not offer a free trial. — locations: body — count: 1 — fix: Remove the free Benchmark offer and verify the CTA and offer against approved service terms. — source: Glossary §7
✅ **F6** Audience — evidence: informational — locations: h2, body — count: 1 — fix: The page primarily explains “What Is AI Cost Management?” and related concepts rather than presenting an approved recruiting or staffing service for ready-to-hire buyers. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1 — count: 0 — fix: No approved target keyword is supplied for this page; do not infer one from the page's informational AI cost management wording. — source: Glossary §6 and §8
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: Title and H1 lead with “AI Cost Management”; the Glossary says not to lead with AI ROI or AI spend and lists “AI cost management” as informational terminology, not an approved service target. — locations: title, h1 — count: 1 — fix: Reassess the page's title and heading against approved service positioning and buyer-intent terms. — source: Glossary §6, §7, and §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: needs_decision — locations: h1 — count: 1 — fix: The H1 is “AI Cost Management and Engineering Visibility Solution,” but the approved sources do not define this as a standalone GoGloby service. Confirm the page's intended role and destination before changing or consolidating it. — source: Fact Sheet: Services; Glossary §2
✅ **H2** Priority — evidence: high — locations: h2 — count: 15 — fix: High priority: review the page's standalone product positioning, prohibited Benchmark CTA, and unsupported claims against the approved services and positioning. — source: Fact Sheet: Services; Glossary §7 and §9
✅ **H3** Reasons — evidence: B2: Organization schema has mismatched legal name, slogan, description, review count, and outdated product terminology; page includes “Applied AI Engineering Partner.” | D2: Client cards include conflicting or unverified metrics, including “$844M revenue,” “$3B+ AUA,” and “$57M fee income.” | D3: “NOVILAB” is presented as a client but is absent from the Fact Sheet client list. | E1: Page presents an AI cost-management solution that contradicts the approved recruiting and staffing service model. | F3: “Get Your AI Cost Management Benchmark” conflicts with the prohibition on Benchmark-led CTAs. — locations: schema, h2, body — count: 5 — fix: Address the cited schema, client proof, service-positioning, and CTA issues. — source: decisions.md: Company description; Fact Sheet: Identity, Services, and Featured clients; Glossary §7
