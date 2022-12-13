import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";
import Spinner from "../../../Shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [closeModal, setCloseModal] = useState(true);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://thrift-store-server.vercel.app/seller-products?email=${user.email}`,
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

  useEffect(() => {
    if (deleteProduct) {
      setIsDataLoading(true);
      fetch(`https://thrift-store-server.vercel.app/seller-product/${deleteProduct._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Your product remove from sales");
            refetch();
            setIsDataLoading(false);
          }
        });
    }
  }, [deleteProduct, refetch]);


  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <div className="text-5xl font-bold">
          Your Have <span className="text-teal-500">0</span> Items on Sale
        </div>
      </div>
    );
  }

  const handleAdvertised = (id, advertise) => {
    setIsDataLoading(true);
    fetch(`https://thrift-store-server.vercel.app/seller-product/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("thrift-token")}`,
      },
      body: JSON.stringify({ advertise }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(
            `${advertise
              ? "Product remove from advertised list"
              : "Product on advertised list."
            }`
          );
          refetch();
          setIsDataLoading(false);
        }
      });
  };

  const handleConfirmation = (product) => {
    setCloseModal(false);
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center cursor-pointer underline underline-offset-4 py-8 uppercase">
        My Products: <span className="text-teal-500">{products.length}</span>
      </h2>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      <div className="overflow-x-auto m-2 lg:m-5">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sales Status</th>
                <th>Advertise Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{(index + 1) < 10 ? ("0" + (index + 1)) : (index + 1)}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.productName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.productCategory}</td>
                  <td>${product.resalePrice}</td>
                  <td className="uppercase font-medium">
                    {product.saleStatus}
                  </td>
                  <th>
                    <button
                      onClick={() =>
                        handleAdvertised(product._id, product.advertised)
                      }
                      className={`btn btn-xs ${product.advertised ? "btn-success" : "btn-primary text-white"
                        }`}
                      disabled={
                        (product.saleStatus === "available" ? false : true) || isDataLoading
                      }
                    >
                      {`${product.advertised ? "Remove Advertise" : "Advertise"
                        }`}
                    </button>
                  </th>
                  <td>
                    <label
                      htmlFor="confirmation-modal"
                      onClick={() => handleConfirmation(product)}
                      className="btn btn-error btn-outline btn-sm text-gray-600 font-bold"
                      disabled={isDataLoading}
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {
        !closeModal &&
        <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`If delete product ${selectedProduct?.productName} it can't be undone.`}
          setDeleteProduct={setDeleteProduct}
          setCloseModal={setCloseModal}
          selectedProduct={selectedProduct}
        ></ConfirmationModal>

      }
    </div>
  );
};

export default MyProducts;
