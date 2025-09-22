import React, { useEffect, useState } from "react";

function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Cargando información del usuario...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 backdrop-blur-md">
        {/* Encabezado */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h2>

        {/* Información del usuario */}
        <div className="flex items-center gap-6">
          <img
            src={`http://localhost:3000${user.profile_image}`}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Datos adicionales */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Detalles</h3>
          <ul className="space-y-2 text-gray-700">
            <li>📅 Fecha de registro: <span className="font-medium">20/09/2025</span></li>
            <li>🎟 Plan actual: <span className="font-medium">Básico</span></li>
            <li>🔐 Seguridad: Contraseña actualizada</li>
          </ul>
        </div>

        {/* Botón para editar perfil */}
        <div className="mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            Editar información
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
