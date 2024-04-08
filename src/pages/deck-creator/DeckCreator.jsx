import "./DeckCreator.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import userImg from "../../assets/imgs/user.png";
import userWhiteImg from "../../assets/imgs/user_white.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import deckImg1 from "../../assets/imgs/card-imgs/1.jpg";
import deckImg2 from "../../assets/imgs/card-imgs/2.jpg";
import deckImg3 from "../../assets/imgs/card-imgs/3.jpg";
import deckImg4 from "../../assets/imgs/card-imgs/4.jpg";
import deckImg5 from "../../assets/imgs/card-imgs/5.jpg";
import deckImg6 from "../../assets/imgs/card-imgs/6.jpg";
import deckImg7 from "../../assets/imgs/card-imgs/7.jpg";

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

  if (!deckInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="deck-creator">
      <div className="deck-info" style={{ "--background-img": `url(${deckImg4})` }}>
        <div className="deck-title">
          <h1>Title of Deck</h1>
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
          <form>
            <label>
              <input className="search-bar" type="text" placeholder="Search for Cards..." />
            </label>
          </form>

          <form>
            <label>
              <input className="search-bar" type="text" placeholder="Filter Cards..." />
            </label>
          </form>
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
