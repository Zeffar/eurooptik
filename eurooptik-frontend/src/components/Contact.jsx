import React, { useState, useEffect, useRef } from 'react';

const locations = [
  {
    id: 1,
    title: 'Bacău',
    address: 'Str. Exemplu 1',
    phone: '0234 567 890',
    email: 'bacau@eurooptik.ro'
  },
  {
    id: 2,
    title: 'Moinești',
    address: 'Str. Exemplu 2',
    phone: '0235 678 901',
    email: 'moinesti@eurooptik.ro'
  },
  {
    id: 3,
    title: 'Bacău',
    address: 'Str. Exemplu 1',
    phone: '0234 567 890',
    email: 'bacau@eurooptik.ro'
  },
  {
    id: 4,
    title: 'Moinești',
    address: 'Str. Exemplu 2',
    phone: '0235 678 901',
    email: 'moinesti@eurooptik.ro'
  },
  {
    id: 5,
    title: 'Bacău',
    address: 'Str. Exemplu 1',
    phone: '0234 567 890',
    email: 'bacau@eurooptik.ro'
  }
];

const Contact = () => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Function to handle scrolling right
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Calculate scroll amount based on the width of one card + margin
      const scrollAmount = container.firstElementChild.offsetWidth + 20; 
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Function to handle scrolling left
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.firstElementChild.offsetWidth + 20;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Effect to update the arrow states when the component mounts or on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateArrows = () => {
      const atStart = container.scrollLeft <= 0;
      const atEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1; // -1 for precision
      setIsAtStart(atStart);
      setIsAtEnd(atEnd);
    };

    // Initial check
    updateArrows();
    // Add event listener for scroll events
    container.addEventListener('scroll', updateArrows);

    // Cleanup: remove event listener when the component unmounts
    return () => container.removeEventListener('scroll', updateArrows);
  }, []); // Empty array ensures this effect runs only once on mount

  const hrStyle = {
    width: '100vw', height: '2px', background: '#b4b1b4', border: 'none',
    margin: '-30px 0 0px', position: 'relative', left: '50%', right: '50%',
    marginLeft: '-50vw', marginRight: '-50vw',
  };

  return (
    <section className="module" id="adresses">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2 className="module-title">CONTACT</h2>
            <hr style={hrStyle} />
          </div>
        </div>
        <div className="addresses-wrapper">
          {/* Step 2: Attach the ref to the scrollable container and use the .map() function */}
          <div className="d-flex flex-wrap justify-content-center mt-40" id="addressCards" ref={scrollContainerRef}>
            {locations.map((location) => (
              // The `key` prop is crucial for React to efficiently update the list
              <div className="card text-center m-2" key={location.id}>
                <div className="card-body p-3">
                  <h5 className="card-title">{location.title}</h5>
                  <p className="card-text mb-1">{location.address}</p>
                  <p className="card-text mb-1"><i className="fa fa-phone"></i> {location.phone}</p>
                  <p className="card-text"><i className="fa fa-envelope"></i> {location.email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="address-navigation">
            {/* Step 3: Add onClick handlers and conditional styling to the buttons */}
            <button 
              className="nav-arrow prev-arrow" 
              aria-label="Previous"
              onClick={handleScrollLeft}
              style={{ opacity: isAtStart ? 0.5 : 1, cursor: isAtStart ? 'not-allowed' : 'pointer' }}
              disabled={isAtStart}
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            <button 
              className="nav-arrow next-arrow" 
              aria-label="Next"
              onClick={handleScrollRight}
              style={{ opacity: isAtEnd ? 0.5 : 1, cursor: isAtEnd ? 'not-allowed' : 'pointer' }}
              disabled={isAtEnd}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;