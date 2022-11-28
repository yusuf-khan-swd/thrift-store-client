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
      <div className="card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white shadow-xl rounded-lg max-w-6xl mx-auto">
        <figure>
          <img src={image} className="p-2 rounded-2xl" alt={productName} />
        </figure>
        <div className="card-body lg:col-span-2 text-zinc-500">
          <h2 className="card-title uppercase justify-center font-bold">{productName}</h2>
          <p className="font-semibold text-xl text-center mb-5">Resale Price: ${resalePrice} </p>
          <div className="mb-3">
            <p>Months of Use: {monthsUsed} Month</p>
            <p>Original Price: ${originalPrice}</p>
            <p>Location: {location} </p>
            <p>Posted Time: {postedDate} {hour}{AmOrPm}</p>
            <p>Condition Type: {conditionType}</p>
          </div>
          <div>
            <p className="flex items-center">
              Seller Name: {sellerName}
              {sellerIsVerified && (
                <FaCheckCircle
                  className="ml-3 text-blue-600"
                  title="Seller is verified"
                ></FaCheckCircle>
              )}
            </p>
            <p>Seller Mobile Number: {sellerNumber}</p>
            <p className="mb-3"><span className="font-medium">Description:</span> {description}</p>
          </div>
          <div className="card-actions justify-start lg:justify-end mt-5">
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
