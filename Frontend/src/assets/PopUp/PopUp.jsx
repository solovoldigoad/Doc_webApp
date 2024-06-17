import React , {useState} from "react";
import './PopUp.css';
import { IoClose} from 'react-icons/io5';
import { useAsyncError, useNavigate } from "react-router-dom";

const TimePopUp = ({onSave , onClose}) =>{

    const [hour , setHour] = useState('');
    const [min , setMin] = useState('');


    const handleSave = () =>{
        onSave(hour , min);
            onClose();
    };



    const handleHourChange = (e) =>{
        let value = e.target.value;
        if(value.length <=2){
            if( value <0) value = '00';
            if(value > 24) value = '24';
            console.log(value)
            setHour(parseInt(value))
        }
    }

    const handleMinChange = (e) => {
        let value = e.target.value;
        if (value.length <= 2) {
            if (value < 0) value = '00';
            if (value > 60) value = '60';
            if (value.length === 2) {
                let firstDigit = value[0];
                let secondDigit = value[1];
                
                if (firstDigit === '6') {
                    firstDigit = '0';
                }
                
                if (secondDigit !== '0' && secondDigit < '5') {
                    secondDigit = '5';
                } else if (secondDigit > '5') {
                    secondDigit = '0';
                }
                
                value = `${firstDigit}${secondDigit}`;
            }
            console.log(value);
            setMin(parseInt(value));
        }
    };
    
    return(
        <div className="timePopup">
        <div className="closBtn"> 
        <span className="close-popup">
        <IoClose  onClick={handleSave}/>
    </span>   
        </div>
        <div className="popupContent">
        <div className="rowDisplay">
        <div className="HourTime">
            <p className="timeName">Hour</p>
            <input className="lableValue" type="number" value={hour} onChange={handleHourChange}
            min="0"
            max="24"
            />
        </div>
        <div className="midCloum">
            <p id="colun">:</p>
        </div>
        <div className="MinTime">
            <p className="timeName">Min</p>
            <input className="lableValue" type="number" value={min} onChange={handleMinChange}
            min="0"
            max="60"
            />
        </div>
        </div>
        <div className="sveBtn">
        <button onClick={handleSave}>Save</button>
        </div>
        </div>
    </div>
    )
}

export default TimePopUp;



