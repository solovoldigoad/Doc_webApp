import axios from 'axios';
import React, { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import './Docter.css';


const DoctorCard = () => {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = (index) => {
    navigate(`/docter/${index}`);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/users/doctor')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Data is not fetched properly', error);
      });
  }, []);

  return (
    <div className="docter_Screen">
      {doctors.map((doctor, index) => (
        <div key={index} className="card" onClick={() => handleCardClick(index)}>
          <div className="ImgDiv">
            <img src={doctor.image} alt="doc image" />
          </div>
          <div className="DocInfo">
            <div className="top_info">
              <div className="Doc_name">
                <p>{doctor.name}</p>
              </div>
              <div className="exp">
                <p><strong>Exp:</strong></p>
                <p>{doctor.experience}</p>
              </div>
            </div>
            <div className="middle_info">
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
            </div>
            <div className="DocBottomInfo">
              <div className="location">
                <p><strong>Location:</strong> </p>
                <p>{doctor.location}</p>
              </div>
              <div className="data_info">
                <div className="timer"><p> time:</p></div>
                <div id="time"><p>7:00-10:00</p></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCard;
