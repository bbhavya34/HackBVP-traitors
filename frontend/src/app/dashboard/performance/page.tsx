"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { evaluationModels } from "@/lib/mockData";
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
  BarChart2,
  Activity,
  Info,
} from "lucide-react";

export default function ModelPerformancePage() {
  const [selectedModel, setSelectedModel] = useState(evaluationModels[0]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Model evaluation
            </h1>
            <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5">
              Verified Splits
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Precision, Recall, False Alarms, and Missed Threat benchmarks evaluated against curated, non-leaking test splits.
          </p>
        </div>

        {/* Model Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {evaluationModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedModel.id === m.id
                  ? "bg-red-800 text-white border-red-800 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{m.name}</span>
              <span className="ml-1.5 opacity-75 font-mono text-[10px]">{m.version}</span>
            </button>
          ))}
        </div>

        {/* Selected Model Deep Dive */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{selectedModel.name}</h2>
                <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 uppercase">
                  {selectedModel.status}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  Modality: {selectedModel.modality}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Architecture: <span className="font-mono text-slate-800">{selectedModel.architecture}</span>
              </p>
            </div>

            <div className="text-right text-xs text-slate-500">
              <p>Evaluated on: <strong className="text-slate-800">{selectedModel.lastEvaluated}</strong></p>
              <p>Sample Size: <strong className="font-mono text-slate-800">{selectedModel.sampleSize.toLocaleString()} items</strong></p>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400">Precision</span>
              <p className="mt-1 text-2xl font-black font-mono text-slate-900">
                {(selectedModel.precision * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-500">True Positive / Positives</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400">Recall</span>
              <p className="mt-1 text-2xl font-black font-mono text-slate-900">
                {(selectedModel.recall * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-500">True Positive / Actuals</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400">F1 Score</span>
              <p className="mt-1 text-2xl font-black font-mono text-emerald-800">
                {selectedModel.f1.toFixed(3)}
              </p>
              <span className="text-[10px] text-slate-500">Harmonic Mean</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400">False Positive Rate</span>
              <p className="mt-1 text-2xl font-black font-mono text-amber-800">
                {(selectedModel.falsePositiveRate * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-500">False Alarms</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400">False Negative Rate</span>
              <p className="mt-1 text-2xl font-black font-mono text-red-800">
                {(selectedModel.falseNegativeRate * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-500">Missed Threats</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-400">Avg Latency</span>
              <p className="mt-1 text-2xl font-black font-mono text-slate-900">
                {selectedModel.latencyMs}ms
              </p>
              <span className="text-[10px] text-slate-500">Inference Worker Time</span>
            </div>
          </div>

          {/* Benchmark Cohort & Disclosed Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Database className="w-4 h-4 text-slate-500" />
                <span>Benchmark Cohort Manifest</span>
              </div>
              <p className="text-xs text-slate-700 font-mono">
                {selectedModel.cohort}
              </p>
              <p className="text-[11px] text-slate-500">
                Strict separation between train, validation, and unseen test splits verified by content hash deduplication.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Disclosed Operational Limitations</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedModel.limitations}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
