import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function AjaxModal({ url, onClose }) {
  const [showModal, setShowModal] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch the content from the server using an AJAX request
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Set the content state variable to the fetched content
        setContent(data);
      })
      .catch(error => {
        console.error('Error fetching content:', error);
      });
  }, [url]);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>AJAX Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content || 'Loading content...'}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AjaxModal;
