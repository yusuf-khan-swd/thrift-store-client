import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ product }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { productName, productPrice, buyerName, buyerEmail, _id, productId } = product;

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
      // console.log('[Payment method]', paymentMethod)
    }

    setIsDataLoading(true);

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
      setIsDataLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price: productPrice,
        transactionId: paymentIntent.id,
        email: buyerEmail,
        orderId: _id,
        productId
      };

      fetch("http://localhost:5000/payments", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem("thrift-token")}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {

          if (data.acknowledged) {
            toast.success("Payment Done");
            setSuccess("Congrats!! Your payment completed.");
            setTransactionId(paymentIntent.id);
            setIsDataLoading(false);
            setCardError(false);
            navigate("/dashboard/my-orders")
          }
        })
        .catch(error => {
          console.log("payment error: ", error);
          setCardError(error.message);
          setIsDataLoading(false);
        })

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
            <button className='btn btn-sm btn-primary mt-3' type="submit" disabled={!stripe || !clientSecret || isDataLoading}>
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