import "./DeckCreator.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import userImg from "../../assets/imgs/user.png";
import userWhiteImg from "../../assets/imgs/user_white.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import deckImg4 from "../../assets/imgs/card-imgs/4.jpg";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
export const DeckCreator = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [deckInfo, setDeckInfo] = useState({
    decktitle: "",
    decktags: "",
    deckdescription: "",
    deckstats: "",
  });
  const [cardsInDeck, setCardsInDeck] = useState(null);

  // getting the Info about the Cards in the Deck from the DB
  const getdeckInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/user/deck/${id}`);
      const parsedRes = await res.json();
      setDeckInfo(parsedRes);
      setCardsInDeck(parsedRes.cards);
      console.log("This is your Deck:", parsedRes);
    } catch (err) {
      console.log(err);
    }
  };

  // updateFunction to save changes in the DB
  const handleUpdateCards = async () => {
    try {
      const cardIds = cardsInDeck.map((card) => card._id);
      const combinedData = {
        ...deckInfo,
        cards: cardIds,
      };
      const res = await fetch(`${API_URL}/user/deck/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });
      const data = await res.json();
      console.log("Updated Deck", data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    getdeckInfo();
  }, [id]);

  // autosave Feature //
  useEffect(() => {
    if (cardsInDeck) {
      handleUpdateCards();
    }
  }, [cardsInDeck]);

  // autosave Feature //

  //handling Changes to the genereal DeckInfo
  const handleChange = (e) => {
    setDeckInfo({
      ...deckInfo,
      [e.target.name]: e.target.value,
    });
  };

  // deleting the clicked on card by creating a new array without it
  const handleDeleteCard = (index) => {
    setCardsInDeck((prevCards) => prevCards.filter((current, i) => i !== index));
  };

  //-------------Search Bar Logic----------------//

  const [searchValue, setSearchValue] = useState("");
  const [allSearchedCards, setAllSearchedCards] = useState(null);

  const findCard = async (search) => {
    try {
      const res = await axios.get(`${API_URL}/user/card/search?q=${search}`);
      setAllSearchedCards(res.data);
      console.log("Search results:", res.data);
    } catch (error) {
      console.log("Error searching:", error);
    }
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (searchValue.length > 1) {
      findCard(searchValue);
    }
  };

  const addCard = (newCard) => {
    setSearchValue("");
    console.log("newCard", newCard);
    console.log("newCardName:", newCard.name);
    setCardsInDeck([...cardsInDeck, newCard]);
  };

  useEffect(() => {
    console.log("cards in deck:", cardsInDeck);
  }, [cardsInDeck]);

  //END ----------Search Bar Logic------------END//

  const [cardView, setCardView] = useState("text");

  //switching from text to imgview of the Card
  const handleView = (e) => {
    setCardView(e.target.value);
  };

  //safetycheck to prevent Errors
  if (!deckInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="deck-creator">
      <div className="deck-info" style={{ "--background-img": `url(${deckImg4})` }}>
        <div className="deck-title">
          <h1>{deckInfo.decktitle}</h1>
        </div>
        <div className="deck-user-container">
          <Link to="/user">
            <div className="deck-user-img">
              <img className="user-img" src={theme === "dark" ? userWhiteImg : userImg} alt="" />
            </div>
          </Link>
          <div>{user ? user.name : "no user found"}</div>
        </div>
        <div className="deck-tags">Deck Tags</div>
        <div className="deck-desc">
          <textarea name="deckdescription" value={deckInfo.deckdescription} onChange={handleChange} />
          <button className="btn" onClick={handleUpdateCards}>
            Update Deck
          </button>
        </div>
        <div className="deck-stats">Deck Stats</div>
      </div>

      <div className="deck-control">
        <div className="deck-control-inputs">
          <div className="card-search-bar-container">
            <label>
              <i className="fa-solid fa-plus" /> <div>Add Card</div>
            </label>
            <input className="search-bar" type="text" value={searchValue} onChange={onSearchChange} placeholder="Search for Cards..." />
            <div className={`search-dropdown ${!searchValue ? "borderless" : ""}`}>
              {!allSearchedCards ? (
                searchValue ? (
                  <div className="dropdown-row">...loading</div>
                ) : null
              ) : (
                allSearchedCards
                  .filter((card) => {
                    const searchTerm = searchValue.toLowerCase();
                    const cardName = card.name.toLowerCase();

                    return searchTerm && cardName.startsWith(searchTerm);
                  })
                  .slice(0, 10)
                  .map((card) => (
                    <div className="dropdown-row" onClick={() => addCard(card)} key={card._id}>
                      {card.name}
                    </div>
                  ))
              )}
            </div>
          </div>
          <div className="cards-view-container">
            <label>
              <i className="fa-solid fa-eye" /> <div>View</div>
            </label>
            <select className="view-select" name="cards-view" id="cards-view" onChange={handleView} value={cardView}>
              <option value="text">Text</option>
              <option value="images">Images</option>
            </select>
          </div>
        </div>
        <div className="deck-control-actions">
          <Link to="">
            <div>
              <i className="fa-solid fa-download" />
              <div>Download</div>
            </div>
          </Link>
          <Link to="">
            <div>
              <i className="fa-solid fa-cart-shopping" />
              <div>Buy Deck</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="deck-cards-container">
        <div className="deck-all-cards">
          {cardsInDeck
            ? cardsInDeck.map((card, index) =>
                cardView === "text" ? (
                  <div className="deck-card text" key={card.id}>
                    <Link to={`/card/${card._id}`}>- {card.name}</Link>
                    <div>mana cost: {card.mana_cost}</div>

                    <div className="delete-icon" onClick={() => handleDeleteCard(index)}>
                      <i className="fa-solid fa-trash" />
                    </div>
                  </div>
                ) : (
                  <Link className="deck-card card-img" to={`/card/${card._id}`} key={card.id}>
                    <img src={card.image_uris.normal} alt="card" />
                    <div className="card-hover-box" />
                  </Link>
                )
              )
            : null}
        </div>
        <div className="deck-creature-cards">
          <div className="deck-card-category">Creature</div>
          {cardsInDeck
            ? cardsInDeck.map((card, index) =>
                card.type_line.toLowerCase().includes("creature") ? (
                  cardView === "text" ? (
                    <div className="deck-card text" key={card.id}>
                      <Link to={`/card/${card._id}`}>- {card.name}</Link>
                      <div>mana cost: {card.mana_cost}</div>

                      <div className="delete-icon" onClick={() => handleDeleteCard(index)}>
                        <i className="fa-solid fa-trash" />
                      </div>
                    </div>
                  ) : (
                    <Link className="deck-card card-img" to={`/card/${card._id}`} key={card.id}>
                      <img src={card.image_uris.normal} alt="card" />
                      <div className="card-hover-box" />
                    </Link>
                  )
                ) : null
              )
            : null}
        </div>
        <div className="deck-sorcery-cards">
          <div className="deck-card-category">Sorcery</div>
          {cardsInDeck
            ? cardsInDeck.map((card, index) =>
                card.type_line.toLowerCase().includes("sorcery") ? (
                  cardView === "text" ? (
                    <div className="deck-card text" key={card.id}>
                      <Link to={`/card/${card._id}`}>- {card.name}</Link>
                      <div>mana cost: {card.mana_cost}</div>

                      <div className="delete-icon" onClick={() => handleDeleteCard(index)}>
                        <i className="fa-solid fa-trash" />
                      </div>
                    </div>
                  ) : (
                    <Link className="deck-card card-img" to={`/card/${card._id}`} key={card.id}>
                      <img src={card.image_uris.normal} alt="card" />
                      <div className="card-hover-box" />
                    </Link>
                  )
                ) : null
              )
            : null}
        </div>
        <div className="deck-artifact-cards">
          <div className="deck-card-category">Artifact</div>
          {cardsInDeck
            ? cardsInDeck.map((card, index) =>
                card.type_line.toLowerCase().includes("artifact") ? (
                  cardView === "text" ? (
                    <div className="deck-card text" key={card.id}>
                      <Link to={`/card/${card._id}`}>- {card.name}</Link>
                      <div>mana cost: {card.mana_cost}</div>

                      <div className="delete-icon" onClick={() => handleDeleteCard(index)}>
                        <i className="fa-solid fa-trash" />
                      </div>
                    </div>
                  ) : (
                    <Link className="deck-card card-img" to={`/card/${card._id}`} key={card.id}>
                      <img src={card.image_uris.normal} alt="card" />
                      <div className="card-hover-box" />
                    </Link>
                  )
                ) : null
              )
            : null}
        </div>
        <div className="deck-land-cards">
          <div className="deck-card-category">Land</div>
          {cardsInDeck
            ? cardsInDeck.map((card, index) =>
                card.type_line.toLowerCase().includes("land") ? (
                  cardView === "text" ? (
                    <div className="deck-card text" key={card.id}>
                      <Link to={`/card/${card._id}`}>- {card.name}</Link>
                      <div>mana cost: {card.mana_cost}</div>

                      <div className="delete-icon" onClick={() => handleDeleteCard(index)}>
                        <i className="fa-solid fa-trash" />
                      </div>
                    </div>
                  ) : (
                    <Link className="deck-card card-img" to={`/card/${card._id}`} key={card.id}>
                      <img src={card.image_uris.normal} alt="card" />
                      <div className="card-hover-box" />
                    </Link>
                  )
                ) : null
              )
            : null}
        </div>
      </div>
    </div>
  );
};
