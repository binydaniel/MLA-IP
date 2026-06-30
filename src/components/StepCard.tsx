import { AlertCircle, FileWarning } from "lucide-react";
import type { Step } from "./types.ts";

interface Props {
  step: Step;
  accent: string;
  bgAccent: string;
  isLast: boolean;
}

export default function StepCard({ step, accent, bgAccent, isLast }: Props) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10"
          style={{ background: accent, color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 600 }}
        >
          {step.number}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2" style={{ background: "rgba(13,27,46,0.15)", minHeight: 24 }} />
        )}
      </div>

      <div className="flex-1 pb-8">
        <div className="rounded-lg border p-5" style={{ background: "#fdfaf4", borderColor: "rgba(13,27,46,0.10)" }}>
          <h3 className="text-base font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: accent }}>
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-3">{step.description}</p>

          {step.substeps && (
            <div className="space-y-2 mb-3">
              {step.substeps.map((sub, i) => (
                <div key={i} className="flex gap-3 rounded p-3" style={{ background: bgAccent }}>
                  <span className="text-xs font-semibold mt-0.5 flex-shrink-0" style={{ color: accent, fontFamily: "'DM Mono', monospace" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: accent }}>{sub.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#4a3c28" }}>{sub.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step.documents && step.documents.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent, fontFamily: "'DM Mono', monospace" }}>
                Required Documents
              </p>
              <ul className="space-y-1">
                {step.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#3a2e1e" }}>
                    <FileWarning size={12} style={{ color: accent, marginTop: 2, flexShrink: 0 }} />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.notes && step.notes.length > 0 && (
            <div className="space-y-2">
              {step.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded p-2.5 text-xs" style={{ background: "#fff9ee", border: "1px solid rgba(184,134,11,0.2)" }}>
                  <AlertCircle size={12} style={{ color: "#b8860b", marginTop: 1, flexShrink: 0 }} />
                  <span style={{ color: "#7a5500" }}>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
