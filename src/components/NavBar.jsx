import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-navigation">
        <Link to="/">
          <div>Logo</div>
        </Link>
        <Link to="/deck">
          <div>Decks</div>
        </Link>
        <Link to="/deck">
          <div>+New Deck+</div>
        </Link>
        <Link to="/about-us">
          <div>AboutUs</div>
        </Link>
      </div>
      <div className="nav-user">
        <Link to="/user">
          <div>UserProfile</div>
        </Link>
        <div>Light/Dark</div>
      </div>
    </nav>
  );
};
