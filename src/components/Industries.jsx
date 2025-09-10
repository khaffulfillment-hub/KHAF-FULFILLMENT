import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IndustryCard from './IndustryCard';
import eCommerceImage from '../assets/eCommerce.png';
import retailImage from '../assets/Retail-1.png';
import healthcareImage from '../assets/Healthcare.png';
import electronicsImage from '../assets/Electronics.png';
import foodImage from '../assets/Food.png';
import industrialImage from '../assets/Industrial.png';
import './SliderStyles.css'; // Import the corrected CSS

function Industries() {
  const industryData = [
    { name: "eCommerce", imageUrl: eCommerceImage },
    { name: "Retail", imageUrl: retailImage },
    { name: "Healthcare", imageUrl: healthcareImage },
    { name: "Electronics", imageUrl: electronicsImage },
    { name: "Food", imageUrl: foodImage },
    { name: "Industrial", imageUrl: industrialImage }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // Desktops and large tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 2, // Show 2 cards
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // Mobile phones
        settings: {
          slidesToShow: 1, // Show 1 card
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section id="industries" className="bg-[hsl(var(--background))] text-cream py-16 px-4 sm:px-8 pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Industries We Serve</h2>
        
        {/* react-slick slider component */}
        <div className="slider-container">
          <Slider {...settings}>
            {industryData.map((industry, index) => (
              // The padding here creates the gap between cards
              <div key={index} className="px-2"> 
                <IndustryCard name={industry.name} imageUrl={industry.imageUrl} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Industries;
