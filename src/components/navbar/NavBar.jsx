import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import menuImg from "../../assets/imgs/more.png";
import userImg from "../../assets/imgs/user2.png";
import moonWhiteImg from "../../assets/imgs/moon_white.png";
import moonOutlineImg from "../../assets/imgs/moon_outline.png";
import dragonImg from "../../assets/imgs/logo-dragon-white.png";

export const NavBar = () => {
  const [darkModeImg, setDarkModeImg] = useState(moonWhiteImg);
  const [darkMode, setDarkMode] = useState(true);
  const [showDropdown, setShowDropDown] = useState(false);

  const handleDarkMode = () => {
    if (darkMode) {
      setDarkModeImg(moonOutlineImg);
      setDarkMode(false);
    } else {
      setDarkModeImg(moonWhiteImg);
      setDarkMode(true);
    }
  };

  const handleDropdownBtn = () => {
    setShowDropDown(!showDropdown);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-navigation">
        <Link to="/">
          <img className="logo-img" src={dragonImg} alt="" />
        </Link>

        <div className="burger-menu-items">
          <img className="burger-btn" src={menuImg} alt="hamburger-menu" onClick={handleDropdownBtn} />
          <div className={`dropdown-content ${!showDropdown ? "hide" : ""}`}>
            <Link to="/">
              <div>Home</div>
            </Link>
            <Link to="/deck">
              <div>My Decks</div>
            </Link>
            <Link to="/about-us">
              <div>AboutUs</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-user">
        <Link to="/user">
          <img className="user-img" src={userImg} alt="" />
        </Link>
        <div>
          <img className="moon-img" src={darkModeImg} alt="" onClick={handleDarkMode} />
        </div>
      </div>
    </nav>
  );
};
