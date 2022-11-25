import React from 'react';

const CategoryCard = ({ category }) => {
  const { name, image } = category;

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src={image} className="w-full h-80" alt={name} /></figure>
        <div className="card-body">
          <h2 className="card-title uppercase">{name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;