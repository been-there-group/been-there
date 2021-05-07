import React, { useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import './SingleTrip.scss';
import Nav from '../Nav/Nav';
import SingleTripDisplay from '../SingleTrip/SingleTripDisplay';

const SingleTrip = (props) => {

    const [items, setItems] = useState([]);
    const [itineraryName, setItineraryName] = useState('');

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
    }, [user_id, id])

    function deleteItem(id){
        axios.delete(`/api/singletrip/${id}`)
        .then(res => {
            setItems(res.data)
        })
    }
    function editItem(id){
        axios.put(`/api/singletrip/${id}`)
        .then(res => {
            setItems(res.data)
        })
    }


    return(
        <div className='home'>
            <Nav />
            <div className="single-trip-body">

            <p>calendar, react date picker</p>
           
            <header>{itineraryName}</header>

            </div>
            <section>
                {user_id ?
                    items.map((item, index) => {
                        console.log(item)
                        // setItineraryName(item.itinerary_name)
                        return(
                            <div className='single-trip-container'>
                                <SingleTripDisplay key={index} item={item}/>
                                <button className='modal-button' onClick={() => deleteItem(props.item.itinerary_item_id)}>Delete</button>
                                <button className='modal-button' onClick={() => editItem(props.item.itinerary_item_id)}>Edit</button>
                            </div>
                        )
                    })
                : null}
            </section>
        </div>
    )

}
export default SingleTrip;