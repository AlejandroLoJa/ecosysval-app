import React from "react";

function Subscribe() {
  const plans = [
    { name: "Básico", bgImage: "/Basico.png" },
    { name: "Pro", bgImage: "/Pro.png" },
    { name: "Premium", bgImage: "/Premium.png" },
    { name: "Platino", bgImage: "/Platino.png" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <header className="p-6">
        <h1 className="text-xl font-bold text-gray-800 drop-shadow-lg">ECOSYSVAL</h1>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl w-full">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col items-center">
              {/* Tarjeta con imagen y efecto hover */}
              <div
                className="relative rounded-lg overflow-hidden w-full min-h-[350px] cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundImage: `url(${plan.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay de color al pasar el mouse */}
                <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-25 transition"></div>
              </div>

              {/* Botón debajo de la tarjeta */}
              <button className="mt-3 w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                Suscribirse
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
