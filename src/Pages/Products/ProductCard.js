import React from 'react';

const ProductCard = ({ product }) => {
  const { productName, image, } = product;
  return (
    <div className='m-2'>
      <div className="card card-side bg-base-100 shadow-xl border">
        <div>
          <figure><img src={image} className="w-1/2 " alt={productName} /></figure>
        </div>
        <div className="card-body">
          <h2 className="card-title uppercase justify-center">{productName}</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;