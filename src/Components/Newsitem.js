import React, { useState } from 'react';

const Newsitem = (props) => {
  const { title, description, imageUrl, redMore, date, key } = props;
  const [showDescription, setShowDescription] = useState(false);

  const handleReadMore = () => {
    setShowDescription(!showDescription);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: redMore,
        })
        .then(() => console.log('Link shared successfully.'))
        .catch((error) => console.log('Error sharing link:', error));
    } else {
      console.log('Web Share API not supported.');
    }
  };

  return (
    <div key={key} className='my-3'>
      <div className='card' style={{ width: '21rem' }}>
        <img
          src={imageUrl}
          className='card-img-top'
          alt='...'
          sizes='(max-height: 576px) 100vw, (max-height: 768px) 50vw, 33vw'
          style={{ height: '17rem', objectFit: 'cover' }}
        />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          {showDescription && <p className='card-text'>{description}</p>}
          <p className='card-text'>
            <small className='text-muted'>{date}</small>
          </p>
          <button
            className='btn btn-sm btn-dark'
            onClick={handleReadMore}
          >
            {showDescription ? 'Read Less' : 'Read More'}
          </button>
          <a
            rel='noreferrer'
            href={redMore}
            target='_blank'
            className='btn btn-sm btn-dark ms-2'
          >
            Read Full Article
          </a>
          <button
            className='btn btn-outline-primary btn-sm ms-2'
            onClick={handleShare}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
