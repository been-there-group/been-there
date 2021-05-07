import React, {useEffect, useState} from 'react';
import axios from 'axios';
const key = process.env.REACT_APP_GOOGLE_API;

const Modal = (props) => {
  console.log('modal props=', props)
  
  return(
    <div className='modal'>
      <h1>{props.places.name}</h1>
      <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`} className='place-image'/>
      
    </div>
    
  )
}
export default Modal;