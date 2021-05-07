import React, {useEffect, useState} from 'react';
import Nav from '../Nav/Nav';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AllTrips.scss';

const AllTrips = () => {

    const [trips, setTrips] = useState([]);
    const [editView, setEditView] = useState('hide');
    const [editingId, setEditingId] = useState(null);
    const [currentItineraryName, setCurrentItineraryName] = useState('');
    const [itinerary_name, setItineraryName] = useState('');

    const user = useSelector((state) => state.userReducer);
    const {user_id} = user;

    // console.log('editView=', editView)

    useEffect(() => {
        if(user_id){
            console.log('yes')
            axios.get('/api/alltrips')
            .then(res => {
                console.log("res.data", res.data);
                setTrips(res.data)
                setCurrentItineraryName(res.data.itinerary_name)
            })
        }
    }, [user_id])

    function editTrip(id){
        console.log("itinerary name=", itinerary_name)
        axios.put(`/api/alltrips/${id}`, {itinerary_name})
        .then(res => {
            setTrips(res.data)
            setEditView('hide')
        })
    }

    function deleteTrip(id){
        axios.delete(`/api/alltrips/${id}`)
        .then(res => {
            setTrips(res.data)
        })
    }

    const toggleEditView = (itinerary_id) => {
        if(editView === 'hide'){
            setEditView('show')
            setEditingId(itinerary_id)
        } else {
            setEditView('hide')
        }
    }

    // function handleNameUpdate(name){
    //     setUpdatedName(name)
    // }

    return(
        <div>
            <Nav />
            <div className='all-trips-body'>
            <header>My Trips</header>
               
            </div>

            <section>
                {user_id ?
                    trips.map((trip, index) => {
                        console.log(trip)
                        
                        return(
                            <div className='trips-container'>
                                <Link to={`/single-trip/${trip.itinerary_id}`} key={index} className='link'>
                                    <div className='mapped-trips' >
                                        
                                        <h2>{trip.itinerary_name}</h2>
                                        
                                    </div>
                                </Link>

                                {editView === 'show' ?
                                null
                                : <button className='modal-button' onClick={() => toggleEditView(trip.itinerary_id)}>Edit</button>}

                                <button className='modal-button' onClick={() => deleteTrip(trip.itinerary_id)}>Delete Trip</button>

                            </div>
                        )
                    })
                : null}
            </section>

            <section className={editView === 'show' ? 'edit-view' : 'edit-view-hide'}>
                <div>
                    <input className='modal-button' placeholder=' Rename Your Trip' value={currentItineraryName} onChange={e => setItineraryName(e.target.value)}/>
                    <button className='modal-button' onClick={() => editTrip(editingId)}>Save Changes</button>
                    <button className='modal-button' onClick={() => toggleEditView()}>Cancel</button>
                </div>
            </section>

        </div>
    )
}
export default AllTrips;