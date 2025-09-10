import React from 'react';

function About() {
  return (
    <section id="about" className="bg-[hsl(var(--background))] text-cream py-16 px-8 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-neon-green">Our Philosophy</h2>
        <p className="text-lg leading-relaxed">
          At KHAF FULFILLMENT, we believe in the power of <span className="text-neon-green font-semibold">automation</span> and <span className="text-teal-500 font-semibold">scalability</span> to revolutionize supply chain management. We leverage cutting-edge technology and intelligent processes to deliver unparalleled efficiency, accuracy, and flexibility, ensuring your logistics operations are not just managed, but optimized for future growth.
        </p>
      </div>
    </section>
  );
}

export default About;
