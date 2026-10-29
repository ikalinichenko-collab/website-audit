# Page report

- **URL:** https://gogloby.com/services/ai-staff-augmentation/
- **Type:** service
- **Action:** fix
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
❌ **B2** Organization data — evidence: Organization legalName is “Gogloby LLC”; Fact Sheet says “GoGloby LLC.” | Organization slogan is “Applied AI Engineering Partner”; Glossary §7 says not to describe GoGloby as an “Applied AI Engineering partner.” | Organization description calls GoGloby a “talent acquisition agency”; approved description is “a staffing and recruiting agency specializing in hiring Data & AI Engineers.” | Organization knowsAbout/keywords include “AI Intelligence Layer”; the current name is “AI Development Intelligence Layer.” | Organization rating says “reviewCount”: 4.9; Fact Sheet says “4.9 / 5 from 10 reviews.” | WebSite description says “Applied AI Engineering partner”; Glossary §7 disallows that positioning. — locations: schema — count: 2 — fix: Align the Organization and WebSite schema fields with approved company identity, service terminology, product naming, and verified review details. — source: decisions.md: Company description; Fact Sheet: Identity, What clients say; Glossary §7
✅ **B3** Person data — evidence: Person node: “Sergey Matikaynen” / “Co-founder & CTO” matches the decision “Co-Founder and CTO” after normalizing case and “&” versus “and.” | Person node: “Vit Koval” with alternateName “Vitaly Koval” / “Co-founder” matches the decision “Vitaly (Vit) Koval: Co-Founder.” — locations: schema — count: 2 — source: decisions.md: Founders
⚠️ **B4** Schema matches the page — evidence: The page says “GoGloby forward-deploys senior Claude Certified Architects”; Glossary §7 says not to use “Claude Certified Architect” as positioning or as an offer. — locations: body — count: 1 — fix: Review the page’s claims and terminology against approved service descriptions; the supplied sources do not verify several specific claims. — source: Glossary §7; Fact Sheet: Services

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: ed feature from the AI Intelligence Layer, grounded in what a | Applied AI Engineering partner: A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS — locations: body — count: 7 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Replace "AI Intelligence Layer" with AI Development Intelligence Layer. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: The page says “AI Staff Augmentation”; Glossary §7 says not to use “AI staffing” on its own and requires the approved service name. — locations: title, h1, body — count: 1 — fix: Use the approved service name and terminology instead of the standalone AI staff augmentation framing. — source: decisions.md: Service pages; Fact Sheet: Services; Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: The page says “a 100K+ line codebase”; Fact Sheet assessment Stage 2 specifies a “real 50,000-line codebase.” | The page says “For general applicants the rate is 0.04% at most”; the Fact Sheet gives the pass rate as “4% of candidates.” — locations: body — count: 2 — fix: Correct or remove assessment claims that conflict with the Fact Sheet. — source: Fact Sheet: How we vet; Key metrics
❌ **D2** Client figures — evidence: Hasbro: page says “$4.7B revenue”; Fact Sheet says “~$5B revenue.” | DrChrono: page says “$3B+ medical claims annually”; Fact Sheet says “$3B in medical claims processed.” | EverCommerce: page says “700,000+ business clients”; Fact Sheet says “700K+ clients.” (consistent at the stated rounded level; no conflict identified.) | Keywords Studios: page says “$844M revenue” and “13,000 employees”; Fact Sheet says “~$879M revenue” and “12,000+ employees.” | TATA: page says “$106B market cap”; Fact Sheet gives “~$30B revenue” and does not verify a market-cap figure. | Sydecar: page says “$3B+ AUA”; Fact Sheet says “$1B+ assets under administration.” | Bonusly: page says “$32.4M raised”; Fact Sheet says “$20M Series B.” | Devsisters: page says “200M+ users”; Fact Sheet says “200M+ players.” No conflicting figure supplied. — locations: body, image_alt — count: 6 — fix: Correct the conflicting client metrics and remove or verify client figures not supported by the Fact Sheet. — source: Fact Sheet: Featured clients; Featured clients table
❌ **D3** Clients not in the Fact Sheet — evidence: Client card says “NOVILAB”; Novilab is not listed in the Fact Sheet client list. — locations: h2, body — count: 1 — fix: Remove or verify the Novilab client card. Other named client cards shown are present in the Fact Sheet client list. — source: Fact Sheet: Selected clients; Featured clients
⚠️ **D4** Press and partners — evidence: The page says “$3M combined liability (cyber, data and professional)”; Fact Sheet specifies a “$3M data and cyber liability” policy. — locations: body — count: 1 — fix: Align the insurance claim with the Fact Sheet wording and scope. — source: Fact Sheet: Services; Legal and security

## E. Positioning

✅ **E1** Service fit — evidence: staffing — locations: h1, body — count: 1 — source: decisions.md: Service pages; Fact Sheet: Services
❌ **E2** Positioning — evidence: The page describes “Claude Certified Architects” as the primary offer; Glossary §7 says that term is not to be used as positioning or as an offer. | The page calls GoGloby an “Applied AI Engineering partner”; Glossary §7 disallows this description. — locations: meta, body — count: 2 — fix: Replace disallowed positioning and offer terminology with approved service terminology. — source: Glossary §7
❌ **E3** Call to action — evidence: The page says “Vetted Profiles In 3 To 5 Business Days”; the Fact Sheet says nearshore staffing takes “2–3 weeks to start.” | The page says “120-Day Performance Guarantee” based on a baseline; Fact Sheet specifies performance-based replacement if results fall below baseline and cancellation in the first 120 days. — locations: h2, body — count: 2 — fix: Align delivery timing and guarantee details with the approved staffing terms. — source: Fact Sheet: Services
❌ **E4** Lead order — evidence: The page says “Every engagement starts with the Benchmark”; Glossary §7 says not to use “Benchmark” as the main call to action. | The page calls the product “AI Intelligence Layer”; the current product name is “AI Development Intelligence Layer.” — locations: body — count: 2 — fix: Remove the disallowed Benchmark-led CTA and use the current Intelligence Layer product name. — source: Fact Sheet: Services; Glossary §7

## F. GEO

❌ **F1** Answer first — evidence: The page says “Claude Certified Architects” and “Applied AI Engineers”; Glossary §7 says Claude Certified Architect is not an offer or positioning term and Applied AI Engineer is not a company description. — locations: meta, h2, body — count: 2 — fix: Use the approved role and service terminology, keeping role names only where they are supported as roles. — source: Fact Sheet: Services; Glossary §§3, 7
❌ **F2** Buyer problem — evidence: The page says “Forward-Deploy an Architect”; the approved staffing call to action is “Get vetted profiles.” — locations: body — count: 1 — fix: Change the staffing CTA to the approved call to action. — source: Fact Sheet: Services; Glossary §7
❌ **F3** Recruiting firm stated early — evidence: The page says “GoGloby is an Applied AI Engineering partner”; Glossary §7 explicitly disallows this as a description of GoGloby. — locations: body — count: 1 — fix: Remove the disallowed company positioning. — source: Glossary §7
❌ **F4** GoGloby named near claims — evidence: The page says “Claude Certified Architect”; Glossary §7 says this is not to be used as positioning or as an offer. — locations: meta, h2, body — count: 1 — fix: Remove the disallowed term from page positioning and offer claims. — source: Glossary §7
❌ **F5** FAQ — evidence: The page says “AI Intelligence Layer”; the Fact Sheet names it “AI Development Intelligence Layer.” | The page says “A GoGloby Applied AI Engineering client”; Glossary §7 disallows “Applied AI Engineering” as the company’s positioning. — locations: body — count: 2 — fix: Use the current product name and remove the disallowed positioning from client descriptions. — source: Fact Sheet: Services; Glossary §7
✅ **F6** Audience — evidence: buyer_ready — locations: h1, body — count: 1 — fix: The page targets companies seeking embedded engineers, but align the wording and offer with the approved staffing service. — source: Fact Sheet: Services; Glossary §9

## G. Target keyword

❌ **G1** Target keyword — evidence: none — locations: title, h1 — count: 1 — fix: The supplied page data has no targetKeyword, and the current “AI Staff Augmentation” target conflicts with the terminology guidance. Select a supported target keyword before optimizing. — source: Glossary §§6–8
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: The page opens with “Forward-Deployed Claude Certified Architects”; Glossary §9 says to open with the buyer’s problem and lead with who is placed, from where, and how fast. — locations: h1, body — count: 1 — fix: Reorder the opening to follow the approved buyer-first service-page guidance. — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: fix — locations: h1 — count: 1 — fix: The H1 uses standalone “AI Staff Augmentation” rather than the approved service name and service-page terminology. — source: decisions.md: Service pages; Glossary §§6–7
✅ **H2** Priority — evidence: high — locations: h2 — count: 1 — fix: Prioritize the page-level service positioning and disallowed offer terminology; several H2s center on Claude Certified Architect and forward-deployed engineering. — source: decisions.md: Service pages; Glossary §§6–7
✅ **H3** Reasons — evidence: The heading “Vetted Profiles In 3 To 5 Business Days” conflicts with the Fact Sheet’s “2–3 weeks to start.” (E3) | The page includes “NOVILAB” as a client card, which is absent from the Fact Sheet client list. (D3) | The heading “$3M Combined Liability (Cyber, Data and Professional)” exceeds the Fact Sheet’s stated data and cyber liability coverage. (D4) | The heading “Governance & Safety” uses “&”; Glossary §9 specifies “and,” not “&.” (C5) — locations: h2, body — count: 4 — fix: Review the cited heading and card text against the noted checks. — source: Fact Sheet: Services, Legal and security, Featured clients; Glossary §9
