import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =============================
// 1️⃣ Configuración para arreglar icono roto de Leaflet
// =============================
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// =============================
// 2️⃣ Opcional: Ícono personalizado
// =============================
// Guarda tu imagen en public/ como "custom-marker.png"
const customIcon = L.icon({
  iconUrl: "/custom-marker.png", // Ruta desde public
  iconSize: [32, 32],            // Tamaño de la imagen
  iconAnchor: [16, 32],          // Punto que "apunta" a la ubicación
  popupAnchor: [0, -32],         // Posición del popup respecto al ícono
});

export default function Mapa() {
  const position = [19.432608, -99.133209]; // Ciudad de México

  useEffect(() => {
    console.log("Mapa cargado correctamente ✅");
  }, []);

  return (
    <div className="w-full h-full" style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        {/* ============================
            Fondo del mapa
        ============================ */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ============================
            Marcador
            - Por defecto se ve corregido
            - Si quieres usar customIcon, descomenta la línea "icon={customIcon}"
        ============================ */}
        <Marker position={position} /* icon={customIcon} */>
          <Popup>Ciudad de México</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
