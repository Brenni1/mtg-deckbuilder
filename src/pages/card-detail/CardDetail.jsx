import "./CardDetail.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
export const CardDetail = (props) => {
  const [card, setCard] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const previousUrl = location.state;
  const nav = useNavigate();

  console.log("previousUrl", previousUrl);
  // getting information about a specific Card from the Backend
  const getcard = async () => {
    try {
      const res = await fetch(`${API_URL}/user/card/${id}`);
      const parsedRes = await res.json();
      setCard(parsedRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getcard();
  }, []);

  useEffect(() => {
    if (card) {
      console.log("This is your Card:", card);
    }
  }, []);

  if (!card) {
    return <p>Loading...</p>;
  }
  return (
    <div className="card-detail-page" style={{ "--background-img": `url(${card.image_uris.art_crop})` }}>
      <img src={card.image_uris.normal} alt="card" />
      <div className="card-detail-info-container">
        <div className="card-detail-info">
          <div>
            <div>Name: </div>
            <div>{card.name}</div>
          </div>
          <div>
            <div>CMC: </div>
            <div>{card.cmc}</div>
          </div>
          <div>
            <div>Mana Cost: </div>
            <div>{card.mana_cost}</div>
          </div>
          <div>
            <div>Color Identity: </div>
            <div>{card.color_identity}</div>
          </div>
          <div>
            <div>Edhrec Rank: </div>
            <div>{card.edhrec_rank}</div>
          </div>
          <div>
            <div>Price (€): </div>
            <div>{card.prices.eur}</div>
          </div>
        </div>
        <div>
          <Link to={card.scryfall_uri}>
            <button className="btn">Card on Scryfall</button>
          </Link>
          <button className="btn" onClick={() => nav(previousUrl)}>
            <i className="fa-solid fa-arrow-left" />
            Back to Deck
          </button>
        </div>
      </div>
    </div>
  );
};

// const manaCost = "{1}{G}{G}";

// // Count the number of green symbols (G) in the mana cost
// const greenSymbolCount = (manaCost.match(/{G}/g) || []).length;

// // Extract the number from the mana cost
// const number = parseInt(manaCost.match(/\d+/)[0]);

// // Display the number and green symbols
// console.log("Number: " + number);
// console.log("Green Symbols: " + "🟢".repeat(greenSymbolCount));
