import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch(
        `https://thrift-store-server.vercel.app/orders/${id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("thrift-token")}`,
          },
        }
      );

      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutForm product={product}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
