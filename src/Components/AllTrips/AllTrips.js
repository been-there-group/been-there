import React, {useEffect, useState} from 'react';
import Nav from '../Nav/Nav';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AllTrips.scss';

const AllTrips = () => {

    const [trips, setTrips] = useState([]);

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

    // <Route path="/single-trip/:user-id/:trip-id" component={SingleTrip} />

    return(
        <div>
            <Nav />
            <h1>My Trips</h1>

            <section>
                {user_id ?
                    trips.map((trip, index) => {
                        const id = trip.itinerary_id
                        return(
                            <Link to={`/single-trip/${trip.itinerary_id}`} key={index}>
                                <div className='mapped-trips' >
                                    <h2>{trip.itinerary_name}</h2>
                                    <h2>{trip.itinerary_id}</h2>
                                </div>
                            </Link>
                        )
                    })
                : null}
            </section>
        </div>
    )
}
export default AllTrips;