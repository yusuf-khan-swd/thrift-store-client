import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { categoryName, categoryImage, _id } = category;
  return (
    <div className='m-2'>
      <div className="card card-compact w-full bg-base-100 shadow-xl border">
        <figure><img src={categoryImage} className="w-full h-80" alt={categoryName} /></figure>
        <div className="card-body">
          <Link to={`/category/${_id}`}><h2 className="card-title uppercase justify-center">{categoryName}</h2></Link>
          <div className="card-actions justify-center">
            <Link className='btn btn-primary w-full' to={`/category/${_id}`}>Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;