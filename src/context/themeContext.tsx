"use client";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(
    getLocalStorage("theme") || "light"
  );

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    setLocalStorage("theme", theme);
  };

  useEffect(() => {
    changeTheme(getLocalStorage("theme"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
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
