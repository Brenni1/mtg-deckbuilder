import "./MyDecks.css";
import { ThemeContext } from "../../context/theme.context.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { DeckListItem } from "../../components/deck-list-item/DeckListItem.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";
export const MyDecks = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [decks, setDecks] = useState([]);
  const deckId = user.decks;
  const theToken = localStorage.getItem("authToken");

  console.log("This is the User", user);

  useEffect(() => {
    const getDecks = async () => {
      try {
        const deckIds = user.decks;
        const fetchedDecks = [];
        for (const deckId of deckIds) {
          const res = await fetch(`http://localhost:5005/user/deck/${deckId}`, {
            headers: {
              authorization: `Bearer ${theToken}`,
            },
          });

          const deckData = await res.json();
          fetchedDecks.push(deckData);
        }
        setDecks(fetchedDecks);
      } catch (err) {
        console.log(err);
      }
    };

    getDecks();
  }, []);

  console.log("Userlog from MyDecks", user);
  console.log("Decklog from MyDecks", decks);

  const handleDelete = async (deckToDelete) => {
    try {
      await fetch(`http://localhost:5005/user/deck/${deckId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      });
      const updatedUser = await axios.put(`http://localhost:5005/user/${user._id}`, { $pull: { decks: deckId } });
      console.log("This is the updated User", updatedUser.data.updatedUser);
      setDecks(decks.filter((deck) => deck._id !== deckToDelete));
      console.log("deletfunctionlog", decks);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("This is the Decks, logged before return after all DB interaction", decks);
  return (
    <div className="my-decks">
      <img className="sign-logo-img" src={theme === "dark" ? dragonWhiteImg : dragonImg} alt="logo" style={{ width: "10rem" }} />
      <div>{user.name}&apos;s Decks</div>

      <table className="deck-items">
        <thead>
          <tr>
            <th>Name</th>
            <th className="non-mobile">Format</th>
            <th className="non-mobile">Colors</th>
            <th>Date</th>
            <th>
              <i className="fa-solid fa-xmark" />
            </th>
          </tr>
        </thead>
        <tbody>
          {decks.length > 0 ? (
            decks.map((deck) => (
              <tr key={deck._id}>
                <td className="list-deck-title">
                  <Link to={`/deck/${deck._id}`}>{deck.decktitle}</Link>
                </td>
                <td className="non-mobile">{deck.deckformat}</td>
                <td className="non-mobile">{deck.deckcolors}</td>
                <td>{deck.createdAt}</td>
                <td className="delete-icon" onClick={handleDelete}>
                  <i className="fa-solid fa-trash" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>no Decks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
