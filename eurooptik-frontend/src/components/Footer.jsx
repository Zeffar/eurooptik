import React from 'react';
import logoSmall from '../assets/images/logo-small.png';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-message">
        <h2>Va mai asteptam la noi!</h2>
        <button className="footer-appointment-btn">Programeaza-te online</button>
      </section>
      <div className="footer-content">
        <div className="footer-locations">
          <div className="footer-location">
            <span className="footer-location-name">Bacau - clinica</span><br />Luni - Vineri, 9 - 17
          </div>
          <div className="footer-location">
            <span className="footer-location-name">Bacau</span><br />Luni - Vineri, 9 - 17
          </div>
          <div className="footer-location">
            <span className="footer-location-name">Moinesti</span><br />Luni - Vineri, 8 - 16
          </div>
          <div className="footer-location">
            <span className="footer-location-name">Comanesti</span><br />Luni - Vineri, 9 - 17
          </div>
          <div className="footer-location">
            <span className="footer-location-name">Onesti</span><br />Luni - Vineri, 9 - 17
          </div>
        </div>
        <div className="footer-center">
          <nav className="footer-menu">
            <a href="#totop">Acasa</a>
            <a href="#services">Serviciile Noastre</a>
            <a href="#echipa-noastra">Echipa Noastra</a>
            <a href="#pricing">Tarife</a>
            <a href="#testimoniale">Testimoniale</a>
            <a href="#adresses">Contact</a>
          </nav>
          <div className="footer-logo">
            <img className="footer-logo-image" src={logoSmall} alt="eurooptik logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;