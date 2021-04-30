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



    let mappedPlaces = saved.map((places) => {
        console.log(places)
        
        return (
            <div>
                <p>{places.name}</p>
            
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