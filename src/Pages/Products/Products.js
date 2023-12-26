import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";
import CategoryName from "../Shared/CategoryName/CategoryName";
import Loading from "../Shared/Loading/Loading";
import BookModal from "./BookModal";
import ProductCard from "./ProductCard";

const Products = () => {
  const [openModal, setOpenModal] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [productBooked, setProductBooked] = useState({});
  const { id } = useParams();

  let {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleCategoryProducts", id],
    queryFn: async () => {
      const res = await fetch(
        `https://thrift-store-server.vercel.app/category/${id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("thrift-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-5xl font-bold text-center">
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
    <div className="container mx-auto mb-24">
      <div className="m-2 pt-8">
        <section className="grid grid-cols-1 md:grid-cols-5 md:gap-6">
          <div>
            <ul className="grid grid-cols-2 sm:gird-cols-3 mb-8 mt-5 md:block md:gap-0 md:my-0 menu sticky top-16">
              <li className="border rounded-lg m-1">
                <NavLink
                  className="rounded-lg"
                  to={`/category/${"all-products"}`}
                >
                  All Products
                </NavLink>
              </li>
              <CategoryName
                listStyle={`border rounded-lg m-1`}
                linkStyle={`rounded-lg`}
              ></CategoryName>
            </ul>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-1 gap-6">
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
          </div>
        </section>
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
  );
};

export default Products;
