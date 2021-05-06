import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import "./SearchPage.scss";
import { updateLocation } from "../../redux/mapReducer";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import IndividualPlaces from "./IndividualThings";
import Nav from "../Nav/Nav";
import { ReactReduxContext } from "react-redux";

const SearchPage = (props) => {
  const state = useSelector((state) => state.mapReducer);
  const { lat, lng } = state;
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [latitude, setLat] = useState();
  const [results, setResults] = useState([]);
  const [longitude, setLng] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const key = process.env.REACT_APP_GOOGLE_API;
  const [list, setList] = useState([]);

  // arrays of data from google places api call
  const [restaurants, setRestaurants] = useState([]);
  const [bars, setBars] = useState([]);
  const [casinos, setCasinos] = useState([]);
  const [amusementParks, setAmusementParks] = useState([]);
  const [arts, setArts] = useState([]);
  const [spas, setSpas] = useState([]);
  const [aquariums, setAquariums] = useState([]);
  const [zoos, setZoos] = useState([]);
  const [museums, setMuseums] = useState([]);

  // checkbox status for each choice
  const [amusementBtn, setAmusementBtn] = useState(false);
  const [artBtn, setArtBtn] = useState(false);
  const [spaBtn, setSpaBtn] = useState(false);
  const [aquariumsBtn, setAquariumsBtn] = useState(false);
  const [zooBtn, setZooBtn] = useState(false);
  const [museumBtn, setMuseumBtn] = useState(false);
  const [standard, setStandard] = useState(false);

  Geocode.setApiKey(key);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  // google places api request
  const getAmusementPark = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=amusement_park&key=${key}`
      )
      .then((res) => {
        console.log(res.data.results);
        let first = [...res.data.results];
        setAmusementParks(first);
        if (res.data.next_page_token) {
          setTimeout(() => {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setAmusementParks([...first, ...res.data.results]);
              });
          }, 3000);
        }
      });
  };
  // google places api request
  const getArtGallery = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=art_gallery&key=${key}`
      )
      .then((res) => {
        console.log(res.data);
        let first = [...res.data.results];
        setArts(first);
        if (res.data.next_page_token) {
          setTimeout(() => {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((response) => {
                console.log(arts);
                setArts([...first, ...response.data.results]);
                console.log(response.data);
                console.log(arts);
              });
          }, 3000);
        }
      });
  };
  // google places api request
  const getMuseum = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=museum&key=${key}`
      )
      .then((res) => {
        console.log(res.data.results);
        let first = [...res.data.results];
        setMuseums(first);
        if (res.data.next_page_token) {
          setTimeout(() => {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setMuseums([...first, ...res.data.results]);
              });
          }, 3000);
        }
      });
  };

  useEffect(() => {
    console.log("lat" + lat);
    // console.log("latitude" + latitude )
    getAmusementPark();
    getArtGallery();
    // getSpa();
    // getAquarium();
    // getZoo();
    getMuseum();
  }, [lat]);

  useEffect(() => {
    console.log(value);
    if (props.location.state.address.label) {
      setAddress(props.location.state.address.label);
    } else if (props.location.state.address) {
      setAddress(props.location.state.address);
    } else {
      setAddress(value.label);
    }
  }, [value]);

  useEffect(() => {
    // setAddress(value.label)
    if (address !== "") {
      Geocode.fromAddress(`${address}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
          console.log(lat, lng);
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

  useEffect(() => {
    mapList();
  }, [artBtn, museumBtn]);

  const mapList = () => {
    let arr = [];
    if (museumBtn && artBtn && !standard) {
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 5) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 5) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 4 && museums[i].rating < 5) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 4 && arts[i].rating < 5) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 3 && museums[i].rating < 4) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 3 && arts[i].rating < 4) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 2 && museums[i].rating < 3) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 2 && arts[i].rating < 3) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 1 && museums[i].rating < 2) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 1 && arts[i].rating < 2) {
          arr.push(arts[i]);
        }
      }
    }else if (artBtn && !standard) {
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 5) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 4 && arts[i].rating < 5) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 3 && arts[i].rating < 4) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 2 && arts[i].rating < 3) {
          arr.push(arts[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (arts[i] !== undefined && arts[i].rating >= 1 && arts[i].rating < 2) {
          arr.push(arts[i]);
        }
      }
    } else if (museumBtn && !standard) {
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 5) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 4 && museums[i].rating < 5) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 3 && museums[i].rating < 4) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 2 && museums[i].rating < 3) {
          arr.push(museums[i]);
        }
      }
      for (let i = 0; i < 40; i++) {
        if (museums[i] !== undefined && museums[i].rating >= 1 && museums[i].rating < 2) {
          arr.push(museums[i]);
        }
      }
    }
    setList(arr);
    console.log(arr);

  };

  // const mapList = () => {
  //   let arr = [];
  //   if (artBtn && !museumBtn && !standard) {
  //     for (let i = 0; i < arts.length; i++) {
  //       if (arts[i].rating >= 5) {
  //         arr.push(arts[i]);
  //       }
  //     }
  //     for (let i = 0; i < arts.length; i++) {
  //       if (arts[i].rating >= 4 && arts[i].rating < 5) {
  //         arr.push(arts[i]);
  //       }
  //     }
  //     for (let i = 0; i < arts.length; i++) {
  //       if (arts[i].rating >= 3 && arts[i].rating < 4) {
  //         arr.push(arts[i]);
  //       }
  //     }
  //     for (let i = 0; i < arts.length; i++) {
  //       if (arts[i].rating >= 2 && arts[i].rating < 3) {
  //         arr.push(arts[i]);
  //       }
  //     }
  //     for (let i = 0; i < arts.length; i++) {
  //       if (arts[i].rating >= 1 && arts[i].rating < 2) {
  //         arr.push(arts[i]);
  //       }
  //     }
  //   } else if (museumBtn && !artBtn && !standard) {
  //     for (let i = 0; i < museums.length; i++) {
  //       if (museums[i].rating >= 5) {
  //         arr.push(museums[i]);
  //       }
  //     }
  //     for (let i = 0; i < museums.length; i++) {
  //       if (museums[i].rating >= 4 && museums[i].rating < 5) {
  //         arr.push(museums[i]);
  //       }
  //     }
  //     for (let i = 0; i < museums.length; i++) {
  //       if (museums[i].rating >= 3 && museums[i].rating < 4) {
  //         arr.push(museums[i]);
  //       }
  //     }
  //     for (let i = 0; i < museums.length; i++) {
  //       if (museums[i].rating >= 2 && museums[i].rating < 3) {
  //         arr.push(museums[i]);
  //       }
  //     }
  //     for (let i = 0; i < museums.length; i++) {
  //       if (museums[i].rating >= 1 && museums[i].rating < 2) {
  //         arr.push(museums[i]);
  //       }
  //     }
  //   } else if (museumBtn && artBtn && !standard) {
  //     for (let i = 0; i < 40; i++) {
  //       if (museums[i] !== undefined && museums[i].rating >= 5) {
  //         arr.push(museums[i]);
  //         arr.push(arts[i])
  //       }
  //     }
  //     for (let i = 0; i < 40; i++) {
  //       if (museums[i] !== undefined && museums[i].rating >= 4 && museums[i].rating < 5) {
  //         arr.push(museums[i]);
  //         arr.push(arts[i])
  //       }
  //     }
  //     for (let i = 0; i < 40; i++) {
  //       if (museums[i] !== undefined && museums[i].rating >= 3 && museums[i].rating < 4) {
  //         arr.push(museums[i]);
  //         arr.push(arts[i])
  //       }
  //     }
  //     for (let i = 0; i < 40; i++) {
  //       if (museums[i] !== undefined && museums[i].rating >= 2 && museums[i].rating < 3) {
  //         arr.push(arts[i])
  //         arr.push(museums[i]);
  //       }
  //     }
  //     for (let i = 0; i < 40; i++) {
  //       if (museums[i] !== undefined && museums[i].rating >= 1 && museums[i].rating < 2) {
  //         arr.push(arts[i])
  //         arr.push(museums[i]);
  //       }
  //     }
  //   }
  //   setList(arr);
  //   console.log(arr);

  // };

  let mappedThings = results.map((places, index) => {
    return <IndividualPlaces key={index} places={places} />;
  });

  const renderMap = () => {
    return (
      <MapContainer
        id="mapId"
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>This is {address}</Popup>
        </Marker>
        {amusementBtn
          ? amusementParks.map((e, i) => {
              return (
                <Marker
                  position={[e.geometry.location.lat, e.geometry.location.lng]}
                  key={i}
                >
                  {console.log("HIT")}
                  <Popup>{e.name}</Popup>
                </Marker>
              );
            })
          : null}

        {artBtn
          ? arts.map((e, i) => {
              return (
                <Marker
                  position={[e.geometry.location.lat, e.geometry.location.lng]}
                  key={i}
                >
                  {/* {console.log(e)} */}
                  <Popup>{e.name}</Popup>
                </Marker>
              );
            })
          : null}

        {museumBtn
          ? museums.map((e, i) => {
              return (
                <Marker
                  position={[e.geometry.location.lat, e.geometry.location.lng]}
                  key={i}
                >
                  {/* {console.log(e)} */}
                  <Popup>{e.name}</Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    );
  };

  console.log("results", results);
  return (
    <div>
      <Nav />
      <div className="search-page">
        <div className="google-places-autocomplete">
          {/* {console.log(process.env.REACT_APP_GOOGLE_API)} */}
          {console.log("start")}
          {/* {console.log(latitude)} */}
          {console.log(lat)}
          <GooglePlacesAutocomplete
            apiKey={`${key}`}
            selectProps={{
              value,
              onChange: setValue,
            }}
          />
        </div>
        <form className="checkboxes">
          <input
            type="checkbox"
            value="amusementBtn"
            id="amusementBtn"
            onChange={() => setAmusementBtn(!amusementBtn)}
            name="bike"
          />
          <label for="amusementBtn">amusementBtn</label>

          <input
            type="checkbox"
            value="artBtn"
            id="artBtn"
            onChange={() => setArtBtn(!artBtn)}
            name="bike"
          />
          <label for="artBtn">artBtn</label>

          <input
            type="checkbox"
            value="museumBtn"
            id="museumBtn"
            onChange={() => setMuseumBtn(!museumBtn)}
            name="bike"
          />
          <label for="museumBtn">museumBtn</label>
        </form>
        {isLoaded ? renderMap() : <div></div>}
        <div>
          {console.log(list)}
          this is the results
          {list.map((e) => {
            return (
              <div>
                <p>{e.name}</p>
                <p>{e.rating}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
