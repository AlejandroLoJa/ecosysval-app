import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =============================
// 1️⃣ Corrige el bug del ícono roto
// =============================
delete L.Icon.Default.prototype._getIconUrl;

// =============================
// 2️⃣ Configura un solo ícono personalizado
// =============================
// 👉 Coloca tu imagen en: public/icons/marker.png
const customIcon = L.icon({
  iconUrl: "/icons/marker.png",   // Ruta desde carpeta public
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
  iconSize: [36, 48],             // ancho / alto del ícono
  iconAnchor: [18, 48],           // punta inferior del marcador
  popupAnchor: [0, -45],          // posición del popup respecto al ícono
});

export default function Mapa() {
  const position = [19.432608, -99.133209]; // 📍 Ciudad de México

  useEffect(() => {
    console.log("Mapa cargado correctamente ✅");
  }, []);

  return (
    <div className="w-full h-full" style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Fondo del mapa */}
        <TileLayer
  url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
  attribution='© OpenStreetMap contributors, CC-BY-SA'
/>





        {/* Marcador principal */}
        <Marker position={position} icon={customIcon}>
          <Popup>Ciudad de México 🌆</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
