import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import CategoryCard from './CategoryCard';

const Categories = () => {

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/categories');
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-8'>Categories</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
        }
      </div>
    </div>
  );
};

export default Categories;