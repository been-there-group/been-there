import React, { useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import allTripsBackground from '../../assets/allTripsBackground.png'
import './SingleTrip.scss';
import Nav from '../Nav/Nav';
import SingleTripDisplay from '../SingleTrip/SingleTripDisplay';
import DatePicker from "react-datepicker";
import CalendarContainer from './Calendar/CalendarContainer';

const SingleTrip = (props) => {

    const [items, setItems] = useState([]);
    const [itineraryName, setItineraryName] = useState('');
    const [editView, setEditView] = useState('hide');
    const [itineraryItemId, setItineraryItemId] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [itemDate, setItemDate] = useState(new Date());
    const [newDuration, setNewDuration] = useState('1');


    const user = useSelector((state) => state.userReducer);
    const {user_id} = user;
    const {id} = props.match.params;
    console.log(id)

    console.log(props)
    useEffect(() => {
        if(user_id){
            axios.get(`/api/singletrip/${id}`)
            .then(res => {
                console.log("res.data=", res.data);
                setItems(res.data);
                setItineraryName(res.data[0].itinerary_name)
            })
            
        }
    }, [user_id, id, items])

    const toggleEditView = (itinerary_item_id) => {
        setItineraryItemId(itinerary_item_id)
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
        const duration = newDuration;
        console.log('getting to here')
        axios.put(`/api/singletrip/${itineraryItemId}`, {day, duration})
        .then(res => {
            setItems(res.data)
            
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
                        
                        <DatePicker className='start-end-date' selected={startDate} onChange={date => setStartDate(date)} calendarContainer={MyContainer} />
                        <p>-</p>
                        <DatePicker className='start-end-date' selected={endDate} onChange={date => setEndDate(date)} calendarContainer={MyContainer} />
                    </section>
                </section>
            </div>
            <section className='single-trip-container-container'>
                {user_id ?
                    items.map((item, index) => {
                        console.log(item)

                        // setItineraryName(item.itinerary_name)
                        return(
                            <div className='single-trip-container'>
                                <section className='single-trip-display'>
                                    <SingleTripDisplay key={index} item={item}/>
                                </section>
                                <section className='button-container'>
                                    <button className='modal-button' onClick={() => toggleEditView(item.itinerary_item_id, item.day)}>✎</button>
                                    <button className='modal-button' onClick={() => deleteItem(item.itinerary_item_id)}>x</button>
                                </section>
                                <div className="divider-2"></div>
                                
                            </div>
                        )
                    })
                    : null}
                    {editView === 'show' ?
                    <div>
                        <p>choose date:</p>
                    <DatePicker selected={itemDate} onChange={date => setItemDate(date)} calendarContainer={MyContainer} />
                    <button className='save-button-calendar' onClick={() => editItem(itineraryItemId)}>Save</button>
                    </div>
                    : null
                }
            </section>
        </div>
    )

}
export default SingleTrip;