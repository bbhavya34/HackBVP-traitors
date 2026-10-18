import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, LayoutDashboard } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md space-y-5">
        {/* Red numeric marker */}
        <span className="text-7xl font-black text-red-800 tracking-tighter font-mono">
          404
        </span>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Page or Evidence Asset Not Found
        </h1>

        <p className="text-xs text-slate-500 leading-relaxed">
          The requested page, analysis record, or evidence asset does not exist or is protected under strict tenant isolation boundaries.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-red-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-red-900 transition-colors shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
