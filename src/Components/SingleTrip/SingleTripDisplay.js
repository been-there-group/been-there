import React from 'react';
import axios from 'axios';

const SingleTripDisplay = (props) => {

    

    return(
        <div className='mapped-items'>
            <div>{props.item.place_name}</div>
            <div>Day: {props.item.day}</div>
            <div>Duration: {props.item.duration}</div>
            
        </div>
    )
}
export default SingleTripDisplay;