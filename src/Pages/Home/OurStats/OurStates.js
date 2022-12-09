import React from 'react';

const OurStates = () => {
  return (
    <div className='container mx-auto'>
      <div className='m-2'>
        <div className="px-4 pt-16 pb-8 mx-auto sm:max-w-xl md:max-w-full lg:w-full md:px-24 lg:px-8 lg:py-20 bg-white rounded-lg">
          <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-4 py-px mb-4 text-xs uppercase rounded-full bg-primary text-white font-bold">
                our all statistic
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              A place where you can find all your needs
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Successful people always see things working out. Alone, we don’t make much of a difference, but together, we are strong to face any problem.
            </p>
          </div>
          <div className="relative w-full p-px mx-auto mb-4 overflow-hidden transition-shadow duration-300 border rounded lg:mb-8 lg:max-w-4xl group hover:shadow-xl">
            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
            <div className="relative flex flex-col items-center h-full py-10 duration-300 bg-white rounded-sm transition-color sm:items-stretch sm:flex-row">
              <div className="px-12 py-8 text-center lg:w-1/2">
                <h6 className="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl">
                  73%
                </h6>
                <p className="text-center md:text-base mt-3">
                  Goes to our charity fund along with our employee salary
                </p>
              </div>
              <div className="w-56 h-1 transition duration-300 transform bg-gray-300 rounded-full group-hover:bg-deep-purple-accent-400 group-hover:scale-110 sm:h-auto sm:w-1" />
              <div className="px-12 py-8 text-center lg:w-1/2">
                <h6 className="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl">
                  106.5K
                </h6>
                <p className="text-center md:text-base mt-3">
                  Thousand dollar donate to charity organization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStates;