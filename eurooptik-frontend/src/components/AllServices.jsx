import React from 'react';
import workItemImage from '../assets/images/green.png';

const AllServices = () => {
  // NOTE: This is another Isotope grid. Like the Team section, this filtering
  // will be replaced by React state management.
  return (
    <section className="module" id="works-copy" style={{ backgroundColor: '#39a58f28' }}>
      <div className="container">
        {/* ... Title ... */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <ul className="filter" id="filters-copy">
              <li><a className="wow fadeInUp filters-copy-btn" href="#" data-filter="*">Dr. oftalmologi <span className="arrow-indicator"></span></a></li>
              {/* ... other filter links ... */}
            </ul>
          </div>
        </div>
      </div>
      <ul className="works-grid works-grid-gut works-hover-w" id="works-grid-copy">
        {/* Work Item */}
        <li className="work-item illustration webdesign">
          <a href={workItemImage} data-caption="test">
            <div className="work-image"><img src={workItemImage} alt="Portfolio Item" /></div>
            <div className="team-name" id="nume-doctori">Mihai Stancu</div>
            <div className="team-role" id="descriere-doctori"> Optometrist</div>
          </a>
        </li>
        {/* ... Repeat for all work items ... */}
      </ul>
    </section>
  );
}

export default AllServices;