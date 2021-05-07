import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Modal from './Modal';
import noImage from '../../assets/noImage.png'
import './SearchPage.scss'


const IndividualPlaces = (props) => {
  const [modal, setModal] = useState('hide');
  const [trips, setTrips] = useState([]);
  const [dropdown, setDropdown] = useState('hide');
  const [newTrip, setNewTrip] = useState('hide');
  const [itineraryName, setItineraryName] = useState('');
  const key = process.env.REACT_APP_GOOGLE_API

  const user = useSelector((state) => state.userReducer);
  const {user_id} = user;

  console.log("props=", props)

  useEffect(() => {
    if(user_id){
        axios.get('/api/alltrips')
        .then(res => {
            console.log("res.data", res.data);
            setTrips(res.data)
        })
    }
}, [user_id])

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

  const toggleModal = () => {
    if(modal === 'hide'){
      setModal('show')
    } else {
      setModal('hide')
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
    <div className='single-result'>
      {modal === 'show' ?
        <div>
          <div className='overlay'></div>
          <div className='overlay-2'></div>
          <Modal places={props.places} list={props.list}/>
          <button className='modal-button' className='close-modal' onClick={() => toggleModal()}>X</button>
        </div>
      : null}
      
      <div className="divider"></div>

      <div className='single-result-bottom'>

        <div className='single-result-bottom-left'>
          <section className="name-and-rating">
            <p>{props.places.types[0]}</p>
            <p className="place-name" onClick={() => toggleModal()}> {props.places.name} </p>
            <p>{props.places.business_status}</p>
            <h1 className="rating">Rating: {props.places.rating}</h1>
          </section>
          <section className='button-container'>
            <button className="modal-button" onClick={() => toggleDropdown()}>+</button> 
            <button className="modal-button" onClick={() => saveToBucketList()}>♡</button>
          </section>

          {dropdown === 'show' ?
      <section className='dropdown'>
        <p className='modal-button-2' onClick={() => toggleNewTrip()}>Create a New Trip +</p>
        
        {newTrip === 'show' ?
          <section>
            <input placeholder='New Trip Name' onChange={e => setItineraryName(e.target.value)}/>
            <button onClick={() => createNewTrip()}>Save</button>
            <button onClick={() => toggleNewTrip()}>Cancel</button>
          </section>
        : null}
        
        <div className='user-trips'>
        {userTrips}
        </div>

      </section>


      : null}

        </div>
      
        {props.places.photos 
          ? <img className='place-image'src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`}/>
          : <img className="no-image"src={noImage}/> }
      </div>

    </div>
  )
}

export default IndividualPlaces;


