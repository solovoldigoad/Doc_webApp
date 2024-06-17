
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/Register/Register';
import LoginForm from './components/Login/Login';
import Specialist from './components/Specialist/Specialist';
import DoctorCard from './components/Docter/Docter';
import DocDetails from './components/DocDetails/DocDetails';
import HospitalCard from './components/Hospital/Hospital';
import HospitalsDetails from './components/HospitalDetails/HospitalDetails';
import Slot from './components/Slot/Slot';
import Appointment from './components/Appointment/Appointment';
import { UserProvider } from './assets/UserContext/UserContext';
import HomePage from './components/Home/home';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/specialist" element={<Specialist />} />
          <Route path="/docter" element={<DoctorCard />} />
          <Route path="/docter/:id" element={<DocDetails />} />
          <Route path='/hospitals' element={<HospitalCard/>}/>
          <Route path="/hospitals/:id" element={<HospitalsDetails/>}/>
          <Route path='/slot' element={<Slot />} />
          <Route path='/appointment/:date/:day' element={<Appointment />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
