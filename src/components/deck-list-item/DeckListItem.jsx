import "./DeckListItem.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
const theToken = localStorage.getItem("authToken");
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export const DeckListItem = ({ title, format, colors, date }) => {
  const { user } = useContext(AuthContext);
  const [decks, setDecks] = useState("");
  const deckId = user.decks;
  console.log("Userlog from the DeckListItemComponent", user);
  const handleDelete = async (deckToDelete) => {
    try {
      await fetch(`${API_URL}/user/deck/${deckId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      });

      // Update the UserModel with the deckId
      const updatedUser = await axios.put(`${API_URL}/user/${user._id}`, { $pull: { decks: deckId } });
      console.log("This is the updated User", updatedUser.data.updatedUser);

      setDecks(decks.filter((deck) => deck._id !== deckToDelete));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td className="list-deck-title">{title}</td>
      <td className="non-mobile">{format}</td>
      <td className="non-mobile">{colors}</td>
      <td>{date}</td>
      <td className="delete-icon" onClick={handleDelete}>
        <i className="fa-solid fa-trash" />
      </td>
    </tr>
  );
};
