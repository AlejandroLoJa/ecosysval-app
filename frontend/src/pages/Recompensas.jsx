// src/pages/Recompensas.jsx
import React from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

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

function getColorByPlan(plan) {
  switch (plan) {
    case "PRO":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "PREMIUM":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "PLATINO":
      return "bg-slate-100 text-slate-700 border-slate-300";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export default function Recompensas() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER GLOBAL (buscador, notificaciones, usuario, etc.) */}
      <MainHeader />

      {/* CONTENEDOR PRINCIPAL CON SIDEBAR + FONDO */}
      <div
        className="flex flex-1"
        style={{
          backgroundImage: "url('/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* MENÚ LATERAL */}
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>

        {/* CONTENIDO RECOMPENSAS */}
        <main className="flex-1 p-6 flex justify-center">
          <section className="w-full max-w-6xl rounded-2xl bg-white/90 backdrop-blur-sm shadow-md p-6">
            {/* Texto + barra de plan actual / mejorar plan */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-xs text-slate-500 max-w-xl">
                Explora los beneficios disponibles según tu plan de
                suscripción. Las recompensas bloqueadas se activan al mejorar tu
                plan.
              </p>

              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 border border-blue-100">
                  Plan actual: <strong>{PLAN_USUARIO}</strong>
                </span>
                <button className="rounded-full bg-yellow-400 px-4 py-1.5 font-medium text-slate-900 shadow hover:bg-yellow-300 transition-colors">
                  Mejorar plan
                </button>
              </div>
            </div>

            {/* GRID DE RECOMPENSAS */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {recompensasData.map((item) => {
                const locked =
                  PLANES_ORDEN.indexOf(PLAN_USUARIO) <
                  PLANES_ORDEN.indexOf(item.plan);

                const badgeClasses = getColorByPlan(item.plan);

                return (
                  <article
                    key={item.id}
                    className={`relative flex flex-col rounded-2xl border bg-white/95 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      locked ? "" : "ring-1 ring-emerald-200"
                    }`}
                  >
                    {/* Icono de estado */}
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${
                          locked
                            ? "bg-slate-50 text-slate-400"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {locked ? "🔒" : "✅"}
                      </div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        {item.titulo}
                      </h2>
                    </div>

                    <p className="mb-4 text-xs text-slate-600 leading-relaxed">
                      {item.descripcion}
                    </p>

                    {/* Chip de plan */}
                    <div className="mt-auto flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${badgeClasses}`}
                      >
                        Disponible en plan {item.plan}
                      </span>

                      {locked && (
                        <span className="text-[11px] text-slate-400">
                          Requiere actualización
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
