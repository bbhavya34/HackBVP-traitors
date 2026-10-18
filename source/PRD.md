# TRUTHLENS — Product Requirements Document

**Tagline:** Verify the Signal. Understand the Risk.  
**Version:** 1.1 — Draft for implementation  
**Date:** 18 October 2026  
**Source:** User-supplied website brief in `Pasted text.txt`  
**Product type:** Enterprise web application for multimodal authenticity verification and communication risk assessment.

> AI detects. AI explains. AI recommends. A human decides. Every finding has traceable evidence.

## 1. Purpose and problem

Security teams must assess potentially manipulated media and suspicious communications across disconnected formats. A binary “fake” or “real” verdict hides uncertainty, gives investigators little supporting evidence, and can encourage unsafe decisions.

TRUTHLENS provides a secure workspace to submit evidence, run supported checks, understand assessed risk, investigate supporting signals, and record a human decision. It serves banks, financial institutions, corporate security teams, investigators, and fraud-prevention departments.

This PRD specifies the intended product; it does not assert that any detector, dataset, service, or capability already exists. The source mentions an additional project reference but does not include it. Requirements dependent on that reference require reconciliation before implementation sign-off. Proposed implementation choices and targets below are explicitly identified.

## 2. Goals and boundaries

### Goals

- Accept videos, images, audio, emails, documents, URLs, and defined chat exports through a unified workflow.
- Explain what is suspicious, which evidence supports it, how certain each check is, and what the user should do next.
- Keep manipulation findings, communication risk, model confidence, and evidence completeness distinct.
- Preserve original evidence and traceable processing and review history.
- Support secure organisation-level collaboration with human-controlled decisions.
- Expose validated evaluation results and honestly communicate unsupported analysis.

### Non-goals

- Proving authenticity or fraud with certainty from an AI result.
- Automatically approving payments, transferring money, blocking people, or making accusations.
- Automatically training models on uploaded evidence.
- Guaranteeing support for every codec, document variant, website, or chat export.
- Building model training infrastructure as part of the initial release.
- Presenting a static mockup or simulated detector as a working production system.

## 3. Users and permissions

All permissions are scoped to an organisation. Access must be enforced on the backend, including downloads and exports. The following permission matrix is a proposed baseline, configurable through explicit grants.

| Capability | Administrator | Analyst | Reviewer | Read-only viewer |
| --- | --- | --- | --- | --- |
| View authorised cases and reports | Yes | Yes | Yes | Yes |
| Submit evidence and start analyses | Yes | Yes | By grant | No |
| Add investigation notes and request review | Yes | Yes | Yes | No |
| Record review decisions and confirmed outcomes | With reviewer grant | No | Yes | No |
| Export accessible reports | Yes | Yes | Yes | By grant |
| Manage members, policies, model configuration | Yes | No | No | No |
| Import evaluation datasets | Yes | No | No | No |
| View security audit records | Yes | By grant | By grant | By grant |
| Delete evidence under policy | Policy-controlled | By grant | By grant | No |

An administrator does not gain cross-organisation access. Deletion must respect retention and any explicitly configured preservation restrictions. Reviewer actions record actor, timestamp, rationale, and outcome.

## 4. Information architecture and design

### Application shell

Provide a consistent sidebar, top navigation, organisation and user profile, notifications, accessible search and filters, and a prominent New Analysis action. Main destinations:

1. Overview Dashboard
2. New Analysis
3. Analysis History
4. Risk Intelligence
5. Evidence Reports
6. Review Queue
7. Data & Model Performance
8. Security & Audit Logs
9. Settings

### Visual requirements

Use a white background, red headings and emphasis, deep-red primary actions and high-risk indicators, charcoal body text, light-grey borders, subtle shadows, generous spacing, consistent icons, and professional typography. Use a verification-mark or shield logo with the TRUTHLENS name and tagline.

Avoid horror imagery, glitch effects, creepy faces, excessive red backgrounds, flashing warnings, cyberpunk styling, and decorative clutter. Risk labels must use text and icons as well as colour. Support desktop, tablet, and mobile layouts with keyboard-accessible controls and minimal motion.

### Page behaviour

| Page | Required content and behaviour |
| --- | --- |
| Overview | Analysis totals, high-risk cases, review backlog, average analysis time, risk distribution, activity, categories, alerts, reports, and model availability. |
| New Analysis | Category selection, upload or URL entry, optional context, consent/retention notice, validation, progress, cancellation, and job status. |
| History | Search and filters by date, media type, status, risk band, reviewer, and analysis ID; authorised result navigation. |
| Risk Intelligence | Evidence-linked trends and indicator categories derived from accessible analyses. External threat feeds are optional future integrations and must identify source and freshness. |
| Evidence Reports | Search, generate, download, and inspect report versions and access restrictions. |
| Review Queue | Assigned/unassigned work, priority, status, requests for evidence, escalation, decisions, and review history. |
| Data & Model Performance | Model versions and availability, labelled dataset imports, split metadata, evaluation runs, metrics, limitations, and error analysis. |
| Security & Audit Logs | Filterable access and change events appropriate to the user's grants. |
| Settings | Organisation, membership, roles, notifications, configurable risk thresholds, model configuration, consent, retention, and deletion controls. |

Charts cover risk bands, analysis volume over time, media distribution, confirmed/unconfirmed findings, and validated false-positive/false-negative rates. Show time range, units, and denominator. Empty states replace absent data; sample charts are visibly marked DEMO.

## 5. Primary user journeys

### 5.1 Submit and inspect evidence

1. An authorised user chooses New Analysis and selects files or supplies a URL.
2. The interface shows supported formats, configured limits, consent and retention information, and optional contextual notes.
3. Server-side validation checks content, type, size, and applicable safety constraints.
4. The system creates an analysis ID, timestamps and hashes original files, stores them privately, and queues supported checks.
5. The user sees upload progress and stage-level processing updates and can leave and return to the job.
6. Results explain completed checks, unavailable checks, evidence, uncertainty, and next steps.
7. The user may request review or generate a report.

### 5.2 Review and decide

1. An analyst flags a case or a configurable rule places it in the review queue.
2. A reviewer inspects evidence and distinguishes observations from inference and unverified context.
3. The reviewer may request more evidence, record independent-channel verification, or escalate.
4. The reviewer records a decision and rationale; a confirmed outcome requires an explicit verification basis.
5. The system records the action and preserves previous assessments and report versions.

### 5.3 Evaluate a detector

1. An authorised administrator imports a labelled dataset manifest.
2. Validation checks required fields, accessible file references, labels, duplicate content, and split overlap.
3. An evaluation run pins dataset, model, configuration, and thresholds.
4. The dashboard displays metrics only for the evaluated cohort, with provenance and limitations.
5. False alarms and missed threats can be inspected without silently changing model weights or original labels.

## 6. Functional requirements and acceptance criteria

**Priority:** P0 = release-blocking foundation; P1 = required for the complete product after foundation. A staged pilot may omit P1 capabilities only if clearly documented. The full product must satisfy both.

| ID | Priority | Requirement | Acceptance criteria |
| --- | --- | --- | --- |
| FR-01 | P0 | Authentication, sessions, and RBAC | Protected operations reject unauthenticated requests; revoked or expired sessions stop working; role restrictions apply through API and UI. |
| FR-02 | P0 | Organisation isolation | A user cannot list, fetch, search, export, or download another organisation's records by guessing identifiers. |
| FR-03 | P0 | Unified submission | Drag-and-drop, file selection, multiple files, category selection, and URL entry work; every item shows name, type, size, status, and analysis ID where applicable. |
| FR-04 | P0 | Server-side input validation | Spoofed extensions, oversized files, corrupt input, and unsupported content produce actionable errors before processing. UI validation alone is insufficient. |
| FR-05 | P0 | Secure evidence ingestion | Original bytes are preserved; a cryptographic hash, ingestion timestamp, owner organisation, consent, and retention policy are recorded. Derivatives reference the original. |
| FR-06 | P0 | Asynchronous jobs | Upload and processing progress are distinct; users can cancel supported work; timeouts, bounded retries, failure reasons, and partial results are visible. |
| FR-07 | P0 | Modular detectors and rules | Each check identifies version, capability, execution status, and evidence. A missing detector returns unavailable rather than a synthetic verdict. |
| FR-08 | P0 | Explainable risk assessment | A versioned method produces an assessed risk score when sufficient supported evidence exists, with traceable contributions and independently represented confidence and completeness. |
| FR-09 | P0 | Results workspace | Summary, Evidence, Technical Analysis, Context Checks, Timeline, Recommendations, and Audit History tabs show relevant content and explicit empty states. |
| FR-10 | P0 | Evidence provenance | Every finding links to evidence and declares observed evidence, model inference, rule warning, or unverified user information. |
| FR-11 | P0 | Human review | Users can flag, verify externally, escalate, request evidence, mark reviewed, record confirmed outcomes, and generate reports according to permissions. Decisions retain rationale and history. |
| FR-12 | P0 | Report generation | An authorised user can generate and download a PDF containing results, limitations, provenance, hashes, versions, and review history. Downloads are access-controlled. |
| FR-13 | P0 | Audit trail | Evidence access, submissions, configuration changes, report generation, reviews, and deletions create attributable audit events without secrets or unnecessary sensitive content. |
| FR-14 | P0 | Privacy controls | Policies govern retention, user-requested deletion, consent, and sensitive file access; evidence is private by default and removed according to the recorded policy. |
| FR-15 | P0 | Honest demonstration mode | Synthetic or approved fixture results are marked DEMO throughout pages and exports; real uploaded content never receives fixture output disguised as analysis. |
| FR-16 | P1 | Operational dashboards | Counts and charts derive from accessible records with defined filters and time ranges; absent data shows empty states. |
| FR-17 | P1 | History, search, and notifications | Filters and pagination work; notifications link to accessible jobs or review items without exposing other organisations. |
| FR-18 | P1 | Dataset import and evaluation | Dataset manifests validate required fields; overlap is flagged; published metrics identify cohort, split, dataset version, model version, and evaluation date. |
| FR-19 | P1 | Error analysis | Authorised users can inspect false positives and false negatives against verified labels; operational review outcomes remain separate from curated evaluation labels. |
| FR-20 | P1 | Risk intelligence | Aggregates trace to underlying accessible analyses; unconfirmed findings are clearly distinguished from confirmed outcomes. |

### 6.1 Supported input contract

Initial formats below come from the brief. Exact codec, size, duration, page-count, and batch limits are configuration decisions to approve before release; the interface and API must expose the same effective limits.

| Input | Initial support | Required extraction and checks | Limitations to disclose |
| --- | --- | --- | --- |
| Video | MP4, MOV, WebM with supported codecs | Selected frames, timestamps, metadata, supported manipulation checks, available audio/video synchronisation | Missing audio, unsupported codec, absent face, low quality, and unsupported localisation. |
| Image | JPG/JPEG, PNG, WebP | Metadata, supported manipulation/generation indicators, reliable regions when available | Metadata absence does not prove manipulation; no fabricated heatmaps. |
| Audio | WAV, MP3, M4A with supported codecs | Audio characteristics, supported synthetic-speech and voice consistency signals, optional timed transcription | Noise, language coverage, duration, and confidence/calibration constraints. |
| Email | EML and pasted email text; other exports only after format approval | Sender, headers, timestamps, links, attachments, domain mismatch, urgency, impersonation, payment warnings | Pasted body text cannot establish missing header evidence or sender authentication. |
| Document | PDF and UTF-8 TXT initially; additional formats by explicit support | Text extraction, OCR as needed, suspicious passages, supported embedded-image checks | Encrypted/corrupt documents, OCR quality, and unavailable embedded-media checks. |
| URL | HTTP/HTTPS subject to safe-fetch policy | Domain and URL details, permitted redirects, available page content and link evidence | Inaccessible pages, authentication walls, blocked destinations, and missing reputation sources. |
| Chat | Proposed initial UTF-8 TXT and documented JSON schema | Messages, available participants/timestamps, relevant context, suspicious requests and urgency | Only declared schemas supported; export content and identities are not independently authenticated. |

Attachments extracted from emails or documents undergo the same safety checks as direct uploads. Processing budgets must prevent nested attachments or decompression from exhausting resources.

## 7. Processing architecture

| Layer | Responsibility | Required outputs |
| --- | --- | --- |
| 1. Input sources | Receive media, communication, URLs, metadata, and optional context | Submission manifest and declared source. |
| 2. Secure ingestion | Authenticate, validate, hash, timestamp, store privately, track policy | Analysis ID, immutable original reference, ingestion events. |
| 3. Signal extraction | Parse and extract modality-specific signals in isolated workers | Frames, segments, transcripts, text, metadata, and explicit extraction limitations. |
| 4. AI and rules intelligence | Run supported authenticity, sender, text, identity/context, and cross-modal checks | Versioned detector outputs and deterministic rule findings. |
| 5. Risk engine | Apply a documented evidence-aware assessment method | Risk score or unavailable value, contributions, bands, confidence and completeness. |
| 6. Explanation | Translate evidence into supported findings and next steps | Evidence summary, uncertainties, limitations, recommendations. |
| 7. Action and evidence | Support review, timelines, reports, and audit | Traceable report versions, decisions, and action history. |

Use a Next.js application backed by authenticated Django REST APIs. PostgreSQL holds application records; private object storage holds evidence and derivatives. Celery workers perform extraction and inference; Redis coordinates background work as appropriate. The risk engine and report service consume persisted, versioned outputs.

Untrusted extraction, model inference, and URL retrieval must run with constrained privileges and resource limits. URL fetching requires an isolated service that rejects private, loopback, link-local, and metadata-service destinations, validates every redirect and resolved destination, and limits response size and time. Never execute uploaded binaries or allow a parser to fetch arbitrary external resources.

### 7.1 Job and assessment states

Job lifecycle: `created → uploading → validating → queued → processing → completed`.

Additional terminal states: `partially_completed`, `failed`, `cancelled`, and `rejected`. Persist stage-level errors. A completed job means scheduled checks finished; it does not mean authenticity was established. Retries preserve previous attempts and cannot duplicate reviews or reports unintentionally.

Each check has its own status: `pending`, `running`, `completed`, `unavailable`, `skipped`, or `failed`.

Assessment states are separate from job state:

| State | Meaning |
| --- | --- |
| Lower assessed risk | No major warnings detected by available checks; authenticity is not guaranteed. |
| Review recommended | Indicators require investigation. |
| High assessed risk | Significant or multiple signals require careful human review. |
| Inconclusive | Available signals do not support a reliable assessment, including conflicts. |
| Insufficient evidence | Evidence coverage or quality is inadequate for the relevant assessment. |
| Analysis unavailable | Required checks could not run. |

## 8. Risk scoring and explanation contract

- Overall risk is an operational assessment from 0–100, not automatically a probability that content is fake.
- Represent manipulation score, communication risk score, model confidence, and evidence completeness separately. Unsupported values are `null` with a reason, never zero by default.
- Keep detector-native scores with their original meaning and version. Do not compare or average unrelated scores without an approved mapping.
- Each scoring-method version documents eligible evidence, transformations, weights or rules, missing-data handling, conflict handling, and contribution explanations.
- Do not invent an aggregate model-confidence percentage. Show confidence per check with calibration status; an aggregate requires a documented validated method.
- Evidence completeness describes coverage against expected applicable checks and required context. It is not model confidence.
- Missing or failed checks must remain visible. They must not create a misleading lower-risk result.
- Preserve the original scoring configuration with each run. Threshold or model changes affect future runs; reanalysis creates a linked new run.

### Provisional display bands

| Score | Display band |
| --- | --- |
| 0–29 | Lower assessed risk |
| 30–69 | Review recommended |
| 70–100 | High assessed risk |

These are configurable operational thresholds from the brief, not universal scientific boundaries. When evidence is inadequate, use an uncertainty state instead of forcing a numeric score or band.

### Finding payload

Every finding includes: identifier, check and version, evidence type, concise finding, source evidence reference, page/region/timestamp/text offsets where applicable, supporting excerpt or derived signal, model confidence when available, limitations, recommendation, and creation time. User-provided claims remain visibly unverified unless separately corroborated.

Recommendations may include independent-channel verification, inspecting original material, requesting headers or higher-quality evidence, or escalating to a reviewer. Avoid unsupported accusations and statements of certainty.

## 9. Results, review, and reports

### Results header and evidence views

Show analysis ID, file name or submitted URL, media type, processing status, assessment state, available risk score, and model confidence where supported. Display partial coverage and demo status prominently.

- Video: selected frames and relevant timestamps.
- Audio: available indicators and timestamped transcript segments.
- Image: suspicious regions only with reliable model-supported localisation.
- Email: sender/header evidence, suspicious links, and textual warnings in separate categories.
- Document: extracted passages with page references and OCR limitations.
- URL/chat: inspected content or conversation excerpts, source context, and retrieval/export limitations.

### Human review

Proposed workflow states: `unassigned`, `assigned`, `in_review`, `awaiting_evidence`, `escalated`, `reviewed`. Confirmed outcomes are separate records with verification basis and may remain unresolved. A reviewed case is not automatically a confirmed genuine/manipulated sample.

Require an explicit reviewer action and rationale for consequential decisions. TRUTHLENS records decisions; it must not execute financial transfers, automatic blocking, or accusations. Concurrent updates must reject stale review changes rather than silently overwrite another reviewer.

### Report contents

PDF reports include report ID/version, analysis ID, source identifiers, hashes, ingestion and analysis timestamps, completed/unavailable checks, assessment and scores, evidence completeness, findings and references, confidence/calibration information, technical limitations, recommended next steps, model/rule/scoring versions, and review history. Include generation time and DEMO watermark where applicable.

Original evidence remains unchanged. Reports are versioned snapshots; later reviews or reanalyses do not silently rewrite downloaded or previously generated reports. Report access follows current authorisation and retention policy.

## 10. Data model

Use unique identifiers, organisation ownership, and timestamps. Store sensitive bytes separately from ordinary database records.

| Entity | Key information and relationships |
| --- | --- |
| Organisation | Tenant settings and policy references. |
| User / Membership / Role | Identity, organisation membership, scoped grants, session references. |
| AnalysisJob | Submitter, organisation, input category, state, context, stage timing, attempt and parent-run references. |
| EvidenceAsset | Private object reference, hash algorithm/digest, MIME type, size, original/derived relationship, consent, retention and deletion state. |
| DetectionResult | Job, check type, model/rule version, execution status, native scores, confidence, limitations, timing. |
| EvidenceIndicator | Result, provenance category, asset reference, excerpt/offset/region/timestamp and supporting signal. |
| RiskAssessment | Job, scoring-method version, operational scores, assessment state, completeness and contribution records. |
| ModelVersion / RuleVersion | Identifier, configuration, capabilities, provenance, validation and availability status. |
| EvaluationDataset / Sample / Run | Source, sample reference, label, verification, split, dataset version, model/configuration and metrics. |
| HumanReview | Assignment, workflow state, decision, rationale, verification basis, reviewer and revision history. |
| InvestigationReport | Analysis/run reference, immutable report version, private object reference, generation metadata. |
| AuditEvent | Organisation, actor/service, action, target, time, outcome and correlation ID. |
| RetentionPolicy / ConsentRecord | Scope, effective period, expiry, deletion rules, consent version and recorded acceptance. |

Foreign-key relations and backend queries must preserve tenant boundaries. No ordinary database response exposes permanent public evidence URLs.

## 11. API requirements

All protected endpoints require authentication, tenant-scoped authorisation, schema validation, pagination where applicable, and structured errors. Document request/response schemas in OpenAPI. Endpoint details below are contracts to implement, not a claim of existing APIs.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/analyses` | Create an analysis and submission manifest; return ID and upload/processing instructions. |
| GET | `/api/analyses` | List authorised analyses with filters and pagination. |
| GET | `/api/analyses/{id}` | Retrieve status, check coverage, limitations and results. |
| GET | `/api/analyses/{id}/evidence` | Retrieve authorised evidence indicators. |
| GET | `/api/analyses/{id}/report` | Retrieve an existing report or its generation status. |
| POST | `/api/analyses/{id}/review` | Record a permission-checked human review action. |
| GET | `/api/dashboard/summary` | Return scoped metrics for a defined time range. |
| GET | `/api/audit-logs` | List authorised audit events. |
| POST | `/api/evaluation/datasets` | Validate and import a dataset manifest. |
| GET | `/api/evaluation/metrics` | Retrieve available versioned evaluation metrics. |

Proposed supporting endpoints: upload finalisation, cancellation, reanalysis, review assignment, deletion requests, capabilities/limits, and model availability. Define exact routes during API design. Use POST for report-generation work; GET remains read-only. Report generation may return `202 Accepted` and a status reference.

Create requests should support an idempotency key. Errors expose a stable code, user-safe message, field errors where applicable, correlation ID, and retryability without stack traces or secrets. Define upload finalisation and worker enqueueing so incomplete uploads cannot enter inference. Polling is an acceptable initial status mechanism; streaming updates are optional.

## 12. Security, privacy, and reliability requirements

- Encrypt transport and stored evidence; keep credentials and API secrets server-side.
- Use secure sessions, appropriate CSRF protections, rate limits, and strict input validation.
- Authorise every evidence access, report download, dataset reference, and API operation.
- Provide short-lived signed access or authenticated streaming for sensitive assets.
- Isolate untrusted parsers and media processing; constrain CPU, memory, time, output size, and network access.
- Validate file signatures and parser support, scan/quarantine unsafe uploads, and reject active or unsupported content as appropriate.
- Prevent server-side URL-fetch abuse, unsafe redirects, script execution in extracted content, and untrusted links opening automatically.
- Audit access and changes with tamper-resistant records; keep passwords, tokens, and unnecessary sensitive content out of logs.
- Publish clear consent, retention, deletion, and privacy information. Upload consent does not imply consent to model training or third-party processing.
- Document deletion propagation across originals, derivatives, reports, indexes, and backups. Retain only the minimal audit metadata allowed by the approved policy.
- Record processing-service dependencies and whether evidence leaves the deployment boundary; require an approved policy before external inference or transcription.
- Handle worker failure with bounded retries and idempotent steps. Provide user-safe failure states and operational alerts.
- Document backup/restore procedures and recovery objectives before production. No regulatory certification or legal admissibility claim is implied by this PRD.

## 13. Non-functional targets

The following are proposed engineering targets requiring validation on a defined deployment and workload; they are not source-provided guarantees.

| Area | Proposed acceptance target |
| --- | --- |
| Accessibility | WCAG 2.2 AA target; keyboard operation, visible focus, labelled controls, screen-reader status updates, and accessible chart summaries. |
| Responsive layout | Core flows usable at 360 px, 768 px, and 1440 px widths without page-wide horizontal overflow. |
| API responsiveness | p95 under 1 second for ordinary list/detail calls under an agreed baseline load; upload, inference, and report generation excluded. |
| Status freshness | Active job state reflected within 5 seconds under normal operation. |
| Availability | Initial production target of 99.5% monthly availability; final service commitment subject to hosting and operations decisions. |
| Processing latency | Benchmark by modality, input size, hardware, and model; publish observed latency and limits rather than a universal detector SLA. |
| Integrity | Original hashes remain verifiable; all reported findings resolve to stored evidence references or explicit deletion tombstones. |
| Observability | Structured logs, correlation IDs, queue depth, failure rate, job duration, model health, and report-generation monitoring. |

## 14. Evaluation and product success measures

### Model evaluation

Dataset manifests include sample ID, media type, file reference, genuine/manipulated label, dataset source, split designation, and verification status. Training, validation, and unseen test designations must remain separate. Detect exact-content overlap by hash and flag related source identities, recordings, or derivative families for leakage review where metadata permits.

Display precision, recall, F1, false-positive rate, false-negative rate, detection latency, and modality breakdown only when verified evaluation data permits calculation. Include class balance, sample size, model version, dataset/split version, evaluation date, threshold, and excluded/failed samples. Undefined metrics display unavailable with a reason. Do not use unresolved production cases as ground truth or claim generalisation beyond the evaluated population.

Uploading or importing samples does not train a model. Any future training requires a separately authorised workflow and data-use policy.

### Product metrics

| Metric | Definition / release expectation |
| --- | --- |
| Submission completion | Valid initiated submissions that reach queued state; establish a pilot baseline. |
| Analysis completion | Completed and partially completed jobs shown separately from failed, rejected, and cancelled jobs. |
| Investigation turnaround | Time from review request to recorded decision, with waiting-for-evidence time identifiable. |
| Evidence traceability | 100% of displayed findings have a provenance category and supporting reference. |
| Honesty of capability display | 100% of missing checks and demo results are explicitly labelled. |
| Review accountability | 100% of recorded decisions include actor, timestamp, action, and required rationale. |
| Tenant isolation | Zero cross-tenant access in required authorisation tests. |

No target detector accuracy, precision, or recall is claimed before representative evaluation. Business and model-quality targets must be set from pilot data and deployment risk tolerance.

## 15. Technology and delivery requirements

Preferred stack from the source:

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Recharts, Lucide icons.
- **Backend:** Python and Django REST Framework, organised into authentication, uploads, processing, detectors, risk, evidence, reports, evaluation, and audit modules.
- **Processing:** Celery, Redis, FFmpeg, OpenCV, OCR, transcription tools, and PyTorch where integrated models require it.
- **Persistence:** PostgreSQL and private object storage.

Select real pretrained models only after reviewing capability, licence, provenance, runtime needs, and evaluation results. A model adapter must describe supported inputs, version, preprocessing, output semantics, localisation capability, health, limitations, timeouts, and failure handling. Keep demonstration adapters outside the production execution path.

Deliver reusable UI components, functional forms and navigation, migrations, background workers, secure uploads, detector adapters, explainable scoring, evidence and review workflows, PDF reports, RBAC, audit logs, evaluation views, API documentation, environment examples without secrets, schema documentation, model integration guidance, setup/deployment instructions, and automated tests.

## 16. Implementation stages and release gates

| Stage | Scope | Exit gate |
| --- | --- | --- |
| 1. Contracts and foundation | Confirm support matrix, scoring approach, deployment boundary and permissions; create schema, authentication, app shell, and isolated demo fixtures. | Architecture and data contracts approved; tenant isolation verified; demo state unmistakable. |
| 2. Secure ingestion and jobs | Private uploads, hashes, validation, extraction, cancellation, worker status, retries and retention metadata. | Valid inputs process; invalid inputs fail safely; originals remain unchanged. |
| 3. Intelligence and results | Real eligible detectors, deterministic rules, versioned assessment, evidence-linked results and explicit unavailable states. | Detector output semantics documented; no fabricated analysis; missing-check behaviour verified. |
| 4. Investigation and reporting | Review queue, assignment/escalation, decisions, report snapshots, audit and deletion workflow. | Decisions attributable; reports traceable and access-controlled; deletion policy tested. |
| 5. Complete product | Dashboards, history/search, risk intelligence, evaluation import/metrics, error analysis, responsive/accessibility polish. | All P0/P1 requirements implemented or explicitly deferred with documented release scope. |
| 6. Production readiness | Representative benchmarks, security checks, end-to-end tests, recovery procedures and operational documentation. | Release acceptance passes; unsupported formats and known limitations published. |

A demo release may showcase approved fixtures and working non-detector flows. It must not be labelled a production detection service. A limited production release must publish its actual supported checks and modalities; absent capabilities remain unavailable.

## 17. Validation and release acceptance

Required automated and targeted manual checks:

1. **Access:** authentication expiry, each role, tenant isolation, guessed IDs, private evidence links, and report permissions.
2. **Ingestion:** supported fixtures, MIME spoofing, corrupt/oversized files, incomplete uploads, multi-file handling, cancellation, and malicious/nested content constraints.
3. **URL safety:** private destinations, DNS/redirect changes, oversized responses, blocked schemes, and timeout handling.
4. **Processing:** successful runs, retries, worker interruption, unavailable detectors, extraction failures, partial completion, and duplicate create requests.
5. **Scoring:** exact band boundaries at 29/30 and 69/70, missing values, conflicting signals, unsupported modalities, configuration versioning, and evidence-linked contributions.
6. **Results:** provenance labels, real timestamps/page references, absent localisation, missing headers, transcript limitations, and zero fabricated confidence values.
7. **Review:** assignment, escalation, evidence requests, stale-update conflicts, rationale validation, unresolved outcomes, and immutable decision history.
8. **Reports:** full content, pagination/readability, evidence references, pinned versions, DEMO watermark, access control, and safe failure handling.
9. **Evaluation:** invalid manifests, unverified labels, leakage, zero denominators, model/dataset versions, and independent false-alarm/missed-threat inspection.
10. **Privacy:** consent recording, retention expiry, deletion propagation, revoked sensitive links, and minimal audit retention.
11. **UI:** functional buttons/forms/filters, keyboard and screen-reader flows, responsive layouts, empty/loading/error states, and accessible risk presentation.

Full-product release requires all P0 and P1 acceptance criteria, documented real integrations, no misleading demo outputs, no unresolved critical security defects, and reviewable operational documentation. Any scoped release must identify exclusions in the product and release notes.

## 18. Dependencies, risks, and open decisions

| Item | Risk / unresolved decision | Required resolution |
| --- | --- | --- |
| Missing project reference | Architecture or evidence requirements may be incomplete. | Obtain and reconcile the referenced material before implementation sign-off. |
| Detector selection | Performance, licensing, domain shift and resource needs vary. | Select actual models and document representative evaluation and permitted use. |
| Scoring method | Unrelated signals can yield misleading aggregate risk. | Approve a versioned scoring method, missing-evidence rules, and calibration claims. |
| Input limits and schemas | “Common formats” does not define operational support. | Approve codecs, size/duration/page limits, batch limits, email exports, and chat schemas. |
| Hosting and data handling | Deployment location and external processors affect privacy and latency. | Choose region, processors, infrastructure, and evidence egress policy. |
| Retention and deletion | Backups and preserved audit history complicate deletion expectations. | Approve defaults, user permissions, preservation restrictions and deletion timelines. |
| Evaluation data | Lack of verified representative samples prevents meaningful accuracy claims. | Secure permitted datasets and define split/leakage policy and minimum cohort criteria. |
| Review operations | Poor assignment and verification rules may leave cases unresolved. | Define reviewer ownership, escalation paths, outcome vocabulary, and turnaround goals. |
| Operational targets | Performance and recovery commitments need workload and budget. | Agree load profile, file mix, worker capacity, availability, recovery-time and recovery-point targets. |
| Enterprise expansion | SSO, integrations, external feeds and automated training are unspecified. | Treat as separately scoped work; do not imply inclusion or readiness. |

This document is the implementation planning baseline. Proposed defaults become binding only after product and engineering approval; the source's requirements for honest results, human decisions, privacy, and evidence traceability apply throughout every stage.


## Binding technology-stack constraint

Use exactly the user-specified stack: Next.js, React, TypeScript, Tailwind CSS, Recharts and Lucide on the frontend; Python and Django REST Framework on the backend; PyTorch where required by integrated models, OpenCV, FFmpeg, OCR tools, transcription tools when needed, appropriate pretrained deepfake detectors and deterministic communication rules; PostgreSQL, Redis where appropriate, Celery and private object storage for persistence and processing.

Do not introduce additional application frameworks, animation engines, hosted 3D viewers, charting libraries or replacement backend/data platforms. The opening verification-lens effect uses React, Tailwind CSS, native CSS perspective/keyframes and inline SVG, with a static fallback. It is a stylised depth illustration rather than a volumetric 3D renderer. Specific OCR/transcription tools, model artifacts, report-rendering utility and infrastructure providers remain implementation selections within the original required capabilities; they do not authorise a stack replacement.
