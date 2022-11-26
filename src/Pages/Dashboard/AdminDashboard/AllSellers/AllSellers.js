import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";

const AllSellers = () => {
  const { data: sellers, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/all-sellers", {
        headers: {
          authorization: `bearer ${localStorage.getItem('thrift-token')}`
        }
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

  const handleVerifySeller = (id) => {
    console.log(id);
  };

  const handleDeleteSeller = (id) => {
    fetch(`http://localhost:5000/all-sellers/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          toast.success("User deleted successfully.");
          refetch();
        }
      })
  };

  return (
    <div>
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold uppercase cursor-pointer">
          <span className="underline">All Sellers:</span> <span className="text-teal-400">{sellers.length}</span>
        </h2>
      </div>
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
            {
              sellers.map((seller, index) => <tr key={seller._id}>
                <th>{(index + 1) < 10 && ('0' + (index + 1))}</th>
                <td>{seller.userName}</td>
                <td>{seller.userEmail}</td>
                <td>
                  <button onClick={() => handleDeleteSeller(seller._id)} className="btn btn-error btn-xs text-gray-600 font-bold mr-4">Delete</button>
                  <button onClick={() => handleVerifySeller(seller._id)} className="btn btn-primary btn-xs text-gray-600 font-bold">Verify</button>
                </td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
