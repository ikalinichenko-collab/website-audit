# Page report

- **URL:** https://gogloby.com/insights/ai-consulting-cost/
- **Type:** post
- **Action:** rewrite
- **Priority:** high

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 80 characters: "How Much Does AI Consulting Cost in 2026..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: 96 characters — locations: meta — fix: Adjust meta description to 120-158 characters. — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/insights/ai-consulting-cost/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
✅ **A8** Dates — evidence: 2026-09-18T13:20:11+03:00 | 2026-09-18T13:20:14+03:00 — locations: schema — source: audit.json: requirements_by_type
✅ **A9** Author — evidence: View profile — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article, FAQPage — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization slogan: “Applied AI Engineering Partner”; prohibited positioning, and the company description does not match the approved Fact Sheet sentence. | Organization legalName: “Gogloby LLC”; approved spelling is “GoGloby LLC.” | Organization description: “US-based talent acquisition agency”; does not match the approved staffing and recruiting description. | Organization rating: “reviewCount”: 4.9; Fact Sheet says 10 reviews. | OfferCatalog includes “Applied AI Engineering,” “Generative AI Development Services,” and “AI Staff Augmentation”; listed service names and descriptions conflict with approved service positioning. | Website description: “Applied AI Engineering partner”; conflicts with approved positioning. — locations: schema — count: 1 — fix: Align Organization and WebSite schema fields with approved company facts and service names; remove prohibited positioning and unsupported claims. — source: decisions.md: Company description; Fact Sheet: Identity, What we are not, Services, What clients say; Glossary §7
❌ **B3** Person data — evidence: Sergey jobTitle “Co-founder & CTO” matches after normalization, but the schema description says “secure development environment” and “Applied AI Engineering system”; the page author says “16+ years” while the Fact Sheet says 17 years. | Vit Koval jobTitle “Co-founder” matches; the description claims “the past decade” and “$60M+ in value,” neither verified by the Fact Sheet, and uses the prohibited Applied AI positioning. | Article author is “Sergey Matikaynen”; author text says “16+ years” and “4x Applied AI Engineering,” conflicting with or unsupported by the Fact Sheet and glossary. — locations: schema, body — count: 3 — fix: Correct founder and author biographies to approved, sourced facts; remove unsupported claims and prohibited positioning. — source: decisions.md: Founders; Fact Sheet: Founders; Glossary §7
⚠️ **B4** Schema matches the page — evidence: The page includes an Article node with “datePublished”: “2026-09-18T13:20:11+03:00”; no page excerpt establishes whether this date is accurate. — locations: schema — fix: Verify article date fields against the publishing record. — source: Page JSON-LD: Article; Fact Sheet: Last updated

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: th of delivery. The AI Intelligence Layer deploys inside the — locations: body — count: 2 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: “GoGloby starts with a benchmark” and “Get Your Benchmark”; the glossary says not to use “Benchmark” as the main call to action. | “GoGloby deploys a measurement layer” and “We forward-deploy an AI Solutions Architect”; the page describes delivery/consulting work, not the approved recruiting and staffing services. — locations: body — count: 2 — fix: Remove the prohibited benchmark-led CTA and align descriptions of GoGloby's offering with its approved services. — source: Glossary §2, §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 1 em dash(es) found. — locations: body — count: 1 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: “AI consulting rates run 10–20% below comparable US rates”; this market claim is not established by the provided company sources. | “79% of enterprises experienced AI cost overruns”; the page attributes this to an external survey, not a GoGloby source. — locations: body — count: 2 — fix: Verify external market statistics and retain clear sourcing for each claim. — source: Fact Sheet: Last updated; Glossary §10
⚠️ **D2** Client figures — evidence: “16+ years building and leading software teams”; Fact Sheet founder information says Sergey has spent 17 years. | No Fact Sheet client metric is quoted in the supplied page text in a way that can be confirmed as a client metric. — locations: body — count: 1 — fix: Correct the founder tenure claim. No client-metric conflict is established from the supplied page text. — source: Fact Sheet: Founders; Key metrics
✅ **D3** Clients not in the Fact Sheet — evidence: “Big Four and Strategy Firms” lists consulting providers; the supplied page text does not show client logos or client cards. — locations: body — count: 0 — source: Fact Sheet: Featured clients
⚠️ **D4** Press and partners — evidence: “McKinsey’s 2026 survey” and “DoiT and Sapio’s 2026 survey” are attributed external claims; the supplied company sources do not verify their figures. — locations: body — count: 2 — fix: Confirm the cited survey findings and ensure the linked sources support the stated figures. — source: Page external links; Fact Sheet: Last updated

## E. Positioning

❌ **E1** Service fit — evidence: “GoGloby deploys a measurement layer” and “puts engineers inside the team”; the page presents implementation/consulting as GoGloby's service. — locations: body — count: 1 — fix: Remove or correct service claims that position GoGloby as an AI consulting or development provider. — source: Fact Sheet: Identity, What GoGloby is not, Services
❌ **E2** Positioning — evidence: “The engagement starts with a benchmark. One month, fixed fee”; this is not an approved GoGloby service or CTA. — locations: body — count: 1 — fix: Remove the unsupported benchmark engagement offer and describe only approved services and commercial terms. — source: Fact Sheet: Services; Glossary §7
❌ **E3** Call to action — evidence: “GoGloby puts AI into production with Forward-Deployed Engineers”; the Fact Sheet says GoGloby recruits and staffs engineers and clients run the work. — locations: body — count: 1 — fix: Correct claims that imply GoGloby itself delivers AI production work. — source: Fact Sheet: Identity, What GoGloby is not
❌ **E4** Lead order — evidence: “One month, fixed fee, fully credited toward the first month of delivery”; this offer is not in the approved service terms. — locations: body — count: 1 — fix: Remove the unsupported commercial offer or obtain company confirmation before publication. — source: Fact Sheet: Services; Glossary §10

## F. GEO

❌ **F1** Answer first — evidence: “How Much Does AI Consulting Cost in 2026?”; the page is framed around consulting costs rather than GoGloby's recruiting or staffing services. — locations: title, h1 — count: 1 — fix: Reassess whether this page topic fits the approved service offering and content strategy. — source: Fact Sheet: Services; Glossary §9
❌ **F2** Buyer problem — evidence: “This guide explains how AI consulting costs change”; the article's stated purpose is informational guidance about consulting. — locations: first_paragraph, body — count: 1 — fix: Align the page purpose with buyer-ready recruiting or staffing intent, or review whether it should remain published. — source: Glossary §9
❌ **F3** Recruiting firm stated early — evidence: “AI consulting cost depends on”; this informational framing is not one of the approved target service terms. — locations: title, h1, body — count: 1 — fix: Review the target query and page role against the approved keyword and audience strategy. — source: Glossary §6, §9
❌ **F4** GoGloby named near claims — evidence: “A solo consultant, specialist firm, engineering team, and large consultancy”; the page is written for people evaluating consulting providers. — locations: body — count: 1 — fix: Reassess audience fit; the approved audience is companies ready to hire through GoGloby's services. — source: Glossary §9
❌ **F5** FAQ — evidence: “Book a Call” and “Get Your Benchmark”; neither CTA is the approved staffing or recruiting CTA. — locations: body, link_text — count: 2 — fix: Use the approved CTA appropriate to the service, and remove the prohibited benchmark CTA. — source: Glossary §2, §7
⚠️ **F6** Audience — evidence: informational — locations: title, h1, body — count: 1 — fix: The page is informational rather than buyer-ready; the glossary says content should target companies ready to hire. — source: Glossary §9

## G. Target keyword

⚠️ **G1** Target keyword — evidence: AI consulting cost — locations: title, h1, meta — count: 1 — fix: This phrase is not listed as an approved target keyword; confirm whether the page should target an approved service term instead. — source: Glossary §6
⚠️ **G2** Keyword placement — evidence: title: yes | h1: yes | h2: yes | meta: yes | first_paragraph: no — locations: title, h1, h2, meta — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: “AI consulting cost”; consulting is not an approved GoGloby service, and the page does not connect the topic to its recruiting or staffing service pages. — locations: title, h1, body — count: 1 — fix: Review topical fit and link relevant approved service pages where appropriate. — source: Fact Sheet: Services; decisions.md: Service pages
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: rewrite — locations: h1 — count: 1 — fix: Rationale: the H1 targets consulting-cost information, while GoGloby's approved services are recruiting and staffing; revise the page direction to fit an approved service and buyer intent. — source: Fact Sheet: Services; Glossary §6, §9
✅ **H2** Priority — evidence: high — locations: h2 — count: 1 — fix: Rationale: the H2s extensively frame GoGloby around AI consulting, implementation, and benchmark-led offers, conflicting with approved service positioning and prohibited claims. — source: Fact Sheet: Identity, Services; Glossary §7
✅ **H3** Reasons — evidence: Page’s main topic is consulting prices, not GoGloby's approved recruiting or staffing services. (F1, F2, E1) | The CTA “Get Your Benchmark” conflicts with the glossary's explicit CTA restriction. (C2, F5) | Page copy says GoGloby puts AI into production, contrary to the approved role of recruiting and staffing engineers. (E1, E3) | Organization schema contains incorrect legal-name casing, a prohibited slogan, and mismatched company description. (B2, C3) | Founder tenure in the author text conflicts with the Fact Sheet. (B3, D2) — locations: title, h2, body, schema — count: 5 — fix: Address these issues before making secondary page-level refinements. — source: decisions.md; Fact Sheet: Identity, Founders, Services; Glossary §7, §9
