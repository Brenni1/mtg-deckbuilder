import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

// eslint-disable-next-line react/prop-types
export const IsProtected = ({ children }) => {
  const nav = useNavigate();
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  console.log("Are we logged in?", isLoggedIn);
  if (isLoading) {
    console.log("loading");
    return <p>Loading....</p>;
  }
  if (!isLoggedIn) {
    console.log("logged in false");
    nav("/login");
  }
  return children;
};
