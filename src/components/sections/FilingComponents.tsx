import React, { useState, useCallback } from "react";
import { AlertCircle, Upload, CheckCircle2 } from "lucide-react";
import { accent, bgAccent, colorsMap } from "./FilingConstants";
import type {FieldLabelProps, SectionCardProps, PrimaryBtnProps, NoteProps, UploadZoneProps} from "./FilingTypes";

export function FieldLabel({ children }: FieldLabelProps) {
    return (
        <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}
        >
            {children}
        </label>
    );
}

export function SectionCard({ title, icon, children }: SectionCardProps) {
    return (
        <div
            className="rounded-xl border p-6 mb-5"
            style={{ background: "#fdfaf4", borderColor: "rgba(13,27,46,0.10)" }}
        >
            <div
                className="flex items-center gap-2 mb-5 pb-4 border-b"
                style={{ borderColor: "rgba(13,27,46,0.08)" }}
            >
                <span style={{ color: accent }}>{icon}</span>
                <h3
                    className="text-base font-semibold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2e" }}
                >
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

export function PrimaryBtn({ onClick, children, disabled }: PrimaryBtnProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
                background: disabled ? "#a0b8ac" : accent,
                color: "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
                if (!disabled) e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
            }}
        >
            {children}
        </button>
    );
}

export function Note({ children, variant = "amber" }: NoteProps) {
    const c = colorsMap[variant];
    return (
        <div
            className="flex items-start gap-2.5 rounded-lg p-3 text-xs"
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
            <AlertCircle size={13} style={{ color: c.icon, marginTop: 1, flexShrink: 0 }} />
            <span style={{ color: c.text }}>{children}</span>
        </div>
    );
}

export function UploadZone({ label, files, onFiles }: UploadZoneProps) {
    const [dragging, setDragging] = useState(false);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragging(false);
            const names = Array.from(e.dataTransfer.files).map((f) => f.name);
            onFiles([...files, ...names]);
        },
        [files, onFiles]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const names = Array.from(e.target.files ?? []).map((f) => f.name);
        onFiles([...files, ...names]);
    };

    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className="rounded-lg border-2 border-dashed p-5 text-center transition-all"
                style={{
                    borderColor: dragging ? accent : "rgba(13,27,46,0.18)",
                    background: dragging ? bgAccent : "#faf6ee",
                }}
            >
                <Upload size={20} className="mx-auto mb-2" style={{ color: dragging ? accent : "#a09070" }} />
                <p className="text-xs mb-1" style={{ color: "#6b5f4e" }}>Drag & drop files here, or</p>
                <label className="text-xs font-semibold cursor-pointer" style={{ color: accent }}>
                    Browse files
                    <input type="file" className="hidden" multiple onChange={handleChange} />
                </label>
                <p className="text-xs mt-1" style={{ color: "#a09070" }}>PDF, DOCX, JPG — max 10MB each</p>
            </div>
            {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                    {files.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded" style={{ background: bgAccent, color: accent }}>
                            <CheckCircle2 size={11} />
                            {f}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}