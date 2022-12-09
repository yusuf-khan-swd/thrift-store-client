import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../assets/banner-2.webp';

const Banner = () => {
  return (
    <div className='container mx-auto'>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary text-white">
                  Shop Here
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                A Thrift Store
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                A thrift shop or opportunity shop or op-shop is a retail establishment run by a charitable organization to raise money. Charity shops are a type of social enterprise
              </p>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 btn-primary focus:shadow-outline focus:outline-none"
              >
                <span className="mr-3">Categories</span>

              </Link>
              <Link
                to="/blogs"
                aria-label=""
                className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-green-700"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <img
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
              src={banner}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;