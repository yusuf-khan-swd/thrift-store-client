import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';

const ReportedItems = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reports", {
        headers: {
          authorization: `bearer ${localStorage.getItem("thrift-token")}`
        }
      });
      const data = await res.json();
      return data;
    }
  })

  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log(reports)

  return (
    <div>
      <h2>Reported Items</h2>
    </div>
  );
};

export default ReportedItems;