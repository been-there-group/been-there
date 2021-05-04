import React, {useState} from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import ItineraryAd from '../ItineraryAd/ItineraryAd';
import Nav from '../../Nav/Nav';
import Explore from '../Explore/Explore';
import Footer from '../../Footer/Footer';
import './Home.scss';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Home = (props) => {
    const [value, setValue] = useState("");
    const key = process.env.REACT_APP_GOOGLE_API

    function handleClick(){
        props.history.push({pathname: '/search-page', state: {address: value}})
    }


    return(
        <div>
            <Nav />
            <div className="home-body">
                <div>Home</div>
                <div className='homeSearch'>
                    <div className='google-places-autocomplete'>
                        {/* {console.log(process.env.REACT_APP_GOOGLE_API)} */}
                        {/* {console.log(latitude)} */}
                        <GooglePlacesAutocomplete apiKey= {`${key}`} selectProps={{value, onChange: setValue,}} />
                        <button onClick={() => handleClick()}>Search</button>
                    </div>
                </div>
                <PopularDestinations />
                <Explore />
                <ItineraryAd />
                <Footer />
                </div>
        </div>
    )
}
export default Home;