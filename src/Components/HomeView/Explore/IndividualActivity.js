import React from 'react';
import {Link} from 'react-router-dom';
import './IndividualActivity.scss';

const IndividualActivity = (props) => {

  return(
    <div className='mapped-activity'>
        <Link to='/search-page'>
          <div className='activity-name'>{props.activity.thing}</div>
          <img className='mapped-activity-image' src={props.activity.url} alt={props.activity.thing} />
        </Link>
    </div>
  )
}
export default IndividualActivity;