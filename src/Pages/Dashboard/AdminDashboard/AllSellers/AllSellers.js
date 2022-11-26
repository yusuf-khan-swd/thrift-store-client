import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
import Spinner from "../../../Shared/Spinner/Spinner";

const AllSellers = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/all-sellers", {
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

  if (!sellers.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">
          Total <span className="text-teal-500">0</span> register seller.
        </h2>
      </div>
    );
  }

  const handleVerifySeller = (id, verified) => {
    setIsDataLoading(true);
    fetch(`http://localhost:5000/all-sellers/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("thrift-token")}`,
      },
      body: JSON.stringify({ verified }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Seller is verified..");
          refetch();
          setIsDataLoading(false);
        }
      });
  };

  const handleDeleteSeller = (id) => {
    setIsDataLoading(true);
    fetch(`http://localhost:5000/all-sellers/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("User deleted successfully.");
          refetch();
          setIsDataLoading(false);
        }
      });
  };

  console.log(sellers);

  return (
    <div>
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold uppercase cursor-pointer">
          <span className="underline">All Sellers:</span>
          <span className="text-teal-400">{sellers.length}</span>
        </h2>
      </div>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      <div className="overflow-x-auto m-2 lg:m-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Seller Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id}>
                <th>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</th>
                <td>{seller.userName}</td>
                <td>{seller.userEmail}</td>
                <td>
                  <button
                    onClick={() => handleDeleteSeller(seller._id)}
                    className="btn btn-error btn-xs text-gray-600 font-bold mr-4"
                    disabled={isDataLoading}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleVerifySeller(seller._id, seller.userIsVerified)
                    }
                    className="btn btn-primary btn-xs text-gray-600 font-bold"
                    disabled={isDataLoading}
                  >
                    {seller.userIsVerified ? "Remove Verification" : "Verify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
