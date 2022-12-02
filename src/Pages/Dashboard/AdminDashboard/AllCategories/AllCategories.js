import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Loading/Loading';
import Spinner from '../../../Shared/Spinner/Spinner';

const AllCategories = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const { data: categories, isLoading, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://thrift-store-server.vercel.app/categories');
      const data = await res.data;
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  const handleDeleteCategory = id => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this category"
    );

    if (!isConfirm) {
      return;
    }

    setIsDataLoading(true);
    fetch(`https://thrift-store-server.vercel.app/categories/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          toast.success("Category Deleted Successfully.");
          refetch();
          setIsDataLoading(false);
        }
      })
      .catch(error => {
        setIsDataLoading(false);
        console.log('error: ', error);
      })
  };

  return (
    <div className='container mx-auto mb-24'>
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold uppercase cursor-pointer text-teal-400 underline">
          Total reported product - {categories.length}
        </h2>
      </div>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      <div className="overflow-x-auto m-2 lg:m-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>s/n</th>
              <th>Category</th>
              <th>Admin Name</th>
              <th>Admin Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <th>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={category.categoryImage}
                          alt={category.categoryName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{category.categoryName}</div>
                    </div>
                  </div>
                </td>
                <td>admin name</td>
                <td>admin email</td>
                <td>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="btn btn-error btn-xs btn-outline font-bold mr-4"
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

export default AllCategories;