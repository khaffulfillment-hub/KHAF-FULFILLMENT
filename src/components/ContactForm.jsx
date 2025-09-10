import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real application, you would send this data to your backend API
    console.log('Form Data:', { name, email, message });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setName('');
    setEmail('');
    setMessage('');

    // Optionally, hide success message after a few seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-charcoal border-2 border-teal-700 rounded-lg p-8 shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-center text-neon-green">Send Us a Message</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block text-cream text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-neon-green"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-cream text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-neon-green"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-cream text-sm font-bold mb-2">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="5"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-neon-green"
        ></textarea>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
              px-6 py-3 font-semibold rounded-full
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {submitSuccess && (
        <div className="
              px-6 py-3 font-semibold rounded-full
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg">
          Message Sent!
        </div>
      )}
    </form>
  );
}

export default ContactForm;
