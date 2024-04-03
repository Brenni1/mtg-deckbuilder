import { useState } from "react";

function CreateDeck({ onCreate }) {
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
    onCreate(deck);
    setDeck({
      cards: "",
      user: "",
      coverImage: "",
    });
  };

  return (
    <div>
      <div className="logo">
        <img src="imgpath" alt="logoimg" />
      </div>
      <h1> Deck Creation </h1>
      <form onSubmit={handleSubmit}>
        <div className="Name-text"> Name: </div>
        <input type="text" placeholder="Name of the Card" name="cards" value={deck.cards} onChange={handleChange} />
        <button type="submit"> Create Deck </button>
      </form>
    </div>
  );
}

export default CreateDeck;
