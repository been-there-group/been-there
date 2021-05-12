import React, { useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import allTripsBackground from '../../assets/allTripsBackground.png'
import './SingleTrip.scss';
import Nav from '../Nav/Nav';
import SingleTripDisplay from '../SingleTrip/SingleTripDisplay';
import DatePicker from "react-datepicker";
import CalendarContainer from './Calendar/CalendarContainer';
import EditViewSingleTrip from './EditViewSingleTrip';

const SingleTrip = (props) => {

    const [items, setItems] = useState([]);
    const [itineraryName, setItineraryName] = useState('');
    const [itineraryId, setItineraryId] = useState('');
    const [editView, setEditView] = useState('hide');
    const [itineraryItemId, setItineraryItemId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [itemDay, setItemDay] = useState(null);
    const [newDuration, setNewDuration] = useState(null);

    const user = useSelector((state) => state.userReducer);
    const {user_id} = user;
    const {id} = props.match.params;
    // console.log(id)

    // console.log(props)
    useEffect(() => {
        const itineraryId = id;
        if(user_id){
            axios.get(`/api/singletrip/${itineraryId}`)
            .then(res => {
                console.log("res.data=", res.data);
                setItems(res.data.itineraryItems);
                setItineraryName(res.data.itinerary[0].itinerary_name)

                setStartDate(new Date(res.data.itinerary[0].start_date));
                setEndDate(new Date(res.data.itinerary[0].end_date));
                setItineraryId(res.data.itinerary[0].itinerary_id);
            })
            
        }
    }, [user_id, id])

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

    function updateStartDate(start_date){
        const itinerary_id = itineraryId;
        axios.put('/api/editstart', {itinerary_id, start_date})
        .then(res => {
            setItems(res.data)
            setStartDate(start_date)
        })
    }
    function updateEndDate(end_date){
        const itinerary_id = itineraryId;
        axios.put('/api/editend', {itinerary_id, end_date})
        .then(res => {
            setItems(res.data)
            setEndDate(end_date)
        })
    }

    const MyContainer = ({className, children}) => {
        return (
          <div className='calendar-container'>
            <CalendarContainer className={className}>
              
            <div >
            
          </div>
          <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
          </div>
        );
      };


    return(
        <div className='single-trip-home'>
            <Nav />
            <img className="all-trips-background" src={allTripsBackground} />
            <div className="single-trip-body">
                <section className='single-trip-header-and-dates-container'>
                    <header className='single-trip-header'>{itineraryName}</header>
                    <section className='trip-dates-container'>
                        
                        <DatePicker className='start-end-date' selected={startDate} onSelect={(date) => updateStartDate(date)} calendarContainer={MyContainer} />
                        <p>-</p>
                        <DatePicker className='start-end-date' selected={endDate} onSelect={date => updateEndDate(date)} calendarContainer={MyContainer} />
                    </section>
                </section>
            </div>
            <section className='single-trip-container-container'>
                {user_id ?
                    items.map((item, index) => {
                        // console.log(item)

                        // setItineraryName(item.itinerary_name)
                        return(
                            <div className='single-trip-container'>
                                <section className='single-trip-display'>
                                    <SingleTripDisplay key={index} item={item}/>
                                </section>
                                <section className='button-container'>
                                    <button className='modal-button' onClick={() => toggleEditView(item.itinerary_item_id, item.day, item.duration)}>✎</button>
                                    <button className='modal-button' onClick={() => deleteItem(item.itinerary_item_id)}>x</button>
                                </section>
                                
                                
                            </div>
                        )
                    })
                    : null}
                    {editView === 'show' ?
                    <div>
                        <EditViewSingleTrip itinerary_id={itineraryId} itinerary_item_id={itineraryItemId} item_day={itemDay} item_duration={newDuration}/>
                    </div>
                    : null
                }
                <div className="divider-2"></div>
            </section>
        </div>
    )

}
export default SingleTrip;