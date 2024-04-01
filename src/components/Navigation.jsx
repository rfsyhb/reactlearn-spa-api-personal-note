import React from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import PropTypes from "prop-types";
import { FiMoon, FiSun } from "react-icons/fi";

function Navigation({ logout, name }) {
  const { locale, toggleLocale, theme, toggleTheme } =
    React.useContext(LocaleContext);
  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/archived">
              {locale === "id" ? "Catatan terarsip" : "Archived Note"}
            </Link>
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

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
