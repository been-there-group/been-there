import React from 'react';
import './IndividualPlaces.scss';

const IndividualPlaces = (props) => {

  return(
    <div className='mapped-place'>
      <div>{props.places.place}</div>
      <img className='mapped-image' src={props.places.url} alt={props.places.place} />
    </div>
  )
}
export default IndividualPlaces;