// HomePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/register');
    }, 2000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <img src="app_logo.png" alt="App Logo" />
    </div>
  );
}

export default HomePage;


