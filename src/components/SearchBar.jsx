import PropTypes from "prop-types";

function SearchBar({ keyword, keywordChanges }) {
  return (
    <section className="search-bar">
      <input
        id="search"
        className="search-bar"
        type="text"
        placeholder="Cari catatan ..."
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
