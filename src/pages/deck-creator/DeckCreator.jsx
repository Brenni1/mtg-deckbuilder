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

  const getdeckInfo = async () => {
    try {
      const res = await fetch(`http://localhost:5005/user/deck/${id}`);
      const parsedRes = await res.json();
      setDeckInfo(parsedRes);
      setCardsInDeck(parsedRes.cards);
      console.log("This is your Deck:", parsedRes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getdeckInfo();
  }, [id]);

  useEffect(() => {
    if (deckInfo) {
      loadData();
    }
  }, []);

  const loadData = () => {
    setDeckInfo((prevDeckInfo) => ({
      ...prevDeckInfo,
      decktitle: deckInfo.decktitle,
      decktags: deckInfo.decktags,
      deckdescription: deckInfo.deckdescription,
      deckstats: deckInfo.deckstats,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5005/user/deck/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(deckInfo),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleChange = (e) => {
    setDeckInfo({
      ...deckInfo,
      [e.target.name]: e.target.value,
    });
  };

  //-------------Search Bar Logic----------------//

  const [searchValue, setSearchValue] = useState("");
  const [allSearchedCards, setAllSearchedCards] = useState(null);

  const findCard = async (search) => {
    try {
      const res = await axios.get(
        `http://localhost:5005/user/card/search?q=${search}`
      );
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
    // setCardsInDeck([...cardsInDeck, newCardId]);
    setCardsInDeck([...cardsInDeck, newCard]);

    console.log("newCard", newCard);
    console.log("newCardName:", newCard.name);
    console.log("cards in deck:", cardsInDeck);
  };

  //END ----------Search Bar Logic------------END//

  if (!deckInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="deck-creator">
      <div
        className="deck-info"
        style={{ "--background-img": `url(${deckImg4})` }}
      >
        <div className="deck-title">
          <h1>{deckInfo.decktitle}</h1>
        </div>
        <div className="deck-user-container">
          <Link to="/user">
            <div className="deck-user-img">
              <img
                className="user-img"
                src={theme === "dark" ? userWhiteImg : userImg}
                alt=""
              />
            </div>
          </Link>
          <div>{user ? user.name : "no user found"}</div>
        </div>
        <div className="deck-tags">Deck Tags</div>
        <div className="deck-desc">
          <textarea
            name="deckdescription"
            value={deckInfo.deckdescription}
            onChange={handleChange}
          />
          <button className="btn" onClick={handleUpdate}>
            Update Deck
          </button>
        </div>
        <div className="deck-stats">Deck Stats</div>
      </div>

      <div className="deck-control">
        <div className="deck-control-inputs">
          <div>
            <input
              className="search-bar"
              type="text"
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search for Cards..."
            />
          </div>
          <div
            className={`search-dropdown ${!searchValue ? "borderless" : ""}`}
          >
            {!allSearchedCards ? (
              searchValue ? (
                <div className="dropdown-row">...loading</div>
              ) : null
            ) : (
              allSearchedCards
                .filter((card) => {
                  const searchTerm = searchValue.toLowerCase();
                  const cardName = card.name.toLowerCase();

                  return (
                    searchTerm && cardName.startsWith(searchTerm)
                    // && cardName !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((card) => (
                  <div
                    className="dropdown-row"
                    onClick={() => addCard(card)}
                    key={card._id}
                  >
                    {card.name}
                  </div>
                ))
            )}
          </div>
        </div>
        <div className="deck-control-actions">
          <Link to="/deck/xyz">
            <div>
              <i className="fa-solid fa-download" />
              <div>Download</div>
            </div>
          </Link>
          <Link to="/deck/xyz">
            <div>
              <i className="fa-solid fa-cart-shopping" />
              <div>Buy Deck</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="deck-cards">
        {cardsInDeck
          ? cardsInDeck.map((card) => (
              <div className="deck-card" key={card.id}>
                <div>- {card.name}</div>
                <div>cmc: {card.cmc}</div>
                <div>colors: {card.colors}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
