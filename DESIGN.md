# Design Guide — White Editorial + Muted Gold

Portfolio of Jirapath (Sun), backend engineer for banking and enterprise platforms.
Readers: engineering managers, technical recruiters, other engineers. They should come away thinking *reliable, deep, clear*.

## 1. Visual concept

A well-set technical paper rather than a product landing page. White paper, near-black ink, one muted gold for emphasis.
Hierarchy comes from type size, weight and whitespace, not from color blocks, shadows or imagery.
Geist-style precision (tight grid, thin rules, small mono labels), with gold accents and short, plain first-person writing to keep it personal.

Rule of thumb: if an element only decorates, remove it. If it carries information, give it room.

## 2. Palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-subtle` | `#F8F8F6` | Alternate section band, card hover, code/label chips |
| `--text` | `#1C1C1A` | Headings, body, primary button fill |
| `--text-muted` | `#62625D` | Dates, meta, captions, secondary copy (6.1:1 on white) |
| `--border` | `#E6E5DF` | Rules, card borders, dividers |
| `--accent` | `#8A6B20` | Links, key numbers, small highlights (5.0:1 on white, 4.7:1 on `--bg-subtle`, so it passes AA for body text) |
| `--accent-soft` | `#8A6B201A` | Optional: 10% gold tint for a selected/active pill. Use rarely |

Gold budget: links, impact numbers, the active nav item, the focus ring, and at most one small marker per section (for example the label dot). Never use it for large fills, backgrounds or buttons.
Buttons: primary is charcoal `--text` with white text, going to `#000` on hover. Secondary is transparent with a `--border` outline and `--text` label, going to `--bg-subtle` on hover.
`--border` is decorative only (1.25:1). Anything that has to be seen, like focus or input outlines, uses `--text` or `--accent`.

## 3. Typography

```
--font-sans: "Geist", "Noto Sans Thai", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Consolas, monospace;
```
All three families are on Google Fonts. Load Geist 400/500/600, Geist Mono 400/500 and Noto Sans Thai 400/500 with `display=swap`. Putting Noto Sans Thai in the stack means Thai glyphs fall through to it automatically. Also mark Thai text with `lang="th"` and give it `line-height: 1.8`, because Thai needs more vertical room for its marks.

| Role | Desktop | Mobile | Weight / LH | Notes |
|---|---|---|---|---|
| Hero H1 | 60px | 38px | 600 / 1.05 | `letter-spacing: -0.03em` (large display text only) |
| Section H2 | 32px | 26px | 600 / 1.2 | `-0.02em` |
| H3 (role, case title) | 20px | 18px | 600 / 1.35 | |
| Body | 17px | 16px | 400 / 1.65 | Max width 680px |
| Small / meta | 14px | 14px | 400 / 1.5 | `--text-muted` |
| Section label | 12px mono | 12px mono | 500, UPPERCASE, `0.08em` tracking | The only place with wide tracking |
| Metric number | 40px | 32px | 600, `tabular-nums` | `--accent` |

Text is always left-aligned. Use Geist Mono only for section labels, dates, tech tags and metric units. Never use it for paragraphs or headings.

## 4. Layout and spacing

- Container is 1080px max with 24px side padding (16px under 640px). Reading blocks are 680px max.
- The spacing scale runs 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- Space between sections is 96px on desktop and 56px on mobile. Separate sections with a 1px `--border` rule or a `--bg-subtle` band, not both.
- Use a 12-column grid on desktop. A useful pattern is a 3-column left rail (section label, dates) next to 9 columns of content. On mobile everything stacks into one column and the rail becomes a line above the content.

## 5. Page composition

1. **Hero**
   - Mono label: `SENIOR SOFTWARE ENGINEER`.
   - H1: *Building reliable backend systems for banking and enterprise platforms.*
   - One 2-line positioning sentence in `--text-muted`, under 680px.
   - Buttons: **View work** (primary) and **Download CV** (secondary).
   - Optional: one muted line with location and links.
   - No photo, illustration or tech wall. Top padding about 120px on desktop.
2. **Selected Impact**
   - Three or four metrics in a row, two on mobile. Each has a gold number and a one-line label.
   - Each also has a muted context line: what *you* did, then the system or scale it ran in.
   - No cards; use thin dividers between metrics.
3. **Selected Work**
   - Two or three case studies, each with the same three short parts: **Problem**, **My contribution**, **Outcome**.
   - Show the tech used as small mono tags at the bottom.
   - This is the one section that uses cards, one per case study.
4. **Experience**
   - A plain chronological list. Left rail: dates in mono, muted. Right: role, company, then two to four outcome bullets.
   - Separate entries with thin rules, not cards.
5. **Expertise**
   - Three columns: **Backend · Data · Platform**. Each is a short list of plain text items, optionally with one muted qualifier (e.g., "production, 4 yrs").
   - No logos, bars or percentages.
6. **Contact**
   - One sentence and three text links: email, GitHub, LinkedIn. Gold links with an arrow `↗` for external ones.
   - Footer: name, year, a "Download CV" link.

**Nav:** sticky, white, 1px bottom border once scrolled. Name on the left, 4–5 text links on the right, and the active link in `--accent`. On mobile, a simple menu button opens a full-width sheet.

## 6. Components

- **Links** use `--accent` with an underline offset of 3px and a thickness of 1px. The underline appears on hover. External links get `↗`.
- **Buttons** are 40px tall with 16px horizontal padding, 8px radius, 15px text at weight 500. No shadow.
- **Cards** use `--bg` with a 1px `--border`, 12px radius and 24–32px padding. On hover the border goes to `#D6D4CC` with a 0 1px 2px rgba(0,0,0,.04) shadow at most. Never nest cards.
- **Tags** use 12px Geist Mono on `--bg-subtle` with a 1px `--border`, 6px radius and 2px×8px padding, in `--text-muted`.
- **Metric**: gold number, 14px label in `--text`, and a muted 14px context line.
- **Section header**: mono label (with an optional 6px gold dot), then H2, then an optional one-line muted intro.
- **Dividers**: 1px `--border`, full container width.
- **Focus**: `outline: 2px solid var(--accent); outline-offset: 2px` on every interactive element, triggered by `:focus-visible`.
- **Motion**:
  - Hover transitions are 150–200ms `ease-out` and only change color, border or opacity.
  - Sections can fade in with an 8px upward rise over 200ms, once per section.
  - Wrap all motion in `@media (prefers-reduced-motion: no-preference)`.

## 7. Responsive behavior

| Breakpoint | Changes |
|---|---|
| ≥ 1024px | Full 12-col grid, label rail, 3–4 metrics per row, 3 expertise columns |
| 640–1023px | Rail collapses above content, 2 metrics per row, 2 expertise columns |
| < 640px | Single column, 16px gutter, H1 38px, 56px section gap, buttons full width and stacked, tap targets ≥ 44px |

No horizontal scroll at 320px. Long tech names wrap inside tags.

## 8. Content rules

- Use only roles, projects and numbers that are in the CV. Don't invent metrics, availability or responsibilities.
- Separate **your contribution** from **platform scale**. Write "Built the batch reconciliation service (Spring Boot) for a platform serving 1M+ users", not "Served 1M+ users".
- Every metric needs three things: the number, what changed, and the context.
- Use the job title that appears on the CV. The site's hero and the brief must agree on it, e.g. "Senior" vs. "Backend Software Engineer".

## 9. Avoid

Heavy gradients, glassmorphism, neon colors, stacked shadows, terminal-style heroes, typing effects, decorative code blocks, logo walls, skill-percentage bars, card grids everywhere, empty full-screen sections, and scroll-jacking or parallax.

## 10. Starter tokens

```css
:root {
  --bg: #FFFFFF; --bg-subtle: #F8F8F6;
  --text: #1C1C1A; --text-muted: #62625D;
  --border: #E6E5DF; --accent: #8A6B20;
  --radius: 10px; --container: 1080px; --reading: 680px;
  --ease: 180ms ease-out;
}
```
