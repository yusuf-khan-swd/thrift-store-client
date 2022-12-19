import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CategoryCard from './CategoryCard';
import axios from 'axios';
import CategoryName from '../../Shared/CategoryName/CategoryName';

const Categories = () => {
  const location = useLocation();
  const isItCategoriesRoute = location.pathname === "/categories"

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
    <div className='container mx-auto mb-24'>
      <div className='m-2'>
        <Link to="/categories" title='Categories'><h2 className='text-3xl font-bold text-center capitalize mb-5'>Our Categories</h2></Link>
        {
          isItCategoriesRoute &&
          <div className={`grid grid-cols-5`}>
            <ul className='hidden md:block md:col-span-1 md:mr-2 lg:mr-8'>
              {
                categories.map(category => <li className='m-1' key={category._id}> <Link className='btn btn-primary w-full text-white' to={`/category/${category._id}`}>{category.categoryName}</Link> </li>)
              }
            </ul>
            <div className="col-span-5 md:col-span-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {
                categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
              }
            </div>
          </div>
        }

        {
          !isItCategoriesRoute &&
          <ul className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mb-8'>
            <CategoryName></CategoryName>
          </ul>
        }
      </div>
    </div>
  );
};

export default Categories;