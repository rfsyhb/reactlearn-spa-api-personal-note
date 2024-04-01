import React from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
  const { locale, toggleLocale, theme, toggleTheme } =
    React.useContext(LocaleContext);
  return (
    <nav className="navigation">
      <ul>
        <li>
          <button className="toggle-locale" onClick={toggleLocale}>
            {locale === "id" ? "en" : "id"}
          </button>
        </li>
        <li>
          <button className="toggle-theme" onClick={toggleTheme}>
            {theme === "light" ? "dark" : "light"}
          </button>
        </li>
        <li>
          <Link to="/">Active</Link>
        </li>
        <li>
          <Link to="/archive">Archived</Link>
        </li>
        <li>
          <Link to="/note/add">Add</Link>
        </li>
        <li>
          <button className="button-logout" onClick={logout}>
            {name}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
