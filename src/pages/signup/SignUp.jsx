import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const nav = useNavigate();
  //this is the onSubmit function
  const handleSignup = async (event) => {
    event.preventDefault();

    //this is where we create the form data and add all the properties to it
    const myFormData = new FormData();
    // const image = event.target.image.files[0];
    // myFormData.append("imageUrl", image);
    myFormData.append("name", name);
    myFormData.append("email", email);
    myFormData.append("password", password);

    // const userToCreate = { name, email, password };
    try {
      const response = await axios.post("http://localhost:5005/auth/register", myFormData);
      console.log("you created a user", response.data);
      //only if you create the new user, then you navigate to the login page
      nav("/");
    } catch (err) {
      console.log("there was an error signing up", myFormData, err.response.data.errorMessage);
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div>
      <h2>Sign up with us</h2>
      <form onSubmit={handleSignup}>
        <label>
          User Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
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
        {/* <label>
          Profile Image:
          <input type="file" name="image" />
        </label> */}
        <button className="btn">Sign Up</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
};
