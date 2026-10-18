"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Eye, Activity, FileText, CheckCircle2 } from "lucide-react";

export function VerificationLensScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animStage, setAnimStage] = useState<"intro" | "scanning" | "anchors" | "settled">("intro");

  useEffect(() => {
    // Detect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimStage("settled");
      return;
    }

    // Sequence timer: 300ms -> 900ms -> 1900ms -> 3400ms settled
    const t1 = setTimeout(() => setAnimStage("scanning"), 700);
    const t2 = setTimeout(() => setAnimStage("anchors"), 1800);
    const t3 = setTimeout(() => setAnimStage("settled"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReducedMotion]);

  // Subtle pointer tilt effect within ±4 degrees
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map to max ±3.5 degrees
    const tiltX = (-(y / (rect.height / 2)) * 3.5);
    const tiltY = (x / (rect.width / 2) * 3.5);
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-lg mx-auto select-none" ref={containerRef}>
      {/* Illustrative Workflow Label (Design.md requirement) */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-700 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Illustrative Workflow • Traceable Evidence
          </span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
          CSS 3D Depth Engine
        </span>
      </div>

      {/* 3D Depth Canvas Viewport */}
      <div
        className="relative h-[420px] w-full rounded-2xl bg-gradient-to-b from-slate-50 via-white to-slate-100 border border-slate-200/80 shadow-[0_12px_36px_rgba(15,23,42,0.08)] p-6 overflow-hidden perspective-1000 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#111827 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* 3D Transform Pivot Stage */}
        <div
          className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${8 + tilt.x}deg) rotateY(${-6 + tilt.y}deg)`,
          }}
        >
          {/* ================= LAYER 1: DOCUMENT / CONTEXT LAYER (Deepest z = -40px) ================= */}
          <div
            className="absolute w-[310px] h-[190px] rounded-xl bg-white/95 border border-slate-200/90 shadow-lg p-4 preserve-3d transition-all duration-700 pointer-events-none"
            style={{
              transform: `translate3d(-25px, 45px, -40px) rotateZ(-3deg)`,
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>DocuGuard & Header Parser</span>
              </div>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                SPF / DKIM Warning
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              <div className="h-2 w-3/4 bg-slate-200 rounded" />
              <div className="h-2 w-5/6 bg-slate-100 rounded" />
              <div className="p-1.5 rounded bg-red-50 border border-red-200/60 text-[10px] text-red-900 font-mono">
                From: cfo@apex-securìties.com [Punycode U+00EC]
              </div>
            </div>
          </div>

          {/* ================= LAYER 2: AUDIO WAVEFORM LAYER (Middle z = 0px) ================= */}
          <div
            className="absolute w-[320px] h-[190px] rounded-xl bg-white/95 border border-slate-200/90 shadow-xl p-4 preserve-3d transition-all duration-700 pointer-events-none"
            style={{
              transform: `translate3d(15px, -15px, 0px) rotateZ(2deg)`,
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Activity className="w-3.5 h-3.5 text-red-700" />
                <span>AudioSynthetix Fourier Waveform</span>
              </div>
              <span className="text-[9px] font-bold text-red-800 bg-red-50 px-1.5 py-0.5 rounded">
                Neural Vocoder Harmonic
              </span>
            </div>

            {/* SVG Synthetic Audio Waveform with Phase Anomaly */}
            <div className="mt-3 h-14 w-full flex items-center justify-center">
              <svg className="w-full h-12" viewBox="0 0 280 48" fill="none">
                <path
                  d="M0 24 Q20 5, 40 24 T80 24 T120 4 T160 44 T200 10 T240 38 T280 24"
                  className="stroke-red-800"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M120 4 L120 44 M160 4 L160 44"
                  className="stroke-red-400 stroke-dasharray-[2,2]"
                  strokeWidth="1"
                />
                <circle cx="140" cy="24" r="3" className="fill-red-600 animate-ping" />
                <circle cx="140" cy="24" r="3" className="fill-red-700" />
              </svg>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1">
              <span>00:12.4s</span>
              <span className="text-red-700 font-semibold">Phase Lead: +160ms</span>
              <span>00:29.8s</span>
            </div>
          </div>

          {/* ================= LAYER 3: VIDEO / VISUAL ANALYSIS (Foreground z = 40px) ================= */}
          <div
            className="absolute w-[300px] h-[190px] rounded-xl bg-white/95 border border-slate-300 shadow-2xl p-4 preserve-3d transition-all duration-700 pointer-events-none"
            style={{
              transform: `translate3d(-10px, -70px, 40px) rotateZ(-1deg)`,
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Eye className="w-3.5 h-3.5 text-red-800" />
                <span>DeepFace SpatioTemporal Mesh</span>
              </div>
              <span className="text-[9px] font-bold text-red-800 bg-red-100 px-1.5 py-0.5 rounded">
                Boundary Jitter 0.88
              </span>
            </div>

            {/* Facial Wireframe Simulation with Boundary Inconsistency Area */}
            <div className="mt-2.5 h-20 w-full relative flex items-center justify-center rounded-lg bg-slate-900 overflow-hidden">
              <div className="relative w-28 h-16 border border-dashed border-red-500/80 rounded-md flex items-center justify-center">
                <div className="w-12 h-10 rounded-full border border-red-400/40" />
                {/* Outlined Evidence Anchor */}
                <div className="absolute top-1 right-2 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                </div>
                <div className="absolute bottom-1 inset-x-2 text-center text-[8px] text-red-300 font-mono bg-black/60 py-0.5 rounded">
                  Blending Mask Discontinuity
                </div>
              </div>
            </div>
          </div>

          {/* ================= OPTICAL VERIFICATION LENS (Floating z = 85px) ================= */}
          <div
            className="absolute w-44 h-44 rounded-full pointer-events-none preserve-3d flex items-center justify-center transition-all duration-1000"
            style={{
              transform: `translate3d(0px, -30px, 85px)`,
              boxShadow: "0 20px 50px rgba(153, 27, 27, 0.25)",
            }}
          >
            {/* Outer Graphite Precision Bezel */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-800 bg-slate-950/15 backdrop-blur-[2px]">
              {/* Radial Degree Tick Marks */}
              <div className="absolute inset-1 rounded-full border border-slate-700/60" />
            </div>

            {/* Deep Red Concentric Focus Ring */}
            <div className="absolute inset-4 rounded-full border-2 border-red-700/80 shadow-[inset_0_0_15px_rgba(153,27,27,0.3)] animate-[pulseGlow_3s_ease-in-out_infinite]" />

            {/* Optics Reticle Crosshairs */}
            <div className="absolute w-full h-[1px] bg-red-500/40" />
            <div className="absolute h-full w-[1px] bg-red-500/40" />

            {/* Center Core Micro-Lens */}
            <div className="relative w-8 h-8 rounded-full border border-white/80 bg-red-900/30 backdrop-blur-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>

          {/* ================= SCANNING PLANE SWEEP ================= */}
          {animStage !== "intro" && (
            <div
              className="absolute inset-x-8 h-24 bg-gradient-to-b from-transparent via-red-600/20 to-transparent pointer-events-none blur-sm"
              style={{
                transform: `translate3d(0, 0, 50px)`,
                animation: "scanSweep 3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              }}
            />
          )}

          {/* ================= FLOATING EVIDENCE SUMMARY CARD ================= */}
          <div
            className={`absolute bottom-3 right-3 w-56 rounded-xl bg-white border border-slate-200/90 shadow-2xl p-3 preserve-3d transition-all duration-700 pointer-events-none ${
              animStage === "anchors" || animStage === "settled"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transform: `translate3d(20px, 60px, 95px)`,
            }}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-red-700" />
              <span>Traceable Provenance</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 leading-tight">
              3 cross-modal findings linked to cryptographic asset bytes.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="font-semibold text-red-800">Assessed Risk: 86</span>
              <span className="text-slate-400 font-mono">TL-2026-8841</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grounding Caption */}
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500">
          Multimodal layers decompose visuals, audio frequencies, and text structure without destructive modification.
        </p>
      </div>
    </div>
  );
}
