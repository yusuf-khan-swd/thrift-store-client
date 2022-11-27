import React from "react";

const AdvertisedCard = ({ item }) => {
  const { productName, image } = item;
  return (
    <div className="m-2">
      <div className="card card-compact w-full bg-base-100 shadow-xl border">
        <figure>
          <img src={image} className="w-full h-80" alt={productName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase justify-center">{productName}</h2>
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-full">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedCard;
