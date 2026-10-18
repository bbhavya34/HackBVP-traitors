"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { RiskAssessmentBadge } from "@/components/RiskAssessmentBadge";
import { CoverageRing } from "@/components/CoverageRing";
import { DeletionDialog } from "@/components/DeletionDialog";
import { useTruthLens } from "@/lib/store";
import { AnalysisJob, ModalityCategory } from "@/lib/types";
import {
  Search,
  Filter,
  PlusCircle,
  Video,
  Mail,
  FileAudio,
  FileText,
  Globe,
  MessageSquare,
  ArrowUpRight,
  Trash2,
  Calendar,
  Layers,
  ChevronDown,
} from "lucide-react";

export default function AnalysisHistoryPage() {
  const { analyses, deleteEvidenceAsset } = useTruthLens();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModality, setSelectedModality] = useState<string>("all");
  const [selectedRiskBand, setSelectedRiskBand] = useState<string>("all");
  const [selectedReviewStatus, setSelectedReviewStatus] = useState<string>("all");

  const [deleteTarget, setDeleteTarget] = useState<AnalysisJob | null>(null);

  const getModalityIcon = (cat: string) => {
    switch (cat) {
      case "video":
        return Video;
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

  const filteredAnalyses = analyses.filter((job) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = job.id.toLowerCase().includes(q);
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchFile = job.asset.name.toLowerCase().includes(q);
      const matchHash = job.asset.sha256.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchFile && !matchHash) return false;
    }

    // Modality filter
    if (selectedModality !== "all" && job.category !== selectedModality) return false;

    // Risk band filter
    if (selectedRiskBand !== "all" && job.assessmentState !== selectedRiskBand) return false;

    // Review status filter
    if (selectedReviewStatus !== "all" && job.review.status !== selectedReviewStatus) return false;

    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Case history
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Find submitted evidence, review its status, and open the complete case record.
            </p>
          </div>

          <Link
            href="/dashboard/analyses/new"
            className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-4 py-2 text-xs font-semibold text-white hover:bg-red-900 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </Link>
        </div>

        {/* ================= FILTERS & CONTROLS BAR ================= */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search ID, title, filename, SHA-256..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900"
              />
            </div>

            {/* Modality Filter */}
            <div>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900 bg-white"
              >
                <option value="all">All Modalities</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
                <option value="email">Email</option>
                <option value="document">Document</option>
                <option value="url">URL Detonation</option>
                <option value="chat">Chat Export</option>
              </select>
            </div>

            {/* Risk Band Filter */}
            <div>
              <select
                value={selectedRiskBand}
                onChange={(e) => setSelectedRiskBand(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900 bg-white"
              >
                <option value="all">All Risk Bands</option>
                <option value="high_risk">High Assessed Risk (70-100)</option>
                <option value="review_recommended">Review Recommended (30-69)</option>
                <option value="lower_risk">Lower Assessed Risk (0-29)</option>
                <option value="inconclusive">Inconclusive / Uncertainty</option>
              </select>
            </div>

            {/* Review Status Filter */}
            <div>
              <select
                value={selectedReviewStatus}
                onChange={(e) => setSelectedReviewStatus(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900 bg-white"
              >
                <option value="all">All Review Statuses</option>
                <option value="unassigned">Unassigned</option>
                <option value="assigned">Assigned</option>
                <option value="in_review">In Review</option>
                <option value="awaiting_evidence">Awaiting Evidence</option>
                <option value="escalated">Escalated</option>
                <option value="reviewed">Decision Recorded</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing <strong className="text-slate-800">{filteredAnalyses.length}</strong> of{" "}
              {analyses.length} evidence items
            </span>
            {(searchQuery || selectedModality !== "all" || selectedRiskBand !== "all" || selectedReviewStatus !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedModality("all");
                  setSelectedRiskBand("all");
                  setSelectedReviewStatus("all");
                }}
                className="text-red-800 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Analysis Ref</th>
                  <th className="py-3 px-4">Subject & File</th>
                  <th className="py-3 px-4">Modality</th>
                  <th className="py-3 px-4">Assessed Risk</th>
                  <th className="py-3 px-4">Completeness</th>
                  <th className="py-3 px-4">Ingestion Date</th>
                  <th className="py-3 px-4">Review Workflow</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAnalyses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No analyses found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAnalyses.map((job) => {
                    const Icon = getModalityIcon(job.category);
                    return (
                      <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          <Link
                            href={`/dashboard/analyses/${job.id}`}
                            className="hover:text-red-800 hover:underline flex items-center gap-1.5"
                          >
                            <span>{job.id}</span>
                            {job.asset.isDemo && (
                              <span className="text-[9px] font-bold text-red-800 bg-red-100 px-1 py-0.2 rounded uppercase">
                                Demo
                              </span>
                            )}
                          </Link>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="truncate font-semibold text-slate-800" title={job.title}>
                            {job.title}
                          </div>
                          <div className="truncate font-mono text-[10px] text-slate-400" title={job.asset.name}>
                            {job.asset.name}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 font-medium text-slate-700 capitalize text-[11px]">
                            <Icon className="w-3.5 h-3.5 text-slate-500" />
                            <span>{job.category}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <RiskAssessmentBadge
                            state={job.assessmentState}
                            score={job.overallRiskScore}
                            size="sm"
                          />
                        </td>

                        <td className="py-3.5 px-4">
                          <CoverageRing value={job.evidenceCompleteness} size={34} strokeWidth={3} />
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                          {new Date(job.createdAt).toLocaleDateString()} {new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              job.review.status === "reviewed"
                                ? "bg-emerald-100 text-emerald-800"
                                : job.review.status === "in_review"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {job.review.status.replace("_", " ")}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href={`/dashboard/analyses/${job.id}`}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-800 hover:text-white text-slate-700 transition-colors"
                              title="Inspect Workspace"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget(job)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-800 text-slate-400 transition-colors"
                              title="Delete Evidence"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deletion Dialog Modal */}
      {deleteTarget && (
        <DeletionDialog
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          analysis={deleteTarget}
          onConfirmDelete={deleteEvidenceAsset}
        />
      )}
    </AppShell>
  );
}
