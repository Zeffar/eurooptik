import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'Maria Popescu',
    text: 'Servicii excelente și personal foarte amabil! Recomand cu încredere.',
  },
  {
    name: 'Ion Ionescu',
    text: 'Profesionalism și atenție la detalii. Mulțumesc echipei Eurooptik!',
  },
  {
    name: 'Elena Georgescu',
    text: 'O experiență foarte plăcută, totul a decurs perfect.',
  },
];

const TestimonialsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {testimonials.map((t, idx) => (
        <div key={idx} className="testimonial-slide">
          <div className="testimonial-content">
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">{t.name}</div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TestimonialsSlider;
