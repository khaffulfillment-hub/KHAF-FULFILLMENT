import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IndustryCard from './IndustryCard';
import eCommerceImage from '../assets/eCommerce.jpg';
import retailImage from '../assets/Retail-1.png';
import healthcareImage from '../assets/Healthcare.png';
import electronicsImage from '../assets/Electronics.png';
import foodImage from '../assets/Food.jpg';
import industrialImage from '../assets/Industrial.png';
import './SliderStyles.css';
import { Typography } from "@material-tailwind/react";

function Industries() {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow, // Dynamically set
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
  };

  const industryData = [
    { name: "eCommerce", imageUrl: eCommerceImage },
    { name: "Retail", imageUrl: retailImage },
    { name: "Healthcare", imageUrl: healthcareImage },
    { name: "Electronics", imageUrl: electronicsImage },
    { name: "Food", imageUrl: foodImage },
    { name: "Industrial", imageUrl: industrialImage }
  ];

  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <Typography variant="h2" color="blue-gray" className="text-4xl font-bold text-center mb-16">
          Industries We Serve
        </Typography>
        <div className="slider-container">
          <Slider {...settings}>
            {industryData.map((industry, index) => (
              <div key={index} className="px-3 py-4">
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
