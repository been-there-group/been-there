import axios from 'axios';
import React, {useState} from 'react';
import ExploreResultsDisplay from './ExploreResultsDisplay';
const key = process.env.REACT_APP_GOOGLE_API;

// import explore from '../../../explore';

const ExploreResults = (props) => {
    const [places, setPlaces] = useState([]);
    console.log('places', places)

    // console.log(props)
    const activity = (props.match.params.name).toLowerCase()
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activity}&key=${key}`)
    .then(res => {
        setPlaces(res.data)
    })
    return(
        <div>
            {/* {places.map((places, index) => {
                console.log(places)
            return (
              <div>
                <ExploreResultsDisplay key={index} places={places}/>
              </div>
            );
          })} */}
          Hello
        </div>
    )
}
export default ExploreResults;