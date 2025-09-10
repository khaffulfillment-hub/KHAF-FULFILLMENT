import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from "@material-tailwind/react"; // Or your preferred UI library

// Animation variants for the main container
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

// Animation variants for the staggered headline
const headlineVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Time delay between each word
    },
  },
};

// Animation for each word in the headline
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 }
  },
};


function About() {
  const headline = "The Future of Fulfillment is Here.";

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Animated Headline */}
        <Typography 
          variant="h2" 
          color="blue-gray" 
          className="font-bold text-4xl lg:text-5xl mb-6"
          aria-label={headline}
        >
          <motion.span variants={headlineVariants} initial="hidden" animate="visible">
            {headline.split(" ").map((word, index) => (
              <motion.span key={index} variants={wordVariants} className="inline-block mr-3">
                {word}
              </motion.span>
            ))}
          </motion.span>
        </Typography>
        
        {/* Paragraph with Highlighted Keywords */}
        <Typography variant="lead" className="text-gray-600 text-lg lg:text-xl">
          At Khaf Fulfillment, we believe in the power of <strong className="text-green-600 font-semibold">automation</strong> and <strong className="text-green-600 font-semibold">scalability</strong> to revolutionize supply chain management. We leverage <strong className="text-green-600 font-semibold">cutting-edge technology</strong> and intelligent processes to deliver unparalleled <strong className="text-green-600 font-semibold">efficiency</strong>, accuracy, and <strong className="text-green-600 font-semibold">flexibility</strong>, ensuring your logistics operations are not just managed, but optimized for future growth.
        </Typography>
      </motion.div>
    </section>
  );
}

export default About;
