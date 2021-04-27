import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import ItineraryAd from '../ItineraryAd/ItineraryAd';
import Nav from '../../Nav/Nav';

const Home = () => {

    return(
        <div>
            <div>Home</div>
            <Nav />
            <PopularDestinations />
            <ItineraryAd />
        </div>
    )
}
export default Home;