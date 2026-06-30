import { CheckCircle2, Clock, AlertCircle, FileWarning } from "lucide-react";
import type { Procedure } from "./types.ts";
import StepCard from "./StepCard";

interface Props {
  procedure: Procedure;
  accent: string;
  bgAccent: string;
  children?: React.ReactNode;
}

export default function ProcedureView({ procedure, accent, bgAccent, children }: Props) {
  return (
    <>
      <div
        className="sticky top-0 z-10 border-b px-10 py-5 flex items-start justify-between"
        style={{ background: "#f5f0e8", borderColor: "rgba(13,27,46,0.10)" }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ color: accent }}>{procedure.icon}</span>
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: accent, fontFamily: "'DM Mono', monospace" }}>
              {procedure.subtitle}
            </span>
          </div>
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2e" }}>
            {procedure.title}
          </h2>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: bgAccent, color: accent, fontFamily: "'DM Mono', monospace" }}
        >
          {/*<CheckCircle2 size={12} />*/}
          {/*{procedure.steps.length} Steps*/}
        </div>
      </div>

      <div className="px-10 py-8 max-w-3xl">
        {procedure.purpose && (
          <div className="rounded-lg p-4 mb-8 flex gap-3" style={{ background: bgAccent, borderLeft: `3px solid ${accent}` }}>
            <Clock size={15} style={{ color: accent, marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm leading-relaxed" style={{ color: "#3a2e1e" }}>{procedure.purpose}</p>
          </div>
        )}

        {children ?? (
          <div>
            {procedure.steps.map((step, i) => (
              <StepCard key={step.number} step={step} accent={accent} bgAccent={bgAccent} isLast={i === procedure.steps.length - 1} />
            ))}
          </div>
        )}

        <div className="mt-8 rounded-lg border p-4" style={{ borderColor: "rgba(13,27,46,0.10)", background: "#fdfaf4" }}>
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#6b5f4e", fontFamily: "'DM Mono', monospace" }}>

          </p>

        </div>
      </div>
    </>
  );
}
