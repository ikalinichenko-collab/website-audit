# Site report

Run 2026-11-02T16-18-50-871Z

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

The forms promise a response within one business day, a response-time commitment not stated in the company documents. Remove or verify that promise.

### [medium] Unverified response-time promise (Company facts, not in sources), 2 places
The forms promise a response within one business day, but the sources do not specify a response-time commitment.
Fix: Remove the response-time promise or verify it with the company before retaining it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 3 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /about/, /contacts/, /

Pages with modals@2: /privacy-policy/, /terms-and-conditions/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering partner and advertises generative AI development services that are not among its approved offers. It also contains unsupported claims and service details that need correction before the schema is reused.

### [high] Old Applied AI positioning (Positioning), 3 places
The schema describes GoGloby as an Applied AI Engineering partner and AI-native production company, rather than using the approved staffing and recruiting description.
Fix: Replace the Applied AI Engineering positioning throughout the schema with the approved company description.
Rule: decisions.md: Company description; Fact Sheet: Identity
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Discontinued development offers (Discontinued offer), 4 places
The schema sells Applied AI Engineering and generative AI development and delivery, offers that are not in GoGloby’s approved service catalog.
Fix: Remove the obsolete development offers and retain only the approved recruiting and staffing services.
Rule: Glossary §7; Fact Sheet: Services
- Site-wide structured data, OfferCatalog.name: "GoGloby Applied AI Engineering Service Catalog"
- Site-wide structured data, Organization.slogan: "Applied AI Engineering"
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "Production-ready generative AI delivery covering GenAI integration"

### [high] Unapproved service names (Company facts), 2 places
The schema uses different names for the two services instead of the approved US Data & AI Engineers Recruiting and Nearshore Data & AI Engineers Staffing names.
Fix: Use the approved service names in the schema’s service labels.
Rule: decisions.md: Service pages and official spelling; Fact Sheet: Services
- Site-wide structured data, Service.name: "AI Staff Augmentation"
- Site-wide structured data, Service.name: "Hire Applied AI Engineers"

### [high] Unsupported EU service scope (Company facts)
The schema claims GoGloby’s hiring scope covers US and EU time zones, while the approved services specify US roles or engineers from Latin America working US hours.
Fix: Correct the service geography to match the approved recruiting and staffing scopes.
Rule: Fact Sheet: Services
- Site-wide structured data, Organization.description: "within the US & EU time zones."

### [high] Sergey role description differs (Company facts), 2 places
The schema assigns Sergey leadership of the Agentic SDLC methodology and Applied AI system, while the approved founder description says he leads the infrastructure behind AI-native engineering.
Fix: Revise Sergey’s founder description to match the approved title and responsibilities.
Rule: decisions.md: Founders; Fact Sheet: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology, secure development environment design"
- Site-wide structured data, Person.description: "the technical architecture behind the Applied AI Engineering system."

### [high] Vitaly role description differs (Company facts)
The schema says Vitaly built the Applied AI Engineering system, while the approved description says he shapes company vision, growth strategy, sales, and marketing.
Fix: Revise Vitaly’s founder description to match the approved title and responsibilities.
Rule: decisions.md: Founders; Fact Sheet: Founders
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system"

### [high] Unsupported delivery timeline (Company facts)
The schema promises forward deployment in under four weeks, but the approved service timelines are 2–3 weeks to start for staffing and 4–6 weeks to offer for recruiting.
Fix: Replace this timeline with the applicable approved service timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Forward-deployed into your team in under 4 weeks."

### [high] Liability coverage overstates policy (Company facts)
The schema includes professional liability in the $3 million policy, while the Fact Sheet specifies $3 million data and cyber-liability insurance.
Fix: Correct the stated coverage to match the Fact Sheet.
Rule: Fact Sheet: Legal and security; Services
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional)"

### [high] Staffing guarantee differs (Company facts)
The schema promises a 120-day telemetry-backed replacement guarantee, while the approved staffing guarantee is performance-based replacement if results fall below baseline, with cancellation allowed during the first 120 days.
Fix: Replace the staffing guarantee with the approved performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [medium] Unverified value generation claim (Company facts, not in sources)
The claim that Vitaly generated more than $60 million in value is not in the Fact Sheet.
Fix: Remove the unverified value-generation claim or verify it against an approved source.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [medium] Unverified IP exposure promise (Company facts, not in sources)
The absolute promise of zero IP exposure is not stated in the sources; they specify client IP ownership and that engineers work in the client’s environment.
Fix: Remove the absolute promise or replace it with the approved IP and security terms.
Rule: Fact Sheet: Legal and security; Services
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unverified profile delivery time (Company facts, not in sources)
Delivery of vetted staffing profiles within 72 hours is not stated in the sources.
Fix: Remove or verify the 72-hour profile delivery promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Unverified feature delivery time (Company facts, not in sources)
The promise of a first validated feature within 3–5 business days is not stated in the sources.
Fix: Remove or verify the first-feature timing promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [medium] Unverified recruiting shortlist time (Company facts, not in sources)
A five-day recruiting shortlist promise is not stated in the sources.
Fix: Remove or verify the five-day shortlist promise.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Unverified faster hiring claim (Company facts, not in sources)
The claim of hiring 50 percent faster than US job boards is not stated in the sources.
Fix: Remove or verify the comparative hiring-speed claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified network geography (Company facts, not in sources)
A talent network spanning more than five US-time-zone countries is not stated in the sources.
Fix: Remove or verify the network-size and geography claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unsupported speed and visibility claims (Company facts, not in sources)
The schema promises every AI dollar is visible and every feature ships faster, claims not established by the sources.
Fix: Remove or substantiate the absolute performance and visibility claims.
Rule: Fact Sheet: Services; Glossary §7
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

- none

Duplicates:

- duplicate_meta: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production" on /about/, /

Sitemap hygiene:

- none

## Repeated wording

- "sales@gogloby.com hr@gogloby.com" (Contacts): 3 pages
- "mvidela@gogloby.com" (Contacts): 3 pages
- "bgasparino@gogloby.com" (Contacts): 3 pages
- "dduarte@gogloby.com" (Contacts): 3 pages
- "sergey@gogloby.com" (Contacts): 3 pages
- "logo-aicpa-soc2-type2-1-white-grayscale.png" (Company facts): 3 pages
- "logo-ism-iso-27001-1-grayscale.png" (Company facts): 3 pages
- "We will walk you through the Benchmark" (CTA): 3 pages
