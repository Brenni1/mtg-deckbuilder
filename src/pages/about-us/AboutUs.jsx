import "./AboutUs.css";

import phillipImg from "../../assets/imgs/devs/phillip.jpeg";
import benImg from "../../assets/imgs/devs/ben.jpg";
import onurImg from "../../assets/imgs/devs/onur.jpeg";

import { DevCard } from "../../components/dev-card/DevCard.jsx";

export const AboutUs = () => {
  const phillipGitHub = "https://github.com/Brenni1";
  const phillipLinkedIn = "https://www.linkedin.com/in/phillip-brenndoerfer/";
  const benGitHub = "https://github.com/bendfriedman";
  const benLinkedIn = "https://www.linkedin.com/in/benjamindfriedman/";
  const onurGitHub = "https://github.com/onurcangulpak";
  const onurLinkedIn = "https://www.linkedin.com/in/onurcangulpak/";

  return (
    <div className="about-us">
      <DevCard devImg={phillipImg} devName="Phillip Brendörfer" gitHub={phillipGitHub} linkedIn={phillipLinkedIn} />
      <DevCard devImg={benImg} devName="Benjamin Friedman" gitHub={benGitHub} linkedIn={benLinkedIn} />
      <DevCard devImg={onurImg} devName="Onurcan Gülpak" gitHub={onurGitHub} linkedIn={onurLinkedIn} />
    </div>
  );
};
