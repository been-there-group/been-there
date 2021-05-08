import React from 'react';
import {Link} from 'react-router-dom';
import './IndividualPlaces.scss';

const IndividualPlaces = (props) => {
  console.log(props)

  return(
    <div className='mapped-place'>
        <Link className='destinationLink' to={{pathname: '/search-page', state: {address: props.places.place}}}>
      <img className='mapped-image' src={props.places.url} alt={props.places.place} />
      <div className='destinationNames'>{props.places.place}</div>
        </Link>
    </div>
  )
}
export default IndividualPlaces;