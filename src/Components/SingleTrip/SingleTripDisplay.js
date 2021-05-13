import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
// import EditViewSingleTrip from './EditViewSingleTrip';

const SingleTripDisplay = (props) => {

    const [editView, setEditView] = useState('hide');
    const [itineraryItemId, setItineraryItemId] = useState(null);
    const [items, setItems] = useState([]);
    const [itemDay, setItemDay] = useState(null);
    const [newDuration, setNewDuration] = useState(null);
    const [itineraryId, setItineraryId] = useState('');
    const [itemDate, setItemDate] = useState(new Date(itemDay));

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
    const toggleEditView = (itinerary_item_id, item_day, item_duration) => {
        setItineraryItemId(itinerary_item_id);
        setItemDay(item_day);
        setNewDuration(item_duration);
        if(editView === 'hide'){
            setEditView('show')
        } else {
            setEditView('hide')
        }
    }
    function deleteItem(id){
        axios.delete(`/api/singletrip/${id}`)
        .then(res => {
            setItems(res.data)
        })
    }
    function editItem(itineraryItemId){
        const day = itemDate;
        axios.put(`/api/singletrip/${itineraryItemId}`, {day, newDuration})
        .then(res => {
            setItems(res.data)
            toggleEditView();
        })
    }

    return(
        <div>
            {props.item.day ?
                <div className='mapped-single-trip-items'>
                    <div className='single-trip-name'>{props.item.place_name}</div>
                    {/* <DatePicker className='start-end-date' selected={date} onChange={date => setDate(date)} /> */}
                    <div className='single-trip-day'>
                    {`${props.item.day.slice(0, 10).slice(0, 4)}/${props.item.day.slice(0, 10).slice(5, 7)}/${props.item.day.slice(0, 10).slice(8, 10)}`}
                    </div>
                    <div className='single-trip-duration'>{props.item.duration} hours</div>
                <section className='button-container-trip'>
                    <button className='modal-button' onClick={() => toggleEditView(props.item.itinerary_item_id, props.item.day, props.item.duration)}>✎</button>
                    <button className='modal-button' onClick={() => deleteItem(props.item.itinerary_item_id)}>x</button>
                </section>
                </div>
            
            : null}
                {editView === 'show' ?
                    <div>
                        <div className='edit-container'>
                            <div className='choose-a-date'>
                                <p>Choose A Date:</p>
                                <DatePicker className='datepicker-2' selected={new Date(itemDate)} onSelect={date => setItemDate(date)} />
                            </div>
                            <div className='set-duration'>
                                <p>Set Duration:</p>
                                <input placeholder='Number of Hours' value={newDuration} onChange={(e) => setNewDuration(e.target.value)}/>
                            </div>
                            <button className='modal-button' onClick={() => editItem(itineraryItemId)}>Save</button>
                        </div>
                    </div>
                    : null
                }
        </div>
    )
}
export default SingleTripDisplay;