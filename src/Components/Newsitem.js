import React, { useEffect, useState } from 'react';
import'../index.css';
import { Modal, Button } from 'react-bootstrap';
import translate from "translate";

const Newsitem = (props) => {
  const { title, description, imageUrl, redMore, date, key } = props;
  const [showDescription, setShowDescription] = useState(false);
  const [source, setSource] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");
  const [language, setLanguage] = useState("en");
  const [showTag, setShowTag] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTag(false);
    }, 5000);
  
    return () => {
      clearTimeout(timer); // Clear the timeout if the component unmounts before 7 seconds
    };
  }, []);

  useEffect(() => {
    const translateTitleAndDescription = async () => {
      // Translation code...
  
      const isFirstVisit = !localStorage.getItem('visited');
      if (isFirstVisit) {
        setShowTag(true); // Show the tag for first-time visitors
        localStorage.setItem('visited', 'true'); // Set a flag in localStorage indicating the user has visited
      }
    };
  
    translateTitleAndDescription();
  }, [title, description, language]);
  
  
  

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

  //language functions
  useEffect(() => {
    const translateTitleAndDescription = async () => {
      const [translatedTitle, translatedDescription] = await Promise.all([
        translate(title, { to: language }),
        translate(description, { to: language }),
      ]);
      setTranslatedTitle(translatedTitle);
      setTranslatedDescription(translatedDescription);
    };
    translateTitleAndDescription();
  }, [title, description, language]);

  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setShowLanguageSwitcher(false); // Close the language switcher
  };

  const toggleLanguageSwitcher = () => {
    setShowLanguageSwitcher(!showLanguageSwitcher);
    setShowTag(false); // Hide the tag
  };

 

  const languageOptions = [
    { label: "ENGLISH", value: "en" },
    { label: "മലയാളം", value: "ml" },
    { label: "हिंदी", value: "hi" },
    { label: "Français", value: "fr" },
  ];

  
  return (
    <div key={key} className='my-3'>
      <div className='card'>
        <div>
        <div className="position-relative">
        {showTag && (
        <span className="tag">Translate to your language</span>
            )}
            {showLanguageSwitcher && (
              <div className="language-switcher">
                <select value={language} onChange={handleLanguageChange}>
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button onClick={toggleLanguageSwitcher}>---ꜱᴇʟᴇᴄᴛ ᴛᴏ ᴛʀᴀɴꜱʟᴀᴛᴇ ʟᴀɴɢᴜᴀɢᴇ---</button>
              </div>
            )}
            {!showLanguageSwitcher && (
              <button
                className="btn btn-sm btn-link position-absolute top-0 start-0"
                onClick={toggleLanguageSwitcher}
              >
                诶𝒜
              </button>
            )}
          </div>
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
          <h5 className='card-title'>{translatedTitle || title}</h5>
          {showDescription && <p className='card-text'>{translatedDescription || description}</p>}
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
