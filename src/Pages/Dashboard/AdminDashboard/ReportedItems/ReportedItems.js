import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";
import Spinner from "../../../Shared/Spinner/Spinner";

const ReportedItems = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [deleteItem, setDeleteItem] = useState(false);
  const [closeModal, setCloseModal] = useState(true);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://thrift-store-server.vercel.app/reported-products",
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
    if (deleteItem) {
      setIsDataLoading(true);
      fetch(
        `https://thrift-store-server.vercel.app/reported-products/${deleteItem._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("thrift-token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Deleted the reported product");
            refetch();
            setIsDataLoading(false);
          }
        })
        .catch((error) => {
          console.log("delete error: ", error);
          setIsDataLoading(false);
        });
    }
  }, [deleteItem, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">No product reported.</h2>
      </div>
    );
  }

  const handleConfirmation = (item) => {
    setCloseModal(false);
    setSelectedItem(item);
  };

  return (
    <>
      <div className="container mx-auto mb-24">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold uppercase cursor-pointer text-teal-400 underline">
            Total reported product - {products.length}
          </h2>
        </div>
        <div className="h-8">{isDataLoading && <Spinner />}</div>
        <div className="overflow-x-auto m-2 lg:m-5">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>s/n</th>
                <th>Reported Product</th>
                <th>Product Category</th>
                <th>Seller Email</th>
                <th>Reporter</th>
                <th>Action</th>
                <th>Total Report</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt={product.productName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {product.productName.length > 20
                            ? product.productName.slice(0, 20) + "..."
                            : product.productName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.productCategory}</td>
                  <td>{product.sellerEmail}</td>
                  <td>User</td>
                  <td>
                    <label
                      htmlFor="confirmation-modal"
                      onClick={() => handleConfirmation(product)}
                      className="btn btn-error btn-xs btn-outline font-bold mr-4"
                    >
                      Delete
                    </label>
                  </td>
                  <td>00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {!closeModal && (
        <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`If delete item ${selectedItem?.userName} it can't be undone.`}
          setDeleteItem={setDeleteItem}
          selectedItem={selectedItem}
          setCloseModal={setCloseModal}
        ></ConfirmationModal>
      )}
    </>
  );
};

export default ReportedItems;
