import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

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