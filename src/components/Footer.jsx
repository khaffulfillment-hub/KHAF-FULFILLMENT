import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream py-8 px-8 text-center">
      <div className="max-w-6xl mx-auto">
        <p>&copy; {currentYear} Edison 3PL. All rights reserved.</p>
        {/* Add any other footer links or information here */}
      </div>
    </footer>
  );
}

export default Footer;
