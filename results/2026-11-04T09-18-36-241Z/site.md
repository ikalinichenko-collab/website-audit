# Site report

Run 2026-11-04T09-18-36-241Z

## Scope

- Resources/Insights: 5 pages

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

- modals@1: 5 pages

The modal promises a response within one business day, but the company documents do not establish that response-time commitment. Remove or verify the promise before keeping it.

### [medium] Unverified response-time promise (Company facts, not in sources), 2 places
The modal promises a response within one business day, a service timeline not stated in the company documents.
Fix: Remove the response-time promise or confirm it with the company before publishing it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 5 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 1) on 5 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /insights/ai-compliance-consulting/, /insights/ai-implementation-cost/, /insights/embedded-ai/, /insights/ai-governance-consulting-firms/, /insights/ai-consulting-vs-staff-augmentation/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering partner and software development provider, rather than the approved staffing and recruiting agency. It also includes unsupported claims and promises, so the company description and service catalog need to be replaced and the remaining claims checked against the source documents.

### [high] Applied AI partner positioning (Positioning), 3 places
The structured data positions GoGloby as an Applied AI Engineering partner and claims it turns engineering into AI-native production, contrary to the approved agency description.
Fix: Replace the partner and AI-native-production positioning with the approved company description.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Unapproved company description (Positioning)
The description identifies GoGloby as a talent acquisition agency for tech companies hiring across US and EU time zones, not as the approved staffing and recruiting agency specializing in Data & AI Engineers.
Fix: Use the approved company description and remove the unsupported US-and-EU scope.
Rule: decisions.md: Company description; Fact Sheet: Identity
- Site-wide structured data, Organization.description: "We are a US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire the world's most thoroughly vetted talent within the US & EU time zones."

### [high] Development services offer (Discontinued offer), 2 places
The catalog sells generative AI development and ongoing support, while GoGloby says it is not a software development shop and describes its offers as recruiting and staffing engineers.
Fix: Remove the development-services offer and retain only the supported recruiting and staffing services.
Rule: Fact Sheet: Identity; Glossary §1 and §2
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "Production-ready generative AI delivery covering GenAI integration, multi-agent orchestration, optimization and evaluation, and ongoing support and governance."

### [high] Unverified deployment timeline (Company facts)
The promise to deploy engineers in under four weeks differs from the stated nearshore staffing start time of two to three weeks.
Fix: Replace the deployment promise with the sourced staffing timeline.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."

### [high] Incorrect insurance coverage (Company facts), 2 places
The structured data describes a combined $3M policy that includes professional liability, while the sources specify $3M data and cyber-liability insurance.
Fix: Correct the coverage description to match the sourced data and cyber-liability policy.
Rule: Fact Sheet: Services; Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Unverified top-four-percent claim (Company facts)
The sources say approximately 4% of candidates pass the assessment, not that GoGloby embeds the “top 4 percent” of engineers.
Fix: Replace the ranking claim with the sourced assessment result.
Rule: Fact Sheet: How we vet; Key metrics
- Site-wide structured data, Service.description: "Embed the top 4 percent of Applied AI Software Engineers directly into your team"

### [high] Incorrect staffing guarantee (Company facts)
The 120-day telemetry-backed replacement guarantee differs from the sourced performance-based replacement at no cost if results fall below baseline, with cancellation available during the first 120 days.
Fix: Replace the guarantee with the sourced staffing replacement and cancellation terms.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [medium] Unverified Vit experience claim (Company facts, not in sources)
The claimed decade of team-scaling experience across six countries and $60M+ generated in value is not in the Fact Sheet.
Fix: Remove the unverified experience and value claims or verify them with the company before publishing.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe — generating $60M+ in value."

### [medium] Unverified AI system claim (Company facts, not in sources)
The claim that Vitaly built an Applied AI Engineering system is not in the Fact Sheet.
Fix: Remove the unverified claim or verify it with the company before publishing.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system to give tech leaders board-ready proof of AI-driven engineering velocity."

### [medium] Unverified IP guarantee (Company facts, not in sources)
“Zero IP exposure” is not a sourced guarantee; the Fact Sheet states that clients own all IP and engineers work in the client’s environment.
Fix: Remove the unsupported guarantee and use only the sourced IP and security terms.
Rule: Fact Sheet: Legal and security; Fact Sheet: Services
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unverified profile delivery speed (Company facts, not in sources)
The 72-hour vetted-profile promise is not in the sources and conflicts with the glossary instruction against fast-hire promises.
Fix: Remove the unsupported profile-delivery promise.
Rule: Fact Sheet: Services; Glossary §7
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Unverified feature delivery speed (Company facts, not in sources)
The promise of a first validated feature within three to five business days is not in the sources.
Fix: Remove the unsupported feature-delivery promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Unverified first shortlist timing (Company facts, not in sources)
The five-day shortlist promise is not in the sources, which state four to six weeks to offer for recruiting.
Fix: Remove the unsupported shortlist promise or verify it with the company.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unverified faster hiring claim (Company facts, not in sources)
The claim of 50% faster time-to-hire than US job boards is not in the Fact Sheet.
Fix: Remove the unsupported comparison or verify it with the company.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified talent network scope (Company facts, not in sources)
A talent network spanning five or more US-timezone countries is not stated in the sources; the nearshore service sources engineers from Latin America.
Fix: Remove or verify the network-size and geographic claim, and align service geography with the sources.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unverified AI visibility claims (Company facts, not in sources)
The claims that every AI dollar is visible and every feature ships faster are not established by the sources, which describe sprint-by-sprint reporting of velocity, code quality, and AI token cost.
Fix: Remove the unsupported outcome claims and describe only the sourced tracking capabilities.
Rule: Fact Sheet: Services; Fact Sheet: Legal and security
- Site-wide structured data, WebSite.description: "every AI dollar visible, every feature shipped faster."

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

- schema_recommended on 5 of 5 article pages: missing: BreadcrumbList
- image_dimensions on 5 of 5 article pages: 2 without width/height
- link_to_services on 5 of 5 article pages: no link to /services/*

Duplicates:

- none

Sitemap hygiene:

- none

## Repeated wording

- "He has spent 16+ years building and leading software teams" (Company facts): 5 pages
- "4x Applied" (Old terms): 5 pages
- "He is a LinkedIn Top Voice in software development." (Company facts): 4 pages
- "including certified Agentic SDLC mastery." (Company facts): 4 pages
- "for companies across the US, Canada, and Europe" (Company facts): 3 pages
- "Applied AI Engineering partner" (Old terms): 3 pages
- "AI Intelligence Layer" (Old terms): 3 pages
