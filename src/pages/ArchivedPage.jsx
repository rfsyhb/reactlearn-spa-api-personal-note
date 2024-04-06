import React from "react";
import { useSearchParams } from "react-router-dom";
import * as NetworkData from "../api/network-data";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";

function ArchivedPage() {
  // sama seperti HomePage(Active note)
  // terdapat SearchBar
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchArchivedNotes() {
      setIsLoading(true);
      const result = await NetworkData.getArchivedNotes();
      if (!result.error) {
        setNotes(result.data);
      }
      setIsLoading(false);
    }

    fetchArchivedNotes();
  });

  // function digunakan oleh input pada onChange
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="archived-page">
      <h2>Archived Notes</h2>
      <SearchBar keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
      {isLoading ? (
        <p>Fetching notes ...</p>
      ) : (
        <NotesList filteredNotes={filteredNotes} />
      )}
    </section>
  );
}

export default ArchivedPage;
