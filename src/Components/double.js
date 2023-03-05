import React from 'react';

function ShareButton(props) {
  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: props.title,
        text: props.text,
        url: props.url,
      })
      .then(() => console.log('Link shared successfully.'))
      .catch((error) => console.log('Error sharing link:', error));
    } else {
      console.log('Web Share API not supported.');
    }
  }

  return (
    <button className="btn btn-outline-primary" onClick={handleClick}>
      Share Link
    </button>
  );
}
