import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const AddAProduct = () => {
  const { user } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const imageHostKey = process.env.REACT_APP_imgbbKey;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    setIsAdding(true);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          setIsAdding(false);

          const category = categories.find(
            (category) => category.categoryName === data.productCategory
          );

          fetch(`http://localhost:5000/user?email=${user.email}`)
            .then((res) => res.json())
            .then((userData) => {
              const userInfo = userData.result;
              const product = {
                ...data,
                image: imageData.data.url,
                time: new Date(),
                sellerName: userInfo.userName,
                sellerEmail: userInfo.userEmail,
                sellerIsVerified: userInfo.userIsVerified,
                categoryId: category._id,
                saleStatus: "available",
                advertised: false,
              };

              fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `bearer ${localStorage.getItem(
                    "thrift-token"
                  )}`,
                },
                body: JSON.stringify(product),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.acknowledged) {
                    toast.success(
                      `Successfully added ${product.productName} to products`
                    );
                    reset();
                    setIsAdding(false);
                    navigate("/dashboard/my-products");
                  }
                });
            });
        }
      });
  };

  return (
    <div className="container mx-auto p-3 my-16">
      <div className="card max-w-lg mx-auto bg-white">
        <div className="card-body border rounded-md">
          <h2 className="card-title justify-center text-2xl cursor-pointer">
            Add a Product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Product Name</span>
              </label>
              <input
                {...register("productName", {
                  required: "Product name is required",
                })}
                type="text"
                className="input input-bordered w-full"
                required
              />
              <p className="text-red-500">{errors.productName?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Image</span>
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                className="file-input file-input-bordered file-input-sm w-full"
                required
              />
              <p className="text-red-500">{errors.image?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                type="text"
                className="input input-bordered w-full"
                required
              />
              <p className="text-red-500">{errors.location?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Resale Price</span>
              </label>
              <input
                {...register("resalePrice", {
                  required: "Resale price is required",
                })}
                type="text"
                className="input input-bordered w-full"
                required
              />
              <p className="text-red-500">{errors.resalePrice?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Original Price</span>
              </label>
              <input
                {...register("originalPrice", {
                  required: "Original price is required",
                })}
                type="text"
                className="input input-bordered w-full"
                required
              />
              <p className="text-red-500">{errors.originalPrice?.message}</p>
            </div>
            <div className="form-control w-full mt-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Month of Use</span>
                </label>
                <input
                  {...register("monthsUsed", {
                    required: "Months of use is required",
                  })}
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
                <p className="text-red-500">{errors.monthsUsed?.message}</p>
              </div>
            </div>
            <div className="form-control w-full mt-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Condition Type</span>
                </label>
                <select
                  {...register("conditionType", {
                    required: "Condition type is required",
                  })}
                  className="select select-bordered w-full  "
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
                <p className="text-red-500">{errors.monthsUsed?.message}</p>
              </div>
            </div>
            <div className="form-control w-full mt-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Mobile Number</span>
                </label>
                <input
                  {...register("sellerNumber", {
                    required: "Seller mobile number is required",
                  })}
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
                <p className="text-red-500">{errors.sellerNumber?.message}</p>
              </div>
            </div>
            <div className="form-control w-full mt-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">
                    Product Category
                  </span>
                </label>
                <select
                  {...register("productCategory", {
                    required: "Condition type is required",
                  })}
                  className="select select-bordered w-full  "
                >
                  {categories.map((category) => (
                    <option key={category._id}>{category.categoryName}</option>
                  ))}
                </select>
                <p className="text-red-500">
                  {errors.productCategory?.message}
                </p>
              </div>
            </div>
            <div className="form-control w-full mt-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 200,
                      message: "Please short your message under 200 character",
                    },
                  })}
                  className="textarea textarea-bordered"
                  rows="5"
                ></textarea>
                <p className="text-red-500">{errors.description?.message}</p>
              </div>
            </div>
            <div className="form-control w-full mt-5">
              <button className="btn" type={"submit"} disabled={isAdding}>
                Add to Products
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAProduct;
