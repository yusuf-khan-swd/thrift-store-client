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
  const hour = format(convertToISO, "h");
  const AmOrPm = format(convertToISO, "aaa");

  const handleBooked = (modal, product) => {
    setOpenModal(modal);
    handleBookProduct(product);
  };

  return (
    <div className="m-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-white shadow-xl rounded-lg max-w-6xl mx-auto border">
        <div className="m-2 lg:h-[430px]">
          <figure className="h-full w-full">
            <img
              src={image}
              className="h-full w-full rounded-lg border"
              alt={productName}
            />
          </figure>
        </div>
        <div className="card h-full lg:col-span-2 text-zinc-500">
          <div className="card-body p-8 pt-2 md:pt-8">
            <div className="border-b mb-2">
              <h2 className="card-title capitalize justify-start sm:justify-center font-bold">
                {productName}
              </h2>
              <p className="font-semibold text-xl sm:text-center mb-2">
                Resale Price: <span className="ml-1 text-black">${resalePrice}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 text-sm">
              <div className="mb-3">
                <p className="font-medium mb-1">
                  Months of Use:
                  <span className=" font-bold ml-1">{monthsUsed} Month</span>
                </p>
                <p className="font-medium mb-1">
                  Location: <span className=" font-bold ml-1">{location}</span>
                </p>
                <p className="font-medium mb-1">
                  Condition Type:
                  <span className="ml-1 font-bold ">{conditionType}</span>
                </p>
                <p className="font-medium mb-1">
                  Sale Status:
                  <span className="ml-1 uppercase text-green-500">{saleStatus}</span>
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">
                  Original Price:
                  <span className="ml-1 font-bold ">${originalPrice}</span>
                </p>
                <p className="flex items-center font-medium mb-1">
                  Seller Name:
                  <span className="ml-1 font-bold"> {sellerName}</span>
                  {sellerIsVerified && (
                    <FaCheckCircle
                      className="ml-3 text-blue-600"
                      title="Seller is verified"
                    ></FaCheckCircle>
                  )}
                </p>
                <p className="font-medium mb-1">
                  Seller Mobile Number:
                  <span className="ml-1 font-bold">{sellerNumber}</span>
                </p>
                <p className="font-medium mb-1">
                  Posted Time:
                  <span className="ml-1 font-bold">
                    {postedDate} At {hour}
                    {AmOrPm}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <p className="overflow-hidden text-ellipsis lg:h-28 mb-3">
                <span className="font-medium">Quick Overview</span> <br />
                <span className="text-sm">
                  {description?.length > 200
                    ? description.slice(0, 198) + "..."
                    : description
                  }
                </span>
              </p>
            </div>
            <div className="card-actions justify-start lg:justify-end">
              <label
                disabled={isDataLoading}
                onClick={() => handleBooked(true, product)}
                htmlFor="book-modal"
                className="btn btn-primary text-white w-full sm:w-44"
              >
                Book Now
              </label>
              <button
                disabled={isDataLoading}
                onClick={() => handleReport(_id, reported)}
                className={`btn w-full sm:w-44 ${reported ? "btn-warning" : "btn-accent text-white"
                  }`}
              >{`${reported ? "Remove Report" : "Report to admin"}`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
