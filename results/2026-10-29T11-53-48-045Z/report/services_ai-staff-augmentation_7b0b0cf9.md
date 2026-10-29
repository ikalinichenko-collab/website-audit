# Page report

- **URL:** https://gogloby.com/services/ai-staff-augmentation/
- **Type:** service
- **Action:** needs_decision
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
❌ **B2** Organization data — evidence: legalName: "Gogloby LLC" | slogan: "Applied AI Engineering Partner" — locations: schema — count: 3 — fix: Correct the Organization node’s legalName, slogan, and description to match approved company facts and positioning. — source: decisions.md: Company description; GoGloby Fact Sheet §Identity
  ❌ _Organization legalName mismatch_ — "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name spelling and value in the Organization node.
  ❌ _Organization slogan mismatch_ — "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove or revise the Organization slogan to comply with approved positioning.
  ❌ _Organization description mismatch_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies..." — locations: schema — count: 1 — fix: Replace the Organization description with the approved company description.
✅ **B3** Person data — evidence: Code evidence: no Person nodes supplied for this check. — locations: schema — count: 0 — source: code_check_results: person_nodes; b3_person_evidence
❌ **B4** Schema matches the page — evidence: "reviewCount":4.9 — locations: schema — count: 1 — fix: Correct or remove the review count value; it is not supported by the Fact Sheet. — source: GoGloby Fact Sheet §External recognition

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: ed feature from the AI Intelligence Layer, grounded in what a | AI-native production: ns engineering into AI-native production. It puts Claude int — locations: body, schema — count: 21 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Remove or rephrase "AI-native production". Replace "Applied AI Engineering partner" with the approved company description. — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — ed feature from the AI Intelligence Layer, grounded in what a | Your Perimeter The AI Intelligence Layer deploys in your VPC — locations: body, schema — count: 7 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ✅ _AI Engineering Visibility_
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ns engineering into AI-native production. It puts Claude int | ng engineering into AI-native production: every AI dollar vi — locations: schema — count: 2 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — A long-term GoGloby Applied AI Engineering partner. K Gaming KEYWORDS | A long-term GoGloby Applied AI Engineering partner. N Oil & Gas NOVILA — locations: body, schema — count: 11 — fix: Replace "Applied AI Engineering partner" with the approved company description.
  ✅ _Applied AI Company_
  ✅ _AI Production Engineering_
  ✅ _AI Leadership Search_
  ❌ _every AI dollar visible_ — -native production: every AI dollar visible, every feature ship — locations: schema — count: 1 — fix: Remove or rephrase "every AI dollar visible".
  ✅ _AI talent staffing_
  ✅ _Staffing gives capacity_
  ✅ _owns outcomes_
  ✅ _free trial_
  ✅ _hire in 48 hours_
  ✅ _mid-level_
  ✅ _mid level_
❌ **C2** Context terms — evidence: Contact Us: "walk you through the Benchmark" | FAQ: "What does the Benchmark include?" — locations: body, meta, h2 — count: 24 — fix: Remove or revise the context-term occurrences that conflict with Glossary §7, including Benchmark as the main call to action and prohibited positioning or offer terminology. — source: GoGloby Glossary §7; context_term_occurrences
  ❌ _Benchmark occurrence: Contact Us_ — "walk you through the Benchmark" — locations: body — count: 1 — fix: Remove the Benchmark reference as the CTA or main offer.
  ❌ _Benchmark occurrence: FAQ heading_ — "What does the Benchmark include?" — locations: body — count: 1 — fix: Remove the Benchmark offer and FAQ framing.
  ❌ _Benchmark occurrence: FAQ answer_ — "Every engagement starts with the Benchmark" — locations: body — count: 1 — fix: Remove the Benchmark offer description.
  ❌ _Claude Certified Architect occurrence: meta_ — "vetted Claude Certified Architects" — locations: meta — count: 1 — fix: Remove the prohibited credential/offer term from the meta description.
  ❌ _Claude Certified Architect occurrence: h2_ — "How We Forward-Deploy a Claude Certified Architect" — locations: h2 — count: 1 — fix: Remove the prohibited positioning term from the heading.
  ❌ _Claude Certified Architect occurrence: body_ — "Forward-Deployed Claude Certified Architects" — locations: body — count: 11 — fix: Remove the prohibited credential/offer term from body copy and FAQ content.
  ❌ _AI Solutions Architect occurrence: body_ — "AI Solutions Architects" — locations: body — count: 6 — fix: Remove use of this term as positioning or as an offer; retain it only where it is a role being recruited or staffed.
  ❌ _Forward-Deployed Engineering occurrence: h2_ — "How Forward-Deployed Engineering Works" — locations: h2 — count: 1 — fix: Remove this term as positioning or an offer.
  ❌ _Forward-Deployed Engineering occurrence: body_ — "How Forward-Deployed Engineering Works" — locations: body — count: 1 — fix: Remove this term as positioning or an offer.
❌ **C3** Brand spelling — evidence: Globy","legalName":"Gogloby LLC","url":"https:/ — locations: schema — count: 1 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 10 em dash(es) found. — locations: body — count: 10 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "Vetted profiles delivered in 72 hours" — locations: body, schema — count: 1 — fix: Remove or substantiate service timing and performance claims that are not supported by the approved source facts. — source: GoGloby Fact Sheet §Services; GoGloby Glossary §2
  ❌ _Unsupported timing and delivery claims_ — "Vetted Profiles In 3 To 5 Business Days" | "median time to first production commit of 23 days" — locations: body, schema — count: 1 — fix: Verify the timing claims against approved company records or remove them.
❌ **D2** Client figures — evidence: HASBRO: "$4.7B revenue" | DR. CHRONO: "$3B+ medical claims annually" — locations: body — count: 13 — fix: Verify each displayed client metric against the Fact Sheet and correct conflicts; remove figures that cannot be verified. See individual items. — source: GoGloby Fact Sheet §Featured clients; decisions.md §Clients
  ❌ _Hasbro client metrics_ — "HASBRO NYSE · $13.4B market cap · $4.7B revenue" — locations: body — count: 1 — fix: Reconcile the displayed revenue and market-cap figures with the Fact Sheet or remove unverified metrics.
  ❌ _DrChrono client metrics_ — "DR. CHRONO 17M+ patients · $3B+ medical claims annually" — locations: body — count: 1 — fix: Reconcile the patient and claims figures with the Fact Sheet; remove or verify any unsupported figures.
  ❌ _EverCommerce client metrics_ — "EVERCOMMERCE Nasdaq-listed SaaS · $1.98B market cap · 700,000+ business clients" — locations: body — count: 1 — fix: Verify the displayed market-cap and client metrics against the Fact Sheet and correct or remove discrepancies.
  ❌ _Keywords Studios client metrics_ — "KEYWORDS $2.8B EQT acquisition · $844M revenue · 13,000 employees" — locations: body — count: 1 — fix: Reconcile the acquisition, revenue, and employee figures with the Fact Sheet or remove unverified metrics.
  ❌ _MikeWorldWide client metrics_ — "MikeWorldWide ... $57M fee income · 230+ staff" — locations: body — count: 1 — fix: Verify the fee-income and staff figures or remove them.
  ❌ _TATA client metrics_ — "TATA $106B market cap · $30B revenue · 600,000+ employees" — locations: body — count: 1 — fix: Correct or remove the market-cap figure and reconcile the revenue and employee figures with the Fact Sheet.
  ⚠️ _Canopy client metrics_ — "CANOPY Series F · $236.5M raised" — locations: body — count: 1 — fix: Confirm that the displayed funding figure is still approved for publication.
  ❌ _Sydecar client metrics_ — "SYDECAR $3B+ AUA" — locations: body — count: 1 — fix: Reconcile the assets-under-administration figure with the Fact Sheet or remove it.
  ❌ _Novilab client metrics_ — "NOVILAB Series B · $46M raised" — locations: body — count: 1 — fix: Verify the displayed client relationship and funding metric against an approved source or remove them.
  ❌ _Bonusly client metrics_ — "BONUSLY Series B · $32.4M raised · 3,400+ clients" — locations: body — count: 1 — fix: Reconcile the funding and client figures with the Fact Sheet or remove unverified metrics.
  ❌ _Every.io client metrics_ — "EVERY $32M raised · $60M+ payroll processed" — locations: body — count: 1 — fix: Verify the payroll-processed figure and reconcile the funding figure with the Fact Sheet.
  ❌ _Alchemy Health client metrics_ — "ALCHEMY $31M seed · 25M+ prescriptions" — locations: body — count: 1 — fix: Reconcile the funding and prescription figures with the Fact Sheet or remove unverified metrics.
  ❌ _Devsisters client metrics_ — "DEVSISTERS Public · $299M market cap · 200M+ users" — locations: body — count: 1 — fix: Reconcile the market-cap and user figures with the Fact Sheet or remove unverified metrics.
❌ **D3** Clients not in the Fact Sheet — evidence: alt="GitLab", file_name="logo-gitlab-1-grayscale.png" | alt="Pandora", file_name="logo-pandora-1-grayscale.png" — locations: image_alt, body — count: 4 — fix: Remove or verify the client presentation for companies not listed as clients in the Fact Sheet; the listed companies should not be represented as clients without confirmation. — source: GoGloby Fact Sheet §Selected clients; §Featured clients; main_content_images
  ❌ _GitLab_ — Image alt="GitLab", file_name="logo-gitlab-1-grayscale.png" — locations: image_alt — count: 1 — fix: Verify that GitLab is an approved client or remove the client logo.
  ❌ _Pandora_ — Image alt="Pandora", file_name="logo-pandora-1-grayscale.png" — locations: image_alt — count: 1 — fix: Verify that Pandora is an approved client or remove the client logo.
  ❌ _Disney_ — Image alt="Disney", file_name="logo-disney-1-grayscale.png" — locations: image_alt — count: 1 — fix: Verify that Disney is an approved client or remove the client logo.
  ❌ _Novilab_ — "NOVILAB ... An active GoGloby Applied AI Engineering engagement." — locations: body — count: 1 — fix: Verify that Novilab is an approved client or remove its client presentation.
❌ **D4** Press and partners — evidence: "Every engagement starts with the Benchmark: a fixed fee for one month" — locations: body — count: 1 — fix: Remove or verify the Benchmark fee and engagement claims; they are not in the approved service facts. — source: GoGloby Fact Sheet §Services; GoGloby Glossary §§2, 7
  ❌ _Benchmark fee and offer claim_ — "a fixed fee for one month" — locations: body — count: 1 — fix: Remove or verify the stated fee and offer details.

## E. Positioning

❌ **E1** Service fit — evidence: E1 service fit label: off-target; "Claude Certified Architects" — locations: title, h1, body — count: 1 — fix: Align the page’s service description with the approved Nearshore Data & AI Engineers Staffing service and its scope. — source: decisions.md §Service pages; GoGloby Fact Sheet §Services
❌ **E2** Positioning — evidence: "You receive filtered profiles with their full assessment record." — locations: body — count: 1 — fix: Align the staffing workflow and claims with approved service information. — source: GoGloby Fact Sheet §Services; GoGloby Glossary §2
❌ **E3** Call to action — evidence: "US-based Established software companies (100 to 3,000 employees)" — locations: schema — count: 1 — fix: Align the stated audience with the approved Ideal Customer Profile and service buyer. — source: GoGloby Fact Sheet §Ideal Customer Profile; §Services
❌ **E4** Lead order — evidence: "Claude Certified Architect embeds in under 4 weeks" — locations: meta, body — count: 1 — fix: Remove or substantiate service timing and credential claims not present in the approved service description. — source: GoGloby Fact Sheet §Services; GoGloby Glossary §7

## F. GEO

❌ **F1** Answer first — evidence: "AI Staff Augmentation for Business-Critical Software" — locations: title, h1 — count: 1 — fix: Align the page title and heading with the approved service name and service scope. — source: decisions.md §Service pages; GoGloby Fact Sheet §Services
❌ **F2** Buyer problem — evidence: "Forward-deploy vetted Claude Certified Architects" — locations: meta — count: 1 — fix: Remove prohibited positioning and unsupported service claims from the meta description. — source: GoGloby Glossary §§7, 9
❌ **F3** Recruiting firm stated early — evidence: "Extra hands do not fix the real constraint." — locations: body — count: 1 — fix: Remove copy that argues against staffing, which is a service GoGloby sells. — source: GoGloby Glossary §7
❌ **F4** GoGloby named near claims — evidence: "No hourly billing, no minimum term." — locations: body — count: 1 — fix: Verify the contract and engagement terms against the approved service facts or remove unsupported details. — source: GoGloby Fact Sheet §Services
❌ **F5** FAQ — evidence: "The Benchmark" — locations: body — count: 1 — fix: Remove the prohibited Benchmark CTA and offer references. — source: GoGloby Glossary §7
❌ **F6** Audience — evidence: buyer_ready | "Submit your information to schedule a technical briefing." — locations: body — count: 1 — fix: Refocus the page on buyers ready to hire through the approved staffing service; remove the Benchmark framing. — source: GoGloby Glossary §§7, 9

## G. Target keyword

❌ **G1** Target keyword — evidence: none | "AI Staff Augmentation for Business-Critical Software" — locations: title, h1 — count: 1 — fix: Align the title and heading with the approved primary service and role terminology. — source: GoGloby Glossary §§3, 6
⚠️ **G2** Keyword placement — evidence: title: no | h1: no | h2: no | meta: no | first_paragraph: no — fix: Place target keyword in title, H1, H2, meta, and first paragraph. — source: checklist: G2
❌ **G3** Trap terms in title or H1 — evidence: "AI Staff Augmentation" — locations: title, h1, schema — count: 1 — fix: Use the approved service naming and ensure the page is consistent with the approved service-page URL mapping. — source: decisions.md §Service pages; GoGloby Glossary §7
✅ **G4** Competing pages — evidence: No competing pages for this keyword — source: checklist: G4

## H. Recommendation

❌ **H1** Action — evidence: reposition | "The Embedded Model" | "You Direct the Work" | "Vetted Profiles In 3 To 5 Business Days" — locations: body — count: 1 — fix: Rework the page structure to describe the approved staffing service and remove off-scope positioning, offer terms, and unsupported claims. — source: GoGloby Fact Sheet §Services; GoGloby Glossary §§2, 7, 9
❌ **H2** Priority — evidence: high | "Forward-Deployed Claude Certified Architects" | "AI Solutions Architects" | "Benchmark" — locations: title, meta, h1, h2, body — count: 1 — fix: Prioritize corrections to service positioning and prohibited terms, followed by unverified client and performance claims. — source: GoGloby Glossary §§7, 9; GoGloby Fact Sheet §§Services, Featured clients
❌ **H3** Reasons — evidence: Page positioning does not match the approved Nearshore Data & AI Engineers Staffing service. | Page uses prohibited positioning and offer terms, including “Claude Certified Architect” and “Benchmark.” | The page includes client companies and client metrics that are unsupported, conflicting, or absent from the Fact Sheet. — locations: title, meta, h1, h2, body, schema, image_alt — count: 3 — fix: Correct service alignment first, then remove prohibited terminology and verify client claims and figures. — source: decisions.md §§Service pages, Clients; GoGloby Fact Sheet §§Services, Featured clients; GoGloby Glossary §§7, 9
