# Site report

Run 2026-11-05T13-18-29-815Z

## Scope

- Resources/Use cases: 13 pages

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

- modals@1: 13 pages

The form promises a response within one business day, a service commitment not stated in the company sources. Confirm the commitment or remove it.

### [medium] Unverified response-time promise (Company facts, not in sources), 2 places
The form promises a response within one business day, but the sources do not specify a response-time commitment.
Fix: Replace the promise with a confirmed response-time commitment or remove it.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 13 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 1) on 13 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /use-cases/ai-in-it/, /use-cases/ai-in-customer-experience/, /use-cases/ai-use-cases-in-cybersecurity/, /use-cases/agentic-ai-use-cases-in-cybersecurity/, /use-cases/generative-ai-use-cases-in-cybersecurity/, /use-cases/generative-ai-use-cases-in-finance/, /use-cases/agentic-ai-use-cases-in-finance/, /use-cases/ai-in-healthcare-best-ai-use-cases-benefits-examples/, /use-cases/agentic-ai-use-cases-in-healthcare/, /use-cases/generative-ai-in-healthcare-best-ai-use-cases-benefits-examples/, /use-cases/ai-in-marketing/, /use-cases/ai-use-cases-in-finance/, /use-cases/ai-in-ecommerce/

## Site-wide structured data

The schema presents GoGloby as an Applied AI Engineering and generative AI development provider, including offers the company does not sell. It also contains unsupported or conflicting service promises, timelines, founder claims, and insurance details that need correction before this schema is used.

### [high] Applied AI Engineering positioning (Positioning), 3 places
The schema positions GoGloby as an Applied AI Engineering partner and says it turns engineering into AI-native production, rather than using the approved company description.
Fix: Replace the Applied AI Engineering positioning with the approved company description and remove the claims about turning engineering into AI-native production.
Rule: decisions.md: Company description; Glossary §7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] US and EU talent coverage (Company facts)
The schema says GoGloby hires talent within US and EU time zones, while the documented services cover US recruiting and nearshore staffing from Latin America.
Fix: Replace the US-and-EU coverage claim with service locations supported by the company documents.
Rule: Fact Sheet: Services
- Site-wide structured data, Organization.description: "within the US & EU time zones."

### [high] Vit system-building claim (Positioning)
The schema says Vit built an Applied AI Engineering system, a claim absent from the sources and tied to the disallowed positioning.
Fix: Remove the system-building claim and avoid presenting GoGloby as an Applied AI Engineering provider.
Rule: Fact Sheet: Founders; Glossary §7
- Site-wide structured data, Person.description: "Built the Applied AI Engineering system"

### [high] Generative AI development offer (Discontinued offer), 2 places
The schema sells generative AI delivery and software-building services, while GoGloby is not a software development shop and sells recruiting and staffing.
Fix: Remove the generative AI development service and its software-delivery offer from the schema.
Rule: Fact Sheet: What GoGloby is not; Glossary §1 and §7
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "build copilots, AI agents, RAG applications, and agentic workflows"

### [high] AI Solutions Architect offer (Discontinued offer)
The schema presents Forward-deployed AI Solutions Architects as an offer, whereas AI Solutions Architect is not an approved offer and the documented services are recruiting and staffing.
Fix: Remove the AI Solutions Architect offer framing and describe only documented recruiting or staffing services.
Rule: Glossary §2 and §7
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."

### [high] First feature delivery promise (Discontinued offer)
The schema promises delivery of a validated feature within days, which presents GoGloby as doing client development work.
Fix: Remove the feature-delivery promise from the staffing description.
Rule: Fact Sheet: What GoGloby is not; Glossary §2
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [high] Staffing replacement guarantee (Company facts)
The schema describes a 120-day telemetry-backed staffing replacement guarantee, while the documented staffing terms specify performance-based no-cost replacement if results fall below baseline and cancellation any time in the first 120 days.
Fix: Replace the guarantee wording with the documented staffing replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [high] Professional liability coverage (Company facts), 2 places
The schema includes professional liability in the $3M policy, while the Fact Sheet specifies $3M data and cyber-liability insurance.
Fix: Correct the policy description to match the documented data and cyber-liability coverage.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional)"
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [medium] Sergey responsibilities claim (Company facts, not in sources)
The specific claim that Sergey leads Agentic SDLC methodology and secure development environment design is not in the Fact Sheet.
Fix: Remove or verify the specific responsibilities against an approved source before retaining them.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "Leads the Agentic SDLC methodology, secure development environment design"

### [medium] Vit experience and geography (Company facts, not in sources)
The claim that Vit spent the past decade scaling teams across the listed countries is not in the Fact Sheet.
Fix: Remove or verify the experience and geographic-scope claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams across the US, Canada, Argentina, Brazil, Mexico, and Europe"

### [medium] Vit value generation claim (Company facts, not in sources)
The $60M+ value-generation claim is not in the Fact Sheet.
Fix: Remove or verify the value claim before retaining it.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [medium] 72-hour profile promise (Company facts, not in sources)
The 72-hour profile-delivery timeline is not in the company documents.
Fix: Remove or verify the 72-hour timeline before using it.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."

### [medium] Zero IP exposure claim (Company facts, not in sources)
The absolute claim of zero IP exposure is not stated in the sources.
Fix: Remove or verify the zero-exposure claim and use only documented IP and security terms.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Five-day shortlist promise (Company facts, not in sources)
The five-day shortlist timeline is not in the company documents.
Fix: Remove or verify the five-day shortlist promise before using it.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."

### [medium] Faster hiring comparison (Company facts, not in sources)
The claim of being 50 percent faster than US job boards is not supported by the company documents.
Fix: Remove or substantiate the speed comparison before using it.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [medium] Unverified country count (Company facts, not in sources)
The claim that the talent network spans five or more US-time-zone countries is not in the company documents.
Fix: Remove or verify the country-count claim before using it.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Unverified hiring superlative (Company facts, not in sources)
The claim that GoGloby offers the world's most thoroughly vetted talent is not supported by the sources.
Fix: Remove or substantiate the superlative before using it.
Rule: Fact Sheet: Identity
- Site-wide structured data, Organization.description: "the world's most thoroughly vetted talent"

### [medium] AI visibility and speed claims (Company facts, not in sources)
The claims that every AI dollar is visible and every feature ships faster are not established by the documented tracking system.
Fix: Remove or substantiate the universal visibility and faster-shipping claims.
Rule: Fact Sheet: AI Development Intelligence Layer
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

- schema_recommended on 13 of 13 article pages: missing: BreadcrumbList
- image_dimensions on 13 of 13 article pages: 2 without width/height

Duplicates:

- none

Sitemap hygiene:

- https://gogloby.com/use-cases/ai-use-cases-in-healthcare/: redirects to https://gogloby.com/use-cases/ai-in-healthcare-best-ai-use-cases-benefits-examples/

## Repeated wording

- "He is a LinkedIn Top Voice in software development." (Company facts): 13 pages
- "4x Applied" (Old terms): 13 pages
- "He has spent 16+ years building and leading software teams" (Company facts): 10 pages
- "for companies across the US, Canada, and Europe" (Company facts): 9 pages
- "Performance Center" (Old terms): 9 pages
- "including certified Agentic SDLC mastery" (Company facts): 8 pages
- "Secure Development Environment" (Old terms): 6 pages
- "including certified Agentic SDLC mastery." (Company facts): 5 pages
- "with zero IP exposure" (Company facts): 4 pages
- "$3M Cyber-Liability Guarantee" (Company facts): 4 pages
- "Contact GoGloby Today" (CTA): 3 pages
- "the engineering standard behind 4x Applied AI Engineering" (Positioning): 3 pages
- "Contact GoGloby Now" (CTA): 3 pages
- "Applied AI Engineering Partner" (Old terms): 3 pages
- "engineering standard behind 4x Applied AI Engineering" (Positioning): 3 pages
- "Applied AI Software Engineers are vetted against" (Positioning): 3 pages
- "120-Day Free-Replacement Guarantee" (Company facts): 3 pages
- "Contact GoGloby" (CTA): 3 pages
