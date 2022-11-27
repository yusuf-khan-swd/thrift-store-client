import React from 'react';
import AdvertisedCard from './AdvertisedCard';

const Advertised = ({ advertisedItems }) => {

  console.log(advertisedItems);

  return (
    <div>
      <h2 className='text-3xl font-bold text-center my-8 uppercase underline cursor-pointer'>Advertised Items {advertisedItems.length} </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          advertisedItems.map(item => <AdvertisedCard key={item._id} item={item}></AdvertisedCard>)
        }
      </div>
    </div>
  );
};

export default Advertised;