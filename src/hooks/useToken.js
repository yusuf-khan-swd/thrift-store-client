import { useEffect } from "react";

const useToken = (email) => {
  useEffect(() => {
    fetch(`http://localhost:5000/jwt?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("thrift-token", data.token);
        }
      })
  }, [email]);
};

export default useToken;