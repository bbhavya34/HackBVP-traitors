"use client";

import React from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { RiskAssessmentBadge } from "@/components/RiskAssessmentBadge";
import { ProvenanceLabel } from "@/components/ProvenanceLabel";
import {
  Video,
  FileAudio,
  Image as ImageIcon,
  Mail,
  FileText,
  Globe,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Eye,
  Cpu,
  UserCheck,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const supportedModalities = [
    {
      name: "Video Verification",
      icon: Video,
      formats: "MP4, MOV, WebM",
      checks: "Spatio-temporal face consistency, lip-phoneme synchrony, frame boundaries",
      limitations: "Requires minimum 128x128 face crop; motion blur > 45px/s degrades accuracy.",
    },
    {
      name: "Audio & Synthetic Voice",
      icon: FileAudio,
      formats: "WAV, MP3, M4A",
      checks: "Neural vocoder harmonics, pitch contour flatline, synthetic speech artifacts",
      limitations: "Severe telephone band-limiting (<8kHz) restricts upper-harmonic inspection.",
    },
    {
      name: "Image Authenticity",
      icon: ImageIcon,
      formats: "JPG, PNG, WebP",
      checks: "Diffusion noise residuals, localized blending masks, metadata consistency",
      limitations: "Absence of metadata does not establish manipulation; zero fabricated heatmaps.",
    },
    {
      name: "Email & BEC Analysis",
      icon: Mail,
      formats: "EML, MSG, Raw Headers",
      checks: "Punycode/homoglyphs, SPF/DKIM validation, urgency & bank change triggers",
      limitations: "Pasted email body text cannot establish cryptographic header validation.",
    },
    {
      name: "Document Forensics",
      icon: FileText,
      formats: "PDF, TXT",
      checks: "PDF stream tampering, layered text overlays, font mismatch, PKI certs",
      limitations: "Scanned raster documents require OCR; OCR adds minor text uncertainty.",
    },
    {
      name: "Safe URL Detonation",
      icon: Globe,
      formats: "HTTP, HTTPS",
      checks: "Sandboxed DOM evaluation, redirect tracer, credential harvesting script checks",
      limitations: "Pages behind Captcha or multi-factor authentication cannot be crawled.",
    },
    {
      name: "Chat Exports",
      icon: MessageSquare,
      formats: "TXT, JSON Schema",
      checks: "Continuity anomalies, social engineering urgency, format validation",
      limitations: "Plaintext exports lack cryptographic origin proof; labeled inconclusive when unverified.",
    },
  ];

  const workflowSteps = [
    {
      num: "01",
      title: "Add the evidence",
      desc: "TRUTHLENS keeps the original file unchanged and records its SHA-256 hash so later findings can be traced back to the submitted bytes.",
      tag: "Original preserved",
    },
    {
      num: "02",
      title: "Run the available checks",
      desc: "Versioned detectors and fixed rules inspect the formats they support. Anything they cannot assess is marked unavailable instead of being estimated.",
      tag: "Limits shown",
    },
    {
      num: "03",
      title: "Read the findings",
      desc: "Manipulation risk, communication risk, confidence, and evidence coverage stay separate, with a source or explanation beside each result.",
      tag: "Sources attached",
    },
    {
      num: "04",
      title: "Record a decision",
      desc: "A reviewer checks the evidence, records the basis for the decision, and can request more information. The system does not block or approve payments.",
      tag: "Reviewer decides",
    },
  ];

  return (
    <div className="marketing-page min-h-screen bg-white text-slate-900 flex flex-col antialiased">
      {/* ================= FLOATING MARKETING NAVIGATION ================= */}
      <MarketingNav />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#fbfaf8] pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col items-start lg:col-span-7">
              {/* Eyebrow */}
              <div className="section-kicker mb-5 inline-flex items-center gap-2 border-l-2 border-red-800 pl-3">
                <ShieldCheck className="w-3.5 h-3.5 text-red-700" />
                <span>Multimodal authenticity and risk analysis</span>
              </div>

              {/* Main Heading */}
              <h1 className="display-heading max-w-3xl text-[2.9rem] text-slate-950 sm:text-6xl lg:text-[4.35rem]">
                Verify the signal.{" "}
                <span className="block text-red-900">Understand the risk.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Inspect suspicious media and communications in one case file. Trace each finding
                to its source, understand the limits, and make the final call with a human reviewer.
              </p>

              {/* Primary & Secondary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard/analyses/new"
                  className="inline-flex items-center gap-2.5 rounded-md bg-red-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-red-950 active:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                >
                  <span>Start Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/dashboard/analyses/TL-2026-8841"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-transparent px-5 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-500 hover:text-slate-950 transition-colors"
                >
                  <span className="rounded-sm bg-red-100 px-1.5 py-0.5 text-[11px] font-semibold text-red-900">
                    Demo
                  </span>
                  <span>Explore Sample Report</span>
                </Link>
              </div>

              {/* Supporting Note */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Evidence-linked findings
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Explicit limitations
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Human decisions
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="border-y border-slate-300 bg-white" aria-labelledby="sample-case-title">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="font-mono text-xs text-slate-500">DEMO / TL-2026-8841</p>
                    <h2 id="sample-case-title" className="mt-1 font-sans text-base font-semibold tracking-normal text-slate-950">
                      Sample evidence brief
                    </h2>
                  </div>
                  <span className="border-l-2 border-red-800 pl-3 text-sm font-semibold text-red-900">
                    Review required
                  </span>
                </div>

                <dl className="divide-y divide-slate-200 px-5">
                  <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                    <dt className="text-sm text-slate-500">Source</dt>
                    <dd className="break-all font-mono text-sm text-slate-800">quarterly-update.mp4</dd>
                  </div>
                  <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                    <dt className="text-sm text-slate-500">Finding</dt>
                    <dd className="text-sm leading-6 text-slate-800">
                      Boundary inconsistency between the jawline and collar from 00:04 to 00:18.
                    </dd>
                  </div>
                  <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                    <dt className="text-sm text-slate-500">Limit</dt>
                    <dd className="text-sm leading-6 text-slate-800">
                      Motion blur reduces the reliability of frame-level localisation.
                    </dd>
                  </div>
                  <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                    <dt className="text-sm text-slate-500">Next step</dt>
                    <dd className="text-sm font-medium leading-6 text-slate-950">
                      Compare the original recording and request a second reviewer.
                    </dd>
                  </div>
                </dl>

                <figcaption className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500">
                  Illustrative demo. No live evidence has been analysed.
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-300 pt-6">
            <p className="text-sm text-slate-500">Accepted evidence</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-label="Accepted evidence types">
              {supportedModalities.map((item) => (
                <li key={item.name} className="text-sm font-medium text-slate-800">
                  {item.name.replace(" Verification", "").replace(" Authenticity", "").replace(" Analysis", "")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= ONE WORKSPACE, MULTIPLE SIGNALS ================= */}
      <section id="capabilities" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="section-kicker">
              What you can inspect
            </span>
            <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
              Bring scattered evidence into one clear case file.
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Each check identifies its method, version, score meaning, and known limits. Unsupported checks stay visibly unavailable.
            </p>
          </div>

          <div className="border-y border-slate-300 bg-white">
            {supportedModalities.map((mod) => {
              const Icon = mod.icon;
              return (
                <article
                  key={mod.name}
                  className="grid gap-5 border-b border-slate-200 px-0 py-6 last:border-b-0 sm:grid-cols-[1fr_auto] lg:grid-cols-12 lg:gap-8"
                >
                  <div className="flex items-start gap-3 lg:col-span-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-red-200 text-red-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{mod.name}</h3>
                      <p className="mt-1 font-mono text-xs text-slate-500">{mod.formats}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="text-xs font-medium text-slate-500">Checks</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{mod.checks}</p>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4">
                    <p className="text-xs font-medium text-slate-500">Known limit</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{mod.limitations}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FROM SIGNAL TO EVIDENCE (WORKFLOW) ================= */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="section-kicker">
              How a case is built
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
              From submitted evidence to a reviewable decision
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              The assessment separates observed facts, model inferences, and rule warnings so a reviewer can challenge every conclusion.
            </p>
          </div>

          <ol className="border-y border-slate-300">
            {workflowSteps.map((step) => (
              <li
                key={step.num}
                className="grid gap-3 border-b border-slate-200 py-6 last:border-b-0 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_15rem_1fr_10rem] lg:items-start lg:gap-7"
              >
                <span className="font-mono text-base font-semibold text-red-900">{step.num}</span>
                <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                <p className="text-sm leading-6 text-slate-600 sm:col-start-2 lg:col-start-auto">{step.desc}</p>
                <span className="text-xs font-medium text-slate-500 sm:col-start-2 lg:col-start-auto">{step.tag}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= A FINDING YOU CAN INVESTIGATE (SAMPLE DEMO) ================= */}
      <section id="evidence-review" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="section-kicker">
                Evidence, not a verdict
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
                Findings you can actually investigate
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Every finding states whether it came from the source file, a model inference, or a deterministic rule—along with where to look next.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-100 text-red-800 flex items-center justify-center shrink-0">
                    <Eye className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-950">Exact locations and excerpts</h4>
                    <p className="text-xs leading-5 text-slate-500">
                      Timestamps, frequency ranges, and byte offsets take a reviewer straight to the relevant region.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-100 text-red-800 flex items-center justify-center shrink-0">
                    <Cpu className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-950">Calibration in context</h4>
                    <p className="text-xs leading-5 text-slate-500">
                      Confidence values appear with calibration status, model version, and documented error rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/dashboard/analyses/TL-2026-8841"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-950 transition-colors"
                >
                  <span>Open the sample case</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Sample Evidence Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
                {/* Sample Card Header */}
                <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-sm bg-red-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                      Demo sample
                    </span>
                    <span className="text-xs font-bold font-mono">TL-2026-8841</span>
                  </div>
                  <RiskAssessmentBadge state="high_risk" score={86} size="sm" />
                </div>

                {/* Sample Finding Detail */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      Facial Boundary Temporal Inconsistency
                    </h4>
                    <ProvenanceLabel category="model_inference" />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    High boundary frequency flicker detected between jawline and background collar at timestamps{" "}
                    <strong className="text-slate-900 font-mono">00:04 - 00:18</strong>. Blending mask jitter index 0.88 exceeds threshold (0.45).
                  </p>

                  <div className="space-y-1.5 border border-slate-200/80 bg-slate-50 p-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Detector Version:</span>
                      <span className="font-mono font-semibold text-slate-800">DeepFace-SpatioTemporal v2.4.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Model Confidence:</span>
                      <span className="font-semibold text-emerald-800">91% (Calibrated)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Disclosed Limit:</span>
                      <span className="text-slate-600">Requires minimum 128x128 face crop</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-slate-500">Recommended Next Step:</span>
                    <span className="font-semibold text-red-900">
                      Execute out-of-band PBX telephone call
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECURITY & PRIVACY ================= */}
      <section id="security-privacy" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="section-kicker">
              Evidence governance
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
              Private by default. Auditable by design.
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Clear controls for access, retention, and review—without vague certification or accuracy claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-t border-slate-300 py-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center text-red-900">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-950">Evidence stays case-bound</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evidence uploaded to TRUTHLENS is never used to train, tune, or evaluate foundation models. Raw inputs remain confidential to your tenant.
              </p>
            </div>

            <div className="border-t border-slate-300 py-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center text-red-900">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-950">Tenant-scoped access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-tenant database row policies prevent ID guessing. Short-lived signed URLs ensure evidence cannot be shared across unauthorized tenants.
              </p>
            </div>

            <div className="border-t border-slate-300 py-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center text-red-900">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-950">Reviewable audit history</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every file ingestion, view, report generation, and human review decision is committed to a tamper-resistant correlation log with cryptographic hashes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA & FOOTER ================= */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-slate-800/80 gap-6">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-white">Start with the evidence you have.</h2>
              <p className="mt-1 text-sm text-slate-400">
                Open a new case, or inspect the evaluation context behind the models.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/analyses/new"
                className="rounded-md bg-red-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-900"
              >
                Start an analysis
              </Link>
              <Link
                href="/dashboard/performance"
                className="rounded-md border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                Review model evaluation
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 TRUTHLENS. Verify the signal. Understand the risk.</p>
            <div className="flex items-center gap-6">
              <Link href="/dashboard/settings" className="hover:text-slate-300 transition-colors">
                Retention Policy
              </Link>
              <Link href="/dashboard/audit" className="hover:text-slate-300 transition-colors">
                Audit Trail
              </Link>
              <Link href="/dashboard/performance" className="hover:text-slate-300 transition-colors">
                Model evaluation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
