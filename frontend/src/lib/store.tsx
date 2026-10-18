"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AnalysisJob, HumanReview, ModalityCategory } from "./types";
import { initialAnalyses } from "./mockData";

export type UserRole = "Administrator" | "Analyst" | "Reviewer" | "Read-only viewer";

interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  organisation: string;
}

interface TruthLensContextType {
  analyses: AnalysisJob[];
  currentUser: UserProfile;
  setCurrentRole: (role: UserRole) => void;
  getAnalysis: (id: string) => AnalysisJob | undefined;
  createAnalysis: (params: {
    title: string;
    category: ModalityCategory;
    file?: File;
    url?: string;
    optionalContext?: string;
    retentionPolicy: string;
  }) => Promise<string>;
  updateReviewDecision: (
    analysisId: string,
    update: {
      status: HumanReview["status"];
      decision?: HumanReview["decision"];
      rationale?: string;
      verificationBasis?: string;
      assignedTo?: string;
    }
  ) => void;
  deleteEvidenceAsset: (analysisId: string, rationale: string) => Promise<boolean>;
  toastMessage: string | null;
  setToast: (msg: string | null) => void;
}

const TruthLensContext = createContext<TruthLensContextType | undefined>(undefined);

export function TruthLensProvider({ children }: { children: React.ReactNode }) {
  const [analyses, setAnalyses] = useState<AnalysisJob[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("truthlens_analyses_v1");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAnalyses;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: "Elena Rostova",
    email: "e.rostova@apex-securities.internal",
    role: "Reviewer",
    organisation: "Apex Securities UK",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setToast = (msg: string | null) => {
    setToastMessage(msg);
    if (msg) {
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("truthlens_analyses_v1", JSON.stringify(analyses));
    }
  }, [analyses]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
    setToast(`Active role switched to ${role}`);
  };

  const getAnalysis = (id: string) => {
    return analyses.find((a) => a.id === id);
  };

  const createAnalysis = async ({
    title,
    category,
    file,
    url,
    optionalContext,
    retentionPolicy,
  }: {
    title: string;
    category: ModalityCategory;
    file?: File;
    url?: string;
    optionalContext?: string;
    retentionPolicy: string;
  }): Promise<string> => {
    const newId = `TL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    // Generate cryptographic SHA-256 simulation
    const randomHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    // Calculate score depending on simulated test inputs
    const isPhishing =
      (url && url.includes("phish")) ||
      title.toLowerCase().includes("urgent") ||
      title.toLowerCase().includes("wire");

    const overallRisk = isPhishing ? 84 : 22;
    const manipScore = category === "video" || category === "image" ? (isPhishing ? 89 : 12) : null;
    const commScore = isPhishing ? 88 : 16;
    const assessmentState = isPhishing ? "high_risk" : "lower_risk";

    const newJob: AnalysisJob = {
      id: newId,
      title: title || (file ? file.name : url || "Untitled Investigation"),
      category,
      state: "completed",
      assessmentState,
      overallRiskScore: overallRisk,
      manipulationScore: manipScore,
      communicationRiskScore: commScore,
      modelConfidence: 91,
      evidenceCompleteness: 94,
      createdAt: now,
      completedAt: new Date(Date.now() + 18000).toISOString(),
      submitter: {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        organisation: currentUser.organisation,
      },
      asset: {
        name: file ? file.name : url || "direct_input",
        sizeBytes: file ? file.size : 24000,
        mimeType: file ? file.type || "application/octet-stream" : "text/uri-list",
        sha256: randomHash,
        isDemo: true, // All test submissions marked DEMO per PRD Section 15!
        consentRecorded: true,
        retentionPolicy,
        uploadedAt: now,
        url,
      },
      optionalContext,
      findings: [
        {
          id: `FND-${Math.floor(Math.random() * 1000)}`,
          title: isPhishing
            ? "Anomalous Manipulation & Urgency Markers Observed"
            : "Structural Verification Standard Baseline Passed",
          provenance: isPhishing ? "model_inference" : "observed",
          severity: isPhishing ? "high" : "informational",
          checkName: `TRUTHLENS-${category.toUpperCase()}-Core`,
          checkVersion: "v2.1",
          excerptOrDetail: isPhishing
            ? "Multi-frame spectral discrepancies detected alongside coercive behavioral pressure markers."
            : "No synthetic artifacts detected within model resolution parameters. Clean integrity baseline.",
          limitations: "Standard model calibration threshold applied.",
          recommendation: isPhishing
            ? "Escalate to Tier 2 Human Review for multi-party confirmation."
            : "Standard business archival approved.",
          createdAt: now,
        },
      ],
      checks: [
        {
          id: `CHK-${category}-01`,
          name: `${category.toUpperCase()} Integrity & Artifact Analysis`,
          category: "visual",
          detectorVersion: "TruthLens-Core v2.1",
          status: "completed",
          score: overallRisk,
          confidence: 91,
          calibrated: true,
          limitations: "Standard testing baseline",
          executionTimeMs: 1400,
        },
      ],
      timeline: [
        {
          id: `TL-NEW-1`,
          stage: "Evidence Ingestion & Cryptographic Hashing",
          timestamp: now,
          durationMs: 250,
          status: "success",
          description: `SHA-256 computed: ${randomHash.substring(0, 16)}...`,
        },
        {
          id: `TL-NEW-2`,
          stage: "Inference & Explanation Generation",
          timestamp: now,
          durationMs: 1200,
          status: "success",
          description: `Analysis completed with assessment: ${assessmentState}`,
        },
      ],
      recommendations: [
        {
          id: `REC-NEW-1`,
          category: isPhishing ? "containment" : "policy",
          priority: isPhishing ? "immediate" : "optional",
          title: isPhishing ? "Halt Associated Actions" : "Archive Evidence",
          action: isPhishing
            ? "Do not act on instructions until human reviewer verifies."
            : "Store record according to selected retention policy.",
          requiresReviewer: isPhishing,
        },
      ],
      auditTrail: [
        {
          id: `AUD-NEW-1`,
          timestamp: now,
          actor: currentUser.name,
          actorRole: currentUser.role,
          action: "SUBMISSION_CREATED",
          details: `Analysis job ${newId} initiated by ${currentUser.email}`,
          correlationId: `CORR-${newId}`,
        },
      ],
      review: {
        reviewId: `REV-${newId}`,
        status: isPhishing ? "unassigned" : "reviewed",
        priority: isPhishing ? "urgent" : "low",
        version: 1,
        ...(isPhishing
          ? {}
          : {
              decision: "lower_risk_verified",
              rationale: "Automated baseline clean, verified compliant with security baseline.",
              reviewedBy: currentUser.name,
              reviewedAt: now,
            }),
      },
    };

    setAnalyses((prev) => [newJob, ...prev]);
    setToast(`Analysis job ${newId} successfully processed!`);
    return newId;
  };

  const updateReviewDecision = (
    analysisId: string,
    update: {
      status: HumanReview["status"];
      decision?: HumanReview["decision"];
      rationale?: string;
      verificationBasis?: string;
      assignedTo?: string;
    }
  ) => {
    setAnalyses((prev) =>
      prev.map((job) => {
        if (job.id !== analysisId) return job;

        const updatedReview: HumanReview = {
          ...job.review,
          status: update.status,
          decision: update.decision ?? job.review.decision,
          rationale: update.rationale ?? job.review.rationale,
          verificationBasis: update.verificationBasis ?? job.review.verificationBasis,
          assignedTo: update.assignedTo ?? job.review.assignedTo,
          reviewedBy: currentUser.name,
          reviewedAt: new Date().toISOString(),
          version: job.review.version + 1,
        };

        const newAudit: AnalysisJob["auditTrail"][0] = {
          id: `AUD-REV-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: currentUser.name,
          actorRole: currentUser.role,
          action: "HUMAN_REVIEW_UPDATED",
          details: `Review updated to status '${update.status}'${
            update.decision ? ` with decision '${update.decision}'` : ""
          }. Rationale: ${update.rationale || "None specified"}.`,
          correlationId: `CORR-REV-${job.id}`,
        };

        return {
          ...job,
          review: updatedReview,
          auditTrail: [newAudit, ...job.auditTrail],
        };
      })
    );
    setToast(`Review decision recorded for ${analysisId}`);
  };

  const deleteEvidenceAsset = async (
    analysisId: string,
    rationale: string
  ): Promise<boolean> => {
    // Section 8: Deletion confirmation & policy propagation
    setAnalyses((prev) =>
      prev.filter((job) => job.id !== analysisId)
    );
    setToast(`Evidence ${analysisId} purged under retention policy: ${rationale}`);
    return true;
  };

  return (
    <TruthLensContext.Provider
      value={{
        analyses,
        currentUser,
        setCurrentRole,
        getAnalysis,
        createAnalysis,
        updateReviewDecision,
        deleteEvidenceAsset,
        toastMessage,
        setToast,
      }}
    >
      {children}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4"
        >
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </TruthLensContext.Provider>
  );
}

export function useTruthLens() {
  const context = useContext(TruthLensContext);
  if (!context) {
    throw new Error("useTruthLens must be used within TruthLensProvider");
  }
  return context;
}
