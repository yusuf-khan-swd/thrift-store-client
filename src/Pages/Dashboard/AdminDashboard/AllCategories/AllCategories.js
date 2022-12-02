import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const AllCategories = () => {

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://thrift-store-server.vercel.app/categories');
      const data = await res.data;
      return data;
    }
  });

  console.log(categories)

  return (
    <div>

    </div>
  );
};

export default AllCategories;