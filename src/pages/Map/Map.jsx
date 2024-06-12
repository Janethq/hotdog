import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

export default function Map() {
  const [serviceAddresses, setServiceAddresses] = useState([]);
    const [serviceNames, setServiceNames] = useState([]);

  const [mapCenter, setMapCenter] = useState([1.3521, 103.8198]);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/users/services");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setServiceAddresses(data.map((service) => service.address));
          setServiceNames(data.map((service) => service.serviceName));
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div
      className="max-w-md mx-auto bg-transparent p-6 rounded-lg border border-transparent ml-0"
      style={{ height: "100vh", width: "100vw" }}
    >
      <MapContainer center={mapCenter} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[1.3505233, 103.9243734]}>
          <Popup>
            <span>{serviceNames[0]}</span> <br />
            <span>{serviceAddresses[0]}</span>
          </Popup>
        </Marker>
        <Marker position={[1.2933872, 103.8545593]}>
          <Popup>
            <span>{serviceNames[1]}</span> <br />
            <span>{serviceAddresses[1]}</span>
          </Popup>
        </Marker>
        <Marker position={[1.3131482, 103.8970243]}>
          <Popup>
            <span>{serviceNames[2]}</span> <br />
            <span>{serviceAddresses[2]}</span>
          </Popup>
        </Marker>
        <Marker position={[1.3528162, 103.9370613]}>
          <Popup>
            <span>{serviceNames[3]}</span> <br />
            <span>{serviceAddresses[3]}</span>
          </Popup>
        </Marker>
        <Marker position={[1.3180642, 103.8959215]}>
          <Popup>
            <span>{serviceNames[4]}</span> <br />
            <span>{serviceAddresses[4]}</span>
          </Popup>
        </Marker>
        <Marker position={[1.3441277, 103.7321283]}>
          <Popup>
            <span>{serviceNames[5]}</span> <br />
            <span>{serviceAddresses[5]}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
