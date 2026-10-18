"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";
import { useTruthLens, UserRole } from "@/lib/store";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  TrendingUp,
  FileCheck2,
  Inbox,
  Cpu,
  ShieldCheck,
  Settings,
  Search,
  ChevronDown,
  Building2,
  Menu,
  X,
  UserCheck,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { currentUser, setCurrentRole, analyses } = useTruthLens();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Review queue backlog count
  const pendingReviewsCount = analyses.filter(
    (a) => a.review.status === "unassigned" || a.review.status === "in_review"
  ).length;

  const navigationItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Analysis", href: "/dashboard/analyses/new", icon: PlusCircle, highlight: true },
    { name: "Analysis History", href: "/dashboard/analyses", icon: History },
    { name: "Review Queue", href: "/dashboard/reviews", icon: Inbox, badge: pendingReviewsCount },
    { name: "Risk Intelligence", href: "/dashboard/intelligence", icon: TrendingUp },
    { name: "Evidence Reports", href: "/dashboard/reports", icon: FileCheck2 },
    { name: "Model Performance", href: "/dashboard/performance", icon: Cpu },
    { name: "Security & Audit", href: "/dashboard/audit", icon: ShieldCheck },
    { name: "Settings & Policies", href: "/dashboard/settings", icon: Settings },
  ];

  const roles: UserRole[] = ["Administrator", "Analyst", "Reviewer", "Read-only viewer"];

  useEffect(() => {
    setMobileSidebarOpen(false);
    setRoleMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileSidebarOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="app-shell min-h-screen bg-slate-50 flex flex-col">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label={mobileSidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileSidebarOpen}
            aria-controls="mobile-workspace-navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <BrandMark size="sm" />

          {/* Organisation Indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentUser.organisation}</span>
            <span className="rounded bg-slate-100 text-slate-600 px-1.5 py-0.5 text-[10px] font-mono">
              TENANT-UK-01
            </span>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Bar */}
          <div className="relative hidden w-56 items-center lg:flex xl:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search analysis ID, hash, file..."
              className="w-full text-xs pl-9 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none text-slate-800 transition-all"
            />
          </div>

          <Link
            href="/dashboard/analyses/new"
            className="hidden items-center gap-1.5 rounded-md bg-red-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-900 md:inline-flex"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </Link>

          {/* Role Switcher (RBAC Showcase) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              aria-label="Switch Active Role"
            >
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-800 font-bold flex items-center justify-center text-[10px]">
                {currentUser.role[0]}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-900">{currentUser.name}</span>
                <span className="text-[10px] text-red-800 font-semibold">{currentUser.role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                    Simulate RBAC Role
                  </p>
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                      currentUser.role === r
                        ? "text-red-800 font-bold bg-red-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    <span>{r}</span>
                    {currentUser.role === r && <UserCheck className="w-3.5 h-3.5 text-red-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN BODY CONTAINER ================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden w-64 shrink-0 select-none flex-col border-r border-slate-200 bg-white md:flex">
          <div className="p-4 flex flex-col gap-1">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-red-50 text-red-800 font-bold border-l-4 border-red-800 pl-2.5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-red-800" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="rounded-full bg-red-800 px-1.5 py-0.5 text-[10px] font-bold text-white font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Lower Sidebar Trust Notice */}
          <div className="mt-auto p-4 border-t border-slate-100">
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-red-700" />
                <span>Access scope</span>
              </div>
              <p className="mt-1 text-[10px] text-slate-500 leading-normal">
                Evidence access is limited to your organisation. Uploaded files are not used for model training.
              </p>
            </div>
          </div>
        </aside>

        {/* ================= MOBILE DRAWER ================= */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              className="fixed inset-0 bg-slate-950/40"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <aside
              id="mobile-workspace-navigation"
              aria-label="Workspace navigation"
              className="relative flex h-full w-[min(20rem,88vw)] flex-col bg-white p-4 shadow-2xl animate-in slide-in-from-left duration-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <BrandMark size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
                {navigationItems.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname?.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                        isActive
                          ? "bg-red-50 text-red-800 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="rounded-full bg-red-800 px-1.5 py-0.5 text-[10px] text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* ================= DYNAMIC WORKSPACE CONTENT ================= */}
        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
