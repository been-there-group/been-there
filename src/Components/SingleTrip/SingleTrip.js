import React, { useEffect } from 'react';
import Nav from '../Nav/Nav';

const SingleTrip = () => {

    const {user_id} = useSelector((state) => state);

    useEffect(() => {
        if(user_id){
            axios.get('/api/singletrip', itineraryId)
        }
    })

    return(
        <div>
            <Nav />
            <h1>Single Trip</h1>
        </div>
    )

}
export default SingleTrip;