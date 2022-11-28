import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ product }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { productName, productPrice, buyerName, buyerEmail } = product;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem("thrift-token")}`
      },
      body: JSON.stringify({ productPrice })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [productPrice]);

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
      console.log('[payment error]', error);
      setCardError(error?.message)
    } else {
      console.log('[Payment method]', paymentMethod)
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: buyerName,
            email: buyerEmail
          },
        },
      },
    );

    setSuccess('');
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSuccess("Congrats!! Your payment completed.");
      setTransactionId(paymentIntent.id);
    }

  };

  return (
    <div>
      <h2 className="text-center my-8 text-3xl font-bold">Payment for <span className='text-secondary'>{productName}</span> which price <span className='text-secondary'>${productPrice}</span> </h2>
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
            <button className='btn btn-sm btn-primary mt-3' type="submit" disabled={!stripe || !clientSecret}>
              Pay
            </button>
          </form>
          <p className='text-red-500 mt-2'> {cardError} </p>
          {
            success &&
            <div>
              <p className='text-green-500'>{success}</p>
              <p className='font-semibold'>Your Transaction Id: {transactionId}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;