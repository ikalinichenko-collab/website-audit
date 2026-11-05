# Site report

Run 2026-11-05T15-08-21-388Z

## Scope

- Resources/Insights: 4 pages
- Services/Services: 3 pages

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

- modals@1: 4 pages
- modals@2: 2 pages

The modals promise a response within one business day, a service commitment not stated in the company sources. Confirm the commitment or remove it from both modal zones.

### [medium] One-business-day response promise (Company facts, not in sources), 2 places
The page promises a response within one business day, but the sources do not establish that response time.
Fix: Verify this response-time commitment with the company or remove the promise.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 4 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /insights/talent-acquisition-companies/, /insights/best-tech-recruiting-firms/, /insights/marketing-recruitment-and-staffing-agencies/, /insights/top-executive-search-firms/

Pages with modals@2: /services/hire-ai-engineers/, /services/generative-ai-development/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering provider and advertises generative AI development services, rather than describing its approved staffing and recruiting services. It also contains unsupported delivery promises, company claims, and insurance wording that need correction or removal.

### [high] Applied AI Engineering positioning (Positioning), 3 places
The schema positions GoGloby as an Applied AI Engineering partner and provider, contrary to its approved description as a staffing and recruiting agency specializing in hiring Data & AI Engineers.
Fix: Replace the Applied AI Engineering positioning with the approved company description and descriptions of the current services.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Generative AI development offer (Discontinued offer), 3 places
The schema advertises generative AI development and delivery services, while GoGloby's listed services are recruiting and staffing engineers.
Fix: Remove the development-services offer and describe only the current recruiting and staffing services.
Rule: Fact Sheet: Services; Glossary §1 and §7
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications, and agentic workflows"

### [high] Insurance coverage differs (Company facts), 2 places
The schema describes $3M combined liability including professional liability, while the Fact Sheet specifies $3M data and cyber-liability insurance.
Fix: Change the insurance claim to match the Fact Sheet's coverage description.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional)"
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Staffing guarantee differs (Company facts)
The schema promises a 120-day telemetry-backed replacement guarantee, while the Fact Sheet specifies a no-cost replacement if performance falls below baseline and cancellation any time in the first 120 days.
Fix: Replace this guarantee with the staffing guarantee stated in the Fact Sheet.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [medium] Unverified service delivery timeline (Company facts, not in sources)
The promised delivery of generative AI development services in under four weeks is not supported by the sources.
Fix: Remove this timeline or verify it before making the claim.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."

### [medium] Unverified IP exposure claim (Company facts, not in sources)
The claim of zero IP exposure is not stated in the sources; they specify client IP ownership and that engineers work in the client's environment.
Fix: Remove the zero-exposure claim or replace it with a verified statement consistent with the security facts.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unsupported staffing turnaround claims (Company facts, not in sources), 2 places
The 72-hour profile delivery and three-to-five-business-day feature claims are not supported; the Fact Sheet states a two-to-three-week start for nearshore staffing.
Fix: Remove or verify these turnaround promises and align the staffing timeline with the Fact Sheet.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Unverified recruiting turnaround (Company facts, not in sources)
The five-day shortlist promise is not supported; the Fact Sheet gives a four-to-six-week time to offer for recruiting.
Fix: Remove or verify the shortlist promise and use the sourced recruiting timeline where applicable.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unverified hiring speed claim (Company facts, not in sources)
The claim that GoGloby is 50% faster than US job boards is not supported by the sources.
Fix: Remove the comparison or verify it before making the claim.
Rule: Fact Sheet: Services; Key metrics
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified founder responsibilities (Company facts, not in sources)
The listed Sergey Matikaynen responsibilities for an Agentic SDLC methodology and Applied AI Engineering system are not in the sources.
Fix: Remove or verify these responsibilities and describe his role using the sourced founder information.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology, secure development environment design"

### [medium] Unverified founder track record (Company facts, not in sources), 2 places
The claim that Vit Koval spent a decade scaling teams across named countries and generated $60M+ in value is not in the sources.
Fix: Remove or verify the career and value-generation claims before including them.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "generating $60M+ in value."
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe"

### [medium] Unverified talent network footprint (Company facts, not in sources), 2 places
The claimed network coverage across five-plus US-time-zone countries and the US-and-EU talent scope are not stated in the sources.
Fix: Remove or verify these geographic network claims and describe the sourced service locations.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Organization.description: "within the US & EU time zones."
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

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

- schema_recommended on 4 of 4 article pages: missing: BreadcrumbList
- image_dimensions on 4 of 4 article pages: 2 without width/height
- link_to_services on 4 of 4 article pages: no link to /services/*
- schema_recommended on 3 of 3 service pages: missing: BreadcrumbList
- image_dimensions on 3 of 3 service pages: 5 without width/height

Duplicates:

- none

Sitemap hygiene:

- none

## Repeated wording

- "including certified Agentic SDLC mastery" (Company facts): 4 pages
- "He is a LinkedIn Top Voice in software development." (Company facts): 4 pages
- "4x Applied" (Old terms): 4 pages
- "He has spent 16+ years building and leading software teams" (Company facts): 3 pages
- "Every engagement starts with the Benchmark: a fixed fee for one month" (Discontinued offer): 3 pages
- "logo-aicpa-soc2-type2-1-white-grayscale.png" (Company facts): 3 pages
- "logo-ism-iso-27001-1-grayscale.png" (Company facts): 3 pages
- "Applied AI Engineering partner" (Old terms): 3 pages
- "AI Intelligence Layer" (Old terms): 3 pages
