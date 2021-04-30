import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import ItineraryAd from '../ItineraryAd/ItineraryAd';
import Nav from '../../Nav/Nav';
import Explore from '../Explore/Explore';

const Home = () => {

    return(
        <div>
            <Nav />
            <div>Home</div>
            <PopularDestinations />
            <Explore />
            <ItineraryAd />
        </div>
    )
}
export default Home;