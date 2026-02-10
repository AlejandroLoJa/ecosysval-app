// src/pages/ecommerce/_EcomLayout.jsx
import React from "react";
import MainHeader from "../../components/MainHeader";
import SidebarMenu from "../../components/SidebarMenu";

export default function EcomLayout({ title, subtitle, rightSlot, children }) {
  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <MainHeader />

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 text-white shadow-lg hidden md:block">
          <SidebarMenu />
        </aside>

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="rounded-3xl border border-white/10 bg-black/65 backdrop-blur-xl shadow-xl px-6 py-4">
                <h1 className="text-white font-extrabold text-lg md:text-xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-white/60 text-sm mt-1">{subtitle}</p>
                )}
              </div>

              {rightSlot && (
                <div className="flex items-center justify-end gap-2">
                  {rightSlot}
                </div>
              )}
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
