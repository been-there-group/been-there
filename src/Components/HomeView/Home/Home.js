import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import ItineraryAd from '../ItineraryAd/ItineraryAd';
import Nav from '../../Nav/Nav';
import Explore from '../Explore/Explore';
import Footer from '../../Footer/Footer';
import './Home.scss';

const Home = () => {

    return(
        <div>
            <Nav />
            <div className="home-body">
            <div>Home</div>
            <PopularDestinations />
            <Explore />
            <ItineraryAd />
            <Footer />
            </div>
        </div>
    )
}
export default Home;