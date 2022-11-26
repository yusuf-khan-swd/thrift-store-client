import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Products = () => {
  const abc = useLoaderData();
  console.log(abc);

  return (
    <div>
      <h2>This is products</h2>
    </div>
  );
};

export default Products;