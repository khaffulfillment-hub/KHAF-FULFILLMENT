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
    { name: "eCommerce", imageUrl: eCommerceImage, description: "Fast, scalable, and reliable fulfillment for online retail growth.", url: "https://en.wikipedia.org/wiki/E-commerce" },
    { name: "Retail", imageUrl: retailImage, description: "Streamlined distribution for stores and omni-channel sales.", url: "https://en.wikipedia.org/wiki/Retail" },
    { name: "Healthcare", imageUrl: healthcareImage, description: "Secure, compliant delivery for medical and pharma needs.", url: "https://en.wikipedia.org/wiki/Healthcare" },
    { name: "Electronics", imageUrl: electronicsImage, description: "Reliable logistics for high-value tech and devices.", url: "https://en.wikipedia.org/wiki/Electronics" },
    { name: "Food", imageUrl: foodImage, description: "Safe, efficient handling for perishable and packaged goods.", url: "https://en.wikipedia.org/wiki/Food_industry" },
    { name: "Industrial", imageUrl: industrialImage, description: "Robust logistics for heavy equipment and manufacturing.", url: "https://this-is-a-dead-url.com" }
  ];


  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <Typography variant="h2" color="blue-gray" className="text-4xl font-bold text-center mb-16">
          Industries We Serve
        </Typography>
        <div className="slider-container">
          <Slider {...settings}>
            {industryData.map((industry, index) => (
              <div key={index} className="px-3 py-4">
                <IndustryCard name={industry.name} imageUrl={industry.imageUrl} description={industry.description} url={industry.url} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Industries;
