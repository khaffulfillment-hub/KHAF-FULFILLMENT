import React, { useState } from 'react';

// --- Import Logos Locally ---
// Ensure these paths match where you saved the logos in your 'src' folder.
import FedexLogo from '../assets/logos/fedex.png';
import UpsLogo from '../assets/logos/ups.png';
import DhlLogo from '../assets/logos/dhl.png';
import UspsLogo from '../assets/logos/usps.png';
import RoyalMailLogo from '../assets/logos/royal-mail.png';
import CanadaPostLogo from '../assets/logos/canada-post.png';
import IndiaPostLogo from '../assets/logos/india-post.png';
import BlueDartLogo from '../assets/logos/blue-dart.png';

// --- Carrier Data with Auto-Fill URL Templates ---
// The key here is the `trackUrlTemplate` which includes the query parameter.
const nationalCarriers = [
  { name: 'USPS', trackUrlTemplate: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=', logo: UspsLogo },
  { name: 'India Post', trackUrlTemplate: 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?reqtype=i&Number=', logo: IndiaPostLogo },
  { name: 'Blue Dart', trackUrlTemplate: 'https://www.bluedart.com/tracking?Waybill=', logo: BlueDartLogo },
];

const internationalCarriers = [
  { name: 'FedEx', trackUrlTemplate: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=', logo: FedexLogo },
  { name: 'UPS', trackUrlTemplate: 'https://www.ups.com/track?tracknum=', logo: UpsLogo },
  { name: 'DHL Express', trackUrlTemplate: 'https://www.dhl.com/global-en/home/tracking.html?tracking-id=', logo: DhlLogo },
  { name: 'Royal Mail', trackUrlTemplate: 'https://www.royalmail.com/track-your-item#/', logo: RoyalMailLogo },
  { name: 'Canada Post', trackUrlTemplate: 'https://www.canadapost-postescanada.ca/track-reperage/en#/search?searchFor=', logo: CanadaPostLogo },
];


// --- Reusable Component for the Carrier Card UI ---
const CarrierCard = ({ carrier, onClick, isSelected }) => (
  <div
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-4 bg-white rounded-2xl border-2 transition-all duration-300 ease-in-out cursor-pointer
                ${isSelected ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-xl scale-105' : 'border-gray-200/80 shadow-sm hover:shadow-lg hover:border-blue-400 hover:scale-105'}`}
  >
    <img 
      src={carrier.logo} 
      alt={`${carrier.name} logo`} 
      className="object-contain h-12 transition-transform duration-300 group-hover:scale-110" 
    />
    <span className="mt-4 text-sm font-semibold text-center text-gray-800">{carrier.name}</span>
  </div>
);


function TrackShipmentForm() {
  const [trackingId, setTrackingId] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState(null);

  // This function runs when a user clicks on a carrier logo.
  const handleCarrierClick = (carrier) => {
    // Set the clicked carrier as the selected one.
    setSelectedCarrier(carrier);
    
    // Check if the user has already entered a tracking ID.
    if (trackingId.trim() && carrier.trackUrlTemplate) {
      // If yes, immediately construct the URL and open it in a new tab.
      const url = `${carrier.trackUrlTemplate}${encodeURIComponent(trackingId.trim())}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // This function runs when the user clicks the main "Track" button.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const id = trackingId.trim();

    // Ensure the user has entered a tracking ID.
    if (!id) {
        alert('Please enter a tracking ID.');
        return;
    }

    if (selectedCarrier && selectedCarrier.trackUrlTemplate) {
      // If a carrier has been selected, use its specific auto-fill URL.
      const url = `${selectedCarrier.trackUrlTemplate}${encodeURIComponent(id)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // If no carrier is selected, fall back to a general Google search.
      alert('Please select a carrier first for specific tracking.');
      window.open(`https://www.google.com/search?q=${encodeURIComponent(id + ' tracking')}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-0 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Track Your Shipment</h2>
        <p className="mt-2 text-md text-gray-600">
          Enter your tracking ID, then select a provider below.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="flex gap-2 mb-10">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID..."
          className="flex-grow w-full px-4 py-3 text-gray-800 bg-white border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button type="submit" className="
              px-6 py-3 w-3/5 font-semibold rounded-lg
              bg-gradient-to-r from-green-300 to-green-500 text-white
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white
              hover:scale-105 hover:shadow-lg
            ">
          Track
        </button>
      </form>
      
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-center text-gray-500 uppercase">
            National Providers
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {nationalCarriers.map((carrier) => (
              <CarrierCard 
                carrier={carrier} 
                key={carrier.name}
                isSelected={selectedCarrier?.name === carrier.name}
                onClick={() => handleCarrierClick(carrier)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-center text-gray-500 uppercase">
            International Providers
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {internationalCarriers.map((carrier) => (
              <CarrierCard 
                carrier={carrier} 
                key={carrier.name} 
                isSelected={selectedCarrier?.name === carrier.name}
                onClick={() => handleCarrierClick(carrier)}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-center text-gray-500">
        Clicking a provider with a tracking ID will open their official tracking page.
      </p>
    </div>
  );
}

export default TrackShipmentForm;
