import "./DeckContainer.css";
import { DeckThumbnail } from "../../components/deck-thumbnail/DeckThumbnail.jsx";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export const HomeDeckContainer = () => {
  const { user } = useContext(AuthContext);
  const [populatedUser, setPopulatedUser] = useState();
  const theToken = localStorage.getItem("authToken");
  const { isLoggedIn } = useContext(AuthContext);

  // populating the Userprofile with the Users Decks
  const populateUser = async () => {
    try {
      const userId = user._id;
      const res = await fetch(`${API_URL}/user/populate/${userId}`, {
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

  //  making sure there is a User before trying to populate and rerunning should the User change
  useEffect(() => {
    if (user) {
      populateUser();
    }
  }, [user]);

  console.log("The populated User:", populatedUser);
  // console.log("The populated Usersdecktitle:", populatedUser.decks);
  if (!populatedUser) {
    return;
  }

  return (
    <div className="deck-area">
      {populatedUser &&
        isLoggedIn &&
        populatedUser.decks.map((deck) => (
          <Link to={`/deck/${deck._id}`} key={deck._id}>
            <DeckThumbnail
              key={deck._id}
              deckdescription={deck.deckdescription}
              deckname={deck.decktitle}
              decktags={deck.decktags}
              deckcolors={deck.deckcolors}
              popUser={populatedUser}
            />
          </Link>
        ))}
    </div>
  );
};
