import "./DeckContainer.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { DeckThumbnail } from "../../components/deck-thumbnail/DeckThumbnail.jsx";

export const HomeDeckContainer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="deck-area" data-theme={theme}>
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
