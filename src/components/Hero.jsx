import React, { useState } from 'react';
import TruckLogo from '../assets/new-logo.png';

// Import all three forms and the Modal component
import Modal from './Modal';
import GetAQuoteForm from './GetAQuoteForm';
import PartnerWithUsForm from './PartnerWithUsForm';
import TrackShipmentForm from './TrackShipmentForm';

// --- IMPORT THE NEW BRAND MARQUEE COMPONENT ---
import BrandMarquee from './BrandMarquee';


//brand logos
import AmazonLogo from '../assets/BrandLogo/amazon.png';
import WalmartLogo from '../assets/BrandLogo/Walmart.png';
import eBayLogo from '../assets/BrandLogo/ebay.png';
import ShopifyLogo from '../assets/BrandLogo/Shopify.png';
import TikTokShopLogo from '../assets/BrandLogo/TikTok-Shop.png';

function Hero() {
  // State to manage which modal is open: 'quote', 'partner', 'track', or null
  const [activeModal, setActiveModal] = useState(null);
  const BRANDS = [
    { name: "Amazon", logo: AmazonLogo },
    { name: "Walmart", logo: WalmartLogo },
    { name: "eBay", logo: eBayLogo },
    { name: "Shopify", logo: ShopifyLogo  },
    { name: "TikTok", logo: TikTokShopLogo },
  ];


  return (
    <>
      <section id ="hero" className="py-24 px-4 sm:px-6 lg:px-8 w-full min-h-[350px] bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-10">
          {/* Left Content */}
          <div className="flex-1 w-full">
            <div className="text-muted-foreground text-sm mb-1 tracking-wide font-medium">
              KHAF LOGISTIC & FULFILLMENT
            </div>
            <h1 className="text-[hsl(var(--foreground))] text-3xl md:text-4xl font-bold leading-tight mb-4">
              Transforming supply chains with speed, precision, and intelligence <br /><span className="italic ml-9 mt-9 text-2xl">— driving efficiency and growth at every stage.</span>
            </h1>
            <p className="text-muted-foreground text-base mb-6 max-w-xl">
              KHAF FULFILLMENT is an accomplished 3PL partner based in the U.S., dedicated to enhancing supply chain effectiveness and logistics performance for companies of all sizes. We provide end-to-end solutions—from warehousing and inventory management to order fulfillment and packaging—tailored to each client’s needs. With a focus on efficiency, accuracy, and scalability, we help businesses streamline operations and achieve sustainable growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveModal('quote')}
                className="
                  px-6 py-3 font-semibold rounded-lg
                  bg-gradient-to-r from-blue-500 to-blue-800 text-white
                  transition-all duration-300 ease-in-out
                  hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white
                  hover:scale-105 hover:shadow-lg
                ">
                Get a Quote
              </button>
              <button 
                onClick={() => setActiveModal('track')}
                className="px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]">
                Track Shipment
              </button>
              <button
                onClick={() => setActiveModal('partner')}
                className="px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]">
                Partner With Us
              </button>
            </div>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <img
              src={TruckLogo}
              alt="KHAF FULFILLMENT Logo Truck"
              className="w-[520px] max-w-full"
            />
          
            {/* Brand strip */}
            <div className="w-full max-w-[520px] -mt-10">
              {/* --- HERE IS THE CHANGE: The old grid is replaced with our new component --- */}
              <BrandMarquee brands={BRANDS} />
            </div>
          </div>

        </div>
      </section>

      {/* Modal for "Get a Quote" */}
      <Modal isOpen={activeModal === 'quote'} onClose={() => setActiveModal(null)}>
        <GetAQuoteForm />
      </Modal>

      {/* Modal for "Partner With Us" */}
      <Modal isOpen={activeModal === 'partner'} onClose={() => setActiveModal(null)}>
        <PartnerWithUsForm />
      </Modal>
      
      {/* Modal for "Track Shipment" */}
      <Modal isOpen={activeModal === 'track'} onClose={() => setActiveModal(null)}>
        <TrackShipmentForm />
      </Modal>
    </>
  );
}

export default Hero;