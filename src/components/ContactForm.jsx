import React, { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        // Ensure phone is included, even if empty, to satisfy Joi validation for optional fields
        phone: formData.phone || '', 
        message: formData.message
      };

      // eslint-disable-next-line no-undef
      const response = await fetch("http://localhost:5000/api/forms/contact", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
        // eslint-disable-next-line no-undef
        setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5 seconds
      } else {
        // You can add error handling here if you want
        // eslint-disable-next-line no-undef
        console.error("Form submission failed.");
        // Optionally, show an error message to the user
      }
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error("An error occurred during form submission:", error);
       // Optionally, show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
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
        <div className="mt-4 flex items-center p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          <CheckCircle className="h-5 w-5 mr-3" />
          Message sent successfully! We'll get back to you soon.
        </div>
      )}
    </div>
  );
}

export default ContactForm;
