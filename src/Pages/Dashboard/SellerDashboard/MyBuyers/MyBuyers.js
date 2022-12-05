import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const MyBuyers = () => {
  const { user } = useContext(AuthContext);

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['ordered-products'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/ordered-products?email=${user.email}`, {
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

  console.log(products)

  return (
    <div>
      <h2>My Buyers {products?.length}</h2>
    </div>
  );
};

export default MyBuyers;