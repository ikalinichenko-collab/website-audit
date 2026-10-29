# Page report

- **URL:** https://gogloby.com/podcast/tara-vasdani/
- **Type:** other
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 85 characters: "EORs and Digital Nomads: Redefining Glob..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/tara-vasdani/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: Page heading: “Tara Vasdani, Managing Partner at Remote Law Canada”. — locations: h1, body — source: decisions.md: Spelling
⚠️ **B3** Person data — evidence: The guest is described as “Managing Partner at Remote Law Canada”. — locations: h1, body — fix: Keep the page focused on the guest and interview; avoid implying that EOR or employment-law services are GoGloby services. — source: Fact Sheet: Identity; Glossary §2
❌ **B4** Schema matches the page — evidence: Organization schema uses “legalName”: “Gogloby LLC”. — locations: schema — count: 1 — fix: Correct the legal-name capitalization to match the company name in the source of truth. — source: Fact Sheet: Identity

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
❌ **C2** Context terms — evidence: Organization schema slogan: “Applied AI Engineering Partner”. — locations: schema — count: 1 — fix: Remove the disallowed positioning phrase from the organization schema. — source: Glossary §7
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: The title is “EORs and Digital Nomads: Redefining Global Hiring Legally with Tara Vasdani”. — locations: title, h1 — fix: Retain the episode topic and guest, while reviewing the title length for search-result display. — source: Glossary §9
❌ **D2** Client figures — evidence: “meta_description”: “”. — locations: meta — fix: Add a page-specific meta description that accurately summarizes the episode. — source: audit.json: SEO
✅ **D3** Clients not in the Fact Sheet — evidence: “Quick Read: Tara Vasdani, Managing Partner at Remote Law Canada, Interview Highlights”. — locations: h2 — source: Glossary §9
⚠️ **D4** Press and partners — evidence: The body discusses “employment agreements, compliance” and “local laws, tax obligations”. — locations: body — fix: Keep legal guidance clearly attributed to the guest and avoid presenting the episode as legal advice from GoGloby. — source: Fact Sheet: Identity

## E. Positioning

✅ **E1** Service fit — evidence: both — locations: body — fix: This podcast article does not clearly promote either service; if adding a service link, connect it contextually to the discussion of global hiring rather than presenting EOR advice as a GoGloby offering. — source: Fact Sheet: Services
❌ **E2** Positioning — evidence: “No link to staffing or recruiting service pages” (supplied code check A12). — locations: link_text — count: 0 — fix: Add a relevant contextual link to the applicable staffing or recruiting service page. — source: decisions.md: Service pages
✅ **E3** Call to action — evidence: “employer of record (EOR) providers can be valuable in managing global workforces”. — locations: body — source: Fact Sheet: Services
⚠️ **E4** Lead order — evidence: Organization schema lists “AI Staff Augmentation” as a service. — locations: schema — count: 1 — fix: Review page-level service schema and remove or correct service claims that do not describe the podcast page or GoGloby's approved services. — source: Fact Sheet: Services

## F. GEO

✅ **F1** Answer first — evidence: “Default Global Episode #18 with Tara Vasdani”. — locations: body — source: Fact Sheet: Identity
⚠️ **F2** Buyer problem — evidence: The article attributes advice to Tara, including “Tara advises employers to understand these factors”. — locations: body — fix: Preserve clear attribution to the guest when summarizing legal and employment guidance. — source: Fact Sheet: Identity
❌ **F3** Recruiting firm stated early — evidence: “AI Era Is Now!Lead or Fall Behind?” appears as a heading without spacing. — locations: h2, body — count: 1 — fix: Correct the missing separation in the heading text. — source: audit.json: page headings
✅ **F4** GoGloby named near claims — evidence: “Latest podcasts”. — locations: h2 — source: audit.json: page headings
⚠️ **F5** FAQ — evidence: The article includes a “Quick Read” section and “Interview Highlights”. — locations: h2, body — fix: Keep the interview summary readable and ensure headings accurately describe the sections beneath them. — source: Glossary §9
✅ **F6** Audience — evidence: informational — locations: title, h1, body — fix: Treat this as an informational podcast page, not a buyer-ready service landing page; add a contextual service link if appropriate. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1, body — fix: No supplied target keyword is specified for this podcast page; do not assign one without keyword evidence. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: The page topic is “EORs and Digital Nomads”. — locations: title, h1, body — fix: Keep the page discoverable as a podcast episode, while distinguishing its topic from GoGloby's recruiting and staffing services. — source: Glossary §2
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — fix: Keep the episode-specific H1; it accurately identifies the subject and guest. The supplied page data does not support merging or redirecting this episode page. — source: audit.json: page headings
✅ **H2** Priority — evidence: low — locations: title, meta, schema — fix: Low priority: this is an informational podcast page rather than a core service page, though its missing meta description and schema discrepancies should be addressed. — source: Glossary §9
✅ **H3** Reasons — evidence: A12: No service-page links are reported; the supplied check says “No link to staffing or recruiting service pages.” | A3: The supplied check reports “Missing meta description.” | C3: Schema capitalization conflicts with the approved “GoGloby” spelling; the supplied evidence shows “Gogloby LLC”. | C2: The organization schema uses “Applied AI Engineering Partner,” a disallowed description of GoGloby. | F6: The episode is informational, supported by “Quick Read” and “Interview Highlights,” not service-page buyer content. — locations: meta, schema, body, link_text — source: decisions.md: Spelling; Glossary §§7, 9; audit.json: supplied checks A3, A12, C3
