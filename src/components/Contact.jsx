import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-800">Get In Touch</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or need a custom quote? We'd love to hear from you.
          </p>
        </div>

        {/* The single, large blended card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side: Contact Info with a subtle blue tint */}
            <div className="p-8 lg:p-12 bg-blue-50/30">
              <ContactInfo />
            </div>
            
            {/* Right Side: Contact Form */}
            <div className="p-8 lg:p-12">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
