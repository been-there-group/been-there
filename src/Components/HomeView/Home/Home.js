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
        props.history.push({pathname: `/search-page/${value.label}`, state: {address: value}})
    }
    console.log(value)


    return(
        <div>
            <div className="homeNav">
                <Nav />
            </div>
            <div className="home-body">
                {/* <img className='new-background-img' src='https://miro.medium.com/max/3200/1*JfM2ePprvMkJtqNcxsCn9Q.jpeg'/> */}
                {/* <div>Home</div> */}
                <div className='homeSearch'>
                    <div className='google-places-autocomplete-home'>
                        {/* {console.log(process.env.REACT_APP_GOOGLE_API)} */}
                        {/* {console.log(latitude)} */}
                        <div className='searchBarHome'>

                            <div className="search-bar-home">
                                <GooglePlacesAutocomplete className="GooglePlacesAutocomplete" apiKey= {`${key}`} selectProps={{value, onChange: setValue,}} placeholder='Where are you going?'/>
                                <button className='searchButton' onClick={() => handleClick()}>Search</button>
                            </div>
                        </div>
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
