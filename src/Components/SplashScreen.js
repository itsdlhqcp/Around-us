import React from 'react';
import './SplashScreen.css';
import logo from './assets/clipart68616.png'; // Import the CSS file for styling

function SplashScreen() {
  return (
    <>
    <div className="logo-wrapper">
    <img src={logo} alt="Logo" className="logo" width="180" height="182"/>
    </div>
    <h1 style={{ color: 'red', fontFamily: 'italic' }}>Loading TopNews</h1>
    <div className="loading-wrapper">
    <div className="loading-dot" />
    <div className="loading-dot" />
    <div className="loading-dot" />
  </div>
  <footer style={{ fontSize: '0.8rem', marginTop: '17rem' }}>
        © 2023 developed by dlhq. All rights reserved.
      </footer>
  </>
  );
}

export default SplashScreen;
