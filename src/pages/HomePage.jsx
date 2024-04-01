import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";

function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  // ketika pertama kali load
  React.useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      const result = await getActiveNotes();
      if (!result.error) {
        setNotes(result.data);
      }
      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>Active Notes</h2>
      <SearchBar keyword={keyword} keywordChanges={onKeywordChangeHandler} />
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
