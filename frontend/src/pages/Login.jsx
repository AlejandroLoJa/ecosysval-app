import React from "react";

function Login() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      {/* Header con logo */}
      <header className="p-6">
        <h1 className="text-xl font-bold text-gray-800">ECOSYSVAL</h1>
      </header>

      {/* Contenedor principal */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className="w-full max-w-md rounded-lg shadow-lg p-8"
          style={{ backgroundColor: "transparent" }} 
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Inicio de sesión
          </h2>

          <form className="space-y-4">
            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="correo@empresa.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Recordarme + Olvidó contraseña */}
            <div className="flex items-center justify-between text-sm text-gray-800">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="text-blue-800 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar sesión en la cuenta
            </button>
          </form>

          {/* Enlace a registro */}
          <p className="text-center text-sm text-gray-800 mt-6">
            ¿No está registrado?{" "}
            <a href="/register" className="text-blue-800 hover:underline">
              Créese una cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


