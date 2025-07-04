import React from 'react';
// Import all team member images
import alinaPopa from '../assets/images/Angajati/Alina_Popa.png';
import anaMiller from '../assets/images/Angajati/Ana_Miller.png';
// ... import all 8 images

const Team = () => {
  // NOTE: The filtering logic will be handled in React using a state variable, e.g.,
  // const [filter, setFilter] = useState('all');
  // You would then filter an array of doctor data before mapping over it to render the members.
  return (
    <section className="module" id="echipa-noastra">
      <div className="team-section-decor"></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <h3 className="module-title" style={{ fontSize: '30px' }}>ECHIPA NOASTRĂ</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center mb-40">
            <div className="location-buttons-container">
              <button type="button" className="btn btn-round team-filter-btn" data-filter="all">Toți medicii</button>
              <button type="button" className="btn btn-round team-filter-btn" data-filter="locatia-a">Bacău Cabinet</button>
              {/* ... other filter buttons ... */}
            </div>
          </div>
        </div>
        <div className="row multi-columns-row">
          {/* Doctor 1 */}
          <div className="col-sm-6 col-md-3 col-lg-3 mb-sm-20 team-member" data-category="locatia-a">
            <div className="team-item">
              <div className="team-image">
                <img src={alinaPopa} alt="Alina Popa" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div className="team-detail">
                  <p className="font-serif">Specializare în oftalmologie pediatrică</p>
                  <div className="team-social">
                    <a href="#"><i className="fa fa-phone"></i></a>
                    <a href="#"><i className="fa fa-envelope"></i></a>
                  </div>
                </div>
              </div>
              <div className="team-descr">
                <div className="team-name">Dr. Alina Popa</div>
                <div className="team-role">Medic primar oftalmolog</div>
              </div>
            </div>
          </div>
          {/* ... Repeat for all 8 doctors, using the imported image variables ... */}
        </div>
      </div>
    </section>
  );
}

export default Team;