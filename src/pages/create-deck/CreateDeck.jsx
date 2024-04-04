import { useState } from "react";
import "./CreateDeck.css";
import logoimg from "../../assets/imgs/moon_black.png";

export const CreateDeck = () => {
  const [deck, setDeck] = useState({
    cards: "",
    user: "",
    coverImage: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeck((prevDeck) => ({
      ...prevDeck,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeck({
      cards: "",
      user: "",
      coverImage: "",
    });
  };

  return (
    <div className="outside-div">
      <div className="logo">
        <img src={logoimg} alt="logoimg" />
      </div>
      <div className="creation-text">
        <h1> Deck Creation </h1>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="con">
          <div className="input-data">
            Name:
            <input className="input-data1" type="text" placeholder="Name of the Card" name="cards" value={deck.cards} onChange={handleChange} />
          </div>
        </div>
        <div>
          <button type="submit" className="btn">
            {" "}
            Create Deck{" "}
          </button>
        </div>
      </form>
    </div>
  );
};
