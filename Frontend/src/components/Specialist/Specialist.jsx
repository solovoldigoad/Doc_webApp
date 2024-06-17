

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Specialist.css';
import { UserContext } from '../../assets/UserContext/UserContext';

const Specialist = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="topbar">
        <div>
          {user ? <h3>Welcome, {user.username}!</h3> : <h3>No user registered</h3>}
        </div>
      </div>
      <h5 id="hello">HELLO HOW CAN WE HELP</h5>
      <div className="searcrhBar">
        <input
          type="text"
          className="search"
          placeholder="  Search"
        />
        <button className="btn-search">Search</button>
      </div>
      <p id="type">types</p>
      
      <div className='type-box'>
      <div className="catagory">
        <div className="major-type">
            <img src="doc1.png" alt="" id="doc" onClick={() => navigate('/docter')} />
            <p className="type-name">Doctor</p>
        </div>
        <div className="major-type">
          <img src="hospital.png" alt="" onClick={() => navigate('/hospitals')}id="hospital" />
          <p className="type-name">Hospital</p>
        </div>
      </div>
      </div>
      <h4>SPECIALIST CATEGORIES</h4>
      <div className="image-row">
        <div className="image-column">
          <div className="image-info">
            <img src="heart.png" alt="heart" />
            <p className="img-name">Cardiologists</p>
          </div>
          <div className="image-info">
            <img src="brain.jpg" alt="brain" />
            <p className="img-name">Neurologist</p>
          </div>
          <div className="image-info">
            <img src="kidney.webp" alt="kidney" />
            <p className="img-name">Nephrologist</p>
          </div>
        </div>
        <div className="image-column">
          <div className="image-info">
            <img src="bone1.png" alt="bones" />
            <p className="img-name" id="bone">Orthopedic</p>
          </div>
          <div className="image-info">
            <img src="gynoaclogies.png" alt="vigina" />
            <p className="img-name">Gynaecologist</p>
          </div>
          <div className="image-info">
            <img src="childDoc.jpg" alt="child" />
            <p className="img-name">Pediatrician</p>
          </div>
        </div>
        <div className="image-column">
          <div className="image-info">
            <img src="teeth.jpg" alt="teeth" />
            <p className="img-name" id="dentist">Dentist</p>
          </div>
          <div className="image-info">
            <img src="animal.png" alt="animal" />
            <p className="img-name">Veterinarian</p>
          </div>
          <div className="image-info">
            <img src="pipal.jpg" alt="pimple" />
            <p className="img-name">Dermatologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialist;
