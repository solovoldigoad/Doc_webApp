import React, { useEffect, useState } from 'react';
import './DocDetails.css';
import { useParams } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  const SetYourSlot = ()=>{
    navigate('/slot')
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/users/doctor`)
      .then((response) => {
        const selectedDoctor = response.data[id];
        setDoctor(selectedDoctor);
      })
      .catch((error) => {
        console.error('Data is not fetched properly', error);
      });
  }, [id]);

  if (!doctor) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <div className="DocDatils">
      <div className="docImg">
        <img src={doctor.image} alt="" />
      </div>
      <div className="top_data">
        <div className="topDocDetails">
          <div><p id="name">{doctor.name}</p>
          <p id="spec">Specialist : {doctor.specialization}</p></div>
          <p id="star"></p>
        </div>
        <div className="social_info">
          <PhoneIcon />
          <EmailIcon />
          <MessageIcon />
        </div>
      </div>
      <div className="about">
        <p id='DocAbout' >About Doctor</p>
        <p>{doctor.about}</p>
      </div>
      <div className="bottom_info">
        <div className="exp">
          <p>Exp</p>
          <p>{doctor.experience}</p>
        </div>
        <div className="time">
          <p>Time</p>
          <p>2:00-5:00</p>
        </div>
      </div>
      <button id='first' className="doc_btn" >Next Available Slot</button>
      <button id="second" className="doc_btn" onClick={SetYourSlot}>Convenient Slot Booking </button>
    </div>
  );
};

export default DocDetails;
