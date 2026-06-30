import React, { useState } from "react";
import {
  Users,
  Search,
  FileText,
  RefreshCw,
  ClipboardList,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  TrendingUp,
  Bell,
  Settings,
  UserCircle2,
  HelpCircle
} from "lucide-react";

import ClientsPage from "./Client";
import FilingPage from "./Filing"; // Imported for routing mapping connection

type ModuleView = "grid" | "clients" | "search" | "filing" | "renewal" | "recordals" | "invalidation";

interface AppCard {
  id: ModuleView;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  metric: string;
  metricLabel: string;
}

interface FinancialMetric {
  label: string;
  value: string;
  subText: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  accentColor: string;
}

export default function IPDashboardWrapper() {
  const [currentView, setCurrentView] = useState<ModuleView>("grid");
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  const financialMetrics: FinancialMetric[] = [
    {
      label: "Collected / Paid",
      value: "$42,850",
      subText: "112 Settled invoices",
      icon: CheckCircle2,
      accentColor: "#2e7d32"
    },
    {
      label: "Awaiting Invoice",
      value: "$18,400",
      subText: "Unbilled work in progress",
      icon: Clock,
      accentColor: "#b8860b"
    },
    {
      label: "Pending Payment",
      value: "$9,250",
      subText: "14 Invoices outstanding",
      icon: FileSpreadsheet,
      accentColor: "#d32f2f"
    }
  ];

  const appCards: AppCard[] = [
    {
      id: "clients",
      title: "Clients Portfolio",
      description: "Manage client corporate registries, contacts, profiles, and localized addresses.",
      icon: Users,
      metric: "142",
      metricLabel: "Active Corporations"
    },
    {
      id: "search",
      title: "Trademark Search",
      description: "Execute and clear preliminary trademark conflict scans and register clearances.",
      icon: Search,
      metric: "28",
      metricLabel: "Pending Scans"
    },
    {
      id: "filing",
      title: "Application Filing",
      description: "Draft, compile, and monitor new official intellectual property registration dossiers.",
      icon: FileText,
      metric: "489",
      metricLabel: "Deposited Files"
    },
    {
      id: "renewal",
      title: "Maintenance & Renewal",
      description: "Track annuity payments, processing milestones, and critical expansion windows.",
      icon: RefreshCw,
      metric: "14",
      metricLabel: "Action Required"
    },
    {
      id: "recordals",
      title: "Recordals & Changes",
      description: "Log assignment changes, security interests, name updates, and mergers.",
      icon: ClipboardList,
      metric: "32",
      metricLabel: "Processed Shifts"
    },
    {
      id: "invalidation",
      title: "Invalidation",
      description: "Manage administrative cancellation actions, disputes, and active oppositions.",
      icon: ShieldAlert,
      metric: "3",
      metricLabel: "Active Hearings"
    },
  ];

  return (
      <div className="min-h-screen flex flex-col" style={{ background: "#fdfaf4" }}>

        <header
            className="sticky top-0 z-40 px-10 py-3.5 flex items-center justify-between border-b shadow-sm shrink-0"
            style={{ background: "#0d1b2e", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span
                  className="text-[9px] font-bold uppercase tracking-widest text-[#b8860b] font-mono leading-none mb-1"
              >

              </span>
              <h1
                  className="text-lg font-semibold tracking-tight text-[#f5f0e8] leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Contextual Quick Documentation Tooltip */}
            <button className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/5 hidden sm:inline-block">
              <HelpCircle size={16} />
            </button>

            {/* Notifications Controller Trigger */}
            <button
                onClick={() => setUnreadNotifications(false)}
                className="p-2 text-white/70 hover:text-[#b8860b] transition-colors rounded-lg hover:bg-white/5 relative"
            >
              <Bell size={16} />
              {unreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0d1b2e]" />
              )}
            </button>

            <button className="p-2 text-white/70 hover:text-[#b8860b] transition-colors rounded-lg hover:bg-white/5">
              <Settings size={16} />
            </button>

            <span className="w-[1px] h-5 bg-white/10 mx-1 hidden sm:inline-block" />

            <button className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left">
              <UserCircle2 size={20} className="text-[#b8860b]" />
              <div className="hidden md:flex flex-col text-[10px] font-mono">
                <span className="text-white/80 font-bold leading-tight">A. Abraham</span>
                <span className="text-white/40 leading-none"></span>
              </div>
            </button>
          </div>
        </header>

        {currentView !== "grid" && (
            <div
                className="px-10 py-3 flex items-center border-b bg-white/60 backdrop-blur-sm transition-all"
                style={{ borderColor: "rgba(13,27,46,0.08)" }}
            >
              <button
                  onClick={() => setCurrentView("grid")}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6b5f4e] hover:text-[#b8860b] transition-colors font-mono"
              >
                <ArrowLeft size={14} strokeWidth={2.5} />
                Back to Workspace Hub
              </button>
            </div>
        )}

        {/* --- VIEW ROUTER ARCHITECTURE --- */}
        <div className="flex-1 flex flex-col">
          {currentView === "grid" ? (
              <div className="max-w-5xl w-full mx-auto px-10 pt-8 pb-12 flex flex-col justify-start">

                {/* Top Statistics Cards Grid Row Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {financialMetrics.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="p-4 rounded-xl border bg-white flex flex-col justify-between shadow-sm"
                            style={{ borderColor: "rgba(13,27,46,0.08)" }}
                        >
                          <div className="flex items-center justify-between mb-2">
                          <span
                              className="text-[10px] font-semibold uppercase tracking-wider font-mono text-[#6b5f4e]"
                          >
                            {item.label}
                          </span>
                            <Icon size={14} style={{ color: item.accentColor }} />
                          </div>
                          <div>
                            <p
                                className="text-xl sm:text-2xl font-bold text-[#0d1b2e]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {item.value}
                            </p>
                            <p className="text-xs text-black/40 mt-0.5">{item.subText}</p>
                          </div>
                        </div>
                    );
                  })}
                </div>

                {/* Revenue Analytics Metrics Layer */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div
                      className="p-4 rounded-xl border bg-white flex flex-col justify-between shadow-sm"
                      style={{ borderColor: "rgba(13,27,46,0.08)" }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={14} className="text-[#b8860b]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#6b5f4e]">
                          Revenue Allocation Stream
                        </h4>
                      </div>

                      <div className="space-y-3 my-1.5">
                        {/* Row 1: Paid */}
                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-black/70">Paid</span>
                            <span className="font-mono font-bold text-[#2e7d32]">60.8%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: "60.8%", background: "#2e7d32" }} />
                          </div>
                        </div>

                        {/* Row 2: Unbilled */}
                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-black/70">Unbilled Pipeline (WIP)</span>
                            <span className="font-mono font-bold text-[#b8860b]">26.1%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: "26.1%", background: "#b8860b" }} />
                          </div>
                        </div>

                        {/* Row 3: Outstanding */}
                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-black/70">Outstanding Receivables</span>
                            <span className="font-mono font-bold text-[#d32f2f]">13.1%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: "13.1%", background: "#d32f2f" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-black/30 mt-2.5">
                      * Values scale dynamically based on monthly closed corporate billing portfolios.
                    </p>
                  </div>
                </div>

                {/* Operational Execution Gateways Block */}
                <div>
                  <h2
                      className="text-[10px] font-bold uppercase tracking-widest text-[#6b5f4e] font-mono mb-3 border-b pb-1.5"
                      style={{ borderColor: "rgba(13,27,46,0.06)" }}
                  >
                    Workflow Portals
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appCards.map((card) => {
                      const Icon = card.icon;
                      return (
                          <div
                              key={card.id}
                              onClick={() => setCurrentView(card.id)}
                              className="group relative p-4 rounded-xl border bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                              style={{
                                borderColor: "rgba(13,27,46,0.10)"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#b8860b";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(13,27,46,0.10)";
                              }}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#b8860b]/10 text-[#b8860b]"
                                    style={{ background: "rgba(184, 134, 11, 0.05)" }}
                                >
                                  <Icon size={15} />
                                </div>
                                <span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-[#b8860b] transition-opacity font-bold tracking-wider">
                                  OPEN INTERFACE →
                                </span>
                              </div>

                              <h3
                                  className="text-base font-bold text-[#0d1b2e] mb-1"
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                              >
                                {card.title}
                              </h3>
                              <p className="text-xs text-black/50 leading-relaxed mb-4">
                                {card.description}
                              </p>
                            </div>

                            <div className="pt-2.5 border-t border-black/5 flex items-baseline justify-between">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b5f4e]">
                                {card.metricLabel}
                              </span>
                              <span
                                  className="text-base font-bold font-mono"
                                  style={{ color: "#b8860b" }}
                              >
                                {card.metric}
                              </span>
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>

                <footer className="mt-14 text-center text-[10px] font-mono text-black/30 tracking-wider uppercase">
                  Secure Registry Terminal · Session Live
                </footer>
              </div>
          ) : (
              <div className="flex-1 flex flex-col">
                {currentView === "clients" && <ClientsPage />}
                {currentView === "filing" && <FilingPage />}
              </div>
          )}
        </div>
      </div>
  );
}