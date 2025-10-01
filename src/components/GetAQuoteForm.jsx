import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { FaTimes } from 'react-icons/fa';

// --- Configuration ---
const PRICING_TIERS = {
  small: { maxUnits: 500, price: 0.75, name: 'Small Scale' },
  medium: { maxUnits: 1000, price: 0.65, name: 'Medium Scale' },
  large: { price: 0.60, name: 'Large Scale' },
};
const ALL_INDUSTRIES = ["eCommerce", "Retail", "Healthcare", "Electronics", "Food", "Industrial"];

function GetAQuoteForm() {
  // --- Refs ---
  const formRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const dropdownListRef = useRef(null);

  // --- State Management ---
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', companyName: '' });
  const [selectedIndustries, setSelectedIndustries] = useState([]); // array of selected industry names
  const [industryUnits, setIndustryUnits] = useState({}); // { Retail: 50, eCommerce: 100 }
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [totalUnits, setTotalUnits] = useState(0);
  const [calculatedScale, setCalculatedScale] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Helper to display messages
  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  // --- Effects ---
  useEffect(() => {
    const currentTotalUnits = Object.values(industryUnits).reduce((sum, val) => sum + (parseInt(val, 10) || 0), 0);
    setTotalUnits(currentTotalUnits);

    if (currentTotalUnits <= 0) {
      setCalculatedScale('');
      setTotalPrice(0);
      return;
    }

    let scale, price;
    if (currentTotalUnits <= PRICING_TIERS.small.maxUnits) {
      scale = PRICING_TIERS.small.name;
      price = currentTotalUnits * PRICING_TIERS.small.price;
    } else if (currentTotalUnits <= PRICING_TIERS.medium.maxUnits) {
      scale = PRICING_TIERS.medium.name;
      price = currentTotalUnits * PRICING_TIERS.medium.price;
    } else {
      scale = PRICING_TIERS.large.name;
      price = currentTotalUnits * PRICING_TIERS.large.price;
    }
    setCalculatedScale(scale);
    setTotalPrice(price.toFixed(2));
  }, [industryUnits]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Auto-scroll to show full dropdown ---
  useEffect(() => {
    if (isDropdownOpen && dropdownListRef.current) {
      dropdownListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [isDropdownOpen]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleToggleIndustry = (industryName) => {
    setSelectedIndustries(prev =>
      prev.includes(industryName)
        ? prev.filter(item => item !== industryName)
        : [...prev, industryName]
    );

    setIndustryUnits(prev => {
      const updated = { ...prev };
      if (industryName in updated) {
        delete updated[industryName]; // remove units when unselected
      } else {
        updated[industryName] = ''; // initialize with empty
      }
      return updated;
    });
  };

  const handleUnitChange = (industryName, unitValue) => {
    const value = Math.max(0, parseInt(unitValue, 10) || 0);
    setIndustryUnits(prev => ({ ...prev, [industryName]: value }));
  };

  const isFormValid = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.companyName) {
      displayMessage("Please fill out all required contact fields.", "error");
      return false;
    }
    if (totalUnits <= 0) {
      displayMessage("Please select at least one industry and enter the number of units.", "error");
      return false;
    }
    return true;
  };

  const handleDownloadExcel = () => {
    if (!isFormValid()) return;
    const pricePerUnit = (totalPrice / totalUnits).toFixed(2);
    const dataToExport = [
        { Section: "Contact Information", Field: "Full Name", Value: formData.fullName },
        { Field: "Email", Value: formData.email },
        { Field: "Phone Number", Value: formData.phone },
        { Field: "Company Name", Value: formData.companyName },
        {},
        { Section: "Unit Breakdown by Industry" },
        ...Object.entries(industryUnits).map(([name, units]) => ({ Field: `Units for ${name}`, Value: units })),
        {},
        { Section: "Quote Summary & Calculation" },
        { Field: "Total Units", Value: totalUnits },
        { Field: "Pricing Tier", Value: calculatedScale },
        { Field: "Price Per Unit", Value: `$${pricePerUnit}` },
        { Field: "Estimated Total", Value: `$${totalPrice}` },
        {},
        { Field: "Calculation Method", Value: `${totalUnits} units x $${pricePerUnit}/unit = $${totalPrice}` },
    ];
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { skipHeader: true });
    worksheet["!cols"] = [{ wch: 25 }, { wch: 30 }, { wch: 30 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "QuoteSummary");
    XLSX.writeFile(workbook, "Khaf_Fulfillment_Quote_Details.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            companyName: formData.companyName,
            industries: Object.entries(industryUnits).map(([industry, units]) => ({
                industry: industry,
                units: parseInt(units, 10) || 0,
            })), // Convert industries to an array of objects
            totalUnits,
            totalPrice: parseFloat(totalPrice), // Convert totalPrice to a number
        };
        console.log('Payload before sending:', JSON.stringify(payload, null, 2)); // Added for debugging
        try {
            const response = await fetch('https://formspree.io/f/xdkwavko', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        await response.json();
        displayMessage("Quote submitted successfully! We will be in touch shortly.", "success");
        setFormData({ fullName: '', email: '', phone: '', companyName: '' });
        setSelectedIndustries([]);
        setIndustryUnits({});
      } catch (error) {
        console.error('Error submitting form:', error);
        displayMessage('Failed to submit quote. Please try again later.', "error");
      }
  };

  return (
    <div ref={formRef}>
      <h2 className="text-3xl font-bold text-gray-900">Get an Instant, Detailed Quote</h2>
      <p className="mt-2 text-gray-600">Select your industries and enter unit counts for a customized price.</p>

      {message && (
        <div className={`p-4 mb-4 rounded-lg ${messageType === 'error' ? 'bg-red-100 text-red-800 border border-red-400' : 'bg-blue-100 text-blue-800 border border-blue-400'}`}>
          {message}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* Contact Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" id="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        
        {/* Industry Multi-Selector */}
        <div ref={dropdownContainerRef} className="relative">
          <label className="text-sm font-bold text-gray-800">Select Your Industry/Industries</label>
          <div
            className="flex flex-wrap gap-2 p-2 mt-2 bg-gray-100 border-transparent rounded-lg min-h-[48px] items-center cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {selectedIndustries.map(industry => (
              <div key={industry} className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                {industry}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleToggleIndustry(industry); }}
                  className="transition-transform duration-150 hover:scale-125"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            {selectedIndustries.length === 0 && <span className="text-gray-500 px-2">Click to select industries...</span>}
          </div>
          {isDropdownOpen && (
            <div
              ref={dropdownListRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl"
            >
              {ALL_INDUSTRIES.filter(industryName => !selectedIndustries.includes(industryName))
                .map(industryName => (
                  <div
                    key={industryName}
                    onClick={() => handleToggleIndustry(industryName)}
                    className="px-4 py-3 cursor-pointer flex justify-between items-center transition-colors hover:bg-gray-100"
                  >
                    {industryName}
                  </div>
                ))}
              {ALL_INDUSTRIES.length === selectedIndustries.length && (
                <div className="px-4 py-3 text-gray-400 text-sm">All industries selected</div>
              )}
            </div>
          )}
        </div>

        {/* Units Input */}
        {selectedIndustries.length > 0 && (
          <div className="p-4 space-y-4 border-t border-b border-gray-200">
             <h3 className="text-sm font-bold text-gray-800">Enter Units for Each Industry</h3>
            {selectedIndustries.map(industry => (
              <div key={industry}>
                <label htmlFor={`units-${industry}`} className="text-sm font-medium text-gray-700">
                  Units for <span className="font-bold">{industry}</span>
                </label>
                <input 
                  type="number" 
                  id={`units-${industry}`} 
                  value={industryUnits[industry] || ''} 
                  onChange={(e) => handleUnitChange(industry, e.target.value)} 
                  placeholder="e.g., 250"
                  min="0"
                  onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                  className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
              </div>
            ))}
          </div>
        )}

        {/* Quote Summary */}
        {totalUnits > 0 && (
          <div className="p-6 space-y-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800">Your Live Quote Summary</h3>
            <div className="flex justify-between items-center text-lg">
                <p className="font-medium text-gray-600">Total Units:</p>
                <p className="font-bold text-gray-900">{totalUnits}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Pricing Tier:</p>
              <p className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-200 rounded-full">{calculatedScale}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-blue-200">
              <p className="text-lg font-bold text-gray-700">Estimated Total:</p>
              <p className="text-3xl font-extrabold text-blue-600">${totalPrice}</p>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Quote as Excel
          </button>
          <button
            type="submit"
            className="w-full px-6 py-3 font-semibold text-blue-700 bg-white border-2 border-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition-all duration-300"
          >
            Submit & Contact Us
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetAQuoteForm;
