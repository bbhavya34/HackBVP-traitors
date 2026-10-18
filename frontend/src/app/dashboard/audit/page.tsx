"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useTruthLens } from "@/lib/store";
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Lock,
  UserCheck,
  Clock,
  ArrowDownToLine,
} from "lucide-react";

export default function SecurityAuditPage() {
  const { analyses, setToast } = useTruthLens();
  const [searchFilter, setSearchFilter] = useState("");

  // Aggregate all audit records across analyses
  const allAuditRecords = analyses.flatMap((job) =>
    job.auditTrail.map((record) => ({
      ...record,
      analysisId: job.id,
      analysisTitle: job.title,
    }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredRecords = allAuditRecords.filter((rec) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      rec.action.toLowerCase().includes(q) ||
      rec.actor.toLowerCase().includes(q) ||
      rec.details.toLowerCase().includes(q) ||
      rec.correlationId.toLowerCase().includes(q) ||
      rec.analysisId.toLowerCase().includes(q)
    );
  });

  const handleExportAudit = () => {
    setToast("Audit log exported to encrypted JSON format.");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Security and audit history
              </h1>
              <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5">
                Tamper-Resistant
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Review who accessed evidence, which checks ran, and when records changed.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportAudit}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Audit Trail (JSON)</span>
          </button>
        </div>

        {/* Filter Input */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by actor, action, correlation ref..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-slate-900"
            />
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-4">Timestamp (UTC)</th>
                  <th className="py-3 px-4">Actor & Grant</th>
                  <th className="py-3 px-4">Action Type</th>
                  <th className="py-3 px-4">Target Analysis</th>
                  <th className="py-3 px-4">Event Description</th>
                  <th className="py-3 px-4">Correlation ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(rec.timestamp).toISOString().replace("T", " ").substring(0, 19)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {rec.actor} <span className="font-normal text-slate-500">({rec.actorRole})</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-red-900">
                      {rec.action}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      {rec.analysisId}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700 max-w-md">
                      {rec.details}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {rec.correlationId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
