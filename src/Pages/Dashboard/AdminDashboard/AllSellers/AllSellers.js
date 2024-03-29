import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";
import Spinner from "../../../Shared/Spinner/Spinner";

const AllSellers = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [deleteItem, setDeleteItem] = useState(false);
  const [closeModal, setCloseModal] = useState(true);

  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://thrift-store-server.vercel.app/all-sellers",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("thrift-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (deleteItem) {
      setIsDataLoading(true);
      fetch(
        `https://thrift-store-server.vercel.app/all-sellers/${deleteItem._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("thrift-token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("User deleted successfully.");
            refetch();
            setIsDataLoading(false);
          }
        });
    }
  }, [deleteItem, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!sellers.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">
          Total <span className="text-teal-500">0</span> register seller.
        </h2>
      </div>
    );
  }

  const handleVerifySeller = (id, verified, email) => {
    setIsDataLoading(true);
    fetch(
      `https://thrift-store-server.vercel.app/all-sellers/${id}?email=${email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("thrift-token")}`,
        },
        body: JSON.stringify({ verified }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(
            `${verified ? "Seller verification remove" : "Seller is verified"}`
          );
          refetch();
          setIsDataLoading(false);
        }
      });
  };

  const handleMakeAdmin = (id, userName) => {
    const isConfirm = window.confirm(
      `Are you sure you want to make ${userName} admin?`
    );

    if (!isConfirm) {
      return;
    }

    setIsDataLoading(true);
    fetch(`https://thrift-store-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("thrift-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Successfully added user as admin.");
        }
        refetch();
        setIsDataLoading(false);
      })
      .catch((error) => {
        setIsDataLoading(false);
        console.log("make admin error: ", error);
      });
  };

  const handleConfirmation = (item) => {
    setCloseModal(false);
    setSelectedItem(item);
  };

  return (
    <div>
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold uppercase cursor-pointer text-teal-400 underline">
          Total Seller - {sellers.length}
        </h2>
      </div>
      <div className="h-8">{isDataLoading && <Spinner />}</div>
      <div className="overflow-x-auto m-2 lg:m-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Verify</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id}>
                <th>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</th>
                <td>{seller.userName}</td>
                <td>{seller.userEmail}</td>
                <td>
                  <button
                    onClick={() =>
                      handleVerifySeller(
                        seller._id,
                        seller.userIsVerified,
                        seller.userEmail
                      )
                    }
                    className={`btn btn-xs font-bold ${
                      seller.userIsVerified
                        ? "btn-success"
                        : "btn-primary text-white"
                    }`}
                    disabled={isDataLoading}
                  >
                    {seller.userIsVerified ? "Remove Verification" : "Verify"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(seller._id, seller.userName)}
                    className="btn btn-xs btn-info mr-2"
                    disabled={isDataLoading}
                  >
                    Make Admin
                  </button>
                  <label
                    htmlFor="confirmation-modal"
                    onClick={() => handleConfirmation(seller)}
                    className="btn btn-error btn-outline btn-xs font-bold mr-4"
                    disabled={isDataLoading}
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!closeModal && (
        <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`If delete Seller ${selectedItem?.userName} it can't be undone.`}
          setDeleteItem={setDeleteItem}
          selectedItem={selectedItem}
          setCloseModal={setCloseModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSellers;
