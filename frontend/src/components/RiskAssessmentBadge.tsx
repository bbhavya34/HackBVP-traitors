import React from "react";
import { AssessmentState } from "@/lib/types";
import { AlertTriangle, AlertOctagon, CheckCircle2, HelpCircle, ShieldAlert } from "lucide-react";

interface RiskBadgeProps {
  state: AssessmentState;
  score?: number | null;
  size?: "sm" | "md" | "lg";
}

export function RiskAssessmentBadge({ state, score, size = "md" }: RiskBadgeProps) {
  let label = "Analysis Unavailable";
  let colorClasses = "bg-slate-100 text-slate-700 border-slate-300";
  let Icon = HelpCircle;

  switch (state) {
    case "high_risk":
      label = "High Assessed Risk";
      colorClasses = "bg-red-50 text-red-800 border-red-300 ring-1 ring-red-400/30";
      Icon = AlertOctagon;
      break;
    case "review_recommended":
      label = "Review Recommended";
      colorClasses = "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30";
      Icon = AlertTriangle;
      break;
    case "lower_risk":
      label = "Lower Assessed Risk";
      colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/30";
      Icon = CheckCircle2;
      break;
    case "inconclusive":
      label = "Inconclusive";
      colorClasses = "bg-slate-100 text-slate-700 border-slate-300";
      Icon = HelpCircle;
      break;
    case "insufficient_evidence":
      label = "Insufficient Evidence";
      colorClasses = "bg-slate-100 text-slate-700 border-slate-300";
      Icon = HelpCircle;
      break;
    case "unavailable":
    default:
      label = "Analysis Unavailable";
      colorClasses = "bg-slate-100 text-slate-600 border-slate-200";
      Icon = ShieldAlert;
      break;
  }

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2.5 font-bold",
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-full border font-semibold tracking-tight shadow-sm select-none ${colorClasses} ${sizeClasses}`}
    >
      <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      <span>{label}</span>
      {score !== undefined && score !== null && (
        <span className="ml-1 pl-1.5 border-l border-current/30 font-mono text-xs opacity-90">
          {score}/100
        </span>
      )}
    </div>
  );
}
