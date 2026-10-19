# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## What it is

PraxisFlow is a small agency that staffs law firms with **AI employees**: fixed-scope roles
(Intake Coordinator, Receptionist, AI Paralegal, and others) built on n8n, running in a private
environment dedicated to each firm, wired into the tools the firm already uses. Custom automation
and integrations is the second service and the engine underneath every role.

This site is the marketing website (Next.js, Strapi-backed blog). The "AI employees" positioning
is being trialled on branch `feat/ai-employees-redesign`; it is not yet approved to ship.

## Audience

US law firms, boutique to mid-size and high-volume practices (immigration and personal injury are
typical), that already run digital tools but lose leads and hours to manual intake, follow-up,
filing and data entry. Buyers: managing partner (more cases, same staff), practice/operations
manager (consistency, visibility), intake or marketing lead (no missed or slow leads), and whoever
owns IT risk (data stays private and auditable). Many of their clients write in Spanish or
Portuguese.

## Position

- Against generic "AI employee" template offers on white-label platforms: PraxisFlow integrates
  into the firm's own tools, handles errors, hosts, monitors and keeps tuning. Never name competitors.
- Every role states what it never does and when it hands off to a human. Shared rules: no role
  gives legal advice, signs or files anything, contacts courts or opposing counsel, moves money or
  deletes records. All hand off when a human is requested, when unsure, or on sensitive topics
  (complaints, fee disputes, emergencies).
- Bar advertising rules and ABA Formal Opinion 512 are reference points for what the roles may do.

## Roles (marketing roster, all presented as offered services, no status labels)

Featured: Intake Coordinator (flagship), Receptionist, AI Paralegal, Deadline and Docketing Clerk,
Case Status Assistant, Onboarding Specialist, Follow-up Coordinator, Filings Clerk.
More roles on request: Records Summarizer, Timekeeping Assistant, Inbox and Records Clerk,
Billing Clerk, Reputation Coordinator.

## Evidence and claims

- Public testimonial: LexSelect (Morgan Maguire, Co-Founder & CEO). Quote verbatim only. Never claim
  LexSelect improves accuracy or saves time.
- Intake case study stays anonymous: "a Boston immigration law firm".
- Confirmed figure: client onboarding went from 25-40 minutes to about 40 seconds per client.
- Existing marketing figures may stay, phrased as "typically" / "up to", not as exact results.
- Prices on /pricing are proposals (lib/site-content.ts `pricing`) until the business partner approves them. No other client names.
- Do not show results or numbers for Paralegal, Docketing, Case Status, Records Summarizer,
  Timekeeping or Reputation.

## Brand commitments

- Keep the existing logo (`public/PraxisFlow-Logotipo-Base.svg`, isotipo) and the color palette:
  slate 900 `#0f172a`, teal 600 `#0d9488`, white, slate tints.
- Calm, editorial, premium. Explicitly not generic AI-SaaS: no purple gradients, glowing orbs,
  robots, or human stock photos standing in for AI roles.
