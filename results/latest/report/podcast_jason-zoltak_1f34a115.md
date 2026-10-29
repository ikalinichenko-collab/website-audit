# Page report

- **URL:** https://gogloby.com/podcast/jason-zoltak/
- **Type:** other
- **Action:** keep
- **Priority:** low

## First paragraph

_(empty)_

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 74 characters: "The Power of Networks: Exploring tofu's ..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/jason-zoltak/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — source: audit.json: requirements_by_type
➖ **A9** Author — source: audit.json: requirements_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
❌ **A12** Links to service pages — evidence: No link to staffing or recruiting service pages — fix: Add links to staffing and/or recruiting service pages in main content. — source: checklist: A12

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: BreadcrumbList | Found: Organization, WebSite, Article — locations: schema — fix: Add JSON-LD types: BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: “GoGloby” appears in the page title. — locations: title — count: 1 — source: decisions.md: Spelling
⚠️ **B3** Person data — evidence: “Co-Founder & CEO at tofu” identifies the guest, not GoGloby’s founders. — locations: body — count: 1 — fix: No GoGloby founder claim is made in the page content; avoid inferring founder details from this podcast page. — source: decisions.md: Founders
✅ **B4** Schema matches the page — evidence: “TATA” is not presented as a page client or as a target audience. — locations: body — count: 0 — source: decisions.md: Clients

## C. Wording

❌ **C1** Banned phrases — evidence: towards hiring for mid-level roles rather than s — locations: body — count: 1 — fix: Replace "mid-level" with senior. — source: audit.json: exact_phrases
✅ **C2** Context terms — evidence: “Tofu operates on a success fee or subscription fee basis” describes tofu, not GoGloby. — locations: body — count: 0 — source: Fact Sheet: Identity
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: “Meet Jason Zoltak” introduces a podcast guest and episode. — locations: h1, body — fix: This is a podcast episode rather than a service page; it does not explain GoGloby’s staffing or recruiting offer. — source: Fact Sheet: Services
⚠️ **D2** Client figures — evidence: “The Power of Networks” is the page’s headline. — locations: h1 — fix: The headline focuses on the guest’s topic, not a buyer hiring problem or GoGloby service. — source: Glossary §9
⚠️ **D3** Clients not in the Fact Sheet — evidence: “Jason’s journey in entrepreneurship began in Toronto” opens the interview summary. — locations: body — fix: The opening is guest biography rather than a direct answer about GoGloby’s services; this is a podcast page, so assess against its editorial purpose. — source: Glossary §9
✅ **D4** Press and partners — evidence: “Full Podcast Episode on Spotify” labels the episode content. — locations: h2 — count: 1 — source: Page content

## E. Positioning

✅ **E1** Service fit — evidence: none — locations: body — count: 0 — fix: The page discusses tofu’s hiring platform, not GoGloby’s recruiting or staffing services. — source: Fact Sheet: Services
✅ **E2** Positioning — evidence: “tofu, a unique marketplace” makes clear the hiring model discussed belongs to the guest’s company. — locations: body — count: 1 — source: Fact Sheet: Services
⚠️ **E3** Call to action — evidence: “Latest podcasts” links to other episodes. — locations: h2, link_text — count: 6 — fix: The supplied internal links are to podcast episodes; no service-page links are shown. — source: decisions.md: Service pages
⚠️ **E4** Lead order — evidence: “Listen Up” and “Watch Now” are episode prompts. — locations: h2 — count: 2 — fix: The page’s calls to action are episode-focused rather than service-conversion prompts; retain or revise according to the podcast page’s purpose. — source: Glossary §7

## F. GEO

✅ **F1** Answer first — evidence: “Jason Zoltak, Co-Founder & CEO at tofu” names the interview subject. — locations: h1, body — count: 1 — source: Page content
✅ **F2** Buyer problem — evidence: “Jason’s journey in entrepreneurship began in Toronto” is about the guest. — locations: body — count: 1 — source: Page content
⚠️ **F3** Recruiting firm stated early — evidence: “within that short span, they’ve attracted over 115 venture-backed companies” is a claim about tofu. — locations: body — count: 1 — fix: Keep guest-company claims clearly attributed to the guest or tofu; they are not GoGloby facts. — source: Fact Sheet: Identity
⚠️ **F4** GoGloby named near claims — evidence: “aims to have 500 companies on the platform by June 2024” is a dated, forward-looking statement about tofu. — locations: body — count: 1 — fix: Review the dated future-tense claim for current editorial accuracy or clarify that it was stated at the time of the interview. — source: Page content
✅ **F5** FAQ — evidence: “September 27, 2024” gives a visible publication date. — locations: body — count: 1 — source: Page content
✅ **F6** Audience — evidence: informational — locations: title, h1, body — fix: This episode interview is informational editorial content, not a direct service landing page. — source: Glossary §9

## G. Target keyword

✅ **G1** Target keyword — evidence: none — locations: title, h1, body — count: 0 — fix: No supplied target keyword is specified for this podcast page; do not infer one from the page text. — source: Glossary §6
➖ **G2** Keyword placement — evidence: No target keyword from G1 — source: checklist: G2
⚠️ **G3** Trap terms in title or H1 — evidence: “Recruitment Model” appears in the title, but the page is about tofu’s model. — locations: title, h1 — count: 1 — fix: Do not treat the guest’s recruitment topic as a GoGloby service keyword target. — source: Glossary §6
➖ **G4** Competing pages — evidence: No target keyword — source: checklist: G4

## H. Recommendation

✅ **H1** Action — evidence: keep — locations: h1 — count: 1 — fix: The H1 accurately identifies the episode topic and guest; this is an editorial podcast page, not a service page. — source: Page content
✅ **H2** Priority — evidence: low — locations: h2 — count: 6 — fix: Headings are suitable for navigating an episode page, but the page has low priority for buyer-ready service content. — source: Glossary §9
✅ **H3** Reasons — evidence: The episode topic and guest are explicit in the H1 (A4). | The page has no meta description (A3). | The title exceeds the suggested length (A2). | No service-page links are present in the supplied links (A12). | The page is informational podcast content rather than a hire-ready service page (F6). — locations: title, meta, h1, body, link_text — count: 5 — fix: Prioritize metadata and service-linking improvements only if consistent with the editorial purpose of this podcast page. — source: audit.json: seo; checklist: A12; Glossary §9
