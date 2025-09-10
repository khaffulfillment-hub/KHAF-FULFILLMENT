import React from 'react';
import TruckLogo from '../assets/logo.png'; // Or PNG if SVG not available

function Hero() {
  return (
    <section className="w-full min-h-[350px] bg-[hsl(var(--background))] flex items-center justify-center px-8 py-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        {/* Left Content */}
        <div className="flex-1 w-full">
          <div className="text-muted-foreground text-sm mb-1 tracking-wide font-medium">
            LOGISTICS & EDISON 3PL
          </div>
          <h1 className="text-[hsl(var(--foreground))] text-3xl md:text-4xl font-bold leading-tight mb-2">
            Transforming supply chains with speed,<br />precision, and intelligence.
          </h1>
          <p className="text-muted-foreground text-base mb-6 max-w-xl">
            EDISON 3PL is an accomplished 3PL partner based in the US, dedicated to enhancing supply chain effectiveness and logistics performance for companies of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="
              px-6 py-3 font-semibold rounded-lg
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg
            ">
              Get a Quote
            </button>
            <button className="px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]">
              Track Shipment
            </button>
            <button className="px-6 py-3 bg-[hsl(var(--background))] text-[hsl(var(--primary))] rounded-lg text-base font-semibold border border-[hsl(var(--primary))] shadow transition-all hover:bg-[hsl(var(--muted))]">
              Partner With Us
            </button>
          </div>
        </div>
        {/* Right Image */}
        <div className="flex-1 flex items-center justify-center w-full">
          <img
            src={TruckLogo}
            alt="EDISON 3PL Logo Truck"
            className="w-[320px] max-w-full"
            style={{
              filter: 'drop-shadow(0 0 12px hsl(var(--accent)) / 0.8)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
