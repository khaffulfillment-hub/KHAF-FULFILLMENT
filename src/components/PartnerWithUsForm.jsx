import React from 'react';

function PartnerWithUsForm() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900">Partner With Us</h2>
      <p className="mt-2 text-gray-600">
        We're looking for great partners. Tell us about your business.
      </p>

      <form className="mt-8 space-y-6">
        <div>
          <label htmlFor="partner_name" className="text-sm font-medium text-gray-700">Contact Name</label>
          <input
            type="text"
            id="partner_name"
            placeholder="Jane Smith"
            className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="partner_company" className="text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="partner_company"
            placeholder="Your Company Inc."
            className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="partner_interest" className="text-sm font-medium text-gray-700">How would you like to partner?</label>
          <textarea
            id="partner_interest"
            rows="4"
            placeholder="Describe your partnership proposal..."
            className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default PartnerWithUsForm;
