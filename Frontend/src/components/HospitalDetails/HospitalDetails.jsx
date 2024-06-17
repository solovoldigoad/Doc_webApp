
import React, { useEffect, useState } from 'react';
import './HospitalDetails.css';
import { useParams } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HospitalsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, sethospital] = useState(null);

  const SetYourSlot = ()=>{
    navigate('/slot')
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/users/hospital`)
      .then((response) => {
        const selectedDoctor = response.data[id];
        sethospital(selectedDoctor);
      })
      .catch((error) => {
        console.error('Data is not fetched properly', error);
      });
  }, [id]);

  if (!hospital) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <div className="hospitalDatils">
      <div className="hospitalImg">
        <img src={hospital.image} alt="" />
      </div>
      <div className="top_data">
        <div className="tophospitalDetails">
          <div><p id="hospitalName">{hospital.name}</p>
          <p id="spec">Phone No: {hospital.phone}</p></div>
          <p id="star"></p>
        </div>
        <div className="social_info">
          <PhoneIcon />
          <EmailIcon />
          <MessageIcon />
        </div>
      </div>
      <div className="about">
        <p id='hospitalAbout' >About Hospital</p>
        <p>{hospital.about}</p>
      </div>
      <div className="bottom_info">
        <div className="exp">
          <p>In Service:</p>
          <p>{hospital.years_old}</p>
        </div>
        <div className="time">
          <p>Time</p>
          <p>2:00-5:00</p>
        </div>
      </div>
      <button id='first' className="hospital_btn" >Next Available Slot</button>
      <button id="second" className="hospital_btn" onClick={SetYourSlot}>Convenient Slot Booking </button>
    </div>
  );
};

export default HospitalsDetails;