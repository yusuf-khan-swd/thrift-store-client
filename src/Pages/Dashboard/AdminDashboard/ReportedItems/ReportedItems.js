import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ReportedItems = () => {
  const { } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products")
    }
  })
  return (
    <div>
      <h2>Reported Items</h2>
    </div>
  );
};

export default ReportedItems;