import "./DeckContainer.css";

import { DeckThumbnail } from "../../components/deck-thumbnail/DeckThumbnail.jsx";

export const HomeDeckContainer = () => {
  return (
    <div className="deck-area">
      <DeckThumbnail deckImg="7" />
      <DeckThumbnail deckImg="2" />
      <DeckThumbnail deckImg="3" />
      <DeckThumbnail deckImg="4" />
      <DeckThumbnail deckImg="5" />
      <DeckThumbnail deckImg="6" />
      {/* <DeckThumbnail deckImg="7" /> */}
    </div>
  );
};
