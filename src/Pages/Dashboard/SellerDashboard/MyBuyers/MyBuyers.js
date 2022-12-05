import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';
import Spinner from '../../../Shared/Spinner/Spinner';

const MyBuyers = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['ordered-products'],
    queryFn: async () => {
      const res = await fetch(`https://thrift-store-server.vercel.app/ordered-products?email=${user.email}`, {
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

  if (!products.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <div className="text-5xl font-bold">
          Your Have <span className="text-teal-500">0</span> Items on Sale
        </div>
      </div>
    );
  }

  const handleDeleteOrder = (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this product"
    );

    if (!isConfirm) {
      return;
    }

    setIsDataLoading(true);
    fetch(`https://thrift-store-server.vercel.app/orders/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          toast.success("Product is deleted.");
          refetch();
        }
        setIsDataLoading(false);
      })
  };


  return (
    <div>
      <h2 className="text-3xl font-bold text-center cursor-pointer underline pt-4 underline-offset-4 uppercase">
        My Orders: <span className="text-teal-500">{products.length}</span>
      </h2>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      {
        products.length !== 0 &&
        <div className="overflow-x-auto m-2 lg:m-5">
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Buyer</th>
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
                    <td>{product.buyerEmail}</td>

                    <td>
                      {/* <Link to={`/dashboard/my-payment/${product._id}`} className='btn btn-sm btn-primary mr-3' disabled={isDataLoading || product.saleStatus}>
                      {product.saleStatus ? 'Paid' : 'Pay'}
                    </Link> */}
                      <button
                        onClick={() => handleDeleteOrder(product._id)}
                        className="btn btn-error btn-outline btn-sm font-bold"
                        disabled={isDataLoading}
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
      }
    </div>
  );
};

export default MyBuyers;