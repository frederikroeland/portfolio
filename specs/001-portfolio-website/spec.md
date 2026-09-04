# Feature Specification: Personal Portfolio Website

**Feature Branch**: `001-portfolio-website`

**Created**: 2026-08-30

**Status**: Draft

**Input**: User description: "Create a profile/portfolio website of myself based on the information in `Knowledge/` — moodboard (Design/), a photo of me (id/), Urls.txt (use cases, current to-be-decommissioned site, a reference site I like, LinkedIn), and my resume."

## Overview

A single owner (Frederik Roeland) wants a modern personal portfolio website that presents him as a senior product leader in Finance & ESG. It replaces an existing, minimal GitHub Pages site and adopts the clean, modern aesthetic of a reference portfolio he admires (light theme, bold sans-serif headings, rounded cards, soft accent panels, testimonial and case-study style layout). Content is sourced from the provided resume, URLs, headshot, and moodboard.

The site is a read-only marketing/branding asset: there is no user account system, no database of visitor data, and no editorial workflow beyond the owner updating source content.

## Clarifications

### Session 2026-08-30

- Q: How many signature engagements should become dedicated case-study detail pages? → A: A curated set of 3–4 flagship engagements.
- Q: Should the site include visitor analytics/tracking? → A: No analytics or tracking of any kind (no cookies, no consent banner).
- Q: Should the site include a testimonials/recommendations section? → A: No; use awards/recognitions as social proof instead.
- Q: Where should the site be hosted / what is the canonical URL? → A: GitHub Pages (hard requirement), replacing the existing site.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Recruiter/peer forms an instant, credible impression (Priority: P1)

A visitor (recruiter, executive peer, or prospective client) lands on the homepage and within seconds understands who Frederik is, his professional identity (senior product leader for Finance & ESG), and his value proposition, reinforced by a professional headshot and a concise headline/summary.

**Why this priority**: This is the core purpose of a portfolio — a strong, immediate impression. If only this exists, the site already delivers value as a credible digital business card. It is the MVP.

**Independent Test**: Load the homepage on desktop and mobile; confirm the name, professional title, one-line value proposition, headshot, and a short professional summary are visible above or near the fold without interaction, and that the visual style matches the intended modern aesthetic.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on a desktop browser, **When** the homepage loads, **Then** the visitor sees the owner's name, professional title, a concise value proposition, and a professional headshot without scrolling past the first screen.
2. **Given** a visitor on a mobile phone, **When** the homepage loads, **Then** the same key identity elements are visible and legible, adapted to the smaller screen.
3. **Given** a visitor, **When** they view the hero section, **Then** the visual style (typography, color accents, spacing, rounded cards) is consistent with the agreed modern aesthetic.

---

### User Story 2 - Visitor reviews professional experience and expertise (Priority: P2)

A visitor wants to assess Frederik's seniority and domain expertise. They browse a structured presentation of his current role and responsibilities, a summarized career history, core areas of expertise (e.g., IFRS 9, US GAAP, ESG/sustainability reporting, finance transformation), and quantified impact.

**Why this priority**: Depth of credibility. After the first impression, the visitor needs substance to evaluate fit. Delivers standalone value even without case studies or contact features.

**Independent Test**: Navigate to the experience/expertise section(s); confirm the current role, a condensed career timeline, expertise areas, and measurable achievements are presented clearly and are scannable.

**Acceptance Scenarios**:

1. **Given** a visitor in the experience section, **When** they read the current role, **Then** they see the title, scope of responsibility, and quantified outcomes (e.g., revenue growth, NPS, team size).
2. **Given** a visitor, **When** they scan the career history, **Then** roles are presented in reverse-chronological, scannable form without overwhelming detail.
3. **Given** a visitor, **When** they view the expertise area, **Then** core domains and skills are grouped and easy to skim.

---

### User Story 3 - Visitor explores signature engagements and thought leadership (Priority: P3)

A visitor explores highlighted "case-study" style cards representing signature engagements (e.g., a global IFRS 9 rollout across 20+ countries, a climate-risk innovation initiative, hedge-accounting implementations) and thought-leadership pieces (commentaries, publications, speaking). Cards are tagged (e.g., by domain, industry, role type) similar to the reference site.

**Why this priority**: Differentiates Frederik from a plain CV by demonstrating applied impact and thought leadership. Valuable but not required for the MVP.

**Independent Test**: Open the engagements/insights section; confirm each item shows a title, short description, relevant tags, and (where applicable) a link to an external publication or resource.

**Acceptance Scenarios**:

1. **Given** a visitor in the engagements section, **When** they view a card, **Then** they see a title, concise summary, and tags describing domain/industry/role.
2. **Given** a visitor, **When** they select a thought-leadership item that links to an external resource, **Then** the resource opens in a new tab without losing the portfolio.
3. **Given** the recognitions/awards content, **When** the visitor views it, **Then** notable awards and recognitions are clearly presented.

---

### User Story 4 - Visitor connects or follows up (Priority: P4)

A visitor who is convinced wants to take action: connect with Frederik on LinkedIn and/or download his (redacted) CV.

**Why this priority**: Conversion. Without a clear next step, interest is lost. Depends on P1–P3 existing to generate the interest, hence lower priority.

**Independent Test**: Locate the contact/connect area; confirm the LinkedIn link opens the profile and the CV download works, with no restricted personal information exposed.

**Acceptance Scenarios**:

1. **Given** a visitor, **When** they select the LinkedIn link, **Then** the owner's LinkedIn profile opens in a new tab.
2. **Given** a visitor, **When** they choose to download the CV, **Then** a redacted PDF (with home address, phone, and personal emails removed) is downloaded.
3. **Given** the contact area, **When** it is displayed, **Then** no email address, phone number, or home address is exposed, and LinkedIn is the sole direct-contact channel.

---

### Edge Cases

- **Reduced motion**: If the visitor's system requests reduced motion, decorative animations (e.g., rotating headline words) must be minimized or disabled while content remains fully readable.
- **Slow connection**: If images load slowly, text content and layout remain usable; images have appropriate placeholders/alt text.
- **JavaScript disabled or failing**: Core identity, experience, and contact content remain accessible and readable.
- **Broken external link**: If an external resource (e.g., use-case library, publication) is unreachable, the visitor still sees the descriptive card and is not blocked.
- **Very large or very small viewport**: Layout adapts gracefully from small phones to large desktops without horizontal scrolling or clipped content.
- **Missing image asset**: If the headshot or a moodboard-derived asset is missing, a sensible fallback (alt text/placeholder) is shown.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The site MUST present a hero/identity section containing the owner's full name, professional title, a concise value proposition, and a professional headshot.
- **FR-002**: The site MUST present a professional summary describing the owner's current focus and seniority.
- **FR-003**: The site MUST present the current role including scope of responsibility and quantified outcomes (e.g., revenue growth, gross margin, NPS, team size) drawn from the resume.
- **FR-004**: The site MUST present a condensed, reverse-chronological career history summarizing previous roles and employers.
- **FR-005**: The site MUST present core areas of expertise and skills grouped for easy scanning (e.g., regulatory/accounting domains, ESG, data governance, languages, certifications).
- **FR-006**: The site MUST present a curated set of 3–4 signature engagement / case-study cards on the homepage, each with a title, short description, and descriptive tags, linking to its dedicated detail page.
- **FR-007**: The site MUST present thought-leadership items (commentaries/publications) and, where a source exists, link to the external resource opening in a new browser tab.
- **FR-008**: The site MUST present notable recognitions and awards.
- **FR-009**: The site MUST provide a link to the owner's LinkedIn profile, opening in a new tab.
- **FR-010**: The site MUST provide the owner's use-case/insights resource link(s) from `Urls.txt` where relevant to thought leadership.
- **FR-011**: The site MUST provide LinkedIn as the sole direct-contact channel. It MUST NOT display any email address, phone number, or home address, and MUST NOT include a contact form.
- **FR-012**: The site MUST adopt the modern visual aesthetic derived from the provided moodboard and reference site (light theme, bold sans-serif headings, rounded cards, soft accent panels, generous spacing).
- **FR-013**: The site MUST be responsive and legible across mobile, tablet, and desktop viewports without horizontal scrolling or clipped content.
- **FR-014**: The site MUST meet accessibility basics: sufficient color contrast, meaningful alt text for images, keyboard-navigable interactive elements, and respect for reduced-motion preferences.
- **FR-015**: The site MUST degrade gracefully when images or external links fail to load, keeping core content readable.
- **FR-016**: The site's content MUST be sourced from the provided `Knowledge/` materials (resume, URLs, headshot, moodboard) and MUST NOT invent professional facts not supported by those materials.
- **FR-017**: The site MUST use a multi-page structure: a homepage plus a dedicated detail page for each of the 3–4 curated signature engagements, with consistent navigation between them and a clear way to return to the homepage.
- **FR-018**: The site MUST anonymize all client references (e.g., "a global systemic bank", "a European telecom operator", "a global chemicals group"); named clients from the resume MUST NOT be published.
- **FR-019**: The site MUST include appropriate metadata for sharing and discoverability (page title, description, and social preview) so links render professionally when shared.
- **FR-020**: The site MUST offer a downloadable CV as a redacted PDF with the home address, phone number, and personal email addresses removed.
- **FR-021**: The site MUST be a fully static site deployable on GitHub Pages (no server-side runtime), replacing the existing site, with a canonical URL configured for the sharing metadata in FR-019.

### Key Entities _(include if feature involves data)_

- **Profile**: The owner's identity — name, professional title, value proposition, summary, headshot.
- **Role/Experience Item**: A position held — title, employer, period, responsibilities, quantified outcomes.
- **Expertise Area**: A grouped set of domains/skills — category label and constituent skills.
- **Engagement/Case Study**: A signature project — title, summary, tags (domain/industry/role), optional external link.
- **Thought-Leadership Item**: A commentary/publication — title, summary, optional external source link.
- **Recognition**: An award or acknowledgment — title, awarding body, year.
- **Contact Channel**: The approved means of connecting — LinkedIn profile link, plus a downloadable redacted CV.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify who the owner is and what he does within 5 seconds of the homepage loading (validated via unmoderated 5-second impression test with at least 5 participants, ≥80% correctly recall role/domain).
- **SC-002**: The site is fully readable and navigable on screens from 320px to 1920px wide with no horizontal scrolling or clipped content.
- **SC-003**: A visitor can reach the owner's LinkedIn profile and download the redacted CV within 2 interactions from any page.
- **SC-004**: All primary content (identity, experience, expertise, engagements, contact) is available without requiring the visitor to interact beyond scrolling.
- **SC-005**: The site meets accessibility basics: text contrast ratios pass WCAG AA, all meaningful images have alt text, and interactive elements are keyboard-reachable.
- **SC-006**: The homepage's primary content becomes visible quickly on a typical broadband connection (visible meaningful content in under 3 seconds).
- **SC-007**: 100% of published professional facts are traceable to the provided `Knowledge/` source materials.
- **SC-008**: When shared on a professional network or messaging app, the link renders with a correct title, description, and preview image.

## Assumptions

- The audience is primarily recruiters, executive peers, prospective clients/partners, and event organizers evaluating the owner's seniority and expertise.
- The site is a static, read-only presence (no login, no server-stored visitor data, no CMS, no contact form).
- No visitor analytics or tracking of any kind: no analytics scripts, no cookies, and therefore no cookie-consent banner or privacy-policy page is required.
- The current site (`https://frederikroeland.github.io/portfolio/index.html`) is to be decommissioned/replaced; its multi-color theme switcher is not carried over unless explicitly requested.
- The reference site (`https://www.amyuxwang.com/...`) informs aesthetic and structure (multi-page with case-study detail pages) only; its content is not reused.
- The provided headshot (`Knowledge/id/Frederik_Roeland.jpg`) is the approved profile image and may be published.
- Home address, personal phone number, and personal email addresses from the resume are private: excluded from all published content and removed from the downloadable CV.
- All client names are anonymized; only role, scope, domain, industry, and impact are described.
- No testimonials/recommendations section is included; awards and recognitions serve as social proof.
- English is the primary site language.
- Hosting MUST be GitHub Pages (a fully static site with no server-side runtime); this is a hard constraint. Remaining technology choices (e.g., static-site tooling) are deferred to planning.

## Dependencies

- Source content in `Knowledge/`: `Frederik_Roeland_Resume.docx`, `Urls.txt`, `id/Frederik_Roeland.jpg`, `Design/Mood_example_*.jpg`.
- External resources referenced by `Urls.txt`: LinkedIn profile, use-case/insights library, reference site, current site.
- A LinkedIn profile URL (from `Urls.txt`) that is publicly reachable.
- A redacted PDF CV to be produced from the resume for download.
