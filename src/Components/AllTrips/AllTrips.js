import React, {useEffect, useState} from 'react';
import Nav from '../Nav/Nav';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AllTrips.scss';

const AllTrips = () => {

    const [trips, setTrips] = useState([]);
    const [editView, setEditView] = useState('hide');
    const [itinerary_name, setItineraryName] = useState('')

    const user = useSelector((state) => state.userReducer);
    const {user_id} = user;

    

    useEffect(() => {
        if(user_id){
            axios.get('/api/alltrips')
            .then(res => {
                console.log("res.data", res.data);
                setTrips(res.data)
            })
        }
    }, [user_id])

    function editTrip(id){
        console.log("itinerary name=", itinerary_name)
        axios.put(`/api/alltrips/${id}`, {itinerary_name})
        .then(res => {
            setTrips(res.data)
        })
    }

    const toggleEditView= () => {
        if(editView === 'hide'){
            setEditView('show')
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
            <h1>My Trips</h1>
            </div>

            <section>
                {user_id ?
                    trips.map((trip, index) => {
                        console.log(trip)
                        return(
                            <div>
                                <Link to={`/single-trip/${trip.itinerary_id}`} key={index}>
                                    <div className='mapped-trips' >
                                        <h2>{trip.itinerary_name}</h2>
                                        
                                    </div>
                                </Link>

                                {editView === 'show' ?
                                    <section>
                                        <input onChange={e => setItineraryName(e.target.value)}/>
                                        <button onClick={() => editTrip(trip.itinerary_id)}>Save Changes</button>
                                        <button onClick={toggleEditView}>Cancel</button>

                                    </section>
                                : <button onClick={toggleEditView}>Edit</button>}

                                <button>Delete</button>

                            </div>
                        )
                    })
                : null}
            </section>
        </div>
    )
}
export default AllTrips;