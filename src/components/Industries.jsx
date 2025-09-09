import React from 'react';
import Slider from 'react-slick'; // Import Slider
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS
import IndustryCard from './IndustryCard';

function Industries() {
  const industryData = [
    { name: "eCommerce", imageUrl: "/src/assets/eCommerce.png" },
    { name: "Retail", imageUrl: "/src/assets/Retail-1.png" },
    { name: "Healthcare", imageUrl: "/src/assets/Healthcare.png" },
    { name: "Electronics", imageUrl: "/src/assets/Electronics.png" },
    { name: "Food", imageUrl: "/src/assets/Food.png" },
    { name: "Industrial", imageUrl: "/src/assets/Industrial.png" }
  ];

  // Slider settings for three columns, auto-playing slider
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop the slider
    speed: 500, // Transition speed
    slidesToShow: 3, // Show three slides at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in ms
    arrows: false, // Hide arrows for a cleaner look, rely on dots for navigation
    responsive: [
      {
        breakpoint: 1024, // For large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 600, // For medium screens
        settings: {
          slidesToShow: 2, // Show two slides for medium screens
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 480, // For small screens
        settings: {
          slidesToShow: 1, // Show one slide for small screens
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  };

  return (
    <section id="industries" className="bg-charcoal text-cream py-16 px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Industries We Serve</h2>
        {/* Wrap the cards in the Slider component */}
        <Slider {...settings}>
          {industryData.map((industry, index) => (
            <div key={index} className="px-1 mr-4"> {/* Add padding for spacing between slides */}
              <IndustryCard name={industry.name} imageUrl={industry.imageUrl} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Industries;
