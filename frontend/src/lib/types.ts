export type ModalityCategory =
  | "video"
  | "image"
  | "audio"
  | "email"
  | "document"
  | "url"
  | "chat";

export type JobState =
  | "created"
  | "uploading"
  | "validating"
  | "queued"
  | "processing"
  | "completed"
  | "partially_completed"
  | "failed"
  | "cancelled"
  | "rejected";

export type AssessmentState =
  | "lower_risk"
  | "review_recommended"
  | "high_risk"
  | "inconclusive"
  | "insufficient_evidence"
  | "unavailable";

export type ProvenanceCategory =
  | "observed"
  | "model_inference"
  | "rule_warning"
  | "user_unverified";

export type ReviewStatus =
  | "unassigned"
  | "assigned"
  | "in_review"
  | "awaiting_evidence"
  | "escalated"
  | "reviewed";

export type ReviewPriority = "urgent" | "high" | "medium" | "low";

export interface EvidenceAsset {
  name: string;
  sizeBytes: number;
  mimeType: string;
  sha256: string;
  isDemo: boolean;
  consentRecorded: boolean;
  retentionPolicy: string;
  uploadedAt: string;
  url?: string;
}

export interface DetectionCheck {
  id: string;
  name: string;
  category: "visual" | "audio" | "linguistic" | "network" | "metadata";
  detectorVersion: string;
  status: "completed" | "running" | "pending" | "unavailable" | "skipped" | "failed";
  score: number | null; // 0 - 100
  confidence: number | null; // 0 - 100
  calibrated: boolean;
  limitations: string;
  executionTimeMs: number;
}

export interface EvidenceFinding {
  id: string;
  title: string;
  provenance: ProvenanceCategory;
  severity: "high" | "medium" | "low" | "informational";
  checkName: string;
  checkVersion: string;
  excerptOrDetail: string;
  offsetOrTimestamp?: string;
  limitations: string;
  recommendation: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  stage: string;
  timestamp: string;
  durationMs: number;
  status: "success" | "warning" | "error" | "info";
  description: string;
}

export interface Recommendation {
  id: string;
  category: "verification" | "containment" | "escalation" | "policy";
  priority: "immediate" | "recommended" | "optional";
  title: string;
  action: string;
  requiresReviewer: boolean;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  details: string;
  correlationId: string;
}

export interface HumanReview {
  reviewId: string;
  status: ReviewStatus;
  priority: ReviewPriority;
  assignedTo?: string;
  assignedAt?: string;
  decision?:
    | "lower_risk_verified"
    | "suspicious_confirmed"
    | "fraud_confirmed"
    | "inconclusive_unresolved"
    | "escalated_for_investigation";
  rationale?: string;
  verificationBasis?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  version: number;
}

export interface AnalysisJob {
  id: string;
  title: string;
  category: ModalityCategory;
  state: JobState;
  assessmentState: AssessmentState;
  overallRiskScore: number | null; // 0 - 100 (null if unavailable/insufficient)
  manipulationScore: number | null; // 0 - 100
  communicationRiskScore: number | null; // 0 - 100
  modelConfidence: number | null; // 0 - 100 (per-check calibrated)
  evidenceCompleteness: number; // 0 - 100
  createdAt: string;
  completedAt: string | null;
  submitter: {
    name: string;
    email: string;
    role: string;
    organisation: string;
  };
  asset: EvidenceAsset;
  optionalContext?: string;
  findings: EvidenceFinding[];
  checks: DetectionCheck[];
  timeline: TimelineEvent[];
  recommendations: Recommendation[];
  auditTrail: AuditRecord[];
  review: HumanReview;
}

export interface EvaluationModel {
  id: string;
  name: string;
  modality: ModalityCategory;
  version: string;
  status: "active" | "evaluation" | "deprecated";
  architecture: string;
  lastEvaluated: string;
  cohort: string;
  precision: number;
  recall: number;
  f1: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  latencyMs: number;
  sampleSize: number;
  limitations: string;
}
