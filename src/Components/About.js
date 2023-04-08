import React from 'react';
import './SplashScreen.css'; // Import the CSS file for styling

function AboutUs() {
  return (
    <>
      <div className="container my-5">
        <div className="card text-white bg-dark my-5">
          <div className="card-header border-light">
            <b> <span style={{ color: 'blue', fontWeight: 'bold' }}>ABOUT US</span></b>
          </div>
          <div className="card-body">
            <ul style={{ listStyleType: "square" }}>
              <li>
                <h5>
                  TopNews is a News app build to give important news
                  information to everyone.
                </h5>
              </li>
              <li>
                <h5>React Library is mainly used to build the TopNews App</h5>
              </li>
              <li>
                <h5>
                  Bootstrap is Used as the CSS Framework for styling the
                  TopNews App
                </h5>
              </li>
              <li>
                <h5>For the latest news News Api is used as the backend.</h5>
              </li>
              <li>
                <h5>Some Features of TopNews &rarr;</h5>
                <ul>
                  <li>The app uses News Api to fetch all the data.</li>
                  <li>
                    The user can find news related to different categories on
                    the Landing page.
                  </li>
                  <li>The user can also search news by searching keywords.</li>
                  <li>The app uses function based react components.</li>
                  <li>
                    Some features like Top Loading Bar and Infinite Scroll are
                    also Included.
                  </li>
                  <li>It is completely Device Responsive</li>
                  <li>All the Rights are reserved by TopNews. </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
