import { format, parseISO } from "date-fns";
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
    saleStatus,
  } = product;

  const convertToISO = parseISO(time);

  const postedDate = format(convertToISO, "PP");
  const hour = format(convertToISO, 'h');
  const AmOrPm = format(convertToISO, 'aaa');


  const handleBooked = (modal, product) => {
    setOpenModal(modal);
    handleBookProduct(product);
  };

  return (
    <div className="m-2">
      <div className="card lg:card-side grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-lg">
        <figure>
          <img src={image} alt={productName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase justify-center">{productName}</h2>
          <p>location: {location} </p>
          <p className="font-bold">{saleStatus}</p>
          <p>Resale Price: ${resalePrice} </p>
          <p>Original Price: ${originalPrice}</p>
          <p>Months of Use: ${monthsUsed} </p>
          <p>Posted Time: {postedDate} {hour}{AmOrPm}</p>
          <p className="flex items-center">

            Seller Name: {sellerName}
            {sellerIsVerified && (
              <FaCheckCircle
                className="ml-3"
                title="Seller is verified"
              ></FaCheckCircle>
            )}
          </p>
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
