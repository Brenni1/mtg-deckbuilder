import "./HomeBanner.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import banner from "../../assets/imgs/mtg-banner.jpg";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
export const HomeBanner = () => {
  const nav = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // handling Backendside of Cardsearch
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/user/card/search?q=${searchTerm}`);
      setSearchResults(res.data);
      console.log("Search results:", res.data);
    } catch (error) {
      console.log("Error searching:", error);
    }
  };

  return (
    <>
      <div className="home-banner">
        <div className="banner-background-img" style={{ backgroundImage: `url(${banner})` }}></div>
        <div className="banner-fade fade-top" />
        <div className="banner-form">
          <form onSubmit={handleSearch}>
            <label>
              <input
                className="search-bar"
                type="text"
                placeholder="Search for Cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </form>
          <div className="banner-btn-container">
            <button className="btn new-deck" onClick={() => nav("/create-deck")}>
              <i className="fa-solid fa-plus" />
              New Deck
            </button>

            <button className="btn" onClick={() => nav("/my-decks")}>
              <i className="fa-regular fa-folder" /> Deck Folder
            </button>
          </div>
        </div>
        <div className="banner-fade fade-bottom" />
      </div>
    </>
  );
};
