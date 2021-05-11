import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { updateLocation } from "../../redux/mapReducer";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"
import { ReactReduxContext } from "react-redux";
import IndividualPlaces from "./IndividualPlaces";
import Nav from "../Nav/Nav";
import loadingAirplane from '../../assets/loadingAirplane.png'
import "./SearchPage.scss";

const SearchPage = (props) => {
  const state = useSelector((state) => state.mapReducer);
  const { lat, lng } = state;
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [latitude, setLat] = useState();
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
  const [results, setResults] = useState([]);

  // checkbox status for each choice
  const [restaurantBtn, setRestaurantBtn] = useState(false);
  const [barBtn, setBarBtn] = useState(false);
  const [casinoBtn, setCasinoBtn] = useState(false)
  const [amusementBtn, setAmusementBtn] = useState(false);
  const [artBtn, setArtBtn] = useState(false);
  const [spaBtn, setSpaBtn] = useState(false);
  const [aquariumBtn, setAquariumBtn] = useState(false);
  const [zooBtn, setZooBtn] = useState(false);
  const [museumBtn, setMuseumBtn] = useState(false);

  //state of loading animation
  const [loading, setLoading] = useState(true);


  Geocode.setApiKey(key);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");


  // google places api request
  const getRestaurants = () => {
   return axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=restaurants&key=${key}`
      )
      .then((res) => {
        let first = [...res.data.results];
        setRestaurants(first);
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
           return axios
              .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setRestaurants([...first, ...res.data.results]);
              });
          }, 3000);
        }
      });
  };

  // google places api request
  const getBars = () => {
   return axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=bar&key=${key}`
      )
      .then((res) => {
        let first = [...res.data.results];
        setBars(first);
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
           return axios
              .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setBars([...first, ...res.data.results]);
              });
          }, 3000);
        }
      });
  };

  // google places api request
  const getCasinos = () => {
   return axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=casino&key=${key}`
      )
      .then((res) => {
        let first = [...res.data.results];
        setCasinos(first);
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
           return axios
              .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setCasinos([...first, ...res.data.results]);
              });
          }, 3000);
        }
      });
  };

  // google places api request
  const getAmusementPark = () => {
   return new Promise((resolve, reject) => {

     axios
     .get(
       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=amusement_park&key=${key}`
       )
       .then((res) => {
        let first = [...res.data.results];
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
           return axios
           .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
                )
                .then((res) => {
                  setAmusementParks([...first, ...res.data.results]);
                });
              }, 3000);
            }else {
            setAmusementParks(first);
            resolve(first)
          }
        })
        });
      };
  // google places api request
  const getArtGallery = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=art_gallery&key=${key}`
      )
      .then((res) => {
        let first = [...res.data.results];
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
            axios
            .get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
                )
                .then((res) => {
                  setArts([...first, ...res.data.results]);
                  resolve([...first, ...res.data.results]);
                });
              }, 3000);
            } else {
          setArts(first);
          resolve(first)
        }
      });
    })
  };
  // google places api request
  const getMuseum = () => {
   return new Promise((resolve, reject) => {
     axios
     .get(
       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=museum&key=${key}`
       )
       .then((res) => {
         let first = [...res.data.results];
         // setResults((prevResults) => [...prevResults, ...first]);
         if (res.data.next_page_token) {
           setTimeout(() => {
              axios
             .get(
               `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
               )
               .then((res) => {
                 setMuseums([...first, ...res.data.results]);
                 resolve([...first, ...res.data.results]);
                });
              }, 3000);
            }else {
              setMuseums(first);
              resolve(first)
            }
          });
        })
        };
  // google places api request
  const getSpa = () => {
   return new Promise((resolve, reject) => {
     axios
     .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=spa&key=${key}`
        )
      .then((res) => {
        let first = [...res.data.results];
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
            axios
            .get(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setSpas([...first, ...res.data.results]);
                resolve([...first, ...res.data.results]);
              });
            }, 3000);
          }else {
            setSpas(first);
            resolve(first)
          }
        });
      })
    };
  // google places api request
  const getAquarium = () => {
   return new Promise((resolve, reject) => {
     axios
     .get(
       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=aquarium&key=${key}`
       )
       .then((res) => {
         let first = [...res.data.results];
         // setResults((prevResults) => [...prevResults, ...first]);
         if (res.data.next_page_token) {
           setTimeout(() => {
             axios
             .get(
               `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
                )
                .then((res) => {
                  setAquariums([...first, ...res.data.results]);
                  resolve([...first, ...res.data.results]);
                });
              }, 3000);
            }else {
              resolve(first)
              setAquariums(first);
        }
      });
    })
  };
  // google places api request
  const getZoo = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=15000&type=zoo&key=${key}`
        )
      .then((res) => {
        let first = [...res.data.results];
        // setResults((prevResults) => [...prevResults, ...first]);
        if (res.data.next_page_token) {
          setTimeout(() => {
            axios
            .get(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`
              )
              .then((res) => {
                setZoos([...first, ...res.data.results]);
                resolve(...first, ...res.data.results)
              });
            }, 3000);
          } else {
            setZoos(first);
            resolve(first)
          }
        });
      })
      };


  useEffect(() => {
   if (latitude){ Promise.all([
     getAmusementPark(),
     getArtGallery(),
     getSpa(),
     getAquarium(),
     getZoo(),
     getMuseum()
    ]
    ).then((res)=> {
      // console.log(res)
      let spread = []
      for (let i = 0; i < res.length; i++){
        if(res[i].length > 0){
          spread = [...spread, ...res[i]]
        }
      }
      if(!artBtn && !museumBtn && !amusementBtn && !restaurantBtn && !barBtn && !casinoBtn && !spaBtn && !aquariumBtn && !zooBtn){
        // console.log(spread)
        setResults(spread)
        setLoading(false)
      }
    })
    .catch(err => console.log(err))
  }
    getRestaurants()
    getBars()
    getCasinos()
  }, [lat]);

  // useEffect(() => {
  //   if (props.location.state.address.label) {
  //     setAddress(props.location.state.address.label);
  //   } else if (props.location.state.address) {
  //     setAddress(props.location.state.address);
  //   } else {
  //     setAddress(value.label);
  //   }
  // }, [value]);

  // console.log(address)

  useEffect(() => {
    setAddress(props.match.params.value)
  }, [props.match.params.value])


  useEffect(() => {
    // setAddress(value.label)
    if (address !== "") {
      Geocode.fromAddress(`${address}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
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
    let arr = [];
    if (artBtn){
      arr= [...arr, ...arts]
    }
    if (museumBtn){
      arr = [...arr, ...museums]
    }
    if (amusementBtn){
      arr = [...arr, ...amusementParks]
    }
    if (restaurantBtn){
      arr = [...arr, ...restaurants]
    }
    if (barBtn){
      arr = [...arr, ...bars]
    }
    if (casinoBtn){
      arr= [...arr, ...casinos]
    }
    if (spaBtn){
      arr = [...arr, ...spas]
    }
    if (aquariumBtn) {
      arr = [...arr, ...aquariums]
    }
    if (zooBtn) {
      arr = [...arr, ...zoos]
    }
    setResults([...arr])
    if(!artBtn && !museumBtn && !amusementBtn && !restaurantBtn && !barBtn && !casinoBtn && !spaBtn && !aquariumBtn && !zooBtn){
      setResults([...arts, ...museums, ...amusementParks, ...aquariums, ...zoos])
    }
  }, [artBtn, museumBtn, amusementBtn, restaurantBtn, barBtn, casinoBtn, spaBtn, aquariumBtn, zooBtn]);

// const getIcon = (e) => {
//   for (let j = 0; j < e.types; j++){
//     if(e.types[j] = 'restaurant'){
//       return restaurantIcon
//     } else if(e.types[j] = 'zoo'){
//       return zooIcon
//     } else{
//       return
//     }
//   }
// }


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
          <Popup>{address}</Popup>
        </Marker>
        {results
          ? results.map((e, i) => {
              return (
                <Marker
                  position={[e.geometry.location.lat, e.geometry.location.lng]}
                  key={i}
                  // icon ={()=>{
                  //   getIcon(e)
                  // }}
                >
                  <Popup>{e.name}</Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    );
  };


  const handleClick = () => {
    props.history.push({pathname: `/search-page/${value.label}`, state: {address: value}})
  }
  console.log(value)

  return (
    <div>
      <Nav />
      <div className="search-page">
        <section className='map-container'>

        <div className="google-places-autocomplete">
          <GooglePlacesAutocomplete
            apiKey={`${key}`}
            selectProps={{
              value,
              onChange: setValue,
            }}
          />
          <button className='search-button' onClick={() => handleClick()}>Search</button>
        </div>
        <form className="checkboxes">
          <input
            type="checkbox"
            value="amusementBtn"
            id="amusementBtn"
            onChange={() => setAmusementBtn(!amusementBtn)}
            name="bike"
          />
          <label for="amusementBtn">Amusement Parks</label>

          <input
            type="checkbox"
            value="artBtn"
            id="artBtn"
            onChange={() => setArtBtn(!artBtn)}
            name="bike"
          />
          <label for="artBtn">Art Galleries</label>

          <input
            type="checkbox"
            value="museumBtn"
            id="museumBtn"
            onChange={() => setMuseumBtn(!museumBtn)}
            name="bike"
          />
          <label for="museumBtn">Museums</label>

          <input
            type="checkbox"
            value="restaurantBtn"
            id="restaurantBtn"
            onChange={() => setRestaurantBtn(!restaurantBtn)}
            name="bike"
          />
          <label for="restaurantBtn">Restaurants</label>

          <input
            type="checkbox"
            value="barBtn"
            id="barBtn"
            onChange={() => setBarBtn(!barBtn)}
            name="bike"
          />
          <label for="barBtn">Bars</label>

          <input
            type="checkbox"
            value="casinoBtn"
            id="casinoBtn"
            onChange={() => setCasinoBtn(!casinoBtn)}
            name="bike"
          />
          <label for="casinoBtn">Casinos</label>

          <input
            type="checkbox"
            value="zooBtn"
            id="zooBtn"
            onChange={() => setZooBtn(!zooBtn)}
            name="bike"
          />
          <label for="zooBtn">Zoos</label>

          <input
            type="checkbox"
            value="aquariumBtn"
            id="aquariumBtn"
            onChange={() => setAquariumBtn(!aquariumBtn)}
            name="bike"
          />
          <label for="aquariumBtn">Aquaruims</label>

          <input
            type="checkbox"
            value="spaBtn"
            id="spaBtn"
            onChange={() => setSpaBtn(!spaBtn)}
            name="bike"
          />
          <label for="spaBtn">Spas</label>
        </form>
        {isLoaded ? renderMap() : <div></div>}
        </section>

        <div className="mapped-things-container">
          <header className='check-out-these-places'>Check Out These Places in {address}!</header>
          {loading
          ? <div className="loading-animation">
            <img className="airplane" alt="" src={loadingAirplane}/>
            <p>Getting You There...</p>
            </div>
        : null}


          {results.sort((a, b) => {
            if (b.rating === undefined){
              b.rating = 0
            }
            return b.rating - a.rating
          }).map((places, index) => {
            return (
              <div className="individual-places-container">
                <IndividualPlaces key={index} places={places} list={list}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
