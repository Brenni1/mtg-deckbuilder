import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us/AboutUs.jsx";
import { Home } from "./pages/home/Home.jsx";
import { NavBar } from "./components/navbar/NavBar.jsx";
import { Deck } from "./pages/deck/Deck.jsx";
import { UserProfile } from "./pages/user-profile/UserProfile.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck" element={<Deck />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </>
  );
}
export default App;
