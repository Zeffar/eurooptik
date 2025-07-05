import React, { useState } from 'react';
// Import all team member images
import alinaPopa from '../assets/images/Angajati/Alina_Popa.png';
import anaMiller from '../assets/images/Angajati/Ana_Miller.png';
import ancaCraciun from '../assets/images/Angajati/Anca_Craciun.png';
// ... import all other images as needed

const teamMembers = [
  {
    name: 'Dr. Alina Popa',
    role: 'Medic primar oftalmolog',
    specialty: 'Specializare în oftalmologie pediatrică',
    image: alinaPopa,
    category: 'locatia-a',
  },
  {
    name: 'Dr. Ana Miller',
    role: 'Medic specialist oftalmolog',
    specialty: 'Specialist în chirurgie refractivă',
    image: anaMiller,
    category: 'locatia-b',
  },
  {
    name: 'Dr. Anca Crăciun',
    role: 'Medic specialist oftalmolog',
    specialty: 'Experiență în glaucom și boli retiniene',
    image: ancaCraciun,
    category: 'locatia-c',
  },
  // ... add all other doctors
];

const filters = [
  { label: 'Toți medicii', value: 'all' },
  { label: 'Bacău Cabinet', value: 'locatia-a' },
  { label: 'Bacău Clinică', value: 'locatia-b' },
  { label: 'Comănești', value: 'locatia-c' },
  { label: 'Onești', value: 'locatia-d' },
  { label: 'Moinești', value: 'locatia-e' },
];

const Team = () => {
  const [filter, setFilter] = useState('all');
  const filteredMembers = filter === 'all' ? teamMembers : teamMembers.filter(m => m.category === filter);

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
              {filters.map(f => (
                <button
                  key={f.value}
                  type="button"
                  className={`btn btn-round team-filter-btn${filter === f.value ? ' btn-d' : ' btn-border-d'}`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row multi-columns-row">
          {filteredMembers.map((member, idx) => (
            <div className="col-sm-6 col-md-3 col-lg-3 mb-sm-20 team-member" key={idx} data-category={member.category}>
              <div className="team-item">
                <div className="team-image">
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div className="team-detail">
                    <p className="font-serif">{member.specialty}</p>
                    <div className="team-social">
                      <a href="#"><i className="fa fa-phone"></i></a>
                      <a href="#"><i className="fa fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
                <div className="team-descr">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;