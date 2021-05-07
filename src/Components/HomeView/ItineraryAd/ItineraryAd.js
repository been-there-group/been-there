import React from 'react';
import './ItineraryAd.scss';

const ItineraryAd = () => {

    return(
        <section className='itinerary'>
            <div className='itineraryWords'>
                <header className='itineraryHeader'>Checkout our new Itinerary feature!</header>
                <p className='itineraryText'> Plan your trip one day at a time using our <p className='myTripAd'>My Trip</p> feature. Assign activities to each day of your trip to keep your vacation organized so you can focus on having fun.</p>
            </div>
            <img className='ad-image' src='https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbm5lcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60' />
        </section>
    )
}
export default ItineraryAd;