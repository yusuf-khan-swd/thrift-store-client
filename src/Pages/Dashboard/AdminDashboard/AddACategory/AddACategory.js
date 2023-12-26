import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import Spinner from "../../../Shared/Spinner/Spinner";

const AddACategory = () => {
  const { user } = useContext(AuthContext);

  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbbKey;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const image = data.categoryImage[0];
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
          const category = {
            ...data,
            categoryImage: imageData.data.url,
            adminName: user.displayName,
            adminEmail: user.email,
          };

          fetch("https://thrift-store-server.vercel.app/categories", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("thrift-token")}`,
            },
            body: JSON.stringify(category),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success(
                  `Successfully added ${category.categoryName} to categories`
                );
                reset();
                setIsAdding(false);
                navigate("/dashboard/all-categories");
              }
            });
        }
      });
  };

  return (
    <div className="container mx-auto px-3">
      <div className="h-8 mt-4">{isAdding && <Spinner />}</div>
      <div className="card max-w-lg mx-auto bg-white mb-12">
        <div className="card-body border rounded-md">
          <h2 className="card-title justify-center text-2xl cursor-pointer">
            Category
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Category Name</span>
              </label>
              <input
                {...register("categoryName", {
                  required: "Category is required",
                })}
                type="text"
                className="input input-bordered w-full"
              />
              <p className="text-red-500">{errors.categoryName?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Image</span>
              </label>
              <input
                disabled={isAdding}
                {...register("categoryImage", {
                  required: "Image is required",
                })}
                type="file"
                className="file-input file-input-bordered file-input-sm w-full"
              />
              <p className="text-red-500">{errors.categoryImage?.message}</p>
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
                      value: 220,
                      message: "Please short your message under 220 character",
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Please write something about category at least 10 character",
                    },
                  })}
                  className="textarea textarea-bordered"
                  rows="3"
                ></textarea>
                <p className="text-red-500 mt-2">
                  {errors.description?.message}
                </p>
              </div>
            </div>
            <div className="form-control w-full mt-5">
              <button className="btn" type={"submit"} disabled={isAdding}>
                Add to Categories
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddACategory;
