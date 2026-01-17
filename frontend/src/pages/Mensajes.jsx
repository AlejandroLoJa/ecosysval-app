// src/pages/Mensajes.jsx
import React from "react";
import SidebarMenu from "../components/SidebarMenu";
import MainHeader from "../components/MainHeader";
import { mensajesMock } from "../data/mensajesMock";

export default function Mensajes() {
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
          <section className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Mensajes
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Revisa y gestiona los mensajes de tus socios y contactos dentro del ecosistema.
            </p>

            {mensajesMock.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                No tienes mensajes por el momento.
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                {mensajesMock.map((msg, idx) => (
                  <article
                    key={msg.id}
                    className={`px-5 py-4 flex justify-between gap-4 ${
                      idx !== mensajesMock.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } ${
                      !msg.leido ? "bg-blue-50/40" : "bg-white"
                    } hover:bg-blue-50/70 transition-colors cursor-pointer`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {msg.remitente}
                      </p>
                      <p className="text-xs font-semibold text-blue-700 truncate">
                        {msg.asunto}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {msg.preview}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-[11px] text-gray-400">{msg.tiempo}</p>
                      {!msg.leido && (
                        <span className="mt-2 inline-block text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
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
