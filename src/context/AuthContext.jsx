import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//This is creating the context
const AuthContext = createContext();

//This is the wrapper that will wrap our <App/>
// eslint-disable-next-line react/prop-types
const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
  //this function checks if there is a token and if so, if it is valid
  const authenticateUser = async () => {
    //check the localStorage for the token
    const theToken = localStorage.getItem("authToken");
    if (theToken) {
      try {
        //this is if there is a token then we need to verify it
        const response = await axios.get(`${API_URL}/auth/verify`, {
          headers: {
            authorization: `Bearer ${theToken}`,
          },
        });
        console.log("response.data: from AuthContext.jsx", response.data);
        setUser(response.data);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("there was an error authenticating the user", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        nav("/");
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
    //if there is a token then valid it with the /verify route
    //if no token then set states to null and isLoggedIn to false
  };
  //every time the application mounts, we try to authenticate the user
  useEffect(() => {
    authenticateUser();
  }, []);

  //logout function
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    await authenticateUser();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//make sure to export both the wrapper and the context
export { AuthContext, AuthWrapper };
