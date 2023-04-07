import React from 'react';
import './SplashScreen.css';
import logo from './assets/clipart68616.png'; // Import the CSS file for styling

function SplashScreen() {
  return (
    // <div className="splash-screen">
    //   {/* <img src="splash-image.jpg" alt="Splash Screen Image" /> */}
    //   <h1>Welcome to our newsapp project!</h1>
    //   <p>Loading...</p>
    // </div>
    <>
    
    <div className="logo-wrapper">
    <img src={logo} alt="Logo" className="logo" width="165" height="165"/>
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
