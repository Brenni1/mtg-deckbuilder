import "./MyDecks.css";
import { ThemeContext } from "../../context/theme.context.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";
export const MyDecks = () => {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);
  const [decks, setDecks] = useState([]);
  const theToken = localStorage.getItem("authToken");

  const getDecks = async () => {
    try {
      const deckIds = user.decks;
      if (deckIds.length === 0) {
        console.log("No deckIds found");
        return;
      }
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

  useEffect(() => {
    getDecks();
  }, [user.decks]);

  console.log("deckslog", decks);
  console.log("userlog", user);

  const handleDelete = async (deckToDelete) => {
    try {
      await fetch(`http://localhost:5005/user/deck/${deckToDelete}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      });

      setDecks(decks.filter((deck) => deck._id !== deckToDelete));

      const updatedDecks = user.decks.filter((deck) => deck !== deckToDelete);
      setUser({ ...user, decks: updatedDecks });
    } catch (err) {
      console.log(err);
    }
  };

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
            decks
              .filter((deck) => deck !== null)
              .map((deck) => (
                <tr key={deck._id}>
                  <td className="list-deck-title">
                    <Link to={`/deck/${deck._id}`}>{deck.decktitle}</Link>
                  </td>
                  <td className="non-mobile">{deck.deckformat}</td>
                  <td className="non-mobile">{deck.deckcolors}</td>
                  <td>{deck.createdAt}</td>
                  <td className="delete-icon" onClick={() => handleDelete(deck._id)}>
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
