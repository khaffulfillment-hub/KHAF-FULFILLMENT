import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactItems = [
  { icon: <Mail className="w-6 h-6 text-green-500" />, title: "Email Us", content: "info@khaffulfillment.com", href: "mailto:info@khaffulfillment.com" },
  { icon: <Phone className="w-6 h-6 text-green-500" />, title: "Call Us", content: "+1 (123) 456-7890", href: "tel:+11234567890" },
  { icon: <MapPin className="w-6 h-6 text-green-500" />, title: "Find Us", content: "123 Logistics Way, Fulfillment City, 12345", href: "#" }
];

const itemVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

function ContactInfo() {
  return (
    <div className="space-y-8">
      {contactItems.map((item, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="flex items-start gap-4"
        >
          <div className="flex-shrink-0 bg-green-100/70 p-4 rounded-full">
            {item.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <a href={item.href} className="mt-1 text-lg text-gray-600 hover:text-green-600 transition-colors">
              {item.content}
            </a>
          </div>
        </motion.div>
        
      ))}
      {/* --- Embedded Google Map Section (New) --- */}
      <motion.div
        custom={3} // Animate after the other items
        variants={itemVariants}
        initial="initial"
        animate="animate"
        className="mt-8 rounded-lg overflow-hidden border-2 border-green-500/30"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1947413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42894565651%3A0x6323a623f9543e5c!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1622533722979!5m2!1sen!2sid"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Warehouse Location"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
}

export default ContactInfo;
