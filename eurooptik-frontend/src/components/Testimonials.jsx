import React from 'react';
import TestimonialsSlider from './TestimonialsSlider';

const Testimonials = () => {
  return (
    <section className="module" id="testimoniale" style={{ backgroundColor: '#504c4c' }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h2 className="module-title" style={{ color: '#F5F3ED' }}>TESTIMONIALE</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TestimonialsSlider />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;