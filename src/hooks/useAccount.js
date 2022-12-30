import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

const useAccount = (email) => {
  const { logOut } = useContext(AuthContext);

  const [userType, setUserType] = useState("");
  const [isAccountLoading, setIsAccountLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`https://thrift-store-server.vercel.app/usersType?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('thrift-token')}`
        }
      })
        .then(res => {
          if (res.status > 399) {
            return logOut()
              .then(() => {
                toast.success("Please login again.");
              })
              .catch(error => {
                console.log("logout error: ", error)
              })
          }
          return res.json();
        })
        .then(data => {
          if (data?.result) {
            setUserType(data.result.userType);
            setIsAccountLoading(false);
          }
        })
    }
  }, [email, logOut])

  return [userType, isAccountLoading];
};

export default useAccount;