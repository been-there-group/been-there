import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';

const SingleTripDisplay = (props) => {

    // const dateFixer = () => {
    //     const fulldate = props.item.day.slice(0, 10);
    //     // console.log(fulldate) //2021-05-10
    //     const year = fulldate.slice(0, 4);
    //     // console.log(year); //2021
    //     const month = fulldate.slice(5, 7);
    //     // console.log(month); //05
    //     const day = fulldate.slice(8, 10);
    //     // console.log(day); //10
    //     const newDate = `${month}/${day}/${year}`
    //     // console.log(newDate); // 05/10/2021
    //     return newDate
    // }

    return(
        <div>
            {props.item.day ?
                <div className='mapped-single-trip-items'>
                    <div className='single-trip-name'>{props.item.place_name}</div>
                    {/* <DatePicker className='start-end-date' selected={date} onChange={date => setDate(date)} /> */}
                    <div className='single-trip-day'>Day: {<br></br>} 
                    {`${props.item.day.slice(0, 10).slice(0, 4)}/${props.item.day.slice(0, 10).slice(5, 7)}/${props.item.day.slice(0, 10).slice(8, 10)}`}</div>
                    <div className='single-trip-duration'>Duration: {<br></br>}{props.item.duration} hours</div>
                </div>
            
            : null}
        </div>
    )
}
export default SingleTripDisplay;