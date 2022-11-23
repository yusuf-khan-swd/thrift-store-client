import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Create an account</h2>
      <p>
        Already hav an account ? Please <Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default Register;