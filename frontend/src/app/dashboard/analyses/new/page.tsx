"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useTruthLens } from "@/lib/store";
import { ModalityCategory } from "@/lib/types";
import {
  UploadCloud,
  FileVideo,
  FileAudio,
  ImageIcon,
  Mail,
  FileText,
  Globe,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
} from "lucide-react";

export default function NewAnalysisPage() {
  const router = useRouter();
  const { createAnalysis } = useTruthLens();

  const [category, setCategory] = useState<ModalityCategory>("video");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contextInput, setContextInput] = useState("");
  const [retentionPolicy, setRetentionPolicy] = useState("30_days_ephemeral");
  const [consentConfirmed, setConsentConfirmed] = useState(true);

  // Processing simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stages = [
    { name: "Validating Payload & MIME Signatures", duration: 700 },
    { name: "Ingestion & Cryptographic SHA-256 Hashing", duration: 800 },
    { name: "Signal Extraction in Constrained Sandbox", duration: 1100 },
    { name: "Running Versioned AI & Rule Detectors", duration: 1400 },
    { name: "Risk Engine Synthesis & Completeness Evaluation", duration: 700 },
  ];

  const modalityConfigs: Record<
    ModalityCategory,
    { label: string; icon: React.ElementType; formats: string; limit: string; hint: string }
  > = {
    video: {
      label: "Video",
      icon: FileVideo,
      formats: ".mp4, .mov, .webm",
      limit: "100 MB / 5 minutes",
      hint: "Extracts visual frames, lip-phoneme synchrony, and facial spatiotemporal blending.",
    },
    audio: {
      label: "Audio",
      icon: FileAudio,
      formats: ".wav, .mp3, .m4a",
      limit: "25 MB / 10 minutes",
      hint: "Fourier harmonic decomposition, pitch contour flatness, and neural vocoder artifacts.",
    },
    image: {
      label: "Image",
      icon: ImageIcon,
      formats: ".jpg, .jpeg, .png, .webp",
      limit: "20 MB / 8000x8000 px",
      hint: "Diffusion noise residual detection and localized manipulation masks (no fake heatmaps).",
    },
    email: {
      label: "Email",
      icon: Mail,
      formats: ".eml, .msg, .txt",
      limit: "15 MB including attachments",
      hint: "Raw RFC822 headers, Punycode lookalikes, SPF/DKIM verification, and BEC urgency.",
    },
    document: {
      label: "Document",
      icon: FileText,
      formats: ".pdf, .txt",
      limit: "50 MB / 100 pages",
      hint: "PDF stream inspection, layered text manipulation, font inconsistency, and PKI signatures.",
    },
    url: {
      label: "URL Detonation",
      icon: Globe,
      formats: "http:// or https://",
      limit: "Safe-fetch proxy filtered",
      hint: "Isolated headless browser crawler, redirect tracer, and phishing credential harvest checks.",
    },
    chat: {
      label: "Chat Export",
      icon: MessageSquare,
      formats: ".txt, .json",
      limit: "5 MB UTF-8 text",
      hint: "Continuity checks, conversational urgency, and declared schema validation.",
    },
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!titleInput) {
        setTitleInput(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!titleInput) {
        setTitleInput(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (category === "url") {
      if (!urlInput.trim() || !urlInput.startsWith("http")) {
        setErrorMsg("Please enter a valid HTTP/HTTPS URL for safe detonation.");
        return;
      }
    } else {
      if (!selectedFile) {
        setErrorMsg(`Please select or upload a ${modalityConfigs[category].label} file.`);
        return;
      }
    }

    if (!consentConfirmed) {
      setErrorMsg("You must confirm evidence ingestion authorization under tenant policy.");
      return;
    }

    setIsProcessing(true);
    setIsCancelled(false);
    setCurrentStageIndex(0);

    // Run stage simulation
    for (let i = 0; i < stages.length; i++) {
      if (isCancelled) return;
      setCurrentStageIndex(i);
      await new Promise((res) => setTimeout(res, stages[i].duration));
    }

    // Complete creation in store
    const newId = await createAnalysis({
      title: titleInput || (selectedFile ? selectedFile.name : urlInput),
      category,
      file: selectedFile || undefined,
      url: urlInput || undefined,
      optionalContext: contextInput || undefined,
      retentionPolicy,
    });

    setIsProcessing(false);
    router.push(`/dashboard/analyses/${newId}`);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Start a new analysis
            </h1>
            <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5">
              API Contract v1.1
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Add the suspicious file, message, or link. You can include context before starting the checks.
          </p>
        </div>

        {/* ================= PROCESSING OVERLAY / PROGRESS ================= */}
        {isProcessing && (
          <div className="rounded-2xl bg-white border border-red-200 shadow-xl p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-red-800 animate-spin" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Executing Processing Pipeline...
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Stage {currentStageIndex + 1} of {stages.length}:{" "}
                    {stages[currentStageIndex].name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCancelled(true);
                  setIsProcessing(false);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                Cancel Job
              </button>
            </div>

            {/* Stage Progress Tracker */}
            <div className="mt-6 space-y-3">
              {stages.map((stage, idx) => {
                const isDone = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stage.name} className="flex items-center gap-3 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-red-800 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span
                      className={`font-medium ${
                        isDone
                          ? "text-slate-800 line-through opacity-70"
                          : isCurrent
                          ? "text-red-900 font-bold"
                          : "text-slate-400"
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SUBMISSION FORM ================= */}
        {!isProcessing && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selector Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                1. Select Evidence Category <span className="text-red-800">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {(Object.keys(modalityConfigs) as ModalityCategory[]).map((cat) => {
                  const cfg = modalityConfigs[cat];
                  const Icon = cfg.icon;
                  const isSelected = category === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setSelectedFile(null);
                        setErrorMsg(null);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-red-800 bg-red-50/70 text-red-900 font-bold shadow-xs ring-1 ring-red-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? "text-red-800" : "text-slate-500"}`} />
                      <span className="text-xs">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Info Box */}
            <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200/90 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">
                  {modalityConfigs[category].label} Support Limits:{" "}
                  <span className="font-mono text-slate-700">
                    {modalityConfigs[category].formats} • {modalityConfigs[category].limit}
                  </span>
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {modalityConfigs[category].hint}
                </p>
              </div>
            </div>

            {/* Input Method: File Upload vs URL */}
            {category === "url" ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Destination URL for Safe-Fetch Sandbox <span className="text-red-800">*</span>
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="url"
                    required
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://suspicious-billing-portal.xyz/login"
                    className="w-full text-xs pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900 font-mono"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Strict SSRF protection active: Denies localhost, link-local, and AWS metadata 169.254.169.254.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Upload Evidence Artifact <span className="text-red-800">*</span>
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
                    selectedFile
                      ? "border-red-700 bg-red-50/20"
                      : "border-slate-300 hover:border-slate-400 bg-white"
                  }`}
                  onClick={() => document.getElementById("file-picker")?.click()}
                >
                  <input
                    id="file-picker"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-3">
                      <UploadCloud className="w-6 h-6 text-red-800" />
                    </div>

                    {selectedFile ? (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900 font-mono">
                          {selectedFile.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || "application/octet-stream"}
                        </p>
                        <span className="inline-block mt-2 text-[10px] text-red-800 font-semibold underline">
                          Click to select a different file
                        </span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-800">
                          Drag and drop evidence file here, or{" "}
                          <span className="text-red-800 underline">browse files</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Accepted: {modalityConfigs[category].formats} (Max {modalityConfigs[category].limit})
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Case Title / Identifier */}
            <div>
              <label
                htmlFor="case-title"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1"
              >
                Case Title / Reference Subject (Optional)
              </label>
              <input
                id="case-title"
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="e.g. Q3 Wire Transfer Request from Alleged CFO"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900"
              />
            </div>

            {/* Optional Context Field (Design.md Section 6 & 10) */}
            <div>
              <label
                htmlFor="case-context"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1"
              >
                Optional Context: What happened, and what would you like to verify?
              </label>
              <textarea
                id="case-context"
                rows={3}
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
                placeholder="Describe originating communication channel, reported urgency, claimed identities, or specific anomaly you want investigators to trace."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                User claims are preserved as &quot;User Claim (Unverified)&quot; provenance and not treated as model facts.
              </p>
            </div>

            {/* Governance: Retention Policy & Consent */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Governance & Evidence Retention Policy
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    retentionPolicy === "30_days_ephemeral"
                      ? "border-red-800 bg-red-50/50 text-red-950 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="retention"
                    className="hidden"
                    checked={retentionPolicy === "30_days_ephemeral"}
                    onChange={() => setRetentionPolicy("30_days_ephemeral")}
                  />
                  <span className="font-bold">30 Days Ephemeral</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Automated purge of raw bytes after 30 days.
                  </span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    retentionPolicy === "90_days_standard"
                      ? "border-red-800 bg-red-50/50 text-red-950 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="retention"
                    className="hidden"
                    checked={retentionPolicy === "90_days_standard"}
                    onChange={() => setRetentionPolicy("90_days_standard")}
                  />
                  <span className="font-bold">90 Days Standard</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Recommended for operational fraud review.
                  </span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    retentionPolicy === "365_days_regulatory"
                      ? "border-red-800 bg-red-50/50 text-red-950 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="retention"
                    className="hidden"
                    checked={retentionPolicy === "365_days_regulatory"}
                    onChange={() => setRetentionPolicy("365_days_regulatory")}
                  />
                  <span className="font-bold">365 Days Regulatory</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Formal legal compliance preservation hold.
                  </span>
                </label>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-slate-100">
                <input
                  type="checkbox"
                  checked={consentConfirmed}
                  onChange={(e) => setConsentConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-red-800 focus:ring-red-800"
                />
                <span className="text-xs text-slate-600">
                  I confirm organizational authorization to ingest this media under company compliance rules. I understand uploaded bytes are quarantined privately and never used to train commercial AI models.
                </span>
              </label>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-red-800 hover:bg-red-900 active:bg-red-950 transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Start Ingestion & Analysis</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AppShell>
  );
}
