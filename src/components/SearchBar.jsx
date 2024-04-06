import PropTypes from "prop-types";

function SearchBar({ keyword, onKeywordChange }) {
  return (
    <section className="search-bar">
      <input
        id="search"
        type="text"
        placeholder="Find notes ..."
        value={keyword}
        // function onKeywordChangeHandler(keyword)
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
