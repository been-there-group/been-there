import React from 'react';
import {Link} from 'react-router-dom';
import './IndividualPlaces.scss';

const IndividualPlaces = (props) => {
  console.log(props)

  return(
    <div className='mapped-place'>
        <Link to={{pathname: '/search-page', state: {address: props.places.place}}}>
      <div>{props.places.place}</div>
      <img className='mapped-image' src={props.places.url} alt={props.places.place} />
        </Link>
    </div>
  )
}
export default IndividualPlaces;