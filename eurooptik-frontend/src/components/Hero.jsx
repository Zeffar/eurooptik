import React from 'react';
import logoFull from '../assets/images/logo-full.png';
import background from '../assets/images/background.png';

const Hero = ({ onShowProgramare }) => {
  return (
    <section
      className="home-section home-full-height bg-dark bg-gradient"
      id="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src={background}
        alt="Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(200,0,100,0.55) 0%, rgba(0,0,0,0.45) 100%)',
          zIndex: 2,
        }}
      />
      <div
        className="titan-caption"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="caption-content" style={{ textAlign: 'center', marginTop: '0' }}>
          <div style={{ marginBottom: '0.5em' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'Roboto Condensed, sans-serif',
                fontWeight: 400,
                fontSize: '2.5rem',
                color: '#1eb2a6',
                letterSpacing: '1px',
                marginBottom: '0.2em',
              }}
            >
              Clinica Oftalmologică
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'Volkhov, serif',
                fontWeight: 700,
                fontSize: '7vw',
                color: '#e6007e',
                lineHeight: 1,
                marginBottom: '0.2em',
                textShadow: '0 2px 16px rgba(0,0,0,0.18)',
              }}
            >
              eurooptik
            </span>
          </div>
          <div className="mb-20 text-center" style={{ marginBottom: '2em' }}>
            <img
              src={logoFull}
              alt="Eurooptik"
              style={{
                maxWidth: '340px',
                width: '60vw',
                height: 'auto',
                margin: '0 auto',
                display: 'block',
                filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.18))',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5em' }}>
            <a
              className="section-scroll btn btn-border-w btn-round"
              href="#"
              id="home-appointment-button"
              style={{
                background: '#e6007e',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                padding: '0.8em 2.2em',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '1px',
                marginRight: '0.5em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s',
              }}
              onClick={e => {
                e.preventDefault();
                onShowProgramare();
              }}
            >
              Programează-te
            </a>
            <a
              className="section-scroll btn btn-border-w btn-round"
              href="#services"
              id="home-cine-suntem-button"
              style={{
                background: '#e6007e',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                padding: '0.8em 2.2em',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '1px',
                marginLeft: '0.5em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s',
              }}
            >
              Cine Suntem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;