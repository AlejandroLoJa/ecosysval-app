// src/data/ecommerceMock.js
export const PAISES = [
  { code: "MX", name: "México", currency: "MXN" },
  { code: "US", name: "Estados Unidos", currency: "USD" },
  { code: "CA", name: "Canadá", currency: "CAD" },
];

// tipo de cambio mock (luego lo reemplazas con API real)
export const FX_MOCK = {
  USD_MXN: 17.2,
  USD_CAD: 1.35,
  CAD_MXN: 12.75,
};

export const categorias = [
  "Madera",
  "Acero",
  "Textil",
  "Logística",
  "Consultoría",
  "Insumos",
];

export const productosMock = [
  {
    id: "p-1001",
    tipo: "Producto",
    nombre: "Madera refinada premium",
    categoria: "Madera",
    pais: "MX",
    moneda: "MXN",
    precioBase: 8500,
    unidad: "Tonelada",
    stock: 120,
    incoterm: "EXW",
    rating: 4.6,
    proveedor: {
      id: "prov-01",
      nombre: "Maderas del Centro",
      ciudad: "CDMX",
      estado: "CDMX",
      verificado: true,
      cumplimiento: 95,
    },
    tiemposEntrega: { MX: 2, US: 6, CA: 7 },
    descripcion:
      "Madera refinada para manufactura industrial. Calidad certificada, lotes consistentes, despacho semanal.",
  },
  {
    id: "p-1002",
    tipo: "Producto",
    nombre: "Acero laminado 304",
    categoria: "Acero",
    pais: "US",
    moneda: "USD",
    precioBase: 1100,
    unidad: "Tonelada",
    stock: 80,
    incoterm: "FOB",
    rating: 4.4,
    proveedor: {
      id: "prov-02",
      nombre: "Pacific Steel Supply",
      ciudad: "San Diego",
      estado: "CA",
      verificado: true,
      cumplimiento: 92,
    },
    tiemposEntrega: { MX: 7, US: 3, CA: 5 },
    descripcion:
      "Acero laminado tipo 304. Ideal para industria alimentaria y manufactura. Certificados bajo pedido.",
  },
  {
    id: "p-1003",
    tipo: "Servicio",
    nombre: "Transporte terrestre cross-border",
    categoria: "Logística",
    pais: "MX",
    moneda: "MXN",
    precioBase: 4500,
    unidad: "Servicio",
    stock: 999,
    incoterm: "DDP",
    rating: 4.7,
    proveedor: {
      id: "prov-03",
      nombre: "Transporte del Sur",
      ciudad: "Tuxtla",
      estado: "Chiapas",
      verificado: false,
      cumplimiento: 88,
    },
    tiemposEntrega: { MX: 2, US: 4, CA: 6 },
    descripcion:
      "Servicio logístico con seguimiento. Cobertura nacional y rutas a frontera. Cotización por volumen y destino.",
  },
  {
    id: "p-1004",
    tipo: "Producto",
    nombre: "Textil industrial anti-flama",
    categoria: "Textil",
    pais: "CA",
    moneda: "CAD",
    precioBase: 78,
    unidad: "Metro",
    stock: 1500,
    incoterm: "CIF",
    rating: 4.3,
    proveedor: {
      id: "prov-04",
      nombre: "North Fabric Works",
      ciudad: "Toronto",
      estado: "ON",
      verificado: true,
      cumplimiento: 90,
    },
    tiemposEntrega: { MX: 9, US: 6, CA: 3 },
    descripcion:
      "Textil industrial anti-flama para uniformes y seguridad. Certificaciones bajo norma, ficha técnica incluida.",
  },
];

// Proveedores alternos para comparador
export const proveedoresMock = [
  {
    id: "prov-01",
    nombre: "Maderas del Centro",
    pais: "MX",
    rating: 4.6,
    verificado: true,
    leadTimeDias: 2,
    cumplimiento: 95,
    precioRelativo: 0.98,
  },
  {
    id: "prov-05",
    nombre: "Forest Prime",
    pais: "US",
    rating: 4.2,
    verificado: true,
    leadTimeDias: 5,
    cumplimiento: 89,
    precioRelativo: 1.05,
  },
  {
    id: "prov-06",
    nombre: "Maple Wood Supply",
    pais: "CA",
    rating: 4.4,
    verificado: false,
    leadTimeDias: 6,
    cumplimiento: 85,
    precioRelativo: 0.95,
  },
];
