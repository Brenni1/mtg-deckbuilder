import "./DevCard.css";

import { Link } from "react-router-dom";

import gitHubWhiteImg from "../../assets/imgs/github-white.png";
// import gitHubImg from "../../assets/imgs/github.png";
import linkedInImg from "../../assets/imgs/linkedin.png";

export const DevCard = ({ devImg, devName, gitHub, linkedIn }) => {
  return (
    <div
      className="deck-thumbnail dev-card"
      style={{
        "--background-img": `url(${devImg})`,
        width: "20rem",
        height: "20rem",
        backgroundPosition: "50% 15%",
      }}
    >
      <div className="deck-details">
        <div className="thumb-deck-name">{devName}</div>
        <div className="thumb-deck-info">
          <Link to={gitHub} target="_blank">
            <img src={gitHubWhiteImg} alt="github" />
            <div>GitHub</div>
          </Link>
        </div>
        <div className="thumb-deck-info">
          <Link to={linkedIn} target="_blank">
            <img src={linkedInImg} alt="github" /> <div>LinkedIn</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
