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

// Import your custom CSS for the slider
import './SliderStyles.css';

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
    arrows: false,
    swipeToSlide: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        // Extra large devices: 2 cards
        breakpoint: 1200, // Custom breakpoint for very large screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        // Large devices: 3 cards
        breakpoint: 1024, // Tailwind's lg breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        // Mid devices: 2 cards, starting from 820px as per user feedback
        // react-slick breakpoint is max-width, so this applies up to 819px
        breakpoint: 819, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        // Mobile devices: 1 card
        breakpoint: 480, // Standard breakpoint for smaller mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        // Very small mobile devices: 1 card
        breakpoint: 320, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section id="industries" className="bg-charcoal text-cream py-16 px-8 pt-24"> {/* Added px-8 for consistency */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Industries We Serve</h2>
        
        <div className="slick-container">
          <Slider {...settings}>
            {industryData.map((industry, index) => (
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
