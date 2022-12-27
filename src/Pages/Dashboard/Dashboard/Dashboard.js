import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useAccount from '../../../hooks/useAccount';
import Loading from '../../Shared/Loading/Loading';
import Spinner from '../../Shared/Spinner/Spinner';

const Dashboard = () => {
  const { user, deleteAccount } = useContext(AuthContext);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [userType, isAccountLoading] = useAccount(user.email);

  if (isAccountLoading) {
    return <Loading></Loading>
  }

  const handleDeleteAccount = async () => {

    setIsDataLoading(true);
    const res = await fetch(`https://thrift-store-server.vercel.app/users?email=${user.email}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      }
    });
    const data = await res.json();
    if (data.deletedCount) {
      deleteAccount(user)
        .then(() => {
          toast.success("User Deleted successfully");
        })
        .catch(error => {
          console.log("Account delete Error: ", error);
          setIsDataLoading(false);
        })
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='mt-12 mb-24 m-2 w-11/12 mx-auto'>
        <div className="h-8 flex justify-center items-center mt-2">{isDataLoading && <Spinner></Spinner>}</div>
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
            <div className="form-control">
              <button onClick={() => handleDeleteAccount()} className="btn btn-error" disabled={isDataLoading}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;