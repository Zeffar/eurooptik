import React, { useState, useEffect } from 'react';

import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Pricing from './components/Pricing';
import AllServices from './components/AllServices';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AppointmentModal from './components/AppointmentModal';
import Footer from './components/Footer';
import ScrollUp from './components/ScrollUp';

import './index.css';

function App() {
  // State to control the visibility of the programare modal
  const [isProgramareVisible, setProgramareVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false); // For the fade-out animation

  // Functions to show/hide the modal
  const showProgramare = () => {
    setProgramareVisible(true);
    // Optional: scroll to the section after it's rendered
    setTimeout(() => {
        document.getElementById('programare-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  const hideProgramare = () => setProgramareVisible(false);

  useEffect(() => {
    // This function will run only once after the component mounts
    
    // Start the fade-out animation after a delay (e.g., 1.5 seconds)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    // Completely remove the preloader from the DOM after the fade-out animation is complete
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // This should be 1500ms delay + 500ms animation time

    // Cleanup function to clear timers if the component unmounts
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(loadTimer);
    };
  }, []); // The empty array `[]` ensures this effect runs only once.

  return (
    <>
      {isLoading ? (
        <Preloader isFading={isFading} />
      ) : (
        <>
          <Header onShowProgramare={showProgramare} />
          <main>
            <Hero onShowProgramare={showProgramare} />
            <div className="main">
              <Services />
              <Team />
              <Pricing />
              <AllServices />
              <Testimonials />
              <Contact />
              <AppointmentModal show={isProgramareVisible} onClose={hideProgramare} />
              <hr className="divider-d" />
              <Footer />
            </div>
          </main>
          <ScrollUp />
        </>
      )}
    </>
  );
}

export default App;