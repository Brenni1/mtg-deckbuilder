import "./DeckContainer.css";
import { DeckThumbnail } from "../../components/deck-thumbnail/DeckThumbnail.jsx";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const HomeDeckContainer = () => {
  const { user, setUser } = useContext(AuthContext);
  const [populatedUser, setPopulatedUser] = useState();
  const theToken = localStorage.getItem("authToken");
  // const [decks, setDecks] = useState([]);

  const populateUser = async () => {
    try {
      const userId = user._id;
      const res = await fetch(`http://localhost:5005/user/populate/${userId}`, {
        headers: {
          authorization: `Bearer ${theToken}`,
        },
      });

      const userData = await res.json();
      setPopulatedUser(userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      populateUser();
    }
  }, [user]);

  console.log("The populated User:", populatedUser);
  // console.log("The populated Usersdecktitle:", populatedUser.decks);
  if (!populatedUser) {
    return <p> loading...</p>;
  }

  return (
    <div className="deck-area">
      {populatedUser &&
        populatedUser.decks.map((deck) => (
          <Link to={`/deck/${deck._id}`} key={deck._id}>
            <DeckThumbnail
              key={deck._id}
              deckdescription={deck.deckdescription}
              deckname={deck.decktitle}
              decktags={deck.decktags}
              deckcolors={deck.deckcolors}
            />
          </Link>
        ))}
      {/* <DeckThumbnail deckImg="7" />
      <DeckThumbnail deckImg="2" />
      <DeckThumbnail deckImg="3" />
      <DeckThumbnail deckImg="4" />
      <DeckThumbnail deckImg="5" />
      <DeckThumbnail deckImg="6" />
      <DeckThumbnail deckImg="7" /> */}
    </div>
  );
};
