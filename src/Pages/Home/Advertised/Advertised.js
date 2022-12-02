import React, { useState } from "react";
import BookModal from "../../Products/BookModal";
import AdvertisedCard from "./AdvertisedCard";

const Advertised = ({ advertisedItems }) => {
  const [openModal, setOpenModal] = useState(true);
  const [productBooked, setProductBooked] = useState({});

  const handleBookProduct = (product) => {
    setProductBooked(product);
  };

  return (
    <div className="container mx-auto mb-24 ">
      <div className="md:border md:border-primary rounded-lg m-2">
        <div className="mt-8 p-3">
          <h2 className="text-3xl font-bold text-center my-8 uppercase underline cursor-pointer">
            Advertised Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advertisedItems.map((item) => (
              <AdvertisedCard key={item._id} item={item} setOpenModal={setOpenModal}
                handleBookProduct={handleBookProduct}></AdvertisedCard>
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
      </div>
    </div>
  );
};

export default Advertised;
