import React, { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../Shared/Spinner/Spinner";

const ProductCard = ({ product, setOpenModal, handleBookProduct }) => {
  const [isDataLoading, setIsDataLoading] = useState(false);

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
    reported
  } = product;

  const handleBooked = (modal, product) => {
    setOpenModal(modal);
    handleBookProduct(product);
  };

  const handleReport = (id) => {
    setIsDataLoading(true);
    fetch(`http://localhost:5000/reports/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          toast.success("Reported to admin");
        }
        setIsDataLoading(false);
      })
      .catch(error => {
        console.log('report error: ', error)
        setIsDataLoading(false);
      })
  };

  return (
    <div className="m-2">
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
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
            <label onClick={() => handleBooked(true, product)} htmlFor="book-modal" className="btn btn-primary">Book Now</label>
            <button disabled={isDataLoading} onClick={() => handleReport(_id, reported)} className={`btn ${reported ? 'btn-warning' : 'btn-secondary'}`}>{`${reported ? 'Remove Report' : 'Report to admin'}`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
