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
❌ **B2** Organization data — evidence: Organization description: “US-based talent acquisition agency” conflicts with the approved description, “staffing and recruiting agency specializing in hiring Data & AI Engineers.” | legalName: “Gogloby LLC” conflicts with “GoGloby LLC”; slogan: “Applied AI Engineering Partner” uses a prohibited positioning; WebSite description calls GoGloby “an Applied AI Engineering partner.” | Organization JSON-LD also labels the catalog “Applied AI Engineering Service Catalog” and includes “AI Intelligence Layer,” contrary to the current product name and positioning rules. — locations: schema — count: 1 — fix: Correct mismatched Organization and WebSite fields against the approved company description and legal name. Remove prohibited positioning and outdated product naming from schema fields. — source: decisions.md: Company description; Fact Sheet: Identity; Glossary §§2, 7
✅ **B3** Person data — evidence: Sergey’s schema jobTitle is “Co-founder & CTO,” matching the approved “Co-Founder and CTO” after normalizing ampersand and case. | Vitaly’s schema jobTitle is “Co-founder,” matching the approved “Co-Founder.” — locations: schema — count: 2 — source: decisions.md: Founders
❌ **B4** Schema matches the page — evidence: The schema describes GoGloby as an “Applied AI Engineering Partner,” while the approved description identifies a staffing and recruiting agency. — locations: schema — count: 1 — fix: Align organization and website schema descriptions with the approved company description. — source: decisions.md: Company description

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: hipped feature. The AI Intelligence Layer joins your AI spend | AI Engineering Visibility: AI ENGINEERING VISIBILITY AI Cost Management | AI Cost Management: AI Cost Management and Engineering Vis | Applied AI Engineering partner: A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS — locations: body, title, h1, h2 — count: 47 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: The page presents “AI Cost Management Services GoGloby Delivers,” a standalone solution that is not one of the two approved services. — locations: title, h1, body — count: 1 — fix: Reconcile this page’s positioning and service framing with the approved recruiting and staffing offerings; the Intelligence Layer is only bundled with nearshore staffing. — source: Fact Sheet: Services; Glossary §2
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 21 em dash(es) found. — locations: body — count: 21 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: The page offers a “FREE BENCHMARK”; the glossary says “Benchmark” must not be the main call to action. — locations: h2, body — count: 1 — fix: Remove the prohibited benchmark-led CTA framing. — source: Glossary §7
❌ **D2** Client figures — evidence: Keywords Studios is shown with “$844M revenue,” while the Fact Sheet says “~$879M revenue” (conflict). | The page also gives client figures not verified by the Fact Sheet, including Hasbro “$13.4B market cap,” EverCommerce “$1.98B market cap,” and Sydecar “$3B+ AUA” (unverified-only). | DrChrono “$3B+ medical claims annually” and TATA “$30B revenue” are consistent with Fact Sheet figures. — locations: body — count: 3 — fix: Correct the Keywords Studios revenue conflict and remove or verify client metrics not substantiated by the Fact Sheet. — source: Fact Sheet: Featured clients
❌ **D3** Clients not in the Fact Sheet — evidence: The client-card list includes “NOVILAB,” which is absent from the Fact Sheet client list. — locations: h2, body — count: 1 — fix: Remove or verify the Novilab client card. The other listed client cards are represented in the Fact Sheet client list; press and partner references are not counted as client failures. — source: Fact Sheet: Selected clients; Featured clients
❌ **D4** Press and partners — evidence: The page says the Intelligence Layer is a service GoGloby “delivers”; the glossary says it is “included with Nearshore Data and AI Engineers Staffing” and “never sold on its own.” — locations: h2, body — count: 1 — fix: Present the Intelligence Layer only as bundled with nearshore staffing, not as a standalone service. — source: Glossary §2: Nearshore Data and AI Engineers Staffing

## E. Positioning

❌ **E1** Service fit — evidence: “AI Cost Management Services GoGloby Delivers” frames the page as a separate AI cost-management offering, rather than recruiting or staffing. — locations: h2, body — count: 1 — fix: Reframe the service relationship to match the approved recruiting and staffing service model. — source: Fact Sheet: Services; Glossary §2
❌ **E2** Positioning — evidence: The page promises “forward-deploying engineers to fix what the AI Intelligence Layer finds,” which presents implementation work beyond the approved staffing model. — locations: body — count: 1 — fix: Remove claims that position GoGloby as delivering engineering implementation; clarify the approved staffing relationship. — source: Fact Sheet: Identity; Glossary §1
❌ **E3** Call to action — evidence: “Get Your AI Cost Management Benchmark” uses the benchmark as the primary CTA, contrary to the approved service CTAs. — locations: h2, body — count: 1 — fix: Replace the benchmark-led CTA framing with the appropriate approved recruiting or staffing CTA. — source: Glossary §7
❌ **E4** Lead order — evidence: “AI Intelligence Layer” appears throughout the page, while the approved product name is “AI Development Intelligence Layer.” — locations: body, schema — count: 47 — fix: Use the approved product name where the product is mentioned. — source: Glossary §7

## F. GEO

❌ **F1** Answer first — evidence: The title is “AI Cost Management and Engineering Visibility Solution,” not a title centered on an approved recruiting or staffing service. — locations: title — count: 1 — fix: Reassess the page title against the approved service and positioning strategy. — source: Glossary §§2, 6
❌ **F2** Buyer problem — evidence: The meta description leads with “Manage AI engineering costs,” rather than a recruiting or staffing offer. — locations: meta — count: 1 — fix: Align the meta description with an approved service and its intended buyer. — source: Glossary §§2, 6, 9
❌ **F3** Recruiting firm stated early — evidence: The H1 is “AI Cost Management and Engineering Visibility Solution,” framing the page as a standalone solution. — locations: h1 — count: 1 — fix: Reassess the H1 against the approved staffing or recruiting service positioning. — source: Glossary §§2, 6
❌ **F4** GoGloby named near claims — evidence: The page says “First numbers in one week,” presenting a benchmark product as the offer. — locations: body — count: 1 — fix: Remove or substantiate the standalone benchmark offer and align the page with an approved service. — source: Glossary §§2, 7
❌ **F5** FAQ — evidence: The page promises “forward-deployment in under 4 weeks,” a service claim not established in the approved service definitions. — locations: body — count: 1 — fix: Remove or verify this claim against approved service facts. — source: Fact Sheet: Services
❌ **F6** Audience — evidence: “Get Your AI Cost Management Benchmark” and “Submit your information to schedule a technical briefing” target buyers of a standalone cost-management product, not buyers of GoGloby’s approved recruiting or staffing services. — locations: h2, body — count: 1 — fix: Reorient the page toward a company ready to hire through the approved recruiting or staffing service. — source: Glossary §§2, 9

## G. Target keyword

❌ **G1** Target keyword — evidence: The title and H1 target “AI Cost Management,” while the glossary’s approved positioning terms focus on AI engineer staffing and AI recruitment. — locations: title, h1 — count: 1 — fix: Reassess the target phrase against the approved service keyword strategy. — source: Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “AI Cost Management and Engineering Visibility Solution” leads with an informational/product topic rather than an approved hire-ready service. — locations: title, h1, h2 — count: 1 — fix: Align the page’s search intent and service framing with an approved recruiting or staffing offer. — source: Glossary §§6, 9
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: needs_decision — locations: h1 — count: 1 — fix: The H1 describes a standalone AI cost-management solution, while the approved service model is recruiting and staffing and the Intelligence Layer is bundled with nearshore staffing. Decide whether this page should be retained and reframed, merged, or removed. — source: Fact Sheet: Services; Glossary §§2, 7
✅ **H2** Priority — evidence: high — locations: h1, h2, body — count: 1 — fix: Resolve the page’s standalone-product positioning, benchmark CTA, and prohibited terminology before further optimization. — source: Glossary §§2, 7
✅ **H3** Reasons — evidence: The page is framed as a separate product, not an approved service [C2, E1]. | The benchmark is positioned as the main CTA, which is prohibited [D1, E3]. | The page uses the outdated product name repeatedly [E4]. | A client card names Novilab, which is absent from the Fact Sheet client list [D3]. | The Keywords Studios revenue figure conflicts with the Fact Sheet [D2]. — locations: title, h1, h2, body — count: 5 — fix: Prioritize resolving the service positioning, CTA, product naming, and client-proof discrepancies. — source: Fact Sheet: Services; Fact Sheet: Featured clients; Glossary §§2, 7
