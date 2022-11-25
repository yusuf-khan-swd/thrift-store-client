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
    <div>
      <h2>Categories {categories.length} </h2>
      {
        categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
      }
    </div>
  );
};

export default Categories;