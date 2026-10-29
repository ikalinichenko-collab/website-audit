# Page report

- **URL:** https://gogloby.com/terms-and-conditions/
- **Type:** legal
- **Action:** fix
- **Priority:** medium

## First paragraph

GoGloby LLC Effective Date: June 2, 2026Last Updated: June 2, 2026 These Terms and Conditions (the “Terms”) govern your access to and use of the website located at gogloby.com and any related pages, subdomains, and content operated by GoGloby LLC (collectively, the “Website”). GoGloby LLC is referred to in these Terms as “GoGloby,” “we,” “us,” or “our,” and any person who accesses or uses the Website is referred to as “you” or “user.” Please read these Terms carefully. By accessing

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 24 characters: "Terms of Service | Globy..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
✅ **A3** Meta description length — evidence: 122 characters — locations: meta — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/terms-and-conditions/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#f8949d9f9994b89f979f94979a81d69b9795 (404) — locations: link_text — count: 1 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: Organization node found: "name":"GoGloby". | "slogan":"Applied AI Engineering Partner". — locations: schema — count: 6 — fix: Correct the Organization fields that conflict with the approved identity and review unverified profile and contact details. — source: decisions.md: Company description; Spelling; Official profiles; GoGloby Fact Sheet: Identity; Official profiles
  ❌ _Organization 1 — slogan_ — "slogan":"Applied AI Engineering Partner". — locations: schema — count: 1 — fix: Remove or correct the slogan to match the approved company description.
  ❌ _Organization 1 — legalName_ — "legalName":"Gogloby LLC". — locations: schema — count: 1 — fix: Correct the legal name to match the Fact Sheet.
  ❌ _Organization 1 — description_ — "description":"We are a US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire the world's most thoroughly vetted talent within the US & EU time zones." — locations: schema — count: 1 — fix: Replace the conflicting description with the approved description verbatim.
  ⚠️ _Organization 1 — email_ — "email":"hr@gogloby.com". — locations: schema — count: 1 — fix: Verify the Organization email against the official company contact information.
  ❌ _Organization 1 — knowsAbout_ — "knowsAbout":["Applied AI Engineering Partner","Applied AI Engineering" — locations: schema — count: 1 — fix: Remove outdated or disallowed positioning terms from knowsAbout.
  ⚠️ _Organization 1 — sameAs_ — "https://www.trustpilot.com/review/gogloby.com" | "https://www.designrush.com/agency/profile/gogloby" — locations: schema — count: 1 — fix: Verify profile URLs against the approved profiles list and remove unverified entries.
❌ **B3** Person data — evidence: "description":"Co-founder & CTO of GoGloby. Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system." | "description":"Co-founder of GoGloby. For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe — generating $60M+ in value." — locations: schema — count: 2 — fix: Review each Person description and knowsAbout against approved founder information; remove unsupported or disallowed positioning and claims. — source: decisions.md: Founders; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — "description":"Co-founder & CTO of GoGloby. Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system." | "knowsAbout":["Agentic SDLC","Applied AI Engineering","Multi-agent systems","Secure AI development environments"] — locations: schema — count: 1 — fix: Align the description and knowsAbout with approved founder information and remove disallowed positioning.
  ❌ _Vit Koval_ — "description":"Co-founder of GoGloby. For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe — generating $60M+ in value." | "knowsAbout":["Applied AI Engineering Partnerships","Engineering team scaling","Nearshore AI talent","Agentic SDLC adoption"] — locations: schema — count: 1 — fix: Align the founder name, description, and knowsAbout with approved founder information; remove unsupported claims and disallowed positioning.
❌ **B4** Schema matches the page — evidence: Visible page: "Any provision of services by GoGloby is governed exclusively by a separate written agreement signed by both parties". | Schema: "name":"Applied AI Engineering"; "description":"GoGloby turns engineering into AI-native production." — locations: schema, body — count: 1 — fix: Remove or correct service schema that describes offers and claims not presented on this legal page; ensure schema reflects the visible page. — source: GoGloby Fact Sheet: Services; decisions.md: Company description

## C. Wording

❌ **C1** Banned phrases — evidence: AI Intelligence Layer: "Agentic Workflow","AI Intelligence Layer (engineering teleme | AI-native production: ns engineering into AI-native production. It puts Claude int — locations: schema — count: 12 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer. Remove or rephrase "AI-native production". Replace "Applied AI Engineering partner" with the approved company description. — source: audit.json: exact_phrases
  ❌ _AI Intelligence Layer_ — "Agentic Workflow","AI Intelligence Layer (engineering teleme | "Agentic Workflow","AI Intelligence Layer","AI development in — locations: schema — count: 3 — fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer.
  ✅ _Performance Dashboard_
  ✅ _Performance Center_
  ✅ _Secure Development Environment_
  ✅ _AI Engineering Visibility_
  ✅ _AI Cost Management_
  ✅ _safe AI adoption_
  ❌ _AI-native production_ — ns engineering into AI-native production. It puts Claude int | ng engineering into AI-native production: every AI dollar vi — locations: schema — count: 2 — fix: Remove or rephrase "AI-native production".
  ❌ _Applied AI Engineering partner_ — 1-01.png","slogan":"Applied AI Engineering Partner","description":"We | en"],"knowsAbout":["Applied AI Engineering Partner","Applied AI Engine — locations: schema — count: 6 — fix: Replace "Applied AI Engineering partner" with the approved company description.
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
✅ **C2** Context terms — evidence: "Terms and Conditions" — count: 0 — source: Glossary §7
❌ **C3** Brand spelling — evidence: Terms of Service | Globy | erms of service for Globy. Understand the rul — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
❌ **C5** Em dash — evidence: 2 em dash(es) found. — locations: body — count: 2 — fix: Replace em dashes with commas or periods. — source: Glossary §9

## D. Facts

❌ **D1** Company facts — evidence: "GoGloby LLC is a company founded in 2021, operating in the AI and software development industry." — locations: body — count: 1 — fix: Correct the company-industry description so it does not characterize GoGloby as a software development business. — source: GoGloby Fact Sheet: Identity (What GoGloby is not)
  ❌ _Company industry_ — Page: "operating in the AI and software development industry." | Fact Sheet: "Not a software development shop, not an outsourcing firm, not a freelance marketplace." — locations: body — count: 1 — fix: Correct the industry statement to reflect GoGloby's staffing and recruiting business.
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: Schema award: "Clutch TOP Applied AI Engineering Partner 2025". — locations: schema — count: 1 — source: GoGloby Fact Sheet: External recognition
  ✅ _Clutch award_ — "Clutch TOP Applied AI Engineering Partner 2025". — locations: schema — count: 1

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
❌ **E2** Positioning — evidence: "operating in the AI and software development industry" — locations: body — count: 1 — fix: Change the description of GoGloby’s industry so it does not present the company as a software development business. — source: Fact Sheet: Identity — What GoGloby is not; Glossary §1 — What GoGloby is not
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

✅ **F1** Answer first — evidence: “These Terms and Conditions (the ‘Terms’) govern your access to and use of the website located at gogloby.com and any related pages, subdomains, and content operated by GoGloby LLC (collectively, the ‘Website’).” | “GoGloby LLC is referred to in these Terms as ‘GoGloby,’ ‘we,’ ‘us,’ or ‘our,’ and any person who accesses or uses the Website is referred to as ‘you’ or ‘user.’” — locations: first_paragraph — count: 2 — source: Page first paragraph; checklist: F1
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **F4** GoGloby named near claims — evidence: “GoGloby LLC is a company founded in 2021” | “Any provision of services by GoGloby is governed exclusively by a separate written agreement” — locations: body — count: 2 — source: Page body, sections 1 and 9; checklist: F4
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **F6** Audience — value: informational — evidence: “These Terms and Conditions (the ‘Terms’) govern your access to and use of the website” | “The Website is provided for general informational purposes” — locations: first_paragraph, body — count: 2 — source: Glossary §§5, 9; page first paragraph and body, section 1

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G4** Competing pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## H. Recommendation

ℹ️ **H1** Action — value: fix — evidence: Title: “Terms of Service | Globy” | Page: “operating in the AI and software development industry.” — locations: title, body — count: 2 — fix: Correct the former company name in the title and review the industry description for accuracy. — source: decisions.md, Spelling; Fact Sheet, Identity and “What GoGloby is not”
ℹ️ **H2** Priority — value: medium — evidence: Title: “Terms of Service | Globy” | Page: “operating in the AI and software development industry.” — locations: title, body — count: 2 — fix: Address the brand-name and company-description accuracy issues. — source: decisions.md, Spelling; Fact Sheet, Identity and “What GoGloby is not”
ℹ️ **H3** Reasons — value: F4: Claims in the page body identify GoGloby by name; F6: The page provides legal website terms, not hiring-oriented content. — evidence: “Any provision of services by GoGloby is governed exclusively by a separate written agreement” | “These Terms and Conditions (the ‘Terms’) govern your access to and use of the website” — locations: body, first_paragraph — count: 2 — source: Checklist: F4, F6; page body and first paragraph
