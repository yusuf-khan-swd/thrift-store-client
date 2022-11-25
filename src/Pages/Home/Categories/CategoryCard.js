import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { name, image, _id } = category;
  return (
    <div className='m-2'>
      <div className="card card-compact w-full bg-base-100 shadow-xl border">
        <figure><img src={image} className="w-full h-80" alt={name} /></figure>
        <div className="card-body">
          <Link to={`/category/${_id}`}><h2 className="card-title uppercase justify-center">{name}</h2></Link>
          <div className="card-actions justify-center">
            <Link to={`/category/${_id}`}><button className="btn btn-primary btn-sm">Details</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;