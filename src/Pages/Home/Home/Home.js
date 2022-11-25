import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import OurStates from '../OurStats/OurStates';

const Home = () => {
  return (
    <div className='container mx-auto'>
      <Banner></Banner>
      <Categories></Categories>
      <OurStates></OurStates>
    </div>
  );
};

export default Home;