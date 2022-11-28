import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ProductCard = ({
  product,
  setOpenModal,
  handleBookProduct,
  handleReport,
  isDataLoading,
}) => {
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
    _id,
    reported,
  } = product;

  const handleBooked = (modal, product) => {
    setOpenModal(modal);
    handleBookProduct(product);
  };

  return (
    <div className="m-2">
      <div className="card lg:card-side bg-white shadow-xl border">
        <div>
          <figure>
            <img src={image} alt={productName} />
          </figure>
        </div>
        <div className="card-body">
          <h2 className="card-title uppercase justify-center">{productName}</h2>
          <p>location: {location} </p>
          <p>Resale Price: ${resalePrice} </p>
          <p>Original Price: ${originalPrice}</p>
          <p>Months of Use: ${monthsUsed} </p>
          <p>Posted Time: {time}</p>
          <p className="flex items-center">

            Seller Name: {sellerName}
            {sellerIsVerified && (
              <FaCheckCircle
                className="ml-3"
                title="Seller is verified"
              ></FaCheckCircle>
            )}
          </p>
          <p>Seller is verified: {`${sellerIsVerified}`} </p>
          <p>Condition Type: {conditionType}</p>
          <p>Mobile Number: {sellerNumber}</p>
          <p>Description: {description}</p>
          <div className="card-actions justify-end">
            <label
              onClick={() => handleBooked(true, product)}
              htmlFor="book-modal"
              className="btn btn-primary"
            >
              Book Now
            </label>
            <button
              disabled={isDataLoading}
              onClick={() => handleReport(_id, reported)}
              className={`btn ${reported ? "btn-warning" : "btn-secondary"}`}
            >{`${reported ? "Remove Report" : "Report to admin"}`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
