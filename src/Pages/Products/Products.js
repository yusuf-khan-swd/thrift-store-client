import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Products = () => {
  const products = useLoaderData();
  console.log(products);

  return (
    <div className='container mx-auto mb-24'>
      <h2 className='text-3xl font-bold text-center my-8 uppercase underline cursor-pointer'>This is {products[0]?.productCategory} Category</h2>
      <div className='grid grid-cols-1 gap-6 '>
        {
          products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
        }
      </div>
    </div>
  );
};

export default Products;