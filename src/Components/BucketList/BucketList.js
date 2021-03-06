import { React, useEffect, useState, createRef} from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savedPlaces } from '../../redux/bucketReducer';
import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

import RealBackground from "../../assets/RealBackground.png"
import pushpin from "../../assets/pushpin.png"
import './BucketList.scss';

const BucketList = () => {
    const { saved } = useSelector((state) => state.bucketReducer);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { user_id } = user;
    console.log(user_id)
;

    //the object we get back from this axios call is the bucket_activities table, a user_id and a place_id, and place_name
    useEffect(() => {
        if (user_id) {
            axios.get(`/api/bucketList/${user_id}`)
            .then((res) => {
                dispatch(savedPlaces(res.data));
            })
            .catch((err) => console.log(err));
        }

    }, [dispatch, user_id])





    const mappedPlaces = saved.map((places) => {
        console.log(places)
        return (
            <div className="place-container" key={places.place_id}>
                <img className="pushpin" alt="" src={pushpin}/>
                <img className="bucket-list-images" alt="" src={places.bucket_list_image}/>
                <div id="place-name">
                    <p>{places.place_name}</p>
                </div>
            </div>
        );
    });

    
    return(
        <div className="bucket-body">
            <Nav/>
            <div className="mapped-container">
                <header>Your Bucket List</header>
                <img className="header-image" alt="" src={RealBackground} />
                <div className="bucket-list-container">
                {mappedPlaces}
                {/* <div className='bl-footer'><Footer /></div> */}
            
                </div>
            </div>
        </div>
    )
}
export default BucketList;