import "./DeckThumbnail.css";
import deckImg1 from "../../assets/imgs/card-imgs/1.jpg";
import deckImg2 from "../../assets/imgs/card-imgs/2.jpg";
import deckImg3 from "../../assets/imgs/card-imgs/3.jpg";
import deckImg4 from "../../assets/imgs/card-imgs/4.jpg";
import deckImg5 from "../../assets/imgs/card-imgs/5.jpg";
import deckImg6 from "../../assets/imgs/card-imgs/6.jpg";
import deckImg7 from "../../assets/imgs/card-imgs/7.jpg";
import deckImg8 from "../../assets/imgs/card-imgs/8.jpg";
import deckImg9 from "../../assets/imgs/card-imgs/9.jpg";
import deckImg10 from "../../assets/imgs/card-imgs/10.jpg";
import deckImg11 from "../../assets/imgs/card-imgs/11.jpg";
import deckImg12 from "../../assets/imgs/card-imgs/12.jpg";
import deckImg13 from "../../assets/imgs/card-imgs/13.jpg";
import deckImg14 from "../../assets/imgs/card-imgs/14.jpg";
import deckImg15 from "../../assets/imgs/card-imgs/15.jpg";
import deckImg16 from "../../assets/imgs/card-imgs/16.jpg";
import deckImg17 from "../../assets/imgs/card-imgs/17.jpg";
import deckImg18 from "../../assets/imgs/card-imgs/18.jpg";
import deckImg19 from "../../assets/imgs/card-imgs/19.jpg";
import deckImg20 from "../../assets/imgs/card-imgs/20.jpg";
import deckImg21 from "../../assets/imgs/card-imgs/21.jpg";

export const DeckThumbnail = ({ deckname, deckdescription, deckcolors, decktags, popUser }) => {
  const imgArray = [
    deckImg1,
    deckImg2,
    deckImg3,
    deckImg4,
    deckImg5,
    deckImg6,
    deckImg7,
    deckImg8,
    deckImg9,
    deckImg10,
    deckImg11,
    deckImg12,
    deckImg13,
    deckImg14,
    deckImg15,
    deckImg16,
    deckImg17,
    deckImg18,
    deckImg19,
    deckImg20,
    deckImg21,
  ];
  const rndImg = imgArray[Math.floor(Math.random() * imgArray.length)];

  console.log(popUser);

  return (
    <div className="deck-thumbnail" style={{ "--background-img": `url(${rndImg})` }}>
      <div className="deck-details">
        <div className="thumb-deck-name">{deckname}</div>
        <div className="thumb-deck-info">{deckdescription} </div>
        <div className="thumb-deck-colors">{deckcolors}</div>
        <div className="thumb-deck-tags">{decktags} </div>
      </div>
    </div>
  );
};
