import React, { useEffect, useState } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";

const MapSearch = (props) => {
  const {address, setAddress} =  props;
  const map = useMap();
  const [formattedAddresses, setFormattedAddresses] = useState([]);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
    });
    map.addControl(searchControl);
    const searchInstance = searchControl._search;
    const form = document.querySelector("form");
    form.addEventListener("click", async (e) => {
        console.log(e.target.tagName)
        if(e.target.tagName === "DIV")
        {
            console.log(searchControl._map._lastCenter); 
            const lat = searchControl._map._lastCenter.lat;
            const lng = searchControl._map._lastCenter.lng;
            const InputForm = form.querySelector("INPUT");
            console.log(InputForm.value);
            setAddress({address: InputForm.value, coordinates: {lat: lat, lng: lng}})
            // props.setAddress({address: InputForm.value, coordinates: {lat: lat, lng: lng}});
            // console.log(address);
            // const Address = { address: InputForm.value, latlng : searchControl._map._lastCenter }
            e.preventDefault();
        }
    })

    return () => {
      map.removeControl(searchControl);
      if (searchInstance) {
        searchInstance.clearResults();
      }
    };
  });
  return (
    <div>
    </div>
  );
};

export default MapSearch;
