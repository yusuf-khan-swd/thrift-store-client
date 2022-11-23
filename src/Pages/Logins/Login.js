import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold'>Login</h2>
      <p>
        New to Thrift Store ? <Link to="/register" className='text-blue-400'>Please create a account.</Link>
      </p>
    </div>
  );
};

export default Login;