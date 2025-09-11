import React, { useState } from 'react';
import TruckLogo from '../assets/new-logo.png';

// Import all three forms and the Modal component
import Modal from './Modal';
import GetAQuoteForm from './GetAQuoteForm';
import PartnerWithUsForm from './PartnerWithUsForm';
import TrackShipmentForm from './TrackShipmentForm';

function Hero() {
  // State to manage which modal is open: 'quote', 'partner', 'track', or null
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <section id ="hero" className="py-24 px-4 sm:px-6 lg:px-8 w-full min-h-[350px] bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Left Content */}
          <div className="flex-1 w-full">
            <div className="text-muted-foreground text-sm mb-1 tracking-wide font-medium">
              LOGISTICS & KHAF FULFILLMENT
            </div>
            <h1 className="text-[hsl(var(--foreground))] text-3xl md:text-4xl font-bold leading-tight mb-2">
              Transforming supply chains with speed,<br />precision, and intelligence.
            </h1>
            <p className="text-muted-foreground text-base mb-6 max-w-xl">
              KHAF FULFILLMENT is an accomplished 3PL partner based in the US, dedicated to enhancing supply chain effectiveness and logistics performance for companies of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveModal('quote')}
                className="
                  px-6 py-3 font-semibold rounded-lg
                  bg-gradient-to-r from-green-300 to-green-500 text-white
                  transition-all duration-300 ease-in-out
                  hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
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
          <div className="flex-1 flex items-center justify-center w-full">
            <img
              src={TruckLogo}
              alt="KHAF FULFILLMENT Logo Truck"
              className="w-[320px] max-w-full"
              style={{
                filter: 'drop-shadow(0 0 12px hsl(var(--accent)) / 0.8)',
              }}
            />
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
