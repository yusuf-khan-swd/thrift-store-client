import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../assets/banner-1.jpg';

const Banner = () => {
  return (
    <div className="relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0 my-16 rounded-lg sm:border sm:border-primary lg:h-[450px] m-2">
      <div className="flex flex-col items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-24 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6 text-center md:text-left">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-bold tracking-wider uppercase rounded-full btn-primary">
                Hope are here
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              A Charity Shop
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              A charity shop, thrift shop or thrift store or opportunity shop or op-shop is a retail establishment run by a charitable organization to raise money. Charity shops are a type of social enterprise
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <Link className='btn btn-primary font-bold mr-3 ' to="/categories">Categories</Link>
            <Link className='font-bold hidden lg:block' to="/blog">Read Blog</Link>
          </div>
        </div>
      </div>
      <div className="inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
          src={banner}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;