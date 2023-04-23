import React, { useState } from 'react';
import './SplashScreen.css'; // Import the CSS file for styling
import { Container } from 'react-bootstrap';
import '../GptUrl.css';
import Loading from 'react-loading';

function AskGpt() {
  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoad = () => {
    setIsLoading(false);
  }

  return (
    <div style={{ margin: "7px 0px 7px 0px" }}>
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Loading type='spin' color='#000000' />
        </div>
      )}
      <Container>
        <iframe
          src="https://chatgpt.sonng.dev/"
          title="Example website"
          width="100%"
          height="600px"
          onLoad={handleOnLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </Container>
    </div>
  );
}

export default AskGpt;
