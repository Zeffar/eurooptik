import React from 'react';
import logoFull from '../assets/images/logo-full.png'; // Make sure this path is correct

const Header = ({ onShowProgramare }) => { // We pass the function as a prop
  // NOTE: The mobile menu toggle (data-toggle="collapse") will need to be implemented
  // using React's `useState` hook to manage the menu's open/closed state.
  return (
    <nav className="navbar navbar-custom navbar-transparent navbar-fixed-top one-page" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#custom-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="navbar-brand-center visible-xs">
            <a className="navbar-brand" href="#totop">
              <img src={logoFull} alt="Eurooptik" style={{ maxHeight: '90px', marginTop: '-30px' }} />
            </a>
          </div>
          <div className="navbar-brand hidden-xs" style={{ float: 'left' }}>
            <a className="navbar-brand" href="#totop">
              <img src={logoFull} alt="Eurooptik" style={{ maxHeight: '90px', marginTop: '-42px' }} />
            </a>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="custom-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#totop" id="navbar-button">Acasa</a></li>
            <li><a className="section-scroll" href="#services" id="navbar-button">Servicii</a></li>
            <li><a className="section-scroll" href="#echipa-noastra" id="navbar-button">Echipa</a></li>
            <li><a className="section-scroll" href="#pricing" id="navbar-button">Preturi</a></li>
            <li><a className="section-scroll" href="#testimoniale" id="navbar-button">Testimoniale</a></li>
            <li><a className="section-scroll" href="#adresses" id="navbar-button">Contact</a></li>
            <li>
              <a href="#" id="navbar-button-programare" onClick={(e) => { e.preventDefault(); onShowProgramare(); }}>
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