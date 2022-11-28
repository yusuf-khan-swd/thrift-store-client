import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const { resalePrice } = product;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      },
      body: JSON.stringify({ resalePrice }) // price will go here
    })
      .then(res => res.json())
      .then(data => () => {
        setClientSecret(data.clientSecret)
      })
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      console.log('[payment error]', error)
    } else {
      console.log('[Payment method]', paymentMethod)
    }


  };

  return (
    <div className='card max-w-md bg-white m-3 mx-auto'>
      <div className='card-body'>
        <form onSubmit={handleSubmit} className="">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button className='btn btn-sm btn-primary mt-3' type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;