import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import googleLogo from '../../assets/google.png';
import useToken from '../../hooks/useToken';

const Login = () => {
  const { userLogin, googleLogin, logOut } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // if (token) {
  //   navigate(from, { replace: true });
  // }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const { email, password } = data;
    setLoginError("");

    userLogin(email, password)
      .then(result => {
        const user = result.user;
        toast.success(`Successfully Login.`);
        setLoginUserEmail(user.email);
      })
      .catch(error => {
        console.log("Login error: ", error);
        setLoginError(error.message);
      })
  };

  const handleGoogleLogin = () => {
    setLoginError("");

    googleLogin()
      .then(result => {
        const user = result.user;

        fetch(`http://localhost:5000/users?email=${user.email}`)
          .then(res => res.json())
          .then(data => {

            if (data?.result?.userEmail) {
              setLoginUserEmail(user.email);
              toast.success("Successfully login with google.");
            }
            else {
              toast.error("Please Register First");
              logOut()
                .then(() => {
                  navigate("/register");
                })
                .catch(error => {
                  console.log("logout error: ", error);
                  setLoginError(error.message);
                })
            }
          })

        setLoginError("");
      })
      .catch(error => {
        console.log("Google Error: ", error);
        setLoginError(error.message);
      })
  };

  return (
    <div className='container mx-auto p-3 my-16'>
      {
        token &&
        <Navigate to={`${from}`}></Navigate>
      }
      <div className='card max-w-sm mx-auto bg-white'>
        <div className='card-body border rounded-md'>
          <h2 className='card-title justify-center text-2xl cursor-pointer'>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className='text-red-500 mt-2'> {loginError} </p>
            <div className='form-control w-full mt-5'>
              <button className='btn' type={'submit'}>Login</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className='form-control w-full'>
            <button onClick={handleGoogleLogin} className='btn'>
              <img src={googleLogo} className="w-9 mr-3" alt="" />
              Login
            </button>
          </div>
        </div>
      </div>
      <p className='text-center mt-2'>New to thrift store? Please <Link to="/register" className='text-blue-600'>register</Link> </p>
    </div>);
};

export default Login;