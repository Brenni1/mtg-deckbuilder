import "./DeckCreator.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";

import userWhiteImg from "../../assets/imgs/user_white.png";

import deckImg1 from "../../assets/imgs/card-imgs/1.jpg";
import deckImg2 from "../../assets/imgs/card-imgs/2.jpg";
import deckImg3 from "../../assets/imgs/card-imgs/3.jpg";
import deckImg4 from "../../assets/imgs/card-imgs/4.jpg";
import deckImg5 from "../../assets/imgs/card-imgs/5.jpg";
import deckImg6 from "../../assets/imgs/card-imgs/6.jpg";
import deckImg7 from "../../assets/imgs/card-imgs/7.jpg";

export const DeckCreator = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="deck-creator" data-theme={theme}>
      <div className="deck-info" style={{ "--background-img": `url(${deckImg4})` }}>
        <div className="deck-name">
          <h1>Title of Deck</h1>
        </div>
        <div className="deck-user-container">
          <div className="deck-user-img">
            <img src={userWhiteImg} alt="user-img" />
          </div>
          <div>userName</div>
        </div>
        <div className="deck-tags">Deck Tags</div>
        <div className="deck-desc">Deck Description</div>
        <div className="deck-stats">Deck Stats</div>
      </div>
      <div className="deck-control">
        <div>
          <form>
            <label>
              Search for Card <input type="text" />
            </label>
          </form>

          <form>
            <label>
              Filter Cards <input type="text" />
            </label>
          </form>
        </div>
        <div>
          <div>Download</div>
          <div>
            <i className="fa-regular fa-cart-shopping" />
            Buy Deck
          </div>
        </div>
      </div>
      <div className="deck-cards">
        <div>DeckCards</div>
      </div>
    </div>
  );
};
