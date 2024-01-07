import { useEffect, useState } from "react";
import { darkTheme, lightTheme, ITheme, Themes } from 'src/styles/theme';

export const useCustomTheme = (initialValue:Themes) : [ITheme,Themes,() => void] => {
    const [theme, setTheme] = useState(initialValue);
    const LOCAL_STORAGE_ITEM = 'geopuzzle_theme'
    const isDarkTheme = theme === Themes.dark;
    const toggleTheme = () => {
      const updatedTheme = isDarkTheme ? Themes.light : Themes.dark;
      setTheme(updatedTheme);
      localStorage.setItem(LOCAL_STORAGE_ITEM, updatedTheme);
    }
  
    // useEffect(() => {
    //   const savedTheme = localStorage.getItem(LOCAL_STORAGE_ITEM) as Themes;
    //   const prefersDark = window.matchMedia &&
    //     window.matchMedia('(prefers-color-scheme: dark)').matches;
    //   if (savedTheme && ["dark", "light"].includes(savedTheme)) {
    //     setTheme(savedTheme);
    //   } else if (prefersDark) {
    //     setTheme(Themes.dark);
    //   }
    // }, []);

    const chosenTheme : ITheme = isDarkTheme ? darkTheme : lightTheme;
    return [chosenTheme, theme, toggleTheme];
}