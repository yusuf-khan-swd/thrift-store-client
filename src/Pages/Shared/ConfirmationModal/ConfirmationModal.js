import React from "react";

const ConfirmationModal = ({ title, message, setDeleteProduct, setCloseModal, selectedProduct }) => {
  const handleSuccessAction = () => {
    setCloseModal(true);
    setDeleteProduct(selectedProduct);
  }

  const handleCancelAction = () => {
    setDeleteProduct(false);
    setCloseModal(true);
  }


  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={handleCancelAction}
            htmlFor="confirmation-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label onClick={handleSuccessAction} htmlFor="confirmation-modal" className="btn btn-error btn-sm">Confirm</label>
            <label
              onClick={handleCancelAction}
              htmlFor="confirmation-modal"
              className="btn btn-primary btn-sm text-white"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
