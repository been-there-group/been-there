import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const EditViewSingleTrip = (props) => {

    const itineraryId = props.itinerary_id;
    const itineraryItemId = props.itinerary_item_id;
    const itemDay = props.item_day;
    const itemDuration = props.item_duration;

    const [items, setItems] = useState([]);
    const [itemDate, setItemDate] = useState(new Date(itemDay));
    const [duration, setDuration] = useState(itemDuration);

    useEffect(() => {
        
        axios.get(`/api/singletrip/${itineraryId}`)
        .then(res => {
            setItems(res.data.itineraryItems);
            // console.log(res.data.itineraryItems);
        })
    }, [editItem])

    function editItem(itineraryItemId){
        const day = itemDate;
        axios.put(`/api/singletrip/${itineraryItemId}`, {day, duration})
        .then(res => {
            setItems(res.data)
        })
    }

    return(
        <div>
            <div className='edit-container'>
                <div className='choose-a-date'>
                    <p>Choose A Date:</p>
                    <DatePicker selected={new Date(itemDate)} onSelect={date => setItemDate(date)} />
                </div>
                <div className='set-duration'>
                    <p>Set Duration:</p>
                    <input placeholder='Number of Hours' value={duration} onChange={(e) => setDuration(e.target.value)}/>
                </div>
                <button className='modal-button' onClick={() => editItem(itineraryItemId)}>Save</button>
            </div>
        </div>
    )
}
export default EditViewSingleTrip;

{/* <div>
    {function getDate(newRes){
        for(let i = 0; i < newRes.length; i++){
            if(newRes[i].itinerary_item_id === itineraryItemId){
                setMatch(newRes[i].day)
            }
    }}}
</div> */}