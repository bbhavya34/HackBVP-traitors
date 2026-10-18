"use client";

import React, { useState } from "react";
import { HumanReview } from "@/lib/types";
import { CheckCircle2, AlertOctagon, HelpCircle, ArrowUpRight, X, ShieldCheck } from "lucide-react";

interface ReviewDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisId: string;
  currentReview: HumanReview;
  onSaveDecision: (decisionData: {
    status: HumanReview["status"];
    decision?: HumanReview["decision"];
    rationale: string;
    verificationBasis: string;
  }) => void;
}

export function ReviewDecisionModal({
  isOpen,
  onClose,
  analysisId,
  currentReview,
  onSaveDecision,
}: ReviewDecisionModalProps) {
  const [decision, setDecision] = useState<HumanReview["decision"]>(
    currentReview.decision || "suspicious_confirmed"
  );
  const [rationale, setRationale] = useState(currentReview.rationale || "");
  const [verificationBasis, setVerificationBasis] = useState(
    currentReview.verificationBasis || ""
  );
  const [status, setStatus] = useState<HumanReview["status"]>("reviewed");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rationale.trim() || rationale.length < 10) {
      setError("Please provide a thorough rationale (at least 10 characters).");
      return;
    }
    if (!verificationBasis.trim()) {
      setError("Please declare the independent verification basis (e.g. out-of-band call, PKI check).");
      return;
    }
    onSaveDecision({
      status,
      decision,
      rationale,
      verificationBasis,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/10 text-red-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="review-modal-title" className="text-lg font-bold text-slate-900">
                Record Human Review Decision
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Analysis: {analysisId} • Revision v{currentReview.version}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Decision Verdict
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  decision === "lower_risk_verified"
                    ? "border-emerald-600 bg-emerald-50/60 text-emerald-950 font-bold"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="decision"
                  className="hidden"
                  checked={decision === "lower_risk_verified"}
                  onChange={() => setDecision("lower_risk_verified")}
                />
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Lower Risk (Genuine)</span>
              </label>

              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  decision === "suspicious_confirmed"
                    ? "border-amber-600 bg-amber-50/60 text-amber-950 font-bold"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="decision"
                  className="hidden"
                  checked={decision === "suspicious_confirmed"}
                  onChange={() => setDecision("suspicious_confirmed")}
                />
                <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Suspicious Confirmed</span>
              </label>

              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  decision === "fraud_confirmed"
                    ? "border-red-600 bg-red-50/60 text-red-950 font-bold"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="decision"
                  className="hidden"
                  checked={decision === "fraud_confirmed"}
                  onChange={() => setDecision("fraud_confirmed")}
                />
                <AlertOctagon className="w-4 h-4 text-red-700 shrink-0" />
                <span>Malicious / Fraud Confirmed</span>
              </label>

              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  decision === "escalated_for_investigation"
                    ? "border-purple-600 bg-purple-50/60 text-purple-950 font-bold"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="decision"
                  className="hidden"
                  checked={decision === "escalated_for_investigation"}
                  onChange={() => setDecision("escalated_for_investigation")}
                />
                <ArrowUpRight className="w-4 h-4 text-purple-700 shrink-0" />
                <span>Escalate to Senior Tier</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Independent Verification Basis <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              required
              value={verificationBasis}
              onChange={(e) => setVerificationBasis(e.target.value)}
              placeholder="e.g. Conducted verified telephone call to sender via PBX switchboard; checked DKIM root."
              className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Investigator Rationale & Audit Notes <span className="text-red-700">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Detail the technical evidence, observed anomalies, or confirmed operational context justifying this conclusion."
              className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none text-slate-900"
            />
          </div>

          {error && (
            <p className="text-xs text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-800 hover:bg-red-900 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Record Decision</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
