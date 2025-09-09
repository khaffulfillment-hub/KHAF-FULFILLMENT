import React from 'react';

function ContactInfo() {
  return (
    <div className="bg-charcoal border-2 border-teal-700 rounded-lg p-8 shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-center text-neon-green">Contact Information</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold text-neon-green mb-2">Email</h4>
          <p className="text-cream">info@edison3pl.com</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-neon-green mb-2">Phone</h4>
          <p className="text-cream">+1 (123) 456-7890</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-neon-green mb-2">Address</h4>
          <p className="text-cream">123 Logistics Way, Suite 100, City, State, 12345</p>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
