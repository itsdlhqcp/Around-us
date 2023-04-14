import React, { useState, useEffect } from 'react';

function ScrollTop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <div>
      {scrollPosition > 100 && (
        <button onClick={handleClick} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          &#8593;
        </button>
      )}
    </div>
  );
}
export default ScrollTop;