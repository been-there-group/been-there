import React from 'react';
import {Link} from 'react-router-dom';
import './IndividualPlaces.scss';

const IndividualPlaces = (props) => {

  return(
    <div className='mapped-place'>
        <Link to='/search-page'>
      <div>{props.places.place}</div>
      <img className='mapped-image' src={props.places.url} alt={props.places.place} />
        </Link>
    </div>
  )
}
export default IndividualPlaces;