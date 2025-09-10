import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Pricing configuration remains the same
const PRICING_TIERS = {
  small: { maxUnits: 500, price: 0.75, name: 'Small Scale' },
  medium: { maxUnits: 1000, price: 0.65, name: 'Medium Scale' },
  large: { price: 0.60, name: 'Large Scale' },
};

function GetAQuoteForm() {
  // Removed originZip and destinationZip from state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    units: '',
    calculatedScale: '',
    totalPrice: 0,
  });

  // The useEffect for calculation remains unchanged
  useEffect(() => {
    const numUnits = parseInt(formData.units, 10);
    if (isNaN(numUnits) || numUnits <= 0) {
      setFormData(prev => ({ ...prev, calculatedScale: '', totalPrice: 0 }));
      return;
    }
    let scale = '';
    let price = 0;
    if (numUnits <= PRICING_TIERS.small.maxUnits) {
      scale = PRICING_TIERS.small.name;
      price = numUnits * PRICING_TIERS.small.price;
    } else if (numUnits <= PRICING_TIERS.medium.maxUnits) {
      scale = PRICING_TIERS.medium.name;
      price = numUnits * PRICING_TIERS.medium.price;
    } else {
      scale = PRICING_TIERS.large.name;
      price = numUnits * PRICING_TIERS.large.price;
    }
    setFormData(prev => ({
      ...prev,
      calculatedScale: scale,
      totalPrice: price.toFixed(2),
    }));
  }, [formData.units]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDownloadExcel = () => {
    if (!formData.totalPrice || formData.totalPrice <= 0) {
      alert("Please enter the number of units to generate a quote first.");
      return;
    }
    // Removed ZIP codes from the Excel export data
    const dataToExport = [
      { "Quote Field": "Full Name", "Value": formData.fullName },
      { "Quote Field": "Email", "Value": formData.email },
      { "Quote Field": "Phone Number", "Value": formData.phone },
      { "Quote Field": "Company Name", "Value": formData.companyName },
      { "Quote Field": "Number of Units", "Value": formData.units },
      { "Quote Field": "Pricing Scale", "Value": formData.calculatedScale },
      { "Quote Field": "Price Per Unit", "Value": `$${(formData.totalPrice / formData.units).toFixed(2)}` },
      { "Quote Field": "Estimated Total", "Value": `$${formData.totalPrice}` },
    ];
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "QuoteSummary");
    worksheet["!cols"] = [{ wch: 20 }, { wch: 30 }];
    XLSX.writeFile(workbook, "Khaf_Fulfillment_Quote.xlsx");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900">Get an Instant Quote</h2>
      <p className="mt-2 text-gray-600">Enter your details to see your customized pricing.</p>

      <form className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Form fields remain the same, but the ZIP codes are gone */}
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
           <div>
            <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name (Optional)</label>
            <input type="text" id="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Your Company LLC" className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
        </div>
        
        <div>
          <label htmlFor="units" className="text-sm font-bold text-gray-800">Number of Units to Ship</label>
          <input type="number" id="units" value={formData.units} onChange={handleInputChange} placeholder="e.g., 750" className="w-full px-4 py-3 mt-2 text-2xl font-bold text-gray-900 bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>

        {formData.calculatedScale && (
          <div className="p-6 space-y-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-gray-800">Your Live Quote Summary</h3>
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Pricing Tier:</p>
              <p className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">{formData.calculatedScale}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-green-200">
              <p className="text-lg font-bold text-gray-700">Estimated Total:</p>
              <p className="text-3xl font-extrabold text-green-600">${formData.totalPrice}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <button type="button" onClick={handleDownloadExcel} disabled={!formData.totalPrice || formData.totalPrice <= 0} className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Download Quote as Excel
            </button>
            <button type="submit" className="w-full px-6 py-3 font-semibold text-green-700 bg-white border-2 border-green-500 rounded-lg shadow-md hover:bg-green-50 transition-all duration-300">
                Submit & Contact Us
            </button>
        </div>
      </form>
    </div>
  );
}

export default GetAQuoteForm;
