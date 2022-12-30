import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import CategoryName from "../../Shared/CategoryName/CategoryName";
import Loading from "../../Shared/Loading/Loading";
import Advertised from "../Advertised/Advertised";
import Banner from "../Banner/Banner";
import OurStates from "../OurStats/OurStates";

const Home = () => {
  const { data: advertisedItems, isLoading, refetch } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await axios.get(
        "https://thrift-store-server.vercel.app/advertised"
      );
      const data = await res.data;
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <div className="mb-24 mt-5">
        <h2 className='text-3xl font-bold text-center capitalize mb-5'>
          <Link to="/categories" title="Categories">Categories</Link>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 m-2">
          <CategoryName listStyle={'m-1'} linkStyle={'btn btn-primary w-full text-white rounded-lg'}></CategoryName>
        </ul>
      </div>
      {advertisedItems.length !== 0 && (
        <Advertised advertisedItems={advertisedItems} refetch={refetch}></Advertised>
      )}
      <OurStates></OurStates>
    </div>
  );
};

export default Home;
