"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle, X, ShieldAlert, Loader2 } from "lucide-react";
import { AnalysisJob } from "@/lib/types";

interface DeletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisJob;
  onConfirmDelete: (analysisId: string, rationale: string) => Promise<boolean>;
}

export function DeletionDialog({
  isOpen,
  onClose,
  analysis,
  onConfirmDelete,
}: DeletionDialogProps) {
  const [rationale, setRationale] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rationale.trim()) {
      setError("Please specify a policy rationale for evidence deletion.");
      return;
    }
    setError(null);
    setIsDeleting(true);
    try {
      await onConfirmDelete(analysis.id, rationale);
      setIsDeleting(false);
      onClose();
    } catch {
      setIsDeleting(false);
      setError("Failed to execute deletion request. Storage provider locked.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deletion-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-800">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="deletion-dialog-title" className="text-lg font-bold text-slate-900">
                Delete this evidence?
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Asset Ref: {analysis.id}
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1">
              File: <span className="font-mono text-red-900">{analysis.asset.name}</span>
            </p>
            <p>
              In accordance with tenant retention policy (
              <span className="font-semibold">{analysis.asset.retentionPolicy}</span>
              ), deleting this asset will permanently remove the original raw bytes, derived feature tensors, extracted audio tracks, and cached frames from private object storage.
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-amber-800 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Immutable cryptographic audit logs and generated PDF report hashes are preserved for compliance.</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="deletion-rationale"
              className="block text-xs font-semibold text-slate-800 mb-1"
            >
              Auditable Deletion Rationale <span className="text-red-700">*</span>
            </label>
            <textarea
              id="deletion-rationale"
              required
              rows={2}
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="e.g. GDPR Right-to-be-forgotten request #8410; retention expiry verified."
              className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none text-slate-800"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 text-red-800 text-xs border border-red-200">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors"
            >
              Keep Evidence
            </button>
            <button
              type="submit"
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-800 hover:bg-red-900 active:bg-red-950 transition-colors shadow-sm disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deleting Evidence...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Deletion</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
