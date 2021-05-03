import React, { useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';

const SingleTrip = (props) => {

    const [items, setItems] = useState([]);

    const user = useSelector((state) => state.userReducer);
    const {user_id} = user;
    const {id} = props.match.params;

    console.log(props.match.params)
    useEffect(() => {
        if(user_id){
            axios.get(`/api/singletrip/${id}`)
            .then(res => {
                console.log("res.data=", res.data);
                setItems(res.data)
            })
        }
    }, [user_id, id])

    return(
        <div className='home'>
            <Nav />
            <div className="single-trip-body">
            <h1>Single Trip</h1>
            </div>
            <section>
                {user_id ?
                    items.map((item, index) => {
                        return(
                            <div className='mapped-items' key={index}>
                                <h2>{item.itinerary_name}</h2>
                            </div>
                        )
                    })
                : null}
            </section>
        </div>
    )

}
export default SingleTrip;