import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import './SearchPage.scss'
import { updateLocation } from "../../redux/mapReducer";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const SearchPage = () => {
  const state = useSelector((state) => state.mapReducer);
  const { lat, lng} = state;
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [latitude, setLat] = useState(33.49108030585244);
  const [longitude, setLng] = useState(-111.92781239256058);
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch()


  Geocode.setApiKey("AIzaSyBHtVVgxj5knDU1FwfIrb0mDB44iBzcS0I");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  useEffect(() => {
    console.log(value)
  setAddress(value.label);
}, [value]);

  useEffect(() => {
    // setAddress(value.label)
    if (address !== "") {
      Geocode.fromAddress(`${address}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
          console.log(lat, lng)
          dispatch(updateLocation(lat, lng));
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [address]);

  useEffect(() => {
    setLoaded(false);
    // setAddress(address);
}, [lat]);

useEffect(() => {
    setLoaded(true);
}, [isLoaded]);
const renderMap = () => {
    return (
        <MapContainer
        id="mapId"
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        >
            {console.log(latitude, longitude)}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={[latitude, longitude]}>
          <Popup>This is {address}</Popup>
        </Marker>
      </MapContainer>
    );
};

return (
    <div>
      <div>
          {console.log(value)}
          {console.log(latitude)}
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBHtVVgxj5knDU1FwfIrb0mDB44iBzcS0I"
          selectProps={{
              value,
              onChange: setValue,
            }}
        />
      </div>
      {isLoaded ? renderMap() : <div></div>}
    </div>
  );
};
export default SearchPage;
