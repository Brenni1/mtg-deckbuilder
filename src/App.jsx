import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AboutUs } from "./pages/about-us/AboutUs.jsx";
import { Home } from "./pages/home/Home.jsx";
import { NavBar } from "./components/navbar/NavBar.jsx";
import { Deck } from "./pages/deck/Deck.jsx";
import { UserProfile } from "./pages/user-profile/UserProfile.jsx";
import { useContext } from "react";
import { ThemeContext } from "./context/theme.context.jsx";
import { CreateDeck } from "./pages/create-deck/CreateDeck.jsx";
import { Footer } from "./components/footer/Footer.jsx";
function App() {
  const theme = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck" element={<Deck />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/create-deck" element={<CreateDeck />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
