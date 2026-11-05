# Site report

Run 2026-11-02T15-12-19-180Z

## Scope

- Company/About: 1 pages
- Company/Home: 1 pages
- Resources/Podcast: 1 pages

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

- banner_cta@1: 1 pages
- banner_cta@2: 1 pages
- modals@1: 2 pages
- modals@2: 1 pages

The shared banners promote an unapproved benchmark offer and AI transformation positioning rather than GoGloby’s staffing and recruiting services. The forms also make an unverified response-time promise.

### [high] AI transformation positioning (Positioning)
The banner presents AI transformation as GoGloby’s offer rather than its staffing and recruiting services.
Fix: Replace the transformation positioning with positioning consistent with the approved company description and services.
Rule: decisions.md: Company description; Fact Sheet: Identity
- Banner CTA (variant 2) on 1 pages, paragraph 1: "AI Transformation"

### [high] Unverified response-time promise (Company facts), 2 places
The forms promise a response within one business day, but the Fact Sheet does not establish this response-time commitment.
Fix: Remove the response-time promise or verify it with the company before retaining it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 2 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 1 pages, paragraph 1: "We will respond within one business day."

### [medium] Benchmark CTA is unapproved (CTA), 3 places
The banner promotes a benchmark and technical briefing, which are not the approved service-specific calls to action.
Fix: Replace the benchmark pitch and briefing CTA with wording for the relevant recruiting or staffing service.
Rule: Glossary §7
- Banner CTA (variant 1) on 1 pages, paragraph 1: "Start With a Benchmark"
- Banner CTA (variant 1) on 1 pages, heading 1: "Get Your Applied AI Engineering Benchmark"
- Banner CTA (variant 1) on 1 pages, paragraph 3: "Schedule a Technical Briefing"

Pages with banner_cta@1: /

Pages with banner_cta@2: /podcast/alice-barker/

Pages with modals@1: /, /about/

Pages with modals@2: /podcast/alice-barker/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering and generative AI development provider, including offers the company no longer sells. It also contains unsupported service promises and claims that conflict with the current service definitions.

### [high] Outdated company positioning (Positioning), 3 places
The schema describes GoGloby as an Applied AI Engineering partner and a talent acquisition agency rather than using the approved company description.
Fix: Replace the outdated company descriptions with the approved one-sentence description.
Rule: decisions.md: Company description
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Organization.description: "We are a US-based talent acquisition agency specializing in assisting tech companies"
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production:"

### [high] Discontinued development offer (Discontinued offer), 3 places
The service catalog sells generative AI development and software-building services, which are not GoGloby's current staffing and recruiting services.
Fix: Remove the generative AI development and software delivery offer from the schema.
Rule: Glossary §7
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications,"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."

### [high] Unverified delivery promises (Company facts), 4 places
The schema promises profile delivery in 72 hours, a validated feature in 3 to 5 business days, a five-day recruiting shortlist, and hiring 50 percent faster than US job boards; these claims are not in the Fact Sheet.
Fix: Remove the unsupported delivery and speed promises.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [high] Staffing guarantee differs (Company facts)
The schema claims a 120-day telemetry-backed replacement guarantee, while the staffing terms specify no-cost replacement if performance falls below baseline and cancellation at any time in the first 120 days.
Fix: Replace the staffing guarantee claim with the current performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [high] Insurance coverage overclaimed (Company facts), 2 places
The schema describes a $3M combined policy that includes professional liability, while the Fact Sheet specifies $3M data and cyber-liability insurance.
Fix: Change the insurance description to match the Fact Sheet and remove the unsupported professional-liability claim.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Unsupported IP guarantee (Company facts)
“Zero IP exposure” is an unsupported absolute claim; the Fact Sheet says clients own the IP and engineers work inside the client's environment.
Fix: Remove the unsupported absolute claim and use only the documented IP and security terms.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [high] Unverified founder claims (Company facts), 3 places
The schema attributes a decade of team-scaling work, $60M+ in generated value, and building an Applied AI Engineering system to Vit Koval, none of which appears in the approved founder facts.
Fix: Remove the unsupported founder claims and retain only verified founder information.
Rule: decisions.md: Founders; Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams"
- Site-wide structured data, Person.description: "generating $60M+ in value."
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system"

### [high] Unverified recruiting network claim (Company facts)
The claimed talent network across five or more US-time-zone countries is not stated in the Fact Sheet.
Fix: Remove the unsupported network claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Disallowed legacy terms (Old terms), 3 places
The schema uses disallowed terms including “AI-native production” and presents “AI Solutions Architects” as an offer.
Fix: Remove these legacy terms and describe only current roles and services.
Rule: Glossary §7
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "turning engineering into AI-native production:"

## SEO across pages

Failures on nearly every page of a type (listed once instead of per page):

- none

Duplicates:

- duplicate_meta: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production" on /, /about/

Sitemap hygiene:

- none

## Repeated wording

No wording flagged on three or more pages.
