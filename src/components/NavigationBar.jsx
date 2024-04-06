import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import PropTypes from "prop-types";
import { FiMoon, FiSun } from "react-icons/fi";

function NavigationBar({ logout, name }) {
  const { locale, toggleLocale, theme, toggleTheme } =
    React.useContext(AppContext);

  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/archived">Archived Note</Link>
          </li>
        </ul>
      </nav>
      <button className="toggle-locale" onClick={toggleLocale}>
        {locale === "id" ? "en" : "id"}
      </button>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
      <button className="button-logout" onClick={logout}>
        {name}
      </button>
    </>
  );
}

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavigationBar;
