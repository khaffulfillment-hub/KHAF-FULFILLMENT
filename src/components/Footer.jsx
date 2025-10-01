import React from 'react';
import { Typography } from "@material-tailwind/react";
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: <Facebook size={20} />, href: "https://www.facebook.com/share/1AFbpVTSam/", label: "Facebook" },
  { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Instagram size={20} />, href: "https://instagram.com", label: "Instagram" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-50/30 backdrop-blur-xl border-t border-blue-200/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- RESPONSIVE GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Company Info (Spans 2 columns on small screens) */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Typography variant="h5" className="font-bold mb-4 text-blue-800">
              Khaf Fulfillment
            </Typography>
            <Typography variant="small" className="text-gray-600 text-justify hover:text-blue-700 transition-colors duration-300">
              As a reliable and trusted 3PL partner, we are dedicated to transforming supply chains with speed, precision, and intelligent automation. Our services are engineered to support businesses of all sizes, ensuring your logistics operate with maximum efficiency and accuracy from start to finish.
            </Typography>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Quick Links
            </Typography>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-blue-700 font-medium transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Our Services
            </Typography>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-600 hover:text-blue-700 font-medium transition-colors duration-300">eCommerce Fulfillment</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-blue-700 font-medium transition-colors duration-300">Retail Logistics</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-blue-700 font-medium transition-colors duration-300">Warehouse Management</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-blue-700 font-medium transition-colors duration-300">Freight Services</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Contact Us
            </Typography>
            <ul className="space-y-3 text-gray-600 ">
              <li className='hover:text-blue-700 transition-colors duration-300'>Edison, NJ 08817</li>
              <li className='hover:text-blue-700 transition-colors duration-300'>+1 (347) 217-5150</li>
              <li className='hover:text-blue-700 transition-colors duration-300'>khaf.fulfillment@gmail.com</li>
            </ul>
          </div>

        </div>

        {/* --- RESPONSIVE BOTTOM BAR --- */}
        <div className="mt-12 pt-8 border-t border-blue-200/60 flex flex-col sm:flex-row justify-between items-center">
          <Typography variant="small" className="text-gray-600 text-center sm:text-left mb-4 sm:mb-0">
            &copy; {currentYear} Khaf Fulfillment. All Rights Reserved.
          </Typography>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index} 
                href={link.href} 
                aria-label={link.label}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
