import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// A custom utility class to hide scrollbars
const scrollbarHideStyle = `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`;

const BrandMarquee = ({ brands }) => {
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the brands array for a seamless loop
  const extendedBrands = [...brands, ...brands];

  useEffect(() => {
    const scroll = () => {
      if (scrollContainerRef.current && !isHovered) {
        // Adjust scroll speed here if needed
        scrollContainerRef.current.scrollLeft += 0.5;
        const { scrollLeft, scrollWidth } = scrollContainerRef.current;
        
        // When the first half has been scrolled, reset to the beginning
        if (scrollLeft >= scrollWidth / 2) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]); // Rerun effect when isHovered changes

  const handleManualScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 180; // How many pixels to scroll with each click
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <div 
        className="relative group w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollContainerRef}
          className="relative flex w-full overflow-x-auto no-scrollbar"
        >
          {extendedBrands.map((brand, index) => (
            // Each item is a flex container for consistent sizing and alignment
            <div key={index} className="flex-shrink-0 w-40 h-24 mx-4 flex items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-36 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandMarquee;