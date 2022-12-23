import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import CategoryName from "../Shared/CategoryName/CategoryName";
import Loading from "../Shared/Loading/Loading";
import BookModal from "./BookModal";
import ProductCard from "./ProductCard";

const Products = () => {
  const [openModal, setOpenModal] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [productBooked, setProductBooked] = useState({});

  const products = useLoaderData();
  const navigation = useNavigation();

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center">
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
          toast.success(`${reported ? "Remove report" : "Reported to admin"}`);
          setIsDataLoading(false);
        }
      })
      .catch((error) => {
        console.log("report error: ", error);
      });
  };

  return (
    <div className="container mx-auto mb-24">
      <div className="m-2">
        <section className="grid grid-cols-5 ">
          <ul>
            <CategoryName listMargin={`m-1`} linkStyle={``}></CategoryName>
          </ul>
          <div className="col-span-4">
            <div className="pb-0">
              <h2 className="text-3xl font-bold text-center mb-2 uppercase">
                <Link to="/categories" className="text-sm text-info hover:link">
                  Category
                </Link>
                <br /> <span>{products[0]?.productCategory}</span>
              </h2>
              <p className="text-center font-bold text-zinc-400 text-xl mb-5">Total {products.length} Products Available</p>
            </div>
            {
              navigation.state === "loading" ?
                <Loading style={`h-[50vh]`}></Loading>
                :
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
            }
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
