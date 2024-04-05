import { useContext, useState, useEffect } from "react";
import "./CreateDeck.css";
import logoimg from "../../assets/imgs/moon_black.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const CreateDeck = () => {
  const [deckName, setDeckName] = useState("");
  const [err, setErr] = useState(null);
  // const { authenticateUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  // const [deck, setDeck] = useState({
  //   cards: "",
  //   user: "",
  //   coverImage: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDeck((prevDeck) => ({
  //     ...prevDeck,
  //     [name]: value,
  //   }));
  // };

  const nav = useNavigate();

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  useEffect(() => {
    console.log(user);
  }, []);

  const createDeck = async (e) => {
    e.preventDefault();

    const deckToCreate = { deckName, user };
    try {
      const response = await axios.post("http://localhost:5005/user/deck", deckToCreate);
      console.log("you created a Deck", response.data._id);
      nav(`/deck/${response.data._id}`);
    } catch (err) {
      console.log("there was an error creating the Deck", deckToCreate, err.response.data);
      setErr(err.response.data.error);
    }
  };

  return (
    <div className="outside-div">
      <div className="logo">
        <img src={logoimg} alt="logoimg" />
      </div>
      <div className="creation-text">
        <h1> Deck Creation </h1>
      </div>

      <form onSubmit={createDeck} className="form">
        <div className="con">
          <div className="input-data">
            Name:
            <input
              className="input-data1"
              type="text"
              placeholder="Name of the Deck"
              name="deck"
              value={deckName}
              onChange={(e) => {
                setDeckName(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn">
            {" "}
            Create Deck{" "}
          </button>
        </div>
      </form>
      {err ? <h4 className="error-message">{err}</h4> : null}
    </div>
  );
};
