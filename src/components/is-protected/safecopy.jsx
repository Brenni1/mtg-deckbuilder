import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export const IsProtected = ({ children }) => {
  const nav = useNavigate();
  const { isLoading, isLoggedIn, user } = useContext(AuthContext);
  const location = useLocation();

  console.log("Logged in:", isLoggedIn);

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
      return <p>Loading....</p>;
    }

    if (!isLoggedIn) {
      console.log("Not logged in!");
      nav("/login", { state: location.pathname });
    }
  }, [isLoading]);

  return children;
};
