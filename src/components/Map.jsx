import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';



import { useState } from 'react';

import styles from './Map.module.css';

export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mapPosition,setMapPosition]=useState([40,0])
    const navigate = useNavigate();
  
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
  
    return (
      <div className={styles.mapContainer}>
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
}