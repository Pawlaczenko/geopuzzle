/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext } from "react"
import { Themes } from "src/styles/theme";

export type GlobalTheme = {
  themeName: Themes,
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<GlobalTheme>({themeName: Themes.light, toggleTheme:()=>{}});

export const useThemeContext = () => useContext(ThemeContext)