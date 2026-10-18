"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useTruthLens } from "@/lib/store";
import {
  FileCheck2,
  Download,
  Lock,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Loader2,
  Printer,
  Eye,
} from "lucide-react";

export default function EvidenceReportsPage() {
  const { analyses, setToast } = useTruthLens();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, reportRef: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setToast(`Downloaded report snapshot: ${reportRef}`);
    }, 1000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Reports
            </h1>
            <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5">
              Version history
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Download case reports with source hashes, check versions, and recorded review decisions.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyses.map((job) => {
            const reportRef = `TL-REP-${job.id}-v${job.review.version}.pdf`;
            const isDownloading = downloadingId === job.id;

            return (
              <div
                key={job.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900">
                      <FileCheck2 className="w-4 h-4 text-red-800" />
                      <span>{reportRef}</span>
                    </div>
                    {job.asset.isDemo && (
                      <span className="text-[9px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded uppercase">
                        Demo Watermark
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>
                        <strong>Asset:</strong> {job.asset.name}
                      </p>
                      <p className="font-mono text-[11px] truncate">
                        <strong>SHA-256:</strong> {job.asset.sha256}
                      </p>
                      <p>
                        <strong>Assessment State:</strong>{" "}
                        <span className="font-semibold capitalize text-slate-800">
                          {job.assessmentState.replace("_", " ")}
                        </span>{" "}
                        {job.overallRiskScore !== null && `(${job.overallRiskScore}/100)`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Generated for {job.submitter.organisation}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/analyses/${job.id}`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      View Record
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDownload(job.id, reportRef)}
                      disabled={isDownloading}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-800 hover:bg-red-900 text-xs font-semibold text-white transition-colors shadow-2xs disabled:opacity-60"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Exporting...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
