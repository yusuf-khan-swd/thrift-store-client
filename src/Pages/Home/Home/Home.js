import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import CategoryName from "../../Shared/CategoryName/CategoryName";
import Loading from "../../Shared/Loading/Loading";
import Advertised from "../Advertised/Advertised";
import Banner from "../Banner/Banner";
import OurStates from "../OurStats/OurStates";

const Home = () => {
  const { data: advertisedItems, isLoading } = useQuery({
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
      <CategoryName></CategoryName>
      {advertisedItems.length !== 0 && (
        <Advertised advertisedItems={advertisedItems}></Advertised>
      )}
      <OurStates></OurStates>
    </div>
  );
};

export default Home;
