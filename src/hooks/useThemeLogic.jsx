import { useState, useMemo, useEffect } from "react";
import { theme } from "../theme/muiTheme";

// Custom hook to manage theme mode (light/dark)
export function useThemeLogic() {
  // State to store current theme mode
  const [mode, setMode] = useState("light");

  // Create theme object based on current mode (memoized for performance)
  const currentTheme = useMemo(() => theme(mode), [mode]);

  // Change theme and save preference in localStorage
  const changeTheme = (selectedMode) => {
    setMode(selectedMode);
    localStorage.setItem("theme", selectedMode);
  };

  // Load theme mode from localStorage when component mounts
  useEffect(() => {
    setMode(localStorage.getItem("theme") || "light");
  }, []);

  // Return theme values and control function
  return { mode, currentTheme, changeTheme };
}
