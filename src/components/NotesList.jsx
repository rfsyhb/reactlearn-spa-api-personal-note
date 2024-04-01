import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NotesList({ filteredNotes }) {
  const { locale } = React.useContext(LocaleContext);
  if (!filteredNotes.length) {
    return (
      <section className="notes-list-empty">
        <p>{locale === "id" ? "Tidak ada catatan" : "There is no note added"}</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {filteredNotes.map((note) => {
        return <NoteItem key={note.id} {...note} />;
      })}
    </section>
  );
}

NotesList.propTypes = {
  filteredNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NotesList;
