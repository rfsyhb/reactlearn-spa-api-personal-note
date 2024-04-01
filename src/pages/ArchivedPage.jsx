import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";

function ArchivedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      const result = await getArchivedNotes();
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
    <section className="archives-page">
      <h2>Archived Notes</h2>
      <SearchBar keyword={keyword} keywordChanges={onKeywordChangeHandler} />
      {isLoading ? (
        <p>fetching notes...</p>
      ) : (
        <NotesList filteredNotes={filteredNotes} />
      )}
    </section>
  );
}

export default ArchivedPage;
