// src/pages/ecommerce/Marketplace.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, BadgeCheck, MapPin } from "lucide-react";
import EcomLayout from "./_EcomLayout";
import { PAISES, categorias, productosMock } from "../../data/ecommerceMock";

export default function Marketplace() {
  const navigate = useNavigate();

  const [pais, setPais] = useState("MX");
  const [tipo, setTipo] = useState("Todos");
  const [categoria, setCategoria] = useState("Todas");
  const [q, setQ] = useState("");

  const currency = PAISES.find((p) => p.code === pais)?.currency || "MXN";

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return productosMock
      .filter((x) => (pais ? x.pais === pais : true))
      .filter((x) => (tipo === "Todos" ? true : x.tipo === tipo))
      .filter((x) => (categoria === "Todas" ? true : x.categoria === categoria))
      .filter((x) => {
        if (!term) return true;
        return (
          x.nombre.toLowerCase().includes(term) ||
          x.categoria.toLowerCase().includes(term) ||
          x.proveedor.nombre.toLowerCase().includes(term)
        );
      });
  }, [pais, tipo, categoria, q]);

  return (
    <EcomLayout
      title="Marketplace B2B"
      subtitle="Explora ofertas por país, sector, proveedor y tipo."
      rightSlot={
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/ecommerce/cotizaciones")}
            className="rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 transition px-4 py-3 text-white/90 shadow-lg"
          >
            Ir a Cotizaciones
          </button>
          <button
            onClick={() => navigate("/ecommerce/comparador")}
            className="rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-95 transition"
          >
            Comparador
          </button>
        </div>
      }
    >
      {/* filtros */}
      <section className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-5">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="w-4 h-4 text-white/50 absolute left-3 top-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar productos, servicios, proveedor..."
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white/90 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-yellow-300/70"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-flex items-center gap-2 text-white/70 text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros:
            </span>

            <select
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
            >
              {PAISES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} ({p.currency})
                </option>
              ))}
            </select>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
            >
              <option>Todos</option>
              <option>Producto</option>
              <option>Servicio</option>
            </select>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="rounded-2xl px-3 py-2 bg-white/90 text-slate-900 text-sm outline-none focus:ring-2 focus:ring-yellow-300/70"
            >
              <option>Todas</option>
              {categorias.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 text-white/60 text-sm">
          Mostrando <span className="text-white font-semibold">{items.length}</span> resultados en{" "}
          <span className="text-white font-semibold">{pais}</span> • Moneda:{" "}
          <span className="text-yellow-300 font-semibold">{currency}</span>
        </div>
      </section>

      {/* grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((x) => (
          <article
            key={x.id}
            className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-xl p-5 hover:bg-black/65 transition cursor-pointer"
            onClick={() => navigate(`/ecommerce/producto/${x.id}`)}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-white/60 text-xs">
                  {x.tipo} • {x.categoria} • {x.incoterm}
                </div>
                <div className="text-white font-bold mt-1 truncate">{x.nombre}</div>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/80">
                ⭐ {x.rating}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-white/90">
                <div className="text-white/60 text-[11px]">Precio base</div>
                <div className="font-extrabold">
                  {formatMoney(x.precioBase, x.moneda)}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-white/90">
                <div className="text-white/60 text-[11px]">Unidad</div>
                <div className="font-semibold">{x.unidad}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-white/80 text-sm font-semibold truncate flex items-center gap-1">
                  {x.proveedor.verificado && <BadgeCheck className="w-4 h-4 text-emerald-300" />}
                  {x.proveedor.nombre}
                </div>
                <div className="text-white/60 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {x.proveedor.ciudad}, {x.proveedor.estado}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/ecommerce/cotizaciones", { state: { selectedId: x.id } });
                }}
                className="rounded-2xl bg-yellow-400 px-4 py-2 text-xs font-semibold text-slate-900 shadow hover:brightness-95 transition"
              >
                Cotizar
              </button>
            </div>
          </article>
        ))}
      </section>
    </EcomLayout>
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
