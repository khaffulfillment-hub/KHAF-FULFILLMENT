import React from 'react';
import ServiceCard from './ServiceCard';
import WarehousingInventoryImg from '../assets/Warehousing & Inventory.png';
import OrderFulfillmentImg from '../assets/Order Fulfillment.png';
import CustomPackagingImg from '../assets/Custom Packaging & Kitting.png';
import { Typography } from "@material-tailwind/react"; // Import Typography for consistent heading style

function Services() {
  const services = [
    {
      title: "Warehousing & Inventory",
      description: "Secure and efficient storage solutions with real-time inventory management.",
      cta: "Learn More",
      imageUrl: WarehousingInventoryImg
    },
    {
      title: "Order Fulfillment",
      description: "Streamlined picking, packing, and shipping to meet customer demands.",
      cta: "Learn More",
      imageUrl: OrderFulfillmentImg
    },
        {
      title: "Custom Packaging & Kitting",
      description: "Tailored packaging solutions and product assembly services.",
      cta: "Learn More",
      imageUrl: CustomPackagingImg
    },
    
  ];

  return (
    <section id="services" className="bg-green-50 py-16 px-6 md:px-12 pt-24"> {/* Changed background and padding */}
      <div className="max-w-7xl mx-auto"> {/* Adjusted max-width to match pricing */}
        <Typography variant="h2" className="text-center font-bold mb-6 text-green-900">Our Services</Typography> {/* Changed heading style */}
        {/* Changed layout to grid for responsive card display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> 
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              cta={service.cta}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
