import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import BookModal from "./BookModal";
import ProductCard from "./ProductCard";

const Products = () => {
  const [openModal, setOpenModal] = useState(true);
  const [productBooked, setProductBooked] = useState({});

  const products = useLoaderData();
  console.log(products);

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">
          This category have <span className="text-teal-500">0</span> products.
        </h2>
      </div>
    );
  }

  const handleBookProduct = product => {
    setProductBooked(product);
  };

  return (
    <div className="container mx-auto mb-24">
      <h2 className="text-3xl font-bold text-center my-8 uppercase">
        <Link to="/categories" className="text-sm">Category</Link> <br /> <span>{products[0]?.productCategory}</span>
      </h2>
      <div className="grid grid-cols-1 gap-6 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} setOpenModal={setOpenModal} handleBookProduct={handleBookProduct}></ProductCard>
        ))}
      </div>
      <div>
        {
          openModal &&
          <BookModal setOpenModal={setOpenModal} productBooked={productBooked}></BookModal>
        }
      </div>
    </div>
  );
};

export default Products;
