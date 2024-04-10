import "./CardDetail.css";
import { useContext, useState } from "react";
// import { ThemeContext } from "../../context/theme.context.jsx";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import userImg from "../../assets/imgs/user.png";
// import userWhiteImg from "../../assets/imgs/user_white.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import axios from "axios";

export const CardDetail = () => {
  const [card, setCard] = useState("");
  const { id } = useParams();

  const getcard = async () => {
    try {
      const res = await fetch(`http://localhost:5005/user/card/${id}`);
      const parsedRes = await res.json();
      setCard(parsedRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getcard();
  }, []);

  useEffect(() => {
    if (card) {
      console.log("This is your Card:", card);
    }
  }, [card]);

  if (!card) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>Name:{card.name}</div>
      <div>cmc: {card.cmc}</div>
      <div>colors: {card.color_identity}</div>
      <img src={card.image_uris.normal} alt="card" />
    </div>
  );
};
