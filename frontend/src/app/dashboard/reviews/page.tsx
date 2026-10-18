"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { RiskAssessmentBadge } from "@/components/RiskAssessmentBadge";
import { ReviewDecisionModal } from "@/components/ReviewDecisionModal";
import { useTruthLens } from "@/lib/store";
import { AnalysisJob, HumanReview, ReviewStatus } from "@/lib/types";
import {
  Inbox,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Filter,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function ReviewQueuePage() {
  const { analyses, currentUser, updateReviewDecision, setToast } = useTruthLens();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedJobForDecision, setSelectedJobForDecision] = useState<AnalysisJob | null>(null);

  const handleAssignToMe = (jobId: string) => {
    updateReviewDecision(jobId, {
      status: "in_review",
      assignedTo: currentUser.name,
    });
    setToast(`Case ${jobId} assigned to ${currentUser.name}`);
  };

  const handleEscalate = (jobId: string) => {
    updateReviewDecision(jobId, {
      status: "escalated",
      rationale: "Escalated by analyst for senior fraud group determination.",
    });
    setToast(`Case ${jobId} escalated to Senior Review Tier.`);
  };

  const filteredJobs = analyses.filter((job) => {
    if (statusFilter !== "all" && job.review.status !== statusFilter) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Review queue
              </h1>
              <span className="rounded bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                Human review
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Assigned cases, evidence requests, escalation paths, and recorded human decisions.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All Items" },
            { id: "unassigned", label: "Unassigned Work" },
            { id: "in_review", label: "In Review" },
            { id: "awaiting_evidence", label: "Awaiting Evidence" },
            { id: "escalated", label: "Escalated" },
            { id: "reviewed", label: "Completed Decisions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Queue Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs">
              No review items currently in this status queue.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{job.id}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        job.review.priority === "urgent"
                          ? "bg-red-800 text-white"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      Priority: {job.review.priority}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Status: {job.review.status.replace("_", " ")}
                    </span>
                    {job.asset.isDemo && (
                      <span className="text-[9px] font-bold text-red-800 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded uppercase">
                        Demo
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    <Link
                      href={`/dashboard/analyses/${job.id}`}
                      className="hover:text-red-800 hover:underline"
                    >
                      {job.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-500 truncate">
                    Asset: {job.asset.name} • Ingested by {job.submitter.name} ({job.submitter.organisation})
                  </p>

                  {job.review.rationale && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700">
                      <strong>Recorded Rationale: </strong>
                      {job.review.rationale}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <RiskAssessmentBadge
                    state={job.assessmentState}
                    score={job.overallRiskScore}
                    size="sm"
                  />

                  <div className="flex items-center gap-2">
                    {job.review.status === "unassigned" ? (
                      <button
                        type="button"
                        onClick={() => handleAssignToMe(job.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                      >
                        Claim Case
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedJobForDecision(job)}
                        className="px-3.5 py-1.5 rounded-lg bg-red-800 hover:bg-red-900 text-white text-xs font-semibold transition-colors shadow-2xs"
                      >
                        Record Decision
                      </button>
                    )}

                    <Link
                      href={`/dashboard/analyses/${job.id}`}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                      title="Inspect Case"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedJobForDecision && (
        <ReviewDecisionModal
          isOpen={true}
          onClose={() => setSelectedJobForDecision(null)}
          analysisId={selectedJobForDecision.id}
          currentReview={selectedJobForDecision.review}
          onSaveDecision={(decisionData) => {
            updateReviewDecision(selectedJobForDecision.id, decisionData);
          }}
        />
      )}
    </AppShell>
  );
}
