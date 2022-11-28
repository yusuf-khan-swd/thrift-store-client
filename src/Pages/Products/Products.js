import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import BookModal from "./BookModal";
import ProductCard from "./ProductCard";

const Products = () => {
  const [openModal, setOpenModal] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [productBooked, setProductBooked] = useState({});
  const { id } = useParams();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`https://thrift-store-server.vercel.app/category/${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">
          This category have <span className="text-teal-500">0</span> products
          <br />
        </h2>
      </div>
    );
  }

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
          toast.success(`${reported ? "Reported to admin" : "Remove report"}`);
          refetch();
          setIsDataLoading(false);
        }
      })
      .catch((error) => {
        console.log("report error: ", error);
      });
  };

  return (
    <div className="container mx-auto mb-24">
      <h2 className="text-3xl font-bold text-center mt-8 mb-2 uppercase">
        <Link to="/categories" className="text-sm text-secondary hover:link">
          Category
        </Link>
        <br /> <span>{products[0]?.productCategory}</span>
      </h2>
      <p className="text-center font-bold text-zinc-400 text-xl mb-5">Total {products.length} Products Available</p>
      <div className="grid grid-cols-1 gap-6 ">
        {products.map((product) => (
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
  );
};

export default Products;
