# Route Contract

All routes are static HTML files. There is no server or router; navigation is plain relative links. Internal links and asset references MUST be **relative** so the site is path-agnostic on GitHub Pages (project or user page).

| Output path (in `dist/`)    | Source                                                       | Renders                                                                                                                                                 | Serves                         |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `index.html`                | `src/pages/index.html` + partials                            | Hero, Professional Summary, Current Role, Experience, Expertise, Engagement cards (3–4), Thought-Leadership list, Recognitions, Contact (LinkedIn + CV) | US1–US4; FR-001–FR-010, FR-020 |
| `work/<slug>.html`          | `src/pages/work/<slug>.html` + partials (one per engagement) | Case-study detail: title, hero, tags, role, impact, prose body; back-to-home nav                                                                        | US3; FR-006, FR-017            |
| `404.html`                  | `src/pages/404.html`                                         | Friendly not-found with relative link home                                                                                                              | Graceful navigation            |
| `sitemap.xml`, `robots.txt` | `public/`                                                    | Discoverability                                                                                                                                         | FR-019, SC-008                 |

## Route behavior contracts

- **R1 — Detail pages**: Exactly one `work/<slug>.html` per `engagements` entry; `slug` matches the data module (SI-3). Count 3–4.
- **R2 — Navigation**: Every page includes the shared `header` (home link + section anchors) and `footer` (LinkedIn + CV) partials. LinkedIn and CV are reachable within 2 interactions from any page (SC-003).
- **R3 — External links**: LinkedIn and any `externalUrl` open in a new tab with `target="_blank"` and `rel="noopener noreferrer"` (FR-007, FR-009).
- **R4 — CV download**: The CV link is a relative path to `cv/frederik-roeland-cv-redacted.pdf`; served as a PDF (FR-020). E2E asserts 200 + `application/pdf`.
- **R5 — Metadata**: Every page renders the `head` partial with per-page title, description, canonical, and Open Graph/Twitter tags (FR-019).
- **R6 — Missing content**: If an optional image/link is absent, the page still renders core content with no layout break (FR-015).
- **R7 — Relative links only**: No absolute `/…`-rooted internal links; validated by the link check.
