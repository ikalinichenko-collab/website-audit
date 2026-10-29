# Site report

## Site-wide JSON-LD nodes

- **AggregateRating** — AggregateRating — 10 page(s)
  - Example: https://gogloby.com/

- **Brand** — GoGloby — 10 page(s)
  - Example: https://gogloby.com/

- **BusinessAudience** — BusinessAudience — 10 page(s)
  - Example: https://gogloby.com/

- **ContactPoint** — ContactPoint — 10 page(s)
  - Example: https://gogloby.com/

- **ContactPoint** — ContactPoint — 10 page(s)
  - Example: https://gogloby.com/

- **ImageObject** — ImageObject — 10 page(s)
  - Example: https://gogloby.com/

- **Offer** — Offer — 10 page(s)
  - Example: https://gogloby.com/

- **Offer** — Offer — 10 page(s)
  - Example: https://gogloby.com/

- **Offer** — Offer — 10 page(s)
  - Example: https://gogloby.com/

- **Offer** — Offer — 10 page(s)
  - Example: https://gogloby.com/

- **OfferCatalog** — GoGloby Applied AI Engineering Service Catalog — 10 page(s)
  - Example: https://gogloby.com/

- **Organization** — GoGloby — 10 page(s)
  - Example: https://gogloby.com/

- **Person** — Sergey Matikaynen — 10 page(s)
  - Example: https://gogloby.com/

- **Person** — Vit Koval — 10 page(s)
  - Example: https://gogloby.com/

- **PostalAddress** — GoGloby Headquarters — 10 page(s)
  - Example: https://gogloby.com/

- **QuantitativeValue** — QuantitativeValue — 10 page(s)
  - Example: https://gogloby.com/

- **Service** — AI Staff Augmentation — 10 page(s)
  - Example: https://gogloby.com/

- **Service** — Applied AI Engineering — 10 page(s)
  - Example: https://gogloby.com/

- **Service** — Generative AI Development Services — 10 page(s)
  - Example: https://gogloby.com/

- **Service** — Hire Applied AI Engineers — 10 page(s)
  - Example: https://gogloby.com/

- **WebSite** — GoGloby — 10 page(s)
  - Example: https://gogloby.com/

## Site-wide issues

_(none)_

## Site-level checks

✅ **S1** AI bots allowed — All configured AI bots allowed
✅ **S2** llms.txt — llms.txt present
✅ **S3** Sitemaps — Sitemap URLs: 689 | No sampled issues
✅ **S4** Content in raw HTML — Sampled 5 page types with main content in HTML
⚠️ **S5** Competing pages summary — not applicable to this page type.: 4 URLs — fix: Consolidate or differentiate competing keyword pages.

## S6 — Site-wide schema

❌ **S6** Site-wide schema — current: AI-native production | current: AI Intelligence Layer — fix: Remove or rephrase "AI-native production" in site-wide schema. Replace "AI Intelligence Layer" with AI Development Intelligence Layer in site-wide schema. Replace "AI Intelligence Layer" with AI Development Intelligence Layer in site-wide schema.

### Problems

- ❌ **Offer: Offer — text (C1)**
  - current: AI-native production
  - expected: must not appear (audit.json exact_phrases)
  - fix: Remove or rephrase "AI-native production" in site-wide schema.

- ❌ **Offer: Offer — text (C1)**
  - current: AI Intelligence Layer
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer in site-wide schema.

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — text (C1)**
  - current: AI Intelligence Layer
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer in site-wide schema.

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — text (C1)**
  - current: AI-native production
  - expected: must not appear (audit.json exact_phrases)
  - fix: Remove or rephrase "AI-native production" in site-wide schema.

- ❌ **Organization: GoGloby — text (C1)**
  - current: AI Intelligence Layer
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer in site-wide schema.

- ❌ **Organization: GoGloby — text (C1)**
  - current: AI-native production
  - expected: must not appear (audit.json exact_phrases)
  - fix: Remove or rephrase "AI-native production" in site-wide schema.

- ❌ **Organization: GoGloby — text (C1)**
  - current: Applied AI Engineering partner
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "Applied AI Engineering partner" with the approved company description in site-wide schema.

- ❌ **Organization: GoGloby — text (C3)**
  - current: Gogloby
  - expected: correct brand spelling (GoGloby)
  - fix: Fix brand spelling "Gogloby" in site-wide schema.

- ❌ **Person: Vit Koval — text (C1)**
  - current: Applied AI Engineering partner
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "Applied AI Engineering partner" with the approved company description in site-wide schema.

- ❌ **Service: Applied AI Engineering — text (C1)**
  - current: AI-native production
  - expected: must not appear (audit.json exact_phrases)
  - fix: Remove or rephrase "AI-native production" in site-wide schema.

- ❌ **Service: Generative AI Development Services — text (C1)**
  - current: AI Intelligence Layer
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "AI Intelligence Layer" with AI Development Intelligence Layer in site-wide schema.

- ❌ **WebSite: GoGloby — text (C1)**
  - current: AI-native production
  - expected: must not appear (audit.json exact_phrases)
  - fix: Remove or rephrase "AI-native production" in site-wide schema.

- ❌ **WebSite: GoGloby — text (C1)**
  - current: Applied AI Engineering partner
  - expected: must not appear (audit.json exact_phrases)
  - fix: Replace "Applied AI Engineering partner" with the approved company description in site-wide schema.

- ❌ **WebSite: GoGloby — text (C1)**
  - current: every AI dollar visible
  - expected: must not appear (audit.json exact_phrases)
  - fix: Remove or rephrase "every AI dollar visible" in site-wide schema.

- ❌ **AggregateRating: AggregateRating — reviewCount**
  - current: 4.9
  - expected: integer 10 (Fact Sheet: 10 reviews)
  - fix: reviewCount must be an integer (10).

- ⚠️ **Offer: Offer — url**
  - current: https://gogloby.com/services/claude-in-production/#service
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ⚠️ **Offer: Offer — url**
  - current: https://gogloby.com/services/claude-in-production/
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ❌ **Offer: Offer — url**
  - current: https://gogloby.com/generative-ai-development-services/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Offer: Offer — url**
  - current: https://gogloby.com/generative-ai-development-services/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Offer: Offer — url**
  - current: https://gogloby.com/ai-staff-augmentation/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Offer: Offer — url**
  - current: https://gogloby.com/ai-staff-augmentation/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Offer: Offer — url**
  - current: https://gogloby.com/hire-ai-engineers/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Offer: Offer — url**
  - current: https://gogloby.com/hire-ai-engineers/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ⚠️ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/services/claude-in-production/#service
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ⚠️ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/services/claude-in-production/
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/generative-ai-development-services/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/generative-ai-development-services/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/ai-staff-augmentation/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/ai-staff-augmentation/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/hire-ai-engineers/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — url**
  - current: https://gogloby.com/hire-ai-engineers/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — url**
  - current: https://www.trustpilot.com/review/gogloby.com
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 403).

- ⚠️ **Organization: GoGloby — url**
  - current: https://gogloby.com/services/claude-in-production/#service
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ⚠️ **Organization: GoGloby — url**
  - current: https://gogloby.com/services/claude-in-production/
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ❌ **Organization: GoGloby — url**
  - current: https://gogloby.com/generative-ai-development-services/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — url**
  - current: https://gogloby.com/generative-ai-development-services/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — url**
  - current: https://gogloby.com/ai-staff-augmentation/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — url**
  - current: https://gogloby.com/ai-staff-augmentation/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — url**
  - current: https://gogloby.com/hire-ai-engineers/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — url**
  - current: https://gogloby.com/hire-ai-engineers/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Service: AI Staff Augmentation — url**
  - current: https://gogloby.com/ai-staff-augmentation/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Service: AI Staff Augmentation — url**
  - current: https://gogloby.com/ai-staff-augmentation/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ⚠️ **Service: Applied AI Engineering — url**
  - current: https://gogloby.com/services/claude-in-production/#service
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ⚠️ **Service: Applied AI Engineering — url**
  - current: https://gogloby.com/services/claude-in-production/
  - expected: service page from decisions.md (https://gogloby.com/services/ai-staff-augmentation or https://gogloby.com/services/hire-ai-engineers)
  - fix: Point schema URL to an approved service page.

- ❌ **Service: Generative AI Development Services — url**
  - current: https://gogloby.com/generative-ai-development-services/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Service: Generative AI Development Services — url**
  - current: https://gogloby.com/generative-ai-development-services/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Service: Hire Applied AI Engineers — url**
  - current: https://gogloby.com/hire-ai-engineers/#service
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Service: Hire Applied AI Engineers — url**
  - current: https://gogloby.com/hire-ai-engineers/
  - expected: HTTP 200
  - fix: Fix or remove URL in site-wide schema (got HTTP 404).

- ❌ **Organization: GoGloby — legalName**
  - Current: “Gogloby LLC”
  - Expected: “GoGloby LLC” (Fact Sheet, Identity)
  - fix: Correct the legal-name capitalization to match the Fact Sheet.

- ❌ **Organization: GoGloby — slogan**
  - Current: “Applied AI Engineering Partner”
  - Glossary §7 says not to use “Applied AI Engineering partner” as a way to describe GoGloby.
  - fix: Remove the prohibited slogan.

- ❌ **Organization: GoGloby — email**
  - Current: “hr@gogloby.com”
  - Expected company email: “sales@gogloby.com” (Fact Sheet, Identity).
  - fix: Use the Fact Sheet company email for the Organization email field.

- ❌ **Organization: GoGloby — knowsAbout**
  - Current entries include “AI Intelligence Layer (engineering telemetry)” and “Applied AI Engineering Partner”.
  - Glossary §7 gives the current product name as “AI Development Intelligence Layer” and prohibits “Applied AI Engineering partner” as a company description.
  - fix: Remove prohibited or outdated terms from knowsAbout and use only approved terminology.

- ❌ **Organization: GoGloby — sameAs**
  - Current entries include “https://www.g2.com/products/gogloby/reviews” and “https://www.trustpilot.com/review/gogloby.com”.
  - Fact Sheet, Official profiles: G2 is “Not available yet”; Trustpilot is not listed as an official profile. Decisions.md, Official profiles additionally approves Facebook and X.
  - fix: Remove profiles not approved as official sameAs links and retain only verified official profiles.

- ❌ **Person: Sergey Matikaynen — description**
  - Current: “Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system.”
  - Fact Sheet, Founders: Sergey leads “the infrastructure behind AI-native engineering: agent orchestration, SDLC automation, developer telemetry, policy enforcement, observability, security and engineering economics.”
  - fix: Align the description with the founder information in the Fact Sheet and remove outdated product or positioning terminology.

- ❌ **Person: Sergey Matikaynen — knowsAbout**
  - Current includes “Applied AI Engineering” and “Secure AI development environments”.
  - Fact Sheet, Founders describes his work in AI-native engineering infrastructure, including agent orchestration, SDLC automation, telemetry, policy enforcement, observability, security and engineering economics.
  - fix: Align knowsAbout with the Fact Sheet founder information and approved terminology.

- ⚠️ **Person: Sergey Matikaynen — sameAs**
  - Current: “https://www.linkedin.com/in/sergeymatikaynen/”
  - Fact Sheet, Founders: “LinkedIn: not available yet”.
  - fix: Verify the profile as an official profile before including it in sameAs.

- ❌ **Person: Vit Koval — description**
  - Current: “generating $60M+ in value” and “Built the Applied AI Engineering system”.
  - Fact Sheet, Founders describes Vit as an entrepreneur, industry speaker, LinkedIn Top Voice and podcast host who shapes company vision, growth strategy, sales and marketing.
  - fix: Align the description with the Fact Sheet founder information and remove unsupported claims and prohibited positioning.

- ❌ **Person: Vit Koval — knowsAbout**
  - Current includes “Applied AI Engineering Partnerships”, “Nearshore AI talent” and “Agentic SDLC adoption”.
  - Glossary §7 prohibits “AI talent” on its own; the Fact Sheet, Founders describes Vit’s focus as vision, growth strategy, sales and marketing.
  - fix: Align knowsAbout with the Fact Sheet founder information and remove prohibited terminology.

- ⚠️ **Person: Vit Koval — sameAs**
  - Current: “https://www.linkedin.com/in/vitalykoval/”
  - Fact Sheet, Founders: “LinkedIn: not available yet”.
  - fix: Verify the profile as an official profile before including it in sameAs.

- ❌ **Service: AI Staff Augmentation — name**
  - Current: “AI Staff Augmentation”
  - Approved service name: “Nearshore Data & AI Engineers Staffing” (decisions.md, Service pages; Fact Sheet, Services).
  - fix: Use the approved service name in the Service node.

- ❌ **Service: Applied AI Engineering — name**
  - Current: “Applied AI Engineering”
  - Approved services are “US Data & AI Engineers Recruiting” and “Nearshore Data & AI Engineers Staffing” (decisions.md, Spelling and Service pages).
  - fix: Remove this unapproved service node or align it with an approved service.

- ❌ **Service: Hire Applied AI Engineers — name**
  - Current: “Hire Applied AI Engineers”
  - Approved service name: “US Data & AI Engineers Recruiting” (decisions.md, Service pages; Fact Sheet, Services).
  - fix: Use the approved service name in the Service node.

- ❌ **Service: Generative AI Development Services — name**
  - Current: “Generative AI Development Services”
  - The Fact Sheet lists only “US Data & AI Engineers Recruiting” and “Nearshore Data & AI Engineers Staffing” as services.
  - fix: Remove this unapproved service node or align it with an approved service.

- ❌ **OfferCatalog: GoGloby Applied AI Engineering Service Catalog — name**
  - Current: “GoGloby Applied AI Engineering Service Catalog”
  - The Fact Sheet, Services lists “US Data & AI Engineers Recruiting” and “Nearshore Data & AI Engineers Staffing”.
  - fix: Rename or remove the catalog so it represents only the approved services.

- ❌ **Offer: Offer — service**
  - Current itemOffered name: “Applied AI Engineering”
  - Approved service names: “US Data & AI Engineers Recruiting” and “Nearshore Data & AI Engineers Staffing” (Fact Sheet, Services).
  - fix: Remove the unapproved offer or align it with an approved service.

- ❌ **Offer: Offer — service**
  - Current itemOffered name: “Generative AI Development Services”
  - The Fact Sheet, Services lists only recruiting and nearshore staffing.
  - fix: Remove the unapproved offer or align it with an approved service.

- ❌ **Offer: Offer — service**
  - Current itemOffered name: “AI Staff Augmentation”
  - Approved service name: “Nearshore Data & AI Engineers Staffing” (decisions.md, Service pages; Fact Sheet, Services).
  - fix: Use the approved staffing service name and description.

- ❌ **Offer: Offer — service**
  - Current itemOffered name: “Hire Applied AI Engineers”
  - Approved service name: “US Data & AI Engineers Recruiting” (decisions.md, Service pages; Fact Sheet, Services).
  - fix: Use the approved recruiting service name and description.

- ❌ **WebSite: GoGloby — description**
  - Current: “GoGloby is an Applied AI Engineering partner turning engineering into AI-native production”
  - Glossary §7 prohibits “Applied AI Engineering partner” and “turn engineering into AI-native production”.
  - fix: Remove the prohibited claims from the WebSite description.
