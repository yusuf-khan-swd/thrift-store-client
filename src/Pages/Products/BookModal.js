import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const BookModal = ({ setOpenModal, productBooked }) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [bookError, setBookError] = useState("");
  const { productName, resalePrice, image, _id, sellerEmail } = productBooked;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    setIsDataLoading(true);
    const order = {
      ...value,
      productImage: image,
      productId: _id,
      buyerName: user.displayName,
      buyerEmail: user.email,
      productName: productName,
      productPrice: resalePrice,
      sellerEmail: sellerEmail
    };


    fetch("http://localhost:5000/orders", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success("Product book confirm.");
          setOpenModal(false);
          setIsDataLoading(false);
        }
      })
      .catch(error => {
        setBookError(error.message);
        setIsDataLoading(false);
      })

  };

  return (
    <div>
      <input type="checkbox" id="book-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor="book-modal" className="btn btn-sm btn-circle">
            X
          </label>
          {
            !user?.uid ?
              <h2 className="mt-8 font-bold text-3xl">Please <Link to="/login" className="hover:link text-secondary">login</Link> </h2>
              :
              <>
                <h2 className="card-title justify-center text-2xl cursor-pointer mb-8">
                  Please fill up the form.
                </h2>
                <div className="card max-w-sm mx-auto bg-white">
                  <div className="card-body border rounded-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium">Your Name</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user.displayName}
                          disabled
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium">Your Email</span>
                        </label>
                        <input

                          type="email"
                          defaultValue={user.email}
                          disabled
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium">Product name</span>
                        </label>
                        <input

                          type="text"
                          defaultValue={productName}
                          disabled
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium">
                            Product Price
                          </span>
                        </label>
                        <input

                          type="text"
                          defaultValue={resalePrice}
                          disabled
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium">
                            Your Phone Number
                          </span>
                        </label>
                        <input
                          {...register("buyerNumber", {
                            required: "Phone Number is required",
                          })}
                          type="text"
                          className="input input-bordered w-full"
                        />
                        <p className="text-red-500">{errors.buyerNumber?.message}</p>
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium">
                            Meting Location
                          </span>
                        </label>
                        <input
                          {...register("metingLocation", {
                            required: "Meting Location required",
                          })}
                          type="text"
                          className="input input-bordered w-full"
                        />
                        <p className="text-red-500">
                          {errors.metingLocation?.message}
                        </p>
                      </div>
                      <p className="text-red-500 mt-2"> {bookError} </p>
                      <div className="form-control w-full mt-5">
                        <button type={"submit"} className="btn btn-secondary" disabled={isDataLoading}>
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>

          }
          <div className="modal-action">
            <label htmlFor="book-modal" className="btn btn-sm">
              Leave
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
