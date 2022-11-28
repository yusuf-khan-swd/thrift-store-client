import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Loading/Loading';
import Spinner from '../../../Shared/Spinner/Spinner';

const ReportedItems = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const { data: reports, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch("https://thrift-store-server.vercel.app/reported-products", {
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`
        }
      });
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!reports.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">
          No product reported.
        </h2>
      </div>
    );
  }

  const handleDeleteProducts = (id) => {
    setIsDataLoading(true);
    fetch(`https://thrift-store-server.vercel.app/reported-products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          toast.success("Deleted the reported product")
          refetch();
          setIsDataLoading(false);
        }
      })
      .catch(error => {
        console.log("delete error: ", error);
        setIsDataLoading(false);
      })
  };

  return (
    <div>
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold uppercase cursor-pointer text-teal-400 underline">
          Total reported product - {reports.length}
        </h2>
      </div>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      <div className="overflow-x-auto m-2 lg:m-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Reported Product Name</th>
              <th>Email</th>
              <th>Seller Email</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</th>
                <td>{report.productName}</td>
                <td>{report.sellerEmail}</td>
                <td>
                  <button
                    onClick={() => handleDeleteProducts(report._id)}
                    className="btn btn-error btn-xs text-gray-600 font-bold mr-4"
                  >
                    Delete
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

export default ReportedItems;