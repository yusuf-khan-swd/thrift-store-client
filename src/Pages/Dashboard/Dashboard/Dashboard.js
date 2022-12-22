import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useAccount from '../../../hooks/useAccount';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [userType, isAccountLoading] = useAccount(user.email);

  if (isAccountLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='container mx-auto'>
      <div className='mt-12 mb-24 m-2 w-11/12 mx-auto'>
        <div className='card shadow-lg bg-white border w-full pb-6'>
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
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Account Type</span>
                </label>
                <input type="text" defaultValue={userType} disabled className="input input-bordered w-full" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;