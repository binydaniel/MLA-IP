import React, { useState, useEffect } from "react";
import {
  Plus, CalendarDays, AlertCircle, X, Edit3,
  HelpCircle, Bell, Settings, UserCircle2
} from "lucide-react";

// Structural data types matching the Registry module architectures
interface InvalidationRecord {
  id: string; // Dossier Case File ID
  plaintiff: string; // Party seeking invalidation (Challenger)
  defendant: string; // Trademark Owner (Registrant)
  targetTrademark: string; // Contested Trademark Property
  grounds: "Non-Use" | "Bad Faith" | "Prior Rights Descriptive" | "Genericness";
  dateFiled: string; // Date contested dossier was logged
  tribunalStatus: "Under Review" | "Briefing Stage" | "Hearing Scheduled" | "Decision Rendered";
}

const accent = "#8b1a1a"; // Deep Crimson / Merlot tones reserved for Legal / Adversarial proceedings
const bgAccent = "rgba(139, 26, 26, 0.06)";

const emptyForm: InvalidationRecord = {
  id: "",
  plaintiff: "",
  defendant: "",
  targetTrademark: "",
  grounds: "Non-Use",
  dateFiled: "",
  tribunalStatus: "Under Review",
};

// Internal corporate mock database representing pending/active invalidation actions
const initialInvalidationData: InvalidationRecord[] = [
  {
    id: "INV-2026-009",
    plaintiff: "Zola Distilleries S.C.",
    defendant: "Habesha Breweries S.C.",
    targetTrademark: "Cold Gold Premium Lager",
    grounds: "Prior Rights Descriptive",
    dateFiled: "2026-03-14",
    tribunalStatus: "Briefing Stage"
  },
  {
    id: "INV-2026-010",
    plaintiff: "Nile Logistics Inc.",
    defendant: "Blue Nile Trading PLC",
    targetTrademark: "Blue Nile Logistics Seal",
    grounds: "Non-Use",
    dateFiled: "2026-01-22",
    tribunalStatus: "Hearing Scheduled"
  },
  {
    id: "INV-2026-011",
    plaintiff: "Global Connect Wireless",
    defendant: "Meridian Logistics Group",
    targetTrademark: "Meridian Global Connect",
    grounds: "Bad Faith",
    dateFiled: "2026-05-02",
    tribunalStatus: "Under Review"
  },
  {
    id: "INV-2026-012",
    plaintiff: "Equatorial Agro-Processing",
    defendant: "Awash Food Processing S.C.",
    targetTrademark: "Pure Origin Pure Blend",
    grounds: "Genericness",
    dateFiled: "2026-06-18",
    tribunalStatus: "Under Review"
  }
];

const FIELD_STYLES = {
  background: "#fdfaf4",
  borderColor: "rgba(13,27,46,0.15)",
  color: "#0d1b2e",
};

const GRID_LAYOUT_CLASS = "grid items-center px-5 py-3.5 border-b transition-colors";
const GRID_COLUMNS_STYLE = { gridTemplateColumns: "1.1fr 1.6fr 1.6fr 1.6fr 1.3fr 1.3fr 1.2fr" };

interface InvalidationModalProps {
  onClose: () => void;
  onSave: (r: InvalidationRecord) => void;
  editRecord: InvalidationRecord | null;
}

function InvalidationModal({ onClose, onSave, editRecord }: InvalidationModalProps) {
  const [form, setForm] = useState<InvalidationRecord>({ ...emptyForm });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(editRecord ? { ...editRecord } : { ...emptyForm });
    setError("");
  }, [editRecord]);

  const isEditMode = !!editRecord;

  const handleSave = () => {
    if (!form.plaintiff || !form.defendant || !form.targetTrademark || !form.dateFiled || !form.tribunalStatus) {
      setError("All administrative fields must be properly populated.");
      return;
    }

    const completedForm = {
      ...form,
      id: form.id || `INV-2026-${Math.floor(100 + Math.random() * 900)}`
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
                  style={{ color: "#d32f2f", fontFamily: "'DM Mono', monospace" }}
              >
                {isEditMode ? "Modify Action Entry" : "Initiate Invalidation Docket"}
              </p>
              <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
              >
                {isEditMode ? `Edit Docket: ${editRecord?.id}` : "Tribunal Opposition File"}
              </h3>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-white/50 hover:text-[#f5f0e8] transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label>Challenger (Plaintiff)</Label>
              <input
                  type="text"
                  placeholder="Party contesting the mark"
                  value={form.plaintiff}
                  onChange={(e) => setForm({ ...form, plaintiff: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Registrant (Defendant)</Label>
              <input
                  type="text"
                  placeholder="Current owner of record"
                  value={form.defendant}
                  onChange={(e) => setForm({ ...form, defendant: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Contested Trademark Property</Label>
              <input
                  type="text"
                  placeholder="Protected mark designation"
                  value={form.targetTrademark}
                  onChange={(e) => setForm({ ...form, targetTrademark: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Primary Legal Grounds</Label>
              <select
                  value={form.grounds}
                  onChange={(e) => setForm({ ...form, grounds: e.target.value as any })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              >
                <option value="Non-Use">Non-Use (Continuous 3+ Years)</option>
                <option value="Bad Faith">Bad Faith Registration</option>
                <option value="Prior Rights Descriptive">Prior Rights / Confusing Similarity</option>
                <option value="Genericness">Generic / Descriptive Designation</option>
              </select>
            </div>

            <div>
              <Label>Date Filed with Tribunal</Label>
              <input
                  type="date"
                  value={form.dateFiled}
                  onChange={(e) => setForm({ ...form, dateFiled: e.target.value })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>

            <div>
              <Label>Tribunal Procedural Status</Label>
              <select
                  value={form.tribunalStatus}
                  onChange={(e) => setForm({ ...form, tribunalStatus: e.target.value as any })}
                  className={fieldCls}
                  style={FIELD_STYLES}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              >
                <option value="Under Review">Under Review / Intake</option>
                <option value="Briefing Stage">Briefing Stage</option>
                <option value="Hearing Scheduled">Hearing Scheduled</option>
                <option value="Decision Rendered">Decision Rendered</option>
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
              {isEditMode ? "Update Case File" : "File Invalidation"}
            </button>
          </div>
        </div>
      </div>
  );
}

export default function Invalidation() {
  const [records, setRecords] = useState<InvalidationRecord[]>(initialInvalidationData);
  const [activeModalRecord, setActiveModalRecord] = useState<InvalidationRecord | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  const handleSave = (updatedRec: InvalidationRecord) => {
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
              <InvalidationModal
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
                Invalidation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track contentious administrative filings, genericness cancellations, non-use cancellations, and tribunal oppositions.
              </p>
            </div>
            <button
                onClick={() => setActiveModalRecord({} as InvalidationRecord)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: accent }}
            >
              <Plus size={15} />
              Add Invalidation
            </button>
          </div>

          <div className="px-10 py-6 flex-1">
            <div
                className="rounded-xl border overflow-hidden shadow-sm"
                style={{ borderColor: "rgba(13,27,46,0.10)", background: "#fdfaf4" }}
            >
              {/* Legal Grid Table Header Row */}
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
                <span className="text-xs font-semibold uppercase tracking-widest">Case ID</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Challenger (Plaintiff)</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Registrant (Defendant)</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Contested Property</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Grounds</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Filing Date</span>
                <span className="text-xs font-semibold uppercase tracking-widest">Tribunal Status</span>
              </div>

              {/* Table Data Rows Mapping */}
              {records.map((rec, i) => {
                const isEven = i % 2 === 0;
                const defaultBg = isEven ? "#fdfaf4" : "#faf6ee";

                const statusColor =
                    rec.tribunalStatus === "Decision Rendered" ? "#2e7d32" :
                        rec.tribunalStatus === "Hearing Scheduled" ? "#c66900" :
                            rec.tribunalStatus === "Briefing Stage" ? "#2b6cb0" : "#555555";

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
                      <span className="text-xs font-semibold font-mono text-[#6b5f4e]">
                        {rec.id}
                      </span>

                      <span className="text-sm font-semibold" style={{ color: "#0d1b2e" }}>
                        {rec.plaintiff}
                      </span>

                      <span className="text-sm font-medium text-[#4a5568]">
                        {rec.defendant}
                      </span>

                      <span className="text-sm font-medium italic" style={{ color: "#0d1b2e" }}>
                        {rec.targetTrademark}
                      </span>

                      <span className="text-xs font-medium px-2 py-0.5 rounded border max-w-max"
                            style={{ background: "#fff", borderColor: "rgba(13,27,46,0.08)", color: "#4a5568" }}>
                        {rec.grounds}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6b5f4e" }}>
                        <CalendarDays size={12} className="opacity-60" />
                        {rec.dateFiled}
                      </span>

                      <span
                          className="text-xs font-semibold font-mono tracking-wide"
                          style={{ color: statusColor }}
                      >
                        {rec.tribunalStatus}
                      </span>
                    </div>
                );
              })}
            </div>

            <p
                className="text-xs mt-3 text-right"
                style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}
            >
              {records.length} contentious legal files listed
            </p>
          </div>
        </div>
      </div>
  );
}