import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import './SearchPage.scss'
import { updateLocation } from "../../redux/mapReducer";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import IndividualPlaces from "./IndividualThings";
import Nav from "../Nav/Nav"

const SearchPage = () => {
  const state = useSelector((state) => state.mapReducer);
  const { lat, lng} = state;
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [latitude, setLat] = useState(33.49108030585244);
  const [results, setResults] = useState([])
  const [longitude, setLng] = useState(-111.92781239256058);
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch()
  const key = process.env.REACT_APP_GOOGLE_API


  Geocode.setApiKey(key);
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
    axios
    .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=restaurant&key=${key}`
        )
        .then((res) => {
            // console.log(res.data.results[5].name);
            console.log(res.data.next_page_token)
            let first = res.data.results
            setTimeout(() => {
                axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`)
                .then(res => {
                    console.log(first, res.data.results)
                    setResults([...first, ...res.data.results])
                })
            }, 1000)
        });
  }, [lat]);

useEffect(() => {
    setLoaded(true);
}, [isLoaded]);


let mappedThings = results.map((places, index) => {
  return(
    <IndividualPlaces key={index} places={places} />
  )
})

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
        {results.map((e, i) => {
          return (
            <Marker
              position={[e.geometry.location.lat, e.geometry.location.lng]}
              key={i}
            >
              {/* {console.log(e)} */}
              <Popup>{e.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
};

console.log(results)
return (
  <div>
      <Nav />
          <div className='search-page'>
        <div className='google-places-autocomplete'>
            {/* {console.log(process.env.REACT_APP_GOOGLE_API)} */}
            {console.log(latitude)}
          <GooglePlacesAutocomplete
            apiKey= {`${key}`}
            selectProps={{
              value,
              onChange: setValue,
            }}
            />
        </div>
        {isLoaded ? renderMap() : <div></div>}
        <div>
          
          this is the results
          {mappedThings}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
