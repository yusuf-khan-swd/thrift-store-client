import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import Spinner from '../../../Shared/Spinner/Spinner';

const MyOrders = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const { data: orders, isLoading, refetch } = useQuery({
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
          toast.success("Your order is deleted.");
          refetch();
          setIsDataLoading(false);
        }
      })
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center cursor-pointer underline underline-offset-4 py-8 uppercase">
        My Orders: <span className="text-teal-500">{orders.length}</span>
      </h2>
      <div className="h-8">{isDataLoading && <Spinner></Spinner>}</div>
      {
        orders.length !== 0 &&
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
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <th>{index + 1 < 10 && "0" + (index + 1)}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={order.productImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{order.productName}</div>
                        </div>
                      </div>
                    </td>
                    <td>${order.productPrice}</td>
                    <td>${order.sellerEmail}</td>

                    <td>
                      <Link to={`/dashboard/my-payment/${order._id}`} className='btn btn-sm btn-primary mr-3' disabled={isDataLoading || order.saleStatus}>
                        {order.saleStatus ? 'Paid' : 'Pay'}
                      </Link>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
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