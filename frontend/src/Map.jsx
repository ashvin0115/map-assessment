import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw";
import axios from "axios";
import MapSearch from "./MapSearch";

const Leaflet = () => {
  const [address, setAddress] = useState({
    address: "NY", 
    coordinates: {lat: 1.3542, lng: -16.676}
  });
  const [editableFG, setEditableFG] = useState(null);

  const onCreated = (e) => {
    const layer = e?.leafletElement;
    if (layer) {

      const drawnItems = editableFG.leafletElement._layers;
      if (Object.keys(drawnItems).length > 1) {
        Object.keys(drawnItems).forEach((layerid, index) => {
          if (index > 0) return;
          const layer = drawnItems[layerid];
          editableFG.leafletElement.removeLayer(layer);
        });
      }
    }
  };

  const onFeatureGroupReady = (reactFGref) => {
    // store the ref for future access to content
    setEditableFG(reactFGref);
  };

  const handleClick = () => {
      const mjson = JSON.stringify(address);
      // Send a POST request

      axios.post('http://localhost:3001/add', {mjson}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => console.log('response : ', res));

  }
  return (
    <>
      <MapContainer
        className="leaflet-map"
        center={[37.8189, -122.4786]}
        zoom={13}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <MapSearch address={address} setAddress={setAddress}/>
        <FeatureGroup
          ref={(featureGroupRef) => {
            onFeatureGroupReady(featureGroupRef);
          }}
        >
          
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: true, // enable only the polygon tool
              rectangle: true, // enable only the rectangle tool
            }}
          />
        </FeatureGroup>
      </MapContainer>
      <button style={{ position: "absolute", top:"200px", left: "10px", zIndex: 10000, width:"100px", height:"60px"}} onClick={handleClick}>Save</button> 
    </>
  );
};

export default Leaflet;
