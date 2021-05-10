import React from 'react';
import {Link} from 'react-router-dom';
import './IndividualActivity.scss';

const IndividualActivity = (props) => {
  
  let activity = props.activity;

  return(
    <div className='mapped-activity'>
        <Link to={`/explore-results/${activity.thing}`} params={{activity:'Hello'}}>
          <div className='nameHome'>
            <div className='activity-name'>{activity.thing}</div>
          </div>
          <img className='mapped-activity-image' src={activity.url} alt={activity.thing} />
        </Link>
    </div>
  )
}
export default IndividualActivity;