import "./DeckThumbnail.css";
import deckImg1 from "../../assets/imgs/card-imgs/1.jpg";
import deckImg2 from "../../assets/imgs/card-imgs/2.jpg";
import deckImg3 from "../../assets/imgs/card-imgs/3.jpg";
import deckImg4 from "../../assets/imgs/card-imgs/4.jpg";
import deckImg5 from "../../assets/imgs/card-imgs/5.jpg";
import deckImg6 from "../../assets/imgs/card-imgs/6.jpg";
import deckImg7 from "../../assets/imgs/card-imgs/7.jpg";

export const DeckThumbnail = ({ deckImg }) => {
  const imgArray = [
    deckImg1,
    deckImg2,
    deckImg3,
    deckImg4,
    deckImg5,
    deckImg6,
    deckImg7,
  ];

  return (
    <div
      className="deck-thumbnail"
      style={{ "--background-img": `url(${imgArray[deckImg - 1]})` }}
    >
      <div className="deck-details">
        <div className="deck-name">Deck Name</div>
        <div className="deck-info">Deck Info </div>
      </div>
    </div>
  );
};
