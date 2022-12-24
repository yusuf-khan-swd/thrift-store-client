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
      const res = await fetch("https://thrift-store-server.vercel.app/categories");
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

          fetch(`https://thrift-store-server.vercel.app/users?email=${user.email}`)
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

              fetch("https://thrift-store-server.vercel.app/seller-product", {
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
                    setIsAdding(false);
                    reset();
                    navigate("/dashboard/my-products");
                  }
                })
                .catch(error => {
                  console.log("product post error: ", error);
                  toast.error(error.message);
                  isAdding(false);
                })

            })
            .catch(error => {
              console.log("Users error: ", error);
              toast.error(error.message);
              isAdding(false);
            })
        }
      })
      .catch(error => {
        console.log("Image hosting error: ", error);
        toast.error(error.message);
        isAdding(false);
      })
  };

  return (
    <div className="container mx-auto p-3 my-8 md:my-0 md:mt-2">
      <div className="card mx-auto bg-white">
        <div className="card-body border rounded-md pt-2">
          <h2 className="card-title justify-center cursor-pointer font-bold">
            Product Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Product Name*</span>
                </label>
                <input
                  {...register("productName", {
                    required: "Product name is required",
                  })}
                  type="text"
                  className="input input-bordered w-full"
                />
                <p className="text-red-500">{errors.productName?.message}</p>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Resale Price* </span>
                </label>
                <input
                  {...register("resalePrice", {
                    required: "Resale price is required",
                  })}
                  type="number"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                />
                <p className="text-red-500">{errors.resalePrice?.message}</p>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Original Price*</span>
                </label>
                <input
                  {...register("originalPrice", {
                    required: "Original price is required",
                  })}
                  type="number"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                />
                <p className="text-red-500 mt-2">{errors.originalPrice?.message}</p>
              </div>
              <div className="form-control w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Month of Use*</span>
                  </label>
                  <input
                    {...register("monthsUsed", {
                      required: "Months of use is required",
                    })}
                    type="number"
                    min="0"
                    className="input input-bordered w-full"
                  />
                  <p className="text-red-500 mt-2">{errors.monthsUsed?.message}</p>
                </div>
              </div>
              <div className="form-control w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Condition Type*</span>
                  </label>
                  <select
                    {...register("conditionType", {
                      required: "Condition type is required",
                    })}
                    className="select select-bordered w-full"
                  >
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                  <p className="text-red-500 mt-2">{errors.conditionType?.message}</p>
                </div>
              </div>
              <div className="form-control w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">
                      Product Category
                      *</span>
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
                  <p className="text-red-500 mt-2">
                    {errors.productCategory?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Image*</span>
                </label>
                <input
                  {...register("image", { required: "Image is required" })}
                  type="file"
                  className="file-input file-input-bordered w-full"
                  disabled={isAdding}
                />
                <p className="text-red-500">{errors.image?.message}</p>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Location*</span>
                </label>
                <input
                  {...register("location", { required: "Location is required" })}
                  type="text"
                  className="input input-bordered w-full"
                />
                <p className="text-red-500">{errors.location?.message}</p>
              </div>
              <div className="form-control w-full">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Mobile Number*</span>
                  </label>
                  <input
                    {...register("sellerNumber", {
                      required: "Seller mobile number is required",
                    })}
                    type="number"
                    className="input input-bordered w-full"
                  />
                  <p className="text-red-500 mt-2">{errors.sellerNumber?.message}</p>
                </div>
              </div>
            </div>
            <div className="form-control w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Description*</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Please short your message under 500 character",
                    },
                    minLength: {
                      value: 10,
                      message: "Please write something about your product at least 10 character"
                    }
                  })}
                  className="textarea textarea-bordered"
                  rows="2"
                ></textarea>
                <p className="text-red-500 mt-2">{errors.description?.message}</p>
              </div>
            </div>
            <div className="form-control w-full mt-2">
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
