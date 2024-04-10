import "./CreateDeck.css";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/theme.context.jsx";

import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
export const CreateDeck = () => {
  const [decktitle, setDeckTitle] = useState("");
  const [decktags, setDeckTags] = useState("StandardTag");
  const [deckdescription, setDeckDescription] = useState("StandardDescription");
  const [deckstats, setDeckStats] = useState("StandardStats");
  const [deckformat, setDeckFormat] = useState("Commander / EDH");
  const [deckcolors, setDeckColors] = useState("WUBRG");
  const [err, setErr] = useState(null);
  // const { authenticateUser } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const nav = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleCreateDeck = async (e) => {
    e.preventDefault();

    const deckToCreate = { decktitle, decktags, deckdescription, deckstats, deckformat, deckcolors, user };

    try {
      // Create the deck
      const deckResponse = await axios.post("${API_URL}/user/deck", deckToCreate);
      const deckId = deckResponse.data._id;
      console.log("This is the deckId", deckId);

      // Update the UserModel with the deckId
      const updatedUser = await axios.put(`${API_URL}/user/${user._id}`, { $push: { decks: deckId } });
      console.log("This is the updated User", updatedUser.data.updatedUser);
      setUser(updatedUser.data.updatedUser);
      console.log("you created a Deck", deckId);
      nav(`/deck/${deckId}`);
    } catch (err) {
      console.log("there was an error creating the Deck", deckToCreate, err.response.data);
      setErr(err.response.data.error);
    }
  };

  return (
    <div className="sign-page">
      <img className="sign-logo-img" src={theme === "dark" ? dragonWhiteImg : dragonImg} alt="" />

      <h2> Deck Creation </h2>

      <form onSubmit={handleCreateDeck}>
        <label>
          <div>Name:</div>
          <input
            className="sign-input"
            type="text"
            placeholder="Name of the Deck"
            name="deck"
            value={decktitle}
            onChange={(e) => {
              setDeckTitle(e.target.value);
            }}
          />
        </label>
        <label>
          <div>Format:</div>
          <div>Commander / EDH</div>
        </label>

        <button type="submit" className="btn">
          Create Deck
        </button>
      </form>
      {err ? <h4 className="error-message">{err}</h4> : null}
    </div>
  );
};
