import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =============================
// 🧭 Ícono personalizado para el marcador
// =============================
const customIcon = L.icon({
  iconUrl: "/custom-marker.png", // Ruta desde public/
  iconSize: [40, 40], // Tamaño del ícono
  iconAnchor: [20, 40], // Punto que “toca” el mapa
  popupAnchor: [0, -35], // Ajuste del popup
  className: "shadow-md", // Opcional para añadir sombra CSS
});

// =============================
// 🗺️ Componente principal
// =============================
export default function Mapa() {
  const position = [19.432608, -99.133209]; // Ciudad de México

  useEffect(() => {
    console.log("🌍 Mapa de OMEC cargado correctamente ✅");
  }, []);

  return (
    <div
      className="w-full h-full rounded-xl shadow-lg border border-gray-200"
      style={{ height: "500px", width: "100%" }}
    >
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        {/* ============================
            🎨 Fondo del mapa (Mapbox estilo tipo Google Maps)
        ============================ */}
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxlOTUxMDE5IiwiYSI6ImNtaGo4dGc4NjE4anQybG9nbXU2cXlndnUifQ.gUgMSw6o2RVGjq8eBhgTpA"
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> | Datos © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          tileSize={512}
          zoomOffset={-1}
        />

        {/* ============================
            📍 Marcador de ejemplo
        ============================ */}
        <Marker position={position} icon={customIcon}>
          <Popup>
            <b>OMEC - Ciudad de México</b> <br />
            Aquí se encuentra una de nuestras sedes 🌎
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
