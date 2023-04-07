import React from 'react';
import './SplashScreen.css';
import logo from './assets/clipart68616.png'; // Import the CSS file for styling

function SplashScreen() {
  return (
    <>
    <div className="logo-wrapper">
    <img src={logo} alt="Logo" className="logo" width="175" height="175"/>
    </div>
    <h1 style={{ color: 'red', fontFamily: 'italic' }}>Hot Headlines</h1>
    <div className="loading-wrapper">
    <div className="loading-dot" />
    <div className="loading-dot" />
    <div className="loading-dot" />
  </div>
  </>
  );
}

export default SplashScreen;
