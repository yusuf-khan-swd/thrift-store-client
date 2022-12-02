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
      <div className="card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white shadow-xl rounded-lg max-w-6xl mx-auto border">
        <figure>
          <img src={image} className="p-2 rounded-2xl" alt={productName} />
        </figure>
        <div className="card-body lg:col-span-2 text-zinc-500">
          <h2 className="card-title uppercase justify-center font-bold">{productName}</h2>
          <p className="font-semibold text-xl text-center mb-5">Resale Price: ${resalePrice} </p>
          <div className="mb-3">
            <p className="font-medium mb-1">Months of Use: <span className="font-bold ">{monthsUsed} Month</span></p>
            <p className="font-medium mb-1">Original Price: <span className="font-bold ">${originalPrice}</span> </p>
            <p className="font-medium mb-1">Location: <span className="font-bold ">{location}</span> </p>
            <p className="font-medium mb-1">Posted Time: <span className="font-bold ">{postedDate} {hour}{AmOrPm}</span></p>
            <p className="font-medium mb-1">Condition Type: <span className="font-bold ">{conditionType}</span></p>
            <p className="font-medium mb-1">Sale Status: <span className="uppercase text-green-400">{saleStatus}</span></p>
          </div>
          <div>
            <p className="flex items-center font-medium mb-1">
              Seller Name: <span className="font-bold ml-1"> {sellerName}</span>
              {sellerIsVerified && (
                <FaCheckCircle
                  className="ml-3 text-blue-600"
                  title="Seller is verified"
                ></FaCheckCircle>
              )}
            </p>
            <p className="font-medium mb-1">Seller Mobile Number: <span className="font-bold">{sellerNumber}</span></p>
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
