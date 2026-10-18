"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { RiskAssessmentBadge } from "@/components/RiskAssessmentBadge";
import { CoverageRing } from "@/components/CoverageRing";
import { useTruthLens } from "@/lib/store";
import {
  ShieldAlert,
  Inbox,
  Clock,
  PlusCircle,
  ArrowUpRight,
  Video,
  Mail,
  FileAudio,
  FileText,
  Globe,
  MessageSquare,
  AlertOctagon,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Cpu,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function DashboardOverviewPage() {
  const { analyses, currentUser } = useTruthLens();

  const totalAnalyses = analyses.length;
  const highRiskCount = analyses.filter((a) => a.assessmentState === "high_risk").length;
  const reviewRecommendedCount = analyses.filter(
    (a) => a.assessmentState === "review_recommended"
  ).length;
  const lowerRiskCount = analyses.filter((a) => a.assessmentState === "lower_risk").length;
  const inconclusiveCount = analyses.filter(
    (a) => a.assessmentState === "inconclusive" || a.assessmentState === "insufficient_evidence"
  ).length;

  const pendingReviews = analyses.filter(
    (a) => a.review.status === "unassigned" || a.review.status === "in_review"
  ).length;

  // Chart Data: Risk Distribution
  const riskDistributionData = [
    { name: "High Assessed Risk", value: highRiskCount, color: "#B91C1C" },
    { name: "Review Recommended", value: reviewRecommendedCount, color: "#92400E" },
    { name: "Lower Assessed Risk", value: lowerRiskCount, color: "#166534" },
    { name: "Inconclusive / Pending", value: inconclusiveCount, color: "#475569" },
  ];

  // Chart Data: Modality Volume
  const modalityVolumeData = [
    { name: "Video", count: analyses.filter((a) => a.category === "video").length },
    { name: "Email", count: analyses.filter((a) => a.category === "email").length },
    { name: "Audio", count: analyses.filter((a) => a.category === "audio").length },
    { name: "Document", count: analyses.filter((a) => a.category === "document").length },
    { name: "URL", count: analyses.filter((a) => a.category === "url").length },
    { name: "Chat", count: analyses.filter((a) => a.category === "chat").length },
  ];

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

  return (
    <AppShell>
      <div className="space-y-8">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Case overview
              </h1>
              <span className="rounded bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                Live Console
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Organisation workspace: <span className="font-semibold text-slate-800">{currentUser.organisation}</span> • Active Role:{" "}
              <span className="font-semibold text-red-800">{currentUser.role}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/reviews"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Inbox className="w-3.5 h-3.5 text-slate-500" />
              <span>Review Backlog ({pendingReviews})</span>
            </Link>
            <Link
              href="/dashboard/analyses/new"
              className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-4 py-2 text-xs font-semibold text-white hover:bg-red-900 transition-colors shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </Link>
          </div>
        </div>

        {/* ================= METRIC CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">Total Analyses</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">{totalAnalyses}</span>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center">
                +12% this week
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Across 6 ingested modalities</p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">High Assessed Risk</span>
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-800">
                <AlertOctagon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-800 font-mono">{highRiskCount}</span>
              <span className="text-[11px] font-semibold text-red-700">Priority cases</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Requires multi-factor human sign-off</p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">Review Backlog</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-800 font-mono">{pendingReviews}</span>
              <span className="text-[11px] font-semibold text-amber-700">Awaiting reviewer</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Avg resolution turnaround: 14m</p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">Avg Processing Time</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">18.4s</span>
              <span className="text-[11px] font-semibold text-emerald-700">p95 &lt; 45s</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Sandboxed Celery worker cluster</p>
          </div>
        </div>

        {/* ================= CHARTS ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Risk Distribution Chart (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">Risk by assessment band</h2>
                <span className="text-[10px] text-slate-400 font-mono">Current cases</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Distribution across operational bands. Does not imply binary ground-truth certainty.
              </p>

              <div className="h-56 mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => [`${val} analyses`, "Volume"]}
                      contentStyle={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        border: "1px solid #E2E8F0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-xs">
              {riskDistributionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-slate-600 font-medium">{item.name}:</span>
                  <span className="font-bold text-slate-900 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modality Volume Bar Chart (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">Cases by evidence type</h2>
                <span className="text-[10px] text-slate-400 font-mono">Past 30 days</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Intake volume partitioned across video, email, audio, document, and URL detonation queues.
              </p>

              <div className="h-56 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modalityVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} />
                    <Tooltip
                      formatter={(val) => [`${val} cases`, "Count"]}
                      contentStyle={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        border: "1px solid #E2E8F0",
                      }}
                    />
                    <Bar dataKey="count" fill="#991B1B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span>All ingested assets preserved under cryptographic SHA-256 seals.</span>
              <Link
                href="/dashboard/performance"
                className="font-semibold text-red-800 hover:text-red-950 flex items-center gap-1"
              >
                <span>View Model Accuracies</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= RECENT ANALYSES ACTIVITY TABLE ================= */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent cases</h2>
              <p className="text-xs text-slate-500">
                The latest submitted evidence and its current review status.
              </p>
            </div>
            <Link
              href="/dashboard/analyses"
              className="text-xs font-semibold text-red-800 hover:text-red-950 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All History</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Analysis ID</th>
                  <th className="py-3 px-3">Subject / Asset Name</th>
                  <th className="py-3 px-3">Modality</th>
                  <th className="py-3 px-3">Risk Assessment</th>
                  <th className="py-3 px-3">Coverage</th>
                  <th className="py-3 px-3">Review Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analyses.map((job) => {
                  const Icon = getModalityIcon(job.category);
                  return (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                        <Link
                          href={`/dashboard/analyses/${job.id}`}
                          className="hover:text-red-800 hover:underline"
                        >
                          {job.id}
                        </Link>
                      </td>
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="truncate font-semibold text-slate-800" title={job.title}>
                          {job.title}
                        </div>
                        <div className="truncate font-mono text-[10px] text-slate-400" title={job.asset.name}>
                          {job.asset.name}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 font-medium text-slate-700 capitalize text-[11px]">
                          <Icon className="w-3.5 h-3.5 text-slate-500" />
                          <span>{job.category}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <RiskAssessmentBadge
                          state={job.assessmentState}
                          score={job.overallRiskScore}
                          size="sm"
                        />
                      </td>
                      <td className="py-3.5 px-3">
                        <CoverageRing value={job.evidenceCompleteness} size={36} strokeWidth={3.5} />
                      </td>
                      <td className="py-3.5 px-3">
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
                      <td className="py-3.5 px-3 text-right">
                        <Link
                          href={`/dashboard/analyses/${job.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-red-800 hover:text-white transition-colors font-semibold text-xs"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
