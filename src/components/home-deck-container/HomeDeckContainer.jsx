import "./HomeDeckContainer.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";

export const HomeDeckContainer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="deck-area" data-theme={theme}>
      <div>Deck 1</div>
      <div>Deck 2</div>
      <div>Deck 3</div>
      <div>Deck 4</div>
      <div>Deck 5</div>
      <div>Deck 6</div>
    </div>
  );
};
