import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

const useAccount = (email) => {
  const { logOut } = useContext(AuthContext);

  const [userType, setUserType] = useState("");
  const [isAccountLoading, setIsAccountLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/usersType?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('thrift-token')}`
        }
      })
        .then(res => {
          if (res.status > 399) {
            return logOut()
              .then(() => {
                toast.error("Please login again");
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