import PropTypes from "prop-types";

function NoteCreate({ title, onTitleChange, onBodyChange, onSubmit }) {
  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          id="title"
          type="text"
          placeholder="Catatan rahasia"
          value={title}
          onChange={onTitleChange}
        />
        <div
          className="add-new-page__input__body"
          type="text"
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
