import React from 'react';
import ServiceCard from './ServiceCard';
import WarehousingInventoryImg from '../assets/Warehousing & Inventory.png';
import OrderFulfillmentImg from '../assets/Order Fulfillment.png';
import CustomPackagingImg from '../assets/Custom Packaging & Kitting.png';
import { Typography } from "@material-tailwind/react";

function Services() {
  const services = [
    {
      title: "Warehousing & Inventory",
      description: "Secure, scalable storage with real-time inventory visibility to optimize stock control.",
      cta: "Learn More",
      imageUrl: WarehousingInventoryImg,
      url: "https://en.wikipedia.org/wiki/Warehouse_management_system"
    },
    {
      title: "Order Fulfillment",
      description: "Fast, accurate order processing from pick-and-pack to last-mile delivery.",
      cta: "Learn More",
      imageUrl: OrderFulfillmentImg,
      url: "https://en.wikipedia.org/wiki/Order_processing"
    },
    {
      title: "Custom Packaging & Kitting",
      description: "Tailored kitting and branded packaging to enhance presentation and streamline orders.",
      cta: "Learn More",
      imageUrl: CustomPackagingImg,
      url: "https://en.wikipedia.org/wiki/Contract_packager"
    },
  ];

  return (
    <section id="services" className="bg-green-50 py-16 px-6 md:px-12 pt-24">
      <div className="max-w-7xl mx-auto">
        <Typography variant="h2" className="text-center font-bold mb-12 text-green-900">
          Our Services
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              cta={service.cta}
              imageUrl={service.imageUrl}
              url={service.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
