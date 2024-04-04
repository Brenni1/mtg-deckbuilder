import "./Footer.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context.jsx";
export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="footer" data-theme={theme}>
      <div className="footer-links">
        <div>Footer</div>
        <div>Footer</div>
        <div>Footer</div>
      </div>
      <div className="footer-socials">
        <div>
          <i className="fa-brands fa-discord" />
        </div>
        <div>
          <i className="fa-brands fa-facebook" />
        </div>
        <div>
          <i className="fa-brands fa-twitter" />
        </div>
        <div>
          <i className="fa-brands fa-twitch" />
        </div>
        <div>
          <i className="fa-brands fa-youtube" />
        </div>
        <div>
          <i className="fa-brands fa-patreon" />
        </div>
      </div>
      <div className="footer-disclaimer">
        <p>
          Magic: The Gathering is a Trademark of Wizards of the Coast, Inc. and Hasbro, Inc. We are unaffiliated.
          <br /> Comments and deck descriptions are user submitted and do not represent our views.
          <br /> Current card prices are provided by TCG Player, Card Kingdom, Cardmarket and Cardhoarder. <br />
          Additional data from Scryfall and EDHREC
        </p>
      </div>
    </div>
  );
};
