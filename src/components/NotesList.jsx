import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NotesList({ filteredNotes }) {
  // jika tidak ada data catatan
  if (!filteredNotes.length) {
    return (
      <section className="notes-list-empty">
        <p>There is no note added!</p>
      </section>
    );
  }

  // ada data catatan
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
