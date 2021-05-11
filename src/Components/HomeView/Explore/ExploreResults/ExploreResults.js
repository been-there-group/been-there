import axios from 'axios';
import React, {useState, useEffect} from 'react';
import ExploreResultsDisplay from './ExploreResultsDisplay';
import Nav from '../../../Nav/Nav';
import './ExploreResults.scss';
const key = process.env.REACT_APP_GOOGLE_API;

// import explore from '../../../explore';

const ExploreResults = (props) => {
    const [places, setPlaces] = useState([]);
    // console.log('places', places)

    // console.log(props)
    useEffect(() => {

      const activity = (props.match.params.name).toLowerCase()
      axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activity}&key=${key}`)
        .then(res => {
          let first = [...res.data.results];
          setPlaces(first)
          if (res.data.next_page_token) {
            setTimeout(() => {
              return axios
                .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${res.data.next_page_token}&key=${key}`)
                .then((res) => {
                  setPlaces([...first, ...res.data.results]);
                });
            }, 3000);
          }
        })
    }, [])
    return(
        <div>
          <Nav />
          <div className='mappedExplore'>
            <header className='explore-header'>Explore Places Near You!</header>
            {places.map((places, index) => {
              return (
                <div>
                  <ExploreResultsDisplay key={index} places={places}/>
                </div>
              );
            })}
          </div>
        </div>
    )
}
export default ExploreResults;