import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddACategory = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbbKey;

  const onSubmit = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imageData => {
        if (imageData.success) {

          const category = {
            category: data.category,
            image: imageData.data.url
          }

          fetch('http://localhost:5000/categories', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(category)
          })
            .then(res => res.json())
            .then(data => {
              if (data.acknowledged) {
                toast.success(`Successfully added ${category.category} to categories`);
                reset();
              }
            })
        }
      })

  };

  return (
    <div className='container mx-auto p-3'>
      <div className='card max-w-xs mx-auto'>
        <div className='card-body border rounded-md'>
          <h2 className='card-title justify-center text-2xl cursor-pointer'>Category</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Category Name</span>
              </label>
              <input {...register('category', { required: "Category is required" })} type="text" className="input input-bordered w-full" required />
              <p className='text-red-500'>{errors.category?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Image</span>
              </label>
              <input {...register('image', { required: "Image is required" })} type="file" className="file-input file-input-bordered file-input-sm w-full" required />
              <p className='text-red-500'>{errors.image?.message}</p>
            </div>
            <div className='form-control w-full mt-5'>
              <button className='btn' type={'submit'}>Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>);
}

export default AddACategory;