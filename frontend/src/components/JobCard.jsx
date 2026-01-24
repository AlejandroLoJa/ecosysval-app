import React from "react";
import { MapPin, Briefcase, Clock, Banknote, Building2 } from "lucide-react";

export default function JobCard({ job, onOpen, onApply, compact = false }) {
  const {
    titulo,
    empresa,
    ubicacion,
    salario,
    modalidad,
    tipoContrato,
    tipo_contrato,
    jornada,
    createdAt,
  } = job;

  const contrato = tipo_contrato || tipoContrato;

  return (
    <article
      className={[
        "rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl",
        "hover:bg-black/40 hover:shadow-2xl transition cursor-pointer",
        compact ? "p-4" : "p-5",
      ].join(" ")}
      onClick={() => onOpen?.(job)}
      role="button"
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-extrabold text-white leading-snug truncate">
            {titulo}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70">
            <span className="inline-flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-yellow-400" />
              <span className="truncate">{empresa || "—"}</span>
            </span>

            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              <span className="truncate">{ubicacion || "—"}</span>
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-yellow-400/15 px-3 py-1 text-[11px] font-semibold text-yellow-200 border border-yellow-400/20">
          {modalidad || "—"}
        </span>
      </div>

      {/* Info chips */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/80">
        <div className={chipCls}>
          <Banknote className="w-4 h-4 text-yellow-400" />
          <span className="truncate">{salario || "Salario a convenir"}</span>
        </div>

        <div className={chipCls}>
          <Briefcase className="w-4 h-4 text-yellow-400" />
          <span className="truncate">{contrato || "—"}</span>
        </div>

        <div className={chipCls}>
          <Clock className="w-4 h-4 text-yellow-400" />
          <span className="truncate">{jornada || "—"}</span>
        </div>

        <div className={chipCls}>
          <span className="text-white/50">Publicado:</span>
          <span className="truncate">
            {createdAt ? new Date(createdAt).toLocaleString("es-CO") : "—"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onApply?.(job);
          }}
          className="rounded-2xl bg-yellow-400 px-4 py-2 text-xs font-extrabold text-black shadow hover:bg-yellow-500 transition"
        >
          Aplicar
        </button>
      </div>
    </article>
  );
}

const chipCls =
  "inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 border border-white/10";
