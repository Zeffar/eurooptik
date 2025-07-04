
import React from 'react';

const Preloader = ({ isFading }) => {
  return (
    <div className={`page-loader ${isFading ? 'fade-out' : ''}`}>
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Preloader;