import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const BookModal = ({ setOpenModal, productBooked }) => {
  const { user } = useContext(AuthContext);

  const [bookError, setBookError] = useState("");
  const { productName, resalePrice } = productBooked;

  const handleBookProduct = (event) => {
    event.preventDefault();

    console.log('btn click');
  };

  return (
    <div>
      <input type="checkbox" id="book-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2 className='card-title justify-center text-2xl cursor-pointer mb-8'>Please fill up the form.</h2>
          <div className='card max-w-sm mx-auto bg-white'>
            <div className='card-body border rounded-md'>
              <form onSubmit={handleBookProduct}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Your Name</span>
                  </label>
                  <input type="text" defaultValue={user.displayName} disabled className="input input-bordered w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Your Email</span>
                  </label>
                  <input type="email" defaultValue={user.email} disabled className="input input-bordered w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Product name</span>
                  </label>
                  <input type="text" defaultValue={productName} disabled className="input input-bordered w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Product Price</span>
                  </label>
                  <input type="text" defaultValue={resalePrice} disabled className="input input-bordered w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Your Phone Number</span>
                  </label>
                  <input type="text" className="input input-bordered w-full" required />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Meting Location</span>
                  </label>
                  <input type="text" className="input input-bordered w-full" required />
                </div>
                <p className='text-red-500 mt-2'> {bookError} </p>
                <div className='form-control w-full mt-5'>
                  <button className='btn' type={'submit'}>Login</button>
                  <label htmlFor="book-modal" type={'submit'} className="btn">Submit</label>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <button onClick={() => setOpenModal(false)} className='btn btn-secondary'>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;