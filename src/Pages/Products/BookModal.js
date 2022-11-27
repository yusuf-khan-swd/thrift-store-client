import React from 'react';

const BookModal = () => {
  return (
    <div>
      <input type="checkbox" id="book-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
            <label htmlFor="book-modal" className="btn">Yay!</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;