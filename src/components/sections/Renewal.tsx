import React, { useState, useEffect } from "react";
import {
  Plus, CalendarDays, AlertCircle, X, Edit3, RefreshCw,
  HelpCircle, Bell, Settings, UserCircle2
} from "lucide-react";

interface RenewalRecord {
  id: string; // Internal operational mapping variable
  clientName: string;
  trademarkName: string;
  jurisdiction: string;
  expiryDate: string;
  officialFee: string;
  renewalStatus: "Active" | "Urgent Window" | "Grace Period";
}

const accent = "#b8860b";
const bgAccent = "rgba(184, 134, 11, 0.08)";

const emptyForm: RenewalRecord = {
  id: "",
  clientName: "",
  trademarkName: "",
  jurisdiction: "",
  expiryDate: "",
  officialFee: "",
  renewalStatus: "Active",
};

const initialRenewalsData: RenewalRecord[] = [
  {
    id: "MLA-2026-001",
    clientName: "Habesha Breweries S.C.",
    trademarkName: "Cold Gold Premium Lager",
    jurisdiction: "Ethiopia",
    expiryDate: "2026-11-14",
    officialFee: "ETB 14,500",
    renewalStatus: "Urgent Window"
  },
  {
    id: "MLA-2026-002",
    clientName: "Nile Trading PLC",
    trademarkName: "Blue Nile Logistics Seal",
    jurisdiction: "Ethiopia",
    expiryDate: "2027-03-22",
    officialFee: "ETB 8,200",
    renewalStatus: "Active"
  },
  {
    id: "MLA-2026-003",
    clientName: "Meridian Logistics Group",
    trademarkName: "Meridian Global Connect",
    jurisdiction: "United Kingdom",
    expiryDate: "2026-08-05",
    officialFee: "GBP 250",
    renewalStatus: "Urgent Window"
  },
  {
    id: "MLA-2026-004",
    clientName: "Aura Cosmetics Corp",
    trademarkName: "Lumière Organics",
    jurisdiction: "France",
    expiryDate: "2026-07-19",
    officialFee: "EUR 310",
    renewalStatus: "Grace Period"
  },
  {
    id: "MLA-2026-005",
    clientName: "Summit Tech Solutions",
    trademarkName: "Apex Cloud Infrastructure",
    jurisdiction: "Ethiopia",
    expiryDate: "2027-09-01",
    officialFee: "ETB 12,000",
    renewalStatus: "Active"
  }
];

const FIELD_STYLES = {
  background: "#fdfaf4",
  borderColor: "rgba(13,27,46,0.15)",
  color: "#0d1b2e",
};

const GRID_LAYOUT_CLASS = "grid items-center px-5 py-3.5 border-b transition-colors";
const GRID_COLUMNS_STYLE = { gridTemplateColumns: "1.5fr 1.5fr 1.2fr 1.3fr 1.8fr 1fr" };

interface RenewalModalProps {
  onClose: () => void;
  onSave: (r: RenewalRecord) => void;
  editRecord: RenewalRecord | null;
}

function RenewalModal({ onClose, onSave, editRecord }: RenewalModalProps) {
  const [form, setForm] = useState<RenewalRecord>({ ...emptyForm });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(editRecord ? { ...editRecord } : { ...emptyForm });
    setError("");
  }, [editRecord]);

  const isEditMode = !!editRecord;

  const handleSave = () => {
    if (!form.clientName || !form.trademarkName || !form.jurisdiction || !form.expiryDate || !form.officialFee || !form.renewalStatus) {
      setError("Please fill in all fields.");
      return;
    }

    const completedForm = {
      ...form,
      id: form.id || `MLA-2026-${Math.floor(100 + Math.random() * 900)}`
    };

    onSave(completedForm);
    onClose();
  };

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
          <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "rgba(13,27,46,0.10)", background: "#0d1b2e" }}
          >
            <div>
              <p
                  className="text-xs uppercase tracking-widest font-semibold mb-0.5"
                  style={{ color: "#b8860b", fontFamily: "'DM Mono', monospace" }}
              >
                {isEditMode ? "Modify Milestone" : "New Renewal Dossier"}
              </p>
              <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
              >
                {isEditMode ? `Edit: ${editRecord?.id}` : "Maintenance Dossier"}
              </h3>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-white/50 hover:text-[#f5f0e8] transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
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
              <Label>Trademark / Property Name</Label>
              <input
                  type="text"
                  placeholder="e.g. Cold Gold Premium"
                  value={form.trademarkName}
                  onChange={(e) => setForm({ ...form, trademarkName: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Jurisdiction</Label>
              <input
                  type="text"
                  placeholder="e.g. Ethiopia"
                  value={form.jurisdiction}
                  onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Expiry Date</Label>
              <input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Official Fee</Label>
              <input
                  type="text"
                  placeholder="e.g. ETB 14,500"
                  value={form.officialFee}
                  onChange={(e) => setForm({ ...form, officialFee: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Renewal Window Status</Label>
              <select
                  value={form.renewalStatus}
                  onChange={(e) => setForm({ ...form, renewalStatus: e.target.value as any })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              >
                <option value="Active">Active</option>
                <option value="Urgent Window">Urgent Window</option>
                <option value="Grace Period">Grace Period</option>
              </select>
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

          <div
              className="flex items-center justify-end gap-3 px-6 py-4 border-t"
              style={{ borderColor: "rgba(13,27,46,0.10)", background: "#ede7d9" }}
          >
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-[#6b5f4e] hover:bg-black/5 transition-colors">
              Cancel
            </button>
            <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: accent }}
            >
              {isEditMode ? <Edit3 size={14} /> : <Plus size={14} />}
              {isEditMode ? "Update Window" : "Save Record"}
            </button>
          </div>
        </div>
      </div>
  );
}

export default function Renewal() {
  const [records, setRecords] = useState<RenewalRecord[]>(initialRenewalsData);
  const [activeModalRecord, setActiveModalRecord] = useState<RenewalRecord | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  const handleSave = (updatedRec: RenewalRecord) => {
    setRecords((prev) => {
      const exists = prev.some((r) => r.id === updatedRec.id);
      if (exists) {
        return prev.map((r) => (r.id === updatedRec.id ? updatedRec : r));
      }
      return [updatedRec, ...prev];
    });
    setActiveModalRecord(null);
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

        {/* MAIN WORKSPACE SECTION */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {activeModalRecord !== null && (
              <RenewalModal
                  editRecord={activeModalRecord.id ? activeModalRecord : null}
                  onClose={() => setActiveModalRecord(null)}
                  onSave={handleSave}
              />
          )}

          <div
              className="px-10 py-5 flex items-center justify-between border-b"
              style={{ background: "#f5f0e8", borderColor: "rgba(13,27,46,0.10)" }}
          >
            <div>
              <h2
                  className="text-2xl font-semibold text-slate-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Renewal Tracking
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor statutory maintenance cycles, official government fees, grace parameters, and regional jurisdiction requirements.
              </p>
            </div>
            <button
                onClick={() => setActiveModalRecord({} as RenewalRecord)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: accent }}
            >
              <Plus size={15} />
              Add Renewal
            </button>
          </div>

          <div className="px-10 py-6 flex-1">
            <div
                className="rounded-xl border overflow-hidden shadow-sm"
                style={{ borderColor: "rgba(13,27,46,0.10)", background: "#fdfaf4" }}
            >
              {/* Header Row */}
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
                <span className="text-xs font-semibold uppercase tracking-widest">Client Name</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Trademark Property</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Jurisdiction</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Expiry Date</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Official Fee</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Status</span>
              </div>

              {/* Data Rows Mapping */}
              {records.map((rec, i) => {
                const isEven = i % 2 === 0;
                const defaultBg = isEven ? "#fdfaf4" : "#faf6ee";

                // Conditional tag coloring to mimic the professional baseline style
                const statusColor =
                    rec.renewalStatus === "Urgent Window" ? "#b8860b" :
                        rec.renewalStatus === "Grace Period" ? "#d32f2f" : "#2e7d32";

                return (
                    <div
                        key={`${rec.id}-${i}`}
                        className={GRID_LAYOUT_CLASS}
                        style={{
                          ...GRID_COLUMNS_STYLE,
                          borderColor: "rgba(13,27,46,0.06)",
                          background: defaultBg,
                          cursor: "pointer",
                        }}
                        onClick={() => setActiveModalRecord(rec)}
                        onMouseEnter={(e) => (e.currentTarget.style.background = bgAccent)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = defaultBg)}
                    >
                      <span className="text-sm font-semibold" style={{ color: "#0d1b2e" }}>
                        {rec.clientName}
                      </span>

                      <span className="text-sm font-medium" style={{ color: "#0d1b2e" }}>
                        {rec.trademarkName}
                      </span>

                      <span className="text-xs font-medium" style={{ color: "#0d1b2e" }}>
                        {rec.jurisdiction}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6b5f4e" }}>
                        <CalendarDays size={12} className="opacity-60" />
                        {rec.expiryDate}
                      </span>

                      <span className="text-xs" style={{ color: "#0d1b2e" }}>
                        {rec.officialFee}
                      </span>

                      <span
                          className="text-xs font-semibold font-mono tracking-wide"
                          style={{ color: statusColor }}
                      >
                        {rec.renewalStatus}
                      </span>
                    </div>
                );
              })}
            </div>

            <p
                className="text-xs mt-3 text-right"
                style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}
            >
              {records.length} records monitored
            </p>
          </div>
        </div>
      </div>
  );
}