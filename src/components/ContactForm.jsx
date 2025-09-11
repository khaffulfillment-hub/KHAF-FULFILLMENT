import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // This is the only part that has been updated.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/rkcrater7@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
        setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5 seconds
      } else {
        // You can add error handling here if you want
        console.error("Form submission failed.");
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
       // Optionally, show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input fields remain the same */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/50 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/50 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 outline-none" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-white/50 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 outline-none resize-none" placeholder="How can we help you?"></textarea>
        </div>
        {/* Submit button remains the same */}
        <button type="submit" disabled={isSubmitting} className="
              px-6 py-3 w-full font-semibold rounded-lg
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              flex items-center justify-center
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:scale-100
            ">
          {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending...</> : 'Send Message'}
        </button>
      </form>
      {/* Success message remains the same */}
      {submitSuccess && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          <CheckCircle className="h-5 w-5 mr-3" />
          Message sent successfully! We'll get back to you soon.
        </motion.div>
      )}
    </motion.div>
  );
}

export default ContactForm;
