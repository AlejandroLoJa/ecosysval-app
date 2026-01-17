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
    jornada,
    createdAt,
  } = job;

  return (
    <article
      className={`rounded-2xl border bg-white/95 shadow-sm hover:shadow-md transition cursor-pointer ${
        compact ? "p-4" : "p-5"
      }`}
      onClick={() => onOpen?.(job)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 leading-snug truncate">
            {titulo}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> {empresa}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {ubicacion}
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 border border-blue-100">
          {modalidad || "—"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-700">
        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 border">
          <Banknote className="w-4 h-4" />
          <span className="truncate">{salario || "Salario a convenir"}</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 border">
          <Briefcase className="w-4 h-4" />
          <span className="truncate">{tipoContrato || "—"}</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 border">
          <Clock className="w-4 h-4" />
          <span className="truncate">{jornada || "—"}</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 border">
          <span className="text-slate-500">Publicado:</span>
          <span className="truncate">
            {createdAt ? new Date(createdAt).toLocaleString("es-CO") : "—"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onApply?.(job);
          }}
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 transition"
        >
          Aplicar
        </button>
      </div>
    </article>
  );
}
