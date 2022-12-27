import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  useEffect(() => {
    console.log(email);
    if (email) {
      setIsTokenLoading(true);
      fetch(`https://thrift-store-server.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem("thrift-token", data.token);
            setToken(data.token);
            setIsTokenLoading(false);
          }
        })
    }
  }, [email]);

  return [token, isTokenLoading]
};

export default useToken;