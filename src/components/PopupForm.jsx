import React, { useState } from 'react';

function PopupForm({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch('https://edison3pl-m6gx.vercel.app/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the backend returns some success indicator or data
      const data = await response.json();
      console.log('Form submission response:', data);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      // Optionally, hide success message after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose(); // Close the modal after success
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // Optionally, set an error state to show to the user
      alert('Failed to send message. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative bg-charcoal border-2 border-neon-green rounded-lg p-8 shadow-xl w-full max-w-md mx-auto neon-glow-popup">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cream text-2xl font-bold hover:text-neon-green transition duration-300 ease-in-out"
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-6 text-center text-neon-green">Get a Quote</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="popup-name" className="block text-cream text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="popup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="popup-email" className="block text-cream text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="popup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="popup-message" className="block text-cream text-sm font-bold mb-2">Message</label>
            <textarea
              id="popup-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-charcoal leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-neon-green text-charcoal font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'}`}
            >
              {isSubmitting ? 'Sending...' : 'Get a Quote'}
            </button>
          </div>
          {submitSuccess && (
            <div className="mt-4 text-center text-blue-400">
              Quote Request Sent!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
