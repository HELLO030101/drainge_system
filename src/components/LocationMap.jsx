import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Green Civic Icon
const greenIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="
    background: linear-gradient(135deg, #10b981, #047857);
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #ffffff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  ">
    <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

export default function LocationMap({ lat = 23.0225, lng = 72.5714, onLocationSelect, interactive = true }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      const marker = L.marker([lat, lng], {
        icon: greenIcon,
        draggable: interactive
      }).addTo(map);

      if (interactive && onLocationSelect) {
        marker.on('dragend', (e) => {
          const newPos = e.target.getLatLng();
          onLocationSelect({ lat: newPos.lat, lng: newPos.lng });
        });

        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
        });
      }

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      mapInstanceRef.current.setView([lat, lng], 15);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    return () => {
      // Keep map reference cached or invalidate size on resize
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
  }, [lat, lng, interactive]);

  return (
    <div className="map-container" ref={mapContainerRef} />
  );
}
