import React from 'react';
import logoFull from '../assets/images/logo-full.png';
import background from '../assets/images/background.png';

const Hero = ({ onShowProgramare }) => {
  return (
    <section className="home-section home-full-height bg-dark bg-gradient" id="home">
      <img src={background} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
      <div className="titan-caption">
        <div className="caption-content">
          <div className="mb-20 text-center">
            <img src={logoFull} alt="Eurooptik" style={{ maxWidth: '50%', height: 'auto', marginBottom: '-40px' }} />
          </div>
          <a className="section-scroll btn btn-border-w btn-round" href="#" id="home-appointment-button" onClick={(e) => { e.preventDefault(); onShowProgramare(); }}>
            Programează-te
          </a>
          <a className="section-scroll btn btn-border-w btn-round" href="#services" id="home-cine-suntem-button">
            Cine Suntem
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;