import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CategoryCard from './CategoryCard';
import axios from 'axios';

const Categories = () => {
  const location = useLocation();
  const isItCategoriesRoute = location.pathname === "/categories"

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/categories');
      const data = await res.data;
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-8'>Categories</h2>
      <div className={`${isItCategoriesRoute && 'grid grid-cols-5'}`}>
        {
          isItCategoriesRoute &&
          <ul className='hidden md:block md:col-span-1'>
            {
              categories.map(category => <li className='m-1' key={category._id}> <Link className='btn btn-primary' to={`/category/${category._id}`}>{category.categoryName}</Link> </li>)
            }
          </ul>
        }
        <div className={`${isItCategoriesRoute ? 'col-span-5 md:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
          {
            categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
          }
        </div>
      </div>
    </div>
  );
};

export default Categories;