# Developer Style Guide

This file is the implementation blueprint for the current React/Vite portfolio. Future work should follow these patterns unless the project is intentionally being redesigned.

## 1. Stack And App Shape

- Runtime: React 19 + Vite 7.
- Routing: `react-router-dom` with a single layout wrapper and page routes.
- Styling: Tailwind v4 utilities layered on top of a custom token system in `src/index.css`.
- UI primitives: lightweight shadcn/base-ui primitives in `src/components/ui`.
- Data fetching: `axios` through thin API helpers in `src/api`, then page-level consumption through `useAsyncData`.
- Animation: CSS keyframes and transition utilities only.
- No global state library, no context layer, no Framer Motion.

## 2. Folder Structure

Current source structure:

- `src/pages`: route-level screens. These own page composition and async page data.
- `src/components`: reusable presentational pieces used across pages.
- `src/components/home`: page-specific section components extracted from the home page.
- `src/components/ui`: low-level UI primitives such as `Card`, `Badge`, `Button`, `Skeleton`.
- `src/layouts`: shell components. `MainLayout` is the only active layout.
- `src/hooks`: shared React hooks. Currently `useAsyncData`.
- `src/api`: axios client and endpoint wrappers.
- `src/assets`: raster assets and icons.
- `src/lib`: generic utilities such as `cn`.
- `src/Routes`: route declaration.

Structural rule:

- Keep route-level orchestration in `pages`.
- Move repeated visual sections into `components` or a page-specific subfolder.
- Keep API transport concerns out of components.
- Keep primitive styling helpers out of pages.

## 3. Layout And Composition Pattern

App composition flows like this:

1. `main.jsx` mounts `App`.
2. `App.jsx` delegates directly to `AppRoutes`.
3. `AppRoutes.jsx` defines browser routes.
4. `MainLayout.jsx` wraps every page with `Navbar`, `Outlet`, and `Footer`.

Authoring style:

- Pages are functional components using `const ComponentName = () => {}`.
- Pages usually return one root wrapper with page-specific root classes such as `home-root`, `projects-root`, `pd-root`, `contact-root`.
- Repeated decorative shapes are page-level concerns, not abstracted into a component.
- Shared page sections use section-level wrappers with clear CSS classes such as `hero-section`, `projects-hero`, `cta-card`.

## 4. Naming Conventions

- Components/files: PascalCase.
  - Examples: `ProjectCard.jsx`, `SkillsSection.jsx`, `MainLayout.jsx`
- Hooks: `useSomething`.
  - Example: `useAsyncData`
- Variables and functions: camelCase.
  - Examples: `skillGroups`, `handleSubmit`, `getFeaturedProjects`
- Event handlers: `handleX`.
  - Examples: `handleChange`, `handleSubmit`
- Booleans: `isX`, `hasX`.
  - Examples: `isFeatured`, `isInProgress`
- Shared constant maps/arrays live above the component body.
  - Examples: `statusMap`, `services`, `skillGroups`, `stats`, `stack`

Notable legacy quirks to preserve unless intentionally cleaned up:

- `src/Routes` uses uppercase folder naming.
- `projectsAPi.js` uses a mixed-case filename typo.

## 5. Component Contract Pattern

### Props

- Presentational components usually receive simple explicit props.
  - `SectionHeading({ eyebrow, title, description, align = "left" })`
  - `EmptyState({ title, description })`
- Domain-driven components usually accept one domain object prop.
  - `ProjectCard({ project })`
- Props are destructured in the function signature.
- Default values are set inline in the signature when needed.

### State

- State is local by default.
- No reducer pattern is currently used.
- No context or cross-page shared state exists.
- Form state is a single object for related fields.
  - `formData`
- Async page state follows the triplet:
  - `data`
  - `loading`
  - `error`

### Events

- Event handlers are concise and colocated near the top of the component.
- Controlled inputs use object updates with functional setters.
  - `setFormData((current) => ({ ...current, [name]: value }))`
- Submit handlers call `preventDefault()` directly in the page component.

## 6. Data And Async Pattern

Current standard:

- API calls live in `src/api/projectsAPi.js`.
- `axiosInstance` in `src/api/axios.js` owns base URL configuration.
- Pages consume API helpers through `useAsyncData`.

`useAsyncData` contract:

- Inputs:
  - `fetcher`
  - `enabled`
  - `errorMessage`
  - `initialData`
  - `watch`
- Outputs:
  - `data`
  - `loading`
  - `error`
  - `refresh`
  - `setData`

Usage pattern:

- Fetch at the page level, not inside small presentational components.
- Use `initialData: []` for collections.
- Use `initialData: null` for detail pages.
- Use `watch` when route params should retrigger the request.
- Render explicit loading, error, empty, and success branches in the page.

## 7. Visual System

The project uses a dual system:

- Tailwind utility classes for layout and local styling.
- CSS custom properties in `src/index.css` for recurring brand tokens and page-specific surfaces.

### Core Colors

Primary brand colors:

- `--clr-orange: #e8570a`
- `--clr-orange-dark: #c94508`
- `--clr-orange-dim: rgba(232, 87, 10, 0.07)`
- `--clr-orange-glow: rgba(232, 87, 10, 0.35)`

Base surfaces:

- `--clr-bg: #1a1714`
- `--clr-bg-card: #201d19`
- `--clr-bg-card-alt: #1c1916`
- `--clr-bg-chip: #2a2520`

Borders:

- `--clr-border: #2e2924`
- `--clr-border-mid: #3a3530`
- Shared section border uses a tinted orange alpha border.

Text:

- `--clr-text: #f0ece4`
- `--clr-muted: #8a8278`
- `--clr-para: #a09890`
- Direct hard-coded bright text also appears as `#F8F8F8` in several component titles/cards.

### Gradients And Surfaces

Recurring surfaces:

- `--card-bg`: gradient card surface for feature cards and content boxes.
- `--section-bg`: deeper section gradient for hero and major page headers.

Usage pattern:

- Big hero/header surfaces use `var(--section-bg)`.
- Mid-level content cards use `var(--card-bg)`.
- Simpler utility cards sometimes use `var(--clr-bg)` to blend into the page.
- Chips and compact icon containers use `var(--clr-bg-chip)`.

### Typography

- Display/headings: `Syne`
- Body text: `DM Sans`
- Fallback system font is `Geist Variable` through Tailwind’s `font-sans`.

Text treatment:

- H1/H2: bold, large, negative tracking.
- Eyebrows: uppercase, letter-spaced, muted.
- Body copy: lighter weight, longer line-height.
- Important accents are italicized orange spans in titles.

### Spacing

Common spacing rhythm:

- Full page section padding: `py-20`, `py-16`
- Container padding: `px-4`, `px-8`
- Card padding: `p-6`, `p-8`, `p-[1.75rem 2rem]` equivalent via CSS
- Grid gaps: `gap-6`, `gap-5`, `gap-4`
- Internal text stacks: `space-y-2`, `space-y-4`, `space-y-5`

### Border Radius

Recurring radii:

- Section containers: `20px` via `--section-radius`
- Card containers: `16px` via `--card-radius`
- Buttons: `6px`
- Chips: `8px`
- Circular badges/icons: `50%` or full rounded classes
- Tailwind card primitives default to `rounded-2xl`

## 8. Interaction Patterns

There is no Framer Motion. Motion is entirely CSS-based.

### Keyframes

Shared keyframes in `index.css`:

- `fadeSlideUp`
- `floatShape`
- `floatBadge`
- `loadingSlide`

### Hover Behavior

Standard hover moves are subtle:

- vertical lift: `translateY(-1px)` or `translateY(-2px)`
- horizontal nudge for directional items: `translateX(3px)` or `translateX(4px)`

Standard hover properties:

- `border-color`
- `color`
- `background-color`
- `box-shadow`
- `transform`

Typical durations:

- `0.15s` for transform
- `0.2s` to `0.25s` for color, border, and shadow changes

### Interaction Style Rules

- Motion is decorative, not theatrical.
- Use one or two subtle effects at once.
- Prefer hover states that sharpen orange accents rather than introducing new colors.
- Preserve the muted-to-bright hover pattern already used in nav, chips, buttons, and links.

## 9. Reusable UI Patterns

### Section Heading

`SectionHeading` is the standard block for section intros:

- eyebrow
- title
- description
- optional left/center alignment

Use this for new sections unless the section intentionally needs a custom hero.

### Badges And Chips

- Status and metadata are badge-based.
- Skills and tags are compact pills.
- Badge usage is visual, not deeply abstracted.
- Semantic colors are used directly for project status.

### Cards

Cards come in two forms:

1. shadcn-style primitive wrappers via `Card`, `CardHeader`, `CardContent`
2. bespoke CSS-token cards like `about-card`, `cta-card`, `contact-form-card`

Rule:

- Use the primitive `Card` for compact reusable content blocks.
- Use custom CSS token classes for major branded sections.

### Empty/Loading States

- Empty state uses icon + title + description centered in a bordered box.
- Loading states are explicit and visible.
- Skeletons mirror final layout shape rather than generic bars when possible.

## 10. Authoring Style In JSX

Observed conventions:

- JSX is grouped with inline comments such as `/* Hero Section */`, `/* Body */`.
- Return branches are direct and readable, especially for loading/error/detail pages.
- Lists are rendered inline with `map`.
- Keys use stable identifiers when available (`id`, `title`, `label`, `name`).
- Simple conditional rendering uses `&&`.
- Multi-branch rendering often uses nested ternaries for short content areas and early returns for page states.

Preferred structure:

- imports
- local constants
- component
- state/hooks
- handlers
- render

## 11. Styling Strategy

Styling is not purely utility-first. The project mixes:

- semantic CSS classes defined globally in `index.css`
- local Tailwind utilities for layout and one-off presentation
- CSS custom properties for brand consistency

This means future work should:

- prefer existing semantic classes and tokens before inventing new raw values
- use Tailwind for layout, spacing, and simple local overrides
- add new CSS classes in `index.css` when a pattern is page-level or reused across sections

## 12. Accessibility And Markup Tendencies

Current patterns:

- Decorative images use `alt=""` and `aria-hidden="true"`.
- Interactive navigation uses `Link` and `NavLink`.
- Buttons and anchors are no longer nested together.
- SVG icons are often inline.

Expected continuation:

- Keep decorative media hidden from assistive tech.
- Use semantic elements first: `section`, `aside`, `nav`, `main`, `footer`.
- Keep click targets visually clear and keyboard-safe.

## 13. Standards To Follow For Future Features

When adding a new feature, default to these rules:

- Put new route screens in `src/pages`.
- Fetch data in the page, not the leaf component.
- Use `useAsyncData` for page requests.
- Build major page surfaces with the existing orange-on-charcoal token system.
- Use `SectionHeading` for standard section intros.
- Match existing spacing:
  - outer sections: `py-16` or `py-20`
  - cards: `p-6` or tokenized CSS padding
  - grids: `gap-6`
- Match existing corners:
  - section: `20px`
  - card: `16px`
  - chip: `8px`
- Match text styling:
  - title in bright off-white
  - body in muted neutral
  - eyebrow uppercase muted
- Match interaction style:
  - short transitions
  - slight lift/nudge
  - orange highlight on hover
- Prefer CSS keyframes over animation libraries.

## 14. Do Not Introduce By Default

- Framer Motion
- complex global state
- deeply nested component abstraction for simple sections
- radically different color palettes
- glassmorphism or bright white surfaces
- default shadcn look without adapting it to project tokens
- generic blue focus/hover colors when orange tokens already define the brand

## 15. Current Project Identity In One Sentence

This codebase is a page-driven React portfolio with a dark warm-charcoal surface system, orange accent branding, gradient section cards, lightweight local state, CSS-first motion, and pragmatic component extraction rather than heavy abstraction.
