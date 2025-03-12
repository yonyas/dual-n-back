"use client";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  stimulusColor: string;
  changeStimulusColor: (color: string) => void;
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(
    getLocalStorage("theme") || "light"
  );
  const [stimulusColor, setStimulusColor] = useState<string>(
    (getLocalStorage("stimulusColor") || "#2b62d7") as unknown as string
  );

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    setLocalStorage("theme", theme);
  };

  const changeStimulusColor = (color: string) => {
    setStimulusColor(color);
    setLocalStorage("stimulusColor", color);
  };

  useEffect(() => {
    changeTheme(getLocalStorage("theme") || "light");
    changeStimulusColor(getLocalStorage("stimulusColor") || "#2b62d7");
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, changeTheme, stimulusColor, changeStimulusColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
