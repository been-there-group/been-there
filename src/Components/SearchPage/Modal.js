import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
const key = process.env.REACT_APP_GOOGLE_API

const Modal = (props) => {

  {/* kaya added this */}
  const [trips, setTrips] = useState([]);
  const [dropdown, setDropdown] = useState('hide');
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

  {/* kaya added this */}
  {/* need to access the place_id */}
  {/* need to access the itineraryId */}
  const saveToTrip = () =>{
    const day = 'not selected yet';
    const duration = 1;
    // axios.post(`/api/singletrip/${itineraryId}`, {day, place_id, itineraryId, duration})
    // .then(res => {
    //   setTrips(res.data)
    // })
  }

  if(!props.show){
    return null;
  }
  return(
    <div>
      <button onClick={e => {onClose(e)}}>Exit</button>
      <h1>{props.places.name}</h1>
      <button className="save-to-trip" onClick={() => toggleDropdown()}>Save To A Trip</button> 

      {/* kaya added this */}
      {/* if we want to do this a different way, that's fine with me :) */}
      <button className="save-to-bucket-list" onClick={() => saveToBucketList()}>Save To Bucket List</button>
      {dropdown === 'show' ?
      trips.map((trip, index) => {
        return(
          <p key={index} onClick={() => saveToTrip()}>{trip.itinerary_name}</p>
        )
      })
      : null}
      
      <div>Rating: {props.places.rating}</div>
      <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`}  /> 
    </div>
  )
}
export default Modal;
