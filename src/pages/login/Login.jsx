import "./Login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/theme.context.jsx";
import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";

import { useLocation } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authenticateUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const nav = useNavigate();
  const location = useLocation();
  const previousUrl = location.state;

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  const handleLogin = async (event) => {
    event.preventDefault();
    const userToLogin = { email, password };
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userToLogin);
      console.log("you logged in successfully");

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      nav(previousUrl ? previousUrl : "/");
    } catch (err) {
      console.log("there was an error logging in", err.response.data);
      setError(err.response.data.errorMessage);
    }
  };

  return (
    <div className="sign-page">
      <img className="sign-logo-img" src={theme === "dark" ? dragonWhiteImg : dragonImg} alt="logo" />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          <div>Email:</div>
          <input
            className="sign-input"
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          <div>Password:</div>
          <input
            className="sign-input"
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button className="btn">Login</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
};
