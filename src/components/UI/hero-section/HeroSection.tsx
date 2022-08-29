import React from 'react';
import Slider from 'react-slick';
import hero1 from '../../../assets/hero-section/1.jpg';
import hero2 from '../../../assets/hero-section/2.jpg';
import hero3 from '../../../assets/hero-section/3.jpg';
import hero4 from '../../../assets/hero-section/4.jpg';
import './hero-section.scss';

function HeroSection () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    appendDots: (dots:any) => (
            <div
              style={{
                backgroundColor: 'transparent',
                borderRadius: '20px',
                // padding: "10px"
                bottom: '10px'
              }}
            >
              <ul style={{ fontSize: '20px' }}> {dots} </ul>
            </div>
    )
  };
  return (
        <div className="hero__section__container">
        <Slider {...settings}>
          <div>
            <img src={hero1} alt="hero1" />
          </div>
          <div>
            <img src={hero2} alt="hero2" />
          </div>
          <div>
            <img src={hero3} alt="hero3" />
          </div>
          <div>
            <img src={hero4} alt="hero4" />
          </div>

        </Slider>
      </div>
  );
}

export default HeroSection;
