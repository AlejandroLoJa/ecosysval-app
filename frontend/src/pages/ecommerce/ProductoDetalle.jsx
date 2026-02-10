// src/pages/ecommerce/ProductoDetalle.jsx
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, ShieldCheck, FileText } from "lucide-react";
import EcomLayout from "./_EcomLayout";
import { productosMock } from "../../data/ecommerceMock";

export default function ProductoDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(() => productosMock.find((x) => x.id === id), [id]);

  if (!item) {
    return (
      <EcomLayout title="Producto no encontrado" subtitle="Verifica el ID">
        <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-8 text-white/80">
          No existe el producto/servicio solicitado.
          <div className="mt-4">
            <button
              onClick={() => navigate("/ecommerce/marketplace")}
              className="rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition"
            >
              Volver al Marketplace
            </button>
          </div>
        </div>
      </EcomLayout>
    );
  }

  return (
    <EcomLayout
      title={item.nombre}
      subtitle={`${item.tipo} • ${item.categoria} • ${item.incoterm}`}
      rightSlot={
        <button
          onClick={() => navigate(-1)}
          className="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-3 text-white/90 shadow-lg inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6">
          <div className="text-white/70 text-sm">
            <span className="font-semibold text-white">Descripción</span>
          </div>
          <p className="mt-2 text-white/85 whitespace-pre-wrap leading-relaxed">
            {item.descripcion}
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-3">
            <Info label="Precio base" value={formatMoney(item.precioBase, item.moneda)} />
            <Info label="Unidad" value={item.unidad} />
            <Info label="Stock" value={`${item.stock}`} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip text={`Rating: ${item.rating}`} />
            <Chip text={`Incoterm: ${item.incoterm}`} />
            <Chip text={`País: ${item.pais}`} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/ecommerce/cotizaciones", { state: { selectedId: item.id } })}
              className="rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition inline-flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Generar cotización
            </button>

            <button
              onClick={() => navigate("/ecommerce/checkout", { state: { selectedId: item.id } })}
              className="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-5 py-3 text-white/90 shadow-lg"
            >
              Ir a checkout (mock)
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-6 h-fit">
          <div className="text-white font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            Proveedor
          </div>

          <div className="mt-3">
            <div className="text-white font-extrabold">
              {item.proveedor.nombre}{" "}
              {item.proveedor.verificado && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300 ml-2">
                  <BadgeCheck className="w-4 h-4" /> Verificado
                </span>
              )}
            </div>
            <div className="text-white/60 text-sm mt-1">
              {item.proveedor.ciudad}, {item.proveedor.estado}
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <Info label="Cumplimiento" value={`${item.proveedor.cumplimiento}%`} />
            <Info label="Entrega a MX" value={`${item.tiemposEntrega.MX} días`} />
            <Info label="Entrega a US" value={`${item.tiemposEntrega.US} días`} />
            <Info label="Entrega a CA" value={`${item.tiemposEntrega.CA} días`} />
          </div>

          <button
            onClick={() => navigate("/ecommerce/comparador")}
            className="mt-6 w-full rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-5 py-3 text-white/90 shadow-lg"
          >
            Comparar proveedores
          </button>
        </aside>
      </section>
    </EcomLayout>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
      <div className="text-white/60 text-[11px]">{label}</div>
      <div className="text-white font-bold mt-0.5">{value}</div>
    </div>
  );
}

function Chip({ text }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
      {text}
    </span>
  );
}

function formatMoney(v, currency) {
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(v);
  } catch {
    return `${currency} ${v}`;
  }
}
