import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { FaTimes } from 'react-icons/fa'; // Icon for the 'deselect' button

// --- Configuration ---
const PRICING_TIERS = {
  small: { maxUnits: 500, price: 0.75, name: 'Small Scale' },
  medium: { maxUnits: 1000, price: 0.65, name: 'Medium Scale' },
  large: { price: 0.60, name: 'Large Scale' },
};
const ALL_INDUSTRIES = ["eCommerce", "Retail", "Healthcare", "Electronics", "Food", "Industrial"];

function GetAQuoteForm() {
  // --- State Management ---
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', companyName: '' });
  const [selectedIndustries, setSelectedIndustries] = useState([]); // Stores { name, units }
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Calculated values
  const [totalUnits, setTotalUnits] = useState(0);
  const [calculatedScale, setCalculatedScale] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // --- Effects ---
  useEffect(() => {
    const currentTotalUnits = selectedIndustries.reduce((sum, industry) => sum + (parseInt(industry.units, 10) || 0), 0);
    setTotalUnits(currentTotalUnits);

    if (currentTotalUnits <= 0) {
      setCalculatedScale('');
      setTotalPrice(0);
      return;
    }
    let scale = '';
    let price = 0;
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
  }, [selectedIndustries]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleToggleIndustry = (industryName) => {
    const isSelected = selectedIndustries.some(ind => ind.name === industryName);
    if (isSelected) {
      setSelectedIndustries(prev => prev.filter(item => item.name !== industryName));
    } else {
      setSelectedIndustries(prev => [...prev, { name: industryName, units: '' }]);
    }
  };

  const handleUnitChange = (industryName, unitValue) => {
    // Ensure the value is not negative
    const value = Math.max(0, parseInt(unitValue, 10) || 0);
    setSelectedIndustries(prev => prev.map(industry =>
      industry.name === industryName ? { ...industry, units: value } : industry
    ));
  };
  
  const isFormValid = () => {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.companyName) {
          alert("Please fill out all required contact fields.");
          return false;
      }
      if (totalUnits <= 0) {
          alert("Please select at least one industry and enter the number of units.");
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
        ...selectedIndustries.map(ind => ({ Field: `Units for ${ind.name}`, Value: ind.units })),
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

  const handleSubmit = (e) => {
      e.preventDefault();
      if (isFormValid()) {
          alert("Quote submitted successfully! We will be in touch shortly.");
          console.log("Form Data:", { ...formData, industries: selectedIndustries, totalUnits, totalPrice });
      }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900">Get an Instant, Detailed Quote</h2>
      <p className="mt-2 text-gray-600">Select your industries and enter unit counts for a customized price.</p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            <input type="text" id="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>

        <div ref={dropdownRef}>
          <label className="text-sm font-bold text-gray-800">Select Your Industry/Industries</label>
          <div className="flex flex-wrap gap-2 p-2 mt-2 bg-gray-100 border-transparent rounded-lg min-h-[48px] items-center cursor-pointer" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            {selectedIndustries.map(industry => (
              <div key={industry.name} className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full">
                {industry.name}
                <button type="button" onClick={(e) => { e.stopPropagation(); handleToggleIndustry(industry.name); }} className="transition-transform duration-150 hover:scale-125">
                  <FaTimes />
                </button>
              </div>
            ))}
            {selectedIndustries.length === 0 && <span className="text-gray-500 px-2">Click to select industries...</span>}
          </div>
          {isDropdownOpen && (
            <div className="relative">
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {ALL_INDUSTRIES.map(industryName => {
                  const isSelected = selectedIndustries.some(ind => ind.name === industryName);
                  return (
                    <div key={industryName} onClick={() => handleToggleIndustry(industryName)} className={`px-4 py-3 cursor-pointer flex justify-between items-center transition-colors ${isSelected ? 'bg-green-100 font-bold text-green-800' : 'hover:bg-gray-100'}`}>
                      {industryName}
                      {isSelected && <span className="text-green-600">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {selectedIndustries.length > 0 && (
          <div className="p-4 space-y-4 border-t border-b border-gray-200">
             <h3 className="text-sm font-bold text-gray-800">Enter Units for Each Industry</h3>
            {selectedIndustries.map(industry => (
              <div key={industry.name}>
                <label htmlFor={`units-${industry.name}`} className="text-sm font-medium text-gray-700">Units for <span className="font-bold">{industry.name}</span></label>
                <input 
                  type="number" 
                  id={`units-${industry.name}`} 
                  value={industry.units} 
                  onChange={(e) => handleUnitChange(industry.name, e.target.value)} 
                  placeholder="e.g., 250"
                  min="0" // <-- THIS IS THE CHANGE: Prevents negative numbers
                  onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }} // Prevents typing minus sign
                  className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required 
                />
              </div>
            ))}
          </div>
        )}

        {totalUnits > 0 && (
          <div className="p-6 space-y-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-gray-800">Your Live Quote Summary</h3>
            <div className="flex justify-between items-center text-lg">
                <p className="font-medium text-gray-600">Total Units:</p>
                <p className="font-bold text-gray-900">{totalUnits}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-600">Pricing Tier:</p>
              <p className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">{calculatedScale}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-green-200">
              <p className="text-lg font-bold text-gray-700">Estimated Total:</p>
              <p className="text-3xl font-extrabold text-green-600">${totalPrice}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <button type="button" onClick={handleDownloadExcel} className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            Download Quote as Excel
          </button>
          <button type="submit" className="w-full px-6 py-3 font-semibold text-green-700 bg-white border-2 border-green-600 rounded-lg shadow-md hover:bg-green-50 transition-all duration-300">
            Submit & Contact Us
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetAQuoteForm;
