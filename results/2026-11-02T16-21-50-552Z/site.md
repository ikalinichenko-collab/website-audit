# Site report

Run 2026-11-02T16-21-50-552Z

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

The forms promise a response within one business day, a service commitment not stated in the company sources. Remove or verify this turnaround claim.

### [medium] Unverified response timeframe (Company facts, not in sources), 2 places
The forms promise a response within one business day, but this response timeframe is not in the sources.
Fix: Remove the response-time promise or confirm it with the company before publishing it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 3 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /about/, /contacts/, /

Pages with modals@2: /privacy-policy/, /terms-and-conditions/

## Site-wide structured data

The schema presents GoGloby as an Applied AI Engineering provider and advertises generative AI development services, neither of which matches the approved staffing and recruiting description. It also contains unsupported or inaccurate service promises, founder claims, timelines, and security and performance guarantees.

### [high] Applied AI Engineering positioning (Positioning), 3 places
The schema describes GoGloby as an Applied AI Engineering partner that turns engineering into AI-native production, rather than as a staffing and recruiting agency specializing in hiring Data & AI Engineers.
Fix: Replace the Applied AI Engineering positioning throughout the schema with positioning aligned to the approved company description and current services.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Generative AI development offer (Discontinued offer), 2 places
The schema advertises generative AI development and delivery services, but the listed GoGloby services are recruiting and nearshore staffing.
Fix: Remove the generative AI development service offer and retain only services supported by the company documents.
Rule: Fact Sheet: Services; Glossary §2
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications"

### [high] Staffing delivery time claims (Company facts), 2 places
The schema promises delivery in under four weeks and a first validated feature in 3 to 5 business days, while the Fact Sheet gives a 2–3 week time to start and does not promise a feature-delivery timeline.
Fix: Replace these delivery promises with the supported staffing start timeline and remove the unsupported feature timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [high] Staffing replacement guarantee (Company facts)
The schema presents a 120-day telemetry-backed replacement guarantee, but nearshore staffing provides no-cost replacement if results fall below baseline and cancellation any time in the first 120 days.
Fix: Correct the staffing guarantee to match the Fact Sheet and remove the unsupported telemetry-backed replacement claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [high] Combined liability coverage (Company facts), 2 places
The schema describes a combined $3M policy covering cyber, data, and professional liability; the Fact Sheet specifies $3M data and cyber-liability insurance.
Fix: Correct the insurance description and remove the unsupported professional-liability coverage claim.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Unverified recruiting turnaround (Company facts)
The schema promises a shortlist in 5 days, while the Fact Sheet states 4–6 weeks to offer and gives no five-day shortlist commitment.
Fix: Remove the five-day shortlist promise and use only a verified recruiting timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unverified Sergey responsibilities (Company facts, not in sources)
The schema assigns Sergey responsibility for an Agentic SDLC methodology, secure development environment design, and an Applied AI Engineering system, which the Fact Sheet does not state.
Fix: Remove or verify these founder-specific claims against approved company information.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology, secure development environment design"

### [medium] Unverified Vit experience claims (Company facts, not in sources), 2 places
The claim that Vit has spent a decade helping leaders scale teams across six countries and generated $60M+ in value is not in the Fact Sheet.
Fix: Remove or verify the experience, geography, and value-generation claims before retaining them.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe"
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [medium] Unverified Vit system claim (Company facts, not in sources)
The schema says Vit built an Applied AI Engineering system that provides board-ready proof of AI-driven engineering velocity, which is not in the Fact Sheet.
Fix: Remove or verify this founder and system claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system to give tech leaders board-ready proof of AI-driven engineering velocity."

### [medium] Unsupported production guarantees (Company facts, not in sources), 2 places
The promises of no risk to the codebase and zero IP exposure are not stated in the sources; the Fact Sheet says clients own the IP and engineers work in the client's environment.
Fix: Remove or substantiate these absolute security and IP claims.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "without risking the codebase."
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unsupported profile delivery time (Company facts, not in sources)
A promise to deliver vetted staffing profiles in 72 hours is not in the Fact Sheet.
Fix: Remove or verify the 72-hour profile-delivery promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Unverified faster hiring claim (Company facts, not in sources)
The claim of a 50% faster time-to-hire than US job boards is not in the Fact Sheet.
Fix: Remove or verify the comparative time-to-hire claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified recruiting network scope (Company facts, not in sources)
The claim that the recruiting network spans more than five US-timezone countries is not in the Fact Sheet.
Fix: Remove or verify the network-size and geographic-scope claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unverified feature speed claim (Company facts, not in sources)
The claim that every feature ships faster is not supported by the Fact Sheet.
Fix: Remove or substantiate the claim that GoGloby makes every feature ship faster.
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
