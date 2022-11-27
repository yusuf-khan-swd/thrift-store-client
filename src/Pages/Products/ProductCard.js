import React from "react";

const ProductCard = ({ product }) => {
  const {
    productName,
    image,
    location,
    resalePrice,
    originalPrice,
    monthsUsed,
    time,
    sellerName,
    sellerIsVerified,
    conditionType,
    sellerNumber,
    description,
  } = product;
  return (
    <div className="m-2">
      <div className="card card-side bg-white shadow-xl border">
        <div>
          <figure>
            <img src={image} className="w-1/2" alt={productName} />
          </figure>
        </div>
        <div className="card-body">
          <h2 className="card-title uppercase justify-center">{productName}</h2>
          <p>location: {location} </p>
          <p>Resale Price: ${resalePrice} </p>
          <p>Original Price: ${originalPrice}</p>
          <p>Months of Use: ${monthsUsed} </p>
          <p>Posted Time: {time}</p>
          <p>Seller Name: {sellerName}</p>
          <p>Seller is verified: {`${sellerIsVerified}`} </p>
          <p>Condition Type: {conditionType}</p>
          <p>Mobile Number: {sellerNumber}</p>
          <p>Description: {description}</p>
          <div className="card-actions justify-end">
            <label htmlFor="book-modal" className="btn btn-primary">Book Now</label>
            <button className="btn btn-primary">Report to admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
