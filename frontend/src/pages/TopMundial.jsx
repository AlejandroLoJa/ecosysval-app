// src/pages/TopMundial.jsx
import React, { useMemo, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";
import {
  Lock,
  ArrowUpRight,
  Sparkles,
  X,
  Check,
  Filter,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PLANES_ORDEN = ["BÁSICO", "PRO", "PREMIUM", "PLATINO"];
const PLAN_USUARIO = "BÁSICO"; // luego lo traes del backend/contexto

export default function TopMundial() {
  const navigate = useNavigate();
  const [openPlans, setOpenPlans] = useState(false);

  const requierePlan = "PREMIUM";
  const locked =
    PLANES_ORDEN.indexOf(PLAN_USUARIO) < PLANES_ORDEN.indexOf(requierePlan);

  const kpis = useMemo(
    () => [
      { title: "Empresas rankeadas", value: "1,250", hint: "Últimas 24h" },
      { title: "Países", value: "45", hint: "Activos" },
      { title: "Sectores", value: "32", hint: "Clasificados" },
      { title: "Movimiento", value: "+4.2%", hint: "Semana" },
    ],
    []
  );

  const ranking = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        pos: i + 1,
        empresa: `Empresa Global ${i + 1}`,
        pais: ["CO", "MX", "US", "BR", "CL"][i % 5],
        imp: `$ ${(120 + i * 7).toFixed(1)}M`,
        exp: `$ ${(98 + i * 6.2).toFixed(1)}M`,
        variacion: `${i % 2 === 0 ? "+" : "-"}${(1.2 + i * 0.18).toFixed(1)}%`,
      })),
    []
  );

  const bars = useMemo(() => [35, 48, 28, 62, 52, 74, 58, 80, 66, 90], []);

  const planes = useMemo(
    () => [
      {
        plan: "BÁSICO",
        desc: "Acceso esencial al ecosistema.",
        perks: ["Feed básico", "Perfil empresarial"],
        cta: "Tu plan",
      },
      {
        plan: "PRO",
        desc: "Más visibilidad y beneficios.",
        perks: ["Recompensas PRO", "Mayor exposición"],
        cta: "Subir a PRO",
      },
      {
        plan: "PREMIUM",
        desc: "Datos avanzados + automatización.",
        perks: ["Top Mundial", "Notificaciones automáticas", "Reportes PDF"],
        cta: "Subir a PREMIUM",
        highlight: true,
      },
      {
        plan: "PLATINO",
        desc: "Máximo alcance + soporte prioritario.",
        perks: ["Todo Premium", "Soporte prioritario", "Marketplace destacado"],
        cta: "Subir a PLATINO",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        <main className="flex-1 relative overflow-hidden">
          {/* Fondo */}
          <div
            className="absolute inset-0 -z-40 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/fondo.png')" }}
          />
          <div className="absolute inset-0 -z-30 bg-gradient-to-br from-black/75 via-black/40 to-black/75" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(255,209,102,0.18),transparent_60%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(36,70,139,0.28),transparent_55%)]" />

          <div className="mx-auto w-full max-w-7xl px-6 py-10">
            {/* Header superior */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#ffd166]" />
                  Dashboard • Comercio internacional
                </div>

                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white drop-shadow">
                  Top Mundial{" "}
                  <span className="text-[#ffd166]">Importaciones & Exportaciones</span>
                </h1>

                <p className="mt-2 text-sm text-white/75 max-w-2xl">
                  Ranking global, comparativos y tendencias por país/sector.
                  Disponible desde{" "}
                  <span className="text-[#ffd166] font-semibold">PREMIUM</span>.
                </p>

                <div className="mt-4 h-1 w-56 rounded bg-[#ffd166]" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/90 backdrop-blur">
                  Plan actual: <strong className="text-white">{PLAN_USUARIO}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => setOpenPlans(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd166] px-5 py-2 text-sm font-semibold text-slate-900 shadow hover:brightness-95 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Mejorar plan
                </button>
              </div>
            </div>

            {/* GRID principal: KPIs + panel */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Panel grande */}
              <section className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Glow */}
                <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-[#ffd166]/10 blur-3xl" />
                <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#ffd166]/70 via-white/10 to-transparent" />

                <div className="relative p-6 md:p-7">
                  {/* Header panel */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                        <Lock className="w-6 h-6 text-white/85" />
                      </div>

                      <div>
                        <div className="text-xs tracking-[0.18em] font-semibold uppercase text-white/60">
                          {locked ? "Vista previa" : "Acceso habilitado"}
                        </div>
                        <div className="mt-1 text-lg md:text-xl font-extrabold text-white">
                          Ranking y tendencias globales
                        </div>

                        <p className="mt-2 text-sm text-white/75 max-w-2xl">
                          {locked ? (
                            <>
                              Desbloquea el tablero completo con{" "}
                              <span className="text-[#ffd166] font-semibold">
                                PREMIUM
                              </span>{" "}
                              o superior (ranking, filtros, exportación y reportes).
                            </>
                          ) : (
                            <>
                              Ya tienes acceso. Usa filtros, ranking completo y exporta reportes.
                            </>
                          )}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Chip text="País" />
                          <Chip text="Sector" />
                          <Chip text="Periodo" />
                          <Chip text="Exportar PDF" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
                        onClick={() => {}}
                      >
                        <Filter className="w-4 h-4" />
                        Filtros
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
                        onClick={() => {}}
                      >
                        <Download className="w-4 h-4" />
                        Exportar
                      </button>

                      {locked ? (
                        <button
                          type="button"
                          onClick={() => setOpenPlans(true)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#ffd166] px-4 py-2 text-sm font-extrabold text-slate-900 shadow hover:brightness-95 transition"
                        >
                          Mejorar
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => navigate("/top-mundial/dashboard")}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/90 px-4 py-2 text-sm font-extrabold text-white shadow hover:brightness-95 transition"
                        >
                          Abrir tablero
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* KPI row */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {kpis.map((k) => (
                      <Kpi key={k.title} title={k.title} value={k.value} hint={k.hint} locked={locked} />
                    ))}
                  </div>

                  {/* Graph + Table */}
                  <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
                    {/* Mini chart */}
                    <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <div className="text-sm font-semibold text-white/85">
                          Tendencia (últimos 10 periodos)
                        </div>
                        <span className="text-[11px] text-white/60">
                          {locked ? "Bloqueado" : "Actualizado"}
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="flex items-end gap-2 h-40">
                          {bars.map((h, idx) => (
                            <div key={idx} className="flex-1">
                              <div
                                className={[
                                  "w-full rounded-lg",
                                  locked
                                    ? "bg-white/15"
                                    : idx >= 7
                                    ? "bg-[#ffd166]/90"
                                    : "bg-white/30",
                                ].join(" ")}
                                style={{ height: `${h}%` }}
                              />
                              <div className="mt-2 text-[10px] text-white/55 text-center">
                                {idx + 1}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                          {locked ? (
                            <>Disponible desde <b className="text-[#ffd166]">PREMIUM</b>.</>
                          ) : (
                            <>Mejor periodo: <b className="text-[#ffd166]">#10</b> • Variación positiva.</>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Table with lock overlay only here */}
                    <div className="relative rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <div className="text-sm font-semibold text-white/85">
                          Top 10 Empresas (vista previa)
                        </div>
                        <span className="text-[11px] rounded-full px-2 py-0.5 border border-white/15 bg-white/5 text-white/70">
                          Ranking global
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-white/5 text-white/70">
                            <tr>
                              <Th>#</Th>
                              <Th>Empresa</Th>
                              <Th>País</Th>
                              <Th className="text-right">Importaciones</Th>
                              <Th className="text-right">Exportaciones</Th>
                              <Th className="text-right">Variación</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {ranking.map((r) => (
                              <tr
                                key={r.pos}
                                className="border-t border-white/10 text-white/80 hover:bg-white/5 transition"
                              >
                                <Td className="font-semibold">{r.pos}</Td>
                                <Td className="font-semibold">{r.empresa}</Td>
                                <Td className="text-white/70">{r.pais}</Td>
                                <Td className="text-right text-white/70">{r.imp}</Td>
                                <Td className="text-right text-white/70">{r.exp}</Td>
                                <Td className="text-right">
                                  <span
                                    className={[
                                      "inline-flex items-center rounded-full px-2 py-0.5 text-[12px] border",
                                      r.variacion.startsWith("+")
                                        ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                                        : "border-red-400/20 bg-red-500/10 text-red-200",
                                    ].join(" ")}
                                  >
                                    {r.variacion}
                                  </span>
                                </Td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* LOCK OVERLAY ONLY ON TABLE */}
                      {locked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
                          <div className="relative z-10 mx-6 w-full max-w-md rounded-2xl border border-[#ffd166]/25 bg-white/10 backdrop-blur-xl p-5 shadow-2xl">
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-11 rounded-2xl border border-white/15 bg-white/10 flex items-center justify-center">
                                <Lock className="w-6 h-6 text-white/90" />
                              </div>
                              <div>
                                <div className="text-sm font-extrabold text-white">
                                  Desbloquea el ranking completo
                                </div>
                                <div className="text-xs text-white/70">
                                  Disponible desde <b className="text-[#ffd166]">PREMIUM</b>.
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setOpenPlans(true)}
                              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd166] px-4 py-2 text-sm font-extrabold text-slate-900 shadow hover:brightness-95 transition"
                            >
                              Mejorar a PREMIUM
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Panel lateral (premium feel) */}
              <aside className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-6">
                  <div className="text-xs tracking-[0.18em] uppercase font-semibold text-white/60">
                    Tu acceso
                  </div>
                  <div className="mt-2 text-xl font-extrabold text-white">
                    {locked ? "Limitado" : "Completo"}
                  </div>
                  <div className="mt-2 text-sm text-white/75">
                    {locked
                      ? "Solo vista previa. Activa PREMIUM para ver ranking real, filtros y reportes."
                      : "Tienes acceso a filtros, ranking completo y exportación."}
                  </div>

                  <div className="mt-4 space-y-2">
                    <SideItem ok={!locked} text="Ranking completo" />
                    <SideItem ok={!locked} text="Filtros por país/sector" />
                    <SideItem ok={!locked} text="Exportación PDF/Excel" />
                    <SideItem ok={!locked} text="Alertas y tendencias" />
                  </div>

                  <button
                    onClick={() => setOpenPlans(true)}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd166] px-5 py-3 font-extrabold text-slate-900 shadow hover:brightness-95 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    Mejorar plan
                  </button>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-xl">
                  <div className="text-sm font-extrabold text-white">Tip rápido</div>
                  <p className="mt-2 text-sm text-white/70">
                    En <b className="text-[#ffd166]">PREMIUM</b> podrás comparar empresas por
                    país y exportar reportes para decisiones estratégicas.
                  </p>
                  <div className="mt-4 h-1 w-24 rounded bg-[#ffd166]" />
                </div>
              </aside>
            </div>
          </div>

          {/* MODAL PLANES */}
          {openPlans && (
            <Modal onClose={() => setOpenPlans(false)}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white">Mejorar tu plan</h3>
                  <p className="mt-1 text-sm text-white/70">
                    Para Top Mundial necesitas{" "}
                    <strong className="text-[#ffd166]">PREMIUM</strong> o superior.
                  </p>
                </div>

                <button
                  onClick={() => setOpenPlans(false)}
                  className="h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80"
                  title="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {planes.map((p) => {
                  const isCurrent = p.plan === PLAN_USUARIO;
                  const isRecommended = p.plan === requierePlan;

                  return (
                    <div
                      key={p.plan}
                      className={[
                        "rounded-2xl border bg-white/5 backdrop-blur p-4",
                        "border-white/10",
                        isRecommended ? "ring-1 ring-[#ffd166]/45" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-extrabold text-white">{p.plan}</div>
                        {isCurrent && (
                          <span className="text-[11px] rounded-full bg-[#ffd166]/20 border border-[#ffd166]/30 px-2 py-0.5 text-[#ffd166]">
                            Actual
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-xs text-white/65">{p.desc}</div>

                      <div className="mt-3 space-y-1.5">
                        {p.perks.map((k) => (
                          <div key={k} className="flex items-center gap-2 text-xs text-white/80">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-200">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span>{k}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={isCurrent}
                        onClick={() => {
                          setOpenPlans(false);
                          navigate("/suscripcion"); // ajusta si tu ruta es otra
                        }}
                        className={[
                          "mt-4 w-full rounded-xl px-4 py-2 text-sm font-extrabold shadow transition",
                          isCurrent
                            ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                            : isRecommended
                            ? "bg-[#ffd166] text-slate-900 hover:brightness-95"
                            : "bg-white/10 text-white/80 hover:bg-white/15 border border-white/10",
                        ].join(" ")}
                      >
                        {isCurrent ? "Tu plan" : p.cta}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setOpenPlans(false)}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
                >
                  Ahora no
                </button>

                <button
                  onClick={() => {
                    setOpenPlans(false);
                    navigate("/suscripcion");
                  }}
                  className="rounded-xl bg-[#ffd166] px-5 py-2 text-sm font-extrabold text-slate-900 shadow hover:brightness-95 transition"
                >
                  Ver planes y precios
                </button>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Chip({ text }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75">
      {text}
    </span>
  );
}

function Kpi({ title, value, hint, locked }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/55 font-semibold">
        {title}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-white">
        {locked ? "—" : value}
      </div>
      <div className="mt-1 text-xs text-white/60">
        {locked ? "Disponible en PREMIUM" : hint}
      </div>
    </div>
  );
}

function SideItem({ ok, text }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={[
          "inline-flex h-6 w-6 items-center justify-center rounded-full border",
          ok
            ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
            : "bg-white/5 border-white/10 text-white/50",
        ].join(" ")}
      >
        {ok ? "✓" : "•"}
      </span>
      <span className={ok ? "text-white/85" : "text-white/55"}>{text}</span>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`px-4 py-3 text-left font-semibold ${className}`}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-7">
        {children}
      </div>
    </div>
  );
}
