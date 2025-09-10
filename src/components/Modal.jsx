import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop for the modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-Transparent bg-opacity-30 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 
        MODAL CONTAINER
        - It has a maximum height to prevent it from going off-screen.
        - `flex flex-col` is used to structure the inner content.
      */}
      <div
        className="relative w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl flex flex-col"
        style={{ maxHeight: '90vh' }} // Sets the max height to 90% of the screen height
        onClick={(e) => e.stopPropagation()}
      >
        {/*
          SCROLLABLE CONTENT AREA
          - `overflow-y-auto` is the key. It automatically adds a vertical scrollbar
            only when the content inside (the form) is taller than the container.
        */}
        <div className="overflow-y-auto p-8">
          {children}
        </div>

        {/* 
          CLOSE BUTTON
          - Remains fixed at the top right, outside the scrollable area.
        */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Modal;
