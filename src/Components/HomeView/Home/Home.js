import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import ItineraryAd from '../ItineraryAd/ItineraryAd';
import Nav from '../../Nav/Nav';

const Home = () => {

    return(
        <div>
            <Nav />
            <div>Home</div>
            <PopularDestinations />
            <ItineraryAd />
        </div>
    )
}
export default Home;