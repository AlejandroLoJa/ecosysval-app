import React from "react";
import Mapa from "../components/Mapa";
import SidebarMenu from "../components/SidebarMenu";
import { Bell, MessageSquare } from "lucide-react";

export default function MapaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ======= BARRA SUPERIOR ======= */}
      <header className="bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
        {/* Logo OMEC */}
        <div className="font-bold text-xl">OMEC</div>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar..."
          className="w-1/2 px-4 py-2 rounded-full text-black focus:outline-none"
        />

        {/* Iconos de mensajes, notificaciones y perfil */}
        <div className="flex items-center gap-6">
          <MessageSquare className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          <Bell className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="font-semibold">Alejandro Lopez</span>
            <img
              src="/avatar.png" // Imagen del perfil en /public
              alt="Usuario"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </div>
      </header>

      {/* ======= CONTENIDO PRINCIPAL ======= */}
      <div className="flex flex-1 pt-14">
        {/* ======= MENÚ LATERAL ======= */}
        <aside className="w-64 bg-blue-900 text-white shadow-lg">
          <SidebarMenu />
        </aside>

        {/* ======= CONTENIDO DEL MAPA ======= */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Ubicación de Empresas</h1>
          <Mapa />
        </main>
      </div>
    </div>
  );
}
