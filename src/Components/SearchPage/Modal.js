import React, {useEffect, useState} from 'react';
import axios from 'axios';
const key = process.env.REACT_APP_GOOGLE_API

const Modal = (props) => {

  const onClose = (e) => {
    props.showModal(e);
  }

  if(!props.show){
    return null;
  }
  return(
    <div>
      <button onClick={e => {onClose(e)}}>Exit</button>
      <h1>{props.places.name}</h1>
      <div>Rating: {props.places.rating}</div>
      <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.places.photos[0].photo_reference}&key=${key}`}  /> 
    </div>
  )
}
export default Modal;