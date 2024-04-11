import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

export const IsProtected = ({ children }) => {
  const nav = useNavigate();
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // checking if the User is loggedIn

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
      return;
    }

    if (!isLoggedIn) {
      console.log("Not logged in!");
      nav("/login", { state: location.pathname });
    } else {
      setIsAuthChecked(true);
    }
  }, [isLoading, isLoggedIn, nav, location.pathname]); // rechecking every time when one of the dependencies changes

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return children;
};
