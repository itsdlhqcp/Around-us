import React from 'react';
import './SplashScreen.css';

function SplashScreen() {
  return (
    <>
    <div className="logo-container">
      <div className="logo">
        <span className="logo-letter">T</span>
        <span className="logo-letter">N</span>
      </div>
      <div className="loading-wrapper">
         <div className="loading-dot" />
         <div className="loading-dot" />
         <div className="loading-dot" />
  </div>
  {/* <footer style={{ fontSize: '0.8rem', marginTop: '17rem' }}>
        © 2023 developed by dlhq. All rights reserved.
      </footer> */}
    </div>
 
  </>
  );
}

export default SplashScreen;
