# Page report

- **URL:** https://gogloby.com/podcast/philippe-noel/
- **Type:** podcast
- **Action:** fix
- **Priority:** medium

## First paragraph

Default Global Episode #109 with Philippe Noël, Co-founder & CEO at ParadeDB

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 80 characters: "How to Join YC, Raise $2M, and Land Fort..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: Missing meta description — locations: meta — fix: Add meta description (120-158 characters). — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/podcast/philippe-noel/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
✅ **A8** Dates — evidence: 2024-07-01T13:04:05+03:00 | 2024-09-27T14:56:49+03:00 — locations: schema — source: audit.json: requirements_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
✅ **A11** Broken internal links — evidence: No broken internal links — count: 0 — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

❌ **B1** Expected schema types — evidence: Missing: PodcastEpisode, BreadcrumbList | Found: Organization, ImageObject, Brand, PostalAddress, ContactPoint, Person, QuantitativeValue, AggregateRating, OfferCatalog, Offer, Service, BusinessAudience, WebSite, Article — locations: schema — fix: Add JSON-LD types: PodcastEpisode, BreadcrumbList. — source: audit.json: requirements_by_type
✅ **B2** Organization data — evidence: Organization node name: “GoGloby” matches the company name in the source. | No other Organization node is supplied. — locations: schema — count: 2 — source: decisions.md: Spelling; GoGloby Fact Sheet: Identity
  ✅ _Organization 1 — name_ — Schema: “GoGloby”; approved name: “GoGloby”. — locations: schema — count: 1
  ➖ _Organization 1 — legalName_ — No legalName is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — description_ — No description is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — slogan_ — No slogan is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — url_ — No url is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — logo_ — The node provides a logo URL, but no approved logo URL is given in the supplied sources. — locations: schema — count: 1
  ➖ _Organization 1 — sameAs_ — No sameAs is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — address_ — No address is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — founders and jobTitle_ — No founders or jobTitle are present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — foundingDate_ — No foundingDate is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — telephone_ — No telephone is present in the supplied Organization node. — locations: schema — count: 0
  ➖ _Organization 1 — knowsAbout_ — No knowsAbout is present in the supplied Organization node. — locations: schema — count: 0
✅ **B3** Person data — evidence: Person node: “Vit Koval”; no jobTitle, description, knowsAbout, or sameAs values are present to conflict with the sources. — locations: schema — count: 1 — source: decisions.md: Founders, Official profiles; GoGloby Fact Sheet: Founders, Official profiles
  ✅ _Vit Koval_ — Person node name: “Vit Koval”; approved founder name: “Vitaly (Vit) Koval”. | Person fields jobTitle, description, knowsAbout, and sameAs are absent. — locations: schema — count: 1
⚠️ **B4** Schema matches the page — evidence: The page text includes “Navigating the Entrepreneurial Journey: Insights from Philippe Noël” and the schema inventory includes an Article, but no FAQ questions or Service schema details are supplied for comparison. — locations: body, schema — fix: Verify that any FAQPage questions are visible on the page and that Service schema, if present, accurately describes a visible service; inspect all schema claims against the page. — source: Page audit data: body; code_check_results B1 (schema types found)

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
✅ **C2** Context terms — evidence: “global hiring, remote work” — no Glossary §7 prohibited context-term use identified; code reports no context-term occurrences. — count: 0 — source: GoGloby Glossary §7 — Terms and claims we do not use
✅ **C3** Brand spelling — evidence: Brand spelling "GoGloby" is consistent. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: h2, body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

✅ **D1** Company facts — evidence: The body describes Philippe Noël and ParadeDB; no GoGloby company facts or metrics are stated in the supplied page text. — locations: body — count: 0 — source: GoGloby Fact Sheet: Identity, Services, How we vet, Key metrics, Legal and security; page body
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: The page mentions “Y Combinator” as ParadeDB's backer; no GoGloby press, partner, or award claims are present in the supplied page text. — locations: body — count: 0 — source: GoGloby Fact Sheet: External recognition; page body

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E2** Positioning — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

❌ **F1** Answer first — evidence: Title: “How to Join YC, Raise $2M, and Land Fortune 500 Clients After Setbacks.” | Opening: “Default Global Episode #109 with Philippe Noël, Co-founder & CEO at ParadeDB.” — locations: title, first_paragraph — count: 2 — fix: Revise the opening so its first two sentences directly answer the question posed by the title and can stand alone. — source: Glossary §9, Answer first
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
❌ **F4** GoGloby named near claims — evidence: “We just wanted to get the best people, wherever they live.” | “Today, I had the pleasure of hosting Philippe Noël” — locations: body — count: 2 — fix: Name GoGloby in key claim passages that currently rely on “we” or “I” without identifying the company. — source: Checks for LLM call 3, F4
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **F6** Audience — value: informational — evidence: “Advice for YCombinator Aspiring Founders” | “his insights are invaluable” — locations: title, h2, body — fix: Reassess the page's audience and framing against the buyer-ready guidance. — source: Glossary §§5, 9

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

ℹ️ **H1** Action — value: fix — evidence: The title promises “How to Join YC,” while the page focuses on an interview with Philippe Noël about his founder journey. | The content is an episode page: “Full Podcast Episode on Spotify.” — locations: title, h1, body — fix: Edit the title and opening, add the missing meta description and relevant service-page links, and review the podcast schema. — source: Checks for LLM call 3, H1 rules; supplied code results A2, A3, A12, B1
ℹ️ **H2** Priority — value: medium — evidence: The title is 80 characters: “How to Join YC, Raise $2M, and Land Fortune 500 Clients After Setbacks.” | “No link to staffing or recruiting service pages” — locations: title, meta, body, schema — fix: Prioritize edits to the title, meta description, service links and podcast schema; the page is a podcast episode rather than a service page. — source: Supplied code results A2, A3, A12, B1; Checks for LLM call 3, H2
ℹ️ **H3** Reasons — value: F1: opening does not answer the title's question; F4: key passages use first-person language without naming GoGloby; F6: content is informational rather than buyer-ready; A2/A3/A12/B1: title length, missing meta description and service links, and missing podcast schema types need review. — evidence: Opening: “Default Global Episode #109 with Philippe Noël, Co-founder & CEO at ParadeDB.” | “We just wanted to get the best people, wherever they live.” | “No link to staffing or recruiting service pages”; “Missing: PodcastEpisode, BreadcrumbList” — locations: title, meta, first_paragraph, body, schema — fix: Address the listed opening, attribution, metadata, service-link and schema issues. — source: Checks for LLM call 3, F1/F4/F6; supplied code results A2, A3, A12, B1
