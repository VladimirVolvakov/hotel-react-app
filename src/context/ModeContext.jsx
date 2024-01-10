import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  const toggleMode = () => setIsDarkMode((isDarkMode) => !isDarkMode);

  useEffect(() => {
    const html = document.documentElement;

    if (isDarkMode) {
      html.classList.add("dark-mode");
      html.classList.remove("light-mode");
    } else {
      html.classList.remove("dark-mode");
      html.classList.add("light-mode");
    }
  }, [isDarkMode]);

  return (
    <ModeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useModeContext = () => {
  const context = useContext(ModeContext);
  if (context === undefined)
    throw new Error("ModeContext was used outside of ModeContextProvider");
  return context;
};
