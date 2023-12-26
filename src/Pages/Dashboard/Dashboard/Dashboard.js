import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useAccount from "../../../hooks/useAccount";
import Loading from "../../Shared/Loading/Loading";
import Spinner from "../../Shared/Spinner/Spinner";

const Dashboard = () => {
  const { user, deleteAccount, logOut } = useContext(AuthContext);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const userEmail = user.email;
  const [userType, isAccountLoading] = useAccount(user.email);

  if (isAccountLoading) {
    return <Loading />;
  }

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "Are sure you want to delete your account!"
    );

    if (!confirmation) {
      return;
    }

    handleDeleteAccountFromFirebase();
  };

  const handleDeleteAccountFromFirebase = () => {
    setIsDataLoading(true);
    deleteAccount(user)
      .then(() => {
        handleDeleteAccountFromDB();
      })
      .catch((error) => {
        console.log("Account delete Error: ", error);
        setIsDataLoading(false);

        logOut()
          .then(() => {
            toast.success("Please login again to delete your account.");
          })
          .catch((error) => {
            console.log("logout error: ", error);
          });
      });
  };

  const handleDeleteAccountFromDB = async () => {
    const res = await fetch(
      `https://thrift-store-server.vercel.app/users?email=${userEmail}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`,
        },
      }
    );

    const data = await res.json();
    setIsDataLoading(false);
    if (data?.deletedCount) {
      toast.success("User Deleted successfully");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8 mb-24 m-2 w-11/12 mx-auto">
        <div className="h-8 flex justify-center items-center mt-2">
          {isDataLoading && <Spinner></Spinner>}
        </div>
        <div className="card shadow-lg bg-white border w-full">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl cursor-pointer">
              Profile
            </h2>
            <form>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={user.email}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Account Type</span>
                </label>
                <input
                  type="text"
                  defaultValue={userType}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
            </form>
            <div className="form-control mt-5">
              <button
                onClick={() => handleDeleteAccount()}
                className="btn btn-error mx-auto btn-sm"
                disabled={isDataLoading}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
