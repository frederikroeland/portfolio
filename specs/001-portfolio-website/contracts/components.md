# Component (Partial & Fragment) Contract

There is no UI framework. "Components" are (a) **HTML partials** composed at build time via `posthtml-include`, and (b) **build-time render fragments** produced from typed data modules. All interactive/anchor elements MUST be keyboard-reachable with a visible focus state (FR-014, SC-005).

## HTML partials (`src/partials/`)

| Partial       | Include variables                               | Responsibility                                                             | Serves         |
| ------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| `head.html`   | `title`, `description`, `canonical`, `ogImage?` | `<head>` meta/OG/Twitter/canonical + stylesheet + deferred script          | FR-019, SC-008 |
| `header.html` | —                                               | Site header: home link + section anchors; responsive nav; skip-link target | FR-013, R2     |
| `footer.html` | —                                               | LinkedIn + CV links (new tab / relative), copyright                        | SC-003         |

`posthtml-include` injects partials via `<include src="../partials/head.html" locals='{ ... }'></include>` (or equivalent). The `head` partial's variables are provided per page.

## Build-time render fragments (from `src/data/`)

| Fragment                | Input                                            | Output markup                                                   | Serves         |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------------------- | -------------- |
| Engagement cards        | `engagements` (sorted by `featuredOrder`)        | Grid of cards: title, summary, tags, link to `work/<slug>.html` | FR-006         |
| Thought-leadership list | `insights`                                       | List items; external items open new tab                         | FR-007, FR-010 |
| Recognitions list       | `recognitions` (sorted by `year` desc / `order`) | List of award + body + year                                     | FR-008         |
| Expertise grid          | `expertise` (sorted by `order`)                  | Grouped category → items                                        | FR-005         |

## TypeScript enhancement modules (`src/scripts/`)

| Module    | Responsibility                                                                                                                                      | Serves         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `main.ts` | Mobile-nav toggle, footer year, `prefers-reduced-motion` guard for any decorative animation. Loaded with `defer`; site fully functional without it. | FR-014, FR-015 |

## Behavioral contracts

- **C1 — Zero required JS for content**: All content renders as static HTML/CSS. `main.ts` is progressive enhancement only; with JS disabled, identity/experience/contact remain readable and links work (FR-015).
- **C2 — Images**: Every `<img>` has meaningful `alt`; the headshot is an optimized asset. Missing optional images render nothing (no broken box) (FR-015).
- **C3 — External anchors**: LinkedIn and external insight links use `target="_blank" rel="noopener noreferrer"` (FR-007, FR-009).
- **C4 — Responsive**: Layouts use fluid/grid CSS validated at 320/768/1440px with no horizontal scroll (FR-013, SC-002).
- **C5 — Ordering**: Engagement cards by `featuredOrder`; recognitions by `year`/`order`; expertise by `order`; experience authored reverse-chronologically in HTML.
- **C6 — Contrast & focus**: Tailwind `@theme` tokens meet WCAG AA; all interactive elements have visible focus states (SC-005).
- **C7 — DRY**: `<head>`, header, and footer exist once as partials and are included on every page; no duplicated chrome markup.
