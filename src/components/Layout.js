/*
Typically includes headers, footers, sidebars,
and any other component that renders common content for
the App's rendered page.

E.g., common components of the meny page.
*/
import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";

function Layout({ startingTheme, children }) {
  return (
    <ThemeProvider startingTheme={startingTheme}>
      <LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
    </ThemeProvider>
  );
}

function LayoutNoThemeProvider({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={
        theme === "light" ? "container-fluid light" : "container-fluid dark"
      }
    >
      {children}
    </div>
  );
}

export default Layout;
