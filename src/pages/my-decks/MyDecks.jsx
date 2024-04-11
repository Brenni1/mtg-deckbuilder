import "./MyDecks.css";
import { ThemeContext } from "../../context/theme.context.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
export const MyDecks = () => {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);
  const [decks, setDecks] = useState([]);
  const theToken = localStorage.getItem("authToken");

  // getting Details about all the Decks of a User
  const getDecks = async () => {
    try {
      const deckIds = user.decks;
      // checking if the User has any Decks
      if (deckIds.length === 0) {
        console.log("No deckIds found");
        return;
      }
      const fetchedDecks = [];
      // if the User has Decks, we are using a for of loop to send a request for each one to get the Details
      for (const deckId of deckIds) {
        const res = await fetch(`${API_URL}/user/deck/${deckId}`, {
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

  // running the getDecks on mount
  useEffect(() => {
    getDecks();
  }, []);

  console.log("deckslog", decks);
  console.log("userlog", user);

  // handling Deckdeletion
  const handleDelete = async (deckToDelete) => {
    try {
      await fetch(`${API_URL}/user/deck/${deckToDelete}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      });

      setDecks(decks.filter((deck) => deck._id !== deckToDelete));
      // removing the DeckId from the User
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
