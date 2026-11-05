# Site report

Run 2026-11-02T15-56-22-524Z

## Scope

- Company/About: 1 pages
- Company/Contacts: 1 pages
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

- modals@1: 2 pages
- modals@2: 2 pages

The forms promise a response within one business day, but this response-time commitment is not stated in the company sources and should be verified or removed.

### [high] Unverified response-time promise (Company facts), 2 places
The forms promise a response within one business day, a service commitment not stated in the company sources.
Fix: Verify this response-time commitment with the company or remove it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 2 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /contacts/, /about/

Pages with modals@2: /privacy-policy/, /terms-and-conditions/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering and generative-AI development provider, an offer and positioning that conflict with the current company documents. It also contains unsupported or conflicting service claims, timelines, guarantees, and founder details that should not carry into any replacement schema.

### [high] Applied AI positioning is outdated (Positioning), 3 places
The schema describes GoGloby using prohibited Applied AI Engineering and AI-native production positioning.
Fix: Remove the outdated positioning and use the approved company positioning.
Rule: Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production:"

### [high] Company description is unapproved (Company facts), 2 places
The schema's company description differs from the approved one-sentence definition and adds an unsupported US-and-EU focus.
Fix: Replace the description with the approved company description and remove the unsupported geographic claim.
Rule: decisions.md: Company description
- Site-wide structured data, Organization.description: "US-based talent acquisition agency specializing in assisting tech companies to discover, assess, and hire"
- Site-wide structured data, Organization.description: "talent within the US & EU time zones."

### [high] Development services no longer offered (Discontinued offer), 3 places
The catalog sells Applied AI Engineering and generative AI development services, while the current offers are recruiting and nearshore staffing.
Fix: Remove the discontinued development-service offers and retain only current services.
Rule: Glossary §§1–2 and decisions.md: Service pages
- Site-wide structured data, Organization.slogan: "Applied AI Engineering"
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications"

### [high] Service names are not official (Company facts), 2 places
The catalog uses different names from the two official service names.
Fix: Use the official service names in the catalog.
Rule: decisions.md: Spelling and Service pages
- Site-wide structured data, Service.name: "AI Staff Augmentation"
- Site-wide structured data, Service.name: "Hire Applied AI Engineers"

### [high] Staffing start time conflicts (Company facts)
The promised first validated feature in 3 to 5 business days conflicts with the stated 2–3 weeks to start.
Fix: Correct the staffing timeline to match the Fact Sheet.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [high] Unverified profile delivery promise (Company facts)
The Fact Sheet does not substantiate a promise to deliver vetted profiles in 72 hours.
Fix: Remove the unsupported delivery-time claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [high] Staffing guarantee is inaccurate (Company facts)
The schema describes a telemetry-backed 120-day replacement guarantee, but staffing has a performance-based replacement and cancellation terms.
Fix: Replace the claim with the documented staffing guarantee and terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [high] Insurance coverage is overstated (Company facts), 2 places
The schema includes professional liability in the $3M coverage claim, which the Fact Sheet does not specify.
Fix: Limit the insurance claim to the documented coverage.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."

### [high] Recruiting timeline claims unsupported (Company facts), 2 places
The five-day shortlist and 50% faster time-to-hire claims are not supported by the Fact Sheet, which states 4–6 weeks to offer.
Fix: Remove the unsupported promises and use the documented recruiting timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [high] Unverified recruiter network geography (Company facts)
The claim that the recruiting network spans more than five US-timezone countries is not stated in the Fact Sheet.
Fix: Remove the unsupported network-geography claim.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [high] Unsupported founder claims (Company facts), 3 places
The schema attributes unverified methodology, geographic, and $60M+ value claims to the founders.
Fix: Remove founder claims not supported by the Fact Sheet.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology, secure development environment design"
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams"
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [high] Unverified AI value claims (Company facts)
The closing claim promises that every feature ships faster and every AI dollar is visible, neither of which is a documented company metric or guarantee.
Fix: Remove the unsupported performance and AI-spend claims.
Rule: Glossary §7; Fact Sheet: Services
- Site-wide structured data, WebSite.description: "every AI dollar visible, every feature shipped faster."

### [medium] Architects presented as an offer (Old terms)
AI Solutions Architect is presented as a forward-deployed service offer, rather than as a role GoGloby recruits or staffs.
Fix: Remove the architect offer framing and use the approved service descriptions.
Rule: Glossary §7
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."

### [medium] Old product name appears (Old terms)
Secure Development Environment is listed as a former product name that must not be used.
Fix: Remove the old product name.
Rule: Glossary §7
- Site-wide structured data, Person.description: "secure development environment design"

## SEO across pages

Failures on nearly every page of a type (listed once instead of per page):

- none

Duplicates:

- none

Sitemap hygiene:

- none

## Repeated wording

No wording flagged on three or more pages.
