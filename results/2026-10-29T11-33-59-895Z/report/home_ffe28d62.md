# Page report

- **URL:** https://gogloby.com/
- **Type:** homepage
- **Action:** rewrite
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
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#c1a9b381a6aea6adaea3b8efa2aeac (404) | https://gogloby.com/cdn-cgi/l/email-protection#b0d8c2f0d7dfd7dcdfd2c99ed3dfdd (404) — locations: link_text — count: 4 — fix: Fix or remove broken internal links. — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present: Organization, WebSite — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization legalName is “Gogloby LLC”; the source says “GoGloby LLC”. | Organization slogan is “Applied AI Engineering Partner”; the page calls GoGloby an “Applied AI Engineering partner”. | Organization description says “talent acquisition agency”; the page describes an “Applied AI Engineering partner”. | The catalog uses “AI Staff Augmentation” and “Applied AI Engineering” rather than the approved service names “Nearshore Data & AI Engineers Staffing” and “US Data & AI Engineers Recruiting”. | Organization includes G2, Trustpilot, DesignRush, and YouTube profiles; the source says “G2: Not available yet” and “YouTube: Not available yet.” — locations: schema — count: 5 — fix: Correct the legal name, description, slogan, catalog service names, and unsupported profile links in the Organization node to match approved company facts and service naming. — source: decisions.md: Company description; Fact Sheet: Identity, Official profiles (sameAs), Services
❌ **B3** Person data — evidence: Sergey jobTitle “Co-founder & CTO” matches “Co-Founder and CTO” after normalizing &/and and case; his schema description says “Leads the Agentic SDLC methodology,” unlike the source’s infrastructure and AI-native engineering responsibilities. | Vit Koval is identified as “Co-founder”; the schema description claims “generating $60M+ in value,” which is not in the approved founder description. — locations: schema — count: 2 — fix: Keep the matching founder names and normalized job titles; align founder descriptions with approved source biographies and remove unsupported claims. — source: decisions.md: Founders; Fact Sheet: Founders
❌ **B4** Schema matches the page — evidence: The page says “GoGloby is an Applied AI Engineering partner”; the approved description is “GoGloby is a staffing and recruiting agency specializing in hiring Data & AI Engineers.” — locations: meta, body, schema — count: 1 — fix: Align the company identity statements in metadata, page content, and structured data with the approved company description. — source: decisions.md: Company description

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: team comes with the AI Intelligence Layer: every AI dollar vi | AI Engineering Visibility: d prove the return. AI Engineering Visibility AI Intelligence Lay | AI-native production: ng engineering into AI-native production: every AI dollar vi | Applied AI Engineering partner: GoGloby is an Applied AI Engineering partner turning engineering | Applied AI Company: Applied AI Company for Established Sof | AI Leadership Search: t Works Recruitment AI Leadership Search We recruit US-based | every AI dollar visible: -native production: every AI dollar visible, every feature ship | Staffing gives capacity: the bottlenecks. S Staffing Gives Capacity, GoGloby Owns Outco | owns outcomes: s Capacity, GoGloby Owns Outcomes Outcome: Added capa — locations: body, meta, title, h2 — count: 37 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: The page uses “AI Intelligence Layer”; the approved name is “AI Development Intelligence Layer.” | The page says “AI-native production”; the glossary lists “AI-native production” among claims not to use. | The page says “Staffing Gives Capacity, GoGloby Owns Outcomes”; the glossary prohibits copy that argues against staffing. | Benchmark: r Applied AI Engineering Benchmark | Claude Certified Architect: eers, hands-on delivery. Claude Certified Architects, Claude-specific. Check | AI Solutions Architect: ainst your own baseline. AI Solutions Architects, model-agnostic. Applie — locations: body, h2 — count: 3 — fix: Replace deprecated product naming and remove the prohibited positioning and staffing-contradicting claims. — source: Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 15 em dash(es) found. — locations: body — count: 15 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: The page claims “100+ Clients Across 10+ Industries”; the Fact Sheet does not substantiate either total. | The page says “Vetted profiles delivered in 72 hours” in structured data; the source describes staffing starts in “2–3 weeks.” — locations: h2, body, schema — count: 2 — fix: Remove or verify unsupported client/industry totals and service timing claims against approved source material. — source: Fact Sheet: Identity, Services
❌ **D2** Client figures — evidence: DrChrono card: “$3B+ medical claims annually”; source says “$3B in medical claims processed,” with no annual period. | Keywords card: “$844M revenue · 13,000 employees”; source says “~$879M revenue” and “12,000+ employees.” | Other displayed client metrics include “$1.98B market cap,” “$3B+ AUA,” “$32.4M raised,” and “$31M seed”; these are not verified in the Fact Sheet. — locations: body — count: 3 — fix: Correct the DrChrono and Keywords Studios conflicts. Verify or remove the other client metrics that are not supported by the Fact Sheet. — source: Fact Sheet: Featured clients; Key metrics
❌ **D3** Clients not in the Fact Sheet — evidence: Client-card headings include “NOVILAB”; it is not in the Fact Sheet client list. | The “Leading Software Companies Choose GoGloby” cards include “GITLAB” and “OYSTER”; neither is in the Fact Sheet client list. — locations: h2, body — count: 3 — fix: Remove or substantiate these items as client cards; do not present non-client organizations as clients. Press and partner mentions are not counted as failures. — source: Fact Sheet: Featured clients; External recognition
❌ **D4** Press and partners — evidence: The card calls TATA “one of the world’s largest technology companies”; the approved client entry identifies TATA as an “IT Services & Consulting” firm. — locations: body — count: 1 — fix: Use the approved client description and avoid presenting TATA as a different category of business. — source: decisions.md: Clients; Fact Sheet: Featured clients

## E. Positioning

❌ **E1** Service fit — evidence: The page describes “Forward-Deployed Engineering” and says engineers “ship” and “fix” delivery; the approved service model is recruiting and staffing engineers, with clients running the work. — locations: title, meta, h1, h2, body — count: 1 — fix: Reframe the homepage around the approved recruiting and staffing services; remove claims that present GoGloby as a software delivery or engineering consultancy. — source: Fact Sheet: Identity, Services; Glossary §1, §7
❌ **E2** Positioning — evidence: The body offers “AI Leadership Search” and “AI Leadership Search runs in parallel”; the approved service is US Data & AI Engineers Recruiting with specified recruiting roles and scope. — locations: body — count: 1 — fix: Use the approved recruiting service name and describe leadership recruiting within the source-defined service scope. — source: Fact Sheet: Services; Glossary §2, §3
❌ **E3** Call to action — evidence: The page claims engineers are available “in under 4 weeks”; the staffing source says “2–3 weeks to start,” while recruiting is “4–6 weeks to offer.” — locations: body, schema — count: 1 — fix: Align time claims with the relevant approved service timelines; remove unsupported timing claims. — source: Fact Sheet: Services
❌ **E4** Lead order — evidence: The page says the “AI Intelligence Layer deploys in your VPC”; the source calls the product “AI Development Intelligence Layer” and says telemetry is metadata-only with “no source-code access.” — locations: body — count: 1 — fix: Use the approved product name and supported description of its tracking and security characteristics; remove unsupported deployment claims. — source: Fact Sheet: Services, Legal and security; Glossary §2, §7

## F. GEO

❌ **F1** Answer first — evidence: The page opens with “Uncover & Fix What’s Holding Your AI Engineering Back”; the glossary says pages should open with the buyer’s hiring problem and “Lead with the hire.” — locations: h1, body — count: 1 — fix: Make the opening answer who GoGloby recruits or staffs and connect it to a buyer’s hiring need. — source: Glossary §9
❌ **F2** Buyer problem — evidence: The page says “Schedule a technical briefing” and “Get Your Applied AI Engineering Benchmark”; the glossary says “Benchmark” should not be the main call to action. — locations: h2, body — count: 2 — fix: Replace benchmark-led calls to action with the approved service-appropriate action. — source: Glossary §7
❌ **F3** Recruiting firm stated early — evidence: The page says “We prove AI ROI”; the glossary prohibits hero or headline messaging that leads with AI ROI or AI spend. — locations: body — count: 1 — fix: Remove ROI-led positioning and prioritize the hiring service and roles. — source: Glossary §7
❌ **F4** GoGloby named near claims — evidence: The page says “GoGloby is an Applied AI Engineering partner”; the glossary prohibits describing GoGloby as an “Applied AI Company” or “Applied AI Engineering partner.” — locations: meta, body — count: 1 — fix: Remove this positioning and use the approved company description. — source: decisions.md: Company description; Glossary §7
❌ **F5** FAQ — evidence: The page title is “Applied AI Company for Established Software”; the homepage title guidance is “Data and AI Engineer Staffing and Recruiting Agency.” — locations: title — count: 1 — fix: Align the homepage title with the source-defined positioning and homepage title guidance. — source: Glossary §6
❌ **F6** Audience — evidence: The page is framed around “Applied AI Engineering” services, “AI ROI,” and technical briefings rather than buyers ready to hire a staffing agency or recruiter. — locations: title, meta, h1, h2, body — count: 1 — fix: Retarget the page to companies ready to hire engineers through recruiting or staffing, not buyers seeking AI consulting or engineering services. — source: Glossary §9

## G. Target keyword

❌ **G1** Target keyword — evidence: AI engineer staffing — locations: title, meta, h1, h2 — count: 1 — fix: Use the homepage target phrase in the title and prominent page messaging; it is absent from the supplied title and headings. — source: Glossary §6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: The page uses “AI Leadership Search”; the glossary identifies AI executive search terms as a Priority 2 recruiting-page topic, not the homepage lead. — locations: body — count: 1 — fix: Keep the homepage focused on the primary staffing and recruiting categories; reserve the leadership-search emphasis for its designated page. — source: Glossary §6
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: rewrite — locations: title, meta, h1, body — count: 1 — fix: Rationale: the homepage title, description, and body position GoGloby as an Applied AI engineering partner rather than the approved staffing and recruiting agency. Rewrite around the approved company description and homepage keyword guidance. — source: decisions.md: Company description; Glossary §6
✅ **H2** Priority — evidence: high — locations: h2 — count: 13 — fix: Rationale: prominent headings repeatedly frame the company as an Applied AI company and lead with engineering delivery, conflicting with the approved staffing and recruiting positioning. Rework the heading hierarchy around the two approved services and buyer intent. — source: decisions.md: Company description; Fact Sheet: Services
✅ **H3** Reasons — evidence: C2: “AI Intelligence Layer” uses a deprecated product name. | D2: “$844M revenue · 13,000 employees” conflicts with the approved Keywords Studios figures. | D3: “NOVILAB” is presented in the client-card section but is absent from the approved client list. | E1: “Forward-Deployed Engineering” positions delivery services rather than staffing and recruiting. | F2: “Get Your Applied AI Engineering Benchmark” uses the prohibited benchmark-led CTA. — locations: h2, body — count: 5 — fix: Prioritize the cited issues; see the referenced checks for specific remediation. — source: Glossary §7, §9; Fact Sheet: Featured clients
