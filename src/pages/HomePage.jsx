import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";

function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  // ketika pertama kali load
  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
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
      <NotesList filteredNotes={filteredNotes} />
      <div className="homepage__action">
        <button className="action" onClick={() => navigate("/note/add")}>
          +
        </button>
      </div>
    </section>
  );
}

export default HomePage;
