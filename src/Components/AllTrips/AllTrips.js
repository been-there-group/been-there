import React, {useEffect, useState} from 'react';
import Nav from '../Nav/Nav';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import allTripsBackground from '../../assets/allTripsBackground.png'
import './AllTrips.scss';

const AllTrips = () => {

    const [trips, setTrips] = useState([]);
    const [editView, setEditView] = useState('hide');
    const [editingId, setEditingId] = useState(null);
    const [currentItineraryName, setCurrentItineraryName] = useState('');
    const [itinerary_name, setItineraryName] = useState('');
    const [newItineraryName, setNewItineraryName] = useState('');
    const [dropdown, setDropdown] = useState('hide');

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
            .catch(err => console.log(err));
        }
    }, [trips])

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

    const createNewTrip = () => {
        const itineraryName = newItineraryName;
        const start_date = new Date();
        const end_date = new Date();
        axios.post('/api/alltrips', {itineraryName, start_date, end_date})
        .then(res => {
          setTrips(res.data)
          toggleDropdown()
        })
        .catch(err => console.log(err));
    }

    const toggleDropdown = () => {
        if(dropdown === 'hide'){
          setDropdown('show')
        } else {
          setDropdown('hide')
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
                <img className="all-trips-background" src={allTripsBackground} />
            </div>

            <div className="all-trips-container">
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

                                <div className='buttons'>
                                {editView === 'show' ?
                                null
                                :  <button className='modal-button' onClick={() => toggleEditView(trip.itinerary_id)}>Edit</button>}

                                <button className='modal-button' onClick={() => deleteTrip(trip.itinerary_id)}>Delete Trip</button>
                                </div>
                            </div>
                                
                        )
                    }) 
                    : <div className='signedOutTrips'>
                        <h1 className='signInTrips'>Sign in to create a trip!</h1>
                    </div>}
                    {dropdown === 'hide' ?
                    <div className='createDiv'>
                        <h1 onClick={toggleDropdown} className='create'>Create a Trip! +</h1>
                    </div>
                    : null }
                    {dropdown === 'show' ?
                        <section className='createDrop'>
                            <input placeholder='New Trip Name' onChange={e => setNewItineraryName(e.target.value)}/>
                            <button className='new-trip-button-all-trips' onClick={() => createNewTrip()}>Save</button>
                            <button className='new-trip-button-all-trips' onClick={() => toggleDropdown()}>Cancel</button>
                        </section>
                    : null}
            </section>
                    </div>

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