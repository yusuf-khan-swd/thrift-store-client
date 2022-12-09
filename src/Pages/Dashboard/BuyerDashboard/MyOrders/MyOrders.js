import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import Spinner from '../../../Shared/Spinner/Spinner';

const MyOrders = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch("https://thrift-store-server.vercel.app/orders", {
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`
        }
      })

      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }


  const handleDeleteOrder = (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want remove this product from your orders"
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
          toast.success("Your order is deleted.");
          refetch();
          setIsDataLoading(false);
        }
      })
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center cursor-pointer underline underline-offset-4 py-8 uppercase">
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
                      <Link to={`/dashboard/my-payment/${product._id}`} className='btn btn-sm btn-primary mr-3 text-white' disabled={isDataLoading || product.saleStatus}>
                        {product.saleStatus ? 'Paid' : 'Pay'}
                      </Link>
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

export default MyOrders;