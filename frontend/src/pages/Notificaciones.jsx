// src/pages/Notificaciones.jsx
import React from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";
import { notificacionesMock } from "../data/notificacionesMock";

export default function Notificaciones() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader title="ECOSYSVAL" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <section className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Notificaciones
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Aquí puedes revisar las últimas notificaciones de tu ecosistema.
            </p>

            {notificacionesMock.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                No tienes notificaciones por el momento.
              </div>
            ) : (
              <div className="space-y-3">
                {notificacionesMock.map((notif) => (
                  <article
                    key={notif.id}
                    className={`bg-white rounded-xl shadow-sm border px-4 py-3 flex justify-between items-start gap-4`}
                  >
                    <div>
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-1">
                        {notif.tipo}
                      </span>
                      <p className="font-semibold text-sm text-gray-900">
                        {notif.empresa}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {notif.detalle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-gray-400">
                        {notif.tiempo}
                      </p>
                      {!notif.leido && (
                        <span className="mt-1 inline-block text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
