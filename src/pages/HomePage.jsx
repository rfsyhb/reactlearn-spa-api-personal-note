import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as NetworkData from "../api/network-data";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";

function HomePage() {
  // Router Dom
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // first load
  React.useEffect(() => {
    async function fetchNotes() {
      // loading
      setIsLoading(true);

      // fetching data
      const result = await NetworkData.getActiveNotes();

      if (!result.error) {
        setNotes(result.data);
      }
      // finished
      setIsLoading(false);
    }

    fetchNotes();
  }, []);

  // for searching
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  // notes integrated with search
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>Active Notes</h2>
      <SearchBar keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
      {isLoading ? (
        <p>Fetching notes...</p>
      ) : (
        <>
          <NotesList filteredNotes={filteredNotes} />
          <div className="homepage__action">
            <button className="action" onClick={() => navigate("/note/add")}>
              +
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default HomePage;
