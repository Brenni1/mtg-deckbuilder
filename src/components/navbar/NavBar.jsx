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
  const [showMenuDropdown, setShowMenuDropDown] = useState(false);
  const [showUserDropdown, setShowUserDropDown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const handleMenuDropdownBtn = () => {
    setShowMenuDropDown(!showMenuDropdown);
  };
  const handleUserDropdownBtn = () => {
    setShowUserDropDown(!showUserDropdown);
  };

  const handleClickLogout = () => {
    setShowUserDropDown(!showUserDropdown);
    handleLogout();
  };

  const handleClickOutside = (e) => {
    if (e.currentTarget != e.target) return;
    setShowMenuDropDown(false);
    setShowUserDropDown(false);
  };

  return (
    <nav className="nav-bar" data-theme={theme} onClick={handleClickOutside}>
      <div className="nav-navigation">
        <Link to="/">
          <img className="logo-img" src={theme === "dark" ? dragonWhiteImg : dragonImg} alt="" />
        </Link>

        <div className="burger-menu-items">
          <img className="burger-btn" src={theme === "dark" ? menuWhiteImg : menuImg} alt="hamburger-menu" onClick={handleMenuDropdownBtn} />
          <div className={`menu-dropdown-content ${!showMenuDropdown ? "hide" : ""}`}>
            <Link to="/">
              <div>Home</div>
            </Link>
            <Link to="/my-decks">
              <div>My Decks</div>
            </Link>
            <Link to="/create-deck">
              <div>Deck Creator</div>
            </Link>
            <Link to="/about-us">
              <div>About Us</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-user">
        {!isLoggedIn ? (
          <Link to="/signup">
            <div>
              <i className="fa-solid fa-user-plus" />
              <div>Sign Up</div>
            </div>
          </Link>
        ) : null}

        {!isLoggedIn ? (
          <Link to="/login">
            <div>
              <i className="fa-solid fa-arrow-right-to-bracket" />
              <div>Login</div>
            </div>
          </Link>
        ) : null}

        {/* {isLoggedIn ? (
          <Link to="/">
            <div onClick={handleLogout} className="logout-btn">
              <i className="fa-solid fa-arrow-right-from-bracket" />
              <div>Logout</div>
            </div>
          </Link>
        ) : null} */}

        <div>
          {isLoggedIn ? (
            <img className="user-img" src={theme === "dark" ? userWhiteImg : userImg} alt="user-img" onClick={handleUserDropdownBtn} />
          ) : null}

          <div className={`user-dropdown-content ${!showUserDropdown ? "hide" : ""}`}>
            {isLoggedIn ? (
              <Link to="/">
                <div onClick={handleClickLogout} className="logout-btn">
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                  <div>Logout</div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>

        <div>
          <img className="moon-img" src={theme === "dark" ? moonOutlineImg : moonImg} alt="" onClick={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};
