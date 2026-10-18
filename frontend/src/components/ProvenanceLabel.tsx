import React from "react";
import { ProvenanceCategory } from "@/lib/types";
import { Eye, Cpu, AlertTriangle, UserCheck } from "lucide-react";

interface ProvenanceLabelProps {
  category: ProvenanceCategory;
  showIcon?: boolean;
}

export function ProvenanceLabel({ category, showIcon = true }: ProvenanceLabelProps) {
  let label = "Observed";
  let classes = "bg-slate-100 text-slate-700 border-slate-300";
  let Icon = Eye;

  switch (category) {
    case "observed":
      label = "Observed Evidence";
      classes = "bg-slate-100 text-slate-800 border-slate-300";
      Icon = Eye;
      break;
    case "model_inference":
      label = "Model Inference";
      classes = "bg-purple-50 text-purple-800 border-purple-200 ring-1 ring-purple-300/30";
      Icon = Cpu;
      break;
    case "rule_warning":
      label = "Rule Warning";
      classes = "bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-300/30";
      Icon = AlertTriangle;
      break;
    case "user_unverified":
      label = "User Claim (Unverified)";
      classes = "bg-slate-50 text-slate-600 border-dashed border-slate-300";
      Icon = UserCheck;
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold border select-none ${classes}`}
      title={`Provenance type: ${label}`}
    >
      {showIcon && <Icon className="w-3 h-3 opacity-80" />}
      <span>{label}</span>
    </span>
  );
}
