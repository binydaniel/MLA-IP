import { useState } from "react";
import { User, Globe, Hash, Upload, Check, ChevronRight, CheckCircle2, FileText, Gavel, MessageSquare, Clock, AlertTriangle, CreditCard, X, Download } from "lucide-react";
import { fldCls, fldSty, onFocus, onBlur, bgAccent, accent, step2ApplicantDocs, dashboardStats, statColor, dashboardDocs, step5Docs } from "./FilingConstants";
import { FieldLabel, SectionCard, PrimaryBtn, Note, UploadZone } from "./FilingComponents";
import type {StepProps, CountdownPillProps, ToggleProps, StatusBadgeProps} from "./FilingTypes";
import { statusMap, gold } from "./FilingConstants";

export function CountdownPill({ days, total, label, danger }: CountdownPillProps) {
    const pct = Math.max(0, Math.min(100, (days / total) * 100));
    const color = danger || days <= 14 ? "#c0392b" : days <= 30 ? gold : accent;
    return (
        <div className="rounded-lg p-4 border" style={{ background: "#fdfaf4", borderColor: "rgba(13,27,46,0.10)" }}>
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold" style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}>{label}</p>
                <span className="text-lg font-bold" style={{ color, fontFamily: "'DM Mono', monospace" }}>{days}d</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(13,27,46,0.08)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
            </div>
            <p className="text-xs mt-1.5" style={{ color: "#a09070" }}>{days} of {total} days remaining</p>
        </div>
    );
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
    return (
        <button onClick={() => onChange(!checked)} className="flex items-center gap-2">
            <div className="relative w-10 h-5 rounded-full transition-colors" style={{ background: checked ? accent : "#c4b89a" }}>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }} />
            </div>
            {label && <span className="text-sm" style={{ color: "#6b5f4e" }}>{label}</span>}
        </button>
    );
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const s = statusMap[status];
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
            {s.label}
    </span>
    );
}

export function Dashboard({ onGoToStep }: { onGoToStep: (n: number) => void }) {
    return (
        <div>
            <div className="grid grid-cols-5 gap-3 mb-6">
                {dashboardStats.map((s) => (
                    <button
                        key={s.step}
                        onClick={() => onGoToStep(s.step)}
                        className="rounded-xl p-4 border text-left transition-all"
                        style={{ background: statBg(s.status), borderColor: "rgba(13,27,46,0.10)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold" style={{ color: statColor(s.status), fontFamily: "'DM Mono', monospace" }}>STEP {s.step}</span>
                            {s.status === "done" ? <CheckCircle2 size={14} style={{ color: accent }} /> : s.status === "active" ? <Clock size={14} style={{ color: "#1a4a7a" }} /> : <div className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: "#a09070" }} />}
                        </div>
                        <p className="text-xs font-semibold leading-snug" style={{ color: "#0d1b2e" }}>{s.label}</p>
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
                <SectionCard title="Document Download" icon={<Download size={16} />}>
                    <div className="space-y-2">
                        {dashboardDocs.map((doc) => (
                            <button
                                key={doc}
                                className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 border text-xs font-medium transition-all"
                                style={{ background: "#fdfaf4", borderColor: "rgba(13,27,46,0.08)", color: "#0d1b2e" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = bgAccent)}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "#fdfaf4")}
                            >
                                <div className="flex items-center gap-2"><FileText size={12} style={{ color: accent }} />{doc}</div>
                                <Download size={12} style={{ color: accent }} />
                            </button>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </div>
    );
}

export function Step1({ onNext }: StepProps) {
    const [form, setForm] = useState({ clientName: "", email: "", phone: "", company: "", trademark: "", trademarkClass: "", country: "" });
    const [docs, setDocs] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saved, setSaved] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.clientName) e.clientName = "Client name is required.";
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required.";
        if (!form.trademark) e.trademark = "Trademark name is required.";
        if (!form.trademarkClass) e.trademarkClass = "Trademark class is required.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const inp = (field: keyof typeof form, placeholder: string, type = "text") => (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={form[field]}
                onChange={(e) => {
                    setForm({ ...form, [field]: e.target.value });
                    setErrors({ ...errors, [field]: "" });
                }}
                className={fldCls}
                style={{ ...fldSty, borderColor: errors[field] ? "#c0392b" : "rgba(13,27,46,0.15)" }}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {errors[field] && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors[field]}</p>}
        </div>
    );

    return (
        <div>
            {saved && (
                <div className="mb-5 flex items-start gap-3 rounded-xl p-4 border" style={{ background: bgAccent, borderColor: "rgba(13,92,58,0.2)" }}>
                    <CheckCircle2 size={18} style={{ color: accent, flexShrink: 0, marginTop: 1 }} />
                    <div>
                        <p className="text-sm font-semibold" style={{ color: accent }}>Instruction Registered</p>
                        <p className="text-xs mt-0.5" style={{ color: "#3a6e52" }}>Client file has been recorded in the MLA-IP System. Proceed to filing.</p>
                    </div>
                </div>
            )}
            <SectionCard title="Client Details" icon={<User size={16} />}>
                <div className="grid grid-cols-2 gap-4">
                    <div><FieldLabel>Client Full Name *</FieldLabel>{inp("clientName", "e.g. Abebe Kebede")}</div>
                    <div><FieldLabel>Company / Organisation</FieldLabel>{inp("company", "e.g. Habesha Breweries S.C.")}</div>
                    <div><FieldLabel>Email Address *</FieldLabel>{inp("email", "client@company.com", "email")}</div>
                    <div><FieldLabel>Phone Number</FieldLabel>{inp("phone", "+251 91 234 5678", "tel")}</div>
                </div>
            </SectionCard>
            <SectionCard title="Trademark Details" icon={<Hash size={16} />}>
                <div className="grid grid-cols-2 gap-4">
                    <div><FieldLabel>Trademark Name *</FieldLabel>{inp("trademark", "e.g. HABESHA GOLD")}</div>
                    <div>
                        <FieldLabel>Trademark Class (Nice) *</FieldLabel>
                        <select
                            value={form.trademarkClass}
                            onChange={(e) => { setForm({ ...form, trademarkClass: e.target.value }); setErrors({ ...errors, trademarkClass: "" }); }}
                            className={fldCls} style={{ ...fldSty, borderColor: errors.trademarkClass ? "#c0392b" : "rgba(13,27,46,0.15)" }}
                            onFocus={onFocus} onBlur={onBlur}
                        >
                            <option value="">Select class…</option>
                            {Array.from({ length: 45 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>Class {n}</option>)}
                        </select>
                        {errors.trademarkClass && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.trademarkClass}</p>}
                    </div>
                    <div className="col-span-2">
                        <FieldLabel>Country of Origin</FieldLabel>
                        <div className="relative">
                            <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#a09070" }} />
                            <input type="text" placeholder="e.g. Ethiopia" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={fldCls} style={{ ...fldSty, paddingLeft: "2.25rem" }} onFocus={onFocus} onBlur={onBlur} />
                        </div>
                    </div>
                </div>
            </SectionCard>
            <SectionCard title="Document Upload" icon={<Upload size={16} />}>
                <div className="grid grid-cols-1 gap-4">
                    <UploadZone label="Power of Attorney (POA)" files={docs.filter((_, i) => i % 3 === 0)} onFiles={(f) => setDocs((p) => [...p.filter((_, i) => i % 3 !== 0), ...f])} />
                    <UploadZone label="Foreign Trademark Registration Certificate / Business License" files={docs.filter((_, i) => i % 3 === 1)} onFiles={(f) => setDocs((p) => [...p.filter((_, i) => i % 3 !== 1), ...f])} />
                </div>
                <div className="mt-4"><Note>Accepted formats: PDF, DOCX, JPG.</Note></div>
            </SectionCard>
            <div className="flex items-center justify-between">
                <div />
                <div className="flex gap-3">
                    <PrimaryBtn onClick={() => validate() && setSaved(true)}><Check size={15} /> Register Instruction</PrimaryBtn>
                    {saved && <PrimaryBtn onClick={onNext}>Proceed to Filing <ChevronRight size={15} /></PrimaryBtn>}
                </div>
            </div>
        </div>
    );
}

export function Step2({ onNext }: StepProps) {
    const [method, setMethod] = useState<"eservice" | "manual">("eservice");
    const [trackingNo, setTrackingNo] = useState("");
    const [ipasNo, setIpasNo] = useState("");
    const [submitted, setSubmitted] = useState(false);
    // Contextual form state extension local to Step 2 context inside view dock
    const [reimbursementAmount, setReimbursementAmount] = useState("");
    const [reimbursementCurrency, setReimbursementCurrency] = useState("ETB");

    return (
        <div>
            {submitted && (
                <div className="mb-5 flex items-start gap-3 rounded-xl p-4 border" style={{ background: bgAccent, borderColor: "rgba(13,92,58,0.2)" }}>
                    <CheckCircle2 size={18} style={{ color: accent, flexShrink: 0, marginTop: 1 }} />
                    <div>
                        <p className="text-sm font-semibold" style={{ color: accent }}>Application Submitted</p>
                        <p className="text-xs mt-0.5" style={{ color: "#3a6e52" }}>{method === "eservice" ? `E-service tracking number: ${trackingNo}` : `IPAS application number: ${ipasNo}`}</p>
                    </div>
                </div>
            )}
            <SectionCard title="Select Filing Method" icon={<FileText size={16} />}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {(["eservice", "manual"] as const).map((m) => (
                        <button key={m} onClick={() => setMethod(m)} className="rounded-xl p-4 border-2 text-left transition-all" style={{ borderColor: method === m ? accent : "rgba(13,27,46,0.12)", background: method === m ? bgAccent : "#faf6ee" }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold" style={{ color: method === m ? accent : "#0d1b2e" }}>{m === "eservice" ? "E-Service Portal" : "Manual Submission"}</span>
                                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: method === m ? accent : "#a09070" }}>
                                    {method === m && <div className="w-2 h-2 rounded-full" style={{ background: accent }} />}
                                </div>
                            </div>
                            <p className="text-xs" style={{ color: "#6b5f4e" }}>{m === "eservice" ? "File online via the EIPA e-service portal." : "Submit in person to the EIPA office."}</p>
                        </button>
                    ))}
                </div>
                {method === "eservice" ? (
                    <div>
                        <FieldLabel>E-Service Tracking Number</FieldLabel>
                        <input type="text" placeholder="e.g. ESP-2024-000192" value={trackingNo} onChange={(e) => setTrackingNo(e.target.value)} className={fldCls} style={fldSty} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                ) : (
                    <div>
                        <FieldLabel>IPAS Application Number</FieldLabel>
                        <input type="text" placeholder="e.g. IPAS-2024-001841" value={ipasNo} onChange={(e) => setIpasNo(e.target.value)} className={fldCls} style={fldSty} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                )}
            </SectionCard>
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-4 items-end">
                <div className="col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Reimbursement Amount
                    </label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={reimbursementAmount}
                        onChange={(e) => setReimbursementAmount(e.target.value)}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Currency
                    </label>
                    <select
                        value={reimbursementCurrency}
                        onChange={(e) => setReimbursementCurrency(e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-600 transition-colors"
                    >
                        <option value="ETB">ETB (Br)</option>
                        <option value="USD">USD ($)</option>

                    </select>
                </div>
            </div>
            <SectionCard title="Applicant Documents" icon={<Upload size={16} />}>
                <Note variant="blue">Ensure all required documents uploaded in Step 1 are included.</Note>
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {step2ApplicantDocs.map((doc) => (
                        <div key={doc} className="flex items-center gap-2 rounded-lg p-3 text-xs" style={{ background: bgAccent, color: accent, border: `1px solid rgba(13,92,58,0.15)` }}>
                            <CheckCircle2 size={12} />{doc}
                        </div>
                    ))}
                </div>
            </SectionCard>
            <div className="flex justify-end gap-3">
                <PrimaryBtn onClick={() => ((method === "eservice" && trackingNo) || (method === "manual" && ipasNo)) && setSubmitted(true)} disabled={submitted}><FileText size={15} /> Submit Application</PrimaryBtn>
                {submitted && <PrimaryBtn onClick={onNext}>Proceed to Examination <ChevronRight size={15} /></PrimaryBtn>}
            </div>
        </div>
    );
}

export function Step3({ onNext }: StepProps) {
    const [formalityStatus, setFormalityStatus] = useState<"pending" | "pass" | "fail">("active" as any);
    const [substantiveStatus, setSubstantiveStatus] = useState<"pending" | "pass" | "fail">("pending");
    const [responseFiles, setResponseFiles] = useState<string[]>([]);

    return (
        <div>
            <SectionCard title="Examination Status Tracker" icon={<Gavel size={16} />}>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Formality Examination", desc: "Documents formal requirements check.", state: formalityStatus, set: setFormalityStatus },
                        { label: "Substantive Examination", desc: "Eligibility assessment check.", state: substantiveStatus, set: setSubstantiveStatus },
                    ].map((item) => (
                        <div key={item.label} className="rounded-xl border p-4" style={{ background: "#faf6ee", borderColor: "rgba(13,27,46,0.10)" }}>
                            <div className="flex items-start justify-between mb-3">
                                <p className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2e" }}>{item.label}</p>
                                <StatusBadge status={item.state as any} />
                            </div>
                            <p className="text-xs mb-4" style={{ color: "#6b5f4e" }}>{item.desc}</p>
                            <div className="flex gap-2">
                                {(["active", "pass", "fail"] as const).map((s) => (
                                    <button
                                        key={s} onClick={() => item.set(s as any)} className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                        style={{ background: item.state === s ? (s === "pass" ? accent : s === "fail" ? "#c0392b" : "#1a4a7a") : "rgba(13,27,46,0.06)", color: item.state === s ? "#fff" : "#6b5f4e" }}
                                    >
                                        {s === "active" ? "In Progress" : s === "pass" ? "Passed" : "Failed"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
            <SectionCard title="Response to Official Action" icon={<MessageSquare size={16} />}>
                <CountdownPill days={67} total={90} label="Days Remaining to Respond" />
                <div className="mt-4"><UploadZone label="Upload Response Documents" files={responseFiles} onFiles={setResponseFiles} /></div>
                <div className="mt-4 space-y-2">
                    <Note>Response must address each ground raised. Late responses will not be accepted.</Note>
                    <Note variant="red">If no response is filed within 90 days, the application is deemed <strong>abandoned</strong>.</Note>
                </div>
            </SectionCard>
            <div className="flex justify-end"><PrimaryBtn onClick={onNext}>Proceed to Opposition <ChevronRight size={15} /></PrimaryBtn></div>
        </div>
    );
}

export function Step4({ onNext }: StepProps) {
    const [oppositionFiled, setOppositionFiled] = useState(false);
    const [responseText, setResponseText] = useState("");
    const [adPublished, setAdPublished] = useState(true);

    return (
        <div>
            <SectionCard title="Advertisement Status" icon={<FileText size={0} />}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-semibold" style={{ color: "#0d1b2e" }}>Call for Opposition Published</p>
                        <p className="text-xs mt-0.5" style={{ color: "#6b5f4e" }}>Publication date: 15 Jan 2026</p>
                    </div>
                    <Toggle checked={adPublished} onChange={setAdPublished} />
                </div>
                {adPublished && <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs" style={{ background: bgAccent, border: `1px solid rgba(13,92,58,0.2)`, color: accent }}><CheckCircle2 size={13} />Advertisement confirmed.</div>}
            </SectionCard>
            <SectionCard title="60-Day Opposition Window" icon={<Clock size={16} />}>
                <CountdownPill days={38} total={60} label="Days Remaining in Opposition Period" />
                <div className="mt-5 flex items-center justify-between p-4 rounded-xl border" style={{ background: "#faf6ee", borderColor: "rgba(13,27,46,0.10)" }}>
                    <div>
                        <p className="text-sm font-semibold" style={{ color: "#0d1b2e" }}>Opposition Filed by Third Party</p>
                        <p className="text-xs mt-0.5" style={{ color: "#6b5f4e" }}>Toggle if an opposition has been lodged by a third party.</p>
                    </div>
                    <Toggle checked={oppositionFiled} onChange={setOppositionFiled} />
                </div>
            </SectionCard>
            {oppositionFiled && (
                <div className="rounded-xl border-l-4 p-5 mb-5" style={{ background: "#fff0f0", border: "1px solid rgba(192,57,43,0.3)", borderLeftWidth: 4, borderColor: "#c0392b" }}>
                    <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle size={18} style={{ color: "#c0392b", flexShrink: 0, marginTop: 1 }} />
                        <div>
                            <p className="text-sm font-semibold" style={{ color: "#8b1a1a" }}>Opposition Filed — Action Required</p>
                            <p className="text-xs mt-1" style={{ color: "#8b1a1a" }}>Coordinate with the client to prepare a counter-statement.</p>
                        </div>
                    </div>
                    <FieldLabel>Applicant Counter-Statement / Arguments</FieldLabel>
                    <textarea rows={4} placeholder="Summarise arguments..." value={responseText} onChange={(e) => setResponseText(e.target.value)} className={fldCls} style={{ ...fldSty, resize: "vertical" }} onFocus={onFocus} onBlur={onBlur} />
                    <div className="mt-3"><UploadZone label="Supporting Documents" files={[]} onFiles={() => {}} /></div>
                </div>
            )}
            <div className="flex justify-end"><PrimaryBtn onClick={onNext}>Proceed to Payment <ChevronRight size={15} /></PrimaryBtn></div>
        </div>
    );
}

export function Step5() {
    const [abandoned, setAbandoned] = useState(false);
    const [paid, setPaid] = useState(false);

    return (
        <div>
            <div className="mb-5 flex items-center justify-between p-4 rounded-xl border" style={{ background: abandoned ? "#fff0f0" : "#faf6ee", borderColor: abandoned ? "rgba(192,57,43,0.3)" : "rgba(13,27,46,0.10)" }}>
                <div><p className="text-sm font-semibold" style={{ color: abandoned ? "#8b1a1a" : "#0d1b2e" }}>Application Status: Abandoned</p></div>
                <Toggle checked={abandoned} onChange={setAbandoned} />
            </div>
            {abandoned ? (
                <div className="rounded-xl border-l-4 p-6 text-center" style={{ background: "#fff0f0", border: "1px solid rgba(192,57,43,0.3)", borderLeftWidth: 4, borderColor: "#c0392b" }}>
                    <AlertTriangle size={32} className="mx-auto mb-3" style={{ color: "#c0392b" }} />
                    <p className="text-lg font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#8b1a1a" }}>Application Deemed Abandoned</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#c0392b", color: "#fff" }}><X size={14} /> Application Closed</div>
                </div>
            ) : (
                <>
                    <CountdownPill days={54} total={90} label="3-Month Payment Deadline" />
                    <div className="mt-5">
                        <SectionCard title="Certificate Fee Payment" icon={<CreditCard size={16} />}>
                            <div className="rounded-lg p-4 mb-5 flex items-center justify-between" style={{ background: bgAccent, border: `1px solid rgba(13,92,58,0.2)` }}>
                                <div>
                                    <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: accent, fontFamily: "'DM Mono', monospace" }}>Amount Due</p>
                                    <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2e" }}>ETB 3,500.00</p>
                                </div>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: accent }}><CreditCard size={20} style={{ color: "#fff" }} /></div>
                            </div>
                            <FieldLabel>Payment Reference / Receipt Number</FieldLabel>
                            <input type="text" placeholder="e.g. CBE-2025-0039182" className={fldCls} style={fldSty} onFocus={onFocus} onBlur={onBlur} />
                            <div className="mt-4 flex justify-end"><PrimaryBtn onClick={() => setPaid(true)} disabled={paid}><Check size={14} /> {paid ? "Payment Confirmed" : "Confirm Payment"}</PrimaryBtn></div>
                        </SectionCard>
                    </div>
                    {paid && (
                        <SectionCard title="Certificate Download" icon={<Download size={16} />}>
                            <div className="space-y-2">
                                {step5Docs.map((doc) => (
                                    <button key={doc} className="w-full flex items-center justify-between rounded-lg px-4 py-3 border transition-all text-sm font-medium" style={{ background: "#fdfaf4", borderColor: "rgba(13,27,46,0.10)", color: "#0d1b2e" }} onMouseEnter={(e) => (e.currentTarget.style.background = bgAccent)} onMouseLeave={(e) => (e.currentTarget.style.background = "#fdfaf4")}>
                                        <div className="flex items-center gap-2"><FileText size={14} style={{ color: accent }} />{doc}</div>
                                        <Download size={14} style={{ color: accent }} />
                                    </button>
                                ))}
                            </div>
                        </SectionCard>
                    )}
                    {!paid && <Note variant="red">Payment must be made within 3 months. Failure will result in the application being abandoned.</Note>}
                </>
            )}
        </div>
    );
}