import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import googleLogo from '../../assets/google.png';

const Register = () => {
  const { createUser, updateUserInfo, googleLogin } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    const { email, password, confirm, name, accountType } = data;

    if (password !== confirm) {
      return toast.error("Password didn't matched.");
    }

    createUser(email, password)
      .then(result => {
        const user = result.user;
        reset();

        const userInfo = {
          userName: name,
          userEmail: user.email,
          userType: accountType
        };

        fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
          .then(res => res.json())
          .then(data => {
            if (data.acknowledged) {
              toast.success(`Registration was successful`);
            }
          })

        handleUpdateUserInfo(name);
        setRegisterError("");
      })
      .catch(error => {
        console.log("Register error: ", error);
        setRegisterError(error.message);
      })
  };

  const handleUpdateUserInfo = (name) => {
    const profile = {
      displayName: name
    }

    updateUserInfo(profile)
      .then(() => {
        setRegisterError("");
      })
      .catch((error) => {
        console.log("Update profile error: ", error);
        setRegisterError(error.message)
      })
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        const user = result.user;

        const userInfo = {
          userName: user.displayName,
          userEmail: user.email,
          userType: 'buyer'
        };

        fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
          .then(res => res.json())
          .then(data => {
            if (data.acknowledged) {
              toast.success("Successfully register with google.");
            }
          })
        setRegisterError("");
      })
      .catch(error => {
        console.log("Google Error: ", error);
        setRegisterError(error.message);
      })
  };

  return (
    <div className='container mx-auto p-3'>
      <div className='card max-w-lg mx-auto'>
        <div className='card-body border rounded-md'>
          <h2 className='card-title justify-center text-2xl underline underline-offset-2 cursor-pointer'>Create an Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input {...register('name', { required: "Name is required" })} type="text" className="input input-bordered w-full" required />
              <p className='text-red-500'>{errors.name?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input {...register('email', { required: "Email is required" })} type="email" className="input input-bordered w-full" required />
              <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input {...register('password', { required: "Password is required" })} type="password" className="input input-bordered w-full" required />
              <p className='text-red-500'>{errors.password?.message}</p>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <input {...register('confirm', { required: "Confirm password is required" })} type="password" className="input input-bordered w-full" required />
              <p className='text-red-500'>{errors.confirm?.message}</p>
            </div>
            <div className='form-control w-full'>
              <label className="label">
                <span className="label-text font-medium">Account Type</span>
              </label>
              <select {...register('accountType')} className="select select-bordered w-full">
                <option value={`buyer`}>Buyer</option>
                <option value={`seller`}>Seller</option>
              </select>
            </div>
            <p className='text-red-500 mt-2'> {registerError} </p>
            <div className='form-control w-full mt-5'>
              <button className='btn' type={'submit'}>Register</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className='form-control w-full'>
            <button onClick={handleGoogleLogin} className='btn'>
              <img src={googleLogo} className="w-9 mr-3" alt="" />
              Google Register
            </button>
          </div>
        </div>
      </div>
      <p className='text-center mt-2'>Already have an account? Please <Link to="/login" className='text-blue-600'>Login</Link> </p>
    </div>
  );
};

export default Register;