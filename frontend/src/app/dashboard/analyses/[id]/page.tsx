"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { RiskAssessmentBadge } from "@/components/RiskAssessmentBadge";
import { CoverageRing } from "@/components/CoverageRing";
import { ProvenanceLabel } from "@/components/ProvenanceLabel";
import { ReviewDecisionModal } from "@/components/ReviewDecisionModal";
import { DeletionDialog } from "@/components/DeletionDialog";
import { useTruthLens } from "@/lib/store";
import {
  ShieldAlert,
  FileVideo,
  FileAudio,
  Mail,
  FileText,
  Globe,
  MessageSquare,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Download,
  Trash2,
  ArrowLeft,
  Layers,
  Activity,
  Cpu,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Hash,
  Lock,
} from "lucide-react";

type TabKey =
  | "summary"
  | "evidence"
  | "technical"
  | "context"
  | "timeline"
  | "recommendations"
  | "audit";

function AnalysisWorkspaceContent() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params?.id as string;
  const { getAnalysis, updateReviewDecision, deleteEvidenceAsset, setToast } = useTruthLens();

  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Video scrubber sample frame state
  const [selectedFrameTime, setSelectedFrameTime] = useState("00:04");

  const job = getAnalysis(analysisId);

  if (!job) {
    return (
      <AppShell>
        <div className="py-16 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-800 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Analysis Record Not Found</h2>
          <p className="text-xs text-slate-600">
            No analysis matches identifier <code className="font-mono font-bold text-slate-900">{analysisId}</code> in your tenant boundary.
          </p>
          <Link
            href="/dashboard/analyses"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Analysis History</span>
          </Link>
        </div>
      </AppShell>
    );
  }

  const getModalityIcon = (cat: string) => {
    switch (cat) {
      case "video":
        return FileVideo;
      case "email":
        return Mail;
      case "audio":
        return FileAudio;
      case "document":
        return FileText;
      case "url":
        return Globe;
      case "chat":
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const ModalityIcon = getModalityIcon(job.category);

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      setToast(`Investigation Report snapshot generated: TRUTHLENS-REPORT-${job.id}-v1.pdf`);
    }, 1200);
  };

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "summary", label: "Summary" },
    { key: "evidence", label: "Evidence Inspector", count: job.findings.length },
    { key: "technical", label: "Technical Analysis", count: job.checks.length },
    { key: "context", label: "Context Checks" },
    { key: "timeline", label: "Timeline & Hashes" },
    { key: "recommendations", label: "Recommendations", count: job.recommendations.length },
    { key: "audit", label: "Audit History", count: job.auditTrail.length },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* ================= TOP RETURN & ACTIONS BAR ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/analyses"
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Return to History"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">{job.id}</span>
                {job.asset.isDemo && (
                  <span className="rounded bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    Demo Fixture
                  </span>
                )}
                <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 capitalize">
                  {job.category}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate max-w-xl">
                {job.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-800 px-4 py-2 text-xs font-semibold text-white hover:bg-red-900 transition-colors shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Record Review Decision</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{isGeneratingPdf ? "Generating PDF..." : "Export Report PDF"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:text-red-800 text-slate-400 transition-colors"
              title="Delete Evidence"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= ASSESSMENT HEADER & SEPARATE SCORE METRICS ================= */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Overall Verdict Badge */}
            <div className="md:col-span-5 flex flex-col items-start gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Operational Assessment State
              </span>
              <RiskAssessmentBadge
                state={job.assessmentState}
                score={job.overallRiskScore}
                size="lg"
              />
              <p className="text-xs text-slate-500 leading-normal mt-1">
                Risk score is an operational assessment (0–100), not a guarantee of authenticity. Human decision is required.
              </p>
            </div>

            {/* Distinct Metric Matrix (PRD Section 8 Invariant: Separate representation!) */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">
                  Manipulation
                </span>
                <span className="mt-1 text-xl font-black font-mono text-slate-900">
                  {job.manipulationScore !== null ? `${job.manipulationScore}/100` : "N/A"}
                </span>
                <span className="text-[10px] text-slate-400">
                  {job.manipulationScore !== null ? "Visual/Acoustic" : "No media artifacts"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">
                  Comm. Risk
                </span>
                <span className="mt-1 text-xl font-black font-mono text-slate-900">
                  {job.communicationRiskScore !== null ? `${job.communicationRiskScore}/100` : "N/A"}
                </span>
                <span className="text-[10px] text-slate-400">Headers & Urgency</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">
                  Confidence
                </span>
                <span className="mt-1 text-xl font-black font-mono text-emerald-800">
                  {job.modelConfidence !== null ? `${job.modelConfidence}%` : "N/A"}
                </span>
                <span className="text-[10px] text-slate-400">Calibrated check</span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-[10px] font-semibold text-slate-500 uppercase mb-1">
                  Completeness
                </span>
                <CoverageRing value={job.evidenceCompleteness} size={36} strokeWidth={3.5} />
              </div>
            </div>
          </div>

          {/* Asset Metadata Strip */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <ModalityIcon className="w-3.5 h-3.5 text-red-800" />
                <span>{job.asset.name}</span>
              </span>
              <span>•</span>
              <span className="font-mono text-[11px] text-slate-500">
                SHA-256: {job.asset.sha256.substring(0, 16)}...
              </span>
              <span>•</span>
              <span>Retention: {job.asset.retentionPolicy}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Review:</span>
              <span
                className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                  job.review.status === "reviewed"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {job.review.status.replace("_", " ")}
              </span>
              {job.review.assignedTo && (
                <span className="text-[11px] text-slate-600 font-medium">
                  ({job.review.assignedTo})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ================= THE 7 PRD TABS NAVIGATION ================= */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-2 overflow-x-auto pb-px" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold text-xs whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-red-800 text-red-900 bg-red-50/40 rounded-t-lg"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                        isActive ? "bg-red-800 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ================= TAB 1: SUMMARY ================= */}
        {activeTab === "summary" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Key Findings List */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Key Evidence Findings</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {job.findings.length} Indicators Flagged
                </span>
              </div>

              <div className="space-y-3">
                {job.findings.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white flex flex-col gap-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            finding.severity === "high"
                              ? "bg-red-700"
                              : finding.severity === "medium"
                              ? "bg-amber-600"
                              : "bg-slate-400"
                          }`}
                        />
                        <h4 className="text-xs font-bold text-slate-900">{finding.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {finding.offsetOrTimestamp && (
                          <span className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {finding.offsetOrTimestamp}
                          </span>
                        )}
                        <ProvenanceLabel category={finding.provenance} />
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {finding.excerptOrDetail}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span>Detector: {finding.checkName}</span>
                      <span className="font-semibold text-red-900">
                        Action: {finding.recommendation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Context Provided */}
            {job.optionalContext && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Submission Context & Operational Origin
                  </h3>
                  <ProvenanceLabel category="user_unverified" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  &ldquo;{job.optionalContext}&rdquo;
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Note: Submitter context is marked unverified and kept distinct from algorithmic detections.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: EVIDENCE INSPECTOR ================= */}
        {activeTab === "evidence" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Modality Specific Inspector View */}
            {job.category === "video" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Video Frame Scrubber & Facial Mask Anomaly Viewer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Examine sampled frames and spatial boundary discrepancy masks.
                  </p>
                </div>

                {/* Frame Preview Canvas Simulation */}
                <div className="relative aspect-video max-w-2xl mx-auto rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800 shadow-xl">
                  {/* Simulated Frame Backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center">
                    {/* Face Wireframe with Boundary Jitter */}
                    <div className="relative w-48 h-56 rounded-full border border-red-500/70 flex items-center justify-center">
                      <div className="absolute -top-3 bg-red-800 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold">
                        Jitter Index: 0.88 (Timestamp {selectedFrameTime})
                      </div>
                      {/* Facial landmarks grid */}
                      <div className="w-24 h-16 border-t-2 border-b-2 border-red-400/50 flex items-center justify-between px-2">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                      </div>
                      <div className="absolute bottom-6 w-12 h-3 rounded-full border border-red-400/60" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded text-xs font-mono">
                    Frame Timestamp: {selectedFrameTime} • 1080p @ 30fps
                  </div>
                </div>

                {/* Scrubber Controls */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Frame Timestamps</span>
                    <span className="text-red-800 font-mono">Selected: {selectedFrameTime}</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {["00:04", "00:08", "00:12", "00:18", "00:24", "00:30"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedFrameTime(time)}
                        className={`p-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                          selectedFrameTime === time
                            ? "bg-red-800 text-white border-red-800 shadow-xs"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {job.category === "email" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    RFC822 Header Forensic Inspector & Punycode Analyzer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Raw header parsing isolates sender discrepancies and cryptographic signature failures.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-red-900">
                      <AlertOctagon className="w-4 h-4" />
                      <span>Homoglyph / Punycode Domain Mismatch</span>
                    </div>
                    <p className="text-[11px] text-red-800">
                      Display From: <code className="bg-red-100 px-1 py-0.5 rounded font-bold">cfo@apex-securìties.com</code> (U+00EC Latin Small Letter I with Grave)
                    </p>
                    <p className="text-[11px] text-red-800">
                      Authentic Tenant Domain: <code className="bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded font-bold">apex-securities.com</code>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 space-y-2 overflow-x-auto text-[11px]">
                    <p className="text-slate-400 font-bold border-b border-slate-800 pb-1">
                      Raw Header Excerpt:
                    </p>
                    <p>Received: from mail-node185.spoof-relay.net (185.220.101.5)</p>
                    <p>Authentication-Results: spf=fail (sender IP 185.220.101.5 not permitted); dkim=none</p>
                    <p>Message-ID: &lt;20261018093010.84102@apex-securìties.com&gt;</p>
                    <p>Subject: Urgent Q3 Supplier Reroute - Dual-Authorisation Bypass Required</p>
                  </div>
                </div>
              </div>
            )}

            {job.category === "audio" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Audio Spectral Waveform & Harmonic Residual Decomposition
                </h3>
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Sampling Rate: 16kHz Mono PCM</span>
                    <span className="text-red-400">Harmonic Discontinuity: 8.2kHz cutoff</span>
                  </div>
                  <div className="h-24 w-full flex items-center justify-center">
                    <svg className="w-full h-20" viewBox="0 0 600 80" fill="none">
                      <path
                        d="M0 40 Q50 10, 100 40 T200 40 T300 10 T400 70 T500 20 T600 40"
                        className="stroke-red-600"
                        strokeWidth="2.5"
                      />
                      <line x1="0" y1="40" x2="600" y2="40" stroke="#334155" strokeDasharray="4 4" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>00:00</span>
                    <span className="text-red-400 font-bold">Autoregressive TTS Vocoder Artifact</span>
                    <span>00:45</span>
                  </div>
                </div>
              </div>
            )}

            {job.category === "document" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Document Stream AST & Signature Passages
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-800">DocuGuard AST Inspection</span>
                    <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Signature Chain Valid
                    </span>
                  </div>
                  <p className="text-slate-700">Digital Signature: CN=DigiCert Global Root CA, O=Adobe Sign</p>
                  <p className="text-slate-600">Extracted 14 clean PDF page streams without font anomalies.</p>
                </div>
              </div>
            )}

            {job.category === "url" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Isolated Browser Safe-Fetch Detonation & Network Tracer
                </h3>
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-red-900">
                    <AlertOctagon className="w-4 h-4" />
                    <span>Malicious Form Post Destination Traced</span>
                  </div>
                  <p className="font-mono text-slate-800">
                    Form Action: <code className="bg-red-100 px-1 py-0.5 rounded">https://stealer-collector-node.ru/drop</code>
                  </p>
                  <p className="text-slate-600">
                    Redirect Hops: 3 Permitted Redirects • Destination Domain registered 48h ago.
                  </p>
                </div>
              </div>
            )}

            {job.category === "chat" && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Plaintext Chat Continuity & Urgency Analysis
                </h3>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Inconclusive Origin Authentication</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Plaintext chat files lack cryptographic integrity keys. Disclosed as unauthenticated content; risk score set to null.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: TECHNICAL ANALYSIS ================= */}
        {activeTab === "technical" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Modular Detector & Rule Execution Matrix
                  </h3>
                  <p className="text-xs text-slate-500">
                    Every check discloses detector version, execution status, and calibration.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Check / Capability</th>
                      <th className="py-2.5 px-3">Version</th>
                      <th className="py-2.5 px-3">Execution Status</th>
                      <th className="py-2.5 px-3">Native Score</th>
                      <th className="py-2.5 px-3">Confidence</th>
                      <th className="py-2.5 px-3">Execution Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {job.checks.map((chk) => (
                      <tr key={chk.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{chk.name}</div>
                          <div className="text-[11px] text-slate-500">{chk.limitations}</div>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                          {chk.detectorVersion}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              chk.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : chk.status === "unavailable"
                                ? "bg-slate-200 text-slate-700"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {chk.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">
                          {chk.score !== null ? `${chk.score}/100` : "null"}
                        </td>
                        <td className="py-3 px-3">
                          {chk.confidence !== null ? (
                            <span className="font-semibold text-slate-800">
                              {chk.confidence}% {chk.calibrated ? "(Calibrated)" : "(Uncalibrated)"}
                            </span>
                          ) : (
                            <span className="text-slate-400">N/A</span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {chk.executionTimeMs} ms
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explicit Limitations Panel (PRD Requirement) */}
            <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-5 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4" />
                <span>Disclosed Technical Limitations & Operational Boundaries</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Missing detectors or skipped checks remain visibly marked as &ldquo;unavailable&rdquo; or &ldquo;skipped&rdquo;. TRUTHLENS strictly forbids replacing missing detector outputs with synthetic zero values. High background noise, lossy compression codecs, or non-standard protocols may restrict detection resolution.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CONTEXT CHECKS ================= */}
        {activeTab === "context" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Identity, Behavioral & Communication Context Checks
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Directory Identity Alignment</h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Cross-referenced claimed sender against Corporate Active Directory. Claimed handle lacks corporate SAML registration.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded">
                    Mismatch
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Wire Transfer Dual-Auth Bypass Urgency</h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Detected 4 social engineering pressure phrases demanding circumvention of Treasury dual-sign policies.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded">
                    Coercion Trigger
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: TIMELINE & HASHES ================= */}
        {activeTab === "timeline" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  Cryptographic Provenance & Pipeline Timeline
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  Hash: {job.asset.sha256}
                </span>
              </div>

              <div className="space-y-4">
                {job.timeline.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 text-xs">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </div>
                      <div className="w-0.5 h-8 bg-slate-200 my-1" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">{event.stage}</h4>
                        <span className="font-mono text-[10px] text-slate-400">
                          {event.durationMs} ms
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{event.description}</p>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: RECOMMENDATIONS ================= */}
        {activeTab === "recommendations" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Investigator Next Steps & Containment Guidance
              </h3>
              <p className="text-xs text-slate-500">
                Defensive recommendations generated from observed signals and corporate security playbooks.
              </p>

              <div className="space-y-3">
                {job.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                            rec.priority === "immediate"
                              ? "bg-red-800 text-white"
                              : "bg-slate-200 text-slate-800"
                          }`}
                        >
                          {rec.priority}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                      </div>
                      <p className="mt-1 text-xs text-slate-700">{rec.action}</p>
                    </div>

                    {rec.requiresReviewer && (
                      <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200 whitespace-nowrap self-start sm:self-auto">
                        Requires Reviewer Grant
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: AUDIT HISTORY ================= */}
        {activeTab === "audit" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  Tamper-Resistant Security Audit Trail
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Tenant Scoped • Immutable
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Actor & Role</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">Details</th>
                      <th className="py-2.5 px-3">Correlation Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {job.auditTrail.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 text-slate-600">
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          {record.actor} ({record.actorRole})
                        </td>
                        <td className="py-3 px-3 text-red-800 font-bold">{record.action}</td>
                        <td className="py-3 px-3 font-sans text-slate-700 max-w-sm">
                          {record.details}
                        </td>
                        <td className="py-3 px-3 text-slate-400">{record.correlationId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Decision Recording Modal */}
      <ReviewDecisionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        analysisId={job.id}
        currentReview={job.review}
        onSaveDecision={(decisionData) => {
          updateReviewDecision(job.id, decisionData);
        }}
      />

      {/* Deletion Dialog */}
      <DeletionDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        analysis={job}
        onConfirmDelete={async (id, rationale) => {
          await deleteEvidenceAsset(id, rationale);
          router.push("/dashboard/analyses");
          return true;
        }}
      />
    </AppShell>
  );
}
export default function AnalysisWorkspacePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-xs text-slate-500 font-mono">
          Loading investigation workspace...
        </div>
      }
    >
      <AnalysisWorkspaceContent />
    </React.Suspense>
  );
}
