import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';

const CategoryName = ({ listStyle, linkStyle }) => {

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://thrift-store-server.vercel.app/categories');
      const data = await res.data;
      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <>
      {
        categories.map(category => <li className={listStyle} key={category._id}> <NavLink className={`${linkStyle} overflow-hidden text-ellipsis`} to={`/category/${category._id}`}>{category.categoryName}</NavLink> </li>)
      }
    </>
  );
};

export default CategoryName;