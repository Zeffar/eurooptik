import React from 'react';

const Pricing = () => {
  return (
    <section className="module" id="pricing">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center mb-40">
            <div className="location-buttons-container">
              <button type="button" className="btn btn-border-d btn-round location-btn" data-location="bacau">Bacău</button>
              <button type="button" className="btn btn-border-d btn-round location-btn" data-location="moinesti">Moinești</button>
              <button type="button" className="btn btn-border-d btn-round location-btn" data-location="comanesti">Comănești</button>
            </div>
          </div>
        </div>
        <div className="row price-row multi-columns-row" id="pricing-tables">
          <div className="pricing-container">
            <div className="col-sm-4 col-xs-12">
              <div className="price-table standard">
                <h4>Consultație Standard</h4>
                <div className="borderline"></div>
                <p className="price"><span>RON</span><span className="price-value" data-bacau="150" data-moinesti="130" data-comanesti="120">---</span></p>
                <ul className="price-details">
                </ul>
                <a className="btn btn-d btn-round" href="https://eurooptik.ro.programarionline.sophtha.com/">Programare</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;