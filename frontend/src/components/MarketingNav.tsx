"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Evidence and review", href: "#evidence-review" },
    { label: "Security and privacy", href: "#security-privacy" },
  ];

  useEffect(() => {
    if (!mobileOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <nav
          className="flex h-[72px] items-center justify-between"
          aria-label="Main Navigation"
        >
          {/* Brand Mark */}
          <BrandMark size="sm" />

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-2 text-[13px] font-medium text-slate-600 transition-colors duration-150 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors"
            >
              Open workspace
            </Link>
            <Link
              href="/dashboard/analyses/new"
              className="inline-flex items-center gap-2 rounded-md bg-red-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-950 active:bg-black transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
            >
              <span>Start analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-md bg-red-900 px-3 py-2 text-xs font-semibold text-white"
            >
              Open
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-full"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Disclosure Panel */}
        {mobileOpen && (
          <div
            id="mobile-nav-panel"
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-x border-b border-slate-200 bg-white p-4 shadow-xl sm:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Open workspace
                </Link>
                <Link
                  href="/dashboard/analyses/new"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-md bg-red-900 py-2.5 text-sm font-semibold text-white hover:bg-red-950"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Start analysis</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
