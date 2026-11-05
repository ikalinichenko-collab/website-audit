# Site report

Run 2026-11-05T14-59-08-713Z

## Scope

- Company/About: 1 pages
- Company/Home: 1 pages
- Resources/Insights: 6 pages

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
- modals@2: 2 pages

The forms promise a response within one business day, but the company documents do not establish that response-time commitment. Update the confirmation message in both modal zones.

### [medium] Unverified response-time promise (Company facts, not in sources), 2 places
The page promises a response within one business day, but the company documents do not specify a response-time commitment.
Fix: Remove or verify the one-business-day response promise before keeping it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 6 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /insights/talent-acquisition-companies/, /insights/best-tech-recruiting-firms/, /insights/marketing-recruitment-and-staffing-agencies/, /insights/top-executive-search-firms/, /insights/crm-manager-executive-search-firms/, /insights/project-management-recruitment-agencies/

Pages with modals@2: /, /about/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering partner and advertises generative AI development services, which conflict with the approved staffing and recruiting position. It also includes unsupported service promises, timelines, founder claims, and liability coverage details.

### [high] Applied AI company positioning (Positioning), 3 places
The structured data positions GoGloby as an Applied AI Engineering partner rather than the approved staffing and recruiting agency.
Fix: Replace the Applied AI Engineering positioning with the approved company description and current service positioning.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"
- Site-wide structured data, Organization.description: "We are a US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire the world's most thoroughly vetted talent within the US & EU time zones."

### [high] Former engineering delivery offer (Discontinued offer), 3 places
The catalog offers Applied AI Engineering delivery and positions GoGloby as putting AI systems into production, rather than selling its current staffing and recruiting services.
Fix: Remove the Applied AI Engineering delivery offer and describe only the current recruiting and staffing services.
Rule: Glossary §7
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, Service.description: "It puts Claude into production for established software, without risking the codebase."
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."

### [high] Generative AI development services (Discontinued offer), 3 places
The structured data sells generative AI development and ongoing delivery services that are not among GoGloby's current offers.
Fix: Remove the generative AI development service and retain only the documented recruiting and staffing services.
Rule: Glossary §7
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "Production-ready generative AI delivery covering GenAI integration, multi-agent orchestration, optimization and evaluation, and ongoing support and governance."
- Site-wide structured data, Service.description: "build copilots, AI agents, RAG applications, and agentic workflows"

### [high] Staffing replacement guarantee differs (Company facts)
The page promises a 120-day telemetry-backed replacement guarantee for staffing, while the documented staffing replacement is performance-based and the client may cancel during the first 120 days.
Fix: Replace the staffing guarantee with the documented performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [high] Liability coverage differs (Company facts), 2 places
The page describes $3M combined liability including professional liability, while the Fact Sheet specifies a $3M data and cyber-liability policy.
Fix: Use the documented $3M data and cyber-liability coverage description.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [medium] Unsupported AI delivery timelines (Company facts, not in sources), 2 places
The page makes AI delivery and feature timelines that are not documented for GoGloby's services.
Fix: Remove these delivery promises or replace them with verified timelines for the current services.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Zero IP exposure guarantee (Company facts, not in sources)
The page guarantees zero IP exposure, while the source documents state client IP ownership and describe security controls without making this guarantee.
Fix: Remove the zero-exposure guarantee and use only the documented IP and security terms.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unverified profile delivery promise (Company facts, not in sources)
The page promises vetted profiles within 72 hours, a turnaround time absent from the service facts.
Fix: Remove the 72-hour profile delivery claim unless it is verified and approved.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Unverified recruiting shortlist time (Company facts, not in sources)
The page promises a recruiting shortlist in five days, while the documented recruiting timeline is four to six weeks to offer.
Fix: Remove the five-day shortlist promise or verify and approve it as a separate service commitment.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unverified faster hiring claim (Company facts, not in sources)
The page claims recruiting is 50 percent faster than US job boards, a comparison not supported by the company documents.
Fix: Remove the comparative hiring-speed claim unless it is substantiated and approved.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified network geography (Company facts, not in sources)
The page claims a recruiting network across more than five US-time-zone countries, which is not stated in the company documents.
Fix: Remove the country-count claim unless it is verified and approved.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unverified founder experience claims (Company facts, not in sources), 2 places
The page attributes a decade of work across named countries and $60M-plus in generated value to Vit Koval, claims absent from the founder facts.
Fix: Remove or verify the founder experience and value claims against approved company information.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe"
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [medium] Unverified founder system claim (Company facts, not in sources)
The page says Vit Koval built the Applied AI Engineering system, a claim not contained in his approved founder biography.
Fix: Remove or verify this attribution using approved founder information.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system"

### [medium] Unverified Sergey role claims (Company facts, not in sources)
The page assigns Sergey specific methodology, environment-design, and Applied AI system responsibilities not stated in his approved title or founder biography.
Fix: Use only verified founder responsibilities and remove unsupported system claims.
Rule: Fact Sheet: Founders; decisions.md: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology, secure development environment design, and the technical architecture behind the Applied AI Engineering system."

### [medium] Unverified vetting superlative (Company facts, not in sources)
The page calls GoGloby's talent the world's most thoroughly vetted without evidence for that comparative claim.
Fix: Remove the unsupported superlative and use only the documented assessment facts.
Rule: Fact Sheet: How we vet
- Site-wide structured data, Organization.description: "the world's most thoroughly vetted talent"

### [medium] Unverified faster-shipping claim (Company facts, not in sources)
The page claims GoGloby makes every feature ship faster, a result not stated in the company documents.
Fix: Remove the universal speed claim unless it is supported and approved.
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

- schema_recommended on 6 of 6 article pages: missing: BreadcrumbList
- image_dimensions on 6 of 6 article pages: 2 without width/height
- link_to_services on 6 of 6 article pages: no link to /services/*

Duplicates:

- duplicate_meta: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production" on /, /about/

Sitemap hygiene:

- none

## Repeated wording

- "4x Applied" (Old terms): 7 pages
- "He is a LinkedIn Top Voice in software development." (Company facts): 6 pages
- "including certified Agentic SDLC mastery" (Company facts): 5 pages
- "He has spent 16+ years building and leading software teams" (Company facts): 4 pages
- "for companies across the US, Canada, and Europe" (Company facts): 3 pages
