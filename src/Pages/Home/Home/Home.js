import React from 'react';
import Categories from '../Categories/Categories';

const Home = () => {
  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-semibold'>Home Page</h2>
      <Categories></Categories>
    </div>
  );
};

export default Home;