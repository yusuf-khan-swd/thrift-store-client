import React from 'react';

const Loading = ({ style }) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${style ? style : 'h-screen'}`}>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
    </div>
  );
};

export default Loading;