import React, { useState } from 'react';
import { useScroll, useScrollSpy } from '../hooks/useScroll';
import logoFull from '../assets/images/logo-full.png';

const Header = ({ onShowProgramare }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScroll();
  const activeSection = useScrollSpy();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const targetPosition = target.offsetTop - 70; // Adjust for navbar height
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar navbar-custom navbar-fixed-top one-page ${isScrolled ? 'is-fixed' : 'navbar-transparent'}`} role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button 
            className={`navbar-toggle ${isMenuOpen ? 'collapsed' : ''}`} 
            type="button" 
            onClick={toggleMenu}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="navbar-brand-center visible-xs">
            <a className="navbar-brand" href="#totop" onClick={(e) => handleLinkClick(e, '#totop')}>
              <img src={logoFull} alt="Eurooptik" style={{ maxHeight: '90px', marginTop: '-30px' }} />
            </a>
          </div>
          <div className="navbar-brand hidden-xs" style={{ float: 'left' }}>
            <a className="navbar-brand" href="#totop" onClick={(e) => handleLinkClick(e, '#totop')}>
              <img src={logoFull} alt="Eurooptik" style={{ maxHeight: '90px', marginTop: '-42px' }} />
            </a>
          </div>
        </div>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="custom-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li className={activeSection === 'totop' ? 'active' : ''}>
              <a href="#totop" id="navbar-button" onClick={(e) => handleLinkClick(e, '#totop')}>
                Acasa
              </a>
            </li>
            <li className={activeSection === 'services' ? 'active' : ''}>
              <a href="#services" id="navbar-button" onClick={(e) => handleLinkClick(e, '#services')}>
                Servicii
              </a>
            </li>
            <li className={activeSection === 'echipa-noastra' ? 'active' : ''}>
              <a href="#echipa-noastra" id="navbar-button" onClick={(e) => handleLinkClick(e, '#echipa-noastra')}>
                Echipa
              </a>
            </li>
            <li className={activeSection === 'pricing' ? 'active' : ''}>
              <a href="#pricing" id="navbar-button" onClick={(e) => handleLinkClick(e, '#pricing')}>
                Preturi
              </a>
            </li>
            <li className={activeSection === 'testimoniale' ? 'active' : ''}>
              <a href="#testimoniale" id="navbar-button" onClick={(e) => handleLinkClick(e, '#testimoniale')}>
                Testimoniale
              </a>
            </li>
            <li className={activeSection === 'adresses' ? 'active' : ''}>
              <a href="#adresses" id="navbar-button" onClick={(e) => handleLinkClick(e, '#adresses')}>
                Contact
              </a>
            </li>
            <li>
              <a 
                href="#" 
                id="navbar-button-programare" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  onShowProgramare(); 
                  setIsMenuOpen(false);
                }}
              >
                Programare
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;