import React, { useState, useEffect } from "react";
import {
    Search, Plus, CalendarDays, AlertCircle, X, Edit3,
    HelpCircle, Bell, Settings, UserCircle2
} from "lucide-react";
import type { SearchRecord, SearchStatus } from "../types.ts";
import {
    accentColors,
    bgAccentColors,
    assignedUsers,
    statusStyles,
    initialRecords,
} from "../data.tsx";

const accent = accentColors["search"];
const bgAccent = bgAccentColors["search"];

const emptyForm: SearchRecord = {
    orderNumber: "",
    clientName: "",
    dateReceived: "",
    status: "Pending" as SearchStatus,
    assignedUser: "",
    searchOutput: "",
};

// Extracted Constants for styling
const FIELD_STYLES = {
    background: "#fdfaf4",
    borderColor: "rgba(13,27,46,0.15)",
    color: "#0d1b2e",
};

const GRID_LAYOUT_CLASS = "grid items-center px-5 py-3.5 border-b transition-colors";
const GRID_COLUMNS_STYLE = { gridTemplateColumns: "1.2fr 2fr 1.2fr 1fr 1.3fr 1.5fr" };

interface SearchModalProps {
    onClose: () => void;
    onSave: (r: SearchRecord) => void;
    editRecord: SearchRecord | null;
}

function SearchModal({ onClose, onSave, editRecord }: SearchModalProps) {
    const [form, setForm] = useState<SearchRecord>({ ...emptyForm });
    const [error, setError] = useState("");

    useEffect(() => {
        setForm(editRecord ? { ...editRecord } : { ...emptyForm });
        setError("");
    }, [editRecord]);

    const isEditMode = !!editRecord;

    const handleSave = () => {
        const { orderNumber, clientName, dateReceived, assignedUser } = form;
        if (!orderNumber || !clientName || !dateReceived || !assignedUser) {
            setError("Please fill in all fields.");
            return;
        }
        onSave(form);
        onClose();
    };

    // Focus utility handlers to avoid repetitive inline declarations
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.currentTarget.style.borderColor = accent;
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.currentTarget.style.borderColor = "rgba(13,27,46,0.15)";
    };

    const Label = ({ children }: { children: React.ReactNode }) => (
        <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}
        >
            {children}
        </label>
    );

    const fieldCls = `w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all border ${
        isEditMode ? "disabled:opacity-60 disabled:cursor-not-allowed" : ""
    }`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(13,27,46,0.55)", backdropFilter: "blur(2px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,46,0.12)" }}
            >
                {/* Modal Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b"
                    style={{ borderColor: "rgba(13,27,46,0.10)", background: "#0d1b2e" }}
                >
                    <div>
                        <p
                            className="text-xs uppercase tracking-widest font-semibold mb-0.5"
                            style={{ color: "#b8860b", fontFamily: "'DM Mono', monospace" }}
                        >
                            {isEditMode ? "Modify Record" : "New Record"}
                        </p>
                        <h3
                            className="text-lg font-semibold"
                            style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
                        >
                            {isEditMode ? `Edit: ${editRecord?.orderNumber}` : "Trademark Search"}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-white/50 hover:text-[#f5f0e8] transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body / Form Fields */}
                <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div>
                        <Label>Order Number</Label>
                        <input
                            type="text"
                            placeholder="e.g. TS-2024-0091"
                            value={form.orderNumber}
                            disabled={isEditMode}
                            onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                            className={fieldCls}
                            style={FIELD_STYLES}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div>
                        <Label>Client Name</Label>
                        <input
                            type="text"
                            placeholder="e.g. Habesha Breweries S.C."
                            value={form.clientName}
                            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                            className={fieldCls}
                            style={FIELD_STYLES}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div>
                        <Label>Date Received</Label>
                        <input
                            type="date"
                            value={form.dateReceived}
                            onChange={(e) => setForm({ ...form, dateReceived: e.target.value })}
                            className={fieldCls}
                            style={FIELD_STYLES}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div>
                        <Label>Status</Label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value as SearchStatus })}
                            className={fieldCls}
                            style={FIELD_STYLES}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            {(["In Progress", "Result Archived"] as SearchStatus[]).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label>Assigned User</Label>
                        <select
                            value={form.assignedUser}
                            onChange={(e) => setForm({ ...form, assignedUser: e.target.value })}
                            className={fieldCls}
                            style={FIELD_STYLES}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            <option value="">Select a user…</option>
                            {assignedUsers.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label>Search Result</Label>
                        <input
                            type="text"
                            placeholder="e.g. Search findings details..."
                            value={form.searchOutput}
                            onChange={(e) => setForm({ ...form, searchOutput: e.target.value })}
                            className={fieldCls}
                            style={FIELD_STYLES}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    {error && (
                        <div
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium"
                            style={{
                                background: "rgba(192,57,43,0.10)",
                                border: "1px solid rgba(192,57,43,0.25)",
                                color: "#8b1a1a",
                            }}
                        >
                            <AlertCircle size={12} />
                            {error}
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div
                    className="flex items-center justify-end gap-3 px-6 py-4 border-t"
                    style={{ borderColor: "rgba(13,27,46,0.10)", background: "#ede7d9" }}
                >
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-[#6b5f4e] hover:bg-black/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: accent }}
                    >
                        {isEditMode ? <Edit3 size={14} /> : <Plus size={14} />}
                        {isEditMode ? "Update Changes" : "Save Record"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TrademarkSearch() {
    const [records, setRecords] = useState<SearchRecord[]>(initialRecords);
    const [activeModalRecord, setActiveModalRecord] = useState<SearchRecord | null>(null);
    const [unreadNotifications, setUnreadNotifications] = useState(true);

    const handleSave = (updatedRec: SearchRecord) => {
        setRecords((prev) => {
            const exists = prev.some((r) => r.orderNumber === updatedRec.orderNumber);
            if (exists) {
                return prev.map((r) => (r.orderNumber === updatedRec.orderNumber ? updatedRec : r));
            }
            return [updatedRec, ...prev];
        });
        setActiveModalRecord(null);
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "#fdfaf4" }}>

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

            {/* MAIN WORKSPACE SECTION */}
            <div className="flex-1 overflow-y-auto flex flex-col">
                {activeModalRecord !== null && (
                    <SearchModal
                        editRecord={activeModalRecord.orderNumber ? activeModalRecord : null}
                        onClose={() => setActiveModalRecord(null)}
                        onSave={handleSave}
                    />
                )}

                {/* Main Header Row */}
                <div
                    className="px-10 py-5 flex items-center justify-between border-b"
                    style={{ background: "#f5f0e8", borderColor: "rgba(13,27,46,0.10)" }}
                >
                    <div>
                        <h2
                            className="text-2xl font-semibold text-slate-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Trademark Search
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Cross-reference existing legal records, clear brand parameters, and archive comprehensive diagnostic logs.
                        </p>
                    </div>
                    <button
                        onClick={() => setActiveModalRecord({} as SearchRecord)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: accent }}
                    >
                        <Plus size={15} />
                        Trademark Search
                    </button>
                </div>

                {/* Main Table Content */}
                <div className="px-10 py-6 flex-1">
                    <div
                        className="rounded-xl border overflow-hidden shadow-sm"
                        style={{ borderColor: "rgba(13,27,46,0.10)", background: "#fdfaf4" }}
                    >
                        {/* Table Grid Header */}
                        <div
                            className={GRID_LAYOUT_CLASS}
                            style={{
                                ...GRID_COLUMNS_STYLE,
                                color: "#6b5f4e",
                                fontFamily: "'DM Mono', monospace",
                                borderColor: "rgba(13,27,46,0.08)",
                                background: "#f5f0e8",
                            }}
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest">Order No.</span>
                            <span className="text-xs font-semibold uppercase tracking-widest">Client Name</span>
                            <span className="text-xs font-semibold uppercase tracking-widest">Date Received</span>
                            <span className="text-xs font-semibold uppercase tracking-widest">Status</span>
                            <span className="text-xs font-semibold uppercase tracking-widest">Assigned User</span>
                            <span className="text-xs font-semibold uppercase tracking-widest">Search Result</span>
                        </div>

                        {/* Table Grid Rows */}
                        {records.map((rec, i) => {
                            const statusConfig = statusStyles[rec.status];
                            const isEven = i % 2 === 0;
                            const defaultBg = isEven ? "#fdfaf4" : "#faf6ee";

                            return (
                                <div
                                    key={`${rec.orderNumber}-${i}`}
                                    className={GRID_LAYOUT_CLASS}
                                    style={{
                                        ...GRID_COLUMNS_STYLE,
                                        borderColor: "rgba(13,27,46,0.06)",
                                        background: defaultBg,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setActiveModalRecord(rec)}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = bgAccent)}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = defaultBg)}
                                >
                                    <span
                                        className="text-xs font-medium"
                                        style={{ fontFamily: "'DM Mono', monospace", color: accent }}
                                    >
                                        {rec.orderNumber}
                                    </span>

                                    <span className="text-sm font-medium" style={{ color: "#0d1b2e" }}>
                                        {rec.clientName}
                                    </span>

                                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "#6b5f4e" }}>
                                        <CalendarDays size={12} />
                                        {new Date(rec.dateReceived).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>

                                    <span>
                                        <span
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                                            style={{ background: statusConfig.bg, color: statusConfig.text }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                style={{ background: statusConfig.dot }}
                                            />
                                            {rec.status}
                                        </span>
                                    </span>

                                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "#0d1b2e" }}>
                                        <span
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                                            style={{ background: accent, color: "#fff" }}
                                        >
                                            {rec.assignedUser.charAt(0)}
                                        </span>
                                        {rec.assignedUser}
                                    </span>

                                    <span className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap" style={{ color: "#0d1b2e" }}>
                                        {rec.searchOutput || "—"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <p
                        className="text-xs mt-3 text-right"
                        style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}
                    >
                        {records.length} records
                    </p>
                </div>
            </div>
        </div>
    );
}