import "./HomeDeckContainer.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { DeckThumbnail } from "../../components/deck-thumbnail/DeckThumbnail.jsx";

export const HomeDeckContainer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="deck-area" data-theme={theme}>
      <DeckThumbnail />
      <DeckThumbnail />
      <DeckThumbnail />
      <DeckThumbnail />
      <DeckThumbnail />
      <DeckThumbnail />
    </div>
  );
};
