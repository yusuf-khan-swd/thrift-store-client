import React from 'react';
import { useForm } from 'react-hook-form';

const AddACategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = value => {
    console.log(value);
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