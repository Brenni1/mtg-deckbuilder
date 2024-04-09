import "./DeckCreator.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import userImg from "../../assets/imgs/user.png";
import userWhiteImg from "../../assets/imgs/user_white.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import deckImg4 from "../../assets/imgs/card-imgs/4.jpg";

import cardsJson from "../../assets/120cards.json";

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

  useEffect(() => {
    const getdeckInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5005/user/deck/${id}`);
        const parsedRes = await res.json();
        setDeckInfo(parsedRes);
        console.log("this is the Deck", parsedRes);
      } catch (err) {
        console.log(err);
      }
    };

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

  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm) => {
    //fetching from api

    console.log("searchTerm:", searchTerm);
  };

  //END ----------Search Bar Logic------------END//

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
          <button className="btn" onClick={handleUpdate}>
            Update Deck
          </button>
        </div>
        <div className="deck-stats">Deck Stats</div>
      </div>

      <div className="deck-control">
        <div className="deck-control-inputs">
          <div className="search-inner">
            <input className="search-bar" type="text" value={value} onChange={onChange} placeholder="Search for Cards..." />
            <button className="btn" onClick={() => onSearch(value)}>
              Search
            </button>
          </div>
          <div className="search-dropdown">
            {cardsJson
              .filter((card) => {
                console.log(card.name);
                const searchTerm = value.toLowerCase();
                const cardName = card.name.toLowerCase();

                return searchTerm && cardName.startsWith(searchTerm);
              })
              .map((card) => (
                <div className="dropdown-row" onClick="{}" key={card._id}>
                  {card.name}
                </div>
              ))}
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
        <div>1 CardName X</div>
        <div>1 CardName Y</div>
        <div>1 CardName Z</div>
        <div>1 CardName X</div>
        <div>1 CardName Y</div>
        <div>1 CardName Z</div>
        <div>1 CardName X</div>
        <div>1 CardName Y</div>
        <div>1 CardName Z</div>
      </div>
    </div>
  );
};
