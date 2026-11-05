# Site report

Run 2026-11-05T07-46-33-936Z

## Scope

- Resources/Case studies: 6 pages

## Site checks

- robots.txt AI bots: all allowed
- llms.txt: present
- Sitemaps:
  - https://gogloby.com/post-sitemap.xml: 269 URLs
  - https://gogloby.com/page-sitemap.xml: 29 URLs
  - https://gogloby.com/country-guides-sitemap.xml: 43 URLs
  - https://gogloby.com/guides-sitemap.xml: 10 URLs
  - https://gogloby.com/use-cases-sitemap.xml: 15 URLs
  - https://gogloby.com/jobs-sitemap.xml: 6 URLs
  - https://gogloby.com/hire-sitemap.xml: 191 URLs
  - https://gogloby.com/glossary-ai-sitemap.xml: 40 URLs
  - https://gogloby.com/glossary-term-sitemap.xml: 83 URLs
  - https://gogloby.com/category-sitemap.xml: 3 URLs
  - https://gogloby.com/author-sitemap.xml: 2 URLs

## Shared zones

- modals@1: 6 pages

The shared form promises a response time that is not supported by the company documents.

### [medium] Response time is unverified (Company facts, not in sources)
The promise to respond within one business day is not in the company sources.
Fix: Verify the response-time promise or remove it from both confirmation messages.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 6 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /case-study/healthtech-company-applied-ai-engineers/, /case-study/applied-ai-engineering-roi-case-study/, /case-study/building-semantic-ml-pipeline-recruitment-automation/, /case-study/ai-recruiting-agent-slack-case-study-1/, /case-study/how-gogloby-engineered-a-production-voice-ai-system-that-screens-candidates-85-faster-at-96-lower-cost/, /case-study/

## Site-wide structured data

The site-wide schema presents GoGloby as an Applied AI development partner and promotes discontinued development services. It also contains unsupported performance, timing, security and founder claims.

### [high] Discontinued AI development positioning (Positioning), 6 places
The schema positions GoGloby as an Applied AI engineering and development partner rather than a staffing and recruiting agency.
Fix: Replace the discontinued positioning and development offers with the approved company description and current services.
Rule: decisions.md: Company description; Fact Sheet: Identity and Services; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, OfferCatalog.name: "GoGloby Applied AI Engineering Service Catalog"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications, and agentic workflows"
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] EU time zones presented as service area (Company facts)
The description presents the US and EU time zones as the service area, while current services cover US onsite or hybrid recruiting and Latin American staffing on US hours.
Fix: Correct the service locations and working hours to match the current service models.
Rule: Fact Sheet: Services
- Site-wide structured data, Organization.description: "within the US & EU time zones."

### [high] Staffing guarantee terms misstated (Company facts)
The schema describes a 120-day telemetry-backed replacement guarantee, while the staffing terms provide performance-based replacement at no cost and cancellation within the first 120 days.
Fix: Correct the staffing replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [medium] Unverified vetting superlative (Company facts, not in sources)
The sources do not establish that GoGloby's candidates are the world's most thoroughly vetted.
Fix: Remove the superlative or obtain evidence supporting it.
Rule: Fact Sheet: How we vet
- Site-wide structured data, Organization.description: "the world's most thoroughly vetted talent"

### [medium] Unverified founder scaling history (Company facts, not in sources)
The sources do not verify Vit Koval's decade of helping engineering leaders scale teams across the named regions.
Fix: Remove the experience and geography claim or verify it with the company.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe"

### [medium] Unverified founder value figure (Company facts, not in sources)
The sources do not verify the claim that Vit Koval generated more than $60 million in value.
Fix: Remove the value figure or verify it with the company.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [medium] Unverified four-week deployment promise (Company facts, not in sources)
The sources do not provide an under-four-week deployment promise for the described development offer.
Fix: Remove the promise and use the documented timeline only for the applicable current service.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."

### [medium] Unverified zero IP exposure (Company facts, not in sources)
The sources describe client IP ownership and security controls but do not guarantee zero IP exposure.
Fix: Remove the absolute exposure claim and use the documented IP and security positions.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Professional liability coverage unverified (Company facts, not in sources), 2 places
The sources specify $3 million in data and cyber liability coverage but do not establish professional liability coverage within that amount.
Fix: Remove the professional liability claim or verify the policy's coverage.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [medium] Unverified 72-hour profile promise (Company facts, not in sources)
The sources do not promise vetted profiles within 72 hours.
Fix: Remove the profile-delivery promise or verify it with the company.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Unverified feature delivery promise (Company facts, not in sources)
The sources do not promise a first validated feature in three to five business days.
Fix: Remove the feature-delivery promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Unverified five-day shortlist promise (Company facts, not in sources)
The sources give a four-to-six-week recruiting time to offer but do not promise a shortlist in five days.
Fix: Remove the shortlist-delivery promise or verify it with the company.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unverified faster hiring comparison (Company facts, not in sources)
The sources do not verify a 50% faster time-to-hire than US job boards.
Fix: Remove the comparison or verify it with the company.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified talent network country count (Company facts, not in sources)
The sources do not specify that the talent network spans five or more US-time-zone countries.
Fix: Remove the country count or verify it with the company.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Universal AI cost visibility unverified (Company facts, not in sources)
The sources describe sprint-by-sprint AI token cost reporting for nearshore staffing, not visibility into every AI dollar.
Fix: Remove the universal cost visibility claim and limit any tracking description to the documented service.
Rule: Fact Sheet: Services
- Site-wide structured data, WebSite.description: "every AI dollar visible"

### [medium] Universal feature acceleration unverified (Company facts, not in sources)
The sources do not establish that every feature ships faster.
Fix: Remove the universal acceleration claim or verify it with the company.
Rule: Fact Sheet: Services
- Site-wide structured data, WebSite.description: "every feature shipped faster."

### [medium] Term not used: AI-native production (Old terms, term list), 2 places
"AI-native production" is a term or name the company no longer uses.
Fix: Remove it or replace it as the Glossary says.
Rule: Glossary §7
- Site-wide structured data, Service.description: "AI-native production"
- Site-wide structured data, WebSite.description: "AI-native production"

### [medium] Term not used: Applied AI Engineering partner (Old terms, term list), 2 places
"Applied AI Engineering partner" is no longer how GoGloby describes itself.
Fix: Remove it or replace it as the Glossary says.
Rule: Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, WebSite.description: "Applied AI Engineering partner"

### [medium] Term not used: Secure Development Environment (Old terms, term list)
"Secure Development Environment" is a term or name the company no longer uses.
Fix: Remove it or replace it as the Glossary says.
Rule: Glossary §7
- Site-wide structured data, Person.description: "secure development environment"

## SEO across pages

Failures on nearly every page of a type (listed once instead of per page):

- schema_recommended on 6 of 6 case_study pages: missing: BreadcrumbList
- link_to_services on 6 of 6 case_study pages: no link to /services/*

Duplicates:

- none

Sitemap hygiene:

- none

## Repeated wording

No wording flagged on three or more pages.
