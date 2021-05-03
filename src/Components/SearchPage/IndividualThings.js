import React, {useState} from 'react';
import Modal from './Modal';


const IndividualPlaces = (props) => {
  const [show, setShow] = useState(false);

  const showModal = e => {
    setShow(!show) 
  };

  return(
    <div>
      <Modal show={show} showModal={showModal} places={props.places}/>
      <button  onClick={e => {
        showModal();
      }}
      > {props.places.name} </button>
    </div>
  )
}

export default IndividualPlaces;