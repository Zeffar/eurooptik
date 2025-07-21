import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './styles/global.css';
import './styles/header.css';
import './index.css';

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

function App() {
  const [isProgramareVisible, setProgramareVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [activeLocation, setActiveLocation] = useState('Moinesti');
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3
      }
    );

    const heroSection = document.querySelector('#hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const showProgramare = () => {
    setProgramareVisible(true);
    setTimeout(() => {
      document.getElementById('programare-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const hideProgramare = () => {
    setProgramareVisible(false);
  };

  if (isLoading) {
    return <Preloader isFading={isFading} />;
  }

  return (
    <div className="main-wrapper">
      <Header onShowProgramare={showProgramare} isTransparent={isHeroVisible} />
      <main>
        <Hero />
        <Services />
        <Team />
        <Pricing />
        <AllServices />
        <Testimonials />
        <Contact />
        {isProgramareVisible && (
          <AppointmentModal onClose={hideProgramare} />
        )}
        <Footer activeLocation={activeLocation} onLocationChange={setActiveLocation} />
        <ScrollUp />
      </main>
    </div>
  );
}

export default App;