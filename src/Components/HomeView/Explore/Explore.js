import React from 'react';
import IndividualActivity from '../Explore/IndividualActivity';
import explore from '../../../explore';
import './Explore.scss';

const Explore = () => {

    let mappedActivities = explore.map((activity, index) => {
        return <IndividualActivity key={index} activity={activity}/>
    });

    return(
        <div>
            <header className='exploreHeader'>Explore</header>
        <div className='mapped-activities-container'>
            {mappedActivities}
        </div>

        </div>
    )
}
export default Explore;