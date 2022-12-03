import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { categoryName, categoryImage, description, _id } = category;
  return (
    <div className='m-2'>
      <div className="card card-compact bg-base-100 shadow-xl border h-96">
        <figure><img src={categoryImage} className="w-full h-72" alt={categoryName} /></figure>
        <div className="card-body">
          <Link to={`/category/${_id}`}><h2 className="uppercase font-semibold text-lg text-center text-ellipsis overflow-hidden">Categories of {categoryName}</h2></Link>
          <p>{description}</p>
          <div className="card-actions justify-center">
            <Link className='btn btn-primary w-full truncate' to={`/category/${_id}`}>Show Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;