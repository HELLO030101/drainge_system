import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Tanker Truck SVG Icon
const tankerIcon = L.divIcon({
  className: 'tanker-leaflet-marker',
  html: `<div style="
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: 3px solid #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    font-size: 18px;
  ">
    🚛
  </div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 19]
});

// Hostel Destination Icon
const hostelIcon = L.divIcon({
  className: 'hostel-leaflet-marker',
  html: `<div style="
    background: linear-gradient(135deg, #10b981, #047857);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: 3px solid #ffffff;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    font-size: 18px;
  ">
    📍
  </div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 19]
});

export default function TankerMap({ 
  hostelLat = 23.0225, 
  hostelLng = 72.5714, 
  tankerLat = 23.0300, 
  tankerLng = 72.5800 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean previous instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [(hostelLat + tankerLat) / 2, (hostelLng + tankerLng) / 2],
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Hostel Pin
    L.marker([hostelLat, hostelLng], { icon: hostelIcon })
      .bindPopup('<b>Hostel Complaint Location</b><br>Drainage Sewage Site')
      .addTo(map);

    // Tanker Pin
    const tankerMarker = L.marker([tankerLat, tankerLng], { icon: tankerIcon })
      .bindPopup('<b>Sanitation Tanker GJ 01 GA 6789</b><br>Driver: Mahesh Chauhan')
      .addTo(map)
      .openPopup();

    // Polyline Route
    const routePoints = [
      [tankerLat, tankerLng],
      [(tankerLat * 0.7 + hostelLat * 0.3), (tankerLng * 0.7 + hostelLng * 0.3)],
      [(tankerLat * 0.3 + hostelLat * 0.7), (tankerLng * 0.3 + hostelLng * 0.7)],
      [hostelLat, hostelLng]
    ];

    const polyline = L.polyline(routePoints, {
      color: '#10b981',
      weight: 5,
      opacity: 0.8,
      dashArray: '8, 8',
      lineCap: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hostelLat, hostelLng, tankerLat, tankerLng]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="map-container" style={{ height: '260px' }} ref={mapContainerRef} />
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(4px)',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '0.72rem',
        fontWeight: '700',
        color: '#047857',
        border: '1px solid #a7f3d0',
        zIndex: 500,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        🌱 Live Demo Tracking
      </div>
    </div>
  );
}
