import React, { useState } from "react";
import { toast } from "react-hot-toast";
import BookModal from "../../Products/BookModal";
import ProductCard from "../../Products/ProductCard";

const Advertised = ({ advertisedItems, refetch }) => {
  const [openModal, setOpenModal] = useState(true);
  const [productBooked, setProductBooked] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  const handleBookProduct = (product) => {
    setProductBooked(product);
  };

  const handleReport = (id, reported) => {
    setIsDataLoading(true);
    fetch(`https://thrift-store-server.vercel.app/reported-products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("thrift-token")}`,
      },
      body: JSON.stringify({ reported }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(
            `${reported ? "Report is remove" : "Reported to admin"}`
          );
          setIsDataLoading(false);
          refetch();
        }
      })
      .catch((error) => {
        console.log("report error: ", error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="m-2">
        <h2 className="text-3xl font-bold text-center capitalize mb-5">
          Advertised Items
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {advertisedItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setOpenModal={setOpenModal}
              handleBookProduct={handleBookProduct}
              handleReport={handleReport}
              isDataLoading={isDataLoading}
            ></ProductCard>
          ))}
        </div>
        <div>
          {openModal && (
            <BookModal
              setOpenModal={setOpenModal}
              productBooked={productBooked}
            ></BookModal>
          )}
        </div>
      </div>
    </div >
  );
};

export default Advertised;
