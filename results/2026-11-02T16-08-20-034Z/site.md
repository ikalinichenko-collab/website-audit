# Site report

Run 2026-11-02T16-08-20-034Z

## Scope

- Company/About: 1 pages
- Company/Contacts: 1 pages
- Company/Home: 1 pages
- Company/Privacy: 1 pages
- Company/Terms: 1 pages

## Site checks

- robots.txt AI bots: all allowed
- llms.txt: present
- Sitemaps:
  - https://gogloby.com/post-sitemap.xml: 269 URLs
  - https://gogloby.com/page-sitemap.xml: 29 URLs
  - https://gogloby.com/country-guides-sitemap.xml: 43 URLs
  - https://gogloby.com/guides-sitemap.xml: 10 URLs
  - https://gogloby.com/use-cases-sitemap.xml: 15 URLs
  - https://gogloby.com/jobs-sitemap.xml: 4 URLs
  - https://gogloby.com/hire-sitemap.xml: 191 URLs
  - https://gogloby.com/glossary-ai-sitemap.xml: 40 URLs
  - https://gogloby.com/glossary-term-sitemap.xml: 83 URLs
  - https://gogloby.com/category-sitemap.xml: 3 URLs
  - https://gogloby.com/author-sitemap.xml: 2 URLs

## Shared zones

- modals@1: 3 pages
- modals@2: 2 pages

The forms promise a response within one business day, but this response timeframe is not documented in the company sources. Verify the commitment or remove it from both modals.

### [medium] Unverified response timeframe (Company facts, not in sources), 2 places
The forms promise a response within one business day, but the sources do not specify this response timeframe.
Fix: Verify the response commitment or remove the timeframe from both modals.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 3 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /about/, /contacts/, /

Pages with modals@2: /privacy-policy/, /terms-and-conditions/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering provider and promotes software development services, rather than the staffing and recruiting agency described in the approved sources. Replace the old positioning and service catalog, and verify or remove the unsupported claims identified below.

### [high] Applied AI positioning (Positioning), 3 places
The schema describes GoGloby as an Applied AI Engineering partner and an agency hiring broadly defined talent, rather than using the approved company description.
Fix: Replace the positioning and company description with the approved description and current staffing and recruiting focus.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Organization.description: "US-based talent acquisition agency specializing in assisting tech companies"
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Development services no longer offered (Discontinued offer), 3 places
The service catalog offers generative AI development and AI product delivery, which are not GoGloby’s current staffing and recruiting services.
Fix: Remove the development-service catalog and describe only the current recruiting and nearshore staffing services.
Rule: Fact Sheet: Services; Glossary §1–2
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."

### [high] Service names are outdated (Company facts), 2 places
The schema labels the services with names that differ from the two official service names.
Fix: Use the official service names in the service catalog and its structured data.
Rule: decisions.md: Service pages and spelling; Fact Sheet: Services
- Site-wide structured data, Service.name: "AI Staff Augmentation"
- Site-wide structured data, Service.name: "Hire Applied AI Engineers"

### [high] Service geography is inaccurate (Company facts), 2 places
The stated US and EU time-zone coverage does not match the documented service scope: US recruiting and nearshore engineers in Latin America working US hours.
Fix: Correct the geography and time-zone claims to match the documented service scope.
Rule: Fact Sheet: Services
- Site-wide structured data, Organization.description: "within the US & EU time zones."
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [high] Unverified speed claims (Company facts), 4 places
The schema promises profile and shortlist delivery times and a 50% faster time-to-hire that are not in the Fact Sheet; its staffing start promise also differs from the documented 2–3 weeks.
Fix: Remove unverified speed claims and state only the documented service timelines.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [high] Insurance coverage differs (Company facts), 2 places
The schema describes a combined policy including professional liability, while the Fact Sheet specifies $3M data and cyber-liability insurance.
Fix: Correct the insurance description to match the documented policy.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Replacement guarantee is inaccurate (Company facts)
The schema presents a 120-day telemetry-backed replacement guarantee for staffing, but the documented staffing guarantee is performance-based replacement if results fall below baseline, with cancellation available during the first 120 days.
Fix: Correct the staffing guarantee to match the documented performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [medium] Prohibited legacy terms (Old terms)
The schema uses prohibited legacy language, including “AI-native production,” “AI Solutions Architect” as an offer, and “secure development environment.”
Fix: Remove these legacy terms and describe current roles and services using the approved terminology.
Rule: Glossary §7
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."

### [medium] Unsupported founder claims (Company facts, not in sources), 2 places
The claimed decade of scaling teams across multiple regions and generating $60M+ in value is not supported by the founder facts in the Fact Sheet.
Fix: Remove or verify these biographical claims before retaining them in structured data.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams"
- Site-wide structured data, Person.description: "generating $60M+ in value."

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

- none

Duplicates:

- duplicate_meta: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production" on /about/, /

Sitemap hygiene:

- none

## Repeated wording

- "mvidela@gogloby.com" (Contacts): 3 pages
- "bgasparino@gogloby.com" (Contacts): 3 pages
- "dduarte@gogloby.com" (Contacts): 3 pages
- "sergey@gogloby.com" (Contacts): 3 pages
- "hr@gogloby.com" (Contacts): 3 pages
