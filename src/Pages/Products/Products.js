import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Products = () => {
  const allProducts = useLoaderData();
  console.log(allProducts);

  return (
    <div className='container mx-auto'>
      <h2 className='text-3xl font-bold text-center my-8 uppercase underline cursor-pointer'>This is {allProducts[0]?.productCategory} Category</h2>
    </div>
  );
};

export default Products;