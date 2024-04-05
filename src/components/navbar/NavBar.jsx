import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

import menuImg from "../../assets/imgs/menu.png";
import menuWhiteImg from "../../assets/imgs/more.png";
import userImg from "../../assets/imgs/user.png";
import userWhiteImg from "../../assets/imgs/user_white.png";
import moonOutlineImg from "../../assets/imgs/moon_outline.png";
import moonImg from "../../assets/imgs/moon_black.png";
import dragonWhiteImg from "../../assets/imgs/logo-dragon-white.png";
import dragonImg from "../../assets/imgs/logo-dragon.png";

export const NavBar = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const handleDropdownBtn = () => {
    setShowDropDown(!showDropdown);
  };

  return (
    <nav className="nav-bar" data-theme={theme}>
      <div className="nav-navigation">
        <Link to="/">
          <img className="logo-img" src={theme === "dark" ? dragonWhiteImg : dragonImg} alt="" />
        </Link>

        <div className="burger-menu-items">
          <img className="burger-btn" src={theme === "dark" ? menuWhiteImg : menuImg} alt="hamburger-menu" onClick={handleDropdownBtn} />
          <div className={`dropdown-content ${!showDropdown ? "hide" : ""}`}>
            <Link to="/">
              <div>Home</div>
            </Link>
            <Link to="/deck">
              <div>My Decks</div>
            </Link>
            <Link to="/deck/xyz">
              <div>Deck Creator</div>
            </Link>
            <Link to="/about-us">
              <div>About Us</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-user">
        <Link to="/signup">
          <div>Sign Up</div>
        </Link>

        {!isLoggedIn ? (
          <Link to="/login">
            <div>Login</div>
          </Link>
        ) : null}
        {isLoggedIn ? (
          <Link to="/">
            <div onClick={handleLogout}>Logout</div>
          </Link>
        ) : null}
        <Link to="/user">
          <img className="user-img" src={theme === "dark" ? userWhiteImg : userImg} alt="" />
        </Link>
        <div>
          <img className="moon-img" src={theme === "dark" ? moonOutlineImg : moonImg} alt="" onClick={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};
