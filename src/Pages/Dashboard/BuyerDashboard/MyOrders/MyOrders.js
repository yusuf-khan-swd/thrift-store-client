import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";
import Spinner from "../../../Shared/Spinner/Spinner";

const MyOrders = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [closeModal, setCloseModal] = useState(true);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("https://thrift-store-server.vercel.app/orders", {
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`,
        },
      });

      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (deleteProduct) {
      setIsDataLoading(true);
      fetch(`https://thrift-store-server.vercel.app/orders/${deleteProduct._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("Your order is deleted.");
            refetch();
            setIsDataLoading(false);
          }
        });

    }
  }, [deleteProduct, refetch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleConfirmation = (product) => {
    setCloseModal(false);
    setSelectedProduct(product);
  };



  return (
    <div>
      <h2 className="text-3xl font-bold text-center cursor-pointer underline underline-offset-4 py-4 uppercase">
        My Orders: <span className="text-teal-500">{products.length}</span>
      </h2>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      {products.length !== 0 && (
        <div className="overflow-x-auto m-2 lg:m-5">
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <th>{index + 1 < 10 && "0" + (index + 1)}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={product.productImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.productName}</div>
                        </div>
                      </div>
                    </td>
                    <td>${product.productPrice}</td>
                    <td>{product.sellerEmail}</td>

                    <td>
                      <Link
                        to={`/dashboard/my-payment/${product._id}`}
                        className="btn btn-sm btn-primary mr-3 text-white"
                        disabled={isDataLoading || product.saleStatus}
                      >
                        {product.saleStatus ? "Paid" : "Pay"}
                      </Link>
                      <label
                        htmlFor="confirmation-modal"
                        onClick={() => handleConfirmation(product)}
                        className="btn btn-error btn-outline btn-sm font-bold"
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
      )}
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

export default MyOrders;
