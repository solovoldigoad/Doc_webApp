import axios from 'axios';
import React, { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hospital.css';

const HospitalCard = () => {
  const [hospitals, setHospitals] = useState([]);

  const navigate = useNavigate();

  const handleHospitalCardClick = (index) => {
    navigate(`/hospitals/${index}`);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/users/hospital')
      .then((response) => {
        setHospitals(response.data);
      })
      .catch((error) => {
        console.error('Data is not fetched properly', error);
      });
  }, []);

  return (
    <div className="hospital_Screen">
      {hospitals.map((hospitals, index) => (
        <div key={index} className="card" onClick={() => handleHospitalCardClick(index)}>
          <div className="ImgDiv">
            <img src={hospitals.image} alt="doc image" />
          </div>
          <div className="hospitalsInfo">
            <div className="top_info">
              <div className="hospitals_name">
                <p>{hospitals.name}</p>
              </div>
              <div className="hospitals_year">
                <p><strong>In Service:</strong></p>
                <p>{hospitals.years_old}</p>
              </div>
            </div>
            <div className="middle_info">
              <p><strong>Phone:</strong> {hospitals.phone}</p>
            </div>
            <div className="hospitalsBottomInfo">
              <div className="location">
                <p><strong>Location:</strong> </p>
                <p>{hospitals.location}</p>
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

export default HospitalCard;
