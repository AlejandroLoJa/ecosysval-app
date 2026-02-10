// src/pages/ecommerce/EcommerceHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, BarChart3, Scale, FileText } from "lucide-react";
import EcomLayout from "./_EcomLayout";

export default function EcommerceHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Marketplace B2B",
      desc: "Explora productos/servicios por país, sector, precio y proveedor.",
      icon: <ShoppingCart className="w-5 h-5" />,
      to: "/ecommerce/marketplace",
      color: "from-blue-600/25 to-blue-400/10",
    },
    {
      title: "Cotizaciones inteligentes",
      desc: "Cotiza por volumen, entrega estimada, tipo de cambio y logística.",
      icon: <FileText className="w-5 h-5" />,
      to: "/ecommerce/cotizaciones",
      color: "from-yellow-500/25 to-yellow-300/10",
    },
    {
      title: "Comparador de proveedores",
      desc: "Compara precio, lead time, verificación y cumplimiento.",
      icon: <Scale className="w-5 h-5" />,
      to: "/ecommerce/comparador",
      color: "from-emerald-500/25 to-emerald-300/10",
    },
    {
      title: "Analytics",
      desc: "Resumen de compras, ventas, ahorro y desempeño (demo).",
      icon: <BarChart3 className="w-5 h-5" />,
      to: "/ecommerce/analytics",
      color: "from-violet-500/25 to-violet-300/10",
    },
  ];

  return (
    <EcomLayout
      title="E-commerce • Marketplace B2B Inteligente"
      subtitle="Compra, vende y negocia con información estratégica (MX • US • CA)."
      rightSlot={
        <button
          onClick={() => navigate("/ecommerce/marketplace")}
          className="rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition"
        >
          Ir al Marketplace
        </button>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.title}
            onClick={() => navigate(c.to)}
            className="text-left rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-5 hover:bg-black/65 transition"
          >
            <div className={`rounded-2xl p-3 w-fit bg-gradient-to-br ${c.color} border border-white/10`}>
              <div className="text-white/90">{c.icon}</div>
            </div>

            <div className="mt-4">
              <div className="text-white font-bold">{c.title}</div>
              <div className="text-white/60 text-sm mt-1">{c.desc}</div>
            </div>
          </button>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
        <div className="text-white font-bold">Qué hace “pro” este E-commerce</div>
        <ul className="mt-3 grid gap-2 md:grid-cols-2 text-white/70 text-sm">
          <li>• Cotización por volumen + logística estimada</li>
          <li>• Comparador de proveedores con cumplimiento</li>
          <li>• Multi-país y multi-moneda (MXN/USD/CAD)</li>
          <li>• Base para crédito, pagos y tracking (fase 2)</li>
        </ul>
      </section>
    </EcomLayout>
  );
}
