# Site report

Run 2026-11-04T18-15-53-173Z

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

The form modal promises a response time that is not stated in the company sources. Verify or remove that commitment.

### [medium] Unverified response-time promise (Company facts, not in sources)
The modal promises a response within one business day, but the sources do not state a response-time commitment.
Fix: Verify this commitment with the company or remove it from the modal.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 6 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /case-study/healthtech-company-applied-ai-engineers/, /case-study/applied-ai-engineering-roi-case-study/, /case-study/building-semantic-ml-pipeline-recruitment-automation/, /case-study/ai-recruiting-agent-slack-case-study-1/, /case-study/how-gogloby-engineered-a-production-voice-ai-system-that-screens-candidates-85-faster-at-96-lower-cost/, /case-study/

## Site-wide structured data

The schema presents GoGloby as an Applied AI Engineering and software-development provider rather than the approved staffing and recruiting agency. It also describes obsolete development offers and includes multiple unsupported service claims, timelines, guarantees, and founder claims.

### [high] Applied AI engineering positioning (Positioning), 3 places
The schema positions GoGloby as an Applied AI Engineering partner that turns engineering into AI-native production, contrary to the approved staffing and recruiting description.
Fix: Replace the Applied AI Engineering positioning with the approved company description and describe only GoGloby's staffing and recruiting services.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner"

### [high] Discontinued AI development services (Discontinued offer), 3 places
The schema sells Applied AI Engineering and generative AI delivery, including building copilots, agents, and RAG applications, which are development services rather than GoGloby's recruiting and staffing offers.
Fix: Remove the development-service offers and retain only the two approved recruiting and staffing services.
Rule: Fact Sheet: Services; Glossary §2 and §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering"
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "build copilots, AI agents, RAG applications, and agentic workflows"

### [high] Incorrect service names and scope (Company facts), 2 places
The catalog uses labels other than the approved service names and describes the recruiting service as hiring Applied AI Engineers rather than the specified Data & AI engineering roles.
Fix: Use the approved service names and align each service description with its documented roles and engagement model.
Rule: decisions.md: Service pages and official spelling; Fact Sheet: Services
- Site-wide structured data, Service.name: "AI Staff Augmentation"
- Site-wide structured data, Service.name: "Hire Applied AI Engineers"

### [high] Unsupported US and EU scope (Company facts)
The schema says the agency sources talent within US and EU time zones, while the documented recruiting service is for US companies and the staffing engineers are from Latin America working US hours.
Fix: Replace the US-and-EU scope with the documented locations and service markets.
Rule: Fact Sheet: Services
- Site-wide structured data, Organization.description: "within the US & EU time zones"

### [high] Unsupported replacement guarantee (Company facts)
The staffing guarantee is described as telemetry-backed, but the documented staffing replacement applies if results fall below baseline and can be cancelled within the first 120 days.
Fix: Align the staffing guarantee with the documented performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee"

### [high] Liability coverage overclaim (Company facts)
The schema describes the $3M policy as covering professional liability as well as cyber and data liability, while the sources specify data and cyber liability.
Fix: Describe only the documented $3M data and cyber-liability coverage.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional)"

### [medium] Unverified vetting superlative (Company facts, not in sources)
The claim that GoGloby finds the world's most thoroughly vetted talent is not established by the sources.
Fix: Remove the unverified superlative or replace it with a documented assessment fact.
Rule: Fact Sheet: How we vet
- Site-wide structured data, Organization.description: "the world's most thoroughly vetted talent"

### [medium] Unsupported CTO responsibilities (Company facts, not in sources), 2 places
The described Agentic SDLC methodology and technical architecture responsibilities are not stated in the founder facts.
Fix: Remove or verify these responsibilities before retaining them in structured data.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology"
- Site-wide structured data, Person.description: "the technical architecture behind the Applied AI Engineering system"

### [medium] Unverified founder track record (Company facts, not in sources), 2 places
The decade of scaling teams across named countries and the $60M+ value claim are not in the founder facts.
Fix: Remove or verify the unsupported founder track-record claims before retaining them.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams"
- Site-wide structured data, Person.description: "generating $60M+ in value"

### [medium] Unverified founder system claim (Company facts, not in sources), 2 places
The claim that Vitaly built an Applied AI Engineering system for board-ready proof of velocity is not in the founder facts.
Fix: Remove or verify the unsupported founder claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system"
- Site-wide structured data, Person.description: "board-ready proof of AI-driven engineering velocity"

### [medium] Unverified delivery timelines (Company facts, not in sources), 4 places
The 72-hour profile delivery, 3-to-5-business-day feature, under-four-week deployment, and five-day shortlist timelines are not in the sources.
Fix: Remove or verify these timelines and use only documented service timelines.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unsupported zero IP exposure (Company facts, not in sources)
The claim of zero IP exposure is not in the sources; the documented positions are that clients own the IP and engineers work in the client's environment.
Fix: Remove the zero-exposure claim and use only the documented IP and security positions.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unverified hiring speed claim (Company facts, not in sources)
The claim of 50 percent faster time-to-hire than US job boards is not supported by the sources.
Fix: Remove or verify the comparative hiring-speed claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified network reach (Company facts, not in sources)
The claim that the talent network spans five or more US-time-zone countries is not in the sources.
Fix: Remove or verify the network-reach claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unverified performance promises (Company facts, not in sources)
The claims that every AI dollar is visible and every feature ships faster are not established by the sources.
Fix: Remove or verify these performance promises before retaining them.
Rule: Fact Sheet: Services; Legal and security
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

- schema_recommended on 6 of 6 case_study pages: missing: BreadcrumbList
- link_to_services on 6 of 6 case_study pages: no link to /services/*

Duplicates:

- none

Sitemap hygiene:

- none

## Repeated wording

- "Book A Call" (CTA): 3 pages
