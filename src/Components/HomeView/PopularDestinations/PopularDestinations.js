import React from 'react';
import IndividualPlaces from '../PopularDestinations/IndividualPlaces';
import places from '../../../placesArrayData';
import './PopularDestinations.scss'

const PopularDestinations = () => {

    let mappedDestinations = places.map((places, index) => {
        return <IndividualPlaces key={index} places={places}/>
    });

    return(
        <div>
            <header className="destinationsHeader">Popular Destinations</header>
        <div className='mapped-places-container'>
            {mappedDestinations}
        </div>

        </div>
    )
}
export default PopularDestinations;