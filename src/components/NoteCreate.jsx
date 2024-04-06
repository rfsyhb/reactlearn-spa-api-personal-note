// ? apa
/*
* NoteCreate
  - child CreatePage
  - menerima handler dan state untuk input
  - 
*/
import PropTypes from "prop-types";

function NoteCreate({ title, onTitleChange, onBodyChange, onSubmit }) {
  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          id="title"
          placeholder="Catatan rahasia"
          value={title}
          onChange={onTitleChange}
        />
        <div
          type="text"
          className="add-new-page__input__body"
          data-placeholder="Note body ..."
          contentEditable
          onInput={onBodyChange}
        />
      </div>
      <div className="add-new-page__action">
        <button className="action" onClick={onSubmit}>
          +
        </button>
      </div>
    </section>
  );
}

NoteCreate.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NoteCreate;
