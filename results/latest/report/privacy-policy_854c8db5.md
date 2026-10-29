# Page report

- **URL:** https://gogloby.com/privacy-policy/
- **Type:** legal
- **Action:** fix
- **Priority:** low

## First paragraph

GoGloby LLC Effective Date: September 16, 2026Last Updated: September 16, 2026 GoGloby LLC (“GoGloby,” “we,” “us,” or “our”) respects your privacy and is committed to handling personal information responsibly, transparently, and in accordance with applicable privacy and data protection laws. This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information when you: visit or interact with gogloby.com and related GoGloby websites; submit a contact, inquiry, or application form; apply for a job,

## A. Technical SEO

✅ **A1** HTTP status — evidence: HTTP 200 — source: checklist: A1
❌ **A2** Title length — evidence: 22 characters: "Privacy Policy | Globy..." — locations: title — fix: Adjust title to 50-60 characters. — source: audit.json: seo
❌ **A3** Meta description length — evidence: 116 characters — locations: meta — fix: Adjust meta description to 120-158 characters. — source: audit.json: seo
✅ **A4** Exactly one H1 — evidence: 1 H1 — locations: h1 — source: audit.json: seo
✅ **A5** Canonical — evidence: https://gogloby.com/privacy-policy/ — locations: meta — source: checklist: A5
✅ **A6** Indexable — evidence: Indexable — source: checklist: A6
✅ **A7** Open Graph — evidence: og:title, og:description, og:image present — locations: meta — source: checklist: A7
➖ **A8** Dates — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **A9** Author — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **A10** Image alt text — evidence: All main images have alt — count: 0 — source: checklist: A10
❌ **A11** Broken internal links — evidence: https://gogloby.com/cdn-cgi/l/email-protection#0e667c4e69616962616c77206d6163 (404) | https://gogloby.com/cdn-cgi/l/email-protection#b7dfc5f7d0d8d0dbd8d5ce99d4d8da (404) — locations: link_text — count: 3 — fix: Fix or remove broken internal links. — source: checklist: A11
➖ **A12** Links to service pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## B. Structured data

✅ **B1** Expected schema types — evidence: Required types present:  — locations: schema — source: audit.json: requirements_by_type
❌ **B2** Organization data — evidence: schema: "legalName":"Gogloby LLC" | schema: "slogan":"Applied AI Engineering Partner" — locations: schema — count: 6 — fix: Correct the Organization fields that conflict with approved company facts and profile information; remove or verify unsupported values. — source: decisions.md: Company description; Spelling; Official profiles; GoGloby Fact Sheet: Identity; Official profiles (sameAs)
  ❌ _Organization 1 — legalName_ — schema: "legalName":"Gogloby LLC" — locations: schema — count: 1 — fix: Correct the legal name to match the Fact Sheet spelling.
  ❌ _Organization 1 — slogan_ — schema: "slogan":"Applied AI Engineering Partner" — locations: schema — count: 1 — fix: Remove the slogan that uses a prohibited company-positioning term.
  ❌ _Organization 1 — description_ — schema: "We are a US-based talent acquisition agency specializing in assisting tech companies..." — locations: schema — count: 1 — fix: Replace the Organization description with the approved description from decisions.md.
  ❌ _Organization 1 — email_ — schema: "email":"hr@gogloby.com" — locations: schema — count: 1 — fix: Verify the Organization email against the official company contact details.
  ⚠️ _Organization 1 — sameAs_ — schema includes "https://www.trustpilot.com/review/gogloby.com" | schema includes "https://www.designrush.com/agency/profile/gogloby" — locations: schema — count: 1 — fix: Verify profile URLs against the official profiles list and remove profiles that are not confirmed there.
  ❌ _Organization 1 — knowsAbout_ — schema includes "Applied AI Engineering Partner" | schema includes "AI Intelligence Layer (engineering telemetry)" — locations: schema — count: 1 — fix: Remove prohibited or outdated terms from the Organization knowsAbout field.
❌ **B3** Person data — evidence: Sergey Matikaynen: "Leads the Agentic SDLC methodology... Applied AI Engineering system." | Vit Koval: "generating $60M+ in value"; "Built the Applied AI Engineering system" — locations: schema — count: 2 — fix: Correct the Person descriptions and remove prohibited or unsupported claims from Person fields; verify profile URLs against approved sources. — source: decisions.md: Founders; Official profiles; GoGloby Fact Sheet: Founders; Glossary §7
  ❌ _Sergey Matikaynen_ — description: "Leads the Agentic SDLC methodology... technical architecture behind the Applied AI Engineering system." | sameAs: "https://www.linkedin.com/in/sergeymatikaynen/" — locations: schema — count: 1 — fix: Align the description with the approved founder information and verify the profile URL against the official profiles source.
  ❌ _Vit Koval_ — description: "generating $60M+ in value" and "Built the Applied AI Engineering system" | knowsAbout: "Applied AI Engineering Partnerships" — locations: schema — count: 1 — fix: Align the description and knowsAbout values with approved founder information, removing unsupported and prohibited claims.
❌ **B4** Schema matches the page — evidence: Visible page H1: "Privacy Policy and Candidate Privacy Notice" | schema offer: "name":"Applied AI Engineering" | schema service description: "GoGloby turns engineering into AI-native production." — locations: schema, h1 — count: 4 — fix: Remove or correct schema claims and service offers that do not describe the visible privacy-policy page; ensure any FAQPage or Service schema is supported by visible page content. — source: GoGloby Fact Sheet: Services; Glossary §7; page visible content

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
✅ **C2** Context terms — evidence: The page states: “GoGloby LLC (“GoGloby,” “we,” “us,” or “our”) respects your privacy” — no supplied context-term occurrences break Glossary §7. — locations: first_paragraph — count: 0 — source: GoGloby Glossary §7; audit.json: context_term_occurrences and c2_candidates
❌ **C3** Brand spelling — evidence: Privacy Policy | Globy | Read Globy's privacy policy to — locations: title, meta, schema — count: 3 — fix: Use "GoGloby" consistently. — source: audit.json: brand_spelling
✅ **C4** Phone number — evidence: Phone matches official digits or none listed. — source: audit.json: code_facts.phone_digits
✅ **C5** Em dash — evidence: No em dashes found. — source: Glossary §9

## D. Facts

⚠️ **D1** Company facts — evidence: Page: "GoGloby also operates through teams and business locations in Latin America and Europe." | Page: "For EEA-related inquiries, you may also contact us through our European business location: Račianska 1575/78... Slovakia." — locations: body — count: 3 — fix: Verify the stated operating locations and consulting activity against approved company facts; remove or substantiate claims not supported by the sources. — source: GoGloby Fact Sheet: Identity; Services; Glossary §1 (What GoGloby is not)
  ⚠️ _Operating locations in Latin America and Europe_ — Page: "GoGloby also operates through teams and business locations in Latin America and Europe." — locations: body — count: 1 — fix: Verify this operating-location claim against approved company facts or remove it.
  ⚠️ _European business location_ — Page: "Račianska 1575/78... Bratislava Slovakia" — locations: body — count: 1 — fix: Verify the Bratislava location against approved company facts or remove the claim.
  ⚠️ _Consulting activity_ — Page: "GoGloby’s staffing, consulting, or talent-placement activities" — locations: body — count: 1 — fix: Verify the consulting reference against approved company facts and clarify or remove it if unsupported.
➖ **D2** Client figures — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **D3** Clients not in the Fact Sheet — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **D4** Press and partners — evidence: No press coverage or partners are mentioned in the visible page text. | No award claims are made in the visible page text. — locations: body — count: 0 — source: GoGloby Fact Sheet: External recognition

## E. Positioning

➖ **E1** Service fit — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
✅ **E2** Positioning — evidence: The page describes GoGloby’s recruiting activities: “determine whether a candidate’s experience, skills, language abilities, compensation expectations, availability, and other qualifications match an opportunity.” — locations: body — source: GoGloby Fact Sheet: Identity, “One-sentence definition” and “What GoGloby is not”; GoGloby Glossary §1
➖ **E3** Call to action — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **E4** Lead order — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## F. GEO

✅ **F1** Answer first — evidence: Sentence 1: “GoGloby LLC (“GoGloby,” “we,” “us,” or “our”) respects your privacy and is committed to handling personal information responsibly, transparently, and in accordance with applicable privacy and data protection laws.” | Sentence 2: “This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information when you: visit or interact with gogloby.com and related GoGloby websites; submit a contact, inquiry, or application form; apply for a job,” — locations: first_paragraph — count: 2 — source: Glossary §9
➖ **F2** Buyer problem — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **F3** Recruiting firm stated early — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **F4** GoGloby named near claims — evidence: “GoGloby LLC (“GoGloby,” “we,” “us,” or “our”) respects your privacy” | “GoGloby uses administrative, technical, and organizational safeguards” — locations: first_paragraph, body — fix: Review key standalone claims to ensure they name GoGloby rather than relying only on first-person pronouns. — source: Glossary §9
➖ **F5** FAQ — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
⚠️ **F6** Audience — value: informational — evidence: Title: “Privacy Policy | Globy” | H1: “Privacy Policy and Candidate Privacy Notice” — locations: title, h1 — source: Glossary §§5, 9

## G. Target keyword

➖ **G1** Target keyword — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G2** Keyword placement — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G3** Trap terms in title or H1 — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type
➖ **G4** Competing pages — evidence: Not applicable to this page type. — source: audit.json: not_applicable_by_type

## H. Recommendation

ℹ️ **H1** Action — value: fix — evidence: Title: “Privacy Policy | Globy” | The page provides privacy and candidate-notice information; it is a legal policy page. — locations: title — fix: Correct the former company name in the title. — source: decisions.md — Spelling
ℹ️ **H2** Priority — value: low — evidence: The page is a legal privacy notice, and its H1 is “Privacy Policy and Candidate Privacy Notice.” | The page gives operational privacy information, including “How We Use Candidate Information” and “Your Privacy Rights.” — locations: h1, body — source: Glossary §9
ℹ️ **H3** Reasons — value: F4: Key claims frequently use first-person “we” and “our” rather than naming GoGloby; F6: The page serves an informational legal-policy purpose, not a buyer-ready hiring audience; H1: The title uses the former company name “Globy” — evidence: “We therefore cannot guarantee absolute security” | “This Privacy Policy and Candidate Privacy Notice explains how we collect, use, disclose, store, and protect personal information” | Title: “Privacy Policy | Globy” — locations: title, first_paragraph, body — source: Glossary §§5, 9; decisions.md — Spelling
