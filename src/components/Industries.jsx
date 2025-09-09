import React from 'react';
import IndustryCard from './IndustryCard';

function Industries() {
  const industries = [
    "eCommerce",
    "Retail",
    "Healthcare",
    "Electronics",
    "Food",
    "Industrial"
  ];

  return (
    <section id="industries" className="bg-charcoal text-cream py-16 px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Industries We Serve</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry, index) => (
            <IndustryCard key={index} name={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
