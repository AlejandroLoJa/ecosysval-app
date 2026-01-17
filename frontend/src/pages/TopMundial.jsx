// src/pages/TopMundial.jsx
import React from "react";
import { Lock } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";

const PLAN_USUARIO = "BÁSICO"; // luego lo traes del backend o contexto

export default function TopMundial() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER GLOBAL */}
      <MainHeader />

      {/* LAYOUT CON SIDEBAR + CONTENIDO */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main
          className="flex-1 p-6 overflow-y-auto relative"
          style={{
            backgroundImage: "url('/fondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* capa blanca muy suave encima del fondo */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] -z-10" />

          {/* título principal */}
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Top mundial de importaciones y exportaciones
          </h1>

          {/* tarjeta azul de sección bloqueada */}
          <section className="rounded-2xl bg-[#24468b] text-white shadow-xl overflow-hidden border border-white/10">
            {/* fondo de hexágonos suave dentro de la tarjeta */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "url('/fondo.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative px-8 py-8 flex flex-col gap-4">
              {/* cabecera de la tarjeta */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs tracking-[0.18em] font-semibold uppercase text-white/70">
                      Sección bloqueada
                    </span>
                    <span className="text-sm text-white/80">
                      Acceso restringido según tu plan de suscripción.
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    <span className="text-white/80">Plan actual:</span>
                    <strong className="uppercase">{PLAN_USUARIO}</strong>
                  </span>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#ffcf43] px-4 py-1.5 text-[11px] font-semibold text-[#24468b] shadow hover:brightness-105 transition"
                  >
                    Mejorar plan
                  </button>
                </div>
              </div>

              {/* línea divisoria */}
              <div className="h-px w-full bg-white/25 my-2" />

              {/* texto descriptivo */}
              <p className="text-sm text-white/90 max-w-2xl">
                Esta funcionalidad es exclusiva para cuentas afiliadas con{" "}
                <span className="font-semibold text-[#ffcf43]">
                  plan PREMIUM
                </span>{" "}
                o superior. Para acceder al ranking global de empresas, debes
                mejorar tu plan de suscripción.
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ffcf43] px-5 py-2 text-sm font-semibold text-[#24468b] shadow-md hover:brightness-105 transition"
                >
                  Mejorar a plan PREMIUM
                  <span className="text-lg leading-none">↗</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
