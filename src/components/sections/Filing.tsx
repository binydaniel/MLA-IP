import React, { useState } from "react";
import {
    User, FileText, Gavel, CreditCard, ShieldAlert,
    ChevronRight, CheckCircle2, Clock, Plus, X, AlertTriangle, Calendar,
    HelpCircle, Bell, Settings, UserCircle2
} from "lucide-react";
import { accent, gold, titlesMap } from "./FilingConstants";
import type { ProgressTrackerProps } from "./FilingTypes";
import { Step1, Step2, Step3, Step4, Step5 } from "./FilingSteps";

const STEPS = [
    { id: 1, short: "Step 1", label: "Client Instructions", icon: <User size={14} /> },
    { id: 2, short: "Step 2", label: "Filing", icon: <FileText size={14} /> },
    { id: 3, short: "Step 3", label: "Examination", icon: <Gavel size={14} /> },
    { id: 4, short: "Step 4", label: "Opposition", icon: <ShieldAlert size={14} /> },
    { id: 5, short: "Step 5", label: "Payment & Issuance", icon: <CreditCard size={14} /> },
];

const COLUMNS = [
    { id: "IN_PROGRESS", title: "In Progress", color: "#1a4a7a", bg: "#e8f0f8" },
    { id: "FORMALITY_PASSED", title: "Formality Passed", color: "#0d5c3a", bg: "#e6f3ed" },
    { id: "SUBSTANTIVE_FAILED", title: "Substantive Failed", color: "#c0392b", bg: "#fff0f0" },
    { id: "OPPOSITION_PHASE", title: "Opposition Phase", color: "#b8860b", bg: "#fff9ee" },
    { id: "PROCESSED", title: "Processed & Done", color: "#2e7d32", bg: "#e8f5e9" }
];

const MOCK_FILINGS = [
    { id: "FL-2026-001", client: "Habesha Breweries S.C.", trademark: "HABESHA GOLD", class: "Class 32", kanbanStatus: "FORMALITY_PASSED", currentStep: 3, date: "12 Feb 2026", deadline: "15 Aug 2026", deadlineType: "normal" },
    { id: "FL-2026-002", client: "Awash Wine Share Co.", trademark: "AWASH DUKAM", class: "Class 33", kanbanStatus: "PROCESSED", currentStep: 5, date: "04 Jan 2026", deadline: null, deadlineType: "none" },
    { id: "FL-2026-003", client: "Anbessa Shoe Factory", trademark: "ANBESSA RUN", class: "Class 25", kanbanStatus: "IN_PROGRESS", currentStep: 1, date: "28 Jun 2026", deadline: "28 Jul 2026", deadlineType: "normal" },
    { id: "FL-2026-004", client: "Dashen Bank S.C.", trademark: "DASHEN MOBILE PAY", class: "Class 36", kanbanStatus: "SUBSTANTIVE_FAILED", currentStep: 3, date: "19 Mar 2026", deadline: "05 Jul 2026", deadlineType: "urgent" }, // Due recently
    { id: "FL-2026-005", client: "Lucy Food Processing Plc", trademark: "LUCY PASTA", class: "Class 30", kanbanStatus: "OPPOSITION_PHASE", currentStep: 4, date: "02 May 2026", deadline: "12 Jul 2026", deadlineType: "urgent" }, // Due recently
    { id: "FL-2026-006", client: "BGI Ethiopia", trademark: "ST. GEORGE AMBER", class: "Class 32", kanbanStatus: "SUBSTANTIVE_FAILED", currentStep: 3, date: "10 Jan 2026", deadline: "10 Apr 2026", deadlineType: "passed" }, // No action taken, due passed
    { id: "FL-2025-412", client: "Ethio Telecom", trademark: "TELEDRIVE", class: "Class 42", kanbanStatus: "OPPOSITION_PHASE", currentStep: 4, date: "14 Nov 2025", deadline: "14 Jan 2026", deadlineType: "passed" }  // No action taken, due passed
];

function ProgressTracker({ active, maxReached, onSelect }: ProgressTrackerProps) {
    return (
        <div
            className="border-b px-6 py-0 flex items-stretch gap-0 overflow-x-auto"
            style={{ background: "#0d1b2e", borderColor: "rgba(255,255,255,0.07)" }}
        >
            {STEPS.map((s, i) => {
                const isActive = active === s.id;
                const isReachable = s.id <= maxReached;
                const isDone = s.id < maxReached;
                return (
                    <button
                        key={s.id}
                        onClick={() => isReachable && onSelect(s.id)}
                        className="flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-all border-b-2 relative"
                        style={{
                            borderColor: isActive ? gold : "transparent",
                            color: isActive ? gold : isReachable ? "rgba(245,240,232,0.65)" : "rgba(245,240,232,0.25)",
                            cursor: isReachable ? "pointer" : "not-allowed",
                            background: isActive ? "rgba(184,134,11,0.08)" : "transparent",
                        }}
                    >
                        {isDone ? <CheckCircle2 size={12} style={{ color: "#4caf85" }} /> : <span style={{ opacity: isActive ? 1 : 0.7 }}>{s.icon}</span>}
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.05em" }}>{s.short}</span>
                        {i < STEPS.length - 1 && <ChevronRight size={11} className="ml-1" style={{ color: "rgba(245,240,232,0.2)" }} />}
                    </button>
                );
            })}
        </div>
    );
}

export default function Filing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [maxReached, setMaxReached] = useState(1);
    const [selectedFiling, setSelectedFiling] = useState<typeof MOCK_FILINGS[0] | null>(null);
    const [unreadNotifications, setUnreadNotifications] = useState(true);



    const openNewFilingModal = () => {
        setSelectedFiling(null);
        setActiveStep(1);
        setMaxReached(1);
        setIsModalOpen(true);
    };

    const openExistingFilingModal = (filing: typeof MOCK_FILINGS[0]) => {
        setSelectedFiling(filing);
        setActiveStep(filing.currentStep);
        setMaxReached(filing.currentStep);
        setIsModalOpen(true);
    };

    const goTo = (n: number) => {
        setActiveStep(n);
        if (n > maxReached) setMaxReached(n);
    };

    const next = () => goTo(activeStep + 1);

    const stepContent: Record<number, React.ReactNode> = {
        1: <Step1 onNext={next} />,
        2: (
            <div className="space-y-4">
                <Step2 onNext={next} />
            </div>
        ),
        3: <Step3 onNext={next} />,
        4: <Step4 onNext={next} />,
        5: <Step5 />,
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "#fdfaf4" }}>

            {/* ================= STICKY INTEGRATED HEADER ================= */}
            <header
                className="sticky top-0 z-40 px-10 py-3.5 flex items-center justify-between border-b shadow-sm shrink-0"
                style={{ background: "#0d1b2e", borderColor: "rgba(255,255,255,0.08)" }}
            >
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#b8860b] font-mono leading-none mb-1">

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

            {/* MAIN WORKSPACE CONTENT CONTAINER */}
            <div className="px-8 py-6 flex-1 flex flex-col">
                {/* HEADLINE MONITORING BOARD */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "rgba(13,27,46,0.10)" }}>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Filing Monitoring Board
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                        </p>
                    </div>
                    <button
                        onClick={openNewFilingModal}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all"
                        style={{ background: accent, color: "#fff" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        <Plus size={14} /> Add Filing
                    </button>
                </div>

                {/* JIRA KANBAN BOARD VIEW */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
                    {COLUMNS.map((col) => {
                        const filteredFilings = MOCK_FILINGS.filter(f => f.kanbanStatus === col.id);
                        return (
                            <div
                                key={col.id}
                                className="rounded-xl p-3 flex flex-col max-h-[72vh] min-w-[235px]"
                                style={{ background: "rgba(13,27,46,0.03)", border: "1px solid rgba(13,27,46,0.05)" }}
                            >
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                                        <h3 className="text-xs font-bold tracking-wide uppercase text-slate-700" style={{ fontFamily: "'DM Mono', monospace" }}>
                                            {col.title}
                                        </h3>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200/60 text-slate-600">
                                        {filteredFilings.length}
                                    </span>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                                    {filteredFilings.map((filing) => (
                                        <div
                                            key={filing.id}
                                            onClick={() => openExistingFilingModal(filing)}
                                            className="bg-white rounded-lg p-3.5 border shadow-sm border-slate-200/80 hover:border-slate-400 transition-all cursor-pointer group relative overflow-hidden"
                                            style={{
                                                borderLeft: filing.deadlineType === "passed" ? "3px solid #c0392b" : filing.deadlineType === "urgent" ? "3px solid #e63946" : undefined
                                            }}
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                                                    {filing.id}
                                                </span>
                                                {filing.deadlineType === "urgent" && (
                                                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded animate-pulse">
                                                        <AlertTriangle size={10} /> Urgent
                                                    </span>
                                                )}
                                                {filing.deadlineType === "passed" && (
                                                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                        Lapsed / Abandoned
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                {filing.trademark}
                                            </h4>
                                            <p className="text-[11px] font-mono text-amber-700 font-medium">{filing.class}</p>

                                            <div className="mt-2 text-[11px] text-slate-500 line-clamp-1">
                                                <span className="font-medium text-slate-400">Client:</span> {filing.client}
                                            </div>

                                            {/* DYNAMIC DUE DATE METADATA LAYOUT */}
                                            {filing.deadline && (
                                                <div className="mt-2.5 flex items-center gap-1 text-[11px]">
                                                    <Calendar size={11} className={filing.deadlineType === "urgent" ? "text-red-600" : filing.deadlineType === "passed" ? "text-slate-400" : "text-slate-400"} />
                                                    {filing.deadlineType === "urgent" ? (
                                                        <span className="text-red-600 font-bold">
                                                            Due Soon: {filing.deadline}
                                                        </span>
                                                    ) : filing.deadlineType === "passed" ? (
                                                        <span className="text-slate-500 line-through decoration-red-500/70 font-medium">
                                                            Expired: {filing.deadline}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500">
                                                            Due: {filing.deadline}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                                                <div className="flex items-center gap-1 text-slate-400">
                                                    <Clock size={10} /> {filing.date}
                                                </div>
                                                <span
                                                    className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase"
                                                    style={{ color: col.color, background: col.bg }}
                                                >
                                                    Step {filing.currentStep}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {filteredFilings.length === 0 && (
                                        <div className="text-center py-8 rounded-lg border border-dashed border-slate-200 text-slate-400 text-xs">
                                            No items listed
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CENTERED FLY-OVER STEP WORKFLOW MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-6 animate-fade-in">
                    <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

                    <div
                        className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl relative z-10 overflow-hidden transform transition-all duration-300 scale-100"
                        style={{ background: "#fdfaf4" }}
                    >
                        {/* WINDOW ACTIONS HEADER */}
                        <div className="px-6 py-4 flex items-center justify-between border-b bg-slate-900 text-white border-slate-800 shrink-0">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                                    {selectedFiling ? `Registry: ${selectedFiling.id}` : "Workflow Pipeline Initiation"}
                                </span>
                                {selectedFiling && (
                                    <h2 className="text-xs font-normal text-slate-400">
                                        / {selectedFiling.trademark}
                                    </h2>
                                )}
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* LINEAR PROGRESS STEP CONTROLLER */}
                        <div className="shrink-0">
                            <ProgressTracker active={activeStep} maxReached={maxReached} onSelect={goTo} />
                        </div>

                        {/* WORKSPACE SUBTITLE BANNER */}
                        <div className="sticky top-0 z-10 border-b px-6 py-3.5 flex items-center justify-between bg-slate-50 border-slate-200 shrink-0">
                            <h2 className="text-base font-semibold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {titlesMap[activeStep]}
                            </h2>
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 font-mono">
                                <Clock size={10} /> Step {activeStep} of 5
                            </div>
                        </div>

                        {/* VIEW PANEL DOCK FRAME */}
                        <div className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
                            {/* Alert flag inside modal if working on an item that has lapsed */}
                            {selectedFiling?.deadlineType === "passed" && (
                                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-xs text-red-900">
                                    <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold">Statutory Limitation Period Exceeded</p>
                                        <p className="mt-0.5 text-red-700">No submission files were processed before the regulatory cutoff date ({selectedFiling.deadline}). Re-filiation or extension pleadings may be required.</p>
                                    </div>
                                </div>
                            )}
                            {stepContent[activeStep]}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}