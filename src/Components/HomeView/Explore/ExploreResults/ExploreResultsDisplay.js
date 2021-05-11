import React, {useState} from 'react';
import axios from 'axios';
import noImage from '../../../../assets/noImage.png';
import './ExploreResultsDisplay.scss';

const ExploreResultsDisplay = (props) => {
    const [dropdown, setDropdown] = useState('hide');
    const [newTrip, setNewTrip] = useState('hide');
    const [trips, setTrips] = useState([]);
    const [itineraryName, setItineraryName] = useState('');

    const key = process.env.REACT_APP_GOOGLE_API

    const toggleDropdown = () => {
      if(dropdown === 'hide'){
        setDropdown('show')
      } else {
        setDropdown('hide')
      }
    }

    const toggleNewTrip = () => {
      if(newTrip === 'hide'){
        setNewTrip('show')
      } else {
        setNewTrip('hide')
      }
    }

    const saveToBucketList = ()=> {
      axios.post(`/api/save/`, {place_id: props.places.place_id, place_name: props.places.name, bucket_list_image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`})
      alert('saved to bucket list!')
    }

    const saveToTrip = (itineraryId) =>{
        const day = 'none';
        const duration = 1;
        const place_id = props.places.place_id;
        const place_name = props.places.name;
        axios.post(`/api/singletrip/${itineraryId}`, {day, place_id, place_name, itineraryId, duration})
        .then(res => {
          setTrips(res.data)
          toggleDropdown()
        })
      }

    const createNewTrip = () => {
        axios.post('/api/alltrips', {itineraryName})
        .then(res => {
          setTrips(res.data)
          toggleDropdown()
        })
    }

    let userTrips = trips.map((trip, index) => {
                  
        return(
          <section className='dropdown-trips'>
            <p className='itinerary-name'key={index} onClick={() => saveToTrip(trip.itinerary_id)}>+ {trip.itinerary_name}</p>
          </section>
        )
      })


    return(
    <div className='explore-results-container'>
        <div className="divider-explore"></div>
        <div className='explore-single-result-bottom'>
            <div className='explore-single-result-bottom-left'>
                <section className="explore-name-and-rating">
                    <p className="explore-place-name" > {props.places.name} </p>
                    <p className="explore-place-type">Type: {props.places.types[0]}</p>
                    <p className="explore-place-status">Status: {props.places.business_status === 'OPERATIONAL' ? 'Open' : 'Closed'}</p>
                    <h1 className="explore-rating">Rating: {props.places.rating}</h1>
                </section>
                <section className='explore-button-container'>
                    <button className="explore-modal-button" onClick={() => toggleDropdown()}>Add to a Trip</button> 
                    <button className="explore-modal-button-3" onClick={() => saveToBucketList()}>♡</button>
                </section>

                {dropdown === 'show' ?
                    <section className='explore-dropdown'>
                        <p className='explore-modal-button-2' onClick={() => toggleNewTrip()}>Create a New Trip +</p>
        
                        {newTrip === 'show' ?
                            <section>
                                <input placeholder='New Trip Name' onChange={e => setItineraryName(e.target.value)}/>
                                <button onClick={() => createNewTrip()}>Save</button>
                                <button onClick={() => toggleNewTrip()}>Cancel</button>
                            </section>
                        : null}
        
                        <div className='explore-user-trips'>
                            {userTrips}
                        </div>
                    </section>
                : null}

            </div>
      
            {props.places.photos 
                ? <img className='explore-place-image'src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`}/>
                : <img className="explore-place-image"src={noImage}/> }
        </div>

    </div>
    )
}
export default ExploreResultsDisplay;