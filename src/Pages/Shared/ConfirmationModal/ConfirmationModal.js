import React from 'react';

const ConfirmationModal = ({ title }) => {
  return (
    <div>
      {/* The button to open modal */}


      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="confirmation-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
            <label htmlFor="confirmation-modal" className="btn">Yay!</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;