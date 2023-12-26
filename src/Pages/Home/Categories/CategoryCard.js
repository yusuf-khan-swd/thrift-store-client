import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { categoryName, categoryImage, description, _id } = category;
  return (
    <div className="m-2">
      <div className="card card-compact bg-base-100 shadow-xl border h-96">
        <figure>
          <img src={categoryImage} className="w-full h-72" alt={categoryName} />
        </figure>
        <div className="card-body">
          <Link to={`/category/${_id}`}>
            <h2 className="font-semibold text-lg text-center text-ellipsis overflow-hidden">
              Categories of{" "}
              <span className="capitalize text-primary font-bold">
                {categoryName}
              </span>
            </h2>
          </Link>
          <p className="text-ellipsis overflow-hidden mb-1 text-center">
            {description}
          </p>
          <div className="card-actions justify-center">
            <Link
              className="btn btn-primary w-full text-white text-ellipsis overflow-hidden"
              to={`/category/${_id}`}
            >
              Show Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
