import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/theme.context.jsx";
import { AuthWrapper } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
