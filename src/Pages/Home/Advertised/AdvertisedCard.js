import React from "react";

const AdvertisedCard = ({ item, setOpenModal,
  handleBookProduct, }) => {
  const { productName, image, resalePrice, location, monthsUsed } = item;

  const handleBooked = (modal, product) => {
    setOpenModal(modal);
    handleBookProduct(product);
  };
  return (
    <div className="m-2">
      <div className="card card-compact w-full bg-base-100 shadow-xl border">
        <figure>
          <img src={image} className="w-full h-72" alt={productName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase justify-center">{productName}</h2>
          <p className="font-bold">Resale price: ${resalePrice}</p>
          <p>Location: {location}</p>
          <p>Used: {monthsUsed} Month</p>
          <div className="card-actions justify-center">
            <label
              onClick={() => handleBooked(true, item)}
              htmlFor="book-modal"
              className="btn btn-primary w-full"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedCard;
