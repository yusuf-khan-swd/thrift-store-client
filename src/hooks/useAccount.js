import { useEffect, useState } from "react";

const useAccount = (email) => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/accountType?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('thrift-token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data?.result) {
            setUserType(data.result.userType)
          }
        })
    }
  }, [email])

  return [userType];
};

export default useAccount;