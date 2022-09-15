import { useEffect, useState } from 'react'

type useDarkModeType = [
  isDarkMode: boolean,
  toggleDarkMode: () => void
]

const useDarkMode = (): useDarkModeType => {

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.theme === 'dark')


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {

    const html = window.document.documentElement;

    const prevTheme = isDarkMode ? "light" : "dark";
    html.classList.remove(prevTheme);

    const nextTheme = isDarkMode ? "dark" : "light";
    html.classList.add(nextTheme);
    
    localStorage.setItem("theme", nextTheme)

}, [isDarkMode]);

  return [isDarkMode, toggleDarkMode]
}

export default useDarkMode