import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex flex-col h-screen justify-center items-center md:block'>
      <div className='card w-96 max-w-sm shadow-lg bg-white md:mt-16 md:ml-16'>
        <div className='card-body'>
          <h2 className='card-title justify-center text-2xl cursor-pointer'>Profile</h2>
          <form>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input type="text" defaultValue={user.displayName} disabled className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input type="text" defaultValue={user.email} disabled className="input input-bordered w-full" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;