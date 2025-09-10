import React, { useState, useEffect } from 'react';
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

  const [sliderKey, setSliderKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSliderKey(prevKey => prevKey + 1);
    };

    window.addEventListener('resize', handleResize);
    // Initial call to set the correct key based on initial window size
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300, // Reduced speed for smoother transitions
    slidesToShow: 1, // Default for small screens, responsive settings will override for larger screens
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000, // Reduced autoplay speed
    responsive: [
      {
        // Large devices (desktops, 992px and up)
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Default large screen view
          slidesToScroll: 1,
        }
      },
      {
        // Medium devices (tablets, 768px and up)
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // User requested 2 cards for tablets
          slidesToScroll: 1,
        }
      },
      {
        // Small devices (phones, 480px and up)
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // User requested 1 card for mobile
          slidesToScroll: 1,
        }
      },
      {
        // Extra small devices (phones, 320px and up)
        breakpoint: 320,
        settings: {
          slidesToShow: 1, // Ensure 1 card for very small screens too
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section id="industries" className="bg-[hsl(var(--background))] text-cream py-16 px-8 pt-24"> {/* Added px-8 for consistency */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Industries We Serve</h2>
        
        <div className="slick-container">
          <Slider key={sliderKey} {...settings}>
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
