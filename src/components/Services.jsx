import React from 'react';
import ServiceCard from './ServiceCard';
import WarehousingInventoryImg from '../assets/Warehousing & Inventory.png';
import OrderFulfillmentImg from '../assets/Order Fulfillment.png';
import CustomPackagingImg from '../assets/Custom Packaging & Kitting.png';

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
    <section id="services" className="bg-charcoal text-cream py-16 px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              cta={service.cta}
              imageUrl={service.imageUrl} // Assuming ServiceCard can accept imageUrl prop
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
