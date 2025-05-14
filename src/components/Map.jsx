import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useCities } from '../context/CityContext';
import { useGeolocation } from '../hooks/useGeolocation';

import Button from './Button';

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {isLoading:isLoadingPosition,position:geoLocationPosition, getPosition } = useGeolocation();

  const mapLat = searchParams?.get('lat');
  const mapLng = searchParams?.get('lng');
  
  useEffect(function () {
    if(mapLat&& mapLng) setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])
  
    return (
      <div className={styles.mapContainer}  >
        <Button type='position' onClick={getPosition} >{
          isLoadingPosition?'loading...':'Use Your Position'
        }
        </Button>
        <MapContainer
          className={styles.map}
          center={mapPosition}
          // center={[mapLat,mapLng]}
          zoom={5}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {
            cities.map(city => (
              <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                  <Popup>
                  {
                    <>
                      <span> {city.emoji} </span>
                    <span> {city.cityName} </span>
                    </>
                    
                    }
                  </Popup>
                </Marker>
            )) 
          }
          <ChangeCenter position={mapPosition} />
          <DetectClick/>
        </MapContainer>
      </div>
    )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
   
    click: e => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
  return null;
}