# Site report

Run 2026-11-05T09-32-31-676Z

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

The modals promise a response within one business day, a service commitment not supported by the company documents. Remove the promise or verify it with the company.

### [medium] Unverified response-time promise (Company facts, not in sources), 2 places
The page promises a response within one business day, but the company documents do not specify a response-time commitment.
Fix: Remove the response-time promise or confirm it with the company before publishing it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 6 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 1) on 6 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /case-study/healthtech-company-applied-ai-engineers/, /case-study/applied-ai-engineering-roi-case-study/, /case-study/building-semantic-ml-pipeline-recruitment-automation/, /case-study/ai-recruiting-agent-slack-case-study-1/, /case-study/how-gogloby-engineered-a-production-voice-ai-system-that-screens-candidates-85-faster-at-96-lower-cost/, /case-study/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering and generative-AI development provider, an offer that conflicts with the current staffing and recruiting position. Rebuild it around the approved description and current services, and remove or verify the unsupported promises and claims listed below.

### [high] Old Applied AI positioning (Positioning), 3 places
The schema describes GoGloby as an Applied AI Engineering partner and a broad talent acquisition agency rather than using the approved staffing and recruiting description specializing in hiring Data & AI Engineers.
Fix: Replace the old positioning with the approved company description and current service positioning.
Rule: decisions.md: Company description; Fact Sheet: Identity
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Organization.description: "We are a US-based talent acquisition agency specializing in assisting tech companies"
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Obsolete development services (Discontinued offer), 4 places
The schema sells Applied AI Engineering and generative-AI development work, while GoGloby is not a software development shop and does not offer these services.
Fix: Remove the development-service catalog and retain only descriptions of the current recruiting and nearshore staffing services.
Rule: Fact Sheet: Identity; Glossary §7
- Site-wide structured data, OfferCatalog.name: "GoGloby Applied AI Engineering Service Catalog"
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications"
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."

### [high] Incorrect insurance coverage (Company facts), 2 places
The page describes $3M of combined cyber, data, and professional liability, while the Fact Sheet specifies a $3M data and cyber-liability policy.
Fix: Correct the insurance description to match the documented $3M data and cyber-liability policy.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Incorrect staffing guarantee (Company facts)
The page promises a telemetry-backed replacement guarantee, while the documented staffing replacement is performance-based if results fall below baseline, with cancellation available during the first 120 days.
Fix: Replace this guarantee description with the documented performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [medium] Unsupported Sergey responsibilities (Company facts, not in sources)
The stated responsibility for secure development environment design is not in the company sources.
Fix: Remove or verify this responsibility before retaining it in the structured data.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "secure development environment design"

### [medium] Unverified Vitaly experience (Company facts, not in sources)
The claim that Vitaly has spent a decade helping engineering leaders scale teams is not in the company sources.
Fix: Remove or verify this experience claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams"

### [medium] Unverified value generated (Company facts, not in sources)
The claim that Vitaly generated more than $60M in value is not in the company sources.
Fix: Remove or verify the $60M+ claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "generating $60M+ in value"

### [medium] Unverified founder system claim (Company facts, not in sources)
The claim that Vitaly built the Applied AI Engineering system is not in the company sources.
Fix: Remove or verify this founder claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system"

### [medium] Unverified delivery timeline (Company facts, not in sources)
The promise of forward deployment in under four weeks is not in the company sources.
Fix: Remove or verify the under-four-week promise; use only a supported service timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."

### [medium] Unsupported IP guarantee (Company facts, not in sources)
The absolute promise of zero IP exposure is not supported by the stated IP and security facts.
Fix: Remove or verify the zero-exposure guarantee and use only the documented IP and security terms.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unsupported profile delivery (Company facts, not in sources)
The promise to deliver vetted profiles within 72 hours is not in the company sources.
Fix: Remove or verify the 72-hour profile-delivery promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Unsupported validated feature timing (Company facts, not in sources)
The promise of a first validated feature in three to five business days is not in the company sources.
Fix: Remove or verify the first-feature timing claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Unsupported first-feature outcome (Company facts, not in sources)
The claim that the service will produce a validated feature within a set number of days is an unsupported performance promise.
Fix: Remove or verify the promised feature outcome and timing.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Unsupported shortlist timing (Company facts, not in sources)
A five-day shortlist is not stated in the recruiting service facts, which give four to six weeks to offer.
Fix: Remove or verify the five-day shortlist promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unsupported hiring speed claim (Company facts, not in sources)
The claim of hiring 50 percent faster than US job boards is not in the company sources.
Fix: Remove or verify the comparative hiring-speed claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified talent network reach (Company facts, not in sources)
The claim that the talent network spans more than five US-time-zone countries is not in the company sources.
Fix: Remove or verify the network-reach claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unsupported AI spending visibility (Old terms)
The closing claim leads with AI-dollar visibility, which the Glossary says not to use as a hero or headline.
Fix: Remove the AI-spend-led claim and align the closing description with the approved company positioning.
Rule: Glossary §7
- Site-wide structured data, WebSite.description: "every AI dollar visible"

### [medium] Unsupported faster-shipping claim (Company facts, not in sources)
The claim that every feature ships faster is not in the company sources.
Fix: Remove or substantiate the guaranteed faster-shipping claim.
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

- "Book A Call" (CTA): 3 pages
