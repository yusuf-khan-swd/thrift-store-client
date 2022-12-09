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
        <div className="card-body text-zinc-500">
          <div>
            <h2 className="card-title justify-center capitalize">{productName}</h2>
            <p className="font-bold text-center">Resale price: <span className="text-black">${resalePrice}</span></p>
          </div>
          <div>
            <p className="mb-1">Location: <span className="font-bold">{location}</span></p>
            <p className="mb-1">Used: <span className="font-bold">{monthsUsed} Month</span></p>
          </div>
          <div className="card-actions justify-center">
            <label
              onClick={() => handleBooked(true, item)}
              htmlFor="book-modal"
              className="btn btn-primary text-white w-full"
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
