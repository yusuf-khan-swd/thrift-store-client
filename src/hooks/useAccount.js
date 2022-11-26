import { useEffect, useState } from "react";

const useAccount = (email) => {
  const [userType, setUserType] = useState("");
  const [isAccountLoading, setIsAccountLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/userType?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('thrift-token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data?.result) {
            setUserType(data.result.userType);
            setIsAccountLoading(false);
          }
        })
    }
  }, [email])

  return [userType, isAccountLoading];
};

export default useAccount;