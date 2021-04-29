import { React, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savedPlaces } from '../../redux/bucketReducer';
import Nav from '../Nav/Nav';

const BucketList = () => {
    const { saved } = useSelector((state) => state.bucketReducer);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    // const apiKey = 'AIzaSyAvmPNj0VsuaM2G38qmjMDg7BkzbqebKJo';
    const { user_id } = user;
    console.log(user_id)

    useEffect(() => {
        if (user_id) {
            axios.get(`/api/bucketList/${user_id}`)
            .then((res) => {
                dispatch(savedPlaces(res.data));
            })
            .catch((err) => console.log(err));
        }
    }, [dispatch, user_id])

    useEffect(() => {
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJIZ4tCFMJK4cRF10FJZ3pXCE&key=AIzaSyAvmPNj0VsuaM2G38qmjMDg7BkzbqebKJo`)
        .then((res) => console.log(res.data))
    })

    let mappedPlaces = saved.map((places) => {
        console.log(places)
        
        return (
            <div>
                <p>{places.place_id}</p>
            
            </div>
        );
    });

    return(
        <div>
            <Nav/>
            <h1>BucketList</h1>
            {mappedPlaces}

        </div>
    )
}
export default BucketList;