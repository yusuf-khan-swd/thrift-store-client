import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Register = () => {
  const { createUser, updateUserInfo } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const { email, password, name } = data;

    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast.success(`Registration was successful`);
        handleUpdateUserInfo(name);
      })
      .catch(err => {
        console.log("Register error: ", err);
      })

  };

  const handleUpdateUserInfo = (name) => {
    const profile = {
      displayName: name
    }

    updateUserInfo(profile)
      .then(() => {
      })
      .catch((error) => {
        console.log("Update profile error: ", error);
      })
  };

  return (
    <div className='container mx-auto p-3'>
      <div className='card max-w-lg mx-auto'>
        <div className='card-body border rounded-md'>
          <h2 className='font-bold card-title'>Create an account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input {...register('name', { required: "Name is required" })} type="text" className="input input-bordered w-full" />
              <p className='text-red-500'>{errors.name?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input {...register('email', { required: "Email is required" })} type="email" className="input input-bordered w-full" />
              <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input {...register('password', { required: "Email is required" })} type="password" className="input input-bordered w-full" />
              <p className='text-red-500'>{errors.password?.message}</p>
            </div>
            <div className='form-control w-full mt-5'>
              <button className='btn' type={'submit'}>Register</button>
            </div>
          </form>
        </div>
      </div>
      <p className='text-center mt-2'>Already have an account? Please <Link to="/login" className='text-blue-600'>Login</Link> </p>
    </div>
  );
};

export default Register;