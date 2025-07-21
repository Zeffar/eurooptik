import React from 'react';
import serviceIcon from '../assets/images/green copy.png';

const Services = () => {
  const hrStyle = {
    width: '100vw',
    height: '2px',
    background: '#b4b1b4',
    border: 'none',
    margin: '-30px 0 15px',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw'
  };

  return (
    <>
      <section className="module" id="services">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h3 className="module-title">SERVICIILE NOASTRE</h3>
          </div>
        </div>
        <div className="container" style={{ paddingTop: '16px' }}>
          <h3 className="module-title" style={{ fontSize: '30px' }}>Clinica Chirurgicală</h3>
          <hr style={hrStyle} />
          <div className="row">
            <div className="col-sm-4 col-xs-12">
              <div className="features-item">
                <div className="features-icon" id="features-img"><img src={serviceIcon} alt="Service Icon" /></div>
                <h3 className="features-title" style={{ fontSize: '20px' }}>Operații de Cataractă</h3>
              </div>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="features-item">
                <div className="features-icon" id="features-img"><img src={serviceIcon} alt="Service Icon" /></div>
                <h3 className="features-title" style={{ fontSize: '20px' }}>Operații de Glaucom</h3>
              </div>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="features-item">
                <div className="features-icon" id="features-img"><img src={serviceIcon} alt="Service Icon" /></div>
                <h3 className="features-title" style={{ fontSize: '20px' }}>Operații Laser</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="module" id="oftalmologie-copii">
        <div className="container">
          <h3 className="module-title" style={{ fontSize: '30px' }}>Oftalmologie Copii</h3>
          <hr style={hrStyle} />
          <div className="row">
            <div className="col-sm-4 col-xs-12">
              <div className="features-item">
                <div className="features-icon" id="features-img"><img src={serviceIcon} alt="Service Icon" /></div>
                <h3 className="features-title" style={{ fontSize: '20px' }}>Stellest</h3>
              </div>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="features-item">
                <div className="features-icon" id="features-img"><img src={serviceIcon} alt="Service Icon" /></div>
                <h3 className="features-title" style={{ fontSize: '20px' }}>PlusoptiX</h3>
              </div>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="features-item">
                <div className="features-icon" id="features-img"><img src={serviceIcon} alt="Service Icon" /></div>
                <h3 className="features-title" style={{ fontSize: '20px' }}>Ortokeratologie</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;