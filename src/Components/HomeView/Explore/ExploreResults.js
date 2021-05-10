import axios from 'axios';
import React, {useState} from 'react';
const key = process.env.REACT_APP_GOOGLE_API;
import explore from '../../../explore';

const ExploreResults = (props) => {
    const [places, setPlaces] = useState([]);

    console.log(props)
    const activity = toLowerCase(props.match.params.name)
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activity}&key=${key}`)
    .then(res => {
        setPlaces(res.data)
    })
    return(
        <div>
            {places} 
        </div>
    )
}
export default ExploreResults;