import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChanges }) {
  const { locale } = React.useContext(LocaleContext);
  return (
    <section className="search-bar">
      <input
        id="search"
        className="search-bar"
        type="text"
        placeholder={locale === "id" ? "Cari catatan ..." : "Find notes ..."}
        value={keyword}
        onChange={(e) => keywordChanges(e.target.value)}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChanges: PropTypes.func.isRequired,
};

export default SearchBar;
