import "./Footer.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="footer" data-theme={theme}>
      <div className="footer-links">
        <Link to="/about-us">
          <div>About Us</div>
        </Link>
        <Link to="/">
          <div>FAQ</div>
        </Link>
        <Link to="/">
          <div>Contact</div>
        </Link>
        <Link to="/">
          <div>Support Us</div>
        </Link>
      </div>
      <div className="footer-socials">
        <div>
          <Link to="/">
            <i className="fa-brands fa-discord" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <i className="fa-brands fa-facebook" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <i className="fa-brands fa-twitter" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <i className="fa-brands fa-twitch" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <i className="fa-brands fa-youtube" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <i className="fa-brands fa-patreon" />
          </Link>
        </div>
      </div>
      <div className="footer-disclaimer">
        <p>
          Magic: The Gathering is a Trademark of Wizards of the Coast, Inc. and
          Hasbro, Inc. We are unaffiliated.
          <br /> Comments and deck descriptions are user submitted and do not
          represent our views.
          <br /> Current card prices are provided by TCG Player, Card Kingdom,
          Cardmarket and Cardhoarder. <br />
          Additional data from Scryfall and EDHREC
        </p>
      </div>
    </div>
  );
};
