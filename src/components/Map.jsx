import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import {Button} from '../components'


export default function Map() {

  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
 
  const {isLoading: isLoadingPosition,
         position: geolocationPosition,
         getPosition
        } = useGeolocation();
  const [ mapLat, mapLng ] = useUrlPosition();

  // To updating co-ords even we switch from place to place to remember the history
  useEffect(function(){
    if( mapLat && mapLng)
    setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng]);

  useEffect(function(){
    if(geolocationPosition) 
    setMapPosition([
      geolocationPosition.lat, geolocationPosition.lng
    ])
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
     {!geolocationPosition && <Button type='position' onClick={getPosition} >
            {isLoadingPosition ? 'Loading....' : 'Use Your Position'}
      </Button>
    }     
      <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map(city =>  
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
             <span>{city.emoji}</span><span>{city.cityName}</span>
            </Popup>
          </Marker>)
        }
        <ChangeCentre position={mapPosition}/>
        <DetectClick/>
       
      </MapContainer>
    </div>
  );
}

// Creating a component to remember the history 
function ChangeCentre({position}){
  const map = useMap();
  map.setView(position)
  return null;
}

//Creating a function by onclicking map it navigate to form component, but MapContainer not have a onClick property.
function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  });
}
