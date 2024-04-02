import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/AboutUs.jsx";
import { Home } from "./pages/Home.jsx";
import { NavBar } from "./components/NavBar";
import { Deck } from "./pages/Deck.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";

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
