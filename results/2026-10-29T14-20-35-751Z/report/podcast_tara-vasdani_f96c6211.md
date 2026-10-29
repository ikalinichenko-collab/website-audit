# Page report

- **URL:** https://gogloby.com/podcast/tara-vasdani/
- **Type:** podcast
- **Action:** fix
- **Priority:** medium

## First paragraph

Default Global Episode #18 with Tara Vasdani, Managing Partner at Remote Law Canada

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 85 characters: "EORs and Digital Nomads: Redefining Glob..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/tara-vasdani/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
✅ **A8** Dates — evidence: 2023-06-13T15:42:35+03:00 | 2024-01-15T15:48:41+03:00 — locations: schema — source: audit.json: requirements_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: PodcastEpisode, BreadcrumbList | Found: Organization, ImageObject, Brand, PostalAddress, ContactPoint, Person, QuantitativeValue, AggregateRating, OfferCatalog, Offer, Service, BusinessAudience, WebSite, Article — locations: schema — fix: Add JSON-LD types: PodcastEpisode, BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: Title: “EORs and Digital Nomads: Redefining Global Hiring Legally with Tara Vasdani | GoGloby” | Organization schema name: “GoGloby” — locations: title, schema — count: 1 — source: decisions.md — Company description, Spelling; GoGloby Fact Sheet — Identity
  ✅ _Organization node — GoGloby_ — Title: “EORs and Digital Nomads: Redefining Global Hiring Legally with Tara Vasdani | GoGloby” | Organization schema name: “GoGloby” — locations: title, schema — count: 1
❌ **B3** Person data — evidence: Person schema name: “Vit Koval” — locations: schema — count: 1 — fix: Add or correct the Person node’s founder job title and sourced description; verify its other source-comparable fields. — source: decisions.md — Founders, Official profiles; GoGloby Fact Sheet — Founders, Official profiles (sameAs)
  ❌ _Vit Koval_ — Person schema name: “Vit Koval” — locations: schema — count: 1 — fix: The Person node omits the approved “Co-Founder” job title and sourced description. Check knowsAbout against the founder information; no sameAs is present, and the Fact Sheet lists no available LinkedIn profile for Vit.
⚠️ **B4** Schema matches the page — evidence: Visible interview question: “What are some of the most common misconceptions companies have about remote work, and how do you help them overcome them from a legal perspective?” | Schema types reported: “Organization, ImageObject, Brand, PostalAddress, ContactPoint, Person, QuantitativeValue, AggregateRating, OfferCatalog, Offer, Service, BusinessAudience, WebSite, Article” — locations: body, schema — fix: Verify that any FAQPage questions match the visible interview content and that Service schema describes a service actually presented on this page. — source: Page content and supplied code_check_results — B1 schema types

## C. Wording

✅ **C1** Banned phrases — evidence: No banned phrases found. — source: audit.json: exact_phrases
  ✅ _AI Intelligence Layer_
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ✅ _AI Engineering Visibility_
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ✅ _AI-native production_
  ✅ _Applied AI Engineering partner_
  ✅ _Applied AI Company_
  ✅ _AI Production Engineering_
  ✅ _AI Leadership Search_
  ✅ _every AI dollar visible_
  ✅ _AI talent staffing_
  ✅ _Staffing gives capacity_
  ✅ _owns outcomes_
  ✅ _free trial_
  ✅ _hire in 48 hours_
  ✅ _mid-level_
  ✅ _mid level_
➖ **C2** Context terms — count: 0 — source: GoGloby Glossary §7 — Terms and claims we do not use
✅ **C3** Brand spelling — evidence: Brand spelling "GoGloby" is consistent. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

➖ **D1** Company facts — evidence: Visible page content: “Tara Vasdani, Managing Partner at Remote Law Canada” — locations: body — count: 0 — source: GoGloby Fact Sheet — Identity, Services, How we vet, Key metrics
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D4** Press and partners — evidence: Visible page content: “Tara now assists organizations in navigating the legal landscape of remote work” — locations: body — count: 0 — source: GoGloby Fact Sheet — External recognition

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E2** Positioning — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

❌ **F1** Answer first — evidence: Title asks about “EORs and Digital Nomads: Redefining Global Hiring Legally with Tara Vasdani”; opening identifies the episode as “Default Global Episode #18 with Tara Vasdani, Managing Partner at Remote Law Canada,” but does not answer the title question in the first two sentences. — locations: title, first_paragraph — fix: Revise the opening so its first two sentences directly answer the title question and stand alone as a summary. — source: Checks for LLM call 3 — F1; GoGloby Glossary §9
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
❌ **F4** GoGloby named near claims — evidence: The article attributes advice to “Tara” and uses first-person-free phrasing such as “Tara highlights,” without naming GoGloby alongside the article’s key claims. — locations: body — fix: Review key claims and quoted fragments to ensure they identify GoGloby where company attribution is needed; distinguish the guest’s advice from company claims. — source: Checks for LLM call 3 — F4
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **F6** Audience — value: informational — evidence: The page focuses on explaining remote-work law, digital nomads, and EOR compliance: “Tara highlights that the global shift towards remote work significantly affects employment laws and regulations.” — locations: title, h1, body — fix: Assess whether this informational episode page should be reframed to serve the intended hiring-buyer audience. — source: GoGloby Glossary §5, §9

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

ℹ️ **H1** Action — value: fix — evidence: The page has substantial podcast/interview content, including “Full Podcast Episode on Spotify” and “Quick Read: Tara Vasdani … Interview Highlights”; it is not thin or empty. | The opening does not answer the title question, and the page has no meta description according to the supplied code evidence. — locations: first_paragraph, meta — fix: Correct the opening and address the missing meta description while retaining the podcast page topic. — source: Checks for LLM call 3 — Rules for H1; GoGloby Glossary §9
ℹ️ **H2** Priority — value: medium — evidence: The page is an existing podcast episode with a “Full Podcast Episode on Spotify” link and substantive interview highlights, but its content is informational rather than aimed at buyers ready to hire. — locations: body — fix: Prioritize improving the opening and search snippet; preserve the episode’s useful interview content. — source: Checks for LLM call 3 — H2; GoGloby Glossary §9
ℹ️ **H3** Reasons — value: F1: opening does not answer the title question; F4: key claims lack clear GoGloby attribution; F6: informational rather than buyer-ready audience; A3: missing meta description; C5: two em dashes — evidence: The first paragraph identifies “Default Global Episode #18 with Tara Vasdani” but does not answer the title question. | Code evidence reports “Missing meta description.” | Code evidence reports “2 em dash(es) found.” — locations: first_paragraph, meta, body — fix: Address the opening, attribution, meta description, and em-dash issues; keep the episode’s informational subject intact. — source: Checks for LLM call 3 — H3; GoGloby Glossary §9
