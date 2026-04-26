import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContextTask1';

const Theme1 = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const appStyle = {
        height: "100vh",
        backgroundColor: theme === "light" ? "#ffffff" : "#121212",
        color: theme === "light" ? "#000000" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

  return (
      <div style={appStyle}>
          <h1>{theme.toUpperCase()} MODE</h1>
          <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
  )
}

export default Theme1