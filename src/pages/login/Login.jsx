import "./Login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const userToLogin = { email, password };
    try {
      const response = await axios.post("http://localhost:5005/auth/login", userToLogin);
      console.log("you logged in", response.data);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();
      nav("/");
    } catch (err) {
      console.log("there was an error logging in", err.response.data);
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
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
