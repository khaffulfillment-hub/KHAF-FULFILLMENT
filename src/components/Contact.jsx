import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

function Contact() {
  return (
    <section id="contact" className="bg-charcoal text-cream py-16 px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-neon-green">Get In Touch</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

export default Contact;
