# Site report

Run 2026-11-02T16-12-07-902Z

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

The forms promise a response within one business day, but that response-time commitment is not supported by the company documents. Verify the commitment or remove it.

### [medium] Unverified response-time promise (Company facts, not in sources), 2 places
The page promises a response within one business day, but the company documents do not establish this response-time commitment.
Fix: Verify the response-time commitment or remove the promise from the forms.
Rule: Fact Sheet: Identity
- Forms (variant 1) on 3 pages, paragraph 1: "We will respond within one business day."
- Forms (variant 2) on 2 pages, paragraph 1: "We will respond within one business day."

Pages with modals@1: /about/, /contacts/, /

Pages with modals@2: /privacy-policy/, /terms-and-conditions/

## Site-wide structured data

The structured data presents GoGloby as an Applied AI Engineering and software-delivery company, contrary to its approved staffing and recruiting positioning. It also advertises unsupported service promises and misstates service names, timelines, guarantees, and insurance.

### [high] Old Applied AI positioning (Positioning), 3 places
The schema positions GoGloby as an Applied AI Engineering partner that turns engineering into AI-native production, rather than as a staffing and recruiting agency specializing in hiring Data & AI Engineers.
Fix: Replace the Applied AI Engineering positioning with the approved company description and remove claims that present GoGloby as an engineering or software-delivery partner.
Rule: decisions.md: Company description; Glossary §§1, 7
- Site-wide structured data, Organization.slogan: "Applied AI Engineering Partner"
- Site-wide structured data, Service.description: "GoGloby turns engineering into AI-native production."
- Site-wide structured data, WebSite.description: "GoGloby is an Applied AI Engineering partner turning engineering into AI-native production"

### [high] Development services no longer offered (Discontinued offer), 2 places
The service catalog sells generative AI development and delivery, including building copilots, agents, and RAG applications, which is outside GoGloby’s staffing and recruiting offers.
Fix: Remove the development-services offer and its delivery claims from the schema.
Rule: Glossary §§2, 7
- Site-wide structured data, Service.name: "Generative AI Development Services"
- Site-wide structured data, Service.description: "GoGloby's Applied AI Software Engineers build copilots, AI agents, RAG applications"

### [high] Outdated service names (Company facts), 2 places
The catalog uses service labels that do not match GoGloby’s official service names.
Fix: Use the official service names for recruiting and nearshore staffing in the service catalog.
Rule: decisions.md: Service pages; Fact Sheet: Services
- Site-wide structured data, Service.name: "AI Staff Augmentation"
- Site-wide structured data, Service.name: "Hire Applied AI Engineers"

### [high] Unsupported US and EU talent scope (Company facts)
The claim that GoGloby hires talent within US and EU time zones is unsupported and conflicts with the stated nearshore staffing talent location of Latin America.
Fix: Remove or correct the geographic scope to match the documented services.
Rule: Fact Sheet: Services
- Site-wide structured data, Organization.description: "hire the world's most thoroughly vetted talent within the US & EU time zones."

### [high] Unverified vetting superlative (Company facts)
The claim that GoGloby vets the world’s most thoroughly vetted talent is an unsupported superlative; the Fact Sheet states that approximately 4% of candidates pass its assessment.
Fix: Remove the unsupported superlative and use only documented assessment claims.
Rule: Fact Sheet: How we vet
- Site-wide structured data, Organization.description: "the world's most thoroughly vetted talent"

### [high] Unverified staffing speed promises (Company facts), 2 places
The 72-hour profile delivery and first-feature-in-3-to-5-business-days promises are not documented; the stated staffing time is 2–3 weeks to start.
Fix: Remove or verify these speed promises and align any staffing timeline with the documented service timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Vetted profiles delivered in 72 hours."
- Site-wide structured data, Service.description: "First validated feature in 3 to 5 business days."

### [high] Incorrect staffing guarantee (Company facts)
The schema describes staffing as having a 120-day telemetry-backed replacement guarantee, while the documented staffing terms are a performance-based no-cost replacement if results fall below baseline and cancellation any time in the first 120 days.
Fix: Correct the staffing guarantee to match the documented performance-based replacement and cancellation terms.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "120-day telemetry-backed replacement guarantee."

### [high] Unverified recruiting speed claims (Company facts), 2 places
A 5-day shortlist and a claim of 50% faster time-to-hire than US job boards are not documented; the Fact Sheet states 4–6 weeks to offer.
Fix: Remove or verify these claims and use the documented recruiting timeline.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Shortlist delivered in 5 days."
- Site-wide structured data, Service.description: "50 percent faster time-to-hire than US job boards."

### [high] Insurance coverage differs (Company facts), 2 places
The schema adds professional liability to the $3M coverage, while the Fact Sheet specifies $3M data and cyber-liability insurance.
Fix: Correct the insurance description to match the documented coverage.
Rule: Fact Sheet: Services; Legal and security
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) from day one."
- Site-wide structured data, Service.description: "$3M combined liability (cyber, data and professional) included."

### [high] Unsupported IP exposure claim (Company facts)
The absolute claim of zero IP exposure is not supported by the Fact Sheet, which states that clients own all IP and engineers work in the client’s environment.
Fix: Replace the absolute claim with only the documented IP and security terms.
Rule: Fact Sheet: Legal and security
- Site-wide structured data, Service.description: "Zero IP exposure."

### [medium] Unverified founder claims (Company facts, not in sources), 2 places
The claims that Vit Koval spent a decade scaling teams across the listed regions and generated $60M+ in value are not supported by the Fact Sheet.
Fix: Remove the unsupported tenure, geography, and value claims or verify them with the company before use.
Rule: Fact Sheet: Founders
- Site-wide structured data, Person.description: "For the past decade, has helped engineering leaders scale teams"
- Site-wide structured data, Person.description: "generating $60M+ in value."

### [medium] Unverified network coverage (Company facts, not in sources)
The claim that the recruiting talent network spans more than five US-timezone countries is not supported by the Fact Sheet.
Fix: Remove or verify the claim before including it in the schema.
Rule: Fact Sheet: Services
- Site-wide structured data, Service.description: "Talent network spans 5 plus US-timezone countries."

### [medium] Old product and offer terminology (Old terms)
The schema uses an old product name and presents AI Solutions Architect as a forward-deployed offer, although that term is allowed only as a role and not as an offer.
Fix: Remove the old product name and describe only documented recruiting or staffing roles and services.
Rule: Glossary §7
- Site-wide structured data, Service.description: "Forward-deployed AI Solutions Architects, safe by design."

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

- "US-Aligned Applied AI Engineering Hubs" (Positioning): 3 pages
- "mvidela@gogloby.com" (Contacts): 3 pages
- "bgasparino@gogloby.com" (Contacts): 3 pages
- "dduarte@gogloby.com" (Contacts): 3 pages
- "sergey@gogloby.com" (Contacts): 3 pages
