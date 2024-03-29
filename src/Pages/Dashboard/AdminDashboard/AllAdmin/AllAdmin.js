import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../../Shared/Loading/Loading";
import Spinner from "../../../Shared/Spinner/Spinner";

const AllAdmin = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [deleteItem, setDeleteItem] = useState(false);
  const [closeModal, setCloseModal] = useState(true);

  const {
    data: admins,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://thrift-store-server.vercel.app/all-admins",
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
        `https://thrift-store-server.vercel.app/all-admins/${deleteItem._id}`,
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
            toast.success("Admin deleted successfully.");
            refetch();
          }
          setIsDataLoading(false);
        })
        .catch((error) => {
          console.log("Delete admin error: ", error);
          setIsDataLoading(true);
        });
    }
  }, [deleteItem, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!admins.length) {
    return (
      <div className="h-screen flex justify-center items-center lg:items-start lg:mt-8">
        <h2 className="text-5xl font-bold">
          Total <span className="text-teal-500">0</span> Admin.
        </h2>
      </div>
    );
  }

  const handleConfirmation = (item) => {
    setCloseModal(false);
    setSelectedItem(item);
  };

  return (
    <div>
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold uppercase cursor-pointer text-teal-400 underline">
          Total Admin - {admins.length}
        </h2>
      </div>
      <div className="h-8">{isDataLoading && <Spinner />}</div>
      <div className="overflow-x-auto m-2 lg:m-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admins, index) => (
              <tr key={admins._id}>
                <th>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</th>
                <td>{admins.userName}</td>
                <td>{admins.userEmail}</td>
                <td>
                  <label
                    htmlFor="confirmation-modal"
                    onClick={() => handleConfirmation(admins)}
                    className="btn btn-error btn-outline btn-xs text-gray-600 font-bold mr-4"
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
          message={`If delete admin ${selectedItem?.userName} it can't be undone.`}
          setDeleteItem={setDeleteItem}
          selectedItem={selectedItem}
          setCloseModal={setCloseModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllAdmin;
