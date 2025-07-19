import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
});

const vehiclePath = [
  [12.9716, 77.5946],
  [12.9721, 77.5950],
  [12.9730, 77.5965],
  [12.9745, 77.5970],
  [12.9760, 77.5980],
  [12.9770, 77.5990],
];

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position]);
  return null;
}

function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % vehiclePath.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentPos = vehiclePath[index];

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={currentPos} zoom={17} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={currentPos} icon={vehicleIcon} />
        <RecenterMap position={currentPos} />
      </MapContainer>
    </div>
  );
}

export default App;
