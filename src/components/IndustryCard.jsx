import React from 'react';

function IndustryCard({ name }) {
  return (
    <button className="bg-transparent border-2 border-customButton text-secondary px-6 py-3 rounded-full text-lg font-semibold hover:bg-customButton hover:text-charcoal transition duration-300 ease-in-out">
      {name}
    </button>
  );
}

export default IndustryCard;
