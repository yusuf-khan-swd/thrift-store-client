import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import Advertised from '../Advertised/Advertised';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import OurStates from '../OurStats/OurStates';

const Home = () => {
  const { data: advertisedItems, isLoading } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/advertised");
      const data = await res.data;
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='container mx-auto'>
      <Banner></Banner>
      <Categories></Categories>
      {
        advertisedItems.length !== 0 &&
        <Advertised advertisedItems={advertisedItems}></Advertised>
      }
      <OurStates></OurStates>
    </div>
  );
};

export default Home;