// src/pages/Recompensas.jsx
import React, { useMemo, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";
import { X, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PLANES_ORDEN = ["BÁSICO", "PRO", "PREMIUM", "PLATINO"];

// 🔧 Cambia esto luego por el plan real del usuario (desde backend o contexto)
const PLAN_USUARIO = "BÁSICO";

const recompensasData = [
  {
    id: 1,
    titulo: "Programas de reconocimientos",
    descripcion:
      "Permite la creación de distintos programas para reconocer los avances en el bienestar de los miembros del Ecosistema.",
    plan: "PRO",
  },
  {
    id: 2,
    titulo: "Descuentos destacados",
    descripcion:
      "Muestra de manera más destacada los convenios que se quieren potenciar dentro del Ecosistema.",
    plan: "PRO",
  },
  {
    id: 3,
    titulo: "Notificaciones automáticas",
    descripcion:
      "Envío de notificaciones al usuario luego de una transacción en la plataforma.",
    plan: "PREMIUM",
  },
  {
    id: 4,
    titulo: "Marketplace personalizado",
    descripcion:
      "Beneficios flexibles a tu medida ofrecidos por las empresas del Ecosistema.",
    plan: "PREMIUM",
  },
  {
    id: 5,
    titulo: "Descuentos en el muro",
    descripcion:
      "Las principales colecciones en el muro social para aumentar su visibilidad.",
    plan: "PLATINO",
  },
];

function chipByPlan(plan) {
  switch (plan) {
    case "PRO":
      return "bg-sky-500/15 text-sky-200 border-sky-500/30";
    case "PREMIUM":
      return "bg-amber-400/15 text-amber-200 border-amber-400/35";
    case "PLATINO":
      return "bg-slate-200/10 text-slate-100 border-slate-200/25";
    default:
      return "bg-slate-400/10 text-slate-200 border-slate-400/20";
  }
}

function ringByPlan(plan) {
  switch (plan) {
    case "PRO":
      return "ring-sky-400/25";
    case "PREMIUM":
      return "ring-amber-400/25";
    case "PLATINO":
      return "ring-slate-200/25";
    default:
      return "ring-white/10";
  }
}

function prettyPlan(plan) {
  if (plan === "BÁSICO") return { accent: "text-slate-200", border: "border-white/10" };
  if (plan === "PRO") return { accent: "text-sky-200", border: "border-sky-500/25" };
  if (plan === "PREMIUM") return { accent: "text-amber-200", border: "border-amber-400/25" };
  return { accent: "text-slate-100", border: "border-slate-200/20" }; // PLATINO
}

export default function Recompensas() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const idxUser = PLANES_ORDEN.indexOf(PLAN_USUARIO);

  // Features comparativas (puedes ajustar textos)
  const tabla = useMemo(() => {
    const features = [
      {
        key: "feed",
        label: "Acceso a feed / muro social",
        min: "BÁSICO",
      },
      {
        key: "reconocimientos",
        label: "Programas de reconocimientos",
        min: "PRO",
      },
      {
        key: "destacados",
        label: "Descuentos destacados (mayor visibilidad)",
        min: "PRO",
      },
      {
        key: "notificaciones",
        label: "Notificaciones automáticas",
        min: "PREMIUM",
      },
      {
        key: "marketplace",
        label: "Marketplace personalizado",
        min: "PREMIUM",
      },
      {
        key: "colecciones",
        label: "Colecciones y descuentos en el muro",
        min: "PLATINO",
      },
      {
        key: "soporte",
        label: "Soporte prioritario",
        min: "PLATINO",
      },
    ];

    const included = (plan, min) => PLANES_ORDEN.indexOf(plan) >= PLANES_ORDEN.indexOf(min);

    return { features, included };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        <main className="flex-1 relative overflow-hidden">
          {/* Fondo SOLO en contenido */}
          <div
            className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/fondo.png')" }}
          />
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,209,102,0.18),transparent_55%)]" />

          <section className="mx-auto w-full max-w-6xl px-6 py-10">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
                  Recompensas del <span className="text-[#ffd166]">Ecosistema</span>
                </h1>
                <p className="mt-2 max-w-2xl text-white/75 text-sm leading-relaxed">
                  Explora los beneficios disponibles según tu plan. Las recompensas
                  bloqueadas se activan al mejorar tu suscripción.
                </p>
                <div className="mt-4 h-1 w-44 rounded bg-[#ffd166]" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/90 backdrop-blur">
                  Plan actual: <strong className="text-white">{PLAN_USUARIO}</strong>
                </span>

                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ffd166] px-5 py-2 text-sm font-semibold text-slate-900 shadow hover:brightness-95 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Mejorar plan
                </button>
              </div>
            </div>

            {/* Contenedor glass */}
            <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {recompensasData.map((item) => {
                  const locked = idxUser < PLANES_ORDEN.indexOf(item.plan);
                  const chip = chipByPlan(item.plan);
                  const ring = ringByPlan(item.plan);

                  return (
                    <article
                      key={item.id}
                      className={[
                        "relative flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
                        "p-5 shadow-sm transition-all duration-200",
                        "hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-xl",
                        locked ? "" : `ring-1 ${ring}`,
                      ].join(" ")}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#ffd166]/60 via-white/10 to-transparent" />

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={[
                              "flex h-10 w-10 items-center justify-center rounded-full border",
                              locked
                                ? "bg-white/5 text-white/40 border-white/10"
                                : "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
                            ].join(" ")}
                          >
                            <span className="text-lg">{locked ? "🔒" : "✅"}</span>
                          </div>

                          <h2 className="text-sm font-semibold text-white truncate">
                            {item.titulo}
                          </h2>
                        </div>

                        <span
                          className={[
                            "shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium",
                            chip,
                          ].join(" ")}
                        >
                          {item.plan}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-white/75 leading-relaxed">
                        {item.descripcion}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-[11px] text-white/55">
                          Disponible en{" "}
                          <span className="text-white/80 font-semibold">{item.plan}</span>
                        </span>

                        {locked ? (
                          <span className="text-[11px] text-white/45">
                            Requiere actualización
                          </span>
                        ) : (
                          <span className="text-[11px] text-emerald-300/90">
                            Activo
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* MODAL */}
          {modalOpen && (
            <Modal onClose={() => setModalOpen(false)}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    Mejorar tu plan
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    Compara beneficios y elige el plan ideal para tu organización.
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80"
                  title="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Resumen planes */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PLANES_ORDEN.map((p) => {
                  const isCurrent = p === PLAN_USUARIO;
                  const meta = prettyPlan(p);
                  return (
                    <div
                      key={p}
                      className={[
                        "rounded-2xl border bg-white/5 backdrop-blur p-4",
                        meta.border,
                        isCurrent ? "ring-1 ring-[#ffd166]/40" : "border-white/10",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`text-sm font-bold ${meta.accent}`}>{p}</div>
                        {isCurrent && (
                          <span className="text-[11px] rounded-full bg-[#ffd166]/20 border border-[#ffd166]/30 px-2 py-0.5 text-[#ffd166]">
                            Actual
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-xs text-white/65">
                        {p === "BÁSICO" && "Acceso esencial al ecosistema."}
                        {p === "PRO" && "Más visibilidad y reconocimientos."}
                        {p === "PREMIUM" && "Automatización y personalización."}
                        {p === "PLATINO" && "Máximo alcance + soporte prioritario."}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Comparativo */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                <div className="grid grid-cols-[1fr_repeat(4,110px)] gap-0">
                  <div className="px-4 py-3 text-xs font-semibold text-white/70 border-b border-white/10">
                    Beneficio
                  </div>
                  {PLANES_ORDEN.map((p) => (
                    <div
                      key={p}
                      className="px-3 py-3 text-xs font-semibold text-white/80 border-b border-white/10 text-center"
                    >
                      {p}
                    </div>
                  ))}

                  {tabla.features.map((f) => (
                    <React.Fragment key={f.key}>
                      <div className="px-4 py-3 text-sm text-white/85 border-b border-white/10">
                        {f.label}
                      </div>

                      {PLANES_ORDEN.map((plan) => {
                        const ok = tabla.included(plan, f.min);
                        const isCurrent = plan === PLAN_USUARIO;
                        return (
                          <div
                            key={`${f.key}-${plan}`}
                            className={[
                              "px-3 py-3 border-b border-white/10 text-center",
                              isCurrent ? "bg-white/[0.04]" : "",
                            ].join(" ")}
                          >
                            {ok ? (
                              <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-200">
                                <Check className="w-4 h-4" />
                              </span>
                            ) : (
                              <span className="text-white/35 text-sm">—</span>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
                >
                  Ahora no
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      navigate("/suscripcion"); // cámbialo si tienes otra ruta
                    }}
                    className="rounded-xl bg-[#ffd166] px-5 py-2 text-sm font-extrabold text-slate-900 shadow hover:brightness-95 transition"
                  >
                    Ver planes y precios
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- Modal reusable ---------- */
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
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* panel */}
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-7">
        {children}
      </div>
    </div>
  );
}
