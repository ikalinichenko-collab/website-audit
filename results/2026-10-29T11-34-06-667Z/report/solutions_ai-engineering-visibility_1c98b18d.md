# Page report

- **URL:** https://gogloby.com/solutions/ai-engineering-visibility/
- **Type:** service
- **Action:** noindex
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
❌ **B2** Organization data — evidence: Organization legalName: “Gogloby LLC” conflicts with “GoGloby LLC”; slogan: “Applied AI Engineering Partner” conflicts with the approved company description; description describes a “talent acquisition agency” rather than a staffing and recruiting agency specializing in hiring Data & AI Engineers. | Organization offer catalog includes “Generative AI Development Services” and “Applied AI Engineering,” inconsistent with the stated recruiting and staffing services. — locations: schema — count: 1 — fix: Align the Organization fields and service catalog with the approved legal name, company description, and services. Remove or correct claims that present GoGloby as an engineering or software development provider. — source: decisions.md: Company description; Fact Sheet: Identity and Services; Glossary §7
✅ **B3** Person data — evidence: Sergey: page schema says “Co-founder & CTO”; source says “Co-Founder and CTO.” Job title matches after normalizing &/and and case. | Vitaly: page schema says “Co-founder”; source says “Co-Founder.” Job title matches after case normalization. — locations: schema — count: 2 — source: decisions.md: Founders
❌ **B4** Schema matches the page — evidence: The schema describes GoGloby as an “Applied AI Engineering Partner,” while the approved description identifies a staffing and recruiting agency. — locations: schema — count: 1 — fix: Correct schema claims that position GoGloby as an engineering or software development provider. — source: decisions.md: Company description; Fact Sheet: Identity

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: hipped feature. The AI Intelligence Layer joins your AI spend | AI Engineering Visibility: AI ENGINEERING VISIBILITY AI Cost Management | AI Cost Management: AI Cost Management and Engineering Vis | Applied AI Engineering partner: A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS — locations: body, title, h1, h2 — count: 47 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: The page calls the offering “AI Cost Management Services GoGloby Delivers,” presenting a standalone service not included in the approved service list. | The page uses “Applied AI Engineering” to describe client engagements, a positioning phrase the Glossary says not to use. | Benchmark: Your AI Cost Management Benchmark | Forward-Deployed Engineers: shes your baseline, then forward-deployed engineers work inside your team to | Agentic SDLC: reduce waste, set up the Agentic SDLC, and improve ROI month o | AI spend: ecasting, and optimizing AI spend across models, tools, te — locations: body, h2, schema — count: 2 — fix: Remove or correct claims that present standalone AI cost management or Applied AI Engineering as a GoGloby service or positioning. — source: Fact Sheet: Services; Glossary §§2, 7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 21 em dash(es) found. — locations: body — count: 21 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: The page claims “First numbers in one week” and “a one-week” benchmark, but the Fact Sheet only describes the Intelligence Layer as included with nearshore staffing and reports sprint-by-sprint; it does not substantiate a standalone benchmark. — locations: body, h2 — count: 1 — fix: Remove or substantiate the unverified standalone offer and its delivery-time claims. — source: Fact Sheet: Services; Glossary §2
❌ **D2** Client figures — evidence: Page: Hasbro “$4.7B revenue”; Fact Sheet: “~$5B revenue.” | Page: DrChrono “17M+ patients” and “$3B+ medical claims annually”; Fact Sheet: “17M+ patients” and “$3B in medical claims processed.” | Page: EverCommerce “700,000+ business clients”; Fact Sheet: “700K+ clients.” The number aligns, but the page’s additional market-cap figure is not verified in the Fact Sheet. | Page: Keywords “$844M revenue” and “13,000 employees”; Fact Sheet: “~$879M revenue” and “12,000+ employees.” | Page: Canopy “Series F”; Fact Sheet: “Series F.” The page’s “#1 rated” claim is not verified in the Fact Sheet. | Page: Sydecar “$3B+ AUA”; Fact Sheet: “$1B+ assets under administration.” | Page: Bonusly “$32.4M raised”; Fact Sheet: “$20M Series B.” | Page: Alchemy Health “$31M seed”; Fact Sheet: “$32M raised.” | Page: Every.io “$32M raised”; Fact Sheet identifies Every.io as “YC-backed, $32M Series A”; this aligns. Other page claims such as “$60M+ payroll processed” are not verified in the Fact Sheet. | Page: Devsisters “200M+ users”; Fact Sheet: “200M+ players.” The number aligns, but “$299M market cap” is not verified in the Fact Sheet. | Page: MikeWorldWide “$57M fee income” and “230+ staff”; these metrics are not verified in the Fact Sheet. — locations: body, h2, h2 — count: 11 — fix: Correct conflicting client metrics to match the Fact Sheet. Remove or substantiate client metrics not verified there. — source: Fact Sheet: Featured clients; Fact Sheet: Ideal Customer Profile, Featured clients
❌ **D3** Clients not in the Fact Sheet — evidence: Client card: “NOVILAB” is presented as an active GoGloby engagement; Novilab is not in the Fact Sheet client list. — locations: body, h2 — count: 1 — fix: Remove or verify the Novilab client card. Other displayed client cards are listed in the Fact Sheet or covered by the TATA decision. — source: Fact Sheet: Selected clients; Fact Sheet: Featured clients
❌ **D4** Press and partners — evidence: The page says “First numbers in one week” and promotes a “FREE BENCHMARK”; neither offer is supported by the approved service descriptions. | The page claims “Every dollar resolves to a person” and that telemetry “never leaves the account”; the Fact Sheet instead specifies metadata-only, aggregated and anonymized telemetry. — locations: body, h2 — count: 2 — fix: Remove or substantiate the unsupported benchmark offer and revise telemetry claims to match the documented legal and security position. — source: Fact Sheet: Services; Fact Sheet: Legal and security; Glossary §§2, 7

## E. Positioning

❌ **E1** Service fit — evidence: contradicts — locations: title, h1, body, schema — count: 1 — fix: Reconcile the page’s standalone AI cost management product and engineering-delivery claims with GoGloby’s approved recruiting and staffing services. — source: Fact Sheet: Services; Glossary §§2, 7
❌ **E2** Positioning — evidence: The title and H1 lead with “AI Cost Management,” not a recruiting or staffing service. — locations: title, h1 — count: 1 — fix: Align the page’s stated purpose and service framing with an approved GoGloby service, or remove it from indexable service content. — source: Fact Sheet: Services; Glossary §§2, 9
❌ **E3** Call to action — evidence: The page promotes “Get Your AI Cost Management Benchmark,” despite the Glossary instruction not to use “Benchmark” as the main call to action. — locations: h2, body — count: 1 — fix: Remove the benchmark-led call to action and use only an approved service-appropriate action if the page remains. — source: Glossary §7
❌ **E4** Lead order — evidence: The page presents “AI Cost Management Services GoGloby Delivers,” but the approved catalog contains recruiting and staffing services, not this standalone service. — locations: h2, body — count: 1 — fix: Remove or reclassify the unapproved standalone service claims. — source: Fact Sheet: Services; Glossary §2

## F. GEO

❌ **F1** Answer first — evidence: The title says “AI Cost Management and Engineering Visibility Solution,” while the approved service names are recruiting and staffing services. — locations: title — count: 1 — fix: Align the title with an approved service or take the page out of indexable service content. — source: decisions.md: Service pages; Fact Sheet: Services
❌ **F2** Buyer problem — evidence: The meta description promises “feature-level attribution, model spend visibility, AI adoption tracking, and ROI proof,” which describes an unlisted standalone product. — locations: meta — count: 1 — fix: Remove unsupported standalone product and outcome claims from the description. — source: Fact Sheet: Services; Glossary §2
❌ **F3** Recruiting firm stated early — evidence: The H1 is “AI Cost Management and Engineering Visibility Solution,” not an approved recruiting or staffing service. — locations: h1 — count: 1 — fix: Align the H1 with an approved service or remove the page from indexable service content. — source: Fact Sheet: Services; Glossary §§2, 9
❌ **F4** GoGloby named near claims — evidence: The H2 “Get Your AI Cost Management Benchmark” leads with a benchmark rather than an approved service action. — locations: h2 — count: 1 — fix: Remove the benchmark-led heading and align the page hierarchy with an approved service, if applicable. — source: Glossary §7
❌ **F5** FAQ — evidence: The body says “forward-deployed engineers work inside your team to reduce waste” and that GoGloby “deploys engineers to fix” findings, framing GoGloby as an engineering delivery provider. — locations: body — count: 1 — fix: Remove claims that describe GoGloby as performing software engineering work; describe only supported recruiting or staffing services. — source: Fact Sheet: Identity, “What GoGloby is not”; Glossary §1
❌ **F6** Audience — evidence: not_targeted — locations: title, h1, body — count: 1 — fix: The page targets organizations seeking AI cost-management software or advisory services rather than buyers ready to hire GoGloby for recruiting or staffing. Reframe it around an approved hiring service or remove it from the targeted service set. — source: Glossary §§2, 9

## G. Target keyword

❌ **G1** Target keyword — evidence: none — locations: title, meta, h1, h2 — count: 1 — fix: The page targets AI cost management, which is not an approved target keyword for GoGloby’s recruiting or staffing services. Align the page with a relevant approved service keyword or remove it from the targeted service set. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: The body repeatedly uses the disallowed product name “AI Intelligence Layer”; approved name is “AI Development Intelligence Layer.” | The body calls it a benchmark and describes a standalone offer, while the Fact Sheet says the Intelligence Layer is sold only bundled with nearshore staffing. — locations: body, h2, schema — count: 2 — fix: Use the approved product name where the bundled staffing feature is referenced, and remove standalone-product claims. — source: Fact Sheet: Services; Glossary §§2, 7
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: noindex — locations: title, h1, body — count: 1 — fix: The page’s central offer is an unapproved standalone solution, not either approved GoGloby service. Do not keep it indexable as a service page unless the company confirms a service change. — source: decisions.md: Service pages; Fact Sheet: Services
✅ **H2** Priority — evidence: high — locations: title, meta, h1, h2, body, schema — count: 1 — fix: High priority because the page presents an unapproved standalone product, uses disallowed positioning and product terminology, and contains conflicting or unsupported client and offer claims. — source: Fact Sheet: Services; Glossary §§7, 9
✅ **H3** Reasons — evidence: The page presents a standalone solution rather than an approved recruiting or staffing service. (E1, E2, E4) | The title, meta description, and H1 target AI cost management rather than an approved hiring service. (F1, F2, F3, G1) | The page promotes a benchmark-led CTA prohibited by the writing guidance. (E3, F4) | Client metrics include conflicts with the Fact Sheet, and the Novilab card is not on the client list. (D2, D3) | The page uses the disallowed “AI Intelligence Layer” name and unsupported standalone-product claims. (G3, D4) — locations: title, meta, h1, h2, body, schema — count: 5 — fix: Address the cited service-fit, targeting, client-proof, and terminology issues before retaining the page as indexable service content. — source: Fact Sheet: Services and Featured clients; Glossary §§7, 9
