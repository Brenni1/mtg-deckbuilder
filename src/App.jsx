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
import { DeckCreator } from "./pages/deck-creator/DeckCreator.jsx";
import { Login } from "./pages/login/Login.jsx";
import { IsProtected } from "./components/is-protected/IsProtected.jsx";
import { SignUp } from "./pages/signup/SignUp.jsx";

function App() {
  const theme = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck" element={<Deck />} />
        <Route
          path="/about-us"
          element={
            <IsProtected>
              <AboutUs />
            </IsProtected>
          }
        />

        <Route
          path="/user"
          element={
            <IsProtected>
              <UserProfile />
            </IsProtected>
          }
        />

        <Route
          path="/create-deck"
          element={
            <IsProtected>
              <CreateDeck />
            </IsProtected>
          }
        />
        <Route path="/deck/:id" element={<DeckCreator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
