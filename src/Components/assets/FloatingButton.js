import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const FloatingButton = () => {
  const [showButton, setShowButton] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Hello');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(false);
    }, 7500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(opacity => opacity - 0.1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {showButton && (
        <button
          onClick={handleClick}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            borderRadius: "20%",
            backgroundColor: "#5A5A5A",
            color: "white",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "2px 2px 5px grey",
            cursor: "pointer",
            opacity: opacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <span style={{ fontSize: "25px" }}>+</span>
        </button>
      )}
    </div>
  );
};

export default FloatingButton;
