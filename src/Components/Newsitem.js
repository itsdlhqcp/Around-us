import React, { useEffect, useState } from 'react';
import'../index.css';
import { Modal, Button } from 'react-bootstrap';


const Newsitem = (props) => {
  const { title, description, imageUrl, redMore, date, key } = props;
  const [showDescription, setShowDescription] = useState(false);
  const [source, setSource] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLink, setShowLink] = useState(false);
  
  const closeModal = () => {
    setShowModal(false);
  };
 

  const handleFullArticle = () => {
    setShowModal(true);
  };

  const handleReadMore = () => {
    setShowDescription(!showDescription);
  };

  useEffect(() => {
    try {
      const url = new URL(redMore);
      setSource(url.hostname);
    } catch (error) {
      console.log('Error parsing URL:', error);
      setSource("Unknown");
    }
  }, [redMore]);

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
      <div className='card'>
        <div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            justifyContent: "flex-end",
            right: "4.1px",
          }}
        >
          <span className="badge bg-danger">
            Article By - {source ? source : "Unknown"}
          </span>
        </div>
        <img
          src={imageUrl}
          className='card-img-top'
          alt='...'
          sizes='(max-height: 576px) 100vw, (max-height: 768px) 50vw, 33vw'
          style={{ height: '17rem', objectFit: 'cover' }}
        />
        </div>
       
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
          <button
            className='btn btn-sm btn-dark ms-2'
            onClick={handleFullArticle}
          >
            Read Full Article
          </button>

          <button
            className='btn btn-outline-primary btn-sm ms-2'
            onClick={handleShare}
          >
            Share
          </button>
        </div>
      </div>

<Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(<iframe title="Link" src={redMore} style={{ width: '100%', height: '70vh' }} />) || (
            <div style={{ textAlign: 'center' }}>
              <p>Unable to display content in iframe. Click below to load content in a new modal:</p>
              <Button variant="primary" >
                Open AJAX Modal
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        {showLink ? (
      <Button variant="secondary" onClick={() => setShowLink(false)}>
        Back
      </Button>
    ) : (
      <a
      rel='noreferrer'
      href={redMore}
      target='_blank'
      className='btn btn-sm btn-dark ms-2'
    >
      Read Full Article
    </a>
    )}
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
        </Modal.Footer>
      </Modal> 
      </div>
  );
};

export default Newsitem;
