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
    </div>
  );
}

export default ContactInfo;
