# Page report

- **URL:** https://gogloby.com/podcast/jason-loyola/
- **Type:** other
- **Action:** needs_decision
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 62 characters: "How We Create a Tech-Culture that Transc..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/jason-loyola/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Title: “How We Create a Tech-Culture that Transcends Borders” — locations: title — fix: The title is broad and does not make the podcast guest or topic clear to a prospective buyer. — source: Glossary §9
❌ **B3** Person data — evidence: Meta description: “” — locations: meta — fix: Add a page-specific meta description; the supplied page data has no meta description. — source: Page audit data: meta_description
⚠️ **B4** Schema matches the page — evidence: Article description: “” — locations: schema — fix: Add a concise description to the Article schema that reflects the podcast page. — source: Page audit data: JSON-LD Article

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: “AI Era Is Now!Lead or Fall Behind?” — locations: h2 — count: 0 — source: Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: “Jason Loyola, Head Of Information Technology at InDebted” — locations: h1, body — fix: This episode focuses on a guest and topics that are not clearly tied to GoGloby’s hiring services or buyer audience. — source: Glossary §9
✅ **D2** Client figures — evidence: “Jason’s rise to leadership at InDebted” — locations: body — source: Page audit data: body
⚠️ **D3** Clients not in the Fact Sheet — evidence: “Latest podcasts” — locations: h2, body — fix: The page includes links to related podcast episodes, but no supplied link points to either service page. — source: Page audit data: internal_links; decisions.md: Service pages
⚠️ **D4** Press and partners — evidence: “Listen Up: Jason Loyola” — locations: h2, body — fix: Ensure the episode player or media link is available and clearly accessible; the supplied data does not include a destination link. — source: Page audit data: h2 and external_links

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: h1, body — fix: The page discusses a podcast guest’s career and leadership, not GoGloby recruiting or staffing services. — source: Page audit data: h1 and body; Fact Sheet: Services
⚠️ **E2** Positioning — evidence: “AI Era Is Now!Lead or Fall Behind?” — locations: h2, body — fix: The closing AI-related heading does not establish a hiring-service context; clarify the page’s relevance to GoGloby’s audience or remove the unrelated heading. — source: Glossary §9
✅ **E3** Call to action — evidence: “Jason Loyola, Head Of Information Technology at InDebted” — locations: h2, body — source: Page audit data: h2 and body
⚠️ **E4** Lead order — evidence: “communication and trust are key to managing a global team” — locations: body — fix: The episode discusses global-team management, but does not connect the topic to GoGloby’s service or hiring expertise. — source: Glossary §9

## F. GEO

❌ **F1** Answer first — evidence: Organization description: “We are a US-based talent acquisition agency specializing in assisting tech companies” — locations: schema — fix: Align the Organization description with the approved company description in decisions.md. — source: decisions.md: Company description
❌ **F2** Buyer problem — evidence: “Applied AI Engineering Partner” — locations: schema — count: 1 — fix: Remove the disallowed positioning phrase from the Organization schema. — source: Glossary §7
❌ **F3** Recruiting firm stated early — evidence: “AI Intelligence Layer (engineering telemetry)” — locations: schema — count: 1 — fix: Replace the obsolete product name in the Organization schema with the current terminology, or remove it if not needed. — source: Glossary §7
❌ **F4** GoGloby named near claims — evidence: “Claude Certified Architect” is not present; schema describes “Forward-deployed AI Solutions Architects” — locations: schema — fix: Remove or revise the service-catalog claims and offers that position GoGloby as an AI development provider rather than a recruiting and staffing agency. — source: Glossary §7; Fact Sheet: Services
❌ **F5** FAQ — evidence: Schema service description: “Vetted profiles delivered in 72 hours.” — locations: schema — fix: Remove unsupported service claims and use the approved service details and timelines from the Fact Sheet. — source: Fact Sheet: Services; Glossary §7
✅ **F6** Audience — evidence: informational — locations: h1, body — fix: This is an informational podcast page, not a service page aimed at a buyer ready to hire. — source: Page audit data: h1 and body; Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1, body — fix: No target keyword is supplied for this page, and the page content does not establish a relevant GoGloby hiring-service target phrase. — source: Page audit data: trap_term_context; Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: “How We Create a Tech-Culture that Transcends Borders” — locations: title, h1 — fix: The title and H1 are aligned, but the topic does not clearly serve the intended hiring-buyer audience. — source: Glossary §9
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: needs_decision — locations: title, h1 — fix: The title and H1 are “How We Create a Tech-Culture that Transcends Borders,” and the page is an informational podcast feature rather than a service page. Decide whether to retain it as an indexed archive page or take another action. — source: Glossary §9
✅ **H2** Priority — evidence: low — locations: title, h1, body — fix: Low priority: the page is an informational podcast episode about “Jason Loyola, Head Of Information Technology at InDebted,” not a core staffing or recruiting service page. — source: Glossary §9
✅ **H3** Reasons — evidence: The title is 62 characters and the supplied audit flags it as outside its target range (A2: “62 characters”). | The meta description is missing (A3: “Missing meta description”). | There is no link to a staffing or recruiting service page in the supplied links (A12: “No link to staffing or recruiting service pages”). | The Organization schema uses the disallowed phrase “Applied AI Engineering Partner” (F2). | The page’s podcast topic is informational rather than buyer-ready (F6: “Jason Loyola, Head Of Information Technology at InDebted”). — locations: title, meta, schema, body — count: 5 — fix: Address the cited issues according to their check-level fixes. — source: Page audit data: code_check_results; Glossary §7 and §9
