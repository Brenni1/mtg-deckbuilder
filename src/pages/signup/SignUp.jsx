import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const nav = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const userToCreate = { name, email, password };
    try {
      const response = await axios.post("http://localhost:5005/auth/register", userToCreate);
      console.log("you created a user", response.data);
      nav("/login");
    } catch (err) {
      console.log("there was an error signing up", userToCreate, err.response.data);
      setError(err.response.data.error);
    }
  };
  return (
    <div className="sign-page">
      <img className="sign-logo-img" src={theme === "dark" ? dragonWhiteImg : dragonImg} alt="" />
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          <div>User Name:</div>
          <input
            className="sign-input"
            type="text"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
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

        <button className="btn">Sign Up</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
};
