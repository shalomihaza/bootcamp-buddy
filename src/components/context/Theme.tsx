import React, { createContext, useEffect } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
type ColorThemeType = "light" | "dark";

type ThemeContextType = {
  dark: boolean;
  theme: ColorThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useMMKVString("theme") as [
    ColorThemeType,
    (value: ColorThemeType) => void
  ];
  
  useEffect(() => {
    // if (!theme) {
      setTheme(systemTheme === "dark" ? "dark" : "light");
    // }
  }, [systemTheme, theme, setTheme]);
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, dark: theme === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
