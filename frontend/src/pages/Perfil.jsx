import React, { useEffect, useState } from "react";
import { Camera, Building2 } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";

export default function Perfil() {
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    // Datos simulados
    setEmpresa({
      razonSocial: "Observatorio Mexicano de la Crisis",
      correo: "omecmx@gmail.com",
      ambito: "Financiero",
      ubicacion: "Ciudad de México",
      representante: "Artemisa Sylvan",
      paginaWeb: "observatoriomexicanodelacrisis.org",
      logo: "",
      volumenVentas: "1.000.000 - 5.000.000 MXN",
      empleados: 590,
      antiguedad: "Más de 10 años",
      mision: "Constituir un sistema sustentable de creación de valor a partir de la interconexión de cadenas productivas.",
      vision: "Ser la red que garantice el bienestar integral y sostenido de nuestros socios y comunidades.",
      sucursales: "/",
      socios: "/",
      importaciones: false,
      exportaciones: true,
      productos: "/",
      servicios: "/",
      objetivos: "/",
      stats: { compras: 1, ventas: 2, restantes: 2 },
    });
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEmpresa({ ...empresa, logo: url });
    }
  };

  if (!empresa) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-800 font-semibold">
        Cargando información empresarial...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ======= BARRA SUPERIOR ======= */}
      <header className="bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="font-bold text-xl">OMEC</div>
        <input
          type="text"
          placeholder="Buscar..."
          className="w-1/2 px-4 py-2 rounded-full text-black focus:outline-none"
        />
        <div className="flex items-center gap-4">
          <span className="font-semibold">Alejandro Lopez</span>
          <img
            src="/avatar.png"
            alt="Usuario"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </header>

      <div className="flex flex-1 pt-14">
        {/* ======= MENÚ LATERAL ======= */}
        <aside className="w-64 h-screen bg-blue-900 text-white shadow-lg overflow-y-auto">
          <SidebarMenu />
        </aside>


        {/* ======= CONTENIDO PRINCIPAL ======= */}
        <main
          className="flex-1 p-6 flex gap-6"
          style={{
            backgroundImage: "url('/fondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* ======= FORMULARIO PERFIL ======= */}
          <section className="flex-1 space-y-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Perfil Empresarial
              </h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">
                Descargar
              </button>
            </div>

            {/* Información principal */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Razón social</p>
                <p className="font-normal">{empresa.razonSocial}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Correo electrónico</p>
                <p className="font-normal break-all">{empresa.correo}</p>
              </div>

              {/* Logo editable */}
              <div className="row-span-3 flex flex-col items-center justify-center relative">
                {empresa.logo ? (
                  <img
                    src={empresa.logo}
                    alt="Logo Empresa"
                    className="w-32 h-32 object-contain rounded-lg border shadow"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg border">
                    <Building2 className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 cursor-pointer rounded-full p-2 shadow-md hover:bg-blue-700 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <Camera className="w-4 h-4 text-white" />
                </label>
              </div>

              <div>
                <p className="text-sm text-gray-500">Ámbito</p>
                <p className="font-normal">{empresa.ambito}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ubicación</p>
                <p className="font-normal">{empresa.ubicacion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Representante legal</p>
                <p className="font-normal">{empresa.representante}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Página web</p>
                <p className="font-normal break-all">{empresa.paginaWeb}</p>
              </div>
            </div>

            {/* Datos adicionales */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Volumen de ventas anual</p>
                <p className="font-normal">{empresa.volumenVentas}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Empleados</p>
                <p className="font-normal">{empresa.empleados}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Antigüedad</p>
                <p className="font-normal">{empresa.antiguedad}</p>
              </div>
            </div>

            {/* Campos agregados */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Misión</p>
                <p className="font-normal">{empresa.mision}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visión</p>
                <p className="font-normal">{empresa.vision}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Sucursales</p>
                <p className="font-normal">{empresa.sucursales}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Principales socios comerciales</p>
                <p className="font-normal">{empresa.socios}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${empresa.importaciones ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <p className="text-sm font-semibold">Importaciones</p>
                <span className="text-xl font-normal">{empresa.importaciones ? "✔" : "✖"}</span>
              </div>
              <div className={`p-4 rounded-lg ${empresa.exportaciones ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <p className="text-sm font-semibold">Exportaciones</p>
                <span className="text-xl font-normal">{empresa.exportaciones ? "✔" : "✖"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Productos</p>
                <p className="font-normal">{empresa.productos}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Servicios</p>
                <p className="font-normal">{empresa.servicios}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Objetivos de Desarrollo Sostenible</p>
              <p className="font-normal">{empresa.objetivos}</p>
            </div>
          </section>

          {/* ======= PANEL DERECHO ======= */}
          <aside className="w-80 shrink-0 space-y-4">
            <StatCard
              value={empresa.stats.compras}
              label={<><span className="block">Compras</span> realizadas</>}
            />
            <StatCard
              value={empresa.stats.ventas}
              label={<><span className="block">Ventas</span> realizadas</>}
            />
            <div className="bg-white rounded-2xl shadow p-5 text-center">
              <div className="text-4xl font-bold text-blue-600">
                {empresa.stats.restantes}
              </div>
              <div className="mt-2 text-gray-700 leading-snug">
                Transacciones restantes para desbloquear el rango Platino.
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

/* Tarjeta reutilizable para estadísticas */
function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 text-center">
      <div className="text-4xl font-bold text-blue-600">{value}</div>
      <div className="mt-2 text-gray-700 leading-tight">{label}</div>
    </div>
  );
}
