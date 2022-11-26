import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products?email=${user.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  console.log(products);

  if (!products.length) {
    return <div className='h-screen flex justify-center items-center lg:items-start lg:mt-8'>
      <h2 className="text-5xl font-bold">Your Have <span className='text-teal-500'>0</span> Items</h2>
    </div>
  }

  return (
    <div>
      <h2>My products </h2>
    </div>
  );
};

export default MyProducts;