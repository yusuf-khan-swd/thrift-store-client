import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user.email}`,
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
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <div className="text-5xl font-bold">
          Your Have <span className="text-teal-500">0</span> Items on Sale
        </div>
      </div>
    );
  }

  const handleAdvertised = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Product on advertised list.");
          refetch();
        }
      });
  };

  const handleDeleteProduct = (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete this product");

    if (!isConfirm) {
      return;
    }

    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount) {
          toast.success("Your product remove from sales");
          refetch();
        }
      })
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center cursor-pointer underline underline-offset-4 py-8 uppercase">
        My Products: <span className="text-teal-500">{products.length}</span>
      </h2>
      <div className="overflow-x-auto m-2 lg:m-5">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Sales Status</th>
                <th>Advertise Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index}</th>
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
                  <td>${product.resalePrice}</td>
                  <td className="uppercase font-medium">
                    {product.saleStatus}
                  </td>
                  <th>
                    <button
                      onClick={() => handleAdvertised(product._id)}
                      className="btn btn-primary btn-xs"
                      disabled={product.advertised}
                    >
                      Advertise
                    </button>
                  </th>
                  <td>
                    <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-error btn-sm text-gray-600 font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
