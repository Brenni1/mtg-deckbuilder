import { createContext, useState } from "react";
const ThemeContext = createContext();

function ThemeProviderWrapper({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // eslint-disable-next-line react/prop-types
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderWrapper };
