import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddAProduct = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbbKey;

  const onSubmit = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);

    setIsAdding(true);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imageData => {
        if (imageData.success) {

          const product = {
            name: data.name,
            image: imageData.data.url
          }

          console.log(product)
          setIsAdding(false)

          // fetch('http://localhost:5000/categories', {
          //   method: 'POST',
          //   headers: {
          //     'content-type': 'application/json'
          //   },
          //   body: JSON.stringify(category)
          // })
          //   .then(res => res.json())
          //   .then(data => {
          //     if (data.acknowledged) {
          //       toast.success(`Successfully added ${category.category} to categories`);
          //       reset();
          //       setIsAdding(false)
          //     }
          //   })
        }
      })
  };

  return (
    <div className='container mx-auto p-3 my-16'>
      <div className='card max-w-lg mx-auto bg-white'>
        <div className='card-body border rounded-md'>
          <h2 className='card-title justify-center text-2xl cursor-pointer'>Add a Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Product Name</span>
              </label>
              <input {...register('name', { required: "Category is required" })} type="text" className="input input-bordered w-full" required />
              <p className='text-red-500'>{errors.name?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Image</span>
              </label>
              <input {...register('image', { required: "Image is required" })} type="file" className="file-input file-input-bordered file-input-sm w-full" required />
              <p className='text-red-500'>{errors.image?.message}</p>
            </div>
            <div className='form-control w-full mt-5'>
              <button className='btn' type={'submit'} disabled={isAdding}>Add to Products</button>
            </div>
          </form>
        </div>
      </div>
    </div>);
};

export default AddAProduct;