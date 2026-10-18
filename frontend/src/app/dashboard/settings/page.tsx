"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useTruthLens } from "@/lib/store";
import {
  Settings,
  ShieldCheck,
  Building2,
  Users,
  Sliders,
  Database,
  Lock,
  Save,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  const { currentUser, setToast } = useTruthLens();

  const [lowerThreshold, setLowerThreshold] = useState("29");
  const [highThreshold, setHighThreshold] = useState("70");
  const [defaultRetention, setDefaultRetention] = useState("90_days_standard");
  const [allowExternalTranscription, setAllowExternalTranscription] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Organisation governance and threshold policies updated successfully.");
  };

  const members = [
    { name: "David Kim", email: "d.kim@apex-securities.internal", role: "Administrator", grant: "Full Tenant Admin" },
    { name: "Elena Rostova", email: "e.rostova@apex-securities.internal", role: "Reviewer", grant: "Consequential Decisions" },
    { name: "Marcus Vance", email: "m.vance@apex-securities.internal", role: "Analyst", grant: "Evidence Submission & Triage" },
    { name: "Audit Compliance Group", email: "compliance@apex-securities.internal", role: "Read-only viewer", grant: "Read & Export Reports" },
  ];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Organisation settings
            </h1>
            <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5">
              TENANT-UK-01
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Configure organisation thresholds, membership roles, and evidence retention parameters.
          </p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Organisation Profile */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-red-800" />
              <h2 className="text-sm font-bold text-slate-900">Organisation Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Organisation Legal Name</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.organisation}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jurisdiction & Data Region</label>
                <input
                  type="text"
                  readOnly
                  value="United Kingdom (eu-west-2, London)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Operational Risk Scoring Thresholds */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-red-800" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Risk thresholds</h2>
                <p className="text-[11px] text-slate-500">
                  Set the boundaries for lower risk, review recommended, and high risk cases.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lower Assessed Risk Ceiling (Default: 29)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max="45"
                    value={lowerThreshold}
                    onChange={(e) => setLowerThreshold(e.target.value)}
                    className="w-24 p-2 rounded-xl border border-slate-300 font-mono text-center font-bold text-slate-900"
                  />
                  <span className="text-slate-500">Scores 0 to {lowerThreshold} mapped to Lower Risk</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  High Assessed Risk Floor (Default: 70)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="55"
                    max="85"
                    value={highThreshold}
                    onChange={(e) => setHighThreshold(e.target.value)}
                    className="w-24 p-2 rounded-xl border border-slate-300 font-mono text-center font-bold text-slate-900"
                  />
                  <span className="text-slate-500">Scores {highThreshold} to 100 trigger Priority Escalation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Retention & Privacy Policy */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Database className="w-4 h-4 text-red-800" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Evidence retention</h2>
                <p className="text-[11px] text-slate-500">
                  Control default retention period for raw media bytes in private quarantine storage.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Evidence Retention Policy</label>
                <select
                  value={defaultRetention}
                  onChange={(e) => setDefaultRetention(e.target.value)}
                  className="w-full sm:w-72 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800"
                >
                  <option value="30_days_ephemeral">30 Days Ephemeral (Auto-Purge)</option>
                  <option value="90_days_standard">90 Days Standard Audit</option>
                  <option value="365_days_regulatory">365 Days Legal Regulatory Hold</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowExternalTranscription}
                    onChange={(e) => setAllowExternalTranscription(e.target.checked)}
                    className="rounded border-slate-300 text-red-800 focus:ring-red-800"
                  />
                  <span>Allow external inference / cloud transcription services (Strictly disabled by default)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Membership & Roles (RBAC Matrix) */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Users className="w-4 h-4 text-red-800" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Members and roles</h2>
                <p className="text-[11px] text-slate-500">
                  Control who can submit evidence, review cases, and change organisation settings.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Email Address</th>
                    <th className="py-2.5 px-3">Assigned Role</th>
                    <th className="py-2.5 px-3">Scoped Capabilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((m) => (
                    <tr key={m.email} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">{m.name}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{m.email}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-red-800 bg-red-50 px-2 py-0.5 rounded">
                          {m.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{m.grant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-red-800 hover:bg-red-900 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Tenant Policies</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
