# TRUTHLENS — Design Specification

**Version:** 1.1 — Proposed design  
**Date:** 18 October 2026  
**Companions:** `PRD.md`, `Architecture.md`  
**Inputs:** User-provided Tailwind/HTML components and TRUTHLENS product brief.

## 1. Design direction

Build a calm, precise enterprise interface with a memorable opening visual: a three-dimensional verification lens inspecting abstract evidence layers. Use the supplied components as structural references, adapted to TRUTHLENS branding, accessible interactions, and actual product capabilities.

The primary palette remains white, deep red, and charcoal. The dark template, blue progress ring, purple gradients, generic developer copy, stock portraits, and PrebuiltUI logos are reference material to replace. The application is an evidence investigation workspace; its visual confidence must never imply certainty about detector accuracy.

This document specifies design and implementation behaviour. It does not build the website or supply a finished 3D asset. The proposed animation is a custom CSS perspective composition; no ready-made 3D asset or additional rendering dependency is required.

## 2. Supplied component adaptation

| Supplied component | TRUTHLENS use | Required changes |
| --- | --- | --- |
| Rounded navigation with sliding links | Public landing-page navigation | White surface, subtle border, charcoal links, shield/lens wordmark, deep-red primary CTA; retain pill geometry. |
| Dark 404 block | Application not-found page | White layout, red 404 accent, clear recovery route; remove dark gradient text and placeholder link. |
| Circular 90% indicator | Evidence coverage or real processing progress | Drive geometry and label from actual data; red accent; never present a hardcoded 90% as confidence or risk. |
| Deletion confirmation card | Evidence deletion modal | Name the item, explain exact scope and policy constraints, wire cancel/confirm, show pending/error/success states. |
| Large gradient hero with prompt box | Landing hero and optional context entry | Split layout with verification lens, clear value proposition, upload-first action; replace generic creator prompt and remote background. |
| Two-column “What we do” section | “From signal to evidence” explainer | Evidence illustration and workflow narrative; replace portraits/community counts with source-linked product UI. |

Reimplement these as reusable React components. Convert `class` to `className`, SVG attributes to React conventions, and DOM listeners to component state/effects. Avoid duplicate global IDs and global styles. Preserve attribution or other notices wherever the source licence requires them; verify licence terms before shipping copied code or assets.

## 3. Brand and design tokens

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#FFFFFF` | Main background. |
| `surface-subtle` | `#F8FAFC` | Page sections and subdued cards. |
| `surface-red` | `#FEF2F2` | Light emphasis, warning context. |
| `text-primary` | `#111827` | Headings and body text. |
| `text-secondary` | `#475569` | Supporting descriptions. |
| `border-default` | `#E2E8F0` | Card and table separation. |
| `border-control` | `#64748B` | Inputs and controls needing a visible boundary. |
| `brand` | `#991B1B` | Primary buttons, selected navigation, important headings. |
| `brand-hover` | `#7F1D1D` | Primary hover state. |
| `risk-high` | `#B91C1C` | High assessed risk. |
| `risk-review` | `#92400E` | Review-recommended text and icons. |
| `risk-lower` | `#166534` | Lower-assessed-risk label, never a guarantee of authenticity. |
| `state-unavailable` | `#475569` | Unsupported or unavailable checks. |

Use white text on deep-red primary controls. Pair all risk colours with an icon and explicit wording. Verify actual text, border, focus, and chart contrast in implementation; these tokens do not establish compliance on their own.

### Typography, spacing and shape

Use Poppins from the reference for short marketing headings if locally available and appropriately licensed. Use a system sans-serif stack for application tables and long evidence text. Self-host any approved font files; do not rely on a global remote CSS import.

| Element | Desktop | Mobile |
| --- | --- | --- |
| Hero title | 56 px, 1.08 line height | 36 px, 1.15 |
| Page heading | 30 px, 1.2 | 26 px, 1.25 |
| Section heading | 24 px, 1.3 | 22 px, 1.3 |
| Body / controls | 16 px, 1.5 | 16 px, 1.5 |
| Table / metadata | 14 px, 1.5 | 14 px, 1.5 |

Use a 4 px spacing scale, 24–32 px card padding, 12–16 px card radii, 8–12 px control radii, and pill radii for public navigation and selected marketing actions. Prefer a subtle `0 8px 24px rgba(15,23,42,0.06)` card shadow. Remove the supplied large white button glow.

## 4. Landing-page composition

### Navigation

Use a centred container up to 1200 px with 24 px desktop gutters and 16 px mobile gutters. The rounded navigation is 72 px high on desktop and content-sized on mobile.

Left: TRUTHLENS shield/lens mark and wordmark. Centre: Capabilities, How It Works, Evidence & Review, Security. Right: Sign In and Start Analysis. Each section link navigates to a real anchor; authenticated actions navigate to the implemented route. Include pricing/contact only when real destinations exist.

Retain the reference's sliding-link treatment at 160–200 ms, including keyboard focus. Duplicate animated text must be hidden from assistive technology. Disable translated motion under reduced-motion preferences.

Mobile navigation opens a compact panel below the navbar, positioned relative to its container. Do not use the supplied fixed `top-48` position or a hardcoded 785 px menu height. The toggle needs an accessible label, `aria-expanded`, and `aria-controls`; Escape closes it and returns focus. A non-modal disclosure panel is sufficient, so avoid an unnecessary focus trap.

### Hero

Desktop: 55% text and actions, 45% visual. Mobile: text and CTA first, static scene below. Use a minimum comfortable viewport composition rather than a fixed 785 px height.

- Eyebrow: **MULTIMODAL AUTHENTICITY & RISK ANALYSIS**
- Heading: **Verify the signal. Understand the risk.**
- Description: **Inspect media and suspicious communications, trace the evidence, and decide what to do next.**
- Primary action: **Start analysis**
- Secondary action: **Explore a sample report** — only when a real approved DEMO sample is available.
- Supporting note: **Evidence-linked findings. Explicit limitations. Human decisions.**

Below the hero, show supported input categories as simple labelled icons. Capability text must reflect the deployed support matrix. Do not claim every category has a detector when only extraction or rules are available.

### Remaining sections

1. **One workspace, multiple signals:** modality cards with actual capabilities and limitation links.
2. **From signal to evidence:** the supplied two-column section adapted to an evidence-layer illustration and four steps: Submit, Inspect, Understand, Review.
3. **A finding you can investigate:** approved sample report with visible DEMO label, supporting excerpt, check version, limitation and recommendation.
4. **Human review stays central:** show assignment, request for more evidence, and recorded decision.
5. **Private by default:** explain implemented access, retention and evidence controls without unsupported certifications.
6. **Final CTA and footer:** Start Analysis, documentation, privacy, retention, terms and actual support routes.

Do not copy the supplied developer-community count or stock portraits as customer proof. Show no fabricated metrics, testimonials, company logos, or accuracy claims.

## 5. Opening 3D animation: Verification Lens

### Recommended concept

A compact graphite-and-red lens ring floats above three translucent evidence panels representing an image, waveform and document. A soft deep-red scanning plane passes over the panels once. Evidence anchors appear as small neutral outlined markers and connect to a slim evidence-summary card. The lens settles into a calm resting angle.

Use abstract geometry, no realistic faces, no biometric scanning theatre, no glitch effects, and no dramatic warning flashes. The scene symbolises inspection and traceability, not an actual analysis or a promise of detection. Label the scene **Illustrative workflow** whenever scores, finding-like markers or sample evidence UI might be mistaken for live output. Prefer no numeric score in the hero.

### Storyboard

| Time | Scene action | Purpose |
| --- | --- | --- |
| 0–300 ms | Static poster visible; heading and CTAs already usable. | Prevent animation from blocking access. |
| 300–900 ms | Three panels fade into shallow depth and the lens appears. | Introduce multiple evidence formats. |
| 900–1900 ms | One subtle scan crosses the panels. | Show inspection without implying a verdict. |
| 1900–2800 ms | Evidence anchors connect to a small summary card. | Explain traceability. |
| 2800–3400 ms | Lens settles; motion stops. | Keep the page calm. |

Play once per page visit; do not impose a full-screen intro, scroll lock, autoplay sound, or loading gate. Optional pointer tilt is limited to approximately ±4 degrees on fine-pointer devices and disabled for touch and reduced motion. Provide a pause/replay control if continuous ambient movement is introduced later; the initial design stops automatically.

### Technical approach

**Implementation:** a React component in Next.js using TypeScript, Tailwind CSS, scoped CSS keyframes, CSS `perspective`, `transform-style: preserve-3d`, and inline SVG. Layer panels with `translateZ` and small `rotateX`/`rotateY` transforms; construct the lens from styled concentric elements. Animate a clipped gradient scan and SVG evidence anchors. This produces a stylised depth effect, not a volumetric model renderer.

React state controls start, completion and optional replay. Use browser-native IntersectionObserver and page-visibility events to suspend work when hidden; clean up listeners on unmount. Navigation, text and CTAs render independently of animation. No external animation runtime, viewer, or hosted scene is required.

**Fallback:** render the same SVG and layered elements without transforms or keyframes. The illustration remains understandable without motion or advanced CSS effects.

### Performance and privacy budget

These are proposed design targets, to be measured on representative devices:

- Static composition visible before animation starts; reserve scene dimensions to avoid layout shift.
- Incremental animation payload target: no more than 50 KB compressed for component styles and inline SVG, excluding the existing application runtime. If not achievable, favour the static visual.
- Use resolution-independent SVG and CSS; no canvas or pixel-ratio configuration is needed.
- Use transform and opacity animation; avoid expensive animated blur, large filters and particle fields.
- Run keyframes only while animating or interacting; pause when offscreen or the tab is hidden.
- If CSS depth effects are unsupported, retain the static composition.
- Use the static poster by default on small/touch devices, reduced-motion settings, or constrained network/device signals where detectable.
- No real evidence, account data, uploaded filenames or inference output enters the public hero canvas or a third-party animation service.

The effect must not delay navigation, authentication, submission, or the largest meaningful content. The authenticated dashboard uses ordinary subtle transitions, not a repeated 3D intro.

## 6. Application workspace

Use the PRD sidebar/topbar for authenticated work; the pill marketing navbar does not replace application navigation. Desktop sidebar is approximately 248 px; collapse it on tablets and use an accessible mobile drawer. Page content uses a 12-column desktop grid and a single column on narrow screens.

| Screen | Primary layout and interaction |
| --- | --- |
| Overview | Heading and New Analysis action; real-data metric cards; risk/volume charts; recent analyses and review items. |
| New Analysis | Upload/URL/category input first; supported limits and consent/retention before submission; optional context expands below. |
| Results | Identity/status header; evidence and risk summary; seven PRD tabs; clear unavailable-check and limitation panel. |
| Review Queue | Filterable work list, assignment/status, evidence requests, escalation and revision-checked decisions. |
| Reports | Versioned report list, generation state and access-controlled download. |
| Model Performance | Model availability, cohort details, verified metrics or explicit empty states. |
| Audit / Settings | Permission-scoped tables and policy forms with clear save/error states. |

Use the supplied hero textarea as an **Optional context** field inside New Analysis: “What happened, and what would you like to verify?” It supplements evidence upload. Replace the generic plus/send controls with labelled Attach Evidence and Start Analysis actions. No payment or irreversible investigation action is triggered by a generic send icon.

## 7. Result indicators and progress

The supplied circular border does not accurately represent arbitrary percentages: one transparent border quadrant does not make a dynamic 90% arc. Replace it with an SVG circle using the actual value to calculate stroke length. For radius `r`, circumference is `2πr`, and offset is `circumference × (1 − value / 100)`.

Keep these concepts visually and semantically separate:

| Indicator | Presentation | Missing-data state |
| --- | --- | --- |
| Upload progress | Horizontal progress bar, bytes/percentage when known. | “Preparing upload”; no invented percentage. |
| Processing | Stage list, e.g. Validating / Extracting / Checking / Assessing. | Indeterminate active stage if total work is unknown. |
| Evidence completeness | Optional ring with label and list of covered/missing checks. | “Coverage unavailable” with reason. |
| Overall risk | Score text plus explicit operational assessment band. | Inconclusive, insufficient evidence or analysis unavailable. |
| Model confidence | Per-check value with meaning and calibration status. | “Confidence unavailable”; do not substitute completeness. |

Use `role=progressbar` and appropriate numeric attributes only for genuine measurable progress. Static score/coverage graphics need a clear text equivalent. Never reuse the supplied 90% value as a default.

The result header must say “Lower assessed risk,” “Review recommended,” or “High assessed risk” when supported; never use a large unqualified “REAL,” “FAKE,” “SAFE,” or “FRAUD” badge. Evidence provenance labels are visible beside findings: Observed, Model inference, Rule warning, User-provided/unverified.

## 8. Deletion modal and error states

Adapt the supplied confirmation card to an accessible named modal with focus containment, Escape handling where safe, and focus restoration. Use `w-full` with a maximum width and viewport gutters rather than a fixed 370 px mobile width.

Suggested content:

- Title: **Delete this evidence?**
- Body: Name the item and explain which originals, derivatives and reports the actual deletion policy covers. State any delay or preservation restriction from the backend.
- Secondary action: **Keep evidence**
- Destructive action: **Request deletion** or **Delete evidence**, matching actual backend behaviour.

Disable repeat submission while pending. Keep the dialog open on error with a clear retry path. Show “Deletion requested” while propagation is pending, and “Deleted” only when the defined workflow completes. Do not state that deletion is instantaneous or irreversible unless the implementation and policy establish that.

For the supplied 404 component, use a quiet white page, red numeric marker, charcoal title and the relevant destination: Back to Dashboard inside the app, Back to Home publicly. Other states need distinct copy: access unavailable, analysis failed, unsupported format, model unavailable, no results, report generation failed. Do not reveal whether an inaccessible tenant's record exists.

## 9. Motion and accessibility system

| Interaction | Timing / behaviour |
| --- | --- |
| Button hover/focus | 120–160 ms colour/border change. |
| Navigation text slide | 160–200 ms; same access on keyboard focus. |
| Menu / dialog appearance | 160–220 ms opacity; minimal translation. |
| Tab change | Immediate content change; no decorative loading delay. |
| Hero 3D | One approximately 3.4-second sequence, then rest. |

Respect `prefers-reduced-motion` across all components. Keep essential state changes understandable without animation. Aim for WCAG 2.2 AA, visible keyboard focus, logical headings, labelled controls, target sizes of roughly 44 px where practical, screen-reader status messages, and text/icon risk labels. Decorative 3D is hidden from assistive technology while an adjacent caption explains the illustrative concept if needed.

At 360 px width, navigation, modal, uploads and main results must remain usable without page-wide overflow. Evidence tables may use a labelled internal scroll region or a concise card representation. Test zoom and long filenames/text, not only ideal sample content.

## 10. Component implementation checklist

Proposed React components:

- `MarketingNav`, `MobileNavDisclosure`, `BrandMark`
- `VerificationHero`, `VerificationLensScene`, `HeroPoster`
- `CapabilityCard`, `WorkflowSection`, `SampleEvidenceCard`
- `AppShell`, `UploadWorkspace`, `OptionalContextField`
- `ProcessingStages`, `CoverageRing`, `RiskAssessmentBadge`
- `EvidenceFinding`, `ProvenanceLabel`, `LimitationsPanel`
- `ReviewActions`, `DeletionDialog`, `NotFoundState`

Avoid global `document.getElementById` handlers in component bodies. Use scoped state, unique IDs and listener cleanup. Animation effects and browser listeners must be cleaned up on unmount. Keep protected content out of marketing animation assets. All links and buttons must have real supported actions, or be clearly unavailable with a reason.

The hero CTA, report preview, mobile navigation, deletion confirmation, upload, filters, tabs, pause/replay if present, and back-navigation all require interaction verification. A decorative illustration must never suggest that a real upload was processed.

## 11. Delivery sequence and acceptance

1. Implement tokens and adapted React components against the white/deep-red system.
2. Build the responsive landing composition and authenticated shell.
3. Prepare the static lens illustration and validate hero readability first.
4. Implement the custom lens sequence; compare payload and responsiveness against the poster-only version.
5. Wire actual capability, status, evidence and review contracts from the architecture.
6. Validate mobile, keyboard, screen-reader, reduced-motion, failure and unsupported-CSS states.

Acceptance requires: recognisable reuse of the supplied component structures; consistent TRUTHLENS branding; no inherited placeholder links or unrelated logos/copy; no hardcoded scores; functional navigation/modal behaviour; honest DEMO/unavailable states; no animation gate; and a complete static fallback.

The 3D scene is accepted only after its performance is measured and it preserves the product's calm enterprise tone. If it fails the budget, ship the poster without delaying the working application.

## 12. Exact technology stack

The user-provided stack is binding. The design introduces no additional framework, animation engine, hosted viewer, UI library, or analytics library.

| Layer | Required stack |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Recharts, Lucide icons. |
| Backend | Python, Django REST Framework. |
| AI and processing | PyTorch where required, OpenCV, FFmpeg, OCR tools, speech transcription tools when needed, appropriate pretrained deepfake detection models, rule-based email/communication analysis. |
| Data and tasks | PostgreSQL, Redis for coordination where appropriate, Celery, private object storage. |
| Opening animation | React, TypeScript, Tailwind CSS, native CSS transforms/keyframes and inline SVG within the existing frontend. |

OCR/transcription implementations, pretrained models and private object-storage provider remain to be selected within the supplied categories. Their capabilities and licences require validation. Native browser CSS/SVG features are implementation techniques, not additional third-party stack dependencies.

Use Recharts for charts and Lucide for application icons. Do not add an alternative chart, icon, animation, authentication, database, or backend platform. The stylised verification lens retains the intended starting animation while fitting the exact supplied stack.
