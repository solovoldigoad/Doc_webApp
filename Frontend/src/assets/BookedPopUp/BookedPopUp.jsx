
import React , {useState} from "react";
import './BookedPop.css';


const BookeedPopUp = ({onClosBook}) =>{
    const handleBooked = () =>{
            onClosBook();
    };

    return(
        <div className="timePopup">

        <div className="popupContent">
        <div className="rowDisplay">
            <h2 id="booked">Slot is already booked</h2>
        </div>
        <div className="sveBtn">
        <button onClick={handleBooked}>Close</button>
        </div>
        </div>
    </div>
    )
}

export default BookeedPopUp;
