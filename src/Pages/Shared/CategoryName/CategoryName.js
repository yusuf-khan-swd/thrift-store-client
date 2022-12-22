import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const CategoryName = () => {

  const { data: categories = [], isLoading } = useQuery({
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
  return (
    <div className="container mx-auto mb-24">
      <h2 className='text-3xl font-bold text-center capitalize mb-5'>
        <Link to="/categories" title="Categories">Categories</Link>
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-2">
        {
          categories.map(category => <li className='m-1' key={category._id}> <Link className='btn btn-primary w-full text-white rounded-lg overflow-hidden text-ellipsis' to={`/category/${category._id}`}>{category.categoryName}</Link> </li>)
        }
      </ul>
    </div>
  );
};

export default CategoryName;