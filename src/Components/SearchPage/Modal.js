import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import './SearchPage.scss'
import noImage from '../../assets/noImage.png'
const key = process.env.REACT_APP_GOOGLE_API


const Modal = (props) => {

  {/* kaya added this */}
  const [trips, setTrips] = useState([]);
  const [dropdown, setDropdown] = useState('hide');
  const [newTrip, setNewTrip] = useState('hide');
  const [itineraryName, setItineraryName] = useState('');

  const user = useSelector((state) => state.userReducer);
  const {user_id} = user;

  {/* kaya added this */}
  useEffect(() => {
    if(user_id){
        axios.get('/api/alltrips')
        .then(res => {
            console.log("res.data", res.data);
            setTrips(res.data)
        })
    }
}, [user_id])

{console.log('props=', props)}
  const onClose = (e) => {
    props.showModal(e);
  }

  const saveToBucketList = ()=> {
    axios.post(`/api/save/`, {place_id: props.places.place_id, place_name: props.places.name, bucket_list_image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`})
  }

  {/* kaya added this */}
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

  {/* kaya added this */}
  {/* need to access the place_id */}
  {/* need to access the itineraryId */}
  const saveToTrip = (itineraryId) =>{
    const day = 'not selected yet';
    const duration = 1;
    const place_id = props.places.place_id;
    axios.post(`/api/singletrip/${itineraryId}`, {day, place_id, itineraryId, duration})
    .then(res => {
      setTrips(res.data)
    })
  }

  const createNewTrip = () => {
    axios.post('/api/alltrips', {itineraryName})
    .then(res => {
      setTrips(res.data)
    })
  }

  if(!props.show){
    return null;
  }
  return(
    <div className="modal-body">
      <button className="exit-button" onClick={e => {onClose(e)}}>X</button>
      <h1>{props.places.name}</h1>
      <h1>Rating: {props.places.rating}</h1>
      <button className="modal-button" onClick={() => toggleDropdown()}>Save To A Trip</button> 

      {/* kaya added this */}
      {/* if we want to do this a different way, that's fine with me :) */}
      <button className="modal-button" onClick={() => saveToBucketList()}>Save To Bucket List</button>
      {dropdown === 'show' ?
      trips.map((trip, index) => {
        return(
          <section>
            <p onClick={() => toggleNewTrip()}>Create a New Trip +</p>
            {newTrip === 'show' ?
            <section>
              <input placeholder='New Trip Name' onChange={e => setItineraryName(e.target.value)}/>
              <button onClick={() => createNewTrip()}>Save</button>
              <button onClick={() => toggleNewTrip()}>Cancel</button>
            </section>
            : null}
            <p key={index} onClick={() => saveToTrip(trip.itinerary_id)}>{trip.itinerary_name}</p>
          </section>
        )
      })
      : null}

        {props.places.photos 
          ? <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`}/>
          : <img className="no-image"src={noImage}/> }
    </div>
  )
}
export default Modal;
